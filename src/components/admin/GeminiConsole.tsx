import React from "react";
import { Zap, Send, Loader2, CheckCircle2, AlertCircle, Info } from "lucide-react";

interface GeminiConsoleProps {
  aiCommand: string;
  setAiCommand: (val: string) => void;
  aiLoading: boolean;
  aiFeedback: { type: 'success' | 'error' | 'info', message: string } | null;
  onHandleCommand: (e: React.FormEvent) => void;
}

export default function GeminiConsole({ aiCommand, setAiCommand, aiLoading, aiFeedback, onHandleCommand }: GeminiConsoleProps) {
  return (
    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-navy rounded-xl flex items-center justify-center text-brand-green">
          <Zap size={20} />
        </div>
        <div>
          <h3 className="text-xl font-display font-black text-brand-dark uppercase tracking-tight">Gemini Command Center</h3>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">IA Administrativa Mochileiros Porto</p>
        </div>
      </div>

      <form onSubmit={onHandleCommand} className="relative">
        <input 
          type="text"
          value={aiCommand}
          onChange={(e) => setAiCommand(e.target.value)}
          placeholder="Ex: 'Promover fernando@gmail.com para VIP' ou 'Adicionar 500 mochis para João'..."
          className="w-full bg-brand-gray border-none rounded-2xl py-6 pl-8 pr-20 text-sm font-medium focus:ring-2 focus:ring-brand-green transition-all"
        />
        <button 
          type="submit"
          disabled={aiLoading || !aiCommand.trim()}
          className="absolute right-3 top-3 bottom-3 px-6 bg-brand-navy text-brand-green rounded-xl hover:bg-brand-dark transition-all disabled:opacity-50"
        >
          {aiLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
        </button>
      </form>

      {aiFeedback && (
        <div className={`p-4 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 ${
          aiFeedback.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' :
          aiFeedback.type === 'error' ? 'bg-red-50 text-red-700 border border-red-100' :
          'bg-blue-50 text-blue-700 border border-blue-100'
        }`}>
          {aiFeedback.type === 'success' ? <CheckCircle2 size={18} className="mt-0.5" /> :
           aiFeedback.type === 'error' ? <AlertCircle size={18} className="mt-0.5" /> :
           <Info size={18} className="mt-0.5" />}
          <p className="text-xs font-medium leading-relaxed">{aiFeedback.message}</p>
        </div>
      )}
    </div>
  );
}
