#!/usr/bin/env python3
"""MBC충북 쇼츠 댓글 + 옥천신문 여론광장 데이터 수집"""

import json
import os
import subprocess
import sys
import traceback
from datetime import datetime, timezone, timedelta
from pathlib import Path

import requests
from bs4 import BeautifulSoup

KST = timezone(timedelta(hours=9))
DATA_DIR = Path(__file__).parent.parent / "data"
DATA_DIR.mkdir(exist_ok=True)

CHANNELS = [
    "UCFLTNsOlzlbAD18DrSREuMQ",  # MBC충북NEWS
    "UCKvnHmqJvQQ9osEO1qRz9nA",  # 안녕!MBC충북
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}


def collect_youtube():
    """yt-dlp로 MBC충북 쇼츠 댓글 수집"""
    all_videos = []

    for channel_id in CHANNELS:
        try:
            # Get recent videos (shorts) from channel
            url = f"https://www.youtube.com/channel/{channel_id}/shorts"
            result = subprocess.run(
                [
                    sys.executable, "-m", "yt_dlp",
                    "--flat-playlist",
                    "--dump-json",
                    "--playlist-end", "10",
                    "--no-warnings",
                    url,
                ],
                capture_output=True, text=True, timeout=120,
            )

            if result.returncode != 0:
                # Fallback to /videos
                url = f"https://www.youtube.com/channel/{channel_id}/videos"
                result = subprocess.run(
                    [
                        sys.executable, "-m", "yt_dlp",
                        "--flat-playlist",
                        "--dump-json",
                        "--playlist-end", "10",
                        "--no-warnings",
                        url,
                    ],
                    capture_output=True, text=True, timeout=120,
                )

            for line in result.stdout.strip().split("\n"):
                if not line.strip():
                    continue
                try:
                    info = json.loads(line)
                    all_videos.append({
                        "id": info.get("id", ""),
                        "title": info.get("title", ""),
                        "url": info.get("url") or info.get("webpage_url") or f"https://youtube.com/shorts/{info.get('id', '')}",
                        "channel": info.get("channel", ""),
                        "channel_id": channel_id,
                        "view_count": info.get("view_count", 0),
                        "duration": info.get("duration", 0),
                        "upload_date": info.get("upload_date", ""),
                    })
                except json.JSONDecodeError:
                    continue
        except Exception as e:
            print(f"[WARN] Channel {channel_id} video list failed: {e}")

    # Now get comments for each video (limit to 20 videos total)
    all_videos = all_videos[:20]
    videos_with_comments = []

    for video in all_videos:
        vid = video["id"]
        comments = []
        try:
            result = subprocess.run(
                [
                    sys.executable, "-m", "yt_dlp",
                    "--write-comments",
                    "--skip-download",
                    "--dump-json",
                    "--extractor-args", "youtube:max_comments=20",
                    "--no-warnings",
                    f"https://www.youtube.com/watch?v={vid}",
                ],
                capture_output=True, text=True, timeout=60,
            )
            if result.stdout.strip():
                data = json.loads(result.stdout.strip().split("\n")[-1])
                for c in (data.get("comments") or [])[:20]:
                    comments.append({
                        "author": c.get("author", ""),
                        "text": c.get("text", ""),
                        "timestamp": c.get("timestamp", 0),
                        "like_count": c.get("like_count", 0),
                        "time_text": c.get("_time_text", ""),
                    })
        except Exception as e:
            print(f"[WARN] Comments for {vid} failed: {e}")

        video["comments"] = comments
        video["comment_count"] = len(comments)
        videos_with_comments.append(video)

    output = {
        "collected_at": datetime.now(KST).isoformat(),
        "videos": videos_with_comments,
    }

    out_path = DATA_DIR / "youtube.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    print(f"[OK] YouTube: {len(videos_with_comments)} videos saved")
    return videos_with_comments


def collect_okinews():
    """옥천신문 여론광장 스크래핑"""
    posts = []
    try:
        resp = requests.get(
            "http://www.okinews.com/bbs/list.html?table=bbs_1",
            headers=HEADERS, timeout=15,
        )
        resp.encoding = "utf-8"
        soup = BeautifulSoup(resp.text, "html.parser")

        rows = soup.select("table tr")
        for row in rows:
            link = row.find("a", href=True)
            if not link or "idxno=" not in link.get("href", ""):
                continue
            href = link["href"]
            title = link.get_text(strip=True)
            if not title or len(title) < 2:
                continue
            # deleted posts
            if "삭제된 게시글" in row.get_text():
                continue

            idxno = href.split("idxno=")[-1].split("&")[0]
            cells = row.get_text("|", strip=True).split("|")
            # Extract author, date, views from cells
            author = ""
            date = ""
            views = 0
            for cell in cells:
                cell = cell.strip()
                if len(cell) == 10 and cell.count("-") == 2:
                    date = cell
                elif cell.isdigit() and int(cell) > 0:
                    views = int(cell)
            # Author is usually after HOT/NEW badges
            for cell in cells:
                cell = cell.strip()
                if cell in ("HOT", "NEW", title) or cell == date or cell == str(views):
                    continue
                if 1 < len(cell) < 20 and not cell.isdigit() and "-" not in cell:
                    author = cell
                    break

            # Comment count from title e.g. "(9)"
            comment_count = 0
            import re
            m = re.search(r'\((\d+)\)\s*$', title)
            if m:
                comment_count = int(m.group(1))

            full_url = f"http://www.okinews.com/bbs/{href}" if not href.startswith("http") else href

            posts.append({
                "id": idxno,
                "title": title,
                "url": full_url,
                "author": author,
                "date": date,
                "views": views,
                "comment_count": comment_count,
                "preview": "",
            })

        # Fetch previews for top 10 posts
        for post in posts[:10]:
            try:
                dresp = requests.get(post["url"], headers=HEADERS, timeout=10)
                dresp.encoding = "utf-8"
                dsoup = BeautifulSoup(dresp.text, "html.parser")
                # Try various selectors for content
                for sel in [".bbs-view-content", ".view-content", ".content", "td.content"]:
                    el = dsoup.select_one(sel)
                    if el and len(el.get_text(strip=True)) > 10:
                        post["preview"] = el.get_text(strip=True)[:100]
                        break
                if not post["preview"]:
                    # Try finding largest text block
                    for p in dsoup.find_all("p"):
                        t = p.get_text(strip=True)
                        if len(t) > 30:
                            post["preview"] = t[:100]
                            break
            except:
                pass

    except Exception as e:
        print(f"[WARN] 옥천신문 failed: {e}")
        traceback.print_exc()

    # Deduplicate
    seen = set()
    unique = []
    for p in posts:
        if p["id"] and p["id"] not in seen:
            seen.add(p["id"])
            unique.append(p)
    posts = unique[:30]

    output = {
        "collected_at": datetime.now(KST).isoformat(),
        "posts": posts,
    }
    out_path = DATA_DIR / "okinews.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    print(f"[OK] 옥천신문: {len(posts)} posts saved")
    return posts


def compute_trending(videos, posts):
    """급상승 계산"""
    trending = []

    # Load previous data for comparison
    prev_yt_path = DATA_DIR / "youtube_prev.json"
    prev_views = {}
    if prev_yt_path.exists():
        try:
            prev = json.loads(prev_yt_path.read_text())
            for v in prev.get("videos", []):
                prev_views[v["id"]] = v.get("view_count", 0)
        except:
            pass

    for v in videos:
        view_count = v.get("view_count") or 0
        prev_count = prev_views.get(v["id"], 0)
        delta = view_count - prev_count if prev_count else 0
        trending.append({
            "type": "youtube",
            "id": v["id"],
            "title": v["title"],
            "url": v["url"],
            "view_count": view_count,
            "view_delta": delta,
            "comment_count": v.get("comment_count", 0),
            "channel": v.get("channel", ""),
        })

    # Sort by view_delta desc, then view_count
    trending.sort(key=lambda x: (x["view_delta"], x["view_count"]), reverse=True)

    # Mark top 3
    for i, t in enumerate(trending[:3]):
        t["hot"] = True

    output = {
        "collected_at": datetime.now(KST).isoformat(),
        "items": trending[:10],
    }
    out_path = DATA_DIR / "trending.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    # Save current as prev for next run
    yt_path = DATA_DIR / "youtube.json"
    if yt_path.exists():
        import shutil
        shutil.copy(yt_path, prev_yt_path)

    print(f"[OK] Trending: {len(trending[:10])} items saved")


def main():
    print(f"=== Collecting data at {datetime.now(KST).isoformat()} ===")
    videos = collect_youtube()
    posts = collect_okinews()
    compute_trending(videos, posts)
    print("=== Done ===")


if __name__ == "__main__":
    main()
