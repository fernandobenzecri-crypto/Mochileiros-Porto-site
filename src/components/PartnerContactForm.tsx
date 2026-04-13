import { useState, FormEvent, ChangeEvent } from "react";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  MessageSquare, 
  CheckCircle2 
} from "lucide-react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

type FormStatus = "idle" | "loading" | "success" | "error";

export function PartnerContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  const [form, setForm] = useState({
    company: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    businessType: "",
    message: "",
  });

  const handleChange =
    (field: keyof typeof form) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");

    try {
      await addDoc(collection(db, "leads"), {
        name: `${form.contactName} (${form.company})`,
        email: form.email,
        whatsapp: form.phone,
        interest: `Parceria: ${form.businessType}`,
        message: `Site: ${form.website}\n\n${form.message}`,
        created_at: serverTimestamp(),
      });

      setStatus("success");
      setForm({
        company: "",
        contactName: "",
        email: "",
        phone: "",
        website: "",
        businessType: "",
        message: "",
      });
    } catch (err) {
      console.error("Erro ao salvar parceria no Firestore:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
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
          <h3 className="text-4xl font-display font-black text-brand-dark uppercase tracking-tighter">
            Proposta recebida! 🚀
          </h3>
          <p className="text-gray-500 text-xl font-medium leading-relaxed">
            Obrigado pelo interesse! Fernando ou Camila vão ler sua mensagem com carinho
            e responder em até 24h úteis para continuarmos essa conversa.
          </p>
        </div>
        <button 
          onClick={() => setStatus("idle")}
          className="text-brand-green font-black text-xs uppercase tracking-widest hover:underline"
        >
          Enviar outra proposta
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-brand-gray p-8 md:p-20 rounded-[80px] shadow-3xl shadow-brand-dark/5 border border-gray-100 space-y-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>
      
      <div className="text-center space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 text-brand-green font-black uppercase tracking-[0.3em] text-[10px]">
          <Building2 size={14} className="fill-brand-green" /> Formulário de Parceria
        </div>
        <h2 className="text-5xl md:text-7xl font-display font-black text-brand-dark leading-[0.8] tracking-tighter uppercase">
          Envie sua <br />
          <span className="text-brand-green">Proposta</span>
        </h2>
        <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto font-medium">
          Quanto mais detalhes você trouxer agora, mais fácil será para a gente responder com um formato
          de parceria que faça sentido para o seu negócio.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Nome da Empresa */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-black text-gray-400 ml-6">
              <Building2 size={12} /> Nome da Empresa
            </label>
            <input 
              required
              type="text" 
              value={form.company}
              onChange={handleChange("company")}
              placeholder="Ex: Clínica Odontológica Porto Sorriso"
              className="w-full h-20 px-8 bg-white border border-gray-100 rounded-full focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all font-bold text-brand-dark placeholder:text-gray-300 shadow-sm"
            />
          </div>

          {/* Nome do Contato */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-black text-gray-400 ml-6">
              <User size={12} /> Nome do Contato
            </label>
            <input 
              required
              type="text" 
              value={form.contactName}
              onChange={handleChange("contactName")}
              placeholder="Ex: João Silva"
              className="w-full h-20 px-8 bg-white border border-gray-100 rounded-full focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all font-bold text-brand-dark placeholder:text-gray-300 shadow-sm"
            />
          </div>

          {/* E-mail */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-black text-gray-400 ml-6">
              <Mail size={12} /> E-mail
            </label>
            <input 
              required
              type="email" 
              value={form.email}
              onChange={handleChange("email")}
              placeholder="Ex: contato@empresa.com"
              className="w-full h-20 px-8 bg-white border border-gray-100 rounded-full focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all font-bold text-brand-dark placeholder:text-gray-300 shadow-sm"
            />
          </div>

          {/* Telefone */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-black text-gray-400 ml-6">
              <Phone size={12} /> Telefone / WhatsApp
            </label>
            <input 
              required
              type="tel" 
              value={form.phone}
              onChange={handleChange("phone")}
              placeholder="Ex: +351 9XX XXX XXX"
              className="w-full h-20 px-8 bg-white border border-gray-100 rounded-full focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all font-bold text-brand-dark placeholder:text-gray-300 shadow-sm"
            />
          </div>

          {/* Website / Redes */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-black text-gray-400 ml-6">
              <Globe size={12} /> Site ou Instagram da sua marca
            </label>
            <input 
              required
              type="url" 
              value={form.website}
              onChange={handleChange("website")}
              placeholder="Ex: https://www.instagram.com/suaempresa"
              className="w-full h-20 px-8 bg-white border border-gray-100 rounded-full focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all font-bold text-brand-dark placeholder:text-gray-300 shadow-sm"
            />
          </div>

          {/* Tipo de Negócio */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-black text-gray-400 ml-6">
              <Building2 size={12} /> Tipo de Negócio
            </label>
            <select 
              required
              value={form.businessType}
              onChange={handleChange("businessType")}
              className="w-full h-20 px-8 bg-white border border-gray-100 rounded-full focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all font-bold text-brand-dark appearance-none shadow-sm cursor-pointer"
            >
              <option value="" disabled>Selecione uma categoria</option>
              <option value="juridico">Serviços jurídicos / contabilidade / imigração</option>
              <option value="saude">Saúde e bem-estar</option>
              <option value="gastronomia">Gastronomia e lazer</option>
              <option value="educacao">Educação e carreira</option>
              <option value="turismo">Turismo e viagens</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          {/* Mensagem/Proposta */}
          <div className="md:col-span-2 space-y-3">
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-black text-gray-400 ml-6">
              <MessageSquare size={12} /> Mensagem / Proposta
            </label>
            <textarea 
              required
              rows={4}
              value={form.message}
              onChange={handleChange("message")}
              placeholder="Conte um pouco sobre o seu negócio e como imagina essa parceria..."
              className="w-full p-8 bg-white border border-gray-100 rounded-[40px] focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all font-bold text-brand-dark placeholder:text-gray-300 shadow-sm resize-none"
            />
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
          whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
          disabled={status === "loading"}
          className="group relative w-full h-24 bg-brand-dark text-white font-display font-black text-xl uppercase tracking-[0.2em] rounded-full shadow-3xl shadow-brand-dark/30 hover:bg-brand-green transition-all disabled:opacity-50 overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center gap-4">
            {status === "loading" ? "Enviando..." : "ENVIAR MINHA PROPOSTA"} 
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-brand-green translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </motion.button>
        
        <div className="flex items-center justify-center gap-3 text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">
          <CheckCircle2 size={12} className="text-brand-green" /> Seus dados estão seguros conosco
        </div>
      </form>
    </div>
  );
}
