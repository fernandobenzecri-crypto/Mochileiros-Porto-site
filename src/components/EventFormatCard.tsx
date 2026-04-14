import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface EventFormatCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
  whatsappLink: string;
}

const EventFormatCard: React.FC<EventFormatCardProps> = ({ 
  title, 
  desc, 
  icon, 
  color, 
  features, 
  whatsappLink 
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -20 }}
      className="group p-12 bg-brand-gray rounded-[60px] border border-gray-100 shadow-3xl shadow-brand-dark/5 space-y-10 transition-all duration-500 hover:bg-white hover:shadow-brand-orange/10"
    >
      <div className={`w-24 h-24 ${color} text-white rounded-[32px] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
        {icon}
      </div>
      <div className="space-y-6">
        <h3 className="text-4xl font-display font-black text-brand-dark leading-none uppercase tracking-tighter">{title}</h3>
        <p className="text-gray-500 text-lg leading-relaxed font-medium">{desc}</p>
      </div>
      <div className="space-y-4 pt-6">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-brand-dark/40 group-hover:text-brand-dark transition-colors">
            <div className={`w-2 h-2 rounded-full ${color}`} /> {f}
          </div>
        ))}
      </div>
      <div className="pt-8">
        <a 
          href={whatsappLink}
          className="flex items-center gap-3 text-brand-orange font-black text-sm uppercase tracking-[0.3em] group/link"
        >
          Saber Mais <ArrowRight size={18} className="group-hover/link:translate-x-2 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
};

export default React.memo(EventFormatCard);
