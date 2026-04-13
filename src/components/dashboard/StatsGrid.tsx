import React from "react";
import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface StatItem {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  onClick?: () => void;
}

interface StatsGridProps {
  stats: StatItem[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          onClick={stat.onClick}
          className={`bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 flex items-center gap-6 ${stat.onClick ? 'cursor-pointer hover:border-brand-green/30 transition-all' : ''}`}
        >
          <div className={`w-16 h-16 rounded-3xl flex items-center justify-center bg-gray-50 ${stat.color}`}>
            <stat.icon size={32} />
          </div>
          <div>
            <div className="text-3xl font-display font-black text-brand-dark leading-none">{stat.value}</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
