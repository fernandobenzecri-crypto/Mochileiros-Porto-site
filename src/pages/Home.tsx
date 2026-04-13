/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { doc, onSnapshot, query, collection, orderBy } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../firebase";
import { STATS, CALENDAR_2026, TESTIMONIALS, BRAND } from "../constants";
import { LeadCaptureForm } from "../components/LeadCaptureForm";
import SEOHead from "../components/SEOHead";
import { ArrowRight, Sparkles, Globe, Users, Zap, Heart, Calendar, MessageCircle, Star, Quote, Clock, Instagram, Utensils, Activity, Scale, Home as HomeIcon, Scissors, Ticket, Newspaper } from "lucide-react";

function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 justify-center">
      {[
        { label: "Dias", value: timeLeft.days },
        { label: "Horas", value: timeLeft.hours },
        { label: "Min", value: timeLeft.minutes },
        { label: "Seg", value: timeLeft.seconds },
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 min-w-[70px]">
          <div className="text-2xl font-display font-black text-brand-green">{item.value}</div>
          <div className="text-[8px] font-black uppercase tracking-widest text-white/40">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const { loading } = useAuth();
  const { scrollYProgress } = useScroll();
  const [tocaSettings, setTocaSettings] = useState<any>(null);
  const [trips, setTrips] = useState<any[]>([]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useEffect(() => {
    document.title = "Mochileiros Porto | A Maior Comunidade Brasileira em Portugal";
  }, []);

  useEffect(() => {
    if (loading) return;
    const unsub = onSnapshot(doc(db, "settings", "toca_meeting"), (docSnap) => {
      if (docSnap.exists()) {
        setTocaSettings(docSnap.data());
      }
    }, (error) => handleFirestoreError(error, OperationType.GET, "settings/toca_meeting"));
    return () => unsub();
  }, [loading]);

  useEffect(() => {
    if (loading) return;
    const q = query(
      collection(db, "viagens"), 
      orderBy("dataPartida", "asc")
    );
    const unsub = onSnapshot(q, (snap) => {
      const tripsData = snap.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter((trip: any) => trip.ativo !== false);
      setTrips(tripsData);
    }, (error) => handleFirestoreError(error, OperationType.LIST, "viagens"));
    return () => unsub();
  }, [loading]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Data a definir";
    const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
    return date.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' }).replace('.', '');
  };

  const getNextTripDate = () => {
    if (trips.length === 0) return "2026-12-31T23:59:59";
    const nextTrip = trips[0];
    if (!nextTrip.dataPartida) return "2026-12-31T23:59:59";
    const date = nextTrip.dataPartida.seconds ? new Date(nextTrip.dataPartida.seconds * 1000) : new Date(nextTrip.dataPartida);
    return date.toISOString();
  };

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

  const handleBooking = async (trip: any) => {
    try {
      const response = await fetch("/api/checkout/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripId: trip.id,
          tripName: trip.destino || trip.titulo,
          price: trip.precoPublico,
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Erro ao iniciar checkout:", error);
    }
  };

  return (
    <div className="flex flex-col bg-white overflow-hidden">
      <SEOHead
        title="A Maior Comunidade Brasileira em Portugal"
        description="Conecte-se com brasileiros no Porto. Excursões, eventos, assessoria e o Clube VIP para sua melhor adaptação em Portugal."
        url="https://mochileirosporto.com"
      />
      {/* S2: HERO - Editorial Style */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden bg-brand-navy">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 z-0 opacity-40"
        >
          <img 
            src="https://picsum.photos/seed/mochileiros-hero-3/1920/1080" 
            className="w-full h-full object-cover" 
            alt="Mochileiros Porto" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/20 via-brand-navy/60 to-brand-navy" />
        </motion.div>

        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-green/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[120px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03]">
            <div className="w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 flex flex-col items-center"
          >
            <img src={BRAND.logo} alt="Logo" className="w-32 h-32 md:w-48 md:h-48 object-contain mb-4 drop-shadow-2xl" referrerPolicy="no-referrer" />
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-brand-green/20 text-brand-green rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-brand-green/30 backdrop-blur-xl">
              <Globe size={14} /> A Maior Comunidade Brasileira no Porto
            </div>
            <h1 className="text-[12vw] md:text-[10vw] lg:text-[12vw] text-white leading-[0.8] tracking-tighter font-display font-black uppercase select-none">
              CONECTAR.<br />
              PERTENCER.<br />
              <span className="text-brand-green relative inline-block">
                VIVER.
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 h-4 bg-brand-green/30 -rotate-1" 
                />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed tracking-tight">
              A comunidade de brasileiros em Porto com eventos, excursões e uma rede que vai mudar sua vida em Portugal.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col items-center justify-center gap-12"
          >
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl font-medium leading-relaxed tracking-tight">
              Não somos uma agência. Somos o seu <span className="text-white font-black italic">porto seguro</span> em Portugal.
            </p>
            <div className="flex flex-col items-center gap-8">
              <Link 
                to="/links-uteis" 
                className="group relative w-full sm:w-auto bg-brand-green text-white px-16 py-8 rounded-full text-2xl font-display font-black shadow-2xl shadow-brand-green/40 hover:bg-white hover:text-brand-green transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  ENTRAR NOS GRUPOS 🎒 <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
              <Link 
                to="/clube-vip"
                className="text-white/60 hover:text-white font-display font-black text-sm uppercase tracking-[0.2em] transition-colors flex items-center gap-2"
              >
                Já quero o Clube VIP <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* SCROLL INDICATOR */}
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20"
        >
          <div className="w-8 h-14 border-2 border-white/10 rounded-full flex justify-center p-2">
            <motion.div 
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-3 bg-brand-green rounded-full" 
            />
          </div>
        </motion.div>
      </section>

      {/* S3: THE PAIN - High Contrast */}
      <section className="py-40 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-brand-green font-black uppercase tracking-[0.3em] text-[10px]">
                <Heart size={14} className="fill-brand-green" /> Você não está sozinho
              </div>
              <h2 className="text-6xl md:text-9xl font-display font-black text-brand-dark leading-[0.8] tracking-tighter uppercase">
                A solidão do <br />
                imigrante <br />
                <span className="text-brand-green">é real.</span>
              </h2>
            </div>
            <div className="space-y-8 text-2xl text-gray-500 leading-relaxed font-medium max-w-2xl">
              <p>
                Você conhece esse sentimento. Chega o sábado, o apartamento parece menor, o celular parece mais vazio, e o Brasil parece mais longe. 
              </p>
              <p className="text-brand-dark font-bold">
                Não é falta de coragem. É que construir uma vida social num país novo, do zero, sem conhecer ninguém — é genuinamente difícil. 
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <motion.div 
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="bg-brand-navy p-16 rounded-[60px] text-white space-y-10 relative overflow-hidden group rotate-3 transition-all duration-700 shadow-3xl shadow-brand-navy/20"
            >
              <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Quote size={120} className="fill-white" />
              </div>
              <p className="text-3xl font-display font-black leading-tight relative z-10 uppercase tracking-tighter">
                O Mochileiros Porto existe porque Fernando sentiu exatamente isso em 2020. E decidiu criar o que não existia.
              </p>
              <div className="w-20 h-2 bg-brand-green rounded-full relative z-10" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl group-hover:bg-brand-green/20 transition-all" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* S4: FOUNDERS STORY - Editorial */}
      <section className="py-40 px-4 bg-brand-gray relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-8 bg-brand-green/10 rounded-[80px] rotate-6" />
            <div className="relative rounded-[60px] overflow-hidden shadow-3xl">
              <img 
                src="https://picsum.photos/seed/founders-porto/1000/1200" 
                alt="Fernando e Camila" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 hover:scale-100"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
              <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                <div className="text-white space-y-1">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-green">Fundadores</div>
                  <div className="text-3xl font-display font-black uppercase tracking-tighter">Fernando & Camila</div>
                </div>
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20">
                  <Heart size={24} className="fill-white" />
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-brand-green font-black uppercase tracking-[0.3em] text-[10px]">
                <Sparkles size={14} className="fill-brand-green" /> Nossa Jornada
              </div>
              <h2 className="text-6xl md:text-8xl font-display font-black text-brand-dark tracking-tighter uppercase leading-[0.9]">Uma história <br />de <span className="text-brand-green">conexão.</span></h2>
            </div>
            <div className="space-y-8 text-xl text-gray-500 leading-relaxed font-medium">
              <p>
                Fernando chegou ao Porto sozinho em 2020. Não conhecia ninguém. Tentou se virar. E percebeu que havia centenas de pessoas iguais a ele, dispersas pela cidade, sem ponto de encontro.
              </p>
              <p>
                Criou o Mochileiros Porto. Dentro da comunidade, conheceu a Camila. Hoje são casados, co-fundadores e a prova viva de que o que construíram funciona.
              </p>
              <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-xl space-y-4">
                <div className="flex items-center gap-4 text-brand-dark font-black uppercase tracking-widest text-xs">
                  <Zap size={16} className="text-brand-green fill-brand-green" /> Evolução da Comunidade
                </div>
                <p className="font-bold text-brand-dark text-lg">
                  De 2020 a 2022: grupo social. <br />
                  De 2022 a 2023: crescimento e estrutura. <br />
                  De 2023 a 2026: ecossistema completo.
                </p>
              </div>
            </div>
            <Link to="/sobre" className="group inline-flex items-center gap-4 bg-brand-navy text-white px-10 py-5 rounded-full font-display font-black text-sm uppercase tracking-widest hover:bg-brand-green transition-all duration-500 shadow-xl">
              CONHECER NOSSA HISTÓRIA <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* S5: ANIMATED COUNTERS - Technical Style */}
      <section className="py-32 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-16 relative z-10">
          {STATS.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="text-center space-y-6 group"
            >
              <div className="relative inline-block">
                <div className="text-6xl md:text-8xl font-display font-black text-brand-green tracking-tighter group-hover:scale-110 transition-transform duration-500">
                  {stat.value}
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                  <Zap size={12} className="text-brand-green fill-brand-green" />
                </div>
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-white/60 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* S6: THE 3 LAYERS - SaaS Style */}
      <section className="py-40 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 text-brand-green font-black uppercase tracking-[0.3em] text-[10px]">
              <Zap size={14} className="fill-brand-green" /> Ecossistema Mochileiros
            </div>
            <h2 className="text-6xl md:text-9xl font-display font-black text-brand-dark tracking-tighter uppercase leading-[0.8]">O que é o <br /><span className="text-brand-green">Mochileiros Porto</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                icon: "🏠", 
                title: "Encontro na Toca", 
                desc: "Todo mês recebemos os novos membros num encontro presencial na Toca dos Mochileiros. É aqui que todo mundo deixa de ser só avatar e vira família em Porto.", 
                price: tocaSettings?.nextDate ? `Próximo: ${tocaSettings.nextDate}` : "Mensal",
                link: "/eventos",
                color: "bg-brand-green/10",
                text: "text-brand-green",
                vip: false
              },
              { 
                icon: "✈️", 
                title: "As Excursões", 
                desc: "Todo fim de semana, a partir do Porto. Termas, montanhas, cidades históricas, praias. Em grupo, com quem sabe como é chegar sozinho.", 
                price: "A partir de €30",
                link: "/viagens",
                color: "bg-brand-green/10",
                text: "text-brand-green",
                vip: false
              },
              { 
                icon: "🎉", 
                title: "Os Eventos", 
                desc: "A Toca dos Mochileiros. Encontros 2x por mês, noites temáticas, eventos só para mulheres. O Porto que você ainda não explorou.", 
                price: "€7–10 por pessoa",
                link: "/eventos",
                color: "bg-brand-orange/10",
                text: "text-brand-orange",
                vip: false
              },
              { 
                icon: "👑", 
                title: "O Clube VIP", 
                desc: "Pague menos de €10/mês e tenha uma família em Porto, descontos nas excursões e parceiros, e acesso à Toca dos Mochileiros.", 
                price: "€7,90/mês",
                link: "/clube-vip",
                color: "bg-brand-yellow/10",
                text: "text-brand-yellow",
                dark: true,
                vip: true
              }
            ].map((card, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -20 }}
                className={`p-12 rounded-[60px] flex flex-col justify-between space-y-10 transition-all duration-700 shadow-2xl shadow-brand-dark/5 border border-gray-50 ${card.dark ? 'bg-brand-navy text-white' : 'bg-white'}`}
              >
                <div className="space-y-8">
                  <div className={`w-20 h-20 ${card.color} rounded-3xl flex items-center justify-center text-4xl shadow-inner`}>{card.icon}</div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-3xl font-display font-black uppercase tracking-tighter ${card.dark ? 'text-brand-yellow' : 'text-brand-dark'}`}>{card.title}</h3>
                      {card.vip && (
                        <span className="bg-brand-yellow text-brand-dark px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest animate-pulse">
                          ⭐ OFERTA FUNDADOR
                        </span>
                      )}
                    </div>
                    <p className={`${card.dark ? 'text-white/60' : 'text-gray-500'} text-lg font-medium leading-relaxed`}>{card.desc}</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className={`text-xl font-display font-black ${card.text}`}>
                    {card.vip ? (
                      <div className="flex flex-col gap-1">
                        <div className="text-[10px] text-white/40 uppercase tracking-widest">Valor normal: €15/mês</div>
                        <div className="flex items-center gap-2">
                          <span className="text-brand-yellow">Fundadores pagam: €7,90</span>
                        </div>
                      </div>
                    ) : (
                      `A partir de ${card.price}`
                    )}
                  </div>
                  <Link to={card.link} className={`group inline-flex items-center gap-3 font-black text-xs uppercase tracking-widest ${card.dark ? 'text-white hover:text-brand-green' : 'text-brand-dark hover:text-brand-green'} transition-colors`}>
                    {card.vip ? "GARANTIR MINHA VAGA" : "VER DETALHES"} <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* PARTNERS BAR */}
          <div className="pt-20 space-y-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-t border-gray-100 pt-20">
              <div className="space-y-2 text-center md:text-left">
                <h4 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight">Descontos exclusivos para membros VIP</h4>
                <p className="text-gray-400 font-medium">Economize em mais de 50 estabelecimentos no Porto.</p>
              </div>
              <Link to="/parcerias" className="bg-brand-gray text-brand-dark px-8 py-4 rounded-full font-display font-black text-[10px] uppercase tracking-widest hover:bg-brand-green hover:text-white transition-all">
                Ver todos os parceiros
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
              {[
                { label: "Restaurantes", icon: <Utensils size={24} /> },
                { label: "Saúde", icon: <Activity size={24} /> },
                { label: "Jurídico", icon: <Scale size={24} /> },
                { label: "Imóveis", icon: <HomeIcon size={24} /> },
                { label: "Beleza", icon: <Scissors size={24} /> },
                { label: "Lazer", icon: <Ticket size={24} /> },
              ].map((cat, i) => (
                <div key={i} className="flex flex-col items-center gap-4 p-8 bg-brand-gray rounded-3xl group hover:bg-white hover:shadow-xl transition-all duration-500 cursor-pointer">
                  <div className="text-brand-green group-hover:scale-110 transition-transform">{cat.icon}</div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-brand-dark">{cat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* S7: TESTIMONIALS - Immersive */}
      <section className="py-40 px-4 bg-brand-gray relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-6xl md:text-8xl font-display font-black text-brand-dark tracking-tighter uppercase leading-[0.9]">O que mudou na <br /><span className="text-brand-green">vida de quem faz parte</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ scale: 1.02 }}
                className="bg-white p-16 rounded-[60px] shadow-3xl shadow-brand-dark/5 space-y-10 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Quote size={80} className="fill-brand-navy" />
                </div>
                <div className="flex gap-2 text-brand-yellow">
                  {[...Array(t.stars)].map((_, i) => <Star key={i} size={20} className="fill-brand-yellow" />)}
                </div>
                <p className="text-2xl italic text-gray-700 leading-relaxed font-medium relative z-10">"{t.text}"</p>
                <div className="flex items-center gap-6 relative z-10">
                  <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center text-brand-green font-black text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xl font-display font-black text-brand-dark uppercase tracking-tighter">{t.name}</div>
                    <div className="text-[10px] text-gray-400 uppercase font-black tracking-[0.3em] mt-1">Chegou ao Porto em {t.arrival}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section className="py-40 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-brand-green font-black uppercase tracking-[0.3em] text-[10px]">
                <Instagram size={14} /> Nossa Comunidade em Ação
              </div>
              <h2 className="text-6xl md:text-8xl font-display font-black text-brand-dark tracking-tighter uppercase leading-[0.9]">Momentos <br /><span className="text-brand-green">Inesquecíveis</span></h2>
            </div>
            <a 
              href={BRAND.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 bg-brand-navy text-white px-10 py-5 rounded-full font-display font-black text-sm uppercase tracking-widest hover:bg-brand-green transition-all duration-500"
            >
              SEGUIR NO INSTAGRAM <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: "https://images.unsplash.com/photo-1539635278303-d4002c07dee3?auto=format&fit=crop&w=800&q=80", caption: "Termas Ourense — Março 2025 — 34 mochileiros" },
              { img: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80", caption: "Ponte de Lima — Fevereiro 2025 — 42 mochileiros" },
              { img: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80", caption: "Noite de Samba no Porto — Janeiro 2025" },
              { img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80", caption: "Workshop de Integração — Dezembro 2024" },
              { img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80", caption: "Jantar de Natal — 80 brasileiros reunidos" },
              { img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80", caption: "Trilha no Gerês — Outubro 2024" },
              { img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80", caption: "Passeio de Barco no Douro — Setembro 2024" },
              { img: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80", caption: "Visita a Braga — Agosto 2024" },
              { img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80", caption: "Piquenique no Palácio de Cristal" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative aspect-square rounded-[40px] overflow-hidden shadow-2xl"
              >
                <img src={item.img} alt={item.caption} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <p className="text-white text-sm font-bold leading-tight">{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* S8: CALENDAR - Technical Precision */}
      <section className="py-40 px-4 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-green via-transparent to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto space-y-24 relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 text-brand-green font-black uppercase tracking-[0.3em] text-[10px]">
              <Calendar size={14} className="fill-brand-green" /> Planejamento 2026
            </div>
            <h2 className="text-6xl md:text-[10vw] font-display font-black tracking-tighter uppercase leading-[0.8]">Agenda <br /><span className="text-brand-green">2026</span></h2>
            
            <div className="py-12 space-y-6">
              <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Próxima Excursão em:</p>
              <Countdown targetDate={getNextTripDate()} />
              {trips.length > 0 && (
                <p className="text-brand-green font-display font-black text-2xl uppercase tracking-tighter">
                  {trips[0].destino || trips[0].titulo} — {formatDate(trips[0].dataPartida)}
                </p>
              )}
            </div>
          </div>
 
          <div className="overflow-hidden rounded-[60px] border border-white/10 shadow-3xl backdrop-blur-xl bg-white/5">
            {trips.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-white/10 text-[10px] uppercase tracking-[0.4em] font-black text-white/40">
                      <th className="px-12 py-8">Data</th>
                      <th className="px-12 py-8">Destino</th>
                      <th className="px-12 py-8">Preço</th>
                      <th className="px-12 py-8">Status</th>
                      <th className="px-12 py-8 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {trips.map((item, idx) => (
                      <tr key={idx} className="border-t border-white/5 hover:bg-white/5 transition-all duration-500 group">
                        <td className="px-12 py-10 font-display font-black text-brand-green text-2xl tracking-tighter">{formatDate(item.dataPartida)}</td>
                        <td className="px-12 py-10">
                          <div className="flex items-center gap-6 group/item">
                            <div className="w-16 h-20 rounded-xl overflow-hidden shadow-2xl border border-white/10 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-500 relative">
                              <img src={item.imagemUrl || `https://picsum.photos/seed/${item.destino}/400/500`} alt={item.destino} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
                              {item.vagasDisponiveis < 10 && item.vagasDisponiveis > 0 && (
                                <div className="absolute inset-0 bg-brand-orange/80 flex items-center justify-center text-[8px] font-black uppercase text-white text-center p-1 leading-tight">
                                  Últimas Vagas!
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-3">
                                <div className="font-display font-black text-xl uppercase tracking-tighter group-hover:text-brand-green transition-colors">{item.destino || item.titulo}</div>
                                {item.vagasDisponiveis < 10 && item.vagasDisponiveis > 0 && (
                                  <span className="bg-brand-orange text-white px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest animate-pulse">
                                    Fogo!
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-4 mt-1">
                                <div className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-black">{item.tipo}</div>
                                {item.vagasDisponiveis < 10 && item.vagasDisponiveis > 0 && (
                                  <div className="text-[10px] uppercase tracking-[0.3em] text-brand-orange font-black">Apenas {item.vagasDisponiveis} vagas!</div>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-12 py-10 font-mono text-white/40 group-hover:text-white transition-colors">€{item.precoPublico}</td>
                        <td className="px-12 py-10">
                          <span className={`inline-flex items-center gap-3 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border ${
                            item.vagasDisponiveis > 0 ? 'bg-brand-green/10 text-brand-green border-brand-green/20' : 
                            'bg-white/5 text-white/20 border-white/10'
                          }`}>
                            <span className={`w-2 h-2 rounded-full animate-pulse ${
                              item.vagasDisponiveis > 0 ? 'bg-brand-green' : 
                              'bg-white/20'
                            }`}></span>
                            {item.vagasDisponiveis > 0 ? 'Vendas Abertas' : 'Esgotado'}
                          </span>
                        </td>
                        <td className="px-12 py-10 text-right">
                          <button 
                            onClick={() => handleBooking(item)}
                            disabled={item.vagasDisponiveis <= 0}
                            className="bg-white text-brand-navy px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-green hover:text-white transition-all duration-500 shadow-xl disabled:opacity-50"
                          >
                            {item.vagasDisponiveis > 0 ? 'Reservar' : 'Esgotado'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 md:p-24 text-center space-y-12">
                <div className="space-y-6">
                  <div className="text-6xl md:text-8xl">🗓️</div>
                  <h3 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter">Agenda em preparação</h3>
                  <p className="text-xl text-white/60 max-w-xl mx-auto font-medium">Deixe o seu e-mail para ser avisado primeiro sobre as próximas aventuras de 2026.</p>
                </div>
                <div className="max-w-md mx-auto">
                  <LeadCaptureForm id="agenda-lead" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* S9: WOMEN'S GROUP - Immersive */}
      <section className="py-40 px-4 bg-gradient-to-br from-brand-dark to-brand-green relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px] animate-pulse" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="order-2 lg:order-1 space-y-12 text-white">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-brand-yellow font-black uppercase tracking-[0.3em] text-[10px]">
                <Heart size={14} className="fill-brand-yellow" /> Espaço Exclusivo
              </div>
              <h2 className="text-5xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter uppercase">
                Criado por <br />mulheres, <br />para <span className="text-brand-yellow">mulheres.</span>
              </h2>
            </div>
            <p className="text-2xl text-white/80 leading-relaxed font-medium">
              Camila chegou ao Porto como membro da comunidade. Hoje lidera o grupo exclusivo de mulheres dos Mochileiros — um espaço de segurança, conexão e experiências pensadas especificamente para quem sabe que viajar em grupo muda de tom quando o grupo te entende de verdade.
            </p>
            <motion.a 
              href={BRAND.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-4 bg-brand-yellow text-brand-navy px-12 py-6 rounded-full font-display font-black text-sm uppercase tracking-widest shadow-3xl shadow-brand-yellow/20 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                QUERO CONHECER O GRUPO <MessageCircle size={20} />
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.a>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 relative"
          >
            <div className="absolute -inset-8 bg-white/10 rounded-[80px] -rotate-6" />
            <img 
              src="https://picsum.photos/seed/camila-porto-2/1000/1000" 
              alt="Camila" 
              className="relative rounded-[60px] shadow-3xl border-8 border-white/10 grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* S10: LEAD CAPTURE */}
      <section className="py-40 px-4 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <LeadCaptureForm id="formulario" />
        </div>
      </section>

      {/* S11: BLOG SECTION */}
      <section className="py-40 px-4 bg-brand-gray overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-brand-green font-black uppercase tracking-[0.3em] text-[10px]">
                <Newspaper size={14} /> Dicas e Histórias da Comunidade
              </div>
              <h2 className="text-6xl md:text-8xl font-display font-black text-brand-dark tracking-tighter uppercase leading-[0.9]">Porto <br /><span className="text-brand-green">Insights</span></h2>
            </div>
            <Link to="/noticias" className="group inline-flex items-center gap-4 bg-brand-navy text-white px-10 py-5 rounded-full font-display font-black text-sm uppercase tracking-widest hover:bg-brand-green transition-all duration-500">
              VER TODOS OS ARTIGOS <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "5 Coisas que eu gostaria de saber antes de morar no Porto",
                date: "10 Abr, 2026",
                summary: "De transportes públicos a como lidar com a burocracia inicial, aqui estão as dicas de ouro.",
                img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Onde encontrar a melhor Francesinha (segundo os locais)",
                date: "05 Abr, 2026",
                summary: "Fugimos dos pontos turísticos para encontrar o verdadeiro sabor do Porto.",
                img: "https://images.unsplash.com/photo-1562607311-482963138867?auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Guia de Sobrevivência: O primeiro mês em Portugal",
                date: "28 Mar, 2026",
                summary: "Checklist completo de documentos e passos essenciais para quem acabou de aterrar.",
                img: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80"
              }
            ].map((post, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[40px] overflow-hidden shadow-xl border border-gray-100 flex flex-col"
              >
                <div className="h-64 overflow-hidden">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-10 space-y-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="text-[10px] font-black uppercase tracking-widest text-brand-green">{post.date}</div>
                    <h3 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tighter leading-tight">{post.title}</h3>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed">{post.summary}</p>
                  </div>
                  <Link to="/noticias" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-dark hover:text-brand-green transition-colors pt-6">
                    Ler mais <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
