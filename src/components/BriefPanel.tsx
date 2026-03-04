import { Issue } from '@/types';

export default function BriefPanel({ issues }: { issues: Issue[] }) {
  const top5 = issues.slice(0, 5);
  const eduIssues = issues.filter(i => i.target === '교육감').slice(0, 3);

  return (
    <div className="rounded-2xl p-6 sticky top-8"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
      }}>
      <h2 className="text-[15px] font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        📋 오늘 회의용 브리프
      </h2>

      <section className="mb-5">
        <h3 className="text-[11px] font-medium uppercase tracking-wider mb-3"
          style={{ color: 'var(--text-tertiary)' }}>TOP 5 이슈</h3>
        <ol className="space-y-3">
          {top5.map((iss, i) => (
            <li key={iss.id} className="text-[12px]">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-[13px] w-5" style={{ color: '#0071E3' }}>{i + 1}</span>
                <div>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{iss.title}</span>
                  <span className="ml-1.5 text-[11px]" style={{ color: 'var(--text-tertiary)' }}>({iss.region})</span>
                  <p className="mt-0.5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{iss.brief}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {eduIssues.length > 0 && (
        <section className="mb-5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
          <h3 className="text-[11px] font-medium uppercase tracking-wider mb-3"
            style={{ color: 'var(--text-tertiary)' }}>🎓 교육감 이슈</h3>
          <ul className="space-y-1.5">
            {eduIssues.map(iss => (
              <li key={iss.id} className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>• {iss.title}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="pt-4" style={{ borderTop: '1px solid var(--border)' }}>
        <h3 className="text-[11px] font-medium uppercase tracking-wider mb-3"
          style={{ color: 'var(--text-tertiary)' }}>⚠️ 취재 포인트</h3>
        <ul className="space-y-1.5 text-[12px]" style={{ color: 'var(--text-secondary)' }}>
          <li>• 오송역 개발 관련 내부 문서 진위 확인</li>
          <li>• 교육감 후보 A 학력 증빙 원본 확보</li>
          <li>• 시장 후보 B 토지 매입 시점 vs 개발계획 일정 대조</li>
          <li>• 충주 메가폴리스 예산 집행 내역 정보공개청구</li>
          <li>• 청주 산단 유해물질 측정 데이터 확보</li>
        </ul>
      </section>
    </div>
  );
}
