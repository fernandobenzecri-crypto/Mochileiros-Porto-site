import { useState, FormEvent } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { BRAND } from "../constants";
import { ArrowRight, CheckCircle2, Star, Zap, Shield, Users, Gift, Sparkles, Crown, Gem, Rocket, Heart, HelpCircle, X, TrendingUp, Lock, ShieldCheck, CreditCard, MessageCircle, Package, Clock, Loader2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import { trackEvent } from "../analytics";

export default function VipClub() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedPlanData, setSelectedPlanData] = useState<{ plan: string, price: string } | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [address, setAddress] = useState({
    street: '',
    number: '',
    postalCode: '',
    city: ''
  });

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

  const handleVipSubscription = async (plan: string, price: string) => {
    if (!user) {
      navigate("/login?redirect=/clube-vip");
      return;
    }

    // If plan requires physical kit, show address modal first
    if (plan === 'semestral' || plan === 'anual' || plan === 'trimestral') {
      setSelectedPlanData({ plan, price });
      setShowAddressModal(true);
      return;
    }

    setIsLoading(plan);
    trackEvent('begin_checkout', { plan, value: parseFloat(price.replace('€', '').replace(',', '.')) });
    await initiateCheckout(plan, price);
    setIsLoading(null);
  };

  const initiateCheckout = async (plan: string, price: string, userAddress?: any) => {
    try {
      const response = await fetch("/api/checkout/create-vip-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan,
          price,
          userId: user?.uid,
          email: user?.email,
          address: userAddress
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Erro ao iniciar checkout VIP:", error);
    }
  };

  const handleAddressSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedPlanData) return;
    
    setIsLoading(selectedPlanData.plan);
    await initiateCheckout(selectedPlanData.plan, selectedPlanData.price, address);
    setIsLoading(null);
  };

  return (
    <div className="flex flex-col bg-white overflow-hidden">
      <SEOHead
        title="Clube VIP Mochileiros"
        description="Carteirinha VIP, descontos em excursões, parceiros locais e kit físico exclusivo. A partir de €7,90/mês para brasileiros em Porto."
        url="https://mochileirosporto.com/clube-vip"
      />
      {/* ADDRESS MODAL */}
      <AnimatePresence>
        {showAddressModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddressModal(false)}
              className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[50px] p-12 shadow-3xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8">
                <button onClick={() => setShowAddressModal(false)} className="text-gray-300 hover:text-brand-dark transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-brand-navy rounded-3xl flex items-center justify-center text-white shadow-2xl">
                    <Package size={40} />
                  </div>
                  <h3 className="text-4xl font-display font-black text-brand-dark uppercase tracking-tighter">Onde enviamos o teu Kit?</h3>
                  <p className="text-gray-500 font-medium">Precisamos da tua morada completa para o envio do Kit {selectedPlanData?.plan === 'anual' ? 'Fundador' : 'VIP'}.</p>
                </div>

                <form onSubmit={handleAddressSubmit} className="space-y-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-3 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Rua / Avenida</label>
                      <input 
                        required
                        type="text"
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        placeholder="Ex: Rua de Santa Catarina"
                        className="w-full px-8 py-5 bg-brand-gray/50 border-2 border-transparent focus:border-brand-green rounded-full font-bold text-brand-dark outline-none transition-all"
                      />
                    </div>
                    <div className="col-span-1 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Nº</label>
                      <input 
                        required
                        type="text"
                        value={address.number}
                        onChange={(e) => setAddress({ ...address, number: e.target.value })}
                        placeholder="123"
                        className="w-full px-6 py-5 bg-brand-gray/50 border-2 border-transparent focus:border-brand-green rounded-full font-bold text-brand-dark outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Código Postal</label>
                      <input 
                        required
                        type="text"
                        value={address.postalCode}
                        onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                        placeholder="4000-000"
                        className="w-full px-8 py-5 bg-brand-gray/50 border-2 border-transparent focus:border-brand-green rounded-full font-bold text-brand-dark outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Cidade</label>
                      <input 
                        required
                        type="text"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        placeholder="Porto"
                        className="w-full px-8 py-5 bg-brand-gray/50 border-2 border-transparent focus:border-brand-green rounded-full font-bold text-brand-dark outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoading !== null}
                    className="w-full py-6 bg-brand-navy text-white rounded-full font-display font-black uppercase tracking-widest text-xs hover:bg-brand-green transition-all shadow-2xl mt-4 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : null}
                    {isLoading ? 'PROCESSANDO...' : 'CONTINUAR PARA PAGAMENTO'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* HERO - Immersive */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden bg-brand-navy">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 z-0 opacity-40"
        >
          <img 
            src="https://picsum.photos/seed/vip-hero-3/1920/1080" 
            className="w-full h-full object-cover" 
            alt="VIP Club" 
            referrerPolicy="no-referrer" 
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/20 via-brand-navy/60 to-brand-navy" />
        </motion.div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-yellow/20 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-brand-green/10 rounded-full blur-[140px] animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 flex flex-col items-center"
          >
            <img src={BRAND.logo} alt="Logo" className="w-32 h-32 object-contain mb-4" referrerPolicy="no-referrer" />
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-brand-yellow/20 text-brand-yellow rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-brand-yellow/30 backdrop-blur-xl">
              <Crown size={14} className="fill-brand-yellow" /> O Próximo Nível da sua Jornada
            </div>
            <h1 className="text-[10vw] md:text-[8vw] lg:text-[10vw] text-white leading-[0.8] tracking-tighter font-display font-black uppercase">
              VIP <br />
              <span className="text-brand-yellow">COMMUNITY</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col items-center justify-center gap-12"
          >
            <div className="space-y-6">
              <p className="text-xl md:text-3xl text-white/70 max-w-4xl font-medium leading-relaxed tracking-tight mx-auto">
                Acesso antecipado, descontos exclusivos e <br className="hidden md:block" />
                uma rede de suporte que <span className="text-white font-black italic">acelera sua adaptação</span>.
              </p>
              <div className="space-y-4">
                <p className="text-brand-yellow text-2xl md:text-5xl font-display font-black uppercase tracking-tighter max-w-4xl mx-auto leading-tight">
                  "O único clube onde €7,90/mês te dá uma família em Porto <br />
                  e te poupa mais de €100 em benefícios reais."
                </p>
                <p className="text-white/60 text-lg md:text-2xl font-bold uppercase tracking-widest">
                  Mais de 500 brasileiros já fazem parte.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-10">
              <a 
                href="#planos" 
                className="group relative w-full sm:w-auto bg-brand-yellow text-brand-dark px-16 py-8 rounded-full text-2xl font-display font-black shadow-2xl shadow-brand-yellow/40 hover:bg-white transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  QUERO SER VIP <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </a>
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} className="w-12 h-12 rounded-full border-4 border-brand-navy shadow-2xl" alt="Member" loading="lazy" />
                ))}
                <div className="w-12 h-12 rounded-full bg-brand-yellow text-brand-dark flex items-center justify-center text-xs font-black border-4 border-brand-navy shadow-2xl">
                  +500
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BENEFITS - SaaS Style Cards */}
      <section className="py-40 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-32">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-brand-yellow font-black uppercase tracking-[0.3em] text-[10px]">
                <Gem size={14} className="fill-brand-yellow" /> Vantagens Exclusivas
              </div>
              <h2 className="text-6xl md:text-9xl font-display font-black text-brand-dark tracking-tighter uppercase leading-[0.8]">Por que <br /><span className="text-brand-yellow">ser VIP?</span></h2>
              <p className="text-gray-500 text-2xl max-w-xl font-medium tracking-tight">Não é apenas um grupo, é o seu porto seguro e acelerador de resultados em Portugal.</p>
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
                title: "Acesso Antecipado", 
                desc: "Receba os convites para viagens e eventos 24h antes de todo mundo. Nunca mais fique de fora.", 
                icon: <Zap size={32} />, 
                color: "bg-brand-yellow"
              },
              { 
                title: "Descontos Reais", 
                desc: "Economize em cada viagem, evento e em nossa rede de parceiros selecionados (advogados, contadores, etc).", 
                icon: <Gift size={32} />, 
                color: "bg-brand-green"
              },
              { 
                title: "Suporte 24/7", 
                desc: "Um grupo exclusivo para tirar dúvidas sobre moradia, trabalho, documentos e o dia a dia no Porto.", 
                icon: <Shield size={32} />, 
                color: "bg-brand-navy"
              },
              { 
                title: "Networking Elite", 
                desc: "Conecte-se com brasileiros que já estão estabelecidos e podem abrir portas para você.", 
                icon: <Users size={32} />, 
                color: "bg-brand-orange"
              },
              { 
                title: "Eventos Secretos", 
                desc: "Jantares e encontros exclusivos apenas para membros VIP, em locais inusitados.", 
                icon: <Sparkles size={32} />, 
                color: "bg-brand-yellow"
              },
              { 
                title: "Guia do Imigrante", 
                desc: "Acesso a materiais exclusivos, checklists e tutoriais para sua legalização e adaptação.", 
                icon: <Rocket size={32} />, 
                color: "bg-brand-green"
              }
            ].map((benefit, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                whileHover={{ y: -20 }}
                className="group p-12 bg-brand-gray rounded-[60px] border border-gray-100 shadow-3xl shadow-brand-dark/5 space-y-8 transition-all duration-500 hover:bg-white hover:shadow-brand-yellow/10"
              >
                <div className={`w-24 h-24 ${benefit.color} text-white rounded-[32px] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                  {benefit.icon}
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-display font-black text-brand-dark leading-none uppercase tracking-tighter">{benefit.title}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed font-medium">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS - 3 Steps */}
      <section className="py-32 px-4 bg-brand-gray/30">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-display font-black text-brand-dark uppercase tracking-tighter">
              Como funciona o <span className="text-brand-green">Clube VIP?</span>
            </h2>
            <p className="text-gray-500 font-medium text-lg">O processo é instantâneo e sem complicações.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-brand-green/10 -translate-y-1/2 z-0" />

            {[
              {
                step: "01",
                title: "Assine o Plano",
                desc: "Escolha o plano que melhor se adapta ao seu momento no Porto.",
                icon: <CreditCard size={32} />,
                color: "bg-brand-navy"
              },
              {
                step: "02",
                title: "WhatsApp Exclusivo",
                desc: "Receba o link imediato para entrar no grupo VIP com Fernando e Camila.",
                icon: <MessageCircle size={32} />,
                color: "bg-brand-green"
              },
              {
                step: "03",
                title: "Aproveite as Vantagens",
                desc: "Economize em viagens, eventos e tenha suporte total da comunidade.",
                icon: <Sparkles size={32} />,
                color: "bg-brand-yellow"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 bg-white p-10 rounded-[40px] shadow-xl border border-gray-100 text-center space-y-6 group hover:scale-105 transition-transform duration-500"
              >
                <div className={`w-20 h-20 ${item.color} text-white rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:rotate-6 transition-transform`}>
                  {item.icon}
                </div>
                <div className="space-y-2">
                  <div className="text-brand-green font-black text-xs tracking-[0.3em] uppercase">{item.step}</div>
                  <h3 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight">{item.title}</h3>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING - 4 Plans Structure */}
      <section id="planos" className="py-40 px-4 bg-brand-navy relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-yellow via-transparent to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto space-y-24 relative z-10">
          {/* FOUNDER OFFER BANNER */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-red-600 text-white p-8 rounded-[40px] shadow-2xl border-4 border-white/20 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <Zap size={120} />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="space-y-2">
                <h3 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tighter">🔥 OFERTA FUNDADOR — APENAS 100 VAGAS A €99,90/ANO</h3>
                <p className="text-white/80 font-bold uppercase tracking-widest text-xs">Acesso vitalício ao badge "Fundador 2026" e Kit Caixa Premium</p>
              </div>
            </div>
          </motion.div>

          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 text-brand-yellow font-black uppercase tracking-[0.3em] text-[10px]">
              <Crown size={14} className="fill-brand-yellow" /> Planos de Assinatura
            </div>
            <h2 className="text-6xl md:text-9xl font-display font-black text-white tracking-tighter uppercase leading-[0.8]">Escolha seu <br /><span className="text-brand-yellow">Acesso</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* PLAN 1 - MENSAL */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[50px] space-y-8 group hover:bg-white/10 transition-all duration-500 flex flex-col"
            >
              <div className="space-y-4">
                <div className="text-white/40 font-black uppercase tracking-[0.3em] text-[10px]">VIP Mochileiro</div>
                <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter">Mensal</h3>
                <div className="flex items-end gap-2">
                  <div className="text-4xl font-display font-black text-white tracking-tighter">€7,90</div>
                  <div className="text-white/40 font-black text-xs mb-1">/mês</div>
                </div>
              </div>
              <div className="space-y-4 flex-grow">
                <div className="flex items-center gap-3 text-white/80 text-xs font-bold">
                  <CheckCircle2 size={16} className="text-brand-green shrink-0" /> Carteirinha Digital
                </div>
                <div className="flex items-center gap-3 text-white/80 text-xs font-bold">
                  <CheckCircle2 size={16} className="text-brand-green shrink-0" /> 10% Desconto Excursões
                </div>
                <div className="flex items-center gap-3 text-white/80 text-xs font-bold">
                  <CheckCircle2 size={16} className="text-brand-green shrink-0" /> Sorteio Mensal
                </div>
                <div className="flex items-center gap-3 text-white/80 text-xs font-bold">
                  <CheckCircle2 size={16} className="text-brand-green shrink-0" /> Badge "VIP Mochileiro"
                </div>
              </div>
              <button 
                onClick={() => handleVipSubscription('mochileiro', '7.90')}
                disabled={isLoading === 'mochileiro'}
                className="block w-full py-5 bg-white/10 text-white rounded-full text-center font-display font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-brand-dark transition-all duration-500 mt-auto disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading === 'mochileiro' ? <Loader2 size={14} className="animate-spin" /> : null}
                ASSINAR MENSAL
              </button>
            </motion.div>

            {/* PLAN 2 - TRIMESTRAL */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[50px] space-y-8 group hover:bg-white/10 transition-all duration-500 flex flex-col"
            >
              <div className="space-y-4">
                <div className="text-white/40 font-black uppercase tracking-[0.3em] text-[10px]">VIP Trimestral</div>
                <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter">Trimestral</h3>
                <div className="flex items-end gap-2">
                  <div className="text-4xl font-display font-black text-white tracking-tighter">€24,90</div>
                  <div className="text-white/40 font-black text-xs mb-1">/trim</div>
                </div>
              </div>
              <div className="space-y-4 flex-grow">
                <div className="flex items-center gap-3 text-white/80 text-xs font-bold">
                  <CheckCircle2 size={16} className="text-brand-green shrink-0" /> Carteirinha Digital Premium
                </div>
                <div className="flex items-center gap-3 text-white/80 text-xs font-bold">
                  <CheckCircle2 size={16} className="text-brand-green shrink-0" /> 15% Desconto Excursões
                </div>
                <div className="flex items-center gap-3 text-white/80 text-xs font-bold">
                  <CheckCircle2 size={16} className="text-brand-green shrink-0" /> Sorteio Trimestral
                </div>
                <div className="flex items-center gap-3 text-white/80 text-xs font-bold">
                  <Gift size={16} className="text-brand-yellow shrink-0" /> 1 Adesivo Físico (Correio)
                </div>
              </div>
              <button 
                onClick={() => handleVipSubscription('trimestral', '24.90')}
                disabled={isLoading === 'trimestral'}
                className="block w-full py-5 bg-white/10 text-white rounded-full text-center font-display font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-brand-dark transition-all duration-500 mt-auto disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading === 'trimestral' ? <Loader2 size={14} className="animate-spin" /> : null}
                ASSINAR TRIMESTRAL
              </button>
            </motion.div>

            {/* PLAN 3 - SEMESTRAL */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[50px] space-y-8 flex flex-col relative shadow-2xl shadow-brand-green/20"
            >
              <div className="space-y-4">
                <div className="text-brand-green font-black uppercase tracking-[0.3em] text-[10px]">VIP Semestral</div>
                <h3 className="text-3xl font-display font-black text-brand-dark uppercase tracking-tighter">Semestral</h3>
                <div className="flex items-end gap-2">
                  <div className="text-4xl font-display font-black text-brand-dark tracking-tighter">€44,90</div>
                  <div className="text-gray-400 font-black text-xs mb-1">/sem</div>
                </div>
              </div>
              <div className="space-y-4 flex-grow">
                <div className="flex items-center gap-3 text-brand-dark text-xs font-bold">
                  <CheckCircle2 size={16} className="text-brand-green shrink-0" /> Carteirinha Física PVC
                </div>
                <div className="flex items-center gap-3 text-brand-dark text-xs font-bold">
                  <CheckCircle2 size={16} className="text-brand-green shrink-0" /> 15% Desconto Excursões
                </div>
                <div className="flex items-center gap-3 text-brand-dark text-xs font-bold">
                  <CheckCircle2 size={16} className="text-brand-green shrink-0" /> Eventos Fechados
                </div>
                <div className="flex items-center gap-3 text-brand-dark text-xs font-bold">
                  <Gift size={16} className="text-brand-green shrink-0" /> Envelope Premium (Brinde)
                </div>
              </div>
              <button 
                onClick={() => handleVipSubscription('semestral', '44.90')}
                disabled={isLoading === 'semestral'}
                className="block w-full py-5 bg-brand-green text-white rounded-full text-center font-display font-black text-[10px] uppercase tracking-[0.3em] hover:bg-brand-dark transition-all duration-500 mt-auto shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading === 'semestral' ? <Loader2 size={14} className="animate-spin" /> : null}
                ASSINAR SEMESTRAL
              </button>
            </motion.div>

            {/* PLAN 4 - ANUAL (FUNDADOR) */}
            <motion.div 
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1.1 }}
              viewport={{ once: true }}
              className="bg-brand-yellow p-8 rounded-[50px] space-y-8 flex flex-col relative shadow-3xl shadow-brand-yellow/30 border-4 border-white z-20"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-dark text-white px-6 py-2 rounded-full text-[8px] font-black uppercase tracking-[0.3em] shadow-2xl whitespace-nowrap">
                👑 MELHOR VALOR (FUNDADOR)
              </div>
              <div className="space-y-4">
                <div className="text-brand-dark font-black uppercase tracking-[0.3em] text-[10px]">Fundador Mochileiros</div>
                <h3 className="text-3xl font-display font-black text-brand-dark uppercase tracking-tighter">Anual</h3>
                <div className="flex items-end gap-2">
                  <div className="text-4xl font-display font-black text-brand-dark tracking-tighter">€99,90</div>
                  <div className="text-brand-dark/40 font-black text-xs mb-1">/ano</div>
                </div>
              </div>
              <div className="space-y-4 flex-grow">
                <div className="flex items-center gap-3 text-brand-dark text-xs font-bold">
                  <Rocket size={16} className="shrink-0" /> 20% Desconto Excursões
                </div>
                <div className="flex items-center gap-3 text-brand-dark text-xs font-bold">
                  <Users size={16} className="shrink-0" /> Eventos VIP Fundadores
                </div>
                <div className="flex items-center gap-3 text-brand-dark text-xs font-bold">
                  <Star size={16} className="shrink-0" /> Assessoria Trimestral
                </div>
                <div className="flex items-center gap-3 text-brand-dark text-xs font-bold">
                  <Gift size={16} className="shrink-0" /> 📦 Caixa Fundador Premium
                </div>
              </div>
              <button 
                onClick={() => handleVipSubscription('anual', '99.90')}
                disabled={isLoading === 'anual'}
                className="block w-full py-6 bg-brand-dark text-white rounded-full text-center font-display font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-brand-dark transition-all duration-500 mt-auto shadow-2xl disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading === 'anual' ? <Loader2 size={14} className="animate-spin" /> : null}
                QUERO SER FUNDADOR
              </button>
            </motion.div>
          </div>

          {/* COMPARISON TABLE */}
          <div className="pt-20">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[60px] overflow-hidden">
              <div className="p-12 border-b border-white/10">
                <h3 className="text-3xl font-display font-black text-white uppercase tracking-tight text-center">Comparativo de Benefícios</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[10px] font-black uppercase tracking-widest text-white/40 border-b border-white/5">
                      <th className="px-10 py-8">Benefício</th>
                      <th className="px-10 py-8 text-center">Mensal</th>
                      <th className="px-10 py-8 text-center">Trimestral</th>
                      <th className="px-10 py-8 text-center">Semestral</th>
                      <th className="px-10 py-8 text-center text-brand-yellow">Anual</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-bold text-white/80">
                    {[
                      { b: "Carteirinha Digital", m: "✅", t: "✅", s: "✅", a: "✅" },
                      { b: "Carteirinha Física PVC", m: "❌", t: "❌", s: "✅", a: "✅ Gravada" },
                      { b: "Camiseta Exclusiva", m: "❌", t: "❌", s: "❌", a: "✅ Fundador" },
                      { b: "Caderneta de Viagem", m: "❌", t: "❌", s: "❌", a: "✅" },
                      { b: "Carta do Fernando", m: "Digital", t: "Digital", s: "Física", a: "Manuscrita" },
                      { b: "Desconto Excursões", m: "10%", t: "15%", s: "15%", a: "20%" },
                      { b: "Sorteios", m: "Mensal", t: "Trimestral", s: "Semestral", a: "Trimestral Premium" },
                      { b: "Eventos Fechados", m: "❌", t: "❌", s: "✅", a: "✅ Fundador" },
                      { b: "Assessoria Pessoal", m: "❌", t: "❌", s: "❌", a: "✅ 1/trim" },
                      { b: "Badge Permanente", m: "❌", t: "❌", s: "❌", a: "✅ Para sempre" },
                      { b: "Voto em Destinos", m: "❌", t: "❌", s: "❌", a: "✅" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-10 py-6">{row.b}</td>
                        <td className="px-10 py-6 text-center">{row.m}</td>
                        <td className="px-10 py-6 text-center">{row.t}</td>
                        <td className="px-10 py-6 text-center">{row.s}</td>
                        <td className="px-10 py-6 text-center text-brand-yellow">{row.a}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED TESTIMONIAL */}
      <section className="py-20 px-4 bg-brand-navy">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-12 md:p-16 rounded-[60px] flex flex-col md:flex-row items-center gap-12 shadow-3xl shadow-brand-dark/20 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-brand-yellow" />
            <img 
              src="https://i.pravatar.cc/200?u=anapaula" 
              alt="Ana Paula" 
              className="w-32 h-32 md:w-48 md:h-48 rounded-[40px] shadow-2xl border-4 border-brand-gray"
              loading="lazy"
            />
            <div className="space-y-6 text-center md:text-left">
              <p className="text-2xl md:text-3xl text-brand-dark font-medium leading-relaxed italic">
                "Cheguei ao Porto sem conhecer ninguém. Hoje tenho amigos, já viajei 3 vezes com a galera e economizei mais de €200 em serviços. Melhor €7,90 que já gastei."
              </p>
              <div>
                <div className="text-xl font-display font-black text-brand-dark uppercase tracking-tighter">Ana Paula</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">São Paulo — Membro há 8 meses</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-40 px-4 bg-white">
        <div className="max-w-4xl mx-auto space-y-24">
          <div className="text-center space-y-8">
            <h2 className="text-6xl md:text-8xl font-display font-black text-brand-dark tracking-tighter uppercase leading-[0.8]">Dúvidas <br /><span className="text-brand-green">Comuns</span></h2>
          </div>
          
          <div className="space-y-6">
            {[
              { q: "Posso cancelar a qualquer momento?", a: "Sim. Sem fidelização. Você pode cancelar com apenas um clique diretamente na sua área de membro." },
              { q: "O acesso ao grupo VIP é imediato?", a: "Sim. Em menos de 10 minutos após a confirmação do pagamento, você recebe o link de acesso no seu e-mail e WhatsApp." },
              { q: "Os descontos funcionam em lojas físicas?", a: "Sim. Basta apresentar sua carteirinha digital no seu celular nos nossos parceiros oficiais no Porto." },
              { q: "Quantas vagas Fundador restam?", a: "As vagas com preço promocional são limitadas aos primeiros 100 membros. Garanta seu valor vitalício agora." }
            ].map((faq, idx) => (
              <motion.details 
                key={idx} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group border border-gray-100 rounded-[48px] p-10 hover:bg-brand-gray transition-all cursor-pointer"
              >
                <summary className="list-none flex justify-between items-center text-2xl font-display font-black text-brand-dark uppercase tracking-tighter">
                  <div className="flex items-center gap-6">
                    <HelpCircle className="text-brand-green" size={28} />
                    {faq.q}
                  </div>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-open:rotate-45 transition-transform">
                    <span className="text-3xl text-brand-dark">+</span>
                  </div>
                </summary>
                <p className="mt-8 text-gray-500 leading-relaxed text-xl pl-12 border-l-4 border-brand-green/20 ml-4 font-medium">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - Immersive */}
      <section className="py-40 px-4 bg-brand-gray relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 text-brand-orange font-black uppercase tracking-[0.3em] text-[10px]">
              <Heart size={14} className="fill-brand-orange" /> Histórias de Sucesso
            </div>
            <h2 className="text-6xl md:text-9xl font-display font-black text-brand-dark tracking-tighter uppercase leading-[0.8]">Quem já <br /><span className="text-brand-orange">é VIP</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                name: "Juliana Silva",
                role: "Membro VIP há 2 anos",
                text: "Entrar no VIP foi a melhor decisão que tomei ao chegar no Porto. Consegui meu primeiro emprego através de uma indicação no grupo e fiz amigos que hoje são minha família aqui.",
                img: "https://i.pravatar.cc/150?u=juliana"
              },
              {
                name: "Ricardo Santos",
                role: "Membro Mochileiro VIP há 1 ano",
                text: "Os descontos nas viagens já pagaram a anuidade do plano Mochileiro VIP logo nos primeiros meses. Mas o valor real está no suporte que recebi para abrir minha empresa em Portugal.",
                img: "https://i.pravatar.cc/150?u=ricardo"
              }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-16 rounded-[80px] space-y-10 relative overflow-hidden group shadow-3xl shadow-brand-dark/5"
              >
                <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-6">
                    <img src={t.img} className="w-24 h-24 rounded-full border-4 border-brand-gray shadow-2xl" alt={t.name} loading="lazy" />
                    <div>
                      <div className="text-2xl font-display font-black text-brand-dark uppercase tracking-tighter">{t.name}</div>
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange">{t.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-500 text-2xl font-medium leading-relaxed tracking-tight italic">"{t.text}"</p>
                </div>
                <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Crown size={200} className="text-brand-orange" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quer ir além? Section */}
      <section className="py-32 px-4 bg-brand-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-green via-transparent to-transparent" />
        </div>
        
        <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-6 py-2 bg-white/10 text-brand-green rounded-full text-[10px] font-black uppercase tracking-[0.4em] backdrop-blur-xl border border-white/10"
          >
            <Crown size={14} className="fill-brand-green" /> Programa de Liderança
          </motion.div>
          
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-none">
              Quer ir <span className="text-brand-green">além</span> da comunidade?
            </h2>
            <p className="text-white/60 text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
              Torne-se um Embaixador MP. Ajude quem está chegando, ganhe pontos, suba no ranking e receba benefícios exclusivos sem pagar assinatura.
            </p>
          </div>

          <div className="pt-8">
            <Link 
              to="/embaixador"
              className="inline-flex items-center gap-4 px-16 py-8 bg-brand-green text-white rounded-full font-display font-black text-xl uppercase tracking-widest shadow-3xl shadow-brand-green/20 hover:bg-white hover:text-brand-dark transition-all duration-500 hover:scale-105 active:scale-95"
            >
              Conhecer o Programa Embaixador
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
