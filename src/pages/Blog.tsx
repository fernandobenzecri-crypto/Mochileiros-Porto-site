/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Tag, ChevronRight, Newspaper, MessageCircle, Search } from "lucide-react";

const POSTS = [
  {
    title: "Como a nova lei da AIMA afeta brasileiros no Porto em 2026?",
    category: "Guia de Imigração",
    excerpt: "Entenda as mudanças mais recentes na legislação e como elas impactam o seu processo de residência este ano. Analisamos os novos prazos e requisitos.",
    date: "08 Abr 2026",
    image: "https://picsum.photos/seed/blog1/800/600"
  },
  {
    title: "Nacionalidade Portuguesa: Novas regras para 2026",
    category: "Guia de Imigração",
    excerpt: "Um guia completo e atualizado sobre os requisitos, documentos e prazos para o seu processo de cidadania. O que mudou na contagem de tempo?",
    date: "05 Abr 2026",
    image: "https://picsum.photos/seed/blog2/800/600"
  },
  {
    title: "Primavera Sound Porto 2026: Guia de Sobrevivência",
    category: "Eventos",
    excerpt: "Tudo o que você precisa saber para aproveitar o festival: ingressos, como chegar e dicas da comunidade para não passar perrengue.",
    date: "01 Abr 2026",
    image: "https://picsum.photos/seed/blog3/800/600"
  },
];

export default function Blog() {
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
      <section className="relative py-32 px-4 bg-brand-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-green/10 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[100px] -ml-48 -mb-48 animate-pulse delay-1000" />
        
        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green/20 text-brand-green rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-brand-green/30 backdrop-blur-md">
              <Newspaper size={14} /> Jornalismo Utilitário
            </div>
            <h1 className="text-6xl md:text-9xl font-display font-black leading-[0.8] tracking-tighter uppercase">
              NOTÍCIAS E <br />
              <span className="text-brand-green">GUIAS ÚTEIS</span>
            </h1>
            <p className="text-xl md:text-3xl text-white/70 max-w-3xl font-medium leading-tight">
              O seu portal de informação essencial para a vida em Portugal. <br className="hidden md:block" />
              Feito por quem vive a realidade do imigrante.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative max-w-2xl"
          >
            <input 
              type="text" 
              placeholder="O que você está procurando?" 
              className="w-full bg-white/10 border border-white/20 rounded-full px-10 py-6 text-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all backdrop-blur-md"
            />
            <Search className="absolute right-8 top-1/2 -translate-y-1/2 text-white/40" size={24} />
          </motion.div>
        </div>
      </section>

      {/* POSTS */}
      <section className="py-32 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-display font-black text-brand-dark tracking-tighter uppercase leading-none">Últimas <br /><span className="text-brand-green">Publicações</span></h2>
              <p className="text-gray-500 text-xl font-medium">Mantenha-se atualizado com o que acontece no Porto.</p>
            </div>
            <div className="flex gap-4">
              {["Todos", "Imigração", "Eventos", "Dicas"].map((cat, i) => (
                <button key={i} className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-brand-dark text-white shadow-xl shadow-brand-dark/20' : 'bg-brand-gray text-gray-400 hover:bg-gray-200'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {POSTS.map((post, idx) => (
              <motion.article 
                key={idx} 
                variants={itemVariants}
                whileHover={{ y: -15 }}
                className="group space-y-8 bg-white rounded-[60px] p-4 pb-12 hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-brand-gray"
              >
                <div className="aspect-[4/3] bg-brand-gray rounded-[50px] overflow-hidden relative">
                  <img 
                    src={post.image} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    alt={post.title} 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-md text-brand-dark px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="px-6 space-y-6">
                  <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-black text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-brand-green" />
                      {post.date}
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <div className="flex items-center gap-2">
                      <Tag size={14} className="text-brand-orange" />
                      5 min leitura
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-display font-black text-brand-dark leading-[1.1] group-hover:text-brand-green transition-colors uppercase tracking-tighter">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-500 text-lg leading-relaxed font-medium line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <motion.button 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-3 text-brand-dark font-black text-xs uppercase tracking-widest group-hover:text-brand-green transition-colors"
                  >
                    Ler artigo completo <ArrowRight size={18} />
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </motion.div>
          
          <div className="text-center pt-12">
            <button className="bg-brand-gray text-brand-dark px-12 py-6 rounded-full text-sm font-black uppercase tracking-widest hover:bg-brand-dark hover:text-white transition-all shadow-xl shadow-brand-dark/5">
              Carregar mais artigos
            </button>
          </div>
        </div>
      </section>

      {/* FAQ SCHEMA SECTION (Rich Snippets) */}
      <section className="py-32 px-4 bg-brand-gray relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-green/5 rounded-full blur-[100px] -ml-48" />
        <div className="max-w-4xl mx-auto space-y-20 relative z-10">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 text-brand-green font-black uppercase tracking-[0.3em] text-[10px]">
              <MessageCircle size={14} className="fill-brand-green" /> Suas perguntas respondidas
            </div>
            <h2 className="text-5xl md:text-8xl font-display font-black text-brand-dark tracking-tighter uppercase leading-none">Dúvidas <br /><span className="text-brand-green">Frequentes</span></h2>
            <p className="text-gray-500 text-2xl font-medium">Informação rápida e direta para os problemas do dia a dia.</p>
          </div>
          
          <div className="space-y-8">
            {[
              { q: "Quais os documentos para o NIF?", a: "Precisa de passaporte válido e um comprovante de residência (pode ser do Brasil se tiver representante fiscal em Portugal)." },
              { q: "Quanto tempo demora o processo de nacionalidade?", a: "Atualmente os processos de netos e filhos têm levado entre 12 a 24 meses, dependendo da conservatória e da complexidade." },
              { q: "Como abrir conta bancária como imigrante?", a: "Geralmente requer NIF, passaporte e comprovante de morada. Alguns bancos digitais facilitam o processo para recém-chegados." }
            ].map((faq, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-12 rounded-[50px] shadow-xl shadow-brand-dark/5 space-y-6 group hover:bg-brand-navy transition-all duration-500"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-brand-gray rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand-green transition-colors duration-500">
                    <ChevronRight className="text-brand-dark group-hover:text-white transition-colors" size={24} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-display font-black text-brand-dark group-hover:text-white uppercase tracking-tighter transition-colors">{faq.q}</h3>
                    <p className="text-xl text-gray-500 group-hover:text-gray-400 font-medium leading-relaxed transition-colors">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* NEWSLETTER */}
      <section className="py-32 px-4 bg-white text-center">
        <div className="max-w-4xl mx-auto space-y-12 p-16 bg-brand-navy rounded-[80px] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-bl-[100px] -mr-16 -mt-16" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase leading-none">
              FIQUE POR DENTRO <br />
              <span className="text-brand-green">DE TUDO</span>
            </h2>
            <p className="text-xl text-white/60 font-medium max-w-2xl mx-auto">
              Receba as notícias mais importantes e guias exclusivos diretamente no seu e-mail. Sem spam, apenas utilidade.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-8 py-5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all"
              />
              <button className="bg-brand-green text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-brand-green transition-all shadow-2xl shadow-brand-green/20">
                Assinar agora
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
