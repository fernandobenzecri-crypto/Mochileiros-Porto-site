/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { BRAND } from "../constants";
import { Heart, Users, Globe, Palette, Sparkles, ShieldCheck, ArrowRight, History, Compass, Zap, Target, Crown, Rocket, Star } from "lucide-react";

export default function About() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);

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
    <div className="flex flex-col bg-white overflow-hidden">
      {/* HERO - Immersive Narrative */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden bg-brand-navy">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 z-0 opacity-40"
        >
          <img 
            src="https://picsum.photos/seed/about-hero-3/1920/1080" 
            className="w-full h-full object-cover" 
            alt="About Us" 
            referrerPolicy="no-referrer" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/20 via-brand-navy/60 to-brand-navy" />
        </motion.div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-orange/20 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-brand-green/10 rounded-full blur-[140px] animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-brand-orange/20 text-brand-orange rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-brand-orange/30 backdrop-blur-xl">
              <Heart size={14} className="fill-brand-orange" /> Nossa Essência
            </div>
            <h1 className="text-[10vw] md:text-[8vw] lg:text-[10vw] text-white leading-[0.8] tracking-tighter font-display font-black uppercase">
              OUR <br />
              <span className="text-brand-orange">STORY</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col items-center justify-center gap-12"
          >
            <p className="text-xl md:text-3xl text-white/70 max-w-4xl font-medium leading-relaxed tracking-tight">
              Mais do que uma agência, somos o elo que transforma <br className="hidden md:block" />
              a solidão da imigração em <span className="text-white font-black italic">pertencimento real</span>.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-10">
              <a 
                href={BRAND.whatsappLink} 
                className="group relative w-full sm:w-auto bg-brand-orange text-white px-16 py-8 rounded-full text-2xl font-display font-black shadow-2xl shadow-brand-orange/40 hover:bg-white hover:text-brand-orange transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  FALE CONOSCO <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MANIFESTO - Immersive Text */}
      <section className="py-40 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 text-brand-orange font-black uppercase tracking-[0.3em] text-[10px]">
                <Compass size={14} className="fill-brand-orange" /> O Manifesto
              </div>
              <h2 className="text-6xl md:text-9xl font-display font-black text-brand-dark tracking-tighter uppercase leading-[0.8]">Por que <br /><span className="text-brand-orange">existimos?</span></h2>
              <p className="text-gray-500 text-2xl font-medium tracking-tight leading-relaxed">
                Chegar em um novo país é um desafio que vai além dos documentos. É sobre encontrar sua tribo, seu lugar, sua nova casa.
              </p>
            </div>
            <div className="space-y-8 text-lg text-gray-500 leading-relaxed font-medium">
              <p>
                O Mochileiros no Porto nasceu da necessidade real de conexão. Vimos milhares de brasileiros chegando com sonhos, mas enfrentando a solidão de não ter com quem compartilhar as conquistas e os desafios.
              </p>
              <p>
                Nossa missão é ser o atalho para a sua felicidade em Portugal. Através de viagens, eventos e uma comunidade vibrante, criamos o ambiente perfeito para que você não apenas sobreviva, mas floresça em sua nova jornada.
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-brand-orange/5 rounded-[100px] rotate-6" />
            <div className="relative rounded-[80px] overflow-hidden shadow-3xl shadow-brand-orange/20">
              <img src="https://picsum.photos/seed/about-manifesto-1/1000/1200" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Manifesto" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
              <div className="absolute bottom-16 left-16 right-16">
                <div className="text-white text-3xl font-display font-black uppercase tracking-tighter leading-none">"Ninguém cresce sozinho."</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VALUES - Dynamic Cards */}
      <section className="py-40 px-4 bg-brand-gray relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-32">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 text-brand-orange font-black uppercase tracking-[0.3em] text-[10px]">
              <Target size={14} className="fill-brand-orange" /> Nossos Valores
            </div>
            <h2 className="text-6xl md:text-9xl font-display font-black text-brand-dark tracking-tighter uppercase leading-[0.8]">O que nos <br /><span className="text-brand-orange">move?</span></h2>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {[
              { 
                title: "Comunidade", 
                desc: "O coletivo é nossa maior força. Juntos, somos imparáveis e resilientes.", 
                icon: <Users size={32} />, 
                color: "bg-brand-orange"
              },
              { 
                title: "Transparência", 
                desc: "Informação real, sem filtros, para que você tome as melhores decisões.", 
                icon: <ShieldCheck size={32} />, 
                color: "bg-brand-navy"
              },
              { 
                title: "Entusiasmo", 
                desc: "Celebramos cada pequena vitória como se fosse a maior de todas.", 
                icon: <Sparkles size={32} />, 
                color: "bg-brand-yellow"
              },
              { 
                title: "Inovação", 
                desc: "Buscamos constantemente novas formas de conectar e surpreender nossa tribo.", 
                icon: <Zap size={32} />, 
                color: "bg-brand-green"
              },
              { 
                title: "Impacto", 
                desc: "Queremos deixar um legado positivo na vida de cada brasileiro que cruza nosso caminho.", 
                icon: <Rocket size={32} />, 
                color: "bg-brand-orange"
              },
              { 
                title: "Excelência", 
                desc: "Entregamos o melhor em cada viagem, evento e suporte oferecido.", 
                icon: <Crown size={32} />, 
                color: "bg-brand-navy"
              }
            ].map((value, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                whileHover={{ y: -20 }}
                className="group p-12 bg-white rounded-[60px] border border-gray-100 shadow-3xl shadow-brand-dark/5 space-y-8 transition-all duration-500 hover:shadow-brand-orange/10"
              >
                <div className={`w-24 h-24 ${value.color} text-white rounded-[32px] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                  {value.icon}
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-display font-black text-brand-dark leading-none uppercase tracking-tighter">{value.title}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed font-medium">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* STATS - Immersive Numbers */}
      <section className="py-40 px-4 bg-brand-navy relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 text-center">
          {[
            { val: "5k+", label: "Membros Ativos", icon: <Users size={24} className="text-brand-orange mx-auto mb-4" /> },
            { val: "200+", label: "Viagens Realizadas", icon: <Globe size={24} className="text-brand-green mx-auto mb-4" /> },
            { val: "+6 anos", label: "De História", icon: <Star size={24} className="text-brand-yellow mx-auto mb-4" /> },
            { val: "100%", label: "Energia Brasileira", icon: <Heart size={24} className="text-brand-orange mx-auto mb-4" /> }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="space-y-4 group"
            >
              {stat.icon}
              <div className="text-7xl font-display font-black text-white tracking-tighter group-hover:text-brand-orange transition-colors duration-500">{stat.val}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL CTA - Immersive */}
      <section className="py-40 px-4 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-6xl md:text-9xl font-display font-black text-brand-dark tracking-tighter uppercase leading-[0.8]">Faça parte <br /><span className="text-brand-orange">da história</span></h2>
            <p className="text-gray-500 text-2xl max-w-3xl mx-auto font-medium tracking-tight leading-relaxed">
              Sua nova vida em Portugal começa com as conexões certas. Estamos esperando por você.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-10"
          >
            <a 
              href={BRAND.whatsappLink} 
              className="group relative w-full sm:w-auto bg-brand-dark text-white px-20 py-10 rounded-full text-3xl font-display font-black shadow-3xl shadow-brand-dark/20 hover:bg-brand-orange transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-4">
                ENTRAR PARA A TRIBO <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-brand-orange translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
