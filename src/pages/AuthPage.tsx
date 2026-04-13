import React, { useState } from "react";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Mail, Lock, ArrowRight, UserPlus, LogIn, MapPin, Phone, User } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { auth, createUserProfile } from "../firebase";
import SEOHead from "../components/SEOHead";
import { trackEvent } from "../analytics";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function AuthPage({ mode = "login" }: { mode?: "login" | "register" }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/membro";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      if (mode === "register") {
        const name = formData.get("name") as string;
        const originCity = formData.get("originCity") as string;
        const neighborhood = formData.get("neighborhood") as string;
        const whatsapp = formData.get("whatsapp") as string;
        const refCode = searchParams.get("ref");

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await createUserProfile(userCredential.user.uid, {
          name,
          email,
          originCity,
          neighborhood,
          whatsapp
        }, refCode);
        trackEvent('sign_up', { method: 'email', ref: refCode });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        trackEvent('login', { method: 'email' });
      }
      navigate(redirect);
    } catch (err: any) {
      console.error(err);
      setError(err.message.includes("auth/email-already-in-use") 
        ? "Este e-mail já está em uso." 
        : "Erro ao processar. Verifique seus dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-gray pt-32 pb-20 px-4 flex items-center justify-center">
      {mode === "login" ? (
        <SEOHead
          title="Entrar na Comunidade"
          description="Acesse sua conta Mochileiros Porto e conecte-se com brasileiros em Porto, Portugal."
          url="https://mochileirosporto.com/login"
        />
      ) : (
        <SEOHead
          title="Criar Conta Grátis"
          description="Junte-se a mais de 500 brasileiros em Porto. Crie sua conta gratuita no Mochileiros Porto em 2 minutos."
          url="https://mochileirosporto.com/cadastro"
        />
      )}
      <Helmet>
        <title>{mode === "login" ? "Entrar" : "Criar Conta"} | Mochileiros Porto</title>
      </Helmet>

      <div className="max-w-xl w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-[60px] shadow-3xl shadow-brand-dark/5 border border-gray-100 space-y-10"
        >
          <div className="text-center space-y-6">
            <Link to="/" className="inline-block">
              <img src="/logo.png" alt="Mochileiros Porto" className="w-24 h-24 mx-auto object-contain" referrerPolicy="no-referrer" />
            </Link>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-brand-green font-black uppercase tracking-[0.3em] text-[10px]">
                {mode === "login" ? <LogIn size={14} /> : <UserPlus size={14} />} 
                {mode === "login" ? "Bem-vindo de volta" : "Faça parte da comunidade"}
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-black text-brand-dark uppercase tracking-tighter leading-none">
                {mode === "login" ? "Entrar na" : "Criar minha"} <br />
                <span className="text-brand-green">Área VIP</span>
              </h1>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-xs font-bold text-center border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === "register" && (
              <>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-black text-gray-400 ml-6">
                    <User size={12} /> Nome Completo
                  </label>
                  <input 
                    required
                    name="name"
                    type="text" 
                    placeholder="Ex: Fernando Benzecri"
                    className="w-full h-16 px-8 bg-brand-gray/50 border border-gray-100 rounded-full focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all font-bold text-brand-dark"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-black text-gray-400 ml-6">
                      <MapPin size={12} /> Cidade no BR
                    </label>
                    <input 
                      required
                      name="originCity"
                      type="text" 
                      placeholder="Ex: Rio de Janeiro"
                      className="w-full h-16 px-8 bg-brand-gray/50 border border-gray-100 rounded-full focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all font-bold text-brand-dark"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-black text-gray-400 ml-6">
                      <MapPin size={12} /> Bairro no Porto
                    </label>
                    <input 
                      required
                      name="neighborhood"
                      type="text" 
                      placeholder="Ex: Cedofeita"
                      className="w-full h-16 px-8 bg-brand-gray/50 border border-gray-100 rounded-full focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all font-bold text-brand-dark"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-black text-gray-400 ml-6">
                    <Phone size={12} /> WhatsApp
                  </label>
                  <input 
                    required
                    name="whatsapp"
                    type="tel" 
                    placeholder="Ex: +351 9XX XXX XXX"
                    className="w-full h-16 px-8 bg-brand-gray/50 border border-gray-100 rounded-full focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all font-bold text-brand-dark"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-black text-gray-400 ml-6">
                <Mail size={12} /> E-mail
              </label>
              <input 
                required
                name="email"
                type="email" 
                placeholder="seu@email.com"
                className="w-full h-16 px-8 bg-brand-gray/50 border border-gray-100 rounded-full focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all font-bold text-brand-dark"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-black text-gray-400 ml-6">
                <Lock size={12} /> Senha
              </label>
              <input 
                required
                name="password"
                type="password" 
                placeholder="••••••••"
                className="w-full h-16 px-8 bg-brand-gray/50 border border-gray-100 rounded-full focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all font-bold text-brand-dark"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full h-20 bg-brand-dark text-white font-display font-black text-lg uppercase tracking-widest rounded-full shadow-xl hover:bg-brand-green transition-all disabled:opacity-50 flex items-center justify-center gap-4"
            >
              {loading ? "Processando..." : (mode === "login" ? "ENTRAR AGORA" : "CRIAR MINHA CONTA")}
              <ArrowRight size={20} />
            </motion.button>
          </form>

          <div className="text-center pt-4">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
              {mode === "login" ? "Ainda não tem conta?" : "Já tem uma conta?"} <br />
              <Link 
                to={mode === "login" ? "/cadastro" : "/login"} 
                className="text-brand-green hover:underline mt-2 inline-block"
              >
                {mode === "login" ? "Clique aqui para se cadastrar" : "Clique aqui para entrar"}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
