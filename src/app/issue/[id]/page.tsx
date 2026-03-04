import { ISSUE_DETAILS, ISSUES } from '@/data/mock';
import ChannelBar from '@/components/ChannelBar';
import Link from 'next/link';

const timelineIcon: Record<string, string> = {
  '최초발견': '🔍', '확산': '📢', '언론진입': '📰', '전환': '🔄', '재점화': '🔥',
};
const argColor: Record<string, string> = {
  '주장': 'border-blue-500/50 bg-blue-500/10', '반박': 'border-orange-500/50 bg-orange-500/10', '확인필요': 'border-yellow-500/50 bg-yellow-500/10',
};

export function generateStaticParams() {
  return ISSUES.map(i => ({ id: i.id }));
}

export default async function IssueDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const detail = ISSUE_DETAILS[id];
  if (!detail) return <div className="text-red-400">이슈를 찾을 수 없습니다.</div>;

  const riskStyle = detail.riskLevel === 'high' ? 'text-red-400' : detail.riskLevel === 'medium' ? 'text-yellow-400' : 'text-gray-400';

  return (
    <div className="max-w-4xl">
      <Link href="/" className="text-xs text-gray-500 hover:text-cyan-400 mb-4 inline-block">← 상황판으로</Link>

      {/* Header */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-5 mb-4">
        <h1 className="text-xl font-bold mb-2">{detail.title}</h1>
        <div className="flex flex-wrap gap-2 mb-3 text-xs">
          <span className="px-2 py-0.5 rounded bg-gray-800 border border-gray-700">{detail.region}</span>
          <span className="px-2 py-0.5 rounded bg-gray-800 border border-gray-700">{detail.target}</span>
          <span className={`px-2 py-0.5 rounded bg-gray-800 border border-gray-700 ${riskStyle}`}>
            {detail.riskLevel === 'high' ? '🔴 고위험' : detail.riskLevel === 'medium' ? '🟡 주의' : '저위험'}
          </span>
          <span className="px-2 py-0.5 rounded bg-cyan-900/30 border border-cyan-700/30 text-cyan-300">{detail.editSuggestion}</span>
          <span className="px-2 py-0.5 rounded bg-gray-800 border border-gray-700">상태: {detail.status}</span>
          <span className="px-2 py-0.5 rounded bg-gray-800 border border-gray-700 text-emerald-400">▲{detail.riseSpeed}%</span>
        </div>
        <p className="text-sm text-gray-300 mb-3">{detail.summary}</p>
        <ChannelBar mix={detail.channelMix} />
        <div className="flex gap-4 mt-1 text-[10px] text-gray-500">
          <span className="text-blue-400">SNS {detail.channelMix.sns}%</span>
          <span className="text-green-400">커뮤니티 {detail.channelMix.community}%</span>
          <span className="text-orange-400">언론 {detail.channelMix.press}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Timeline */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <h2 className="text-sm font-bold text-cyan-400 mb-3">📅 타임라인</h2>
          <div className="space-y-3">
            {detail.timeline.map((ev, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span className="text-lg">{timelineIcon[ev.type] || '•'}</span>
                  {i < detail.timeline.length - 1 && <div className="w-px flex-1 bg-gray-700 mt-1" />}
                </div>
                <div className="flex-1 pb-3">
                  <p className="text-xs text-gray-500">{new Date(ev.date).toLocaleString('ko-KR')}</p>
                  <p className="text-xs font-medium text-gray-300 mt-0.5">{ev.type}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{ev.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arguments */}
        <div className="space-y-4">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <h2 className="text-sm font-bold text-cyan-400 mb-3">⚖️ 논점 카드</h2>
            <div className="space-y-2">
              {detail.arguments.map((arg, i) => (
                <div key={i} className={`border rounded-lg p-3 ${argColor[arg.type] || ''}`}>
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {arg.type === '주장' ? '💬 주장' : arg.type === '반박' ? '🔁 반박' : '❓ 확인필요'}
                  </span>
                  <p className="text-xs text-gray-300 mt-1">{arg.content}</p>
                  {arg.source && <p className="text-[10px] text-gray-500 mt-1">출처: {arg.source}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Sources & Related */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <h2 className="text-sm font-bold text-cyan-400 mb-3">🔗 근거 링크</h2>
            <ul className="space-y-1.5">
              {detail.links.map((lnk, i) => (
                <li key={i} className="text-xs flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${lnk.channel === 'sns' ? 'bg-blue-500' : lnk.channel === 'community' ? 'bg-green-500' : 'bg-orange-500'}`} />
                  <a href={lnk.url} className="text-gray-300 hover:text-cyan-400">{lnk.title}</a>
                </li>
              ))}
            </ul>
            {detail.relatedDocs.length > 0 && (
              <>
                <h3 className="text-xs text-gray-500 mt-4 mb-2">관련 문서</h3>
                <ul className="space-y-1">
                  {detail.relatedDocs.map((d, i) => (
                    <li key={i} className="text-xs text-gray-400">• {d.title}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
