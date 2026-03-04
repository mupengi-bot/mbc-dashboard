export type ChannelType = 'sns' | 'community' | 'press';
export type RiskLevel = 'high' | 'medium' | 'low';
export type EditSuggestion = '바로 아이템 가능' | '추적 필요' | '팩트 확인 우선' | '확산 강하나 근거 약함';
export type IssueStatus = '상승' | '정체' | '하락' | '재점화';
export type TargetType = '시장군수' | '교육감' | '혼합';
export type TimelineEventType = '최초발견' | '확산' | '언론진입' | '전환' | '재점화';
export type ArgumentType = '주장' | '반박' | '확인필요';

export interface ChannelMix {
  sns: number;
  community: number;
  press: number;
}

export interface SourceLink {
  title: string;
  url: string;
  channel: ChannelType;
}

export interface Issue {
  id: string;
  title: string;
  region: string;
  target: TargetType;
  riseSpeed: number; // percentage
  channelMix: ChannelMix;
  keywords: string[];
  brief: string;
  links: SourceLink[];
  editSuggestion: EditSuggestion;
  riskLevel: RiskLevel;
  status: IssueStatus;
  createdAt: string;
  score: number;
  topicCategory: string;
}

export interface TimelineEvent {
  type: TimelineEventType;
  date: string;
  description: string;
  sourceUrl?: string;
}

export interface Argument {
  type: ArgumentType;
  content: string;
  source?: string;
}

export interface IssueDetail extends Issue {
  timeline: TimelineEvent[];
  arguments: Argument[];
  relatedDocs: { title: string; url: string }[];
  summary: string;
}

export interface Region {
  code: string;
  name: string;
  issueCount: number;
  topIssueId: string;
  heatScore: number;
}

export interface KPI {
  newIssues: number;
  risingIssues: number;
  highRiskSignals: number;
  regionCoverage: number;
  totalRegions: number;
}
