import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Crown, Star, UserPlus, Users, Trophy } from "lucide-react";
import { UserProfile } from "../../firebase";

interface AmbassadorBannerProps {
  profile: UserProfile;
}

export default function AmbassadorBanner({ profile }: AmbassadorBannerProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-brand-navy p-10 rounded-[60px] shadow-2xl relative overflow-hidden border border-white/5"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-[100px] -mr-32 -mt-32" />
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex items-center gap-8">
          <div className="w-24 h-24 bg-brand-green/20 rounded-[40px] flex items-center justify-center text-brand-green shadow-2xl rotate-3">
            <Crown size={48} />
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-brand-green/20 text-brand-green rounded-full text-[10px] font-black uppercase tracking-widest">
              Status Embaixador Ativo
            </div>
            <h2 className="text-4xl font-display font-black text-white uppercase tracking-tighter">Painel de Liderança</h2>
            <p className="text-white/40 text-sm font-medium uppercase tracking-widest">Meta Atual: <span className="text-brand-yellow">{profile.metaAtual || 'Básica'}</span></p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full lg:w-auto">
          {[
            { label: "Pontos", value: profile.points || 0, icon: Star, color: "text-brand-yellow" },
            { label: "Indicações", value: profile.indicacoesConfirmadas || 0, icon: UserPlus, color: "text-brand-green" },
            { label: "Acompanhados", value: profile.membrosAcompanhados || 0, icon: Users, color: "text-blue-400" },
            { label: "Ranking", value: `#${profile.ranking_position || '--'}`, icon: Trophy, color: "text-brand-orange" }
          ].map((s, i) => (
            <div key={i} className="text-center space-y-2">
              <div className={`w-12 h-12 ${s.color} bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-2`}>
                <s.icon size={20} />
              </div>
              <div className="text-2xl font-display font-black text-white leading-none">{s.value}</div>
              <div className="text-[8px] font-black uppercase tracking-widest text-white/30">{s.label}</div>
            </div>
          ))}
        </div>

        <Link 
          to="/membro/embaixador" 
          className="w-full lg:w-auto px-10 py-6 bg-brand-green text-white rounded-full font-display font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-brand-dark transition-all shadow-2xl"
        >
          Acessar Painel Completo
        </Link>
      </div>
    </motion.div>
  );
}
