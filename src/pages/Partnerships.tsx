import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Helmet } from "react-helmet-async";
import { 
  Utensils, 
  Activity, 
  Scale, 
  Home as HomeIcon, 
  Scissors, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Zap,
  ShieldCheck,
  Filter,
  MapPin,
  Lock,
  CreditCard
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import SEOHead from "../components/SEOHead";

const PARTNERS = [
  {
    name: "Sabor do Brasil",
    category: "Restaurante",
    location: "Porto",
    icon: <Utensils size={24} />,
    desc: "O melhor da culinária brasileira no coração do Porto.",
    benefit: "10% de desconto para membros VIP",
    status: "available"
  },
  {
    name: "Clínica Porto Saúde",
    category: "Saúde",
    location: "Porto",
    icon: <Activity size={24} />,
    desc: "Atendimento médico multidisciplinar com foco em brasileiros.",
    benefit: "Consulta inicial gratuita + 15% em exames",
    status: "available"
  },
  {
    name: "Oliveira Advocacia",
    category: "Jurídico",
    location: "Matosinhos",
    icon: <Scale size={24} />,
    desc: "Especialistas em imigração e direito civil português.",
    benefit: "Primeira consultoria gratuita para Embaixadores",
    status: "available"
  },
  {
    name: "Porto Imóveis",
    category: "Imóveis",
    location: "Porto",
    icon: <HomeIcon size={24} />,
    desc: "Ajudamos você a encontrar seu novo lar sem fiador.",
    benefit: "Taxa de serviço reduzida em 20%",
    status: "available"
  },
  {
    name: "Studio VIP",
    category: "Beleza",
    location: "Gaia",
    icon: <Scissors size={24} />,
    desc: "Corte, barba e estética com profissionais brasileiros.",
    benefit: "Corte de cabelo com 20% de desconto",
    status: "available"
  },
  {
    name: "EducaPorto",
    category: "Educação",
    location: "Porto",
    icon: <GraduationCap size={24} />,
    desc: "Cursos de idiomas e preparação para exames nacionais.",
    benefit: "Matrícula grátis + 10% na mensalidade",
    status: "available"
  },
  {
    name: "Padaria Brasileira",
    category: "Restaurante",
    location: "Gaia",
    icon: <Utensils size={24} />,
    desc: "Pão de queijo, coxinha e doces típicos brasileiros.",
    benefit: "Café grátis em compras acima de €10",
    status: "available"
  },
  {
    name: "Gym Porto",
    category: "Saúde",
    location: "Matosinhos",
    icon: <Activity size={24} />,
    desc: "Academia completa com personal trainers brasileiros.",
    benefit: "Isenção de taxa de inscrição",
    status: "available"
  }
];

const CATEGORIES = ["Todos", "Restaurante", "Saúde", "Jurídico", "Imóveis", "Beleza", "Educação"];
const LOCATIONS = ["Todas", "Porto", "Gaia", "Matosinhos"];

export default function Partnerships() {
  const { profile } = useAuth();
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [activeLocation, setActiveLocation] = useState("Todas");

  const filteredPartners = PARTNERS.filter(p => {
    const catMatch = activeCategory === "Todos" || p.category === activeCategory;
    const locMatch = activeLocation === "Todas" || p.location === activeLocation;
    return catMatch && locMatch;
  });

  return (
    <div className="min-h-screen bg-brand-gray pt-32 pb-20">
      <SEOHead
        title="Parceiros e Descontos para Brasileiros em Porto"
        description="Restaurantes, serviços de saúde, assessoria jurídica e mais. Descontos exclusivos para membros VIP Mochileiros Porto."
        url="https://mochileirosporto.com/parcerias"
      />
      <Helmet>
        <title>Parceiros e Descontos | Mochileiros Porto</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 space-y-16">
        {/* Header */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-brand-green font-black uppercase tracking-[0.3em] text-[10px]">
            <Zap size={14} className="fill-brand-green" /> Rede de Vantagens
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-brand-dark uppercase tracking-tighter leading-none">
            Nossos <span className="text-brand-green">Parceiros</span>
          </h1>
          <p className="text-gray-500 text-xl font-medium leading-relaxed">
            Economize em serviços essenciais e lazer com nossa rede de parceiros selecionados.
          </p>
        </div>

        {/* Filters Section */}
        <div className="space-y-8 bg-white/50 p-8 md:p-12 rounded-[60px] border border-white">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-brand-dark font-black uppercase tracking-widest text-[10px]">
              <Filter size={14} className="text-brand-green" /> Filtrar por Categoria
            </div>
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                    activeCategory === cat 
                      ? "bg-brand-green text-white border-brand-green shadow-lg scale-105" 
                      : "bg-white text-gray-400 border-gray-100 hover:border-brand-green hover:text-brand-green"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-white">
            <div className="flex items-center gap-3 text-brand-dark font-black uppercase tracking-widest text-[10px]">
              <MapPin size={14} className="text-brand-green" /> Filtrar por Localização
            </div>
            <div className="flex flex-wrap gap-3">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setActiveLocation(loc)}
                  className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                    activeLocation === loc 
                      ? "bg-brand-navy text-white border-brand-navy shadow-lg scale-105" 
                      : "bg-white text-gray-400 border-gray-100 hover:border-brand-navy hover:text-brand-navy"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">
          Exibindo {filteredPartners.length} parceiros encontrados
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPartners.map((partner, i) => (
              <motion.div 
                key={partner.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white p-10 rounded-[50px] shadow-2xl shadow-brand-dark/5 border border-gray-100 flex flex-col justify-between group hover:border-brand-green/30 transition-all duration-500"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="w-16 h-16 bg-brand-gray rounded-2xl flex items-center justify-center text-brand-green group-hover:scale-110 transition-transform duration-500">
                      {partner.icon}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="px-4 py-2 bg-brand-green/10 text-brand-green rounded-full text-[8px] font-black uppercase tracking-widest border border-brand-green/20">
                        {partner.category}
                      </div>
                      <div className="flex items-center gap-1 text-[8px] font-black text-gray-400 uppercase tracking-widest">
                        <MapPin size={10} /> {partner.location}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight">{partner.name}</h3>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed">{partner.desc}</p>
                  </div>
                  <div className="p-6 bg-brand-gray rounded-3xl border border-gray-50 space-y-4">
                    <div className="flex items-center gap-2 text-brand-green font-black uppercase tracking-widest text-[10px]">
                      <Zap size={14} /> Benefício VIP
                    </div>
                    {profile?.is_vip ? (
                      <p className="text-brand-dark font-display font-black text-lg uppercase tracking-tight">
                        {partner.benefit}
                      </p>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-400 font-bold blur-[2px] select-none">
                          {partner.benefit}
                        </div>
                        <div className="flex items-center gap-2 text-brand-navy font-black uppercase tracking-widest text-[8px] bg-brand-green/10 px-3 py-1 rounded-full w-fit">
                          <Lock size={10} /> Exclusivo para VIPs
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-8">
                  {profile?.is_vip ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between px-2">
                        <div className="space-y-1">
                          <div className="text-[8px] font-black uppercase tracking-widest text-gray-400">Seu Código</div>
                          <div className="text-xs font-mono font-bold text-brand-green">{profile.codigoVip || '--------'}</div>
                        </div>
                        <Link 
                          to="/membro" 
                          className="flex items-center gap-2 px-4 py-2 bg-brand-navy text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-green transition-all"
                        >
                          <CreditCard size={14} /> Ver Cartão
                        </Link>
                      </div>
                      <button className="w-full py-4 bg-brand-dark text-white rounded-full font-display font-black text-[10px] uppercase tracking-widest hover:bg-brand-green transition-all">
                        Resgatar Benefício
                      </button>
                    </div>
                  ) : (
                    <Link 
                      to="/clube-vip"
                      className="flex items-center justify-center gap-2 w-full py-4 bg-brand-gray text-gray-400 rounded-full font-display font-black text-[10px] uppercase tracking-widest hover:bg-brand-green hover:text-white transition-all"
                    >
                      Liberar com VIP <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        {!profile?.is_vip && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-brand-navy p-12 md:p-20 rounded-[80px] text-center space-y-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-[100px] -mr-32 -mt-32" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none">
                Quer economizar em <br /><span className="text-brand-green">todos esses parceiros?</span>
              </h2>
              <p className="text-white/60 text-xl font-medium max-w-2xl mx-auto">
                Membros VIP economizam em média €150/mês utilizando nossa rede de descontos.
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
          </motion.div>
        )}
      </div>
    </div>
  );
}
