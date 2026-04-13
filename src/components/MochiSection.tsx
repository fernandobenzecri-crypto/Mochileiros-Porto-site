import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Star, 
  TrendingUp, 
  History, 
  Copy, 
  Check, 
  Share2, 
  Award,
  ChevronRight,
  Coins,
  UserPlus,
  Crown,
  MapPin,
  Handshake,
  Loader2
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { collection, query, where, orderBy, limit, onSnapshot } from "firebase/firestore";
import { MOCHI_LEVELS, MOCHI_VALUES } from "../constants";
import { toast } from "react-hot-toast";

export default function MochiSection() {
  const { profile } = useAuth();
  const [history, setHistory] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const currentMochis = profile?.mochis || 0;
  
  const currentLevel = MOCHI_LEVELS.find(l => currentMochis >= l.min && currentMochis <= l.max) || MOCHI_LEVELS[0];
  const nextLevel = MOCHI_LEVELS[MOCHI_LEVELS.indexOf(currentLevel) + 1] || null;
  
  const progress = nextLevel 
    ? ((currentMochis - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100 
    : 100;

  useEffect(() => {
    if (!profile?.uid) return;

    const q = query(
      collection(db, "mochi_history"),
      where("userId", "==", profile.uid),
      orderBy("timestamp", "desc"),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const historyData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHistory(historyData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [profile?.uid]);

  const copyReferralLink = () => {
    const link = `${window.location.origin}/cadastro?ref=${profile?.referralCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Link de indicação copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* MOCHI OVERVIEW CARD */}
      <div className="bg-white rounded-[50px] shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-10 bg-gradient-to-br from-brand-dark to-brand-navy text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-[100px] -mr-32 -mt-32" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-brand-green/20 rounded-[35px] flex items-center justify-center text-brand-green shadow-2xl rotate-3">
                <Coins size={40} />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-green">Saldo atual</div>
                <div className="flex items-baseline gap-2">
                  <motion.span 
                    key={currentMochis}
                    initial={{ scale: 1.2, color: "#4ade80" }}
                    animate={{ scale: 1, color: "#ffffff" }}
                    className="text-6xl font-display font-black leading-none"
                  >
                    {currentMochis}
                  </motion.span>
                  <span className="text-brand-green font-black text-xl">M</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-3">
              <div className={`px-6 py-2 rounded-full ${currentLevel.bg} ${currentLevel.color} text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg`}>
                <Award size={14} /> {currentLevel.name}
              </div>
              <p className="text-white/60 text-xs font-medium italic text-center md:text-right max-w-[250px]">
                "{currentLevel.phrase}"
              </p>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="mt-10 space-y-3 relative z-10">
            <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-white/40">
              <span>{currentLevel.name}</span>
              <span>{nextLevel?.name || "Lenda"}</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-brand-green rounded-full shadow-[0_0_20px_rgba(74,222,128,0.5)]"
              />
            </div>
            {nextLevel && (
              <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest text-center">
                Faltam {nextLevel.min - currentMochis} Mochis para o próximo nível
              </div>
            )}
          </div>
        </div>

        {/* ACTION BUTTON */}
        <div className="p-10 border-t border-gray-50 flex flex-col items-center gap-6">
          <button 
            onClick={copyReferralLink}
            className="w-full md:w-auto group flex items-center justify-center gap-4 px-12 py-6 bg-brand-green text-white rounded-full font-display font-black uppercase tracking-widest text-sm hover:bg-brand-dark transition-all shadow-2xl hover:scale-105 active:scale-95"
          >
            {copied ? <Check size={20} /> : <span className="text-xl">🎒</span>}
            {copied ? "LINK COPIADO!" : "Indicar amigo agora"}
          </button>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
            Ganhe +200 Mochis por cada novo cadastro
          </p>
        </div>
      </div>

      {/* HISTORY SECTION */}
      <div className="bg-white rounded-[50px] shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex justify-between items-center">
          <h3 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight flex items-center gap-3">
            <History className="text-brand-green" /> Últimas Ações
          </h3>
        </div>
        <div className="p-6 md:p-10">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-brand-green animate-spin" />
            </div>
          ) : history.length > 0 ? (
            <div className="space-y-4">
              {history.map((item, i) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-4 bg-brand-gray/30 rounded-2xl hover:bg-brand-gray/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.amount > 0 ? 'bg-brand-green/10 text-brand-green' : 'bg-red-500/10 text-red-500'}`}>
                      {item.amount > 0 ? <TrendingUp size={18} /> : <TrendingUp size={18} className="rotate-180" />}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-brand-dark">{item.description}</div>
                      <div className="text-[8px] font-black uppercase tracking-widest text-gray-400">
                        {item.timestamp?.toDate ? item.timestamp.toDate().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) : 'Recentemente'}
                      </div>
                    </div>
                  </div>
                  <div className={`text-lg font-display font-black ${item.amount > 0 ? 'text-brand-green' : 'text-red-500'}`}>
                    {item.amount > 0 ? `+${item.amount}` : item.amount}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-brand-gray rounded-full flex items-center justify-center mx-auto text-gray-300">
                <Coins size={32} />
              </div>
              <p className="text-gray-400 text-sm font-medium">Você ainda não tem transações de Mochis.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
