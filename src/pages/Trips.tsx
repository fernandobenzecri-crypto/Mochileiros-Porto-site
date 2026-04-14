/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Helmet } from "react-helmet-async";
import { BRAND, CALENDAR_2026, GALLERY_IMAGES } from "../constants";
import { 
  ArrowRight, 
  Plane, 
  Hotel, 
  Bus, 
  Shield, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  CheckCircle2, 
  Compass, 
  Globe, 
  Zap, 
  Sparkles,
  Loader2
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import SafeImage from "../components/SafeImage";
import RegularTripCard from "../components/RegularTripCard";
import PremiumTripCard from "../components/PremiumTripCard";
import { db, handleFirestoreError, OperationType } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

import { toast } from "react-hot-toast";

export default function Trips() {
  const { profile, user, loading } = useAuth();
  const navigate = useNavigate();
  const [loadingTripId, setLoadingTripId] = useState<string | null>(null);
  const [trips, setTrips] = useState<any[]>([]);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  useEffect(() => {
    if (loading) return;
    // Only show active trips for public users
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

  const formatPrice = (price: number) => {
    return `€${price}`;
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
    if (!user) {
      navigate("/cadastro");
      return;
    }

    setLoadingTripId(trip.id);
    try {
      const response = await fetch("/api/checkout/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripId: trip.id,
          tripName: trip.destino || trip.titulo,
          price: trip.precoPublico,
          userId: user.uid
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || "Erro ao iniciar reserva.");
      }
    } catch (error) {
      console.error("Erro no checkout:", error);
      toast.error("Erro ao processar reserva. Tente novamente.");
    } finally {
      setLoadingTripId(null);
    }
  };

  const getVipPrice = (price: number) => {
    return `€${(price * 0.9).toFixed(0)}`;
  };

  // Structured Data for Trips
  const tripsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": trips.map((trip, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": trip.destino || trip.titulo,
        "description": trip.descricao || `Excursão para ${trip.destino || trip.titulo} saindo do Porto.`,
        "image": trip.imagemUrl || `https://mochileirosporto.com/og-image.jpg`,
        "offers": {
          "@type": "Offer",
          "price": trip.precoPublico,
          "priceCurrency": "EUR",
          "availability": trip.vagasDisponiveis > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
        }
      }
    }))
  };

  return (
    <div className="flex flex-col bg-white overflow-hidden">
      <SEOHead
        title="Excursões e Viagens para Brasileiros em Porto"
        description="Excursões organizadas por e para brasileiros em Porto. Conheça Portugal e Europa com quem entende você."
        url="https://mochileirosporto.com/viagens"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(tripsSchema)}
        </script>
      </Helmet>
      {/* HERO - Immersive */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden bg-brand-navy">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 z-0 opacity-50"
        >
          <SafeImage 
            src="https://picsum.photos/seed/trips-hero-3/1920/1080" 
            className="w-full h-full object-cover" 
            alt="Trips" 
            fallbackSrc="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1920&q=80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/20 via-brand-navy/60 to-brand-navy" />
        </motion.div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-green/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-brand-green/20 text-brand-green rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-brand-green/30 backdrop-blur-xl">
              <Globe size={14} /> Agência RNAVT Licenciada em Portugal
            </div>
            <h1 className="text-[10vw] md:text-[8vw] lg:text-[10vw] text-white leading-[0.8] tracking-tighter font-display font-black uppercase">
              VIAGENS COM <br />
              <span className="text-brand-green">ALMA BRASILEIRA</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col items-center justify-center gap-12"
          >
            <p className="text-xl md:text-3xl text-white/70 max-w-4xl font-medium leading-relaxed tracking-tight">
              Aéreos + Hotel + Transfers + Seguro + Passeios. <br className="hidden md:block" />
              Tudo planejado para você só se preocupar em <span className="text-white font-black italic">viver o momento</span>.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-10">
              <a 
                href="https://icligo.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative w-full sm:w-auto bg-brand-green text-white px-16 py-8 rounded-full text-2xl font-display font-black shadow-2xl shadow-brand-green/40 hover:bg-white hover:text-brand-green transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  PLANEJAR MINHA VIAGEM <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </a>
              <a 
                href={BRAND.whatsappLink} 
                className="group text-white/40 font-black text-[10px] uppercase tracking-[0.4em] hover:text-white transition-colors flex items-center gap-4"
              >
                Falar com Especialista <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-brand-green transition-colors"><ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></div>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* REGULAR EXCURSIONS - Dynamic Cards */}
      <section className="py-40 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-brand-green font-black uppercase tracking-[0.3em] text-[10px]">
                <Compass size={14} /> Partidas do Porto
              </div>
              <h2 className="text-6xl md:text-9xl font-display font-black text-brand-dark tracking-tighter uppercase leading-[0.8]">Excursões <br /><span className="text-brand-green">Regulares</span></h2>
              <p className="text-gray-500 text-2xl max-w-xl font-medium tracking-tight">Todo fim de semana, diversão garantida e a melhor companhia brasileira.</p>
            </div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-brand-gray px-16 py-10 rounded-[60px] border border-gray-100 shadow-3xl shadow-brand-dark/5 relative overflow-hidden group"
            >
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-2">Preço Único</div>
              <div className="text-6xl font-display font-black text-brand-green tracking-tighter">
                {profile?.is_vip ? (
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-400 line-through">€30</span>
                    <span>€27 <span className="text-sm text-gray-400 font-medium tracking-normal">/pessoa</span></span>
                  </div>
                ) : (
                  <>€30 <span className="text-sm text-gray-400 font-medium tracking-normal">/pessoa</span></>
                )}
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Zap size={100} className="fill-brand-green" />
              </div>
            </motion.div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {trips.filter(trip => trip.tipo === "excursao").map((trip) => (
              <RegularTripCard
                key={trip.id}
                trip={trip}
                loadingTripId={loadingTripId}
                onBooking={handleBooking}
                formatDate={formatDate}
                formatPrice={formatPrice}
                getVipPrice={getVipPrice}
                isVip={!!profile?.is_vip}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* PREMIUM TRIPS - Immersive Sections */}
      <section className="py-40 px-4 bg-brand-gray relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-green via-transparent to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto space-y-32 relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 text-brand-orange font-black uppercase tracking-[0.3em] text-[10px]">
              <Star size={14} className="fill-brand-orange" /> Experiências de Elite
            </div>
            <h2 className="text-6xl md:text-9xl font-display font-black text-brand-dark tracking-tighter uppercase leading-[0.8]">Viagens <br /><span className="text-brand-orange">Premium</span></h2>
            <p className="text-gray-500 text-2xl max-w-3xl mx-auto font-medium tracking-tight">Experiências completas com a segurança e o conforto que você merece.</p>
          </div>
          
          <div className="space-y-32">
            {trips.filter(trip => trip.tipo === "premium").map((trip, idx) => (
              <PremiumTripCard
                key={trip.id}
                trip={trip}
                idx={idx}
                loadingTripId={loadingTripId}
                onBooking={handleBooking}
                formatDate={formatDate}
                formatPrice={formatPrice}
                getVipPrice={getVipPrice}
                isVip={!!profile?.is_vip}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES - Technical Cards */}
      <section className="py-40 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="grid grid-cols-12 gap-12">
            {[...Array(144)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-white rounded-full" />
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-20 relative z-10">
          {[
            { icon: <Plane className="text-brand-green" size={40} />, label: "Voos Otimizados", desc: "Melhores conexões e horários." },
            { icon: <Hotel className="text-brand-orange" size={40} />, label: "Hotéis Validados", desc: "Conforto e localização testados." },
            { icon: <Bus className="text-brand-yellow" size={40} />, label: "Transfers Incluídos", desc: "Porta a porta com segurança." },
            { icon: <Shield className="text-brand-green" size={40} />, label: "Seguro Schengen", desc: "Proteção total em toda a Europa." }
          ].map((s, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-10 text-center group"
            >
              <div className="w-32 h-32 bg-white/5 rounded-[48px] flex items-center justify-center mx-auto mb-12 border border-white/10 group-hover:bg-white group-hover:scale-110 transition-all duration-700 shadow-2xl">
                <div className="group-hover:scale-125 transition-transform duration-700 group-hover:text-brand-dark">{s.icon}</div>
              </div>
              <div className="space-y-4">
                <div className="text-2xl font-display font-black uppercase tracking-tighter group-hover:text-brand-green transition-colors">{s.label}</div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black group-hover:text-white/60 transition-colors">{s.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
