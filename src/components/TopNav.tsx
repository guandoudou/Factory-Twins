import React from 'react';
import { DemoState } from '../types';
import { BrainCircuit, Activity } from 'lucide-react';
import { motion } from 'motion/react';

interface TopNavProps {
  simTime: string;
  demoState: DemoState;
  onAdvance: () => void;
}

export function TopNav({ simTime, demoState, onAdvance }: TopNavProps) {
  const isHealthy = demoState !== 'exception' && demoState !== 'exception_reasoning';

  return (
    <header className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
      <div className="flex items-center gap-4">
        <div className="bg-indigo-600 p-2 rounded">
          <BrainCircuit className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white uppercase">Factory Brain <span className="text-indigo-400 font-light">0.9</span></h1>
          <p className="text-xs text-slate-400 uppercase tracking-widest">工业自主运营智能体</p>
        </div>
      </div>
      
      <div className="flex items-center gap-8 bg-slate-900/50 px-6 py-2 rounded-full border border-slate-800">
        <div className="text-center">
          <p className="text-[10px] text-slate-500 uppercase font-bold">工厂健康度</p>
          <p className="text-xl font-mono text-emerald-400">96 <span className="text-xs">分</span></p>
        </div>
        <div className="w-px h-8 bg-slate-800"></div>
        <div className="text-center">
          <p className="text-[10px] text-slate-500 uppercase font-bold">系统状态</p>
          <motion.p 
            key={isHealthy ? 'normal' : 'alert'}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-lg font-mono font-bold ${isHealthy ? 'text-indigo-400' : 'text-rose-500'}`}
          >
            {isHealthy ? '最优' : '重新平衡中'}
          </motion.p>
        </div>
        <div className="w-px h-8 bg-slate-800"></div>
        <div className="text-center">
          <p className="text-[10px] text-slate-500 uppercase font-bold">模拟时间</p>
          <p className="text-xl font-mono text-white">{simTime}</p>
        </div>
      </div>
    </header>
  );
}
