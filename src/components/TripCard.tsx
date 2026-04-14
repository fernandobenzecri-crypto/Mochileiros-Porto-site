import React from "react";
import { motion } from "motion/react";
import { MapPin, Calendar, Clock, ArrowRight, Zap } from "lucide-react";
import SafeImage from "./SafeImage";

interface TripCardProps {
  trip: any;
  onBooking: (trip: any) => void;
  formatDate: (timestamp: any) => string;
}

const TripCard: React.FC<TripCardProps> = ({ trip, onBooking, formatDate }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white rounded-[40px] overflow-hidden shadow-2xl border border-gray-100 flex flex-col group"
    >
      <div className="relative h-72 overflow-hidden">
        <SafeImage 
          src={trip.imagemUrl || `https://picsum.photos/seed/${trip.destino}/800/600`} 
          alt={trip.destino} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-xl">
            <Calendar size={14} className="text-brand-green" />
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark">{formatDate(trip.dataPartida)}</span>
          </div>
          {trip.premium && (
            <div className="bg-brand-yellow px-4 py-2 rounded-2xl flex items-center gap-2 shadow-xl">
              <Zap size={14} className="text-brand-dark fill-brand-dark" />
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark">Premium</span>
            </div>
          )}
        </div>
        {trip.vagasDisponiveis < 10 && trip.vagasDisponiveis > 0 && (
          <div className="absolute top-6 right-6 bg-brand-orange text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl animate-pulse">
            Últimas {trip.vagasDisponiveis} Vagas!
          </div>
        )}
      </div>

      <div className="p-10 space-y-8 flex-grow flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-brand-green font-black uppercase tracking-[0.2em] text-[10px]">
            <MapPin size={12} /> {trip.tipo || "Excursão"}
          </div>
          <h3 className="text-3xl font-display font-black text-brand-dark uppercase tracking-tighter leading-none group-hover:text-brand-green transition-colors">
            {trip.destino || trip.titulo}
          </h3>
          <p className="text-gray-500 text-sm font-medium leading-relaxed line-clamp-2">
            {trip.descricao || "Uma experiência inesquecível com a tribo Mochileiros Porto."}
          </p>
          
          <div className="flex items-center gap-6 pt-2">
            <div className="flex items-center gap-2 text-gray-400">
              <Clock size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Dia Inteiro</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Fim de Semana</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-end justify-between border-t border-gray-100 pt-6">
            <div className="space-y-1">
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">A partir de</div>
              <div className="text-3xl font-display font-black text-brand-dark tracking-tighter">€{trip.precoPublico}</div>
            </div>
            <button 
              onClick={() => onBooking(trip)}
              disabled={trip.vagasDisponiveis <= 0}
              className="group/btn relative bg-brand-navy text-white px-8 py-4 rounded-full font-display font-black text-[10px] uppercase tracking-widest hover:bg-brand-green transition-all shadow-xl disabled:opacity-50 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {trip.vagasDisponiveis > 0 ? "RESERVAR" : "ESGOTADO"} <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(TripCard);
