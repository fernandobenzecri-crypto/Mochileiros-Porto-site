/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { BRAND } from "../constants";
import { MessageSquare, Mail, MapPin, Send, Phone, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function Contact() {
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col bg-white">
      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/contact-hero-2/1920/1080" 
            className="w-full h-full object-cover" 
            alt="Contact Hero" 
            referrerPolicy="no-referrer" 
          />
          <div className="absolute inset-0 bg-brand-navy/85 backdrop-blur-[2px]" />
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green/20 text-brand-green rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-brand-green/30 backdrop-blur-md">
              <MessageSquare size={14} /> Fale Conosco
            </div>
            <h1 className="text-6xl md:text-9xl font-display font-black text-white leading-[0.8] tracking-tighter uppercase">
              ESTAMOS AQUI <br />
              <span className="text-brand-green">PARA VOCÊ</span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-3xl text-white/80 max-w-3xl mx-auto font-medium leading-relaxed">
            Dúvidas sobre viagens, eventos ou o Clube VIP? <br className="hidden md:block" />
            Nossa equipe está pronta para te ajudar em cada passo.
          </motion.p>
        </div>
      </section>

      {/* CONTACT INFO & FORM */}
      <section className="py-32 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-brand-green font-black uppercase tracking-[0.3em] text-[10px]">
                <Zap size={14} className="fill-brand-green" /> Canais Diretos
              </div>
              <h2 className="text-5xl md:text-7xl font-display font-black text-brand-dark tracking-tighter uppercase leading-none">Como nos <br /><span className="text-brand-green">encontrar</span></h2>
              <p className="text-gray-500 text-2xl font-medium leading-relaxed">A forma mais rápida de falar conosco é pelo WhatsApp, onde temos grupos dedicados para cada necessidade.</p>
            </div>

            <div className="space-y-8">
              <motion.a 
                variants={itemVariants}
                href={BRAND.whatsappLink}
                className="flex items-center gap-8 p-10 rounded-[50px] bg-brand-green/5 border border-brand-green/10 hover:bg-brand-navy hover:border-brand-navy transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/10 rounded-bl-[80px] -mr-8 -mt-8 group-hover:bg-brand-green/20 transition-all duration-500" />
                <div className="w-20 h-20 bg-brand-green rounded-3xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500 relative z-10 shadow-xl shadow-brand-green/20">
                  <Phone className="text-white" size={32} />
                </div>
                <div className="relative z-10">
                  <div className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-green mb-2 group-hover:text-brand-green/80 transition-colors">WhatsApp Grupos Temáticos</div>
                  <div className="text-3xl font-display font-black text-brand-dark group-hover:text-white transition-colors tracking-tighter">{BRAND.whatsapp}</div>
                </div>
              </motion.a>

              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-8 p-10 rounded-[50px] bg-brand-dark/5 border border-brand-dark/10 hover:bg-brand-navy hover:border-brand-navy transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-dark/10 rounded-bl-[80px] -mr-8 -mt-8 group-hover:bg-brand-dark/20 transition-all duration-500" />
                <div className="w-20 h-20 bg-brand-dark rounded-3xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500 relative z-10 shadow-xl shadow-brand-dark/20">
                  <Mail className="text-white" size={32} />
                </div>
                <div className="relative z-10">
                  <div className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-dark mb-2 group-hover:text-brand-green transition-colors">Email Geral</div>
                  <div className="text-3xl font-display font-black text-brand-dark group-hover:text-white transition-colors tracking-tighter">{BRAND.email}</div>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-8 p-10 rounded-[50px] bg-brand-gray border border-gray-100 hover:bg-brand-navy hover:border-brand-navy transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-dark/5 rounded-bl-[80px] -mr-8 -mt-8 group-hover:bg-brand-dark/10 transition-all duration-500" />
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500 relative z-10 shadow-xl shadow-brand-dark/5">
                  <MapPin className="text-brand-dark" size={32} />
                </div>
                <div className="relative z-10">
                  <div className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 mb-2 group-hover:text-brand-green transition-colors">Localização</div>
                  <div className="text-3xl font-display font-black text-brand-dark group-hover:text-white transition-colors tracking-tighter">Porto, Portugal</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-16 rounded-[80px] shadow-2xl shadow-brand-dark/5 border border-gray-100 space-y-12 relative"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-display font-black text-brand-dark uppercase tracking-tighter leading-none">Envie uma <br /><span className="text-brand-green">mensagem</span></h2>
              <p className="text-gray-500 text-lg font-medium">Preencha o formulário abaixo e responderemos em até 24h.</p>
            </div>
            
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 ml-6">Nome Completo</label>
                  <input 
                    type="text" 
                    placeholder="Seu nome" 
                    className="w-full h-20 px-10 bg-brand-gray rounded-full focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all font-medium text-lg" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 ml-6">Seu melhor Email</label>
                  <input 
                    type="email" 
                    placeholder="Seu email" 
                    className="w-full h-20 px-10 bg-brand-gray rounded-full focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all font-medium text-lg" 
                    required 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 ml-6">Assunto do Contato</label>
                <select 
                  className="w-full h-20 px-10 bg-brand-gray rounded-full focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all font-medium text-lg appearance-none cursor-pointer" 
                  required
                >
                  <option value="">Escolha um tópico</option>
                  <option value="viagens">Viagens e Excursões</option>
                  <option value="vip">Clube VIP</option>
                  <option value="parcerias">Parcerias</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 ml-6">Sua Mensagem</label>
                <textarea 
                  placeholder="Como podemos ajudar?" 
                  className="w-full h-48 p-10 bg-brand-gray rounded-[40px] focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all font-medium text-lg resize-none" 
                  required
                ></textarea>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full h-24 bg-brand-green text-white rounded-full font-display font-black text-2xl shadow-2xl shadow-brand-green/30 hover:bg-brand-dark transition-all duration-500 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-4 uppercase tracking-tighter">
                  ENVIAR MENSAGEM <Send size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-brand-dark translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </motion.button>
            </form>
            
            <div className="pt-8 border-t border-gray-100 flex items-center justify-center gap-6 opacity-40">
              <ShieldCheck size={20} />
              <p className="text-[10px] font-black uppercase tracking-widest">Seus dados estão seguros conosco</p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* MAP / LOCATION DECORATION */}
      <section className="py-32 px-4 bg-brand-gray text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-black text-brand-dark tracking-tighter uppercase leading-none">Onde a <br /><span className="text-brand-green">Mágica Acontece</span></h2>
          <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Nossa base é na cidade do Porto, mas nossa comunidade está espalhada por todo o Portugal. <br />
            Venha tomar um café conosco e planejar sua próxima aventura.
          </p>
          <div className="aspect-[21/9] bg-white rounded-[60px] shadow-2xl shadow-brand-dark/5 overflow-hidden border-8 border-white">
             <img 
               src="https://picsum.photos/seed/porto-map/1600/800" 
               className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
               alt="Porto Map" 
               referrerPolicy="no-referrer" 
             />
          </div>
        </div>
      </section>
    </div>
  );
}
