import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Zap, Loader2 } from "lucide-react";
import SafeImage from "./SafeImage";

interface PremiumTripCardProps {
  trip: any;
  idx: number;
  loadingTripId: string | null;
  onBooking: (trip: any) => void;
  formatDate: (timestamp: any) => string;
  formatPrice: (price: number) => string;
  getVipPrice: (price: number) => string;
  isVip: boolean;
}

const PremiumTripCard: React.FC<PremiumTripCardProps> = ({ 
  trip, 
  idx, 
  loadingTripId, 
  onBooking, 
  formatDate, 
  formatPrice, 
  getVipPrice, 
  isVip 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-white rounded-[100px] overflow-hidden shadow-3xl shadow-brand-dark/10 grid grid-cols-1 lg:grid-cols-2 group ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
    >
      <div className={`relative overflow-hidden min-h-[500px] ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
        <SafeImage 
          src={trip.imagemUrl || `https://picsum.photos/seed/${trip.id}/1000/1200`} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0" 
          alt={trip.destino || trip.titulo} 
          fallbackSrc="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80"
        />
        <div className="absolute top-12 left-12 bg-brand-green text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-3xl">
          {formatDate(trip.dataPartida)}
        </div>
        <div className="absolute inset-0 bg-brand-green/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className={`p-16 md:p-24 space-y-16 flex flex-col justify-center ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <h3 className="text-6xl md:text-8xl font-display font-black text-brand-dark leading-none uppercase tracking-tighter">{trip.destino || trip.titulo}</h3>
            <div className="text-left md:text-right">
              <div className="text-6xl font-display font-black text-brand-green leading-none tracking-tighter">{formatPrice(trip.precoPublico)}</div>
              <div className="text-[10px] uppercase font-black text-gray-400 mt-3 tracking-[0.3em]">
                {trip.vagasDisponiveis > 0 ? `${trip.vagasDisponiveis} vagas` : "Esgotado"}
              </div>
            </div>
          </div>
          <div className="inline-flex items-center gap-3 bg-brand-green/10 text-brand-green px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-brand-green/20">
            <Zap size={16} className="fill-brand-green" /> Experiência Premium · Guia em Português
          </div>
        </div>

        <p className="text-gray-500 leading-relaxed text-2xl font-medium tracking-tight">
          {trip.descricao || "Uma viagem inesquecível com a família Mochileiros Porto. Tudo planejado para o seu máximo conforto e diversão."}
        </p>

        <div className="pt-10">
          <button 
            onClick={() => onBooking(trip)}
            disabled={loadingTripId === trip.id || trip.vagasDisponiveis <= 0}
            className="group/btn w-full py-10 bg-brand-dark text-white rounded-full font-display font-black text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-6 hover:bg-brand-green transition-all duration-500 shadow-3xl shadow-brand-dark/20 disabled:opacity-50"
          >
            {loadingTripId === trip.id ? (
              <Loader2 size={24} className="animate-spin" />
            ) : (
              <>{trip.vagasDisponiveis > 0 ? "RESERVAR AGORA" : "ESGOTADO"} <ArrowRight size={24} className="group-hover/btn:translate-x-2 transition-transform" /></>
            )}
          </button>
          {isVip && (
            <p className="text-center text-[10px] font-black text-brand-green uppercase tracking-widest mt-6">
              Seu preço VIP: {getVipPrice(trip.precoPublico)}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(PremiumTripCard);
