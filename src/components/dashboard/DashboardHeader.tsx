import React from "react";
import { LogOut, Award } from "lucide-react";
import { motion } from "motion/react";

interface DashboardHeaderProps {
  name?: string;
  badges?: string[];
  onLogout: () => void;
}

export default function DashboardHeader({ name, badges, onLogout }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-5xl md:text-7xl font-display font-black text-brand-dark tracking-tighter uppercase leading-none">
            Olá, <span className="text-brand-green">{name?.split(' ')[0]}!</span>
          </h1>
          {badges?.includes('Membro Fundador') && (
            <div className="bg-brand-navy text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg">
              <Award size={14} className="text-brand-green" /> Fundador
            </div>
          )}
        </div>
        <p className="text-gray-500 font-medium text-lg">Bem-vindo à sua casa no Porto. O que vamos explorar hoje?</p>
      </div>
      
      <button 
        onClick={onLogout}
        className="flex items-center gap-3 text-gray-400 font-black uppercase tracking-widest text-[10px] hover:text-red-500 transition-colors"
      >
        Sair da conta <LogOut size={16} />
      </button>
    </div>
  );
}
