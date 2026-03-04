'use client';

import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

export default function MapPage() {
  return (
    <div>
      <h1 className="text-lg font-bold mb-1">충북 이슈 히트맵</h1>
      <p className="text-xs text-gray-500 mb-4">지역별 이슈 강도 · 클릭하면 해당 지역 이슈 표시</p>
      <MapView />
    </div>
  );
}
