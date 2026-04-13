import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { 
  ShieldCheck, 
  ShieldAlert, 
  User, 
  Calendar, 
  Award, 
  ArrowLeft,
  Loader2,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { getUserProfile, UserProfile } from "../firebase";

export default function VerifyMember() {
  const { uid } = useParams<{ uid: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!uid) return;
      try {
        const userProfile = await getUserProfile(uid);
        if (userProfile) {
          setProfile(userProfile);
        } else {
          setError("Membro não encontrado.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Erro ao verificar membro.");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [uid]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-gray flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 size={48} className="text-brand-green animate-spin mx-auto" />
          <p className="text-gray-500 font-black uppercase tracking-widest text-xs">Verificando Credenciais...</p>
        </div>
      </div>
    );
  }

  const memberSince = profile?.created_at?.toDate 
    ? profile.created_at.toDate().toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' })
    : "Recentemente";

  return (
    <div className="min-h-screen bg-brand-gray pt-32 pb-20 px-4">
      <Helmet>
        <title>Verificação de Membro | Mochileiros Porto</title>
      </Helmet>

      <div className="max-w-md mx-auto">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 font-black uppercase tracking-widest text-[10px] mb-8 hover:text-brand-dark transition-colors"
        >
          <ArrowLeft size={14} /> Voltar para o Início
        </Link>

        {error || !profile ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-12 rounded-[50px] shadow-2xl text-center space-y-8 border border-red-100"
          >
            <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
              <XCircle size={48} />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-display font-black text-brand-dark uppercase tracking-tight">Membro Inválido</h1>
              <p className="text-gray-500 font-medium">{error || "Este QR Code não corresponde a um membro ativo."}</p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white p-12 rounded-[50px] shadow-2xl text-center space-y-10 border ${profile.is_vip ? 'border-brand-green/30' : 'border-gray-100'}`}
          >
            {/* Status Badge */}
            <div className="flex justify-center">
              {profile.is_vip ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center shadow-inner">
                    <CheckCircle2 size={48} />
                  </div>
                  <div className="px-6 py-2 bg-brand-green text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                    Membro VIP Ativo
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center">
                    <User size={48} />
                  </div>
                  <div className="px-6 py-2 bg-gray-200 text-gray-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                    Membro Explorador
                  </div>
                </div>
              )}
            </div>

            {/* Member Info */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h1 className="text-4xl font-display font-black text-brand-dark uppercase tracking-tight leading-none">{profile.name}</h1>
                <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">ID: {profile.uid.slice(0, 8)}...</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-brand-gray p-6 rounded-3xl space-y-2">
                  <div className="text-brand-green flex justify-center"><Calendar size={20} /></div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-gray-400">Desde</div>
                  <div className="text-xs font-bold text-brand-dark">{memberSince}</div>
                </div>
                <div className="bg-brand-gray p-6 rounded-3xl space-y-2">
                  <div className="text-brand-green flex justify-center"><Award size={20} /></div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-gray-400">Plano</div>
                  <div className="text-xs font-bold text-brand-dark uppercase">{profile.plan_type || 'Explorador'}</div>
                </div>
              </div>
            </div>

            {/* Verification Footer */}
            <div className="pt-8 border-t border-gray-50">
              <div className="flex items-center justify-center gap-2 text-gray-400 font-black uppercase tracking-widest text-[8px]">
                <ShieldCheck size={12} /> Verificado por Mochileiros Porto
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
