import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-hot-toast";
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  User, 
  Calendar, 
  ShieldCheck, 
  Crown,
  ArrowLeft,
  Loader2,
  Clock
} from "lucide-react";
import { 
  doc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  increment,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export default function VerifyVip() {
  const { code } = useParams();
  const { user: currentUser, profile: currentProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [member, setMember] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [usageRegistered, setUsageRegistered] = useState(false);

  useEffect(() => {
    async function verifyCode() {
      if (!code) return;
      setLoading(true);
      setError(null);

      try {
        // 1. Find userId from vipCodes
        const codeDoc = await getDoc(doc(db, "vipCodes", code));
        
        if (!codeDoc.exists() || !codeDoc.data().active) {
          setError("Código VIP inválido ou expirado.");
          setLoading(false);
          return;
        }

        const userId = codeDoc.data().userId;

        // 2. Get user profile
        const userDoc = await getDoc(doc(db, "users", userId));
        
        if (!userDoc.exists()) {
          setError("Membro não encontrado.");
          setLoading(false);
          return;
        }

        const userData = userDoc.data();
        
        if (!userData.is_vip) {
          setError("Este membro não possui um plano VIP ativo.");
          setMember(userData); // Still set member to show who it is
          setLoading(false);
          return;
        }

        setMember({ ...userData, uid: userId });
      } catch (err) {
        console.error("Error verifying code:", err);
        setError("Erro ao verificar código. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }

    verifyCode();
  }, [code]);

  const handleRegisterUsage = async () => {
    if (!member || !code || !currentUser) return;
    
    setVerifying(true);
    try {
      const now = new Date();
      const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      
      // We need to know which partner is registering
      // For now, we'll use the current user if they are an admin or have a partner role
      // In a real scenario, we'd have a partnerId in the partner's session
      const partnerId = currentUser.uid; // Mocking for now
      const partnerName = currentProfile?.name || "Parceiro Oficial";

      // 1. Register usage
      await addDoc(collection(db, "usages"), {
        userId: member.uid,
        userName: member.name,
        parceiroId: partnerId,
        parceiroNome: partnerName,
        data: now.toLocaleDateString('pt-PT'),
        hora: now.toLocaleTimeString('pt-PT'),
        descontoAplicado: member.plan_type === 'embaixador' ? "15% OFF" : "10% OFF",
        mes: monthKey,
        created_at: serverTimestamp()
      });

      // 2. Increment monthly counter for member
      const userRef = doc(db, "users", member.uid);
      await updateDoc(userRef, {
        [`utilizacoesMes.${partnerId}`]: increment(1)
      });

      setUsageRegistered(true);
    } catch (err) {
      console.error("Error registering usage:", err);
      toast.error("Erro ao registrar utilização.");
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-gray flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 size={48} className="animate-spin text-brand-green mx-auto" />
          <p className="text-gray-500 font-black uppercase tracking-widest text-xs">Verificando Código...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-gray pt-32 pb-20 px-4">
      <Helmet>
        <title>Verificação VIP | Mochileiros Porto</title>
      </Helmet>

      <div className="max-w-md mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-dark mb-8 transition-colors font-black uppercase tracking-widest text-[10px]">
          <ArrowLeft size={16} /> Voltar ao Início
        </Link>

        <AnimatePresence mode="wait">
          {error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[40px] shadow-2xl overflow-hidden border-t-8 border-red-500"
            >
              <div className="p-10 text-center space-y-6">
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
                  <XCircle size={40} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-display font-black text-brand-dark uppercase tracking-tight">Acesso Negado</h2>
                  <p className="text-gray-500 font-medium">{error}</p>
                </div>
                {member && (
                  <div className="pt-6 border-t border-gray-100">
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Membro Identificado</div>
                    <div className="font-display font-black text-xl text-brand-dark uppercase">{member.name}</div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : member && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[40px] shadow-2xl overflow-hidden border-t-8 border-brand-green"
            >
              <div className="p-10 text-center space-y-8">
                <div className="w-24 h-24 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto relative">
                  <CheckCircle2 size={48} />
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 bg-brand-green/20 rounded-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                    <ShieldCheck size={14} /> VIP ATIVO
                  </div>
                  <h2 className="text-4xl font-display font-black text-brand-dark uppercase tracking-tight pt-4">{member.name}</h2>
                  <div className="flex items-center justify-center gap-2 text-brand-green font-black uppercase tracking-widest text-xs">
                    {member.plan_type === 'embaixador' ? <Crown size={16} /> : <ShieldCheck size={16} />}
                    {member.plan_type === 'embaixador' ? 'Embaixador VIP' : 'Mochileiro VIP'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-brand-gray p-6 rounded-3xl text-center space-y-1">
                    <div className="text-[8px] font-black uppercase tracking-widest text-gray-400">Desconto</div>
                    <div className="text-xl font-display font-black text-brand-green uppercase">
                      {member.plan_type === 'embaixador' ? '15% OFF' : '10% OFF'}
                    </div>
                  </div>
                  <div className="bg-brand-gray p-6 rounded-3xl text-center space-y-1">
                    <div className="text-[8px] font-black uppercase tracking-widest text-gray-400">Usos/Mês</div>
                    <div className="text-xl font-display font-black text-brand-dark uppercase">
                      {member.utilizacoesMes?.[currentUser?.uid || ''] || 0} / 3
                    </div>
                  </div>
                </div>

                {usageRegistered ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-brand-green/10 text-brand-green rounded-3xl border border-brand-green/20 font-black uppercase tracking-widest text-xs"
                  >
                    Utilização Registrada com Sucesso!
                  </motion.div>
                ) : (
                  <button 
                    onClick={handleRegisterUsage}
                    disabled={verifying}
                    className="w-full py-6 bg-brand-navy text-white rounded-3xl font-display font-black uppercase tracking-widest text-xs hover:bg-brand-green transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {verifying ? <Loader2 size={20} className="animate-spin" /> : <CheckCircle2 size={20} />}
                    Registar Utilização
                  </button>
                )}

                <div className="pt-4 flex items-center justify-center gap-6 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} /> {new Date().toLocaleDateString('pt-PT')}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} /> {new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
