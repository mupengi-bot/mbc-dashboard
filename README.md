# MBC충북 × 옥천신문 라이브 대시보드

📺 MBC충북 쇼츠 댓글 + 📰 옥천신문 여론광장을 한눈에 볼 수 있는 대시보드

🔗 **Live**: [mupengi-bot.github.io/mbc-dashboard](https://mupengi-bot.github.io/mbc-dashboard)

## 기능
- MBC충북NEWS + 안녕!MBC충북 쇼츠 최신 댓글
- 옥천신문 여론광장 게시글 & 미리보기
- 🔥 실시간 급상승 하이라이트
- 다크 모드, 반응형, 5분 자동 새로고침

## 데이터 수집
GitHub Actions로 4시간마다 자동 수집 (`scripts/collect.py`)
- YouTube: yt-dlp (API키 불필요)
- 옥천신문: requests + BeautifulSoup
