import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Helmet } from "react-helmet-async";
import { 
  User, 
  Crown, 
  Calendar, 
  TrendingUp,
  Coins
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../firebase";
import MochiSection from "../components/MochiSection";
import { MOCHI_LEVELS } from "../constants";
import { toast, Toaster } from "react-hot-toast";

// Sub-components
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsGrid from "../components/dashboard/StatsGrid";
import VipCard from "../components/dashboard/VipCard";
import TocaMeetingSection from "../components/dashboard/TocaMeetingSection";
import BenefitsSection from "../components/dashboard/BenefitsSection";
import AmbassadorBanner from "../components/dashboard/AmbassadorBanner";
import MonthlyMissionCard from "../components/dashboard/MonthlyMissionCard";

export default function MemberDashboard() {
  const { user, profile, logout, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [tocaSettings, setTocaSettings] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "mochis" | "benefits">("overview");

  const currentMochis = profile?.mochis || 0;
  const currentLevel = MOCHI_LEVELS.find(l => currentMochis >= l.min && currentMochis <= l.max) || MOCHI_LEVELS[0];

  useEffect(() => {
    if (profile?.uid && user) {
      // Check daily login
      user.getIdToken().then(token => {
        fetch('/api/mochis/daily-login', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            toast.success(`🪙 +${data.mochis} Mochis! Primeiro login do dia!`, {
              duration: 5000,
              position: 'top-right',
              style: {
                background: '#1a4a2e',
                color: '#fff',
                borderRadius: '20px',
                border: '2px solid #4ade80'
              }
            });
            refreshProfile();
          }
        });
      });
    }
  }, [profile?.uid, user]);

  const stats = [
    { label: "Meus Mochis", value: profile?.mochis || 0, icon: Coins, color: "text-yellow-500", onClick: () => setActiveTab("mochis") },
    { label: "Meu Nível", value: currentLevel.name, icon: TrendingUp, color: "text-brand-green", onClick: () => setActiveTab("mochis") },
    { label: "Reservas", value: 0, icon: Calendar, color: "text-blue-500" },
  ];

  const handleManageSubscription = async () => {
    if (!profile?.uid) return;
    setLoadingPortal(true);
    try {
      const response = await fetch("/api/checkout/create-portal-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: profile.uid }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || "Erro ao abrir portal de assinatura.");
      }
    } catch (error) {
      console.error("Erro ao abrir portal:", error);
    } finally {
      setLoadingPortal(false);
    }
  };

  // Generate VIP code if missing and user is VIP
  useEffect(() => {
    async function ensureVipCode() {
      if (profile?.is_vip && !profile.codigoVip && user) {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = '';
        for (let i = 0; i < 8; i++) {
          code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        try {
          await updateDoc(doc(db, "users", user.uid), { codigoVip: code });
          await setDoc(doc(db, "vipCodes", code), { userId: user.uid, active: true });
        } catch (error) {
          console.error("Error generating VIP code:", error);
        }
      }
    }
    ensureVipCode();
  }, [profile, user]);

  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(doc(db, "settings", "toca_meeting"), (docSnap) => {
      if (docSnap.exists()) {
        setTocaSettings(docSnap.data());
      }
    }, (error) => handleFirestoreError(error, OperationType.GET, "settings/toca_meeting"));
    return () => unsub();
  }, [user]);

  return (
    <div className="min-h-screen bg-brand-gray pt-32 pb-20 px-4">
      <Toaster />
      <Helmet>
        <title>Área do Membro | Mochileiros Porto</title>
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-12">
        <DashboardHeader 
          name={profile?.name} 
          badges={profile?.badges} 
          onLogout={logout} 
        />

        <StatsGrid stats={stats} />

        {/* TABS */}
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {[
            { id: "overview", label: "Visão Geral", icon: User },
            { id: "mochis", label: "Meus Mochis", icon: Coins },
            { id: "benefits", label: "Benefícios VIP", icon: Crown },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-8 py-4 rounded-full font-display font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? "bg-brand-dark text-white shadow-xl" 
                  : "bg-white text-gray-400 hover:text-brand-dark"
              }`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {profile?.tipoMembro === 'embaixador' && (
                <AmbassadorBanner profile={profile} />
              )}

              <MonthlyMissionCard referralCode={profile?.referralCode} />

              <TocaMeetingSection tocaSettings={tocaSettings} />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 space-y-8">
                  <VipCard 
                    profile={profile} 
                    onManageSubscription={handleManageSubscription} 
                    loadingPortal={loadingPortal} 
                  />
                </div>

                <div className="lg:col-span-8 space-y-8">
                  <div className="bg-white p-10 rounded-[50px] shadow-xl border border-gray-100">
                    <h3 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight mb-6">Minhas Atividades</h3>
                    <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                      <div className="w-16 h-16 bg-brand-gray rounded-full flex items-center justify-center text-gray-300">
                        <Calendar size={32} />
                      </div>
                      <p className="text-gray-400 text-sm font-medium">Você ainda não tem viagens ou eventos reservados.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "mochis" && (
            <motion.div 
              key="mochis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <MochiSection />
            </motion.div>
          )}

          {activeTab === "benefits" && (
            <BenefitsSection profile={profile} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
