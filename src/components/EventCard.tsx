import React from "react";
import { motion } from "motion/react";
import { Calendar, Clock, MapPin, ArrowRight, Star } from "lucide-react";
import SafeImage from "./SafeImage";

interface EventCardProps {
  event: any;
  onBooking: (event: any) => void;
  formatDate: (timestamp: any) => string;
}

const EventCard: React.FC<EventCardProps> = ({ event, onBooking, formatDate }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white rounded-[40px] overflow-hidden shadow-2xl border border-gray-100 flex flex-col group"
    >
      <div className="relative h-64 overflow-hidden">
        <SafeImage 
          src={event.imagemUrl || `https://picsum.photos/seed/${event.titulo}/800/600`} 
          alt={event.titulo} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute top-6 left-6">
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-xl">
            <Calendar size={14} className="text-brand-orange" />
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark">{formatDate(event.data)}</span>
          </div>
        </div>
        {event.vagasDisponiveis < 15 && event.vagasDisponiveis > 0 && (
          <div className="absolute top-6 right-6 bg-brand-orange text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl animate-pulse">
            Últimas {event.vagasDisponiveis} Vagas!
          </div>
        )}
      </div>

      <div className="p-10 space-y-8 flex-grow flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-brand-orange font-black uppercase tracking-[0.2em] text-[10px]">
            <Star size={12} className="fill-brand-orange" /> {event.categoria || "Evento Social"}
          </div>
          <h3 className="text-3xl font-display font-black text-brand-dark uppercase tracking-tighter leading-none group-hover:text-brand-orange transition-colors">
            {event.titulo}
          </h3>
          <p className="text-gray-500 text-sm font-medium leading-relaxed line-clamp-2">
            {event.descricao || "Junta-te a nós para mais um momento épico com a tribo no Porto."}
          </p>
          
          <div className="flex items-center gap-6 pt-2">
            <div className="flex items-center gap-2 text-gray-400">
              <Clock size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">{event.horario || "20:00"}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">{event.local || "Toca dos Mochileiros"}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-end justify-between border-t border-gray-100 pt-6">
            <div className="space-y-1">
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Investimento</div>
              <div className="text-3xl font-display font-black text-brand-dark tracking-tighter">€{event.precoPublico}</div>
            </div>
            <button 
              onClick={() => onBooking(event)}
              disabled={event.vagasDisponiveis <= 0}
              className="group/btn relative bg-brand-dark text-white px-8 py-4 rounded-full font-display font-black text-[10px] uppercase tracking-widest hover:bg-brand-orange transition-all shadow-xl disabled:opacity-50 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {event.vagasDisponiveis > 0 ? "RESERVAR" : "ESGOTADO"} <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(EventCard);
