import React from "react";
import { ArrowLeft, Database } from "lucide-react";
import { Link } from "react-router-dom";

interface AdminHeaderProps {
  activeTab: string;
}

export default function AdminHeader({ activeTab }: AdminHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
      <div className="space-y-4">
        <Link to="/membro" className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-green transition-colors font-black uppercase tracking-widest text-[10px]">
          <ArrowLeft size={14} /> Voltar ao Dashboard
        </Link>
        <h1 className="text-5xl md:text-7xl font-display font-black text-brand-dark tracking-tighter uppercase leading-none">
          Painel <span className="text-brand-green">Admin</span>
        </h1>
        <p className="text-gray-500 font-medium text-lg">Gerenciamento centralizado da comunidade Mochileiros Porto.</p>
      </div>
      
      <div className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-gray-100 shadow-xl">
        <div className="w-12 h-12 bg-brand-gray rounded-2xl flex items-center justify-center text-brand-green">
          <Database size={24} />
        </div>
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Status do Sistema</div>
          <div className="text-sm font-bold text-brand-dark flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Operacional
          </div>
        </div>
      </div>
    </div>
  );
}
