#!/usr/bin/env python3
"""충북 지역 언론 RSS 수집기

10분 간격 실행 권장:
  crontab: */10 * * * * cd /path/to/cb-election-radar && python3 scripts/rss_collector.py

requirements: pip install feedparser requests
"""

import json
import os
import time
from datetime import datetime, timezone, timedelta

import feedparser
import requests

KST = timezone(timedelta(hours=9))
DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")
OUTPUT_PATH = os.path.join(DATA_DIR, "rss_feeds.json")

# 충북 지역 언론 RSS 피드 목록
FEEDS = [
    {"name": "충북일보", "url": "https://www.cbilbo.com/rss/allArticle.xml", "domain": "cbilbo.com"},
    {"name": "충청투데이", "url": "https://www.cctoday.co.kr/rss/allArticle.xml", "domain": "cctoday.co.kr"},
    {"name": "중부매일", "url": "https://www.jbnews.com/rss/allArticle.xml", "domain": "jbnews.com"},
    {"name": "충북방송", "url": "https://www.cbsc.co.kr/rss/allArticle.xml", "domain": "cbsc.co.kr"},
    {"name": "동양일보", "url": "https://www.dynews.co.kr/rss/allArticle.xml", "domain": "dynews.co.kr"},
]

HEADERS = {
    "User-Agent": "MBC-MetaDesk-RSS/1.0 (cb-election-radar)"
}

TIMEOUT = 15  # seconds


def fetch_feed(feed_info: dict) -> list[dict]:
    """단일 RSS 피드를 파싱하여 기사 목록 반환"""
    articles = []
    try:
        resp = requests.get(feed_info["url"], headers=HEADERS, timeout=TIMEOUT)
        resp.raise_for_status()
        parsed = feedparser.parse(resp.content)

        for entry in parsed.entries[:30]:  # 최근 30건
            pub_date = ""
            if hasattr(entry, "published_parsed") and entry.published_parsed:
                pub_date = time.strftime("%Y-%m-%dT%H:%M:%S+09:00", entry.published_parsed)
            elif hasattr(entry, "updated_parsed") and entry.updated_parsed:
                pub_date = time.strftime("%Y-%m-%dT%H:%M:%S+09:00", entry.updated_parsed)

            articles.append({
                "source": feed_info["name"],
                "domain": feed_info["domain"],
                "title": entry.get("title", "").strip(),
                "link": entry.get("link", ""),
                "summary": entry.get("summary", "").strip()[:300],
                "published": pub_date,
                "collected_at": datetime.now(KST).isoformat(),
            })
    except Exception as e:
        print(f"[ERROR] {feed_info['name']}: {e}")

    return articles


def collect_all() -> dict:
    """모든 피드를 수집하여 통합 결과 반환"""
    all_articles = []
    stats = {}

    for feed in FEEDS:
        print(f"[수집] {feed['name']} ({feed['url']})...")
        articles = fetch_feed(feed)
        all_articles.extend(articles)
        stats[feed["name"]] = len(articles)
        print(f"  → {len(articles)}건")

    # 발행일 기준 정렬 (최신 우선)
    all_articles.sort(key=lambda a: a.get("published", ""), reverse=True)

    return {
        "collected_at": datetime.now(KST).isoformat(),
        "total_count": len(all_articles),
        "stats": stats,
        "articles": all_articles,
    }


def main():
    os.makedirs(DATA_DIR, exist_ok=True)

    print(f"=== 충북 지역 언론 RSS 수집 시작 ({datetime.now(KST).strftime('%Y-%m-%d %H:%M')}) ===")
    result = collect_all()

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(f"\n=== 수집 완료: 총 {result['total_count']}건 → {OUTPUT_PATH} ===")


if __name__ == "__main__":
    main()
