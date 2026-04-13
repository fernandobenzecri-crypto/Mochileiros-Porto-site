import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Header, Footer, WhatsAppButton } from "../components/layout/Navigation";
import { ArrowRight, MessageCircle, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { BRAND } from "../constants";

const GROUPS = [
  {
    icon: "💬",
    name: "Mochileiros Porto — Geral",
    description: "O grupo principal. Bate-papo aleatório, eventos, viagens e o dia a dia da comunidade.",
    link: "https://chat.whatsapp.com/Ehvjk51yxe07Yxx6TInH7L?mode=ems_copy_t",
    badgeColor: "bg-brand-green text-white",
  },
  {
    icon: "💘",
    name: "Mochileiros MATCH",
    description: "O Tinder dos Mochileiros. Para amizades e, quem sabe, muito mais. Conexões reais em Porto.",
    link: "https://chat.whatsapp.com/C2OPmY9t7UODX0SW1v5Ri5?mode=ems_copy_t",
    badgeColor: "bg-pink-500 text-white",
  },
  {
    icon: "📋",
    name: "Imigração & Documentação",
    description: "Dúvidas sobre visto, NIF, SEF, AIMA, documentos e burocracia portuguesa. Apoio mútuo.",
    link: "https://chat.whatsapp.com/BcRtV3PYqKiD1hy7sWX5Ou?mode=ems_copy_t",
    badgeColor: "bg-blue-500 text-white",
  },
  {
    icon: "🌍",
    name: "Expedição Marrocos",
    description: "Grupo dedicado às viagens ao Marrocos. Preços de passagens atualizados constantemente.",
    link: "https://chat.whatsapp.com/GtVdhecyZbT6pi106nvWPS?mode=ems_copy_t",
    badgeColor: "bg-brand-orange text-white",
  },
  {
    icon: "🏺",
    name: "Expedição Egito",
    description: "Todas as informações, curiosidades e organização das expedições ao Egito.",
    link: "https://chat.whatsapp.com/HkWFqfgphG89EeYh9AnG0m?mode=ems_copy_t",
    badgeColor: "bg-brand-yellow text-brand-navy",
  },
  {
    icon: "🛍️",
    name: "Classificados Mochileiros",
    description: "Venda e compra de serviços e produtos dentro da comunidade. Negócios entre brasileiros.",
    link: "https://chat.whatsapp.com/BFv57wLjukAKIt8li2JBKM?mode=wwt",
    badgeColor: "bg-purple-500 text-white",
  },
  {
    icon: "🏃",
    name: "Trilhas & Esportes",
    description: "Para quem curte trilhas, vida saudável e esportes radicais. Aventura além das excursões.",
    link: "https://chat.whatsapp.com/FsuLXsRyw7NDRbH1U8uI3V?mode=ems_copy_t",
    badgeColor: "bg-green-800 text-white",
  },
  {
    icon: "👩",
    name: "Mochileiras — Grupo Feminino",
    description: "Espaço exclusivo para mulheres. Eventos só para mulheres, segurança e conexão.",
    link: "https://chat.whatsapp.com/ETwAJ29bsWvC5uPoBhPaVh",
    badgeColor: "bg-rose-600 text-white",
  },
];

export default function LinksUteis() {
  return (
    <div className="min-h-screen bg-brand-navy font-sans selection:bg-brand-green selection:text-white">
      <Helmet>
        <title>Grupos e Contatos | Mochileiros Porto</title>
        <meta name="description" content="Todos os grupos WhatsApp e redes sociais da comunidade Mochileiros Porto. Quase 7 mil membros no Porto e arredores." />
      </Helmet>

      <Header />

      <main>
        {/* HERO */}
        <section className="pt-40 pb-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-green/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03]">
              <div className="w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 text-white rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-white/10 backdrop-blur-xl mb-8">
                🇧🇷 8 grupos · ~7.000 membros
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-none mb-6">
                ENTRE NA <br />
                <span className="text-brand-green">COMUNIDADE</span>
              </h1>
              <p className="text-xl text-white/70 font-medium leading-relaxed max-w-2xl mx-auto">
                A Comunidade Mochileiros Porto reúne quase 7 mil brasileiros em Porto e arredores, organizados em 8 grupos temáticos. Escolha o(s) grupo(s) que fazem mais sentido para você e entre agora.
              </p>
            </motion.div>
          </div>
        </section>

        {/* GRUPOS */}
        <section className="py-20 px-4 bg-white relative">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-display font-black text-brand-dark uppercase tracking-tighter">
                Nossos Grupos
              </h2>
              <p className="text-gray-500 font-medium text-lg">
                Escolha o grupo certo para você
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {GROUPS.map((group, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-gray-50 rounded-[32px] p-8 border border-gray-100 hover:shadow-2xl hover:shadow-brand-dark/5 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full group"
                >
                  <div className="flex items-center justify-end mb-6">
                    <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${group.badgeColor}`}>
                      WhatsApp
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-black text-brand-dark uppercase tracking-tight mb-4 flex items-start gap-3">
                    <span className="text-2xl leading-none">{group.icon}</span>
                    <span>{group.name}</span>
                  </h3>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed flex-grow mb-8">
                    {group.description}
                  </p>
                  <a
                    href={group.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 rounded-full bg-green-800 text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-300 hover:bg-green-700 hover:-translate-y-1 hover:shadow-lg"
                  >
                    ENTRAR NO GRUPO <ArrowRight size={14} />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* REDES SOCIAIS */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-display font-black text-brand-dark uppercase tracking-tighter">
                Siga nas Redes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href={BRAND.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-4 p-10 rounded-[32px] bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white hover:scale-105 transition-transform duration-500 shadow-xl shadow-pink-500/20"
              >
                <Instagram size={48} />
                <span className="font-black uppercase tracking-widest text-sm">@mochileirosporto</span>
              </a>
              
              <a
                href={BRAND.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-4 p-10 rounded-[32px] bg-[#25D366] text-white hover:scale-105 transition-transform duration-500 shadow-xl shadow-green-500/20"
              >
                <MessageCircle size={48} />
                <span className="font-black uppercase tracking-widest text-sm">Fala com o Fernando</span>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-4 p-10 rounded-[32px] bg-[#FF0000] text-white hover:scale-105 transition-transform duration-500 shadow-xl shadow-red-500/20"
              >
                <Youtube size={48} />
                <span className="font-black uppercase tracking-widest text-sm">Mochileiros Porto</span>
              </a>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-32 px-4 bg-brand-navy relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-green via-transparent to-transparent" />
          </div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-10">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter">
                Já faz parte dos grupos?
              </h2>
              <p className="text-xl text-white/70 font-medium max-w-2xl mx-auto">
                O próximo passo é se tornar membro VIP e ter acesso a descontos, excursões e muito mais.
              </p>
            </div>
            
            <Link 
              to="/clube-vip" 
              className="inline-flex items-center gap-3 bg-brand-green text-white px-12 py-6 rounded-full text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-brand-green/30 hover:bg-white hover:text-brand-green transition-all duration-500 hover:scale-105"
            >
              CONHECER O CLUBE VIP <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
