import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Utensils, Activity, Scale, Newspaper, ArrowRight } from "lucide-react";
import { UserProfile } from "../../firebase";

interface BenefitsSectionProps {
  profile: UserProfile | null;
}

export default function BenefitsSection({ profile }: BenefitsSectionProps) {
  return (
    <motion.div 
      key="benefits"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12"
    >
      {/* Partnerships Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-display font-black text-brand-dark uppercase tracking-tight">Benefícios de Parceiros</h2>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">Descontos exclusivos para você economizar no Porto</p>
          </div>
          <Link to="/parcerias" className="text-brand-green font-black uppercase tracking-widest text-[10px] hover:underline">Ver todos</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Sabor do Brasil", benefit: "10% OFF", icon: <Utensils size={20} /> },
            { name: "Clínica Porto Saúde", benefit: "15% OFF", icon: <Activity size={20} /> },
            { name: "Oliveira Advocacia", benefit: "Consultoria Grátis", icon: <Scale size={20} /> }
          ].map((p, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl flex items-center gap-4 group hover:border-brand-green/30 transition-all">
              <div className="w-12 h-12 bg-brand-gray rounded-xl flex items-center justify-center text-brand-green group-hover:scale-110 transition-transform">
                {p.icon}
              </div>
              <div>
                <div className="font-bold text-brand-dark text-sm">{p.name}</div>
                <div className="text-[10px] font-black text-brand-green uppercase tracking-widest">{p.benefit}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Imigrant Library Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-display font-black text-brand-dark uppercase tracking-tight">Biblioteca do Imigrante</h2>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">Recursos essenciais para sua vida em Portugal</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Guia NIF, NISS e AIMA", desc: "Tudo sobre a documentação inicial." },
            { title: "Checklist Primeiros 30 Dias", desc: "O que fazer logo ao chegar no Porto." },
            { title: "Guia de Bairros em Porto", desc: "Onde morar de acordo com seu perfil." }
          ].map((doc, i) => (
            <div key={i} className="bg-brand-navy p-8 rounded-[40px] text-white space-y-6 border border-white/5 group hover:bg-brand-navy/90 transition-all">
              <div className="w-12 h-12 bg-brand-green/20 rounded-xl flex items-center justify-center text-brand-green">
                <Newspaper size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-black text-lg uppercase tracking-tight leading-tight">{doc.title}</h3>
                <p className="text-white/40 text-xs font-medium">{doc.desc}</p>
              </div>
              <button className="w-full py-3 bg-white/10 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-green transition-all">
                Ver Conteúdo
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Free Member Upsell */}
      {!profile?.is_vip && (
        <div className="bg-brand-navy p-12 md:p-20 rounded-[80px] text-center space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none">
              Desbloqueie a <br /><span className="text-brand-green">Área VIP Premium</span>
            </h2>
            <p className="text-white/60 text-lg font-medium max-w-xl mx-auto">
              Tenha acesso à Biblioteca do Imigrante, descontos em parceiros e prioridade em todas as excursões.
            </p>
            <div className="pt-6">
              <Link 
                to="/clube-vip"
                className="inline-flex items-center gap-4 bg-brand-green text-white px-12 py-6 rounded-full font-display font-black text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-brand-dark transition-all duration-500 shadow-2xl"
              >
                QUERO SER VIP AGORA <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
