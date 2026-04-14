import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "react-hot-toast";
import { 
  Users, 
  MessageCircle, 
  Coffee, 
  Map, 
  CheckCircle2, 
  CreditCard, 
  Sparkles, 
  Gift, 
  Shield, 
  Award, 
  Star, 
  Rocket, 
  ArrowRight, 
  ChevronRight, 
  HelpCircle, 
  Heart, 
  Trophy, 
  Target, 
  Zap, 
  Crown, 
  Package, 
  Mail, 
  Calendar, 
  Clock, 
  UserPlus, 
  MessageSquare, 
  ThumbsUp, 
  TrendingUp, 
  Gem, 
  X, 
  Check, 
  Info, 
  AlertCircle,
  Globe
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import SafeImage from "../components/SafeImage";
import { trackEvent } from "../analytics";

export default function Ambassador() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    bairro: "",
    tempoPortugal: "",
    tempoMochileiros: "",
    excursoesParticipadas: 0,
    motivo: "",
    contribuicao: "",
    horasSemanais: "",
    experiencia: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/ambassador/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
          userId: user?.uid || null
        })
      });

      if (!response.ok) throw new Error("Erro ao enviar candidatura");

      trackEvent('generate_lead', { source: 'embaixador_form' });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Ocorreu um erro ao enviar sua candidatura. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center p-4 py-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[60px] p-12 md:p-20 shadow-3xl text-center space-y-8 max-w-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-brand-green" />
          <div className="w-24 h-24 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={48} className="text-brand-green" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-display font-black text-brand-dark uppercase tracking-tighter">Candidatura Enviada!</h1>
            <p className="text-gray-500 text-xl font-medium leading-relaxed">
              Entraremos em contacto pelo WhatsApp ou e-mail em até 48 horas para agendar nossa conversa rápida.
            </p>
          </div>
          <button 
            onClick={() => navigate("/")}
            className="px-12 py-6 bg-brand-dark text-white rounded-full font-display font-black uppercase tracking-widest text-xs hover:bg-brand-green transition-all shadow-2xl"
          >
            Voltar para a Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white overflow-hidden">
      <SEOHead
        title="Seja Embaixador MP — Programa Mochileiros Porto"
        description="Contribua com a comunidade e receba plano VIP gratuito, excursões e reconhecimento. Programa de Embaixadores do Mochileiros Porto."
        url="https://mochileirosporto.com/embaixador"
      />
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 z-0">
          <SafeImage 
            src="https://picsum.photos/seed/mochileiros-group/1920/1080" 
            className="w-full h-full object-cover opacity-40" 
            alt="Mochileiros Porto Group" 
          />
          <div className="absolute inset-0 bg-brand-navy/60 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 bg-brand-green/20 text-brand-green rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-brand-green/30 backdrop-blur-xl"
          >
            <Shield size={14} className="fill-brand-green" /> Programa Exclusivo · Vagas Limitadas
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl text-white leading-[0.9] tracking-tighter font-display font-black uppercase"
          >
            Seja a pessoa que você gostaria de ter <br />
            <span className="text-brand-green italic">encontrado</span> quando chegou sozinho em Porto.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            O Programa Embaixador MP é para quem já vive a comunidade e quer ser uma referência para quem está chegando agora.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
          >
            <a 
              href="#candidatura" 
              className="w-full sm:w-auto px-12 py-8 bg-brand-green text-white rounded-full font-display font-black text-lg uppercase tracking-widest shadow-2xl shadow-brand-green/20 hover:bg-white hover:text-brand-dark transition-all duration-500 hover:scale-105 active:scale-95"
            >
              Quero ser Embaixador
            </a>
            <a 
              href="#como-funciona" 
              className="w-full sm:w-auto px-12 py-8 bg-transparent border-2 border-white/20 text-white rounded-full font-display font-black text-lg uppercase tracking-widest hover:bg-white/10 transition-all duration-500"
            >
              Como funciona?
            </a>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — O QUE É O EMBAIXADOR MP */}
      <section id="como-funciona" className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 text-brand-green font-black uppercase tracking-[0.3em] text-[10px]">
              <Info size={14} /> O que é um Embaixador MP?
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-black text-brand-dark uppercase tracking-tighter leading-none">
              Uma referência <br />
              <span className="text-brand-green">humana</span> no Porto.
            </h2>
            <div className="space-y-6 text-gray-500 text-xl leading-relaxed font-medium">
              <p>
                Todo brasileiro que vem para Porto passa por um momento de solidão, dúvida e adaptação. É difícil entender a burocracia, encontrar pessoas de confiança e sentir que você pertence a algum lugar.
              </p>
              <p>
                O Embaixador MP é o membro que decidiu ser o que ele mesmo gostaria de ter encontrado quando chegou.
              </p>
              <p>
                Ele não é funcionário. Não é vendedor. É uma referência humana dentro da comunidade — alguém que acolhe, orienta, conecta e representa os valores do Mochileiros Porto.
              </p>
            </div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-10 bg-brand-green rounded-[40px] shadow-2xl shadow-brand-green/20"
            >
              <p className="text-white text-2xl md:text-3xl font-display font-black uppercase tracking-tight leading-tight">
                "Embaixador MP não paga assinatura. Ele contribui com tempo e dedicação — e em troca, recebe benefícios reais."
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-brand-green/10 rounded-[60px] blur-3xl -rotate-6" />
            <SafeImage 
              src="https://picsum.photos/seed/ambassador-concept/800/1000" 
              className="relative z-10 w-full h-auto rounded-[60px] shadow-3xl" 
              alt="Ambassador Concept" 
            />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-yellow rounded-[40px] flex items-center justify-center shadow-2xl z-20 rotate-12">
              <Crown size={80} className="text-brand-dark" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — SUA MISSÃO NA COMUNIDADE */}
      <section className="py-32 px-4 bg-brand-gray/30">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-5xl md:text-7xl font-display font-black text-brand-dark uppercase tracking-tighter">
              Sua missão na <span className="text-brand-green">comunidade</span>
            </h2>
            <p className="text-gray-500 font-medium text-xl max-w-2xl mx-auto">
              Quatro pilares fundamentais que definem o papel de um embaixador.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users size={40} />,
                title: "Acolher quem chega",
                text: "Dá boas-vindas aos novos membros, apresenta a comunidade e mostra os primeiros passos para quem acabou de chegar.",
                color: "bg-brand-navy"
              },
              {
                icon: <MessageCircle size={40} />,
                title: "Responder dúvidas",
                text: "Orienta sobre documentos, bairros, vida prática em Porto. Alivia o Fernando e a Camila e evita que ninguém fique sem resposta.",
                color: "bg-brand-green"
              },
              {
                icon: <Coffee size={40} />,
                title: "Acompanhar de perto",
                text: "Adota 1 ou 2 recém-chegados por vez. Um café, uma chamada, uma mensagem no momento certo faz toda a diferença.",
                color: "bg-brand-orange"
              },
              {
                icon: <Map size={40} />,
                title: "Conectar oportunidades",
                text: "Indica excursões, eventos e o Clube VIP para quem tem o perfil certo. Não como vendedor — como amigo que conhece o produto.",
                color: "bg-brand-yellow"
              }
            ].map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-12 rounded-[50px] shadow-xl border border-gray-100 space-y-8 group hover:scale-105 transition-all duration-500"
              >
                <div className={`w-20 h-20 ${card.color} text-white rounded-3xl flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform`}>
                  {card.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-display font-black text-brand-dark uppercase tracking-tighter leading-none">{card.title}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed font-medium">{card.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — ROTINA SEMANAL */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-display font-black text-brand-dark uppercase tracking-tighter leading-none">
              Na prática, como é a <br />
              <span className="text-brand-green">semana</span> de um Embaixador?
            </h2>
            <div className="space-y-2">
              <p className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight">
                O Embaixador MP não precisa de horas livres.
              </p>
              <p className="text-brand-green text-xl font-black uppercase tracking-widest">
                Precisa de intenção e consistência.
              </p>
            </div>
          </div>

          <div className="bg-brand-gray/50 rounded-[60px] p-12 md:p-20 space-y-10 border border-gray-100 shadow-3xl">
            <div className="space-y-6">
              {[
                "1x por semana: dar boas-vindas a novos membros nos grupos",
                "1x por semana: acompanhar de perto 1 membro recém-chegado",
                "2x por semana: responder dúvidas no grupo ou na plataforma",
                "Sempre que fizer sentido: indicar VIP ou excursão para quem tem o perfil"
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-6"
                >
                  <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-white shadow-lg shrink-0">
                    <Check size={20} strokeWidth={4} />
                  </div>
                  <span className="text-2xl font-bold text-brand-dark tracking-tight">{item}</span>
                </motion.div>
              ))}
            </div>
            <div className="pt-10 border-t border-gray-200">
              <p className="text-gray-400 text-xl italic font-medium">
                "É uma média de 1 a 2 horas por semana. No ritmo de quem já vive Porto e quer ajudar do seu jeito."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — BENEFÍCIOS FIXOS */}
      <section className="py-32 px-4 bg-brand-navy text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <Crown size={800} className="text-white -mr-40 -mt-40" />
        </div>
        
        <div className="max-w-7xl mx-auto space-y-24 relative z-10">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-none">
              O que você recebe como <br />
              <span className="text-brand-green">Embaixador MP</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Benefícios Fixos */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 md:p-16 rounded-[60px] space-y-12"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-brand-green/20 text-brand-green rounded-full text-[10px] font-black uppercase tracking-widest">
                  Garantidos
                </div>
                <h3 className="text-4xl font-display font-black uppercase tracking-tighter">Benefícios Fixos</h3>
              </div>
              <ul className="space-y-8">
                {[
                  { icon: <CreditCard size={24} />, text: "Plano VIP Trimestral gratuito (renovado automaticamente se bater a meta)" },
                  { icon: <Award size={24} />, text: "Badge \"Embaixador MP\" no perfil e no dashboard" },
                  { icon: <Globe size={24} />, text: "Destaque na página do site como rosto da comunidade" },
                  { icon: <Shield size={24} />, text: "Acesso ao grupo exclusivo de Embaixadores" },
                  { icon: <Zap size={24} />, text: "Acesso a todos os eventos e benefícios do plano VIP Trimestral" }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-6 group">
                    <div className="w-12 h-12 bg-brand-green rounded-2xl flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="text-xl font-bold text-white/80 leading-tight pt-2">{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Por Desempenho */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 md:p-16 rounded-[60px] space-y-12"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-brand-yellow/20 text-brand-yellow rounded-full text-[10px] font-black uppercase tracking-widest">
                  Recompensas
                </div>
                <h3 className="text-4xl font-display font-black uppercase tracking-tighter">Por Desempenho</h3>
              </div>
              <div className="space-y-10">
                {[
                  { 
                    meta: "META PRATA (1.000 pts)", 
                    icon: <Trophy size={24} className="text-gray-300" />,
                    items: ["Kit bônus trimestral (brinde exclusivo)", "+300 Mochis digitais", "Carta de reconhecimento do Fernando"]
                  },
                  { 
                    meta: "META OURO (2.000 pts)", 
                    icon: <Trophy size={24} className="text-brand-yellow" />,
                    items: ["1 excursão gratuita à escolha (até €50)", "Badge \"Embaixador Ouro\" no perfil", "Destaque especial no ranking do site", "+500 Mochis digitais"]
                  },
                  { 
                    meta: "META DIAMANTE (3.500 pts)", 
                    icon: <Gem size={24} className="text-blue-400" />,
                    items: ["1 excursão premium gratuita (até €180)", "Upgrade temporário para plano Semestral grátis", "Foto e nome em destaque na Home do site", "Convite para jantar exclusivo Embaixadores", "+1.000 Mochis digitais"]
                  }
                ].map((meta, i) => (
                  <div key={i} className="space-y-4 group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        {meta.icon}
                      </div>
                      <h4 className="text-xl font-display font-black uppercase tracking-tight text-white">{meta.meta}</h4>
                    </div>
                    <ul className="pl-14 space-y-2">
                      {meta.items.map((item, j) => (
                        <li key={j} className="text-sm font-bold text-white/50 flex items-center gap-2">
                          <div className="w-1 h-1 bg-brand-green rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — SISTEMA DE PONTOS */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-display font-black text-brand-dark uppercase tracking-tighter">
              Como funcionam os <span className="text-brand-green">pontos?</span>
            </h2>
            <p className="text-gray-500 font-medium text-xl max-w-3xl mx-auto">
              Cada ação que você faz pela comunidade gera pontos. Os pontos somam ao longo do trimestre e determinam qual meta você vai atingir — e qual recompensa você vai receber.
            </p>
          </div>

          <div className="bg-brand-gray/30 rounded-[60px] overflow-hidden border border-gray-100 shadow-3xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-dark text-white text-[10px] font-black uppercase tracking-widest">
                    <th className="px-10 py-8">Ação</th>
                    <th className="px-10 py-8 text-center">Pontos</th>
                    <th className="px-10 py-8 text-right">Limite</th>
                  </tr>
                </thead>
                <tbody className="text-lg font-bold text-brand-dark">
                  {[
                    { a: "Dar boas-vindas a novo membro", p: "+20 pts", l: "1x por membro" },
                    { a: "Responder dúvida relevante no grupo", p: "+10 pts", l: "Sem limite" },
                    { a: "Acompanhar membro nos primeiros 7 dias", p: "+50 pts", l: "Por membro" },
                    { a: "Avaliação positiva de membro que ajudou", p: "+80 pts", l: "Por avaliação" },
                    { a: "Indicar membro que assina VIP Mensal", p: "+150 pts", l: "Sem limite" },
                    { a: "Indicar membro que assina VIP Trimestral", p: "+250 pts", l: "Sem limite" },
                    { a: "Indicar membro que assina VIP Semestral", p: "+400 pts", l: "Sem limite" },
                    { a: "Indicar membro que assina VIP Anual", p: "+600 pts", l: "Sem limite" },
                    { a: "Indicar membro para excursão confirmada", p: "+100 pts", l: "Por reserva" },
                    { a: "Participar como anfitrião em evento", p: "+200 pts", l: "Por evento" },
                    { a: "Atingir meta do trimestre anterior", p: "+500 pts bônus", l: "Por trimestre" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-200 hover:bg-white transition-colors">
                      <td className="px-10 py-6">{row.a}</td>
                      <td className="px-10 py-6 text-center text-brand-green">{row.p}</td>
                      <td className="px-10 py-6 text-right text-gray-400 text-sm">{row.l}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — METAS DO TRIMESTRE */}
      <section className="py-32 px-4 bg-brand-gray/30">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-display font-black text-brand-dark uppercase tracking-tighter">
              Metas <span className="text-brand-green">trimestrais</span>
            </h2>
            <p className="text-gray-500 font-medium text-xl max-w-3xl mx-auto">
              A cada 3 meses o sistema avalia seus pontos. Se você bater a Meta Básica, seu plano VIP é renovado grátis. Se bater as metas maiores, ganha ainda mais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <CheckCircle2 size={40} />,
                name: "Meta Básica",
                points: "500 pts/trimestre",
                items: ["Renova o plano VIP Trimestral grátis", "Mantém o badge Embaixador MP"],
                color: "bg-gray-100 text-brand-green",
                border: "border-brand-green/20"
              },
              {
                icon: <Trophy size={40} />,
                name: "Meta Prata",
                points: "1.000 pts/trimestre",
                items: ["Tudo da Meta Básica", "Kit bônus físico trimestral", "+300 Mochis"],
                color: "bg-gray-200 text-gray-500",
                border: "border-gray-300"
              },
              {
                icon: <Trophy size={40} />,
                name: "Meta Ouro",
                points: "2.000 pts/trimestre",
                items: ["Tudo da Meta Prata", "1 excursão gratuita (até €50)", "Badge especial Ouro no perfil"],
                color: "bg-brand-yellow/10 text-brand-yellow",
                border: "border-brand-yellow/30"
              },
              {
                icon: <Gem size={40} />,
                name: "Meta Diamante",
                points: "3.500 pts/trimestre",
                items: ["Tudo da Meta Ouro", "Excursão premium (até €180)", "Upgrade Semestral grátis", "Destaque na Home do site"],
                color: "bg-blue-50 text-blue-400",
                border: "border-blue-200"
              }
            ].map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white p-12 rounded-[60px] border-4 ${card.border} space-y-8 flex flex-col shadow-2xl`}
              >
                <div className={`w-20 h-20 ${card.color} rounded-3xl flex items-center justify-center shadow-xl`}>
                  {card.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-display font-black text-brand-dark uppercase tracking-tighter leading-none">{card.name}</h3>
                  <div className="text-brand-green font-black text-sm uppercase tracking-widest">{card.points}</div>
                </div>
                <ul className="space-y-4 flex-grow">
                  {card.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm font-bold text-gray-500">
                      <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-lg italic font-medium max-w-2xl mx-auto">
              "Se não atingir a Meta Básica no trimestre, o status de Embaixador é pausado automaticamente. Sem julgamento — a porta está sempre aberta para candidatar-se novamente quando estiver pronto."
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 8 — COMO SE TORNAR EMBAIXADOR */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-display font-black text-brand-dark uppercase tracking-tighter">
              Como funciona o <span className="text-brand-green">processo?</span>
            </h2>
          </div>

          <div className="relative">
            {/* Desktop Timeline Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-brand-gray -translate-y-1/2 z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 relative z-10">
              {[
                { step: "PASSO 1", icon: <Package size={32} />, title: "Candidatura", desc: "Preenche o formulário abaixo explicando quem és e por que queres ser Embaixador MP." },
                { step: "PASSO 2", icon: <Mail size={32} />, title: "Análise", desc: "A equipa Mochileiros Porto analisa o perfil. Retorno em até 48h." },
                { step: "PASSO 3", icon: <MessageSquare size={32} />, title: "Conversa rápida", desc: "Uma chamada de 15min com o Fernando ou a Camila para alinhar expectativas." },
                { step: "PASSO 4", icon: <CheckCircle2 size={32} />, title: "Aprovação", desc: "Plano VIP Trimestral ativado gratuitamente. Badge no perfil. Acesso ao grupo." },
                { step: "PASSO 5", icon: <Rocket size={32} />, title: "Início da Missão", desc: "Suas ações começam a contar pontos. Você é agora um rosto da comunidade." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100 text-center space-y-6 group hover:scale-105 transition-all duration-500"
                >
                  <div className="w-20 h-20 bg-brand-navy text-white rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:bg-brand-green transition-colors">
                    {item.icon}
                  </div>
                  <div className="space-y-4">
                    <div className="text-brand-green font-black text-xs tracking-[0.3em] uppercase">{item.step}</div>
                    <h3 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight leading-none">{item.title}</h3>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9 — REQUISITOS */}
      <section className="py-32 px-4 bg-brand-gray/30">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-display font-black text-brand-dark uppercase tracking-tighter">
              Quem pode se <span className="text-brand-green">candidatar?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-12 rounded-[60px] shadow-2xl border border-gray-100 space-y-8">
              <h3 className="text-2xl font-display font-black text-brand-dark uppercase tracking-widest">Requisitos ✅</h3>
              <ul className="space-y-6">
                {[
                  "Ser membro do Mochileiros Porto há mínimo 3 meses",
                  "Ter participado em pelo menos 2 eventos ou excursões",
                  "Ter disponibilidade de 1 a 2 horas por semana",
                  "Gostar genuinamente de ajudar pessoas",
                  "Representar os valores do Mochileiros Porto"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center shrink-0 mt-1">
                      <Check size={14} strokeWidth={4} />
                    </div>
                    <span className="text-lg font-bold text-brand-dark tracking-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-12 rounded-[60px] shadow-2xl border border-gray-100 space-y-8">
              <h3 className="text-2xl font-display font-black text-brand-dark uppercase tracking-widest">O que não precisa ❌</h3>
              <ul className="space-y-6">
                {[
                  "Não é necessário ter plano VIP pago atualmente",
                  "Não é necessário ter experiência formal em vendas ou suporte",
                  "Não é necessário morar em Porto há muito tempo"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-red-50 text-red-500 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <X size={14} strokeWidth={4} />
                    </div>
                    <span className="text-lg font-bold text-brand-dark/60 tracking-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10 — DEPOIMENTO DE EMBAIXADOR */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-12">
            <h2 className="text-5xl md:text-7xl font-display font-black text-brand-dark uppercase tracking-tighter">
              Quem já faz <span className="text-brand-green">parte conta:</span>
            </h2>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-brand-navy p-16 md:p-24 rounded-[80px] space-y-12 relative overflow-hidden shadow-3xl"
            >
              <div className="absolute top-0 left-0 w-full h-4 bg-brand-green" />
              <div className="relative z-10 space-y-10">
                <p className="text-3xl md:text-4xl text-white font-medium leading-relaxed italic tracking-tight">
                  "Quando cheguei ao Porto, estava perdido. Não sabia nada de NIF, NISS, nada. Uma pessoa da comunidade me ajudou — e foi tão marcante que quis ser essa pessoa para os outros. Hoje como Embaixador MP, cada mensagem que respondo me lembra por que vim parar aqui."
                </p>
                <div className="flex flex-col items-center gap-6">
                  <SafeImage 
                    src="https://i.pravatar.cc/200?u=carlos" 
                    className="w-32 h-32 rounded-full border-4 border-brand-green shadow-2xl" 
                    alt="Carlos Eduardo" 
                  />
                  <div className="text-center">
                    <div className="text-2xl font-display font-black text-white uppercase tracking-tighter">Carlos Eduardo</div>
                    <div className="text-brand-green font-black text-xs uppercase tracking-[0.3em]">São Paulo · Embaixador MP desde Jan 2025</div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-20 -bottom-20 opacity-5">
                <Crown size={400} className="text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 11 — RANKING DOS EMBAIXADORES */}
      <section className="py-32 px-4 bg-brand-gray/30">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-display font-black text-brand-dark uppercase tracking-tighter">
              Nossos Embaixadores <br />
              <span className="text-brand-green">deste trimestre</span>
            </h2>
            <p className="text-gray-500 font-medium text-xl">Estas pessoas são a alma do Mochileiros Porto.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-12 rounded-[60px] shadow-2xl border border-gray-100 text-center space-y-8 group"
              >
                <div className="relative w-32 h-32 mx-auto">
                  <div className="absolute inset-0 bg-brand-green/20 rounded-full animate-ping" />
                  <div className="relative w-full h-full bg-brand-gray rounded-full flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
                    <HelpCircle size={48} className="text-gray-300" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-display font-black text-brand-dark uppercase tracking-tighter">Será que é você?</h3>
                  <div className="inline-flex items-center gap-2 px-4 py-1 bg-brand-gray text-gray-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                    Vaga Aberta
                  </div>
                </div>
                <a 
                  href="#candidatura"
                  className="block w-full py-5 bg-brand-dark text-white rounded-full font-display font-black text-[10px] uppercase tracking-[0.3em] hover:bg-brand-green transition-all shadow-xl"
                >
                  Candidatar-se
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12 — FORMULÁRIO DE CANDIDATURA */}
      <section id="candidatura" className="py-32 px-4 bg-white">
        <div className="max-w-4xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-display font-black text-brand-dark uppercase tracking-tighter">
              Pronto para <span className="text-brand-green">fazer parte?</span>
            </h2>
            <p className="text-gray-500 font-medium text-xl">
              Preencha o formulário abaixo. Nossa equipa entra em contacto em até 48 horas.
            </p>
          </div>

          <div className="bg-brand-gray/50 rounded-[80px] p-12 md:p-20 border border-gray-100 shadow-3xl">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-6">Nome Completo *</label>
                  <input 
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Como queres ser chamado?"
                    className="w-full px-10 py-6 bg-white border-2 border-transparent focus:border-brand-green rounded-full font-bold text-brand-dark outline-none transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-6">E-mail *</label>
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="teu@email.com"
                    className="w-full px-10 py-6 bg-white border-2 border-transparent focus:border-brand-green rounded-full font-bold text-brand-dark outline-none transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-6">WhatsApp *</label>
                  <input 
                    required
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    placeholder="+351 9XX XXX XXX"
                    className="w-full px-10 py-6 bg-white border-2 border-transparent focus:border-brand-green rounded-full font-bold text-brand-dark outline-none transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-6">Bairro onde mora em Porto *</label>
                  <input 
                    required
                    type="text"
                    value={formData.bairro}
                    onChange={(e) => setFormData({...formData, bairro: e.target.value})}
                    placeholder="Ex: Cedofeita, Bonfim..."
                    className="w-full px-10 py-6 bg-white border-2 border-transparent focus:border-brand-green rounded-full font-bold text-brand-dark outline-none transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-6">Há quanto tempo está em Portugal *</label>
                  <select 
                    required
                    value={formData.tempoPortugal}
                    onChange={(e) => setFormData({...formData, tempoPortugal: e.target.value})}
                    className="w-full px-10 py-6 bg-white border-2 border-transparent focus:border-brand-green rounded-full font-bold text-brand-dark outline-none transition-all shadow-sm appearance-none"
                  >
                    <option value="">Selecionar...</option>
                    <option value="menos_3_meses">Menos de 3 meses</option>
                    <option value="3_6_meses">3–6 meses</option>
                    <option value="6_12_meses">6–12 meses</option>
                    <option value="mais_1_ano">Mais de 1 ano</option>
                    <option value="mais_2_anos">Mais de 2 anos</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-6">Há quanto tempo conhece o Mochileiros Porto *</label>
                  <select 
                    required
                    value={formData.tempoMochileiros}
                    onChange={(e) => setFormData({...formData, tempoMochileiros: e.target.value})}
                    className="w-full px-10 py-6 bg-white border-2 border-transparent focus:border-brand-green rounded-full font-bold text-brand-dark outline-none transition-all shadow-sm appearance-none"
                  >
                    <option value="">Selecionar...</option>
                    <option value="menos_1_mes">Menos de 1 mês</option>
                    <option value="1_3_meses">1–3 meses</option>
                    <option value="3_6_meses">3–6 meses</option>
                    <option value="mais_6_meses">Mais de 6 meses</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-6">Quantas excursões ou eventos participou? *</label>
                <input 
                  required
                  type="number"
                  min="0"
                  value={formData.excursoesParticipadas}
                  onChange={(e) => setFormData({...formData, excursoesParticipadas: parseInt(e.target.value)})}
                  className="w-full px-10 py-6 bg-white border-2 border-transparent focus:border-brand-green rounded-full font-bold text-brand-dark outline-none transition-all shadow-sm"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-6">Por que você quer ser Embaixador MP? * (mínimo 100 caracteres)</label>
                <textarea 
                  required
                  minLength={100}
                  value={formData.motivo}
                  onChange={(e) => setFormData({...formData, motivo: e.target.value})}
                  placeholder="Conta-nos a tua história e motivação..."
                  className="w-full px-10 py-8 bg-white border-2 border-transparent focus:border-brand-green rounded-[40px] font-bold text-brand-dark outline-none transition-all shadow-sm min-h-[200px]"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-6">Como você pretende contribuir com a comunidade? *</label>
                <textarea 
                  required
                  value={formData.contribuicao}
                  onChange={(e) => setFormData({...formData, contribuicao: e.target.value})}
                  placeholder="Quais são as tuas ideias e pontos fortes?"
                  className="w-full px-10 py-8 bg-white border-2 border-transparent focus:border-brand-green rounded-[40px] font-bold text-brand-dark outline-none transition-all shadow-sm min-h-[150px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-6">Quantas horas por semana você consegue dedicar? *</label>
                  <select 
                    required
                    value={formData.horasSemanais}
                    onChange={(e) => setFormData({...formData, horasSemanais: e.target.value})}
                    className="w-full px-10 py-6 bg-white border-2 border-transparent focus:border-brand-green rounded-full font-bold text-brand-dark outline-none transition-all shadow-sm appearance-none"
                  >
                    <option value="">Selecionar...</option>
                    <option value="menos_1h">Menos de 1h</option>
                    <option value="1_2h">1–2h</option>
                    <option value="2_3h">2–3h</option>
                    <option value="mais_3h">Mais de 3h</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-6">Tem alguma experiência ajudando outros imigrantes? (opcional)</label>
                  <input 
                    type="text"
                    value={formData.experiencia}
                    onChange={(e) => setFormData({...formData, experiencia: e.target.value})}
                    placeholder="Ex: Voluntariado, grupos..."
                    className="w-full px-10 py-6 bg-white border-2 border-transparent focus:border-brand-green rounded-full font-bold text-brand-dark outline-none transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="pt-10 space-y-8">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-8 bg-brand-green text-white rounded-full font-display font-black text-xl uppercase tracking-[0.2em] hover:bg-brand-dark transition-all duration-500 shadow-3xl shadow-brand-green/20 disabled:opacity-50 flex items-center justify-center gap-4"
                >
                  {isSubmitting ? "Enviando..." : "Enviar minha candidatura"}
                  <ArrowRight size={24} />
                </button>
                <p className="text-center text-gray-400 text-sm font-medium max-w-2xl mx-auto">
                  "Ao enviar, você concorda com os termos do Programa Embaixador MP. Não é um contrato de trabalho. Não gera vínculo empregatício. É um acordo de contribuição e reconhecimento dentro da comunidade."
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
