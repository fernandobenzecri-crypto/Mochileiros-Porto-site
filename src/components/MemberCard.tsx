import React from "react";
import { motion } from "motion/react";

interface MemberCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}

const MemberCard: React.FC<MemberCardProps> = ({ title, desc, icon, color }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -20 }}
      className="group p-12 bg-white rounded-[60px] border border-gray-100 shadow-3xl shadow-brand-dark/5 space-y-8 transition-all duration-500 hover:shadow-brand-orange/10"
    >
      <div className={`w-24 h-24 ${color} text-white rounded-[32px] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
        {icon}
      </div>
      <div className="space-y-6">
        <h3 className="text-4xl font-display font-black text-brand-dark leading-none uppercase tracking-tighter">{title}</h3>
        <p className="text-gray-500 text-lg leading-relaxed font-medium">{desc}</p>
      </div>
    </motion.div>
  );
};

export default React.memo(MemberCard);
