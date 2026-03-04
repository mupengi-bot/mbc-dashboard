'use client';

import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { REGIONS, getIssuesByRegion } from '@/data/mock';
import geoData from '@/data/chungbuk-geo.json';
import IssueCard from './IssueCard';

// Attach heatScore to GeoJSON features
const enrichedGeo = {
  ...geoData,
  features: geoData.features.map(f => {
    const region = REGIONS.find(r => r.code === f.properties.code);
    return {
      ...f,
      properties: {
        ...f.properties,
        heatScore: region?.heatScore ?? 0,
        issueCount: region?.issueCount ?? 0,
      },
    };
  }),
};

export default function MapView() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const selectedIssues = selected ? getIssuesByRegion(selected) : [];

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '&copy; OpenStreetMap',
          },
        },
        layers: [
          {
            id: 'osm-tiles',
            type: 'raster',
            source: 'osm',
            paint: {
              'raster-saturation': -0.8,
              'raster-brightness-max': 0.35,
              'raster-contrast': 0.2,
            },
          },
        ],
      },
      center: [127.85, 36.75],
      zoom: 8.2,
      minZoom: 7,
      maxZoom: 12,
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.on('load', () => {
      map.addSource('chungbuk', {
        type: 'geojson',
        data: enrichedGeo as GeoJSON.FeatureCollection,
      });

      // Choropleth fill
      map.addLayer({
        id: 'chungbuk-fill',
        type: 'fill',
        source: 'chungbuk',
        paint: {
          'fill-color': [
            'interpolate', ['linear'], ['get', 'heatScore'],
            0, '#1a0000',
            20, '#4a1010',
            40, '#8b2020',
            60, '#c53030',
            80, '#ef4444',
            100, '#ff6b6b',
          ],
          'fill-opacity': 0.7,
        },
      });

      // Border
      map.addLayer({
        id: 'chungbuk-line',
        type: 'line',
        source: 'chungbuk',
        paint: {
          'line-color': '#06b6d4',
          'line-width': 1.5,
          'line-opacity': 0.6,
        },
      });

      // Labels
      map.addLayer({
        id: 'chungbuk-labels',
        type: 'symbol',
        source: 'chungbuk',
        layout: {
          'text-field': ['concat', ['get', 'name'], '\n', ['to-string', ['get', 'issueCount']], '건'],
          'text-size': 12,
          'text-font': ['Open Sans Regular'],
          'text-allow-overlap': true,
        },
        paint: {
          'text-color': '#e5e7eb',
          'text-halo-color': '#000000',
          'text-halo-width': 1.5,
        },
      });

      // Hover effect
      map.on('mouseenter', 'chungbuk-fill', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'chungbuk-fill', () => {
        map.getCanvas().style.cursor = '';
      });

      // Click
      map.on('click', 'chungbuk-fill', (e) => {
        const name = e.features?.[0]?.properties?.name;
        if (name) setSelected(name);
      });
    });

    mapRef.current = map;
    return () => map.remove();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 h-[calc(100vh-10rem)]">
      <div className="col-span-2 rounded-xl overflow-hidden border border-gray-800 relative">
        <div ref={mapContainer} className="w-full h-full" />
        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur border border-gray-700 rounded-lg p-3 text-[10px]">
          <p className="text-gray-400 mb-1.5 font-medium">이슈 강도</p>
          <div className="flex items-center gap-1">
            <div className="w-16 h-2 rounded-full" style={{ background: 'linear-gradient(to right, #1a0000, #4a1010, #8b2020, #c53030, #ef4444, #ff6b6b)' }} />
          </div>
          <div className="flex justify-between text-gray-500 mt-0.5">
            <span>낮음</span><span>높음</span>
          </div>
        </div>
      </div>

      <div className="col-span-1 overflow-y-auto pr-1">
        {selected ? (
          <div>
            <h2 className="text-sm font-bold text-cyan-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              {selected} 이슈 ({selectedIssues.length}건)
            </h2>
            <div className="space-y-3">
              {selectedIssues.map(iss => (
                <IssueCard key={iss.id} issue={iss} />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 text-center mt-8">
            <p className="text-2xl mb-2">🗺️</p>
            <p className="text-gray-500 text-sm">지도에서 지역을 클릭하세요</p>
          </div>
        )}
      </div>
    </div>
  );
}
