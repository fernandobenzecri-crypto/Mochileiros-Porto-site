import { motion, useScroll, useTransform } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { BRAND } from "../../constants";
import { ArrowRight, Instagram, Facebook, Youtube, MessageCircle, Globe, Shield, Zap, Sparkles, Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

export function UrgencyBar() {
  return (
    <div className="relative z-[60] bg-brand-red text-white py-3 px-4 text-center text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl overflow-hidden">
      <motion.div
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
      />
      <Link to="/clube-vip" className="relative z-10 hover:opacity-80 transition-opacity flex items-center justify-center gap-4">
        <Sparkles size={12} className="animate-pulse" />
        🔥 OFERTA FUNDADOR — €6,90/MÊS PARA SEMPRE · APENAS PARA OS PRIMEIROS 100 MEMBROS
        <Sparkles size={12} className="animate-pulse" />
      </Link>
    </div>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, profile } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Viagens", path: "/viagens" },
    { name: "Eventos", path: "/eventos" },
    { name: "Clube VIP", path: "/clube-vip" },
    { name: "Embaixador", path: "/embaixador" },
    { name: "Assessoria", path: "/assessoria" },
    { name: "Parcerias", path: "/parcerias" },
    { name: "Links Úteis", path: "/links-uteis" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-2xl border-b border-gray-100 py-4" 
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="group flex items-center gap-4 relative z-[60]">
          <div className="relative">
            <img 
              src={BRAND.logo} 
              alt={BRAND.name}
              className={`w-20 h-20 object-contain transition-all duration-500 ${isScrolled ? "scale-90" : "scale-110"}`}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-green/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="flex flex-col">
            <span className={`font-display font-black text-2xl md:text-3xl tracking-tighter leading-none transition-colors duration-500 ${isScrolled ? "text-brand-dark" : "text-white"}`}>
              MOCHILEIROS<span className="text-brand-green">PORTO</span>
            </span>
            <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] transition-colors duration-500 ${isScrolled ? "text-gray-400" : "text-white/60"}`}>
              {BRAND.tagline}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 hover:text-brand-green relative group ${
                isScrolled ? "text-brand-dark" : "text-white"
              }`}
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-brand-green transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6 relative z-[60]">
          {user ? (
            <Link 
              to="/membro" 
              className={`flex items-center gap-3 px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-2xl hover:scale-105 active:scale-95 ${
                isScrolled 
                  ? "bg-brand-navy text-white shadow-brand-navy/20" 
                  : "bg-white text-brand-navy shadow-white/10 hover:bg-brand-green hover:text-white"
              }`}
            >
              <User size={14} /> {profile?.name?.split(' ')[0] || 'Área VIP'}
            </Link>
          ) : (
            <Link 
              to="/login" 
              className={`hidden md:flex items-center gap-3 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-2xl hover:scale-105 active:scale-95 ${
                isScrolled 
                  ? "bg-brand-green text-white shadow-brand-green/20" 
                  : "bg-white text-brand-navy shadow-white/10 hover:bg-brand-green hover:text-white"
              }`}
            >
              Entrar para o VIP <ArrowRight size={14} />
            </Link>
          )}
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-3 rounded-full transition-all duration-500 ${
              isScrolled ? "bg-brand-gray text-brand-dark" : "bg-white/10 text-white backdrop-blur-xl"
            }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={isMobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-[50] bg-brand-navy lg:hidden flex flex-col items-center justify-center p-12 space-y-12"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-green via-transparent to-transparent" />
        </div>
        
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: 20 }}
              animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link 
                to={link.path} 
                className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter hover:text-brand-green transition-colors"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          {user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7 }}
            >
              <Link 
                to="/membro" 
                className="text-4xl md:text-6xl font-display font-black text-brand-green uppercase tracking-tighter"
              >
                Área do Membro
              </Link>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isMobileMenuOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: 0.6 }}
          className="pt-12"
        >
          {!user && (
            <Link 
              to="/cadastro" 
              className="bg-brand-green text-white px-12 py-6 rounded-full text-xl font-display font-black uppercase tracking-[0.2em] shadow-3xl shadow-brand-green/20"
            >
              QUERO SER VIP
            </Link>
          )}
        </motion.div>
      </motion.div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-32 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-12">
            <Link to="/" className="group flex items-center gap-6">
              <div className="relative">
                <img 
                  src={BRAND.logo} 
                  alt={BRAND.name}
                  className="w-24 h-24 object-contain transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-3xl md:text-4xl tracking-tighter leading-none">
                  MOCHILEIROS<span className="text-brand-green">PORTO</span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">
                  {BRAND.tagline}
                </span>
              </div>
            </Link>
            <p className="text-white/50 text-xl font-medium leading-relaxed max-w-md">
              A maior comunidade de brasileiros no Porto. Transformamos sua jornada em Portugal em uma experiência de conexão e pertencimento.
            </p>
            <div className="flex items-center gap-6">
              {[
                { icon: <Instagram size={24} />, link: BRAND.instagramLink },
                { icon: <Facebook size={24} />, link: "#" },
                { icon: <Youtube size={24} />, link: "#" },
                { icon: <MessageCircle size={24} />, link: BRAND.whatsappLink }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-brand-green hover:text-white transition-all duration-500 hover:scale-110 shadow-2xl"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-16">
              <div className="space-y-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-green">Explorar</h4>
                <ul className="space-y-4">
                  {["Home", "Viagens", "Eventos", "Clube VIP", "Assessoria", "Parcerias"].map((link) => (
                    <li key={link}>
                      <Link to={`/${link.toLowerCase().replace(" ", "-")}`} className="text-white/40 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest">{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-yellow">Programas</h4>
                <ul className="space-y-4">
                  {["Embaixador", "Membro Fundador", "Parcerias VIP"].map((link) => (
                    <li key={link}>
                      <Link to={link === "Embaixador" ? "/embaixador" : link === "Parcerias VIP" ? "/parcerias" : "/clube-vip"} className="text-white/40 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest">{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-8 col-span-2 md:col-span-1">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange">Comunidade</h4>
                <ul className="space-y-4">
                  {["Sobre Nós", "Notícias", "Links Úteis", "FAQ"].map((link) => (
                    <li key={link}>
                      <Link to={link === "Links Úteis" ? "/links-uteis" : `/${link.toLowerCase().replace(" ", "-")}`} className="text-white/40 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest">{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
            <span>© 2026 Mochileiros Porto</span>
            <div className="flex items-center gap-6">
              <Link to="/politica-de-privacidade" className="hover:text-white transition-colors">Privacidade</Link>
              <Link to="/termos-de-uso" className="hover:text-white transition-colors">Termos</Link>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full border border-white/10">
              <Shield size={14} className="text-brand-green" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">RNAVT Licenciada</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full border border-white/10">
              <Zap size={14} className="text-brand-yellow" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Secure SSL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppButton() {
  return (
    <motion.a
      href={BRAND.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-10 right-10 z-[100] w-20 h-20 bg-[#25D366] rounded-[32px] flex items-center justify-center shadow-3xl shadow-green-500/40 hover:scale-110 transition-transform group"
      initial={{ scale: 0, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      whileHover={{ rotate: 12 }}
    >
      <div className="absolute right-full mr-6 bg-white text-brand-navy px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all shadow-2xl translate-x-4 group-hover:translate-x-0">
        Fale conosco agora
      </div>
      <MessageCircle size={36} className="text-white fill-white/20" />
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-red text-white text-[10px] font-black rounded-full flex items-center justify-center animate-bounce shadow-lg">
        1
      </div>
    </motion.a>
  );
}
