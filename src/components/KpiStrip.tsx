import { KPI } from '@/types';

const items = (kpi: KPI) => [
  { label: '신규 이슈', value: kpi.newIssues, gradient: 'linear-gradient(135deg, #007AFF, #5AC8FA)', icon: '🆕' },
  { label: '급상승', value: kpi.risingIssues, gradient: 'linear-gradient(135deg, #FF9500, #FFCC00)', icon: '🔥' },
  { label: '고위험 신호', value: kpi.highRiskSignals, gradient: 'linear-gradient(135deg, #FF3B30, #FF6482)', icon: '🚨' },
  { label: '지역 커버리지', value: `${kpi.regionCoverage}/${kpi.totalRegions}`, gradient: 'linear-gradient(135deg, #34C759, #30D158)', icon: '📍' },
];

export default function KpiStrip({ kpi }: { kpi: KPI }) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-7">
      {items(kpi).map(i => (
        <div key={i.label}
          className="rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-default"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
          }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-medium uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
              {i.label}
            </p>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
              style={{ background: i.gradient }}>
              <span className="brightness-0 invert">{i.icon}</span>
            </div>
          </div>
          <p className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {i.value}
          </p>
        </div>
      ))}
    </div>
  );
}
