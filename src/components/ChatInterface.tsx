import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, User, Cpu, FileText } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

const chatScript = [
  {
    trigger: "为什么订单56延期？",
    response: "因为：\n• 纸板供应商上午延迟45分钟。\n• 导致覆膜工序顺延。\n• 预计影响：订单56。\n\n我建议：将订单56切换至2号产线。预计可恢复正常交期。"
  },
  {
    trigger: "今天最大的风险是什么？",
    response: "预计下午16:20，物流装车能力不足。\n建议：提前安排外调车辆。\n否则：将影响7张出口订单的准时交付。"
  }
];

export function ChatInterface({ advanceDemo }: { advanceDemo: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: '工厂已重新平衡。您有什么问题吗？' }
  ]);
  const [input, setInput] = useState('');
  const [scriptIndex, setScriptIndex] = useState(0);

  const handleSend = (textOverride?: string) => {
    const text = textOverride || input;
    if (!text.trim()) return;

    const newMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = "我正在处理您的请求...";
      if (scriptIndex < chatScript.length && text.includes(chatScript[scriptIndex].trigger.substring(0, 4))) {
        aiResponse = chatScript[scriptIndex].response;
        setScriptIndex(s => s + 1);
      }
      
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', text: aiResponse }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4 p-2 custom-scrollbar">
        {messages.map((msg) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-slate-700 text-slate-300' : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/50'}`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Cpu className="w-4 h-4" />}
            </div>
            <div className={`px-4 py-2 rounded-2xl max-w-[80%] whitespace-pre-wrap text-[11px] ${msg.sender === 'user' ? 'bg-slate-700 text-slate-200 rounded-tr-none' : 'bg-slate-800/80 border border-slate-700 text-slate-300 rounded-tl-none'}`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        {/* Quick Prompts for Demo */}
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {scriptIndex < chatScript.length && (
            <button 
              onClick={() => handleSend(chatScript[scriptIndex].trigger)}
              className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 whitespace-nowrap transition-colors border border-slate-700"
            >
              {chatScript[scriptIndex].trigger}
            </button>
          )}
          {scriptIndex >= chatScript.length && (
             <button 
               onClick={advanceDemo}
               className="px-3 py-1.5 rounded-full bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 text-[10px] whitespace-nowrap transition-colors border border-indigo-500/50 flex items-center gap-1"
             >
               <FileText className="w-3 h-3" /> 生成运营日报
             </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="询问 Factory Brain..."
            className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-[11px] text-slate-200 focus:outline-none focus:border-indigo-500/50 placeholder:text-slate-500"
          />
          <button 
            onClick={() => handleSend()}
            className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 border border-indigo-500/50 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
