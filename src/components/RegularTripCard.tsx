import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Loader2 } from "lucide-react";
import SafeImage from "./SafeImage";

interface RegularTripCardProps {
  trip: any;
  loadingTripId: string | null;
  onBooking: (trip: any) => void;
  formatDate: (timestamp: any) => string;
  formatPrice: (price: number) => string;
  getVipPrice: (price: number) => string;
  isVip: boolean;
}

const RegularTripCard: React.FC<RegularTripCardProps> = ({ 
  trip, 
  loadingTripId, 
  onBooking, 
  formatDate, 
  formatPrice, 
  getVipPrice, 
  isVip 
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -20 }}
      className="group relative overflow-hidden rounded-[80px] shadow-3xl aspect-[4/5] bg-brand-navy"
    >
      <SafeImage 
        src={trip.imagemUrl || `https://picsum.photos/seed/${trip.id}/1000/1200`} 
        className="w-full h-full object-cover opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000 grayscale group-hover:grayscale-0" 
        alt={trip.destino || trip.titulo} 
        fallbackSrc="https://images.unsplash.com/photo-1539635278303-d4002c07dee3?auto=format&fit=crop&w=1000&q=80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/40 to-transparent opacity-90" />
      
      <div className="absolute top-10 right-10 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl">
        {formatDate(trip.dataPartida)}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-16 space-y-8">
        <div className="space-y-4">
          <div className="text-5xl group-hover:scale-125 transition-transform duration-500 origin-left">📍</div>
          <h3 className="text-4xl font-display font-black text-white leading-none uppercase tracking-tighter">{trip.destino || trip.titulo}</h3>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-white/60 text-lg leading-relaxed font-medium group-hover:text-white transition-colors">
            {trip.vagasDisponiveis > 0 ? `${trip.vagasDisponiveis} vagas restantes` : "Esgotado"}
          </p>
          <div className="text-right">
            {isVip ? (
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-white/40 line-through">{formatPrice(trip.precoPublico)}</span>
                <span className="text-2xl font-display font-black text-brand-green">{getVipPrice(trip.precoPublico)}</span>
              </div>
            ) : (
              <span className="text-2xl font-display font-black text-brand-green">{formatPrice(trip.precoPublico)}</span>
            )}
          </div>
        </div>
        <div className="pt-6">
          <button 
            onClick={() => onBooking(trip)}
            disabled={loadingTripId === trip.id || trip.vagasDisponiveis <= 0}
            className="group/btn w-full py-8 bg-brand-green text-white rounded-full font-display font-black text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-white hover:text-brand-green transition-all duration-500 shadow-2xl shadow-brand-green/20 disabled:opacity-50"
          >
            {loadingTripId === trip.id ? (
              <Loader2 size={24} className="animate-spin" />
            ) : (
              <>{trip.vagasDisponiveis > 0 ? "RESERVAR VAGA" : "ESGOTADO"} <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" /></>
            )}
          </button>
          {isVip && (
            <p className="text-center text-[8px] font-black text-brand-green uppercase tracking-widest mt-4">
              Desconto VIP de 10% aplicado
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(RegularTripCard);
