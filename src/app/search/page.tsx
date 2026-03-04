'use client';
import { useState } from 'react';
import { searchIssues } from '@/data/mock';
import IssueCard from '@/components/IssueCard';
import { Issue } from '@/types';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Issue[]>([]);
  const [searched, setSearched] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setResults(searchIssues(query.trim()));
    setSearched(true);
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-lg font-bold mb-1">이슈 검색</h1>
      <p className="text-xs text-gray-500 mb-4">키워드로 충북 선거 이슈를 검색합니다</p>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="키워드 입력 (예: 오송역, 교육감, 환경)"
          className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-cyan-600"
        />
        <button type="submit" className="bg-cyan-700 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
          검색
        </button>
      </form>

      {searched && (
        <div>
          <p className="text-xs text-gray-500 mb-3">
            &quot;{query}&quot; 검색 결과: {results.length}건
          </p>
          {results.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {results.map(iss => (
                <IssueCard key={iss.id} issue={iss} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
              <p className="text-gray-500 text-sm">검색 결과가 없습니다</p>
            </div>
          )}
        </div>
      )}

      {!searched && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-sm font-bold text-gray-400 mb-3">추천 검색어</h2>
          <div className="flex flex-wrap gap-2">
            {['오송역', '교육감', '부동산', '환경', '메가폴리스', '반도체', 'BRT', '급식', '금강', '케이블카'].map(k => (
              <button key={k} onClick={() => { setQuery(k); setResults(searchIssues(k)); setSearched(true); }}
                className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-400 hover:text-cyan-300 transition-colors">
                {k}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
