'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/', label: '상황판', icon: '📊', desc: '실시간 이슈 대시보드' },
  { href: '/map', label: '히트맵', icon: '🗺️', desc: '지역별 이슈 강도' },
  { href: '/search', label: '검색', icon: '🔍', desc: '키워드 이슈 탐색' },
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside className="fixed left-0 top-0 h-screen w-60 flex flex-col z-50"
      style={{ background: 'var(--bg-sidebar)', borderRight: '1px solid var(--border)' }}>
      {/* Brand */}
      <div className="p-6 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl flex items-center justify-center text-base"
            style={{ background: 'linear-gradient(135deg, #0071E3, #34C759)', color: 'white' }}>
            📡
          </div>
          <div>
            <h1 className="text-[13px] font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Meta-Desk
            </h1>
            <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>MBC충북 선거 레이더</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        <p className="text-[10px] font-medium uppercase tracking-widest px-3 mb-3"
          style={{ color: 'var(--text-tertiary)' }}>메뉴</p>
        {NAV.map(n => {
          const active = n.href === '/' ? path === '/' : path.startsWith(n.href);
          return (
            <Link key={n.href} href={n.href}
              className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200"
              style={{
                background: active ? 'rgba(0,113,227,0.08)' : 'transparent',
                color: active ? '#0071E3' : 'var(--text-secondary)',
              }}>
              <span className="text-base">{n.icon}</span>
              <div>
                <p className="font-medium text-[13px]">{n.label}</p>
                <p className="text-[10px]" style={{ color: active ? 'rgba(0,113,227,0.5)' : 'var(--text-tertiary)' }}>
                  {n.desc}
                </p>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Status */}
      <div className="p-5" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>시스템 정상 가동</span>
        </div>
        <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>2026 지방선거 · v0.3</p>
      </div>
    </aside>
  );
}
