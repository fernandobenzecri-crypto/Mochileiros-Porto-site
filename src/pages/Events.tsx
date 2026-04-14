import { motion, useScroll, useTransform } from "motion/react";
import { Helmet } from "react-helmet-async";
import { BRAND } from "../constants";
import { ArrowRight, Calendar, MapPin, Users, Star, Camera, Music, Utensils, Zap, Sparkles, Heart, Trophy, Globe, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import SEOHead from "../components/SEOHead";
import SafeImage from "../components/SafeImage";
import HorizontalEventCard from "../components/HorizontalEventCard";
import EventFormatCard from "../components/EventFormatCard";
import { db, handleFirestoreError, OperationType } from "../firebase";
import { collection, query, orderBy, onSnapshot, doc } from "firebase/firestore";

export default function Events() {
  const { loading } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [tocaSettings, setTocaSettings] = useState<any>(null);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  useEffect(() => {
    if (loading) return;
    const q = query(
      collection(db, "eventos"), 
      orderBy("data", "asc")
    );
    const unsub = onSnapshot(q, (snap) => {
      const eventsData = snap.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter((event: any) => event.ativo !== false);
      setEvents(eventsData);
    }, (error) => handleFirestoreError(error, OperationType.LIST, "eventos"));
    return () => unsub();
  }, [loading]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Data a definir";
    const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
    return date.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' }).replace('.', '');
  };

  const formatPrice = (price: any) => {
    if (!price || price === 0 || price === "0") return "Grátis";
    return `€${price}`;
  };

  useEffect(() => {
    if (loading) return;
    const unsub = onSnapshot(doc(db, "settings", "toca_meeting"), (docSnap) => {
      if (docSnap.exists()) {
        setTocaSettings(docSnap.data());
      }
    }, (error) => handleFirestoreError(error, OperationType.GET, "settings/toca_meeting"));
    return () => unsub();
  }, []);

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

  // Structured Data for Events
  const eventsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": events.map((event, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Event",
        "name": event.titulo,
        "description": event.descricao,
        "startDate": event.data?.seconds ? new Date(event.data.seconds * 1000).toISOString() : new Date(event.data).toISOString(),
        "location": {
          "@type": "Place",
          "name": event.local || "Toca dos Mochileiros",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Porto",
            "addressCountry": "PT"
          }
        },
        "offers": {
          "@type": "Offer",
          "price": event.precoPublico || 0,
          "priceCurrency": "EUR",
          "url": BRAND.whatsappLink
        }
      }
    }))
  };

  return (
    <div className="flex flex-col bg-white overflow-hidden">
      <SEOHead
        title="Eventos da Comunidade Brasileira em Porto"
        description="Encontros, workshops e a Toca dos Mochileiros. Eventos presenciais e online para brasileiros em Porto, Portugal."
        url="https://mochileirosporto.com/eventos"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(eventsSchema)}
        </script>
      </Helmet>
      {/* HERO - Immersive */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden bg-brand-navy">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 z-0 opacity-40"
        >
          <SafeImage 
            src="https://picsum.photos/seed/events-hero-3/1920/1080" 
            className="w-full h-full object-cover" 
            alt="Events" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/20 via-brand-navy/60 to-brand-navy" />
        </motion.div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-brand-orange/20 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-brand-green/10 rounded-full blur-[140px] animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-brand-orange/20 text-brand-orange rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-brand-orange/30 backdrop-blur-xl">
              <Star size={14} className="fill-brand-orange" /> Momentos que se tornam Histórias
            </div>
            <h1 className="text-[10vw] md:text-[8vw] lg:text-[10vw] text-white leading-[0.8] tracking-tighter font-display font-black uppercase">
              EVENTOS QUE <br />
              <span className="text-brand-orange">CONECTAM</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col items-center justify-center gap-12"
          >
            <p className="text-xl md:text-3xl text-white/70 max-w-4xl font-medium leading-relaxed tracking-tight">
              De jantares temáticos a festas épicas. <br className="hidden md:block" />
              Criamos o ambiente perfeito para você <span className="text-white font-black italic">fazer novos amigos</span>.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-10">
              <a 
                href={BRAND.whatsappLink} 
                className="group relative w-full sm:w-auto bg-brand-orange text-white px-16 py-8 rounded-full text-2xl font-display font-black shadow-2xl shadow-brand-orange/40 hover:bg-white hover:text-brand-orange transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  VER PRÓXIMOS EVENTOS <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </a>
              <a 
                href="#gallery" 
                className="group text-white/40 font-black text-[10px] uppercase tracking-[0.4em] hover:text-white transition-colors flex items-center gap-4"
              >
                Explorar Galeria <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-brand-orange transition-colors"><Camera size={18} className="group-hover:scale-110 transition-transform" /></div>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AGENDA - Dynamic Events from Firestore */}
      {events.length > 0 && (
        <section className="py-40 px-4 bg-brand-gray relative overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-24">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 text-brand-green font-black uppercase tracking-[0.3em] text-[10px]">
                <Calendar size={14} /> Agenda Oficial
              </div>
              <h2 className="text-6xl md:text-9xl font-display font-black text-brand-dark tracking-tighter uppercase leading-[0.8]">Próximos <br /><span className="text-brand-green">Encontros</span></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Toca Meeting Special Card */}
              {tocaSettings && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-brand-navy p-12 rounded-[60px] shadow-3xl flex flex-col md:flex-row gap-12 group border border-brand-green/30"
                >
                  <div className="w-full md:w-48 h-48 bg-brand-green/20 rounded-[40px] flex flex-col items-center justify-center text-center p-6 text-brand-green">
                    <div className="text-4xl font-display font-black leading-none">{tocaSettings.nextDate.split(' ')[0]}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest mt-2 opacity-60">{tocaSettings.nextDate.split(' ').slice(1).join(' ')}</div>
                    <Sparkles size={24} className="mt-4" />
                  </div>
                  <div className="flex-grow space-y-6">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green/20 text-brand-green rounded-full text-[8px] font-black uppercase tracking-widest">
                        Ritual Mensal
                      </div>
                      <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter leading-tight">Encontro de Boas-Vindas</h3>
                      <p className="text-white/40 text-sm font-medium">O ritual onde os novos membros viram família na Toca.</p>
                    </div>
                    <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase tracking-widest text-white/60">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-brand-green" /> {tocaSettings.nextTime}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-brand-green" /> {tocaSettings.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-brand-green" /> Grátis p/ Membros
                      </div>
                    </div>
                    <a 
                      href={BRAND.whatsappLink}
                      className="inline-flex items-center gap-3 bg-brand-green text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-all"
                    >
                      Confirmar Presença <ArrowRight size={14} />
                    </a>
                  </div>
                </motion.div>
              )}

              {events.map((event) => (
                <HorizontalEventCard
                  key={event.id}
                  event={event}
                  formatDate={formatDate}
                  formatPrice={formatPrice}
                  whatsappLink={BRAND.whatsappLink}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EVENT TYPES - SaaS Style Cards */}
      <section className="py-40 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-32">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-brand-orange font-black uppercase tracking-[0.3em] text-[10px]">
                <Zap size={14} className="fill-brand-orange" /> Experiências RNAVT
              </div>
              <h2 className="text-6xl md:text-9xl font-display font-black text-brand-dark tracking-tighter uppercase leading-[0.8]">Nossos <br /><span className="text-brand-orange">Formatos</span></h2>
              <p className="text-gray-500 text-2xl max-w-xl font-medium tracking-tight">Cada evento é planejado para proporcionar conexões reais e memórias inesquecíveis.</p>
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
                title: "Jantares Temáticos", 
                desc: "Gastronomia e networking em ambientes selecionados com temas exclusivos.", 
                icon: <Utensils size={32} />, 
                color: "bg-brand-orange",
                features: ["Menu Exclusivo", "Networking", "Ambiente Premium"]
              },
              { 
                title: "Festas & Baladas", 
                desc: "O melhor da música brasileira e internacional com energia contagiante.", 
                icon: <Music size={32} />, 
                color: "bg-brand-green",
                features: ["DJs Brasileiros", "Open Bar (opcional)", "VIP Access"]
              },
              { 
                title: "Workshops & Talks", 
                desc: "Aprenda e conecte-se com profissionais de diversas áreas da comunidade.", 
                icon: <Users size={32} />, 
                color: "bg-brand-navy",
                features: ["Palestrantes", "Certificado", "Coffee Break"]
              },
              { 
                title: "Eventos Esportivos", 
                desc: "Torneios de beach tennis, futebol e atividades ao ar livre para todos.", 
                icon: <Trophy size={32} />, 
                color: "bg-brand-yellow",
                features: ["Competição", "Saúde", "Socialização"]
              },
              { 
                title: "Encontros de Mulheres", 
                desc: "Espaço dedicado ao empoderamento, troca de experiências e amizade feminina.", 
                icon: <Heart size={32} />, 
                color: "bg-brand-orange",
                features: ["Networking", "Suporte", "Eventos Exclusivos"]
              },
              { 
                title: "Networking Business", 
                desc: "Conecte seu negócio com outros empreendedores brasileiros em Portugal.", 
                icon: <Globe size={32} />, 
                color: "bg-brand-green",
                features: ["Pitch", "Parcerias", "Crescimento"]
              }
            ].map((type, idx) => (
              <EventFormatCard
                key={idx}
                title={type.title}
                desc={type.desc}
                icon={type.icon}
                color={type.color}
                features={type.features}
                whatsappLink={BRAND.whatsappLink}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* GALLERY - Immersive Bento Grid */}
      <section id="gallery" className="py-40 px-4 bg-brand-navy relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-orange via-transparent to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto space-y-24 relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 text-brand-orange font-black uppercase tracking-[0.3em] text-[10px]">
              <Camera size={14} className="fill-brand-orange" /> Álbum de Memórias
            </div>
            <h2 className="text-6xl md:text-9xl font-display font-black text-white tracking-tighter uppercase leading-[0.8]">Nossa <br /><span className="text-brand-orange">Vibe</span></h2>
            <p className="text-white/50 text-2xl max-w-3xl mx-auto font-medium tracking-tight">Um pouco do que já vivemos juntos. A próxima foto pode ser com você.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { span: "col-span-2 row-span-2", seed: "party-1" },
              { span: "col-span-1 row-span-1", seed: "dinner-1" },
              { span: "col-span-1 row-span-2", seed: "friends-1" },
              { span: "col-span-1 row-span-1", seed: "music-1" },
              { span: "col-span-2 row-span-1", seed: "group-1" },
              { span: "col-span-1 row-span-1", seed: "smile-1" }
            ].map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 0.98 }}
                className={`${img.span} relative overflow-hidden rounded-[60px] group cursor-pointer aspect-square md:aspect-auto`}
              >
                <SafeImage 
                  src={`https://picsum.photos/seed/${img.seed}/1200/1200`} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
                  alt="Gallery" 
                />
                <div className="absolute inset-0 bg-brand-orange/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-10 left-10 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
                    Evento #0{i + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center pt-12">
            <a 
              href={BRAND.instagramLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 text-white/40 font-black text-[10px] uppercase tracking-[0.4em] hover:text-white transition-colors group"
            >
              Ver mais no Instagram <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA - Immersive */}
      <section className="py-40 px-4 bg-brand-orange relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none">
          <Sparkles size={400} className="text-white animate-pulse" />
        </div>
        <div className="max-w-5xl mx-auto text-center space-y-16 relative z-10">
          <h2 className="text-6xl md:text-9xl font-display font-black text-white tracking-tighter uppercase leading-[0.8]">Não fique de <br /><span className="text-brand-navy">fora do próximo</span></h2>
          <p className="text-white/80 text-2xl md:text-3xl font-medium tracking-tight max-w-3xl mx-auto">
            Nossos eventos costumam esgotar em poucas horas. Entre no nosso grupo VIP para receber os convites antecipados.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
            <a 
              href={BRAND.whatsappLink}
              className="group relative w-full sm:w-auto bg-brand-navy text-white px-16 py-8 rounded-full text-2xl font-display font-black shadow-3xl shadow-brand-navy/40 hover:bg-white hover:text-brand-navy transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                ENTRAR NO GRUPO VIP <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
