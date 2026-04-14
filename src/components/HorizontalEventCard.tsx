import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Clock, MapPin, Zap } from "lucide-react";

interface HorizontalEventCardProps {
  event: any;
  formatDate: (timestamp: any) => string;
  formatPrice: (price: any) => string;
  whatsappLink: string;
}

const HorizontalEventCard: React.FC<HorizontalEventCardProps> = ({ 
  event, 
  formatDate, 
  formatPrice, 
  whatsappLink 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-12 rounded-[60px] shadow-3xl shadow-brand-dark/5 flex flex-col md:flex-row gap-12 group hover:shadow-brand-green/10 transition-all duration-500"
    >
      <div className="w-full md:w-48 h-48 bg-brand-gray rounded-[40px] flex flex-col items-center justify-center text-center p-6 group-hover:bg-brand-green group-hover:text-white transition-all duration-500">
        <div className="text-4xl font-display font-black leading-none">{formatDate(event.data).split(' ')[0]}</div>
        <div className="text-[10px] font-black uppercase tracking-widest mt-2 opacity-60">{formatDate(event.data).split(' ').slice(1).join(' ')}</div>
        <div className="w-8 h-1 bg-brand-green group-hover:bg-white mt-4 rounded-full" />
      </div>
      <div className="flex-grow space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-navy/10 text-brand-navy rounded-full text-[8px] font-black uppercase tracking-widest">
            {event.tipo}
          </div>
          <h3 className="text-4xl font-display font-black text-brand-dark uppercase tracking-tighter leading-none">{event.titulo}</h3>
        </div>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2 text-gray-400 font-bold text-sm">
            <MapPin size={16} className="text-brand-green" /> {event.tipo === 'online' ? event.linkOnline : event.local}
          </div>
          <div className="flex items-center gap-2 text-gray-400 font-bold text-sm">
            <Zap size={16} className="text-brand-orange" /> {event.horario}
          </div>
        </div>
        <p className="text-gray-500 font-medium tracking-tight line-clamp-2">{event.descricao}</p>
        <div className="pt-4 flex items-center justify-between">
          <div className="text-2xl font-display font-black text-brand-dark">{formatPrice(event.precoPublico)}</div>
          <a 
            href={whatsappLink}
            className="px-8 py-4 bg-brand-dark text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-brand-green transition-all"
          >
            Garantir Vaga
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(HorizontalEventCard);
