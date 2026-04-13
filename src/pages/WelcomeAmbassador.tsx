import { motion } from "motion/react";
import { CheckCircle2, Mail, Gift, ArrowRight, Crown, MessageSquare, Calendar, Award, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WelcomeAmbassador() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center p-4 py-20">
      <div className="max-w-2xl w-full space-y-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[60px] p-12 shadow-3xl text-center space-y-8 relative overflow-hidden"
        >
          {/* Decorative Background Element */}
          <div className="absolute top-0 left-0 w-full h-2 bg-brand-yellow" />
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-24 bg-brand-yellow/10 rounded-full flex items-center justify-center mx-auto"
          >
            <Crown size={48} className="text-brand-yellow" />
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-display font-black text-brand-dark uppercase tracking-tighter leading-none">
              🏅 Bem-vindo ao Círculo <br />
              <span className="text-brand-yellow">Embaixador Mochileiros Porto</span>
            </h1>
            <p className="text-gray-500 font-bold text-lg">
              Você acaba de fazer parte de algo especial.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 text-left">
            {/* Next Steps */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-brand-gray p-8 rounded-3xl space-y-6 border border-gray-100"
            >
              <div className="flex items-center gap-3 text-brand-dark font-black uppercase tracking-widest text-xs">
                <Mail className="text-brand-yellow" size={20} />
                📧 Em até 5 minutos receberás no e-mail:
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <ArrowRight size={16} className="text-brand-yellow mt-1 shrink-0" />
                  <p className="text-sm font-bold text-brand-dark/70">Tua Carta de Membro Oficial assinada pelo Fernando</p>
                </div>
                <div className="flex items-start gap-3">
                  <MessageSquare size={16} className="text-brand-yellow mt-1 shrink-0" />
                  <p className="text-sm font-bold text-brand-dark/70">Convite para o grupo WhatsApp Embaixadores</p>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar size={16} className="text-brand-yellow mt-1 shrink-0" />
                  <p className="text-sm font-bold text-brand-dark/70">Link para agendar tua primeira sessão de assessoria</p>
                </div>
              </div>
            </motion.div>

            {/* Bonuses */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-brand-yellow/5 p-8 rounded-3xl space-y-6 border border-brand-yellow/20"
            >
              <div className="flex items-center gap-3 text-brand-yellow font-black uppercase tracking-widest text-xs">
                <Gift size={20} />
                🎁 Teus bônus já foram ativados:
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Award size={18} className="text-brand-yellow shrink-0" />
                  <p className="text-sm font-bold text-brand-dark">Badge Embaixador 🏅 no teu perfil</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-brand-yellow shrink-0" />
                  <p className="text-sm font-bold text-brand-dark">+500 Mochis creditados</p>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles size={18} className="text-brand-yellow shrink-0" />
                  <p className="text-sm font-bold text-brand-dark">Acesso completo à área VIP Premium</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/membro")}
            className="w-full py-8 bg-brand-dark text-white rounded-full font-display font-black text-xs uppercase tracking-[0.3em] hover:bg-brand-yellow hover:text-brand-dark transition-all duration-500 shadow-2xl flex items-center justify-center gap-3"
          >
            Acessar meu painel agora
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
