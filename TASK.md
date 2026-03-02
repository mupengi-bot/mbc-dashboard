# CB Election Issue Radar - Build Task

## 프로젝트 개요
**MBC Meta-Desk (2026 CB-Election)** — 충북 지방선거 이슈 추적 대시보드
World Monitor 스타일의 실시간 편집회의용 콘솔

## 빌드 요구사항

### 기술 스택
- **프레임워크**: Next.js 15 (App Router)
- **UI**: Tailwind CSS + shadcn/ui
- **지도**: Mapbox GL JS + Deck.gl (충북 시군구 폴리곤)
- **차트**: Recharts 또는 Tremor
- **언어**: TypeScript
- **테마**: 다크모드 기본 (상황실 느낌)

### 만들어야 할 화면 4개

#### 화면 A: 홈 (상황판)
- 상단: KPI 스트립 (신규이슈 수, 급상승 수, 고위험 수, 지역커버리지)
- 중앙: 이슈 카드 리스트 (8~12개)
  - 각 카드: 이슈명, 지역, 대상(시장군수/교육감), 상승속도, 채널믹스 바, 키워드3개, 브리프, 링크3개, 편집제안뱃지, 리스크뱃지
- 우측: 오늘 회의용 브리프 패널
- 상단 필터: 시간(2h/24h/7d), 대상(시장군수/교육감/전체), 지역, 토픽, SNS우선보기 토글

#### 화면 B: 지도
- Mapbox 기반 충북 시군구 Choropleth (히트맵)
- 레이어 토글: 채널/대상/토픽/시간
- 클릭하면 해당 지역 TOP 이슈 5개

#### 화면 C: 이슈 상세 (Trace)
- 이슈 개요 + 타임라인 (최초발견→확산→언론진입→전환→재점화)
- 논점 3분할 (주장/반박/확인필요)
- 유사문서 묶음

#### 화면 D: 검색/RAG
- 키워드 검색 + 자연어 질의
- 답변 + 근거링크 + 주의문구

### 데이터
- 목업(mock) 데이터로 구현 (실제 API 연동은 Phase 2)
- 충북 11개 시군(청주시, 충주시, 제천시, 보은군, 옥천군, 영동군, 증평군, 진천군, 괴산군, 음성군, 단양군)
- 이슈 20개 정도 mock data
- 시군구 GeoJSON은 대한민국 행정구역 데이터 사용

### 디자인 요구사항
- 다크모드 기본 (어두운 배경 + 네온 액센트)
- 상황실/커맨드센터 느낌
- 리스크: 빨강/노랑 뱃지
- 채널믹스: SNS(파랑), 커뮤니티(초록), 언론(주황) 색 구분
- 반응형 (데스크톱 우선이지만 태블릿도 OK)

### TypeScript 타입
PRD_원본.txt 파일에 포함된 TypeScript 타입 정의를 그대로 사용할 것.

### 주의사항
- Mapbox 토큰은 환경변수로 처리 (NEXT_PUBLIC_MAPBOX_TOKEN)
- 한국어 UI
- "확인 필요", "확산 중", "반박 존재" 등 안전한 표현 사용
- 모든 요약에 근거 링크 포함

## 실행
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```
이후 shadcn/ui, mapbox-gl, @deck.gl/react, recharts 등 설치.

충북 GeoJSON은 https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2018/json/skorea-provinces-2018-geo.json 또는 시군구 단위 GeoJSON을 사용.

## 완료 기준
- `npm run dev`로 로컬 실행 가능
- 4개 화면 모두 네비게이션 가능
- Mock 데이터로 이슈카드, 지도, 타임라인, 검색 동작
- 다크모드 상황실 느낌의 UI
