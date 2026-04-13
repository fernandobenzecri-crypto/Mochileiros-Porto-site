import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

interface TocaMeetingSectionProps {
  tocaSettings: any;
}

export default function TocaMeetingSection({ tocaSettings }: TocaMeetingSectionProps) {
  if (!tocaSettings?.active) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-brand-navy p-10 rounded-[60px] shadow-2xl relative overflow-hidden border border-white/5"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-[100px] -mr-32 -mt-32" />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-brand-green/20 rounded-[35px] flex items-center justify-center text-brand-green shadow-2xl rotate-3">
            <Sparkles size={40} />
          </div>
          <div className="space-y-1">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-green">Próximo Encontro</div>
            <h2 className="text-4xl font-display font-black text-white uppercase tracking-tighter">A Toca dos Mochileiros</h2>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="text-right">
            <div className="text-2xl font-display font-black text-white leading-none">{tocaSettings.nextDate}</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-brand-green mt-1">Às {tocaSettings.nextTime} · {tocaSettings.location}</div>
          </div>
          <Link 
            to="/eventos" 
            className="px-10 py-5 bg-brand-green text-white rounded-full font-display font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-brand-dark transition-all shadow-2xl"
          >
            Confirmar Presença
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
