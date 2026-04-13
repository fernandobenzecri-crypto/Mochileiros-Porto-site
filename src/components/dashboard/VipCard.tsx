import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Crown, QrCode, CreditCard, Settings, Loader2, ArrowRight, ShieldCheck, Maximize2, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import { UserProfile } from "../../firebase";

interface VipCardProps {
  profile: UserProfile | null;
  onManageSubscription: () => void;
  loadingPortal: boolean;
}

export default function VipCard({ profile, onManageSubscription, loadingPortal }: VipCardProps) {
  const [showVipCard, setShowVipCard] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const memberSince = profile?.created_at?.toDate 
    ? profile.created_at.toDate().toLocaleDateString('pt-PT', { month: 'short', year: 'numeric' })
    : "Recentemente";

  const memberYear = profile?.created_at?.toDate 
    ? profile.created_at.toDate().getFullYear()
    : new Date().getFullYear();

  const handleDownloadCard = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2
      });
      const link = document.createElement('a');
      link.download = `carteirinha-vip-${profile?.name.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <>
      <div className={`p-10 rounded-[50px] shadow-2xl relative overflow-hidden ${profile?.is_vip ? 'bg-brand-navy text-white' : 'bg-white border border-gray-100'}`}>
        <div className="relative z-10 space-y-6">
          <div className="flex justify-between items-start">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${profile?.is_vip ? 'bg-brand-green text-brand-navy' : 'bg-brand-gray text-gray-400'}`}>
              <Crown size={28} />
            </div>
            {profile?.is_vip && (
              <button 
                onClick={() => setShowVipCard(true)}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-brand-green"
                title="Ver Carteirinha Digital"
              >
                <QrCode size={20} />
              </button>
            )}
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-display font-black uppercase tracking-tight">
              {profile?.is_vip 
                ? (profile.plan_type === 'anual' ? 'Fundador Mochileiros' : 
                   profile.plan_type === 'semestral' ? 'VIP Semestral' :
                   profile.plan_type === 'trimestral' ? 'VIP Trimestral' :
                   'Mochileiro VIP') 
                : (profile?.last_payment_status === 'failed' ? 'Pagamento Pendente' : 'Membro Explorador')}
            </h3>
            <p className={`text-sm font-medium ${profile?.is_vip ? 'text-brand-green' : 'text-gray-400'}`}>
              {profile?.is_vip 
                ? 'Você tem acesso a todos os benefícios!' 
                : (profile?.last_payment_status === 'failed' 
                    ? 'Houve um problema com sua última cobrança. Por favor, atualize seus dados.' 
                    : 'Assine o VIP para liberar descontos e eventos.')}
            </p>
          </div>
          {profile?.is_vip ? (
            <div className="space-y-3">
              <button 
                onClick={() => setShowVipCard(true)}
                className="flex items-center justify-center gap-3 w-full py-4 bg-brand-green text-brand-navy rounded-full font-display font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all shadow-lg"
              >
                <CreditCard size={16} /> Carteirinha Digital
              </button>
              <button 
                onClick={onManageSubscription}
                disabled={loadingPortal}
                className="flex items-center justify-center gap-3 w-full py-4 bg-white/10 text-white border border-white/20 rounded-full font-display font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-brand-navy transition-all disabled:opacity-50"
              >
                {loadingPortal ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Settings size={16} />
                )}
                Gerenciar Assinatura
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <Link 
                to="/clube-vip"
                className="flex items-center justify-center gap-3 w-full py-5 bg-brand-green text-white rounded-full font-display font-black uppercase tracking-widest text-xs hover:bg-brand-dark transition-all"
              >
                {profile?.last_payment_status === 'failed' ? 'Resolver Agora' : 'Seja VIP Agora'} <ArrowRight size={16} />
              </Link>
              {profile?.last_payment_status === 'failed' && profile?.stripe_customer_id && (
                <button 
                  onClick={onManageSubscription}
                  className="w-full text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-dark transition-colors"
                >
                  Atualizar Cartão no Stripe
                </button>
              )}
            </div>
          )}
        </div>
        {profile?.is_vip && (
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <Crown size={200} />
          </div>
        )}
      </div>

      {/* VIP Card Modal */}
      <AnimatePresence>
        {showVipCard && profile && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowVipCard(false);
                setIsFullscreen(false);
              }}
              className="absolute inset-0 bg-brand-dark/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full max-w-lg transition-all duration-500 ${isFullscreen ? 'scale-110 md:scale-125' : ''}`}
            >
              <div 
                ref={cardRef}
                className={`relative aspect-[1.57/1] w-full rounded-[24px] overflow-hidden shadow-2xl border-2 ${profile.plan_type === 'anual' ? 'border-brand-yellow animate-pulse' : 'border-white/10'} bg-gradient-to-br from-[#1a4a2e] to-[#2d7a4f] p-8 text-white`}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green/10 rounded-full -ml-32 -mb-32 blur-3xl" />
                
                <div className="flex justify-between items-start relative z-10">
                  <div className="space-y-1">
                    <div className="text-sm font-display font-black tracking-tighter uppercase">Mochileiros Porto</div>
                    <div className="text-[8px] font-black uppercase tracking-[0.3em] opacity-60">Comunidade Brasileira</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-[10px] font-black uppercase tracking-widest text-brand-green">
                        {profile.plan_type === 'anual' ? 'Fundador' : 
                         profile.plan_type === 'semestral' ? 'VIP Semestral' :
                         profile.plan_type === 'trimestral' ? 'VIP Trimestral' : 'VIP'}
                      </div>
                      <div className="text-[7px] font-black uppercase tracking-widest opacity-40">Nível de Acesso</div>
                    </div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${profile.plan_type === 'anual' ? 'bg-brand-yellow text-brand-navy' : 'bg-brand-green text-white'}`}>
                      {profile.plan_type === 'anual' ? <Crown size={20} /> : <ShieldCheck size={20} />}
                    </div>
                  </div>
                </div>

                <div className="mt-10 space-y-4 relative z-10">
                  <div className="space-y-1">
                    <div className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40">Membro Oficial</div>
                    <h4 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tight truncate">{profile.name}</h4>
                  </div>
                  <div className="flex gap-6">
                    <div>
                      <div className="text-[7px] font-black uppercase tracking-widest opacity-40">Membro Desde</div>
                      <div className="text-[10px] font-bold uppercase">{memberSince}</div>
                    </div>
                    <div>
                      <div className="text-[7px] font-black uppercase tracking-widest opacity-40">ID de Membro</div>
                      <div className="text-[10px] font-bold uppercase">MP-{memberYear}-{profile.uid.slice(0, 4).toUpperCase()}</div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                  <div className="space-y-1">
                    <div className="text-[7px] font-black uppercase tracking-[0.3em] opacity-40">Código de Verificação</div>
                    <div className="text-sm font-mono font-bold tracking-widest text-brand-green">{profile.codigoVip || '--------'}</div>
                  </div>
                  <div className="bg-white p-2 rounded-xl shadow-lg">
                    <QRCodeSVG 
                      value={`${window.location.origin}/verificar/${profile.codigoVip}`} 
                      size={64}
                      level="H"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="flex items-center justify-center gap-2 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all backdrop-blur-sm"
                  >
                    <Maximize2 size={16} /> {isFullscreen ? 'Reduzir' : 'Tela Cheia'}
                  </button>
                  <button 
                    onClick={handleDownloadCard}
                    className="flex items-center justify-center gap-2 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all backdrop-blur-sm"
                  >
                    <Download size={16} /> Guardar Imagem
                  </button>
                </div>
                <button 
                  onClick={() => {
                    setShowVipCard(false);
                    setIsFullscreen(false);
                  }}
                  className="w-full py-4 text-white/40 font-black uppercase tracking-widest text-[10px] hover:text-white transition-colors"
                >
                  Fechar Carteirinha
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
