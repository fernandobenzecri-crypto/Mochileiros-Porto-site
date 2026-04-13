import { motion, useScroll, useTransform } from "motion/react";
import { BRAND, TUTORIALS } from "../constants";
import { ArrowRight, ShieldCheck, FileText, Home, Briefcase, CheckCircle2, Zap, TrendingUp, Users, Globe, Award, Sparkles, Lock, BookOpen, Scale, Calculator, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Advisory() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* HERO - Technical Precision */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden bg-brand-navy">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 z-0 opacity-40"
        >
          <img 
            src="https://picsum.photos/seed/advisory-hero-3/1920/1080" 
            className="w-full h-full object-cover" 
            alt="Advisory" 
            referrerPolicy="no-referrer" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/20 via-brand-navy/60 to-brand-navy" />
        </motion.div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-green/20 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[140px] animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-brand-green/20 text-brand-green rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-brand-green/30 backdrop-blur-xl">
              <ShieldCheck size={14} className="fill-brand-green" /> Consultoria Especializada
            </div>
            <h1 className="text-[10vw] md:text-[8vw] lg:text-[10vw] text-white leading-[0.8] tracking-tighter font-display font-black uppercase">
              EXPERT <br />
              <span className="text-brand-green">ADVISORY</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col items-center justify-center gap-12"
          >
            <p className="text-xl md:text-3xl text-white/70 max-w-4xl font-medium leading-relaxed tracking-tight">
              Sua transição para Portugal com <span className="text-white font-black italic">segurança jurídica</span>, <br className="hidden md:block" />
              planejamento estratégico e suporte local completo.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-10">
              <a 
                href={BRAND.whatsappLink} 
                className="group relative w-full sm:w-auto bg-brand-green text-white px-16 py-8 rounded-full text-2xl font-display font-black shadow-2xl shadow-brand-green/40 hover:bg-white hover:text-brand-green transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  AGENDAR CONSULTORIA <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES - SaaS Style Cards */}
      <section className="py-40 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-32">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-brand-green font-black uppercase tracking-[0.3em] text-[10px]">
                <Zap size={14} className="fill-brand-green" /> Soluções 360º
              </div>
              <h2 className="text-6xl md:text-9xl font-display font-black text-brand-dark tracking-tighter uppercase leading-[0.8]">Nossas <br /><span className="text-brand-green">áreas</span></h2>
              <p className="text-gray-500 text-2xl max-w-xl font-medium tracking-tight">Especialistas brasileiros que entendem a sua realidade e as leis portuguesas.</p>
            </div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {[
              { 
                title: "Imigração & Vistos", 
                desc: "Suporte completo para D7, D2, Nômade Digital e reagrupamento familiar.", 
                icon: <Scale size={32} />, 
                features: ["Análise de perfil", "Preparação de dossiê", "Acompanhamento no SEF/AIMA"],
                color: "bg-brand-green"
              },
              { 
                title: "Imobiliário", 
                desc: "Encontre o imóvel ideal para morar ou investir com assessoria local.", 
                icon: <Home size={32} />, 
                features: ["Busca personalizada", "Análise de contratos", "Vistoria técnica"],
                color: "bg-brand-navy"
              },
              { 
                title: "Contabilidade & B2B", 
                desc: "Abertura de empresa, NIF, NISS e planejamento tributário estratégico.", 
                icon: <Calculator size={32} />, 
                features: ["Abertura de Atividade", "Declaração de IRS", "Contabilidade Organizada"],
                color: "bg-brand-orange"
              }
            ].map((service, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                whileHover={{ y: -20 }}
                className="group p-12 bg-brand-gray rounded-[60px] border border-gray-100 shadow-3xl shadow-brand-dark/5 space-y-10 transition-all duration-500 hover:bg-white hover:shadow-brand-green/10"
              >
                <div className={`w-24 h-24 ${service.color} text-white rounded-[32px] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                  {service.icon}
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-display font-black text-brand-dark leading-none uppercase tracking-tighter">{service.title}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed font-medium">{service.desc}</p>
                </div>
                <ul className="space-y-4 pt-6 border-t border-gray-100">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-600 font-bold">
                      <CheckCircle2 size={18} className="text-brand-green" /> {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TUTORIALS - Immersive Bento Grid */}
      <section id="tutoriais" className="py-40 px-4 bg-brand-gray relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-32">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 text-brand-green font-black uppercase tracking-[0.3em] text-[10px]">
              <BookOpen size={14} className="fill-brand-green" /> Conhecimento Livre
            </div>
            <h2 className="text-6xl md:text-9xl font-display font-black text-brand-dark tracking-tighter uppercase leading-[0.8]">Guias <br /><span className="text-brand-green">Práticos</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {TUTORIALS.public.map((t, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-white p-12 rounded-[60px] shadow-3xl shadow-brand-dark/5 space-y-10 transition-all duration-500 hover:shadow-brand-green/10"
              >
                <div className="flex items-center justify-between">
                  <div className="text-7xl group-hover:scale-110 transition-transform duration-500">{t.icon}</div>
                  <span className="px-6 py-2 bg-brand-green/10 text-brand-green rounded-full text-[10px] font-black uppercase tracking-widest border border-brand-green/20">
                    {t.category}
                  </span>
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-display font-black text-brand-dark leading-none uppercase tracking-tighter group-hover:text-brand-green transition-colors">{t.title}</h3>
                  <p className="text-gray-500 text-xl font-medium leading-relaxed">{t.description}</p>
                </div>
                <div className="space-y-4 pt-8 border-t border-gray-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">O que você vai encontrar:</p>
                  {t.details.map((detail, j) => (
                    <div key={j} className="flex items-center gap-4 text-gray-600 font-bold text-sm">
                      <CheckCircle2 size={16} className="text-brand-green shrink-0" /> {detail}
                    </div>
                  ))}
                </div>

                {t.links && t.links.length > 0 && (
                  <div className="space-y-4 pt-8 border-t border-gray-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Links Úteis:</p>
                    <div className="flex flex-wrap gap-3">
                      {t.links.map((link, l) => (
                        <a 
                          key={l}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-brand-gray hover:bg-brand-green hover:text-white rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2"
                        >
                          <Globe size={12} /> {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-8">
                  <a 
                    href={t.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-brand-green font-black text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform"
                  >
                    Ler guia completo <ArrowRight size={20} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VIP TUTORIALS - Locked Immersive */}
      <section className="py-40 px-4 bg-brand-navy relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-32">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 text-brand-orange font-black uppercase tracking-[0.3em] text-[10px]">
              <Lock size={14} className="fill-brand-orange" /> Conteúdo Premium
            </div>
            <h2 className="text-6xl md:text-9xl font-display font-black text-white tracking-tighter uppercase leading-[0.8]">Tutoriais <br /><span className="text-brand-orange">VIP</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {TUTORIALS.vip.map((t, idx) => (
              <div key={idx} className="relative group h-[600px] rounded-[80px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="absolute inset-0 p-16 flex flex-col justify-between opacity-20 grayscale transition-all duration-700 group-hover:opacity-40">
                  <div className="text-9xl">{t.icon}</div>
                  <div className="space-y-8">
                    <h3 className="text-5xl font-display font-black text-white uppercase tracking-tighter leading-none">{t.title}</h3>
                    <p className="text-white/60 text-xl font-medium leading-relaxed">{t.description}</p>
                  </div>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center p-12 text-center bg-brand-navy/60 backdrop-blur-md">
                  <div className="space-y-10">
                    <div className="w-32 h-32 bg-brand-orange text-white rounded-[40px] flex items-center justify-center mx-auto shadow-3xl rotate-6 group-hover:rotate-0 transition-transform duration-700">
                      <Lock size={56} />
                    </div>
                    <div className="space-y-8">
                      <p className="text-4xl font-display font-black text-white uppercase tracking-tighter leading-none">Desbloqueie com <br />o Clube VIP</p>
                      <Link 
                        to="/clube-vip" 
                        className="inline-flex items-center gap-4 bg-brand-orange text-white px-12 py-6 rounded-full text-sm font-black uppercase tracking-widest shadow-2xl shadow-brand-orange/40 hover:scale-105 transition-transform"
                      >
                        QUERO SER VIP <ChevronRight size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA - Professional */}
      <section className="py-40 px-4 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-6xl md:text-9xl font-display font-black text-brand-dark tracking-tighter uppercase leading-[0.8]">Pronto para <br /><span className="text-brand-green">começar?</span></h2>
            <p className="text-gray-500 text-2xl max-w-3xl mx-auto font-medium tracking-tight leading-relaxed">
              Agende uma reunião inicial e vamos desenhar o melhor caminho para o seu sucesso em Portugal.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-10"
          >
            <a 
              href={BRAND.whatsappLink} 
              className="group relative w-full sm:w-auto bg-brand-dark text-white px-20 py-10 rounded-full text-3xl font-display font-black shadow-3xl shadow-brand-dark/20 hover:bg-brand-green transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-4">
                FALAR COM UM ESPECIALISTA <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-brand-green translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Atendimento personalizado e sigiloso</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
