/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { LINKS, BRAND } from "../constants";
import { Instagram, Facebook, MessageCircle, Share2, ExternalLink, Sparkles, Globe, Zap } from "lucide-react";

export default function Links() {
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

  return (
    <div className="min-h-screen bg-brand-navy relative overflow-hidden flex items-center justify-center py-20 px-4">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-green/10 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[100px] -ml-48 -mb-48 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
      </div>

      <div className="max-w-md w-full space-y-12 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-white rounded-[40px] mx-auto flex items-center justify-center shadow-2xl rotate-6 hover:rotate-0 transition-transform duration-500 overflow-hidden">
              <div className="w-28 h-28 bg-brand-green rounded-[32px] flex items-center justify-center text-white font-black text-6xl shadow-inner">
                M
              </div>
            </div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-12 h-12 bg-brand-orange rounded-2xl flex items-center justify-center text-white shadow-xl"
            >
              <Sparkles size={20} />
            </motion.div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-display font-black text-white tracking-tighter uppercase">MOCHILEIROS PORTO</h1>
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-brand-green/20 text-brand-green rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-brand-green/30 backdrop-blur-md">
              <Globe size={12} /> {BRAND.tagline}
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {LINKS.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.url}
              target={link.url.startsWith('http') ? "_blank" : "_self"}
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative block w-full py-6 px-8 rounded-[30px] font-display font-black text-lg shadow-2xl transition-all duration-500 overflow-hidden ${link.color} ${'textColor' in link ? link.textColor : 'text-white'}`}
            >
              <div className="relative z-10 flex items-center justify-between">
                <span className="uppercase tracking-tighter">{link.label}</span>
                <ExternalLink size={20} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
              </div>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.a>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="pt-8 space-y-10"
        >
          <div className="flex justify-center gap-6">
            {[
              { icon: <Instagram size={24} />, url: "https://instagram.com/mochileirosporto" },
              { icon: <Facebook size={24} />, url: "https://facebook.com/mochileirosporto" },
              { icon: <MessageCircle size={24} />, url: BRAND.whatsappLink },
              { icon: <Share2 size={24} />, url: "#" }
            ].map((social, i) => (
              <motion.a 
                key={i}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ y: -5, scale: 1.1 }}
                className="w-16 h-16 bg-white/5 border border-white/10 rounded-[24px] flex items-center justify-center text-white hover:bg-brand-green hover:border-brand-green transition-all duration-500 shadow-xl"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
          
          <div className="pt-4">
            <Link to="/clube-vip" className="group relative inline-flex items-center gap-4 bg-brand-orange text-white px-12 py-6 rounded-full font-display font-black text-sm uppercase tracking-widest shadow-2xl shadow-brand-orange/40 overflow-hidden">
              <span className="relative z-10 flex items-center gap-3">
                <Zap size={18} className="fill-white" /> Entrar para o Clube VIP
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="absolute inset-0 flex items-center justify-center text-brand-orange font-black uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                FAZER PARTE AGORA
              </span>
            </Link>
          </div>

          <div className="space-y-2">
            <p className="text-white/40 text-[10px] uppercase font-black tracking-[0.4em]">© 2026 Mochileiros Porto</p>
            <div className="w-12 h-1 bg-brand-green/20 mx-auto rounded-full" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
