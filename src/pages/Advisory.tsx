import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { BRAND, ADVISORY_CATEGORIES, OFFICIAL_LINKS } from "../constants";
import SafeImage from "../components/SafeImage";
import { ArrowRight, ShieldCheck, FileText, Home, Briefcase, CheckCircle2, Zap, TrendingUp, Users, Globe, Award, Sparkles, Lock, BookOpen, Scale, Calculator, ChevronRight, Info, ExternalLink, Mail, MessageCircle, Clock, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";

function CertidoesSteps() {
  return (
    <div className="bg-brand-navy text-white p-8 md:p-12 rounded-[40px] space-y-12">
      <div className="space-y-4">
        <h3 className="text-3xl font-display font-black uppercase tracking-tighter">Certidões de Inexistência de Dívida</h3>
        <p className="text-white/60 font-medium">Siga o passo a passo oficial para obter suas certidões online de forma imediata.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Finanças */}
        <div className="space-y-8 p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-brand-green/30 transition-colors group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-green text-white rounded-xl flex items-center justify-center font-black shadow-lg shadow-brand-green/20">1</div>
            <h4 className="text-xl font-display font-black uppercase tracking-tight">Finanças</h4>
          </div>
          <ul className="space-y-4 text-sm text-white/70 font-medium">
            <li className="flex gap-3"><span className="text-brand-green font-black">•</span> Ter NIF + palavra-passe do Portal das Finanças</li>
            <li className="flex gap-3"><span className="text-brand-green font-black">•</span> Aceder ao Portal das Finanças</li>
            <li className="flex gap-3"><span className="text-brand-green font-black">•</span> Login → Todos os Serviços → Documentos e Certidões → Certidões</li>
            <li className="flex gap-3"><span className="text-brand-green font-black">•</span> Clicar em "Pedir Certidão" → tipo "Dívida e não dívida"</li>
            <li className="flex gap-3"><span className="text-brand-green font-black">•</span> Descarregar PDF (validade: 3 meses)</li>
          </ul>
          <a href="https://portaldasfinancas.gov.pt" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-brand-green font-black text-xs uppercase tracking-widest hover:underline group-hover:translate-x-2 transition-transform">
            ACEDER PORTAL <ExternalLink size={14} />
          </a>
        </div>

        {/* Segurança Social */}
        <div className="space-y-8 p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-brand-orange/30 transition-colors group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-orange text-white rounded-xl flex items-center justify-center font-black shadow-lg shadow-brand-orange/20">2</div>
            <h4 className="text-xl font-display font-black uppercase tracking-tight">Segurança Social</h4>
          </div>
          <ul className="space-y-4 text-sm text-white/70 font-medium">
            <li className="flex gap-3"><span className="text-brand-orange font-black">•</span> Ter NISS + acesso à Segurança Social Direta</li>
            <li className="flex gap-3"><span className="text-brand-orange font-black">•</span> Aceder à Segurança Social Direta</li>
            <li className="flex gap-3"><span className="text-brand-orange font-black">•</span> Login → Conta-corrente → Situação Contributiva</li>
            <li className="flex gap-3"><span className="text-brand-orange font-black">•</span> Selecionar "Obter declaração" → PDF imediato</li>
            <li className="flex gap-3"><span className="text-brand-orange font-black">•</span> Validade: 4 meses</li>
          </ul>
          <a href="https://app.seg-social.pt" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-brand-orange font-black text-xs uppercase tracking-widest hover:underline group-hover:translate-x-2 transition-transform">
            ACEDER PORTAL <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Advisory() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const [activeCategory, setActiveCategory] = useState(ADVISORY_CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return ADVISORY_CATEGORIES;
    return ADVISORY_CATEGORIES.map(cat => ({
      ...cat,
      tutorials: cat.tutorials.filter(t => 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        t.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(cat => cat.tutorials.length > 0);
  }, [searchQuery]);

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
      <section className="relative min-h-[80vh] flex items-center justify-center text-center px-4 overflow-hidden bg-brand-navy">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 z-0 opacity-40"
        >
          <SafeImage 
            src="https://picsum.photos/seed/advisory-hero-3/1920/1080" 
            className="w-full h-full object-cover" 
            alt="Advisory" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/20 via-brand-navy/60 to-brand-navy" />
        </motion.div>
        
        <div className="relative z-10 max-w-7xl mx-auto space-y-12 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-brand-green/20 text-brand-green rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-brand-green/30 backdrop-blur-xl">
              <ShieldCheck size={14} className="fill-brand-green" /> Central de Assessoria & Tutoriais
            </div>
            <h1 className="text-[10vw] md:text-[8vw] lg:text-[10vw] text-white leading-[0.8] tracking-tighter font-display font-black uppercase">
              PORTO <br />
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
              Tudo o que você precisa para sua jornada em Portugal. <br className="hidden md:block" />
              <span className="text-white font-black italic">Tutoriais gratuitos</span>, links oficiais e suporte especializado.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <a 
                href={BRAND.whatsappLink} 
                className="group relative w-full sm:w-auto bg-brand-green text-white px-12 py-6 rounded-full text-xl font-display font-black shadow-2xl shadow-brand-green/40 hover:bg-white hover:text-brand-green transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  CONSULTA GRATUITA <MessageCircle size={20} />
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </a>
              <a 
                href="#tutoriais" 
                className="text-white/60 hover:text-white font-black uppercase tracking-widest text-xs transition-colors"
              >
                Explorar Tutoriais ↓
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TUTORIALS SECTION */}
      <section id="tutoriais" className="py-32 px-4 bg-brand-gray relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-brand-green font-black uppercase tracking-[0.3em] text-[10px]">
                <BookOpen size={14} className="fill-brand-green" /> Conhecimento Livre
              </div>
              <h2 className="text-6xl md:text-8xl font-display font-black text-brand-dark tracking-tighter uppercase leading-[0.8]">Guias <br /><span className="text-brand-green">Práticos</span></h2>
            </div>

            {/* Search Bar */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="O que você procura? (ex: NIF, Visto...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-8 py-6 bg-white rounded-full border border-gray-100 shadow-xl focus:ring-2 focus:ring-brand-green outline-none font-medium transition-all"
              />
            </div>
          </div>

          {/* Categories Tabs */}
          <div className="flex flex-wrap justify-center gap-4">
            {ADVISORY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-8 py-4 rounded-full font-display font-black text-xs uppercase tracking-widest transition-all duration-500 ${
                  activeCategory === cat.id 
                    ? "bg-brand-navy text-white shadow-2xl scale-105" 
                    : "bg-white text-gray-400 hover:bg-gray-50"
                }`}
              >
                <span className="mr-2">{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>

          {/* Tutorials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredCategories
                .find(cat => cat.id === activeCategory)
                ?.tutorials.map((t) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -10 }}
                    className="group bg-white p-10 rounded-[40px] shadow-xl border border-gray-50 flex flex-col justify-between transition-all duration-500 hover:shadow-brand-green/10"
                  >
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-brand-gray rounded-2xl flex items-center justify-center text-brand-navy font-black text-xl">
                          {t.id}
                        </div>
                        {t.link && (
                          <span className="px-4 py-1.5 bg-brand-green/10 text-brand-green rounded-full text-[8px] font-black uppercase tracking-widest border border-brand-green/20">
                            Oficial
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tighter leading-tight group-hover:text-brand-green transition-colors">
                        {t.title}
                      </h3>
                      <p className="text-gray-500 text-sm font-medium leading-relaxed">
                        {t.desc}
                      </p>
                    </div>

                    <div className="pt-8 mt-8 border-t border-gray-50">
                      {t.link ? (
                        <a 
                          href={t.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-brand-navy font-black text-[10px] uppercase tracking-widest hover:text-brand-green transition-colors"
                        >
                          Aceder Link Oficial <ExternalLink size={14} />
                        </a>
                      ) : (
                        <span className="text-gray-300 font-black text-[10px] uppercase tracking-widest">
                          Guia em breve
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>

          {/* Special Section: Certidões */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-12"
          >
            <CertidoesSteps />
          </motion.div>
        </div>
      </section>

      {/* OFFICIAL LINKS SUMMARY */}
      <section className="py-32 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-display font-black text-brand-dark tracking-tighter uppercase">Links <span className="text-brand-green">Úteis</span></h2>
            <p className="text-gray-500 text-xl font-medium">Acesso rápido aos principais portais governamentais e de serviços.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {OFFICIAL_LINKS.map((group, i) => (
              <div key={i} className="space-y-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-green border-b border-brand-green/20 pb-4">
                  {group.category}
                </h4>
                <ul className="space-y-4">
                  {group.links.map((link, j) => (
                    <li key={j}>
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-6 bg-brand-gray rounded-3xl hover:bg-brand-navy hover:text-white transition-all duration-500"
                      >
                        <span className="font-bold text-sm uppercase tracking-widest">{link.label}</span>
                        <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT & SUPPORT */}
      <section className="py-32 px-4 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-16 relative z-10">
          <div className="space-y-8">
            <h2 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.8]">Precisa de <br /><span className="text-brand-green">ajuda extra?</span></h2>
            <p className="text-white/60 text-2xl max-w-3xl mx-auto font-medium tracking-tight leading-relaxed">
              Nossa equipe de especialistas está pronta para auxiliar em processos complexos e garantir sua tranquilidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <a 
              href={BRAND.whatsappLink}
              className="group flex flex-col items-center gap-6 p-12 bg-white/5 rounded-[60px] border border-white/10 hover:bg-brand-green hover:border-brand-green transition-all duration-700"
            >
              <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center group-hover:bg-white group-hover:text-brand-green transition-colors">
                <MessageCircle size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-display font-black uppercase tracking-tight">WhatsApp</h3>
                <p className="text-white/40 group-hover:text-white/80 font-medium">Atendimento imediato</p>
              </div>
            </a>

            <a 
              href={`mailto:${BRAND.email}`}
              className="group flex flex-col items-center gap-6 p-12 bg-white/5 rounded-[60px] border border-white/10 hover:bg-brand-navy hover:border-white/20 transition-all duration-700"
            >
              <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center group-hover:bg-white group-hover:text-brand-navy transition-colors">
                <Mail size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-display font-black uppercase tracking-tight">E-mail</h3>
                <p className="text-white/40 group-hover:text-white/80 font-medium">tripsmochileirosporto@gmail.com</p>
              </div>
            </a>
          </div>

          <div className="pt-12">
            <Link 
              to="/clube-vip" 
              className="inline-flex items-center gap-4 bg-brand-orange text-white px-16 py-8 rounded-full text-xl font-display font-black uppercase tracking-widest shadow-2xl shadow-brand-orange/40 hover:scale-105 transition-transform"
            >
              QUERO SER VIP & TER SUPORTE <Zap size={24} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
