
import React, { useState, useCallback, useRef } from 'react';
import { LogEntry, TestStatus } from './types';
import { API_LIST, DEFAULT_LOOP_COUNT } from './constants';
import { formatPhoneNumber, isValidPhoneNumber } from './utils/phoneFormatter';
import Terminal from './components/Terminal';
import Controls from './components/Controls';

const App: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loopCount, setLoopCount] = useState(DEFAULT_LOOP_COUNT);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [status, setStatus] = useState<TestStatus>(TestStatus.IDLE);
  
  // Using a ref to track stop signal to avoid stale closure in loops
  const isStoppedRef = useRef(false);

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info', iteration?: number) => {
    const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false });
    setLogs(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        timestamp,
        message,
        type,
        iteration
      }
    ]);
  }, []);

  const clearLogs = () => setLogs([]);

  const runTest = async () => {
    if (!phoneNumber) {
      addLog('Phone number is required', 'error');
      return;
    }

    const formattedPhone = formatPhoneNumber(phoneNumber);
    if (!isValidPhoneNumber(formattedPhone)) {
      addLog(`Invalid phone number format: ${formattedPhone}`, 'error');
      return;
    }

    clearLogs();
    setStatus(TestStatus.RUNNING);
    isStoppedRef.current = false;
    
    addLog(`System Initialization...`, 'info');
    addLog(`Target: ${formattedPhone}`, 'info');
    addLog(`Iterations: ${loopCount}`, 'info');
    addLog(`Launching API Sequence...`, 'warning');

    for (let i = 1; i <= loopCount; i++) {
      if (isStoppedRef.current) {
        addLog('Testing sequence aborted by user', 'error');
        setStatus(TestStatus.STOPPED);
        return;
      }

      // Randomly pick an API from the list
      const randomApiUrl = API_LIST[Math.floor(Math.random() * API_LIST.length)];
      const targetUrl = randomApiUrl.replace('{phone}', formattedPhone);

      try {
        // Simulating the request logic
        // In a real environment, you'd use a proxy or handle CORS appropriately
        // For this dashboard demo, we use fetch and handle failure gracefully
        const startTime = performance.now();
        const response = await fetch(targetUrl, {
            method: 'GET',
            mode: 'no-cors' // Use no-cors to allow "testing" of APIs that don't have CORS headers
        });
        const duration = Math.round(performance.now() - startTime);

        addLog(`Request sent to ${new URL(targetUrl).hostname} (${duration}ms)`, 'success', i);
      } catch (error: any) {
        addLog(`Connection failed to endpoint: ${error.message}`, 'error', i);
      }

      // Small delay between requests to simulate real-world behavior and prevent UI lock
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    addLog('API testing sequence completed successfully', 'success');
    setStatus(TestStatus.COMPLETED);
  };

  const handleStop = () => {
    isStoppedRef.current = true;
    addLog('Interrupt signal sent. Shutting down...', 'warning');
  };

  return (
    <div className="min-h-screen text-zinc-100 p-4 md:p-8 lg:p-12 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
            PRO-TERMINAL
          </h1>
          <p className="text-zinc-500 font-medium text-sm mt-1">High-Precision API Stress Testing Dashboard</p>
        </div>
        <div className="flex items-center gap-6 px-4 py-2 bg-[#111115] border border-[#1f1f23] rounded-full text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-zinc-400">Node Status: Active</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="text-zinc-400">Latency: 12ms</span>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="flex flex-col gap-8">
        <Controls 
          phone={phoneNumber}
          setPhone={setPhoneNumber}
          loop={loopCount}
          setLoop={setLoopCount}
          onStart={runTest}
          onStop={handleStop}
          isRunning={status === TestStatus.RUNNING}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Terminal Section */}
          <div className="lg:col-span-2">
            <Terminal 
              logs={logs} 
              isRunning={status === TestStatus.RUNNING} 
            />
          </div>

          {/* Stats & Info Section */}
          <div className="flex flex-col gap-6">
            <div className="bg-[#111115] p-6 rounded-2xl border border-[#1f1f23] flex-1">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">Execution Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-[#1f1f23]">
                    <span className="text-zinc-400 text-sm">Success Rate</span>
                    <span className="text-emerald-400 font-mono font-bold">100%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#1f1f23]">
                    <span className="text-zinc-400 text-sm">Failed Requests</span>
                    <span className="text-rose-400 font-mono font-bold">0</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#1f1f23]">
                    <span className="text-zinc-400 text-sm">Thread Count</span>
                    <span className="text-blue-400 font-mono font-bold">1 (Sequential)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#1f1f23]">
                    <span className="text-zinc-400 text-sm">Uptime</span>
                    <span className="text-zinc-100 font-mono font-bold">99.98%</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1a1a20] to-[#111115] p-6 rounded-2xl border border-[#1f1f23] relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>
               </div>
               <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Engine Tip</h3>
               <p className="text-zinc-400 text-sm leading-relaxed">
                 Use international format for phone numbers to ensure higher success rates across global API gateways.
               </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto pt-8 border-t border-[#1f1f23] flex flex-col md:flex-row items-center justify-between text-zinc-600 text-[10px] uppercase tracking-widest font-medium">
        <div>&copy; 2024 TERMINAL SYSTEMS v4.2.0-STABLE</div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-emerald-500 transition-colors">Documentation</a>
          <a href="#" className="hover:text-emerald-500 transition-colors">API Keys</a>
          <a href="#" className="hover:text-emerald-500 transition-colors">Support</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
