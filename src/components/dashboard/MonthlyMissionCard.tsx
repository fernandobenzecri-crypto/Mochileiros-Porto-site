import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Target, Clock, Coins, Copy, Check } from "lucide-react";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { toast } from "react-hot-toast";

interface MonthlyMission {
  title: string;
  description: string;
  mochisBonus: number;
  endDate: any;
  active: boolean;
}

export default function MonthlyMissionCard({ referralCode }: { referralCode?: string }) {
  const [mission, setMission] = useState<MonthlyMission | null>(null);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "monthly_mission"), (docSnap) => {
      if (docSnap.exists()) {
        setMission(docSnap.data() as MonthlyMission);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!mission?.endDate) return;

    const timer = setInterval(() => {
      const end = mission.endDate.toDate ? mission.endDate.toDate() : new Date(mission.endDate);
      const now = new Date();
      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Encerrada");
        clearInterval(timer);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        setTimeLeft(`Encerra em ${days} dias`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [mission]);

  const handleParticipate = () => {
    const link = `${window.location.origin}/cadastro?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Link de indicação copiado! Compartilhe para completar a missão.");
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mission || !mission.active) return null;

  const currentMonth = new Date().toLocaleString('pt-BR', { month: 'long' });
  const capitalizedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-10 rounded-[50px] shadow-xl border-2 border-brand-green/20 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
        <Target size={120} className="text-brand-green" />
      </div>

      <div className="relative z-10 space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-green text-white rounded-2xl flex items-center justify-center shadow-lg shadow-brand-green/20">
            <Target size={24} />
          </div>
          <h3 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight">
            Missão de {capitalizedMonth}
          </h3>
        </div>

        <div className="space-y-4">
          <h4 className="text-xl font-bold text-brand-dark">{mission.title}</h4>
          <p className="text-gray-500 font-medium leading-relaxed max-w-2xl">
            {mission.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-3 px-5 py-3 bg-brand-gray rounded-2xl border border-gray-100">
            <Coins size={20} className="text-brand-green" />
            <span className="text-sm font-black text-brand-dark uppercase tracking-widest">+{mission.mochisBonus} Mochis</span>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 bg-brand-gray rounded-2xl border border-gray-100">
            <Clock size={20} className="text-gray-400" />
            <span className="text-sm font-bold text-gray-500">{timeLeft}</span>
          </div>
        </div>

        <button 
          onClick={handleParticipate}
          className="group flex items-center gap-4 bg-brand-navy text-white px-10 py-5 rounded-full font-display font-black text-sm uppercase tracking-widest hover:bg-brand-green transition-all duration-500 shadow-xl"
        >
          {copied ? <Check size={20} /> : <Copy size={20} />}
          {copied ? "LINK COPIADO!" : "QUERO PARTICIPAR"}
        </button>
      </div>
    </motion.div>
  );
}
