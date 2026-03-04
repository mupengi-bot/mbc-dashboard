import { ISSUES, KPI_DATA } from '@/data/mock';
import KpiStrip from '@/components/KpiStrip';
import IssueCard from '@/components/IssueCard';
import BriefPanel from '@/components/BriefPanel';

const sorted = [...ISSUES].sort((a, b) => b.score - a.score);

export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            충북 상황판
          </h1>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
            2026.03.03 09:00 기준 · 실시간 이슈 추적
          </p>
        </div>
        <div className="flex gap-1.5 text-xs">
          {['2시간', '24시간', '7일'].map((t, i) => (
            <button key={t} className="px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all duration-200"
              style={{
                background: i === 1 ? '#0071E3' : 'var(--bg-card)',
                color: i === 1 ? 'white' : 'var(--text-secondary)',
                border: i === 1 ? 'none' : '1px solid var(--border)',
                boxShadow: i === 1 ? '0 2px 8px rgba(0,113,227,0.25)' : '0 1px 2px rgba(0,0,0,0.04)',
              }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <KpiStrip kpi={KPI_DATA} />

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {sorted.slice(0, 12).map(iss => (
            <IssueCard key={iss.id} issue={iss} />
          ))}
        </div>
        <div className="col-span-1">
          <BriefPanel issues={sorted} />
        </div>
      </div>
    </div>
  );
}
