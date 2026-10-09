import React from 'react';
import { motion } from 'motion/react';
import { X, FileText, CheckCircle, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';

export function FinalReport({ onClose }: { onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute inset-4 z-50 flex"
    >
      <div className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100 tracking-wide">今日运营报告</h2>
              <p className="text-sm text-slate-400 font-mono uppercase tracking-widest">Daily Operations Report</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Split */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Detailed Analysis */}
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar border-r border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-6 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              运营分析摘要
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "设备分析", desc: "整体设备综合效率(OEE)达91%，有效化解2号印刷机故障危机。" },
                { title: "订单分析", desc: "完成调度优化，出口订单准交率保障，仅3单轻微延期。" },
                { title: "瓶颈分析", desc: "下午物流装车环节识别为潜在瓶颈，已提前调度资源。" },
                { title: "成本分析", desc: "合并同色、同材质订单，降低洗机成本及材料损耗3.1%。" },
                { title: "能源分析", desc: "根据负载动态优化，预计节省峰值电费4.5%。" },
                { title: "质量分析", desc: "拦截潜在质量风险2次，整体良率保持在99.5%。" },
                { title: "物流分析", desc: "内部AGV运转效率提升，减少工序间等待时间。" },
                { title: "改善建议", desc: "建议引入备用纸板供应商，应对上午频发的物料延迟。" }
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Key Metrics */}
          <div className="w-80 bg-slate-900/80 p-6 flex flex-col gap-6">
             <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-indigo-900/20 to-transparent border border-indigo-900/50">
               <span className="text-[10px] font-mono tracking-widest uppercase text-indigo-400 block mb-2">FACTORY SCORE</span>
               <span className="text-6xl font-bold text-slate-100">96</span>
             </div>

             <div className="space-y-4">
               <div className="p-4 rounded-xl bg-slate-800/50 flex items-center justify-between border border-slate-700/50">
                 <div className="flex items-center gap-3">
                   <ShieldCheck className="w-4 h-4 text-emerald-400" />
                   <span className="text-xs font-bold uppercase tracking-wider text-slate-300">运营健康度</span>
                 </div>
                 <span className="text-lg font-bold text-emerald-400">A级</span>
               </div>
               
               <div className="p-4 rounded-xl bg-slate-800/50 flex items-center justify-between border border-slate-700/50">
                 <div className="flex items-center gap-3">
                   <CheckCircle className="w-4 h-4 text-indigo-400" />
                   <span className="text-xs font-bold uppercase tracking-wider text-slate-300">预计准交率</span>
                 </div>
                 <span className="text-lg font-bold text-indigo-400">99.1%</span>
               </div>
               
               <div className="p-4 rounded-xl bg-slate-800/50 flex items-center justify-between border border-slate-700/50">
                 <div className="flex items-center gap-3">
                   <TrendingUp className="w-4 h-4 text-purple-400" />
                   <span className="text-xs font-bold uppercase tracking-wider text-slate-300">预计利润提升</span>
                 </div>
                 <span className="text-lg font-bold text-purple-400">8.3%</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
