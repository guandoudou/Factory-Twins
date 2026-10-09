import React from 'react';
import { EventLog } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export function EventStream({ events }: { events: EventLog[] }) {
  const typeText = {
    info: '信息',
    warning: '预警',
    error: '异常',
    success: '成功'
  };

  return (
    <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar text-[11px] pr-2">
      <AnimatePresence initial={false}>
        {events.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20, height: 0 }}
            animate={{ opacity: 1, x: 0, height: 'auto' }}
            className={`border-l-2 pl-3 py-1 ${
              event.type === 'error' ? 'border-rose-500' :
              event.type === 'warning' ? 'border-amber-500' :
              event.type === 'success' ? 'border-emerald-500 bg-emerald-500/5' :
              'border-indigo-500 bg-indigo-500/5'
            }`}
          >
            <div className="flex flex-col gap-0.5">
              <p className={`font-bold uppercase ${
                event.type === 'error' ? 'text-rose-400' :
                event.type === 'warning' ? 'text-amber-400' :
                event.type === 'success' ? 'text-emerald-400' :
                'text-indigo-400'
              }`}>
                {typeText[event.type]} <span className="text-[9px] font-mono text-slate-500 font-normal float-right">{event.time}</span>
              </p>
              <p className={`font-medium ${event.type === 'info' ? 'text-slate-300' : 'text-slate-400'}`}>
                {event.message}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
