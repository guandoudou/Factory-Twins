import React from 'react';
import { DemoState } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Server, Cpu, Box, Truck, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { ChatInterface } from './ChatInterface';

export function AIReasoningPanel({ demoState, advanceDemo }: { demoState: DemoState, advanceDemo: () => void }) {
  
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 flex-1 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold uppercase text-indigo-400 tracking-wider">AI 推理引擎</h3>
        {(demoState === 'reasoning' || demoState === 'exception_reasoning' || demoState === 'initializing') && (
          <span className="text-[10px] text-indigo-400 animate-pulse font-mono flex items-center gap-1">
             处理中 <span className="flex space-x-1"><span className="animate-bounce">.</span><span className="animate-bounce" style={{animationDelay: '0.1s'}}>.</span><span className="animate-bounce" style={{animationDelay: '0.2s'}}>.</span></span>
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        <AnimatePresence mode="wait">
          {demoState === 'idle' && (
            <motion.div key="idle" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="h-full flex flex-col items-center justify-center text-slate-500 gap-4">
              <Cpu className="w-16 h-16 opacity-30 text-indigo-400" />
              <p className="text-[10px] font-mono tracking-widest uppercase text-indigo-300 mb-2">系统就绪</p>
              <button 
                onClick={advanceDemo} 
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all animate-bounce flex items-center gap-2"
              >
                启动 Factory Brain
              </button>
            </motion.div>
          )}

          {demoState === 'initializing' && <motion.div key="init" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="h-full"><InitializingView /></motion.div>}
          
          {demoState === 'reasoning' && <motion.div key="reasoning" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="h-full"><ReasoningView /></motion.div>}
          
          {demoState === 'recommendations' && <motion.div key="recommendations" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="h-full"><RecommendationsView /></motion.div>}
          
          {demoState === 'kpi_update' && <motion.div key="kpi" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="h-full"><KPIView /></motion.div>}
          
          {demoState === 'exception' && (
            <motion.div key="exception" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="h-full flex flex-col items-center justify-center text-red-500 gap-4">
               <AlertCircle className="w-16 h-16 animate-pulse" />
               <p className="text-[10px] font-bold tracking-wider uppercase">等待决策</p>
            </motion.div>
          )}

          {demoState === 'exception_reasoning' && <motion.div key="ex_reason" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="h-full"><ExceptionReasoningView /></motion.div>}
          
          {demoState === 'rebalanced' && (
            <motion.div key="rebalanced" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="h-full flex flex-col items-center justify-center text-emerald-400 gap-4">
               <Check className="w-16 h-16" />
               <p className="text-[10px] font-bold tracking-wider uppercase">工厂已重新平衡</p>
            </motion.div>
          )}

          {demoState === 'chat' && <motion.div key="chat" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="h-full"><ChatInterface advanceDemo={advanceDemo} /></motion.div>}
          
        </AnimatePresence>
      </div>
      
      {demoState !== 'chat' && demoState !== 'idle' && (
        <div className="mt-4 pt-4 border-t border-slate-800">
          <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">引导操作 (Demo)</p>
          <button onClick={advanceDemo} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold py-3 rounded-lg mb-2 transition-all flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(79,70,229,0.25)]">
            {demoState === 'report' ? '返回对话' : 
             demoState === 'initializing' ? '开始推理决策 (Next)' :
             demoState === 'reasoning' ? '生成运营方案 (Next)' :
             demoState === 'recommendations' ? '查看 KPI 预测 (Next)' :
             demoState === 'kpi_update' ? '等待突发事件...' :
             demoState === 'exception' ? 'AI 重新规划 (Next)' :
             demoState === 'exception_reasoning' ? '执行重构方案 (Next)' :
             demoState === 'rebalanced' ? '进入自然语言对话 (Next)' :
             '继续模拟 (Next)'}
          </button>
        </div>
      )}
    </div>
  );
}

// Subcomponents

function InitializingView() {
  const steps = [
    { icon: Database, label: "读取 ERP", detail: "102 张订单", delay: 0 },
    { icon: Server, label: "读取 MES", detail: "86 台设备", delay: 1 },
    { icon: Box, label: "读取 WMS", detail: "438 种物料", delay: 2 },
    { icon: Cpu, label: "读取 APS", detail: "当前排程", delay: 3 },
    { icon: Truck, label: "读取物流", detail: "12 台运输车辆", delay: 4 },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-[10px] uppercase font-bold text-slate-400 mb-2">分析工厂状态</h3>
      {steps.map((step, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: step.delay * 0.8 }}
          className="flex items-center justify-between p-3 rounded bg-slate-800/50 border border-slate-700/50"
        >
          <div className="flex items-center gap-3 text-slate-300">
            <step.icon className="w-5 h-5 text-blue-400" />
            <span className="font-medium">{step.label}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400 font-mono">{step.detail}</span>
            <Check className="w-4 h-4 text-emerald-400" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ReasoningView() {
  const thoughts = [
    {
      title: "订单 A (A级客户)",
      steps: [
        "今天必须完成",
        "纸张库存不足",
        "仓库预计 11:30 到货",
        "决策：延迟印刷，优先安排模切订单",
        "目标：避免设备等待"
      ]
    },
    {
      title: "订单 B & C",
      steps: [
        "颜色一致",
        "同一种纸板",
        "建议：合并印刷",
        "结果：减少洗机，节省 38 分钟，降低损耗"
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-[10px] uppercase font-bold text-slate-400 mb-2">约束求解</h3>
      {thoughts.map((t, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 2 }}
          className={`p-3 rounded border-l-2 ${i % 2 === 0 ? 'border-indigo-500 bg-indigo-500/5' : 'border-emerald-500 bg-emerald-500/5'}`}
        >
          <h4 className={`text-[10px] font-bold mb-1 uppercase tracking-wider ${i % 2 === 0 ? 'text-indigo-400' : 'text-emerald-400'}`}>推理路径: {t.title}</h4>
          <div className="space-y-1">
            {t.steps.map((step, j) => (
              <motion.div 
                key={j}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (i * 2) + (j * 0.5) }}
                className="flex items-start gap-1 text-[11px] text-slate-300"
              >
                <span className="text-slate-500 mt-0.5">•</span>
                <span>{step}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function RecommendationsView() {
  const recs = [
    { id: 1, title: "印刷机3与印刷机5交换订单", reason: "减少等待27分钟。" },
    { id: 2, title: "订单28提前生产", reason: "下午预计纸张到货延迟。" },
    { id: 3, title: "将夜班人员提前到下午", reason: "应对下午订单高峰。" },
    { id: 4, title: "暂停覆膜设备，优先完成模切", reason: "避免物流拥堵。" }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-[10px] uppercase font-bold text-slate-400 mb-2">生成今日运营方案</h3>
      {recs.map((rec, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.3 }}
          className="p-3 rounded border-l-2 border-emerald-500 bg-emerald-500/5"
        >
          <p className="text-[10px] font-bold text-emerald-400 mb-1 uppercase tracking-wider">建议 {rec.id}</p>
          <p className="text-[11px] text-slate-200 font-medium">{rec.title}</p>
          <p className="text-[10px] text-slate-400 mt-1">原因: {rec.reason}</p>
        </motion.div>
      ))}
    </div>
  );
}

function KPIView() {
  const kpis = [
    { label: "等待时间", before: "16h", after: "8h" },
    { label: "订单延期", before: "12", after: "3" },
    { label: "纸张浪费", before: "5.8%", after: "3.1%" },
    { label: "换版次数", before: "148", after: "112" }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-[10px] uppercase font-bold text-slate-400 mb-2">预计 KPI 影响</h3>
      <div className="grid grid-cols-2 gap-3">
        {kpis.map((kpi, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/50"
          >
            <p className="text-[9px] text-slate-500 uppercase font-bold mb-1">{kpi.label}</p>
            <p className="text-xs text-red-400">
              {kpi.before} &rarr; <span className="text-sm font-mono font-bold text-emerald-400">{kpi.after}</span>
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ExceptionReasoningView() {
  const steps = [
    "影响分析：17 张订单受影响",
    "重新分配订单至印刷机 4 & 6",
    "重新安排物流",
    "夜班人员调整",
    "处理结果：预计全局延期 15 分钟"
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-rose-400 mb-4 animate-pulse">动态重新规划</h3>
      {steps.map((step, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.4 }}
          className="flex items-center gap-3 p-3 rounded border border-rose-900/30 bg-rose-950/20 text-slate-300"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          <span className="text-sm font-mono">{step}</span>
        </motion.div>
      ))}
    </div>
  );
}
