import { ChannelMix } from '@/types';

export default function ChannelBar({ mix }: { mix: ChannelMix }) {
  const total = mix.sns + mix.community + mix.press;
  const pSns = (mix.sns / total) * 100;
  const pCom = (mix.community / total) * 100;
  return (
    <div className="flex h-1.5 rounded-full overflow-hidden" style={{ background: '#F2F2F7' }}>
      <div style={{ width: `${pSns}%`, background: '#3478F6', borderRadius: '999px 0 0 999px' }} />
      <div style={{ width: `${pCom}%`, background: '#30D158' }} />
      <div style={{ width: `${100 - pSns - pCom}%`, background: '#FF9F0A', borderRadius: '0 999px 999px 0' }} />
    </div>
  );
}
