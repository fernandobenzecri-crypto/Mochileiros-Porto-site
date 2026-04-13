import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, Crown, ArrowRight, Sparkles } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function VipSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [plan, setPlan] = useState<string>("");
  const { refreshProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const verifySession = async () => {
      if (!sessionId) {
        setStatus("error");
        return;
      }

      try {
        const response = await fetch("/api/checkout/verify-vip", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const data = await response.json();
        if (response.ok) {
          await refreshProfile();
          setPlan(data.plan || "");
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Erro ao verificar sessão VIP:", error);
        setStatus("error");
      }
    };

    verifySession();
  }, [sessionId, refreshProfile]);

  const isEmbaixador = plan?.toLowerCase().includes("embaixador");

  return (
    <div className="min-h-screen bg-brand-gray pt-32 pb-20 px-4 flex items-center justify-center">
      <Helmet>
        <title>Bem-vindo ao Clube VIP! | Mochileiros Porto</title>
      </Helmet>

      <div className="max-w-2xl w-full">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 md:p-20 rounded-[80px] shadow-3xl shadow-brand-green/10 text-center space-y-10 border border-brand-green/20 relative overflow-hidden"
        >
          {status === "loading" ? (
            <div className="space-y-8 py-10">
              <div className="w-20 h-20 border-4 border-brand-green border-t-transparent rounded-full animate-spin mx-auto" />
              <h2 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight">Confirmando sua assinatura...</h2>
            </div>
          ) : status === "success" ? (
            <>
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-green/5 rounded-bl-[80px]" />
              <div className="w-28 h-28 bg-brand-green text-white rounded-[40px] flex items-center justify-center mx-auto shadow-2xl relative">
                <Crown size={56} />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 -right-2 text-brand-yellow"
                >
                  <Sparkles size={32} />
                </motion.div>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-display font-black text-brand-dark uppercase tracking-tighter leading-none">
                  {isEmbaixador ? "Bem-vindo ao círculo" : "Você agora é"} <br />
                  <span className="text-brand-green text-7xl">{isEmbaixador ? "Embaixador!" : "VIP!"}</span>
                </h1>
                <p className="text-gray-500 text-xl font-medium leading-relaxed max-w-md mx-auto">
                  {isEmbaixador 
                    ? "Nos próximos minutos receberás um e-mail com tua Carta de Membro e o convite para o grupo exclusivo."
                    : "Parabéns! Você acaba de desbloquear o acesso total à nossa comunidade. Seus benefícios e mochis extras já estão disponíveis."
                  }
                </p>
              </div>

              {isEmbaixador ? (
                <div className="space-y-6 text-left bg-brand-gray p-10 rounded-[40px] border border-brand-green/10">
                  <h3 className="text-xl font-display font-black text-brand-dark uppercase tracking-tight">O que acontece agora:</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-brand-green text-white rounded-lg flex items-center justify-center shrink-0 font-black">1</div>
                      <p className="text-sm font-bold text-gray-600">📧 E-mail de boas-vindas com tua Carta de Membro</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-brand-green text-white rounded-lg flex items-center justify-center shrink-0 font-black">2</div>
                      <p className="text-sm font-bold text-gray-600">📱 Convite para o grupo WhatsApp Embaixadores</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-brand-green text-white rounded-lg flex items-center justify-center shrink-0 font-black">3</div>
                      <p className="text-sm font-bold text-gray-600">📅 Link para agendar tua primeira sessão de assessoria</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="p-6 bg-brand-gray rounded-3xl text-left space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-brand-green">+500 Mochis</div>
                    <div className="text-sm font-bold text-brand-dark">Bônus de Boas-vindas creditado!</div>
                  </div>
                  <div className="p-6 bg-brand-gray rounded-3xl text-left space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-brand-green">Acesso Total</div>
                    <div className="text-sm font-bold text-brand-dark">Agenda e descontos liberados.</div>
                  </div>
                </div>
              )}

              <Link 
                to="/membro"
                className="group relative w-full h-24 bg-brand-dark text-white font-display font-black text-xl uppercase tracking-[0.2em] rounded-full shadow-3xl shadow-brand-dark/30 hover:bg-brand-green transition-all flex items-center justify-center gap-4"
              >
                IR PARA MEU PAINEL <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </>
          ) : (
            <div className="space-y-8 py-10">
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={40} className="rotate-45" />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-display font-black text-brand-dark uppercase tracking-tight">Ops! Algo deu errado.</h2>
                <p className="text-gray-500 font-medium">Não conseguimos confirmar sua assinatura. Se o pagamento foi concluído, entre em contato conosco.</p>
              </div>
              <Link to="/clube-vip" className="text-brand-green font-black uppercase tracking-widest text-xs hover:underline">Tentar novamente</Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
