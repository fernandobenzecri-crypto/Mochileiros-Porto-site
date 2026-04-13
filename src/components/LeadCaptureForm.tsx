import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Mail, User, CheckCircle2 } from "lucide-react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export function LeadCaptureForm({ id }: { id?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      interest: "Guia Oficial",
      created_at: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "leads"), data);
      setStatus("success");
    } catch (error) {
      console.error("Erro ao salvar lead no Firestore:", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-16 rounded-[60px] shadow-3xl shadow-brand-green/10 text-center space-y-8 border border-brand-green/20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 rounded-bl-[60px]" />
        <div className="w-24 h-24 bg-brand-green text-white rounded-[32px] flex items-center justify-center mx-auto shadow-2xl">
          <CheckCircle2 size={48} />
        </div>
        <div className="space-y-4">
          <h3 className="text-4xl font-display font-black text-brand-dark uppercase tracking-tighter">Quase lá! 🎉</h3>
          <p className="text-gray-500 text-xl font-medium leading-relaxed">Enviamos o guia para o seu e-mail. <br />Verifique também a caixa de spam.</p>
        </div>
        <button 
          onClick={() => setStatus("idle")}
          className="text-brand-green font-black text-xs uppercase tracking-widest hover:underline"
        >
          Voltar ao formulário
        </button>
      </motion.div>
    );
  }

  return (
    <section id={id} className="scroll-mt-32">
      <div className="bg-brand-gray p-12 md:p-24 rounded-[80px] shadow-3xl shadow-brand-dark/5 border border-gray-100 text-center space-y-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
        
        <div className="space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 text-brand-green font-black uppercase tracking-[0.3em] text-[10px]">
            <Sparkles size={14} className="fill-brand-green" /> Conteúdo Gratuito
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-black text-brand-dark leading-[0.8] tracking-tighter uppercase">
            Receba o <br />
            <span className="text-brand-green">Guia Oficial</span>
          </h2>
          <p className="text-gray-500 text-xl md:text-2xl max-w-2xl mx-auto font-medium tracking-tight leading-relaxed">
            "10 Escapadas a Partir do Porto com Preço Real" <br />
            <span className="text-brand-dark font-bold">+ seja avisado primeiro sobre novas vagas</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 text-left">
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-black text-gray-400 ml-6">
                <User size={12} /> Seu nome
              </label>
              <input 
                required
                name="name"
                type="text" 
                placeholder="Ex: Fernando Benzecri"
                className="w-full h-20 px-8 bg-white border border-gray-100 rounded-full focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all font-bold text-brand-dark placeholder:text-gray-300 shadow-sm"
              />
            </div>
            <div className="space-y-3 text-left">
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-black text-gray-400 ml-6">
                <Mail size={12} /> Seu melhor e-mail
              </label>
              <input 
                required
                name="email"
                type="email" 
                placeholder="Ex: fernando@exemplo.com"
                className="w-full h-20 px-8 bg-white border border-gray-100 rounded-full focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all font-bold text-brand-dark placeholder:text-gray-300 shadow-sm"
              />
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={status === "loading"}
            className="group relative w-full h-24 bg-brand-green text-white font-display font-black text-xl uppercase tracking-[0.2em] rounded-full shadow-3xl shadow-brand-green/30 hover:bg-brand-dark transition-all disabled:opacity-50 overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-4">
              {status === "loading" ? "Enviando..." : "QUERO O GUIA GRÁTIS"} <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-brand-dark translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </motion.button>
          
          <div className="flex items-center justify-center gap-3 text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">
            <CheckCircle2 size={12} className="text-brand-green" /> Sem spam · Cancele quando quiser
          </div>
        </form>
      </div>
    </section>
  );
}
