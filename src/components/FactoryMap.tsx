import React from 'react';
import { DemoState } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Printer, Scissors, Layers, Sparkles, BoxSelect, Box, Package, Truck, BrainCircuit, Activity } from 'lucide-react';

interface FactoryMapProps {
  demoState: DemoState;
  advanceDemo: () => void;
}

const areas = [
  { id: 'print', name: '印刷', en: 'Printing', icon: Printer },
  { id: 'diecut', name: '模切', en: 'Die-cutting', icon: Scissors },
  { id: 'mount', name: '裱纸', en: 'Mounting', icon: BoxSelect },
  { id: 'form', name: '成型', en: 'Forming', icon: Box },
  { id: 'laminate', name: '覆膜', en: 'Laminating', icon: Layers },
  { id: 'pack', name: '包装', en: 'Packaging', icon: Package },
  { id: 'stamping', name: '烫金', en: 'Stamping', icon: Sparkles },
  { id: 'logistics', name: '物流', en: 'Logistics', icon: Truck },
];

export function FactoryMap({ demoState, advanceDemo }: FactoryMapProps) {
  const getAreaStatus = (id: string) => {
    if (demoState === 'exception' || demoState === 'exception_reasoning') {
      if (id === 'print') return 'error';
      if (id === 'logistics' || id === 'pack') return 'risk';
      return 'normal';
    }
    if (demoState === 'rebalanced') {
       if (id === 'print') return 'busy';
       return 'normal';
    }
    if (demoState === 'recommendations' || demoState === 'kpi_update') {
       if (id === 'print' || id === 'diecut') return 'busy';
       if (id === 'laminate') return 'normal';
    }
    return 'normal'; // default
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'error': return 'bg-red-500';
      case 'risk': return 'bg-amber-500';
      case 'busy': return 'bg-indigo-500';
      default: return 'bg-emerald-500';
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'error': return 'border-red-500/50 bg-red-500/10 text-red-400';
      case 'risk': return 'border-amber-500/50 bg-amber-500/10 text-amber-400';
      case 'busy': return 'border-indigo-500/50 bg-indigo-500/10 text-indigo-400';
      default: return 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400';
    }
  };

  const getAreaDetail = (id: string, status: string) => {
    if (id === 'print') return status === 'error' ? 'ERR-2 伺服故障' : status === 'busy' ? '队列: 4 | OEE: 98%' : 'OEE: 92% | 12k/h';
    if (id === 'diecut') return status === 'busy' ? '负载: 98% | WIP: 120' : '负载: 85% | 7.5k/h';
    if (id === 'mount') return '状态: 连续 | 8k/h';
    if (id === 'form') return '良率: 99.8% | 产出: 15k';
    if (id === 'laminate') return '张力: 正常 | 110°C';
    if (id === 'pack') return '打包线: 4/4 | 90/m';
    if (id === 'stamping') return '压力: 12MPa | 150°C';
    if (id === 'logistics') return status === 'risk' ? '预警: 16:20 运力不足' : '准点率: 98% | 车辆: 12/12';
    return '正常';
  };

  return (
    <div className="flex-1 w-full h-full relative bg-slate-900/20 rounded-xl border border-slate-800 p-6 flex flex-col">
      {/* Title */}
      <h2 className="text-xs font-bold uppercase text-slate-500 mb-6 relative z-20">裕同工厂数字地图 - 东厂区</h2>

      {/* Background SVG Flow Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
         <g stroke="currentColor" className="text-indigo-500" strokeWidth="2" fill="none">
           <path d="M 12.5% 16.6% L 37.5% 16.6% L 62.5% 16.6% L 87.5% 16.6% L 87.5% 50% L 87.5% 83.3% L 62.5% 83.3%" className="animate-flow" />
           <path d="M 12.5% 16.6% L 12.5% 50% L 12.5% 83.3%" className="animate-flow" />
         </g>
      </svg>

      {/* Exception Overlay Effect */}
      <AnimatePresence>
        {(demoState === 'exception' || demoState === 'exception_reasoning') && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="absolute inset-0 bg-red-500/10 pointer-events-none z-10 rounded-xl"
          />
        )}
      </AnimatePresence>

      <div className="grid grid-cols-4 grid-rows-3 gap-4 flex-1 relative z-20">
        {/* Row 1 */}
        {renderArea(areas[0], getAreaStatus(areas[0].id), demoState, advanceDemo)}
        {renderArea(areas[1], getAreaStatus(areas[1].id), demoState, advanceDemo)}
        {renderArea(areas[2], getAreaStatus(areas[2].id), demoState, advanceDemo)}
        {renderArea(areas[3], getAreaStatus(areas[3].id), demoState, advanceDemo)}
        
        {/* Row 2 */}
        {renderArea(areas[4], getAreaStatus(areas[4].id), demoState, advanceDemo)}
        
        {/* AI Center */}
        <div className="col-span-2 row-span-2 border-2 border-indigo-500/40 bg-indigo-500/5 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.15),transparent_70%)] pointer-events-none"></div>
          <div className="z-10 flex flex-col items-center">
             <BrainCircuit className="w-12 h-12 text-indigo-400 mb-2 opacity-80" strokeWidth={1.5} />
             <p className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 mb-1">自主调度中枢</p>
             <p className="text-sm text-white font-mono uppercase flex items-center gap-2">
               {demoState === 'exception' || demoState === 'exception_reasoning' ? (
                 <><Activity className="w-4 h-4 text-red-400 animate-pulse" /> 重新规划中...</>
               ) : (
                 <><Activity className="w-4 h-4 text-emerald-400" /> 全局平衡状态</>
               )}
             </p>
          </div>
        </div>
        
        {renderArea(areas[5], getAreaStatus(areas[5].id), demoState, advanceDemo)}

        {/* Row 3 */}
        {renderArea(areas[6], getAreaStatus(areas[6].id), demoState, advanceDemo)}
        {renderArea(areas[7], getAreaStatus(areas[7].id), demoState, advanceDemo)}
      </div>
    </div>
  );

  function renderArea(area: any, status: string, demoState: DemoState, advanceDemo: () => void) {
    const Icon = area.icon;
    return (
      <div key={area.id} className={`border rounded-xl p-4 flex flex-col justify-between relative transition-all duration-300 z-10 ${getStatusStyle(status)} ${status === 'error' ? 'animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'hover:scale-105'}`}>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 opacity-70" />
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight">{area.name}</span>
              <span className="text-[9px] font-mono tracking-wider opacity-60 uppercase">{area.en}</span>
            </div>
          </div>
          <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(status)} ${status === 'error' ? 'animate-ping' : ''}`} />
        </div>
        
        <div className="mt-4">
          <p className="text-[10px] opacity-80 font-mono tracking-tight text-slate-300">{getAreaDetail(area.id, status)}</p>
        </div>
        
        {area.id === 'print' && demoState === 'kpi_update' && (
            <div 
              onClick={advanceDemo}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[11px] px-4 py-2 rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.8)] border border-red-400 whitespace-nowrap animate-bounce font-bold cursor-pointer hover:bg-red-500 z-50 flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
              点击模拟故障
            </div>
        )}
      </div>
    );
  }
}
