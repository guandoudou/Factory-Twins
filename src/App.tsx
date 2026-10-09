/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DemoState, EventLog } from './types';
import { FactoryMap } from './components/FactoryMap';
import { EventStream } from './components/EventStream';
import { AIReasoningPanel } from './components/AIReasoningPanel';
import { TopNav } from './components/TopNav';
import { motion, AnimatePresence } from 'motion/react';
import { FinalReport } from './components/FinalReport';

export default function App() {
  const [demoState, setDemoState] = useState<DemoState>('idle');
  const [simTime, setSimTime] = useState('09:00:00');
  const [events, setEvents] = useState<EventLog[]>([]);

  // Demo progression controller for the presenter
  const advanceDemo = () => {
    const sequence: DemoState[] = [
      'idle',
      'initializing',
      'reasoning',
      'recommendations',
      'kpi_update',
      'exception',
      'exception_reasoning',
      'rebalanced',
      'chat',
      'report'
    ];
    const currentIndex = sequence.indexOf(demoState);
    if (currentIndex < sequence.length - 1) {
      setDemoState(sequence[currentIndex + 1]);
    }
  };

  const addEvent = (msg: string, type: EventLog['type'] = 'info') => {
    setEvents(prev => [{
      id: Math.random().toString(36).substring(7),
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      message: msg,
      type
    }, ...prev].slice(0, 50));
  };

  // Simulated Time Progression
  useEffect(() => {
    const timer = setInterval(() => {
      setSimTime(prev => {
        const [h, m, s] = prev.split(':').map(Number);
        let newS = s + 1;
        let newM = m;
        let newH = h;
        if (newS >= 60) { newS = 0; newM += 1; }
        if (newM >= 60) { newM = 0; newH += 1; }
        return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}:${String(newS).padStart(2, '0')}`;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Demo State Effects
  useEffect(() => {
    if (demoState === 'initializing') {
      addEvent('Factory Brain 系统已激活。', 'info');
      addEvent('收到来自苹果、华为、宝洁、茅台等客户的 102 张订单。', 'info');
    } else if (demoState === 'exception') {
      addEvent('严重：2号印刷机检测到故障。', 'error');
    }
  }, [demoState]);

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans p-6 selection:bg-indigo-500/30">
      <TopNav simTime={simTime} demoState={demoState} onAdvance={advanceDemo} />
      
      <main className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        {/* Left: Event Stream */}
        <aside className="col-span-3 flex flex-col gap-4">
          <div className="bg-slate-900/40 rounded-xl border border-slate-800 p-4 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span> 实时上下文流
              </h3>
              <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded font-mono">{simTime}</span>
            </div>
            <EventStream events={events} />
          </div>
          
          <div className="bg-indigo-950/20 rounded-xl border border-indigo-500/30 p-4">
            <p className="text-[10px] text-indigo-400 uppercase font-bold mb-2 tracking-widest">智能体状态</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-900 rounded p-2 text-center border border-slate-800">
                <p className="text-[10px] text-slate-500">订单智能体</p>
                <p className="text-xs text-emerald-400 font-mono">优化中</p>
              </div>
              <div className="bg-slate-900 rounded p-2 text-center border border-slate-800">
                <p className="text-[10px] text-slate-500">物料智能体</p>
                <p className="text-xs text-indigo-400 font-mono">稳定</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Center: Digital Twin Map */}
        <section className="col-span-6 flex flex-col relative">
          <FactoryMap demoState={demoState} advanceDemo={advanceDemo} />
          
          <AnimatePresence>
             {demoState === 'report' && (
                <FinalReport onClose={() => setDemoState('chat')} />
             )}
          </AnimatePresence>
        </section>

        {/* Right: AI Reasoning & Chat */}
        <aside className="col-span-3 flex flex-col gap-4">
           <AIReasoningPanel demoState={demoState} advanceDemo={advanceDemo} />
        </aside>
      </main>

      {/* Bottom Recommendation Bar (Only shows after reasoning is complete) */}
      {['recommendations', 'kpi_update', 'exception', 'exception_reasoning', 'rebalanced', 'chat', 'report'].includes(demoState) && (
        <footer className="mt-6 bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-6 shrink-0 shadow-lg shadow-indigo-500/5">
          <div className="flex items-center gap-3 pr-6 border-r border-slate-800">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">制造副总裁助手</p>
              <AnimatePresence mode="wait">
                <motion.p 
                  key={demoState}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs text-white italic"
                >
                  {demoState === 'exception' || demoState === 'exception_reasoning' 
                    ? '“警告：设备故障，需要立即重新规划。”' 
                    : '“将订单28切换至2号产线，以减轻纸张延迟的影响。”'}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
          
          <div className="flex-1 flex gap-4 overflow-hidden">
            <div className="flex-1 bg-slate-950 px-4 py-2 rounded-lg border border-slate-800">
              <p className="text-[9px] text-indigo-400 font-bold uppercase">人员排班调整</p>
              <p className="text-[10px] text-slate-300">将夜班人员提前至14:00应对高峰。</p>
            </div>
            <div className="flex-1 bg-slate-950 px-4 py-2 rounded-lg border border-slate-800">
              <p className="text-[9px] text-emerald-400 font-bold uppercase">节能优化</p>
              <p className="text-[10px] text-slate-300">暂停覆膜机03（空闲），可节省4%能耗。</p>
            </div>
          </div>

          <div className="flex items-center gap-2 pl-6">
             <div className={`w-3 h-3 rounded-full animate-pulse ${demoState === 'exception' || demoState === 'exception_reasoning' ? 'bg-red-500' : 'bg-indigo-500'}`}></div>
             <span className="text-[10px] font-mono text-slate-500 uppercase">{demoState === 'exception' || demoState === 'exception_reasoning' ? '等待处理' : '系统已同步'}</span>
          </div>
        </footer>
      )}

      {/* Presenter Controls (Hidden in real UI, useful for demo) */}
      <button 
        onClick={advanceDemo}
        className="fixed bottom-4 right-4 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-xs font-mono opacity-20 hover:opacity-100 transition-opacity z-50 border border-slate-700"
      >
        NEXT_STATE: {demoState}
      </button>
    </div>
  );
}
