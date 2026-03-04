import { Issue, IssueDetail, Region, KPI, TimelineEvent, Argument } from '@/types';

export const REGIONS: Region[] = [
  { code: 'cheongju', name: '청주시', issueCount: 7, topIssueId: 'iss-01', heatScore: 92 },
  { code: 'chungju', name: '충주시', issueCount: 4, topIssueId: 'iss-04', heatScore: 68 },
  { code: 'jecheon', name: '제천시', issueCount: 3, topIssueId: 'iss-07', heatScore: 55 },
  { code: 'boeun', name: '보은군', issueCount: 2, topIssueId: 'iss-10', heatScore: 35 },
  { code: 'okcheon', name: '옥천군', issueCount: 2, topIssueId: 'iss-11', heatScore: 42 },
  { code: 'yeongdong', name: '영동군', issueCount: 1, topIssueId: 'iss-13', heatScore: 22 },
  { code: 'jeungpyeong', name: '증평군', issueCount: 1, topIssueId: 'iss-14', heatScore: 28 },
  { code: 'jincheon', name: '진천군', issueCount: 2, topIssueId: 'iss-15', heatScore: 45 },
  { code: 'goesan', name: '괴산군', issueCount: 1, topIssueId: 'iss-17', heatScore: 30 },
  { code: 'eumseong', name: '음성군', issueCount: 2, topIssueId: 'iss-18', heatScore: 48 },
  { code: 'danyang', name: '단양군', issueCount: 1, topIssueId: 'iss-20', heatScore: 25 },
];

export const ISSUES: Issue[] = [
  {
    id: 'iss-01', title: '청주 오송역세권 개발 특혜 의혹', region: '청주시', target: '시장군수',
    riseSpeed: 340, channelMix: { sns: 55, community: 30, press: 15 },
    keywords: ['오송역', '특혜', '개발이권'], brief: 'SNS에서 오송역세권 개발 관련 특혜 의혹이 급속 확산 중. 현직 시장 측 해명 요구 증가.',
    links: [
      { title: 'X 스레드: 오송역 개발 의혹 정리', url: '#', channel: 'sns' },
      { title: '청주맘카페: 오송역 개발 진짜?', url: '#', channel: 'community' },
      { title: '충북일보: 오송역세권 개발 논란', url: '#', channel: 'press' },
    ],
    editSuggestion: '바로 아이템 가능', riskLevel: 'high', status: '상승', createdAt: '2026-03-03T06:00:00', score: 95, topicCategory: '개발',
  },
  {
    id: 'iss-02', title: '충북교육감 후보 학력 위조 의혹', region: '청주시', target: '교육감',
    riseSpeed: 280, channelMix: { sns: 60, community: 25, press: 15 },
    keywords: ['교육감', '학력위조', '검증'], brief: '교육감 예비후보 A의 학력 위조 의혹이 SNS를 통해 급속 확산. 반박 자료도 동시 유통 중.',
    links: [
      { title: '페이스북: 교육감 후보 학력 검증', url: '#', channel: 'sns' },
      { title: '충북학부모연대 게시판', url: '#', channel: 'community' },
      { title: 'CBS노컷: 교육감 후보 학력 논란', url: '#', channel: 'press' },
    ],
    editSuggestion: '팩트 확인 우선', riskLevel: 'high', status: '상승', createdAt: '2026-03-03T04:30:00', score: 91, topicCategory: '청렴',
  },
  {
    id: 'iss-03', title: '청주 흥덕구 아파트 주차난 민원 폭발', region: '청주시', target: '시장군수',
    riseSpeed: 150, channelMix: { sns: 40, community: 45, press: 15 },
    keywords: ['주차난', '흥덕구', '아파트'], brief: '흥덕구 신규 아파트 단지 주차 문제로 주민 민원 급증. 커뮤니티에서 시장 후보별 공약 비교 활발.',
    links: [
      { title: '네이버카페: 흥덕구 주차난 심각', url: '#', channel: 'community' },
      { title: 'X: 청주 주차 공약 비교', url: '#', channel: 'sns' },
      { title: '충청투데이: 주차난 해결책은', url: '#', channel: 'press' },
    ],
    editSuggestion: '추적 필요', riskLevel: 'medium', status: '상승', createdAt: '2026-03-02T22:00:00', score: 78, topicCategory: '교통',
  },
  {
    id: 'iss-04', title: '충주 메가폴리스 사업 예산 논란', region: '충주시', target: '시장군수',
    riseSpeed: 200, channelMix: { sns: 45, community: 35, press: 20 },
    keywords: ['메가폴리스', '예산낭비', '충주'], brief: '충주 메가폴리스 사업 예산 집행 부적절 주장이 커뮤니티에서 확산. 시 측 해명 보도자료 배포.',
    links: [
      { title: '충주포럼: 메가폴리스 혈세낭비?', url: '#', channel: 'community' },
      { title: 'X: 충주 예산 어디로', url: '#', channel: 'sns' },
      { title: '중부매일: 메가폴리스 사업 점검', url: '#', channel: 'press' },
    ],
    editSuggestion: '바로 아이템 가능', riskLevel: 'medium', status: '상승', createdAt: '2026-03-03T05:00:00', score: 82, topicCategory: '개발',
  },
  {
    id: 'iss-05', title: '청주시장 후보 부동산 투기 의혹', region: '청주시', target: '시장군수',
    riseSpeed: 420, channelMix: { sns: 65, community: 20, press: 15 },
    keywords: ['부동산', '투기', '시장후보'], brief: '시장 예비후보 B의 가족 부동산 거래 내역이 SNS에서 공개. 투기 의혹 제기.',
    links: [
      { title: 'X 스레드: 후보 B 부동산 정리', url: '#', channel: 'sns' },
      { title: '청주시민연대 성명서', url: '#', channel: 'community' },
      { title: '연합뉴스: 후보 재산 검증', url: '#', channel: 'press' },
    ],
    editSuggestion: '팩트 확인 우선', riskLevel: 'high', status: '상승', createdAt: '2026-03-03T07:00:00', score: 97, topicCategory: '청렴',
  },
  {
    id: 'iss-06', title: '청주 BRT 노선 확대 찬반 논쟁', region: '청주시', target: '시장군수',
    riseSpeed: 80, channelMix: { sns: 35, community: 40, press: 25 },
    keywords: ['BRT', '노선확대', '교통'], brief: 'BRT 2단계 노선 확대를 둘러싼 찬반 의견이 커뮤니티에서 활발. 후보별 입장 차이 부각.',
    links: [
      { title: '청주교통포럼: BRT 찬반', url: '#', channel: 'community' },
      { title: '충북방송: BRT 확대 계획', url: '#', channel: 'press' },
      { title: 'X: BRT 노선 의견', url: '#', channel: 'sns' },
    ],
    editSuggestion: '추적 필요', riskLevel: 'low', status: '정체', createdAt: '2026-03-01T10:00:00', score: 55, topicCategory: '교통',
  },
  {
    id: 'iss-07', title: '제천 한방엑스포 예산 과다 지출 논란', region: '제천시', target: '시장군수',
    riseSpeed: 170, channelMix: { sns: 40, community: 35, press: 25 },
    keywords: ['한방엑스포', '예산', '제천'], brief: '한방엑스포 운영비 과다 지출 주장. 감사원 감사 결과 대기 중.',
    links: [
      { title: '제천사랑: 엑스포 예산 문제', url: '#', channel: 'community' },
      { title: 'X: 제천 혈세', url: '#', channel: 'sns' },
      { title: '충북일보: 한방엑스포 감사', url: '#', channel: 'press' },
    ],
    editSuggestion: '바로 아이템 가능', riskLevel: 'medium', status: '상승', createdAt: '2026-03-02T14:00:00', score: 72, topicCategory: '개발',
  },
  {
    id: 'iss-08', title: '충북 학교 급식 안전성 논란', region: '청주시', target: '교육감',
    riseSpeed: 120, channelMix: { sns: 50, community: 35, press: 15 },
    keywords: ['급식', '안전', '교육감'], brief: '학교 급식 식재료 안전성 문제 제기. 학부모 커뮤니티에서 교육감 후보 입장 요구.',
    links: [
      { title: '맘카페: 급식 안전 괜찮나', url: '#', channel: 'community' },
      { title: 'X: 충북 급식 문제', url: '#', channel: 'sns' },
      { title: '충청리뷰: 급식 실태', url: '#', channel: 'press' },
    ],
    editSuggestion: '추적 필요', riskLevel: 'medium', status: '정체', createdAt: '2026-03-01T08:00:00', score: 62, topicCategory: '교육',
  },
  {
    id: 'iss-09', title: '청주 산단 유해물질 배출 주민 반발', region: '청주시', target: '시장군수',
    riseSpeed: 190, channelMix: { sns: 45, community: 40, press: 15 },
    keywords: ['유해물질', '산단', '환경'], brief: '청주 산업단지 인근 유해물질 배출 관련 주민 집단 민원. 시장 후보 환경 공약 주목.',
    links: [
      { title: '주민대책위: 유해물질 실태', url: '#', channel: 'community' },
      { title: 'X: 청주 산단 환경', url: '#', channel: 'sns' },
      { title: '충북일보: 산단 환경 점검', url: '#', channel: 'press' },
    ],
    editSuggestion: '바로 아이템 가능', riskLevel: 'high', status: '상승', createdAt: '2026-03-02T18:00:00', score: 80, topicCategory: '환경',
  },
  {
    id: 'iss-10', title: '보은 속리산 관광개발 갈등', region: '보은군', target: '시장군수',
    riseSpeed: 60, channelMix: { sns: 30, community: 45, press: 25 },
    keywords: ['속리산', '관광개발', '보은'], brief: '속리산 관광단지 개발 사업 둘러싼 환경단체-개발론자 갈등 지속.',
    links: [
      { title: '보은사랑: 속리산 개발 논의', url: '#', channel: 'community' },
      { title: '충북일보: 속리산 관광 계획', url: '#', channel: 'press' },
      { title: 'X: 보은 관광', url: '#', channel: 'sns' },
    ],
    editSuggestion: '추적 필요', riskLevel: 'low', status: '정체', createdAt: '2026-02-28T10:00:00', score: 40, topicCategory: '환경',
  },
  {
    id: 'iss-11', title: '옥천 금강 수질 오염 우려', region: '옥천군', target: '시장군수',
    riseSpeed: 110, channelMix: { sns: 35, community: 40, press: 25 },
    keywords: ['금강', '수질', '옥천'], brief: '금강 상류 옥천 구간 수질 악화 우려. 환경단체 성명 발표.',
    links: [
      { title: '옥천넷: 금강 수질 심각', url: '#', channel: 'community' },
      { title: '충북방송: 금강 수질 보고', url: '#', channel: 'press' },
      { title: 'X: 옥천 금강', url: '#', channel: 'sns' },
    ],
    editSuggestion: '추적 필요', riskLevel: 'medium', status: '상승', createdAt: '2026-03-02T12:00:00', score: 58, topicCategory: '환경',
  },
  {
    id: 'iss-12', title: '충주 원도심 공동화 대책 요구', region: '충주시', target: '시장군수',
    riseSpeed: 70, channelMix: { sns: 30, community: 50, press: 20 },
    keywords: ['원도심', '공동화', '충주'], brief: '충주 원도심 상권 붕괴 우려로 상인회 대책 촉구. 군수 후보 공약 비교.',
    links: [
      { title: '충주상인회: 원도심 살리기', url: '#', channel: 'community' },
      { title: '중부매일: 원도심 현황', url: '#', channel: 'press' },
      { title: 'X: 충주 원도심', url: '#', channel: 'sns' },
    ],
    editSuggestion: '추적 필요', riskLevel: 'low', status: '정체', createdAt: '2026-02-27T09:00:00', score: 45, topicCategory: '개발',
  },
  {
    id: 'iss-13', title: '영동 과일 농가 지원금 논란', region: '영동군', target: '시장군수',
    riseSpeed: 50, channelMix: { sns: 25, community: 50, press: 25 },
    keywords: ['과일농가', '지원금', '영동'], brief: '영동 포도·감 농가 지원금 배분 불공정 주장.',
    links: [
      { title: '영동농민회: 지원금 문제', url: '#', channel: 'community' },
      { title: '충북일보: 농가 지원', url: '#', channel: 'press' },
      { title: 'X: 영동 농가', url: '#', channel: 'sns' },
    ],
    editSuggestion: '추적 필요', riskLevel: 'low', status: '하락', createdAt: '2026-02-25T10:00:00', score: 32, topicCategory: '복지',
  },
  {
    id: 'iss-14', title: '증평 산단 교통 인프라 부족', region: '증평군', target: '시장군수',
    riseSpeed: 45, channelMix: { sns: 30, community: 45, press: 25 },
    keywords: ['산단', '교통', '증평'], brief: '증평 산업단지 출퇴근 교통난 민원.',
    links: [
      { title: '증평주민모임: 교통 불편', url: '#', channel: 'community' },
      { title: '충청투데이: 증평 교통', url: '#', channel: 'press' },
      { title: 'X: 증평 출퇴근', url: '#', channel: 'sns' },
    ],
    editSuggestion: '추적 필요', riskLevel: 'low', status: '정체', createdAt: '2026-02-26T14:00:00', score: 35, topicCategory: '교통',
  },
  {
    id: 'iss-15', title: '진천 반도체 클러스터 기대와 우려', region: '진천군', target: '시장군수',
    riseSpeed: 130, channelMix: { sns: 50, community: 30, press: 20 },
    keywords: ['반도체', '클러스터', '진천'], brief: '반도체 클러스터 유치에 따른 부동산 투기 및 환경 우려 동시 제기.',
    links: [
      { title: 'X: 진천 반도체 기대', url: '#', channel: 'sns' },
      { title: '진천군민카페: 반도체 영향', url: '#', channel: 'community' },
      { title: '연합뉴스: 진천 반도체 클러스터', url: '#', channel: 'press' },
    ],
    editSuggestion: '바로 아이템 가능', riskLevel: 'medium', status: '상승', createdAt: '2026-03-02T16:00:00', score: 70, topicCategory: '개발',
  },
  {
    id: 'iss-16', title: '충주 수안보 온천 관광 활성화', region: '충주시', target: '시장군수',
    riseSpeed: 40, channelMix: { sns: 35, community: 40, press: 25 },
    keywords: ['수안보', '온천', '관광'], brief: '수안보 온천 관광 활성화 방안 논의. 군수 후보 공약 비교.',
    links: [
      { title: '충주관광포럼: 수안보 방안', url: '#', channel: 'community' },
      { title: '중부매일: 수안보 활성화', url: '#', channel: 'press' },
      { title: 'X: 수안보 관광', url: '#', channel: 'sns' },
    ],
    editSuggestion: '추적 필요', riskLevel: 'low', status: '정체', createdAt: '2026-02-24T11:00:00', score: 30, topicCategory: '개발',
  },
  {
    id: 'iss-17', title: '괴산 유기농 특구 지정 요구', region: '괴산군', target: '시장군수',
    riseSpeed: 55, channelMix: { sns: 30, community: 45, press: 25 },
    keywords: ['유기농', '특구', '괴산'], brief: '괴산 유기농 특구 지정 요구 청원. 군수 후보 입장 주목.',
    links: [
      { title: '괴산농민회: 유기농 특구', url: '#', channel: 'community' },
      { title: '충북일보: 괴산 유기농', url: '#', channel: 'press' },
      { title: 'X: 괴산 유기농', url: '#', channel: 'sns' },
    ],
    editSuggestion: '추적 필요', riskLevel: 'low', status: '정체', createdAt: '2026-02-27T08:00:00', score: 38, topicCategory: '복지',
  },
  {
    id: 'iss-18', title: '음성 반도체 산단 환경영향 우려', region: '음성군', target: '시장군수',
    riseSpeed: 160, channelMix: { sns: 50, community: 30, press: 20 },
    keywords: ['반도체', '환경', '음성'], brief: '음성 반도체 산단 확장에 따른 환경 영향 우려. 지하수 오염 가능성 제기.',
    links: [
      { title: 'X: 음성 반도체 환경', url: '#', channel: 'sns' },
      { title: '음성환경연대: 환경영향', url: '#', channel: 'community' },
      { title: '충청투데이: 음성 산단', url: '#', channel: 'press' },
    ],
    editSuggestion: '바로 아이템 가능', riskLevel: 'medium', status: '상승', createdAt: '2026-03-02T20:00:00', score: 68, topicCategory: '환경',
  },
  {
    id: 'iss-19', title: '충북 교원 정원 부족 문제', region: '청주시', target: '교육감',
    riseSpeed: 90, channelMix: { sns: 45, community: 35, press: 20 },
    keywords: ['교원', '정원', '교육감'], brief: '농촌 지역 교원 부족 심화. 교육감 후보별 해결 방안 비교.',
    links: [
      { title: '충북교사모임: 교원 부족', url: '#', channel: 'community' },
      { title: 'X: 충북 교사 부족', url: '#', channel: 'sns' },
      { title: '충북방송: 교원 현황', url: '#', channel: 'press' },
    ],
    editSuggestion: '추적 필요', riskLevel: 'low', status: '정체', createdAt: '2026-03-01T14:00:00', score: 50, topicCategory: '교육',
  },
  {
    id: 'iss-20', title: '단양 관광 케이블카 안전 우려', region: '단양군', target: '시장군수',
    riseSpeed: 75, channelMix: { sns: 40, community: 35, press: 25 },
    keywords: ['케이블카', '안전', '단양'], brief: '단양 관광 케이블카 안전 점검 결과 우려. 주민 반발.',
    links: [
      { title: '단양사랑: 케이블카 안전', url: '#', channel: 'community' },
      { title: '충북일보: 케이블카 점검', url: '#', channel: 'press' },
      { title: 'X: 단양 케이블카', url: '#', channel: 'sns' },
    ],
    editSuggestion: '추적 필요', riskLevel: 'medium', status: '정체', createdAt: '2026-02-28T16:00:00', score: 42, topicCategory: '안전',
  },
];

export const ISSUE_DETAILS: Record<string, IssueDetail> = {
  'iss-01': {
    ...ISSUES[0],
    timeline: [
      { type: '최초발견', date: '2026-03-01T14:22:00', description: 'X(트위터)에서 익명 계정이 오송역 개발 관련 내부 문서 이미지 공개', sourceUrl: '#' },
      { type: '확산', date: '2026-03-02T08:00:00', description: '청주맘카페, 디시인사이드 충북갤러리에서 동시 확산. 리포스트 2,400건 돌파', sourceUrl: '#' },
      { type: '언론진입', date: '2026-03-02T16:30:00', description: '충북일보 1면 보도. 타 언론사 후속 보도 시작', sourceUrl: '#' },
      { type: '전환', date: '2026-03-03T02:00:00', description: '시장 측 "사실무근" 해명 보도자료 배포. 일부 SNS에서 반박 자료 추가 공개', sourceUrl: '#' },
    ],
    arguments: [
      { type: '주장', content: '오송역세권 개발 사업자 선정 과정에서 특정 업체에 유리한 조건이 제시되었다는 의혹', source: 'X 익명 계정' },
      { type: '반박', content: '시 측은 "모든 절차가 공정하게 진행됐으며, 관련 서류는 공개 가능"이라 해명', source: '청주시 보도자료' },
      { type: '확인필요', content: '공개된 내부 문서의 진위 여부 확인 필요. 원본 대조 미완료', source: '취재진 판단' },
    ],
    relatedDocs: [
      { title: '오송역세권 개발계획 변경안 (2025)', url: '#' },
      { title: '청주시 역세권 개발 조례 전문', url: '#' },
      { title: '유사사례: 세종시 역세권 특혜 논란 (2024)', url: '#' },
    ],
    summary: '오송역세권 개발 특혜 의혹은 3월 1일 SNS에서 시작되어 커뮤니티와 언론으로 빠르게 확산된 이슈입니다. 현재 시 측 해명과 추가 의혹 제기가 동시에 진행 중이며, 핵심 문서의 진위 확인이 필요한 상태입니다.',
  },
  'iss-05': {
    ...ISSUES[4],
    timeline: [
      { type: '최초발견', date: '2026-03-03T01:00:00', description: 'X에서 후보 B 가족 명의 부동산 거래 내역 공개', sourceUrl: '#' },
      { type: '확산', date: '2026-03-03T05:00:00', description: '시민단체 성명 + 커뮤니티 확산. 리포스트 3,100건', sourceUrl: '#' },
      { type: '언론진입', date: '2026-03-03T07:30:00', description: '연합뉴스 속보. 주요 언론사 후속 보도', sourceUrl: '#' },
    ],
    arguments: [
      { type: '주장', content: '후보 B 배우자 명의로 개발예정지 인근 토지를 사전 매입한 정황', source: '시민연대 성명' },
      { type: '반박', content: '후보 측 "개발 계획 공표 이전 거래이며, 투기 의도 없음"', source: '후보 B 캠프' },
      { type: '확인필요', content: '토지 매입 시점과 개발계획 내부 논의 시점 간 시차 확인 필요', source: '취재진 판단' },
    ],
    relatedDocs: [
      { title: '후보 B 재산신고 내역', url: '#' },
      { title: '해당 지역 개발계획 타임라인', url: '#' },
    ],
    summary: '시장 후보 B의 가족 부동산 거래가 투기 의혹으로 번진 사안. SNS에서 시작되어 빠르게 언론까지 확산. 거래 시점과 개발계획 시점 간 관계가 핵심 쟁점.',
  },
};

// Fill remaining issue details with generic data
ISSUES.forEach(issue => {
  if (!ISSUE_DETAILS[issue.id]) {
    ISSUE_DETAILS[issue.id] = {
      ...issue,
      timeline: [
        { type: '최초발견', date: issue.createdAt, description: `${issue.title} 관련 첫 신호 감지`, sourceUrl: '#' },
        { type: '확산', date: issue.createdAt, description: '커뮤니티 및 SNS를 통해 확산 중', sourceUrl: '#' },
      ],
      arguments: [
        { type: '주장', content: `${issue.brief}`, source: '다수 소스' },
        { type: '확인필요', content: '추가 취재를 통한 사실 확인 필요', source: '편집판단' },
      ],
      relatedDocs: [],
      summary: issue.brief,
    };
  }
});

export const KPI_DATA: KPI = {
  newIssues: 8,
  risingIssues: 6,
  highRiskSignals: 3,
  regionCoverage: 9,
  totalRegions: 11,
};

export function getIssuesByRegion(regionName: string): Issue[] {
  return ISSUES.filter(i => i.region === regionName).sort((a, b) => b.score - a.score);
}

export function searchIssues(query: string): Issue[] {
  const q = query.toLowerCase();
  return ISSUES.filter(i =>
    i.title.toLowerCase().includes(q) ||
    i.brief.toLowerCase().includes(q) ||
    i.keywords.some(k => k.toLowerCase().includes(q)) ||
    i.region.toLowerCase().includes(q)
  ).sort((a, b) => b.score - a.score);
}
