import React from "react";
import { motion } from "motion/react";
import { Crown, Sparkles } from "lucide-react";

interface AdminStatsProps {
  totalVips: number;
  newSignups7d: number;
}

export default function AdminStats({ totalVips, newSignups7d }: AdminStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-brand-navy p-8 rounded-[40px] text-white flex items-center gap-6 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/10 rounded-full blur-[50px] -mr-16 -mt-16" />
        <div className="w-16 h-16 bg-brand-green/20 rounded-3xl flex items-center justify-center text-brand-green relative z-10">
          <Crown size={32} />
        </div>
        <div className="relative z-10">
          <div className="text-4xl font-display font-black leading-none">{totalVips}</div>
          <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-2">Membros VIP Ativos</div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-8 rounded-[40px] border border-gray-100 flex items-center gap-6 shadow-xl"
      >
        <div className="w-16 h-16 bg-brand-gray rounded-3xl flex items-center justify-center text-brand-orange">
          <Sparkles size={32} />
        </div>
        <div>
          <div className="text-4xl font-display font-black text-brand-dark leading-none">+{newSignups7d}</div>
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">Novos VIPs (7 dias)</div>
        </div>
      </motion.div>
    </div>
  );
}
