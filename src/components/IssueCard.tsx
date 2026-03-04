import Link from 'next/link';
import { Issue } from '@/types';
import ChannelBar from './ChannelBar';

const riskStyle: Record<string, { bg: string; color: string }> = {
  high: { bg: '#FFF0EF', color: '#FF3B30' },
  medium: { bg: '#FFF8E6', color: '#C7930A' },
  low: { bg: '#F2F2F7', color: '#8E8E93' },
};
const editStyle: Record<string, { bg: string; color: string }> = {
  '바로 아이템 가능': { bg: '#E8F4FD', color: '#0071E3' },
  '추적 필요': { bg: '#F3EEFF', color: '#8944EB' },
  '팩트 확인 우선': { bg: '#FFF3E8', color: '#D4760A' },
  '확산 강하나 근거 약함': { bg: '#FFE8EE', color: '#D63864' },
};

export default function IssueCard({ issue }: { issue: Issue }) {
  const risk = riskStyle[issue.riskLevel] || riskStyle.low;
  const edit = editStyle[issue.editSuggestion] || { bg: '#F2F2F7', color: '#8E8E93' };

  return (
    <Link href={`/issue/${issue.id}`}
      className="group block rounded-2xl p-5 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
      }}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-semibold text-[14px] leading-snug flex-1" style={{ color: 'var(--text-primary)' }}>
          {issue.title}
        </h3>
        <span className="text-[11px] font-semibold whitespace-nowrap px-2 py-0.5 rounded-full"
          style={{ background: '#E8FAF0', color: '#30A46C' }}>
          ▲{issue.riseSpeed}%
        </span>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full"
          style={{ background: '#F2F2F7', color: 'var(--text-secondary)' }}>
          {issue.region}
        </span>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full"
          style={{ background: '#F2F2F7', color: 'var(--text-secondary)' }}>
          {issue.target}
        </span>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full"
          style={{ background: risk.bg, color: risk.color }}>
          {issue.riskLevel === 'high' ? '🔴 고위험' : issue.riskLevel === 'medium' ? '🟡 주의' : '저위험'}
        </span>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full"
          style={{ background: edit.bg, color: edit.color }}>
          {issue.editSuggestion}
        </span>
      </div>

      {/* Brief */}
      <p className="text-[12px] leading-relaxed mb-3 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
        {issue.brief}
      </p>

      {/* Keywords */}
      <div className="flex gap-1.5 mb-3">
        {issue.keywords.map(k => (
          <span key={k} className="text-[10px] px-2 py-0.5 rounded-full font-medium"
            style={{ background: 'var(--bg-primary)', color: 'var(--text-tertiary)' }}>
            #{k}
          </span>
        ))}
      </div>

      {/* Channel Mix */}
      <ChannelBar mix={issue.channelMix} />
      <div className="flex justify-between mt-1.5 text-[10px] font-medium">
        <span style={{ color: '#3478F6' }}>SNS {issue.channelMix.sns}%</span>
        <span style={{ color: '#30D158' }}>커뮤 {issue.channelMix.community}%</span>
        <span style={{ color: '#FF9F0A' }}>언론 {issue.channelMix.press}%</span>
      </div>
    </Link>
  );
}
