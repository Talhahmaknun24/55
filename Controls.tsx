
import React from 'react';
import { Play, Square, Hash, Phone } from 'lucide-react';

// Inline Icons (Lucide-like implementation without external deps for simplicity)
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
);
const SquareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>
);

interface ControlsProps {
  phone: string;
  setPhone: (val: string) => void;
  loop: number;
  setLoop: (val: number) => void;
  onStart: () => void;
  onStop: () => void;
  isRunning: boolean;
}

const Controls: React.FC<ControlsProps> = ({ 
  phone, setPhone, loop, setLoop, onStart, onStop, isRunning 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end bg-[#111115] p-6 rounded-2xl border border-[#1f1f23]">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-1">Target Phone</label>
        <div className="relative group">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </span>
          <input 
            type="text" 
            placeholder="e.g. +8801712345678" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={isRunning}
            className="w-full bg-[#1a1a20] border border-[#2a2a30] text-zinc-100 px-10 py-3 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all disabled:opacity-50"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-1">Iteration Count</label>
        <div className="relative group">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>
          </span>
          <input 
            type="number" 
            min="1"
            max="1000"
            value={loop}
            onChange={(e) => setLoop(parseInt(e.target.value) || 0)}
            disabled={isRunning}
            className="w-full bg-[#1a1a20] border border-[#2a2a30] text-zinc-100 px-10 py-3 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all disabled:opacity-50"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={onStart}
          disabled={isRunning}
          className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800/30 disabled:text-emerald-400/30 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 active:scale-95"
        >
          <PlayIcon />
          <span>START</span>
        </button>
        <button 
          onClick={onStop}
          disabled={!isRunning}
          className="flex-1 bg-rose-600 hover:bg-rose-500 disabled:bg-rose-800/30 disabled:text-rose-400/30 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-900/20 active:scale-95"
        >
          <SquareIcon />
          <span>STOP</span>
        </button>
      </div>

      <div className="hidden lg:block">
        <div className="bg-[#1a1a20] p-3 rounded-xl border border-[#2a2a30] flex flex-col justify-center items-center h-full">
            <span className="text-[10px] text-zinc-500 uppercase tracking-tighter">System Engine</span>
            <span className={`text-sm font-bold tracking-widest ${isRunning ? 'text-emerald-500 animate-pulse' : 'text-zinc-600'}`}>
                {isRunning ? 'OPERATIONAL' : 'IDLE'}
            </span>
        </div>
      </div>
    </div>
  );
};

export default Controls;
