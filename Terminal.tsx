
import React, { useEffect, useRef } from 'react';
import { LogEntry } from '../types';
import { LOG_COLORS } from '../constants';

interface TerminalProps {
  logs: LogEntry[];
  isRunning: boolean;
}

const Terminal: React.FC<TerminalProps> = ({ logs, isRunning }) => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-[#0f0f13] border border-[#1f1f23] rounded-xl overflow-hidden shadow-2xl flex flex-col h-[500px]">
      <div className="bg-[#1a1a20] px-4 py-2 border-b border-[#1f1f23] flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
        </div>
        <div className="text-xs text-zinc-500 font-medium tracking-widest uppercase">
          Output Console
        </div>
        <div className="w-12"></div>
      </div>
      
      <div 
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto terminal-scroll mono text-sm font-light"
      >
        {logs.length === 0 ? (
          <div className="text-zinc-600 italic">Waiting for input to start testing...</div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="mb-1.5 animate-in fade-in slide-in-from-left-2 duration-300">
              <span className="text-zinc-600 mr-2">[{log.timestamp}]</span>
              {log.iteration !== undefined && (
                <span className="text-zinc-400 mr-2">#{log.iteration}</span>
              )}
              <span className={`${LOG_COLORS[log.type]} font-medium`}>
                {log.type.toUpperCase()}:
              </span>
              <span className="text-zinc-300 ml-2">{log.message}</span>
            </div>
          ))
        )}
        {isRunning && (
          <div className="mt-2 flex items-center">
            <span className="text-emerald-500">root@system:~#</span>
            <span className="cursor"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
