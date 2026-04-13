import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Helmet } from "react-helmet-async";
import { 
  Search, 
  Plus,
  X,
  AlertCircle,
  Edit3,
  Trash2,
  MapPin,
  Euro,
  Image as ImageIcon,
  Check,
  Clock,
  Globe,
  Home,
  Calendar
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { db, updateUserProfile, UserProfile, handleFirestoreError, OperationType } from "../firebase";
import { collection, query, orderBy, onSnapshot, Timestamp, doc, updateDoc, increment, serverTimestamp, addDoc, deleteDoc, setDoc, deleteField } from "firebase/firestore";
import { parseAdminCommand } from "../services/geminiService";
import { toast, Toaster } from "react-hot-toast";

// Sub-components
import AdminHeader from "../components/admin/AdminHeader";
import AdminStats from "../components/admin/AdminStats";
import GeminiConsole from "../components/admin/GeminiConsole";
import UsersTab from "../components/admin/UsersTab";
import LeadsTab from "../components/admin/LeadsTab";
import MochisTab from "../components/admin/MochisTab";
import ContentTab from "../components/admin/ContentTab";
import AmbassadorsTab from "../components/admin/AmbassadorsTab";
import PartnersTab from "../components/admin/PartnersTab";

interface Lead {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  interest: string;
  message: string;
  createdAt: any;
}

interface Viagem {
  id: string;
  titulo: string;
  descricao: string;
  destino: string;
  tipo: "excursao" | "premium";
  dataPartida: any;
  dataRetorno: any;
  precoPublico: number;
  precoVip: number;
  vagasTotal: number;
  vagasDisponiveis: number;
  incluiTransporte: boolean;
  incluiHospedagem: boolean;
  incluiAlimentacao: boolean;
  imagemUrl: string;
  ativo: boolean;
  criadoEm: any;
  atualizadoEm: any;
}

interface Evento {
  id: string;
  titulo: string;
  descricao: string;
  tipo: "presencial" | "online" | "toca";
  data: any;
  horario: string;
  local: string;
  linkOnline?: string;
  imagemUrl: string;
  gratuito: boolean;
  precoPublico: number;
  vagasTotal: number;
  vagasDisponiveis: number;
  embaixadoresAnfitrioes?: string[];
  ativo: boolean;
  criadoEm: any;
  atualizadoEm: any;
}

export default function Admin() {
  const { profile, user } = useAuth();
  const [activeTab, setActiveTab] = useState<"leads" | "users" | "partners" | "kits" | "ambassadors" | "content" | "mochis">("users");
  const [ambassadorSubTab, setAmbassadorSubTab] = useState<"applications" | "active" | "ranking">("applications");
  const [contentSubTab, setContentSubTab] = useState<"trips" | "events">("trips");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [ambassadorApps, setAmbassadorApps] = useState<any[]>([]);
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [tocaSettings, setTocaSettings] = useState<any>(null);
  const [tocaMeeting, setTocaMeeting] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddContentModal, setShowAddContentModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  
  // Gemini States
  const [aiCommand, setAiCommand] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null);

  const stats = {
    totalVips: users.filter(u => u.is_vip).length,
    newSignups7d: users.filter(u => {
      if (!u.created_at) return false;
      const date = u.created_at instanceof Timestamp ? u.created_at.toDate() : new Date(u.created_at);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return date > sevenDaysAgo && u.is_vip;
    }).length
  };

  useEffect(() => {
    if (profile?.role !== 'admin') return;

    setLoading(true);
    
    const unsubLeads = onSnapshot(query(collection(db, "leads"), orderBy("created_at", "desc")), (snap) => {
      setLeads(snap.docs.map(doc => {
        const data = doc.data();
        return { 
          id: doc.id, 
          ...data,
          createdAt: data.created_at || data.createdAt 
        } as Lead;
      }));
    }, (error) => handleFirestoreError(error, OperationType.LIST, "leads"));

    const unsubUsers = onSnapshot(query(collection(db, "users"), orderBy("created_at", "desc")), (snap) => {
      setUsers(snap.docs.map(doc => ({ uid: doc.id, ...doc.data() } as UserProfile)));
    }, (error) => handleFirestoreError(error, OperationType.LIST, "users"));

    const unsubPartners = onSnapshot(query(collection(db, "partners"), orderBy("nome", "asc")), (snap) => {
      setPartners(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, "partners"));

    const unsubAmbassadorApps = onSnapshot(query(collection(db, "candidaturas_embaixador"), orderBy("created_at", "desc")), (snap) => {
      setAmbassadorApps(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, "candidaturas_embaixador"));

    const unsubViagens = onSnapshot(query(collection(db, "viagens"), orderBy("criadoEm", "desc")), (snap) => {
      setViagens(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Viagem)));
    }, (error) => handleFirestoreError(error, OperationType.LIST, "viagens"));

    const unsubEventos = onSnapshot(query(collection(db, "eventos"), orderBy("criadoEm", "desc")), (snap) => {
      setEventos(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Evento)));
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.LIST, "eventos"));

    const unsubTocaSettings = onSnapshot(doc(db, "settings", "toca_meeting"), (docSnap) => {
      if (docSnap.exists()) setTocaSettings(docSnap.data());
    }, (error) => handleFirestoreError(error, OperationType.GET, "settings/toca_meeting"));

    const currentMonth = new Date().toISOString().slice(0, 7);
    const unsubTocaMeeting = onSnapshot(doc(db, "toca_meetings", currentMonth), (docSnap) => {
      if (docSnap.exists()) setTocaMeeting(docSnap.data());
    }, (error) => handleFirestoreError(error, OperationType.GET, `toca_meetings/${currentMonth}`));

    return () => {
      unsubLeads(); unsubUsers(); unsubPartners(); unsubAmbassadorApps();
      unsubViagens(); unsubEventos(); unsubTocaSettings(); unsubTocaMeeting();
    };
  }, [profile]);

  const handleGeminiCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiCommand.trim()) return;
    setAiLoading(true);
    setAiFeedback({ type: 'info', message: "Gemini está processando seu comando..." });

    try {
      const action = await parseAdminCommand(aiCommand, users);
      if (action.type === 'UNKNOWN' || !action.targetUserId) {
        setAiFeedback({ type: 'error', message: "Não entendi o comando ou não encontrei o usuário." });
      } else {
        if (action.type === 'SET_VIP') {
          await updateUserProfile(action.targetUserId, { is_vip: action.value });
        } else if (action.type === 'ADD_MOCHIS') {
          const token = await user?.getIdToken();
          await fetch("/api/mochis/award", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ 
              userId: action.targetUserId, 
              amount: action.value,
              reason: "Comando Gemini"
            })
          });
        } else if (action.type === 'SET_LEVEL') {
          await updateUserProfile(action.targetUserId, { level: action.value });
        }
        setAiFeedback({ type: 'success', message: action.reasoning });
        setAiCommand("");
      }
    } catch (error) {
      setAiFeedback({ type: 'error', message: "Erro ao processar comando." });
    } finally {
      setAiLoading(false);
      setTimeout(() => setAiFeedback(null), 5000);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    const date = timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const handleToggleVip = async (userId: string, currentStatus: boolean) => {
    try {
      await updateUserProfile(userId, { is_vip: !currentStatus });
      toast.success(`Status VIP de ${users.find(u => u.uid === userId)?.name} atualizado!`);
    } catch (error) {
      toast.error("Erro ao atualizar status VIP.");
    }
  };

  const handleAdjustMochis = async (userId: string) => {
    const amount = prompt("Quantidade de Mochis para adicionar/remover:", "100");
    if (amount && user) {
      try {
        const token = await user.getIdToken();
        const response = await fetch("/api/mochis/award", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ 
            userId, 
            amount: parseInt(amount),
            reason: "Ajuste manual via Painel Admin"
          })
        });
        if (!response.ok) throw new Error();
        toast.success("Mochis ajustados com sucesso!");
      } catch (error) {
        toast.error("Erro ao ajustar Mochis.");
      }
    }
  };

  const handleUpdateTocaSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    try {
      await setDoc(doc(db, "settings", "toca_meeting"), {
        nextDate: formData.get("date"),
        nextTime: formData.get("time"),
        location: formData.get("location"),
        updatedAt: serverTimestamp()
      }, { merge: true });
      toast.success("Ritual na Toca atualizado!");
    } catch (error) {
      toast.error("Erro ao atualizar ritual.");
    }
  };

  const handleApproveAmbassador = async (app: any) => {
    try {
      const response = await fetch("/api/admin/approve-ambassador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appId: app.id, userId: app.userId, name: app.name })
      });
      if (!response.ok) throw new Error();
      toast.success(`Embaixador ${app.name} aprovado!`);
    } catch (error) {
      toast.error("Erro ao aprovar embaixador.");
    }
  };

  const handleRejectAmbassador = async (appId: string) => {
    try {
      await updateDoc(doc(db, "candidaturas_embaixador", appId), { status: 'rejeitado', rejected_at: serverTimestamp() });
      toast.success("Candidatura rejeitada.");
    } catch (error) {
      toast.error("Erro ao rejeitar candidatura.");
    }
  };

  const handleAddHost = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const userId = formData.get("userId") as string;
    if (!userId) return;
    const user = users.find(u => u.uid === userId);
    const currentMonth = new Date().toISOString().slice(0, 7);
    try {
      await setDoc(doc(db, "toca_meetings", currentMonth), {
        hosts: { [userId]: { name: user?.name, confirmedAt: serverTimestamp(), awarded: false } }
      }, { merge: true });
      toast.success(`${user?.name} adicionado como anfitrião!`);
    } catch (error) {
      toast.error("Erro ao adicionar anfitrião.");
    }
  };

  const handleAwardHost = async (uid: string) => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    try {
      const token = await user?.getIdToken();
      await fetch("/api/mochis/award", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ 
          userId: uid, 
          amount: 100,
          reason: "Anfitrião de Encontro na Toca"
        })
      });
      await updateDoc(doc(db, "toca_meetings", currentMonth), { [`hosts.${uid}.awarded`]: true });
      toast.success("Recompensa de 100 Mochis/Pontos atribuída!");
    } catch (error) {
      toast.error("Erro ao atribuir recompensa.");
    }
  };

  const handleRemoveHost = async (uid: string) => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    try {
      await updateDoc(doc(db, "toca_meetings", currentMonth), { [`hosts.${uid}`]: deleteField() });
      toast.success("Anfitrião removido.");
    } catch (error) {
      toast.error("Erro ao remover anfitrião.");
    }
  };

  const handleToggleViagemAtiva = async (viagem: Viagem) => {
    try {
      await updateDoc(doc(db, "viagens", viagem.id), {
        ativo: !viagem.ativo,
        atualizadoEm: serverTimestamp()
      });
      toast.success(`Viagem ${viagem.ativo ? 'desativada' : 'ativada'}!`);
    } catch (error) {
      toast.error("Erro ao atualizar status da viagem.");
    }
  };

  const handleToggleEventoAtivo = async (evento: Evento) => {
    try {
      await updateDoc(doc(db, "eventos", evento.id), {
        ativo: !evento.ativo,
        atualizadoEm: serverTimestamp()
      });
      toast.success(`Evento ${evento.ativo ? 'desativado' : 'ativado'}!`);
    } catch (error) {
      toast.error("Erro ao atualizar status do evento.");
    }
  };

  const handleDeleteViagem = async (id: string) => {
    try {
      await deleteDoc(doc(db, "viagens", id));
      toast.success("Viagem removida!");
    } catch (error) {
      toast.error("Erro ao remover viagem.");
    } finally {
      setShowDeleteConfirm(null);
    }
  };

  const handleDeleteEvento = async (id: string) => {
    try {
      await deleteDoc(doc(db, "eventos", id));
      toast.success("Evento removido!");
    } catch (error) {
      toast.error("Erro ao remover evento.");
    } finally {
      setShowDeleteConfirm(null);
    }
  };

  const handleSaveViagem = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = {
      titulo: formData.get("titulo") as string,
      destino: formData.get("destino") as string,
      tipo: formData.get("tipo") as "excursao" | "premium",
      dataPartida: Timestamp.fromDate(new Date(formData.get("dataPartida") as string)),
      dataRetorno: Timestamp.fromDate(new Date(formData.get("dataRetorno") as string)),
      precoPublico: Number(formData.get("precoPublico")),
      precoVip: Number(formData.get("precoVip")),
      vagasTotal: Number(formData.get("vagasTotal")),
      vagasDisponiveis: Number(formData.get("vagasDisponiveis")),
      descricao: formData.get("descricao") as string,
      imagemUrl: formData.get("imagemUrl") as string,
      incluiTransporte: formData.get("incluiTransporte") === "on",
      incluiHospedagem: formData.get("incluiHospedagem") === "on",
      incluiAlimentacao: formData.get("incluiAlimentacao") === "on",
      ativo: formData.get("ativo") === "on",
      atualizadoEm: serverTimestamp()
    };

    try {
      if (editingItem) {
        await updateDoc(doc(db, "viagens", editingItem.id), data);
        toast.success("Viagem atualizada!");
      } else {
        await addDoc(collection(db, "viagens"), { ...data, criadoEm: serverTimestamp() });
        toast.success("Nova viagem criada!");
      }
      setShowAddContentModal(false);
      setEditingItem(null);
    } catch (error) {
      toast.error("Erro ao salvar viagem.");
    }
  };

  const handleSaveEvento = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = {
      titulo: formData.get("titulo") as string,
      tipo: formData.get("tipo") as "presencial" | "online" | "toca",
      data: Timestamp.fromDate(new Date(formData.get("data") as string)),
      horario: formData.get("horario") as string,
      local: formData.get("local") as string,
      linkOnline: formData.get("linkOnline") as string,
      gratuito: formData.get("gratuito") === "on",
      precoPublico: Number(formData.get("precoPublico") || 0),
      vagasTotal: Number(formData.get("vagasTotal")),
      vagasDisponiveis: Number(formData.get("vagasDisponiveis")),
      descricao: formData.get("descricao") as string,
      imagemUrl: formData.get("imagemUrl") as string,
      ativo: formData.get("ativo") === "on",
      atualizadoEm: serverTimestamp()
    };

    try {
      if (editingItem) {
        await updateDoc(doc(db, "eventos", editingItem.id), data);
        toast.success("Evento atualizado!");
      } else {
        await addDoc(collection(db, "eventos"), { ...data, criadoEm: serverTimestamp() });
        toast.success("Novo evento criado!");
      }
      setShowAddContentModal(false);
      setEditingItem(null);
    } catch (error) {
      toast.error("Erro ao salvar evento.");
    }
  };

  if (profile?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-gray">
        <div className="text-center space-y-4">
          <AlertCircle size={48} className="mx-auto text-red-500" />
          <h1 className="text-2xl font-display font-black text-brand-dark uppercase">Acesso Negado</h1>
          <p className="text-gray-500">Você não tem permissão para acessar esta área.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-gray pt-32 pb-20 px-4">
      <Toaster />
      <Helmet>
        <title>Painel Admin | Mochileiros Porto</title>
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-12">
        <AdminHeader activeTab={activeTab} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <AdminStats totalVips={stats.totalVips} newSignups7d={stats.newSignups7d} />
            <GeminiConsole 
              aiCommand={aiCommand} 
              setAiCommand={setAiCommand} 
              aiLoading={aiLoading} 
              aiFeedback={aiFeedback} 
              onHandleCommand={handleGeminiCommand} 
            />
          </div>
          
          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl h-full">
              <h3 className="text-xl font-display font-black text-brand-dark uppercase tracking-tight mb-6">Navegação</h3>
              <div className="flex flex-col gap-2">
                {[
                  { id: "users", label: "Membros", count: users.length },
                  { id: "ambassadors", label: "Embaixadores", count: users.filter(u => u.tipoMembro === 'embaixador').length },
                  { id: "content", label: "Conteúdo", count: viagens.length + eventos.length },
                  { id: "mochis", label: "Ranking Mochis", count: null },
                  { id: "partners", label: "Parceiros", count: partners.length },
                  { id: "leads", label: "Leads", count: leads.length },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center justify-between px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${
                      activeTab === tab.id ? "bg-brand-navy text-white shadow-lg" : "text-gray-400 hover:bg-brand-gray hover:text-brand-dark"
                    }`}
                  >
                    {tab.label}
                    {tab.count !== null && <span className="bg-brand-green/20 text-brand-green px-2 py-1 rounded-lg">{tab.count}</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-16 pl-14 pr-6 bg-white border border-gray-100 rounded-full focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all font-bold text-brand-dark shadow-lg"
              />
            </div>
          </div>

          <div className="bg-white rounded-[60px] shadow-3xl border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="p-20 text-center flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-brand-green border-t-transparent rounded-full animate-spin" />
                <span className="font-black uppercase tracking-widest text-gray-400 text-xs">Carregando dados...</span>
              </div>
            ) : (
              <>
                {activeTab === "users" && <UsersTab users={users} searchTerm={searchTerm} onToggleVip={handleToggleVip} formatDate={formatDate} />}
                {activeTab === "leads" && <LeadsTab leads={leads} searchTerm={searchTerm} formatDate={formatDate} />}
                {activeTab === "mochis" && <MochisTab users={users} searchTerm={searchTerm} onAdjustMochis={handleAdjustMochis} />}
                {activeTab === "partners" && <PartnersTab partners={partners} searchTerm={searchTerm} onEdit={() => {}} onDelete={() => {}} />}
                {activeTab === "content" && (
                  <ContentTab 
                    contentSubTab={contentSubTab} setContentSubTab={setContentSubTab} 
                    viagens={viagens} eventos={eventos} searchTerm={searchTerm} formatDate={formatDate}
                    onToggleViagemAtiva={handleToggleViagemAtiva} onToggleEventoAtivo={handleToggleEventoAtivo}
                    onEdit={(item) => { setEditingItem(item); setShowAddContentModal(true); }}
                    onDelete={(id) => setShowDeleteConfirm(id)}
                    tocaSettings={tocaSettings} onUpdateTocaSettings={handleUpdateTocaSettings}
                  />
                )}
                {activeTab === "ambassadors" && (
                  <AmbassadorsTab 
                    ambassadorSubTab={ambassadorSubTab} setAmbassadorSubTab={setAmbassadorSubTab}
                    ambassadorApps={ambassadorApps} users={users}
                    onApprove={handleApproveAmbassador} onReject={handleRejectAmbassador} formatDate={formatDate}
                    tocaSettings={tocaSettings} tocaMeeting={tocaMeeting}
                    onAddHost={handleAddHost} onRemoveHost={handleRemoveHost} onAwardHost={handleAwardHost}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showAddContentModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => { setShowAddContentModal(false); setEditingItem(null); }}
              className="absolute inset-0 bg-brand-navy/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8 md:p-12">
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-green/10 rounded-2xl flex items-center justify-center text-brand-green">
                      {contentSubTab === 'trips' ? <MapPin size={24} /> : <Calendar size={24} />}
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-black uppercase tracking-tight text-brand-dark">
                        {editingItem ? 'Editar' : 'Novo'} {contentSubTab === 'trips' ? 'Viagem' : 'Evento'}
                      </h3>
                      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Preencha todos os detalhes abaixo</p>
                    </div>
                  </div>
                  <button onClick={() => { setShowAddContentModal(false); setEditingItem(null); }} className="p-4 bg-gray-100 text-gray-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={contentSubTab === 'trips' ? handleSaveViagem : handleSaveEvento} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Título</label>
                      <input name="titulo" defaultValue={editingItem?.titulo} required className="w-full h-14 px-6 bg-brand-gray rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-brand-green border-none" />
                    </div>
                    {contentSubTab === 'trips' ? (
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Destino</label>
                        <input name="destino" defaultValue={editingItem?.destino} required className="w-full h-14 px-6 bg-brand-gray rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-brand-green border-none" />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Tipo de Evento</label>
                        <select name="tipo" defaultValue={editingItem?.tipo || 'presencial'} className="w-full h-14 px-6 bg-brand-gray rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-brand-green border-none">
                          <option value="presencial">Presencial</option>
                          <option value="online">Online</option>
                          <option value="toca">Ritual na Toca</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {contentSubTab === 'trips' ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Data Partida</label>
                        <input type="date" name="dataPartida" defaultValue={editingItem?.dataPartida ? new Date(editingItem.dataPartida.toDate()).toISOString().split('T')[0] : ''} required className="w-full h-14 px-6 bg-brand-gray rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-brand-green border-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Data Retorno</label>
                        <input type="date" name="dataRetorno" defaultValue={editingItem?.dataRetorno ? new Date(editingItem.dataRetorno.toDate()).toISOString().split('T')[0] : ''} required className="w-full h-14 px-6 bg-brand-gray rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-brand-green border-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Tipo</label>
                        <select name="tipo" defaultValue={editingItem?.tipo || 'excursao'} className="w-full h-14 px-6 bg-brand-gray rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-brand-green border-none">
                          <option value="excursao">Excursão</option>
                          <option value="premium">Premium</option>
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Data</label>
                        <input type="date" name="data" defaultValue={editingItem?.data ? new Date(editingItem.data.toDate()).toISOString().split('T')[0] : ''} required className="w-full h-14 px-6 bg-brand-gray rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-brand-green border-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Horário</label>
                        <input name="horario" defaultValue={editingItem?.horario} placeholder="Ex: 19:30" required className="w-full h-14 px-6 bg-brand-gray rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-brand-green border-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Local / Link</label>
                        <input name={editingItem?.tipo === 'online' ? 'linkOnline' : 'local'} defaultValue={editingItem?.tipo === 'online' ? editingItem?.linkOnline : editingItem?.local} required className="w-full h-14 px-6 bg-brand-gray rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-brand-green border-none" />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Preço Público (€)</label>
                      <input type="number" name="precoPublico" defaultValue={editingItem?.precoPublico} required className="w-full h-14 px-6 bg-brand-gray rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-brand-green border-none" />
                    </div>
                    {contentSubTab === 'trips' && (
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Preço VIP (€)</label>
                        <input type="number" name="precoVip" defaultValue={editingItem?.precoVip} required className="w-full h-14 px-6 bg-brand-gray rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-brand-green border-none" />
                      </div>
                    )}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Vagas Total</label>
                      <input type="number" name="vagasTotal" defaultValue={editingItem?.vagasTotal} required className="w-full h-14 px-6 bg-brand-gray rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-brand-green border-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Vagas Disponíveis</label>
                      <input type="number" name="vagasDisponiveis" defaultValue={editingItem?.vagasDisponiveis} required className="w-full h-14 px-6 bg-brand-gray rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-brand-green border-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">URL da Imagem</label>
                    <input name="imagemUrl" defaultValue={editingItem?.imagemUrl} required className="w-full h-14 px-6 bg-brand-gray rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-brand-green border-none" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Descrição</label>
                    <textarea name="descricao" defaultValue={editingItem?.descricao} rows={4} className="w-full p-6 bg-brand-gray rounded-3xl font-bold focus:outline-none focus:ring-2 focus:ring-brand-green border-none resize-none" />
                  </div>

                  <div className="flex flex-wrap gap-8 p-6 bg-brand-gray rounded-3xl">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" name="ativo" defaultChecked={editingItem?.ativo ?? true} className="w-6 h-6 rounded-lg text-brand-green focus:ring-brand-green" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark">Ativo / Publicado</span>
                    </label>
                    {contentSubTab === 'trips' && (
                      <>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" name="incluiTransporte" defaultChecked={editingItem?.incluiTransporte} className="w-6 h-6 rounded-lg text-brand-green focus:ring-brand-green" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark">Transporte</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" name="incluiHospedagem" defaultChecked={editingItem?.incluiHospedagem} className="w-6 h-6 rounded-lg text-brand-green focus:ring-brand-green" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark">Hospedagem</span>
                        </label>
                      </>
                    )}
                    {contentSubTab === 'events' && (
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" name="gratuito" defaultChecked={editingItem?.gratuito} className="w-6 h-6 rounded-lg text-brand-green focus:ring-brand-green" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark">Gratuito</span>
                      </label>
                    )}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button type="submit" className="flex-grow h-16 bg-brand-navy text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-green transition-all shadow-xl">
                      {editingItem ? 'Salvar Alterações' : `Criar ${contentSubTab === 'trips' ? 'Viagem' : 'Evento'}`}
                    </button>
                    <button type="button" onClick={() => { setShowAddContentModal(false); setEditingItem(null); }} className="px-10 h-16 bg-gray-100 text-gray-400 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all">
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}

        {showDeleteConfirm && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-brand-navy/90 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-md bg-white rounded-[40px] p-10 text-center">
              <div className="w-20 h-20 bg-red-100 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Trash2 size={40} />
              </div>
              <h3 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight mb-4">Tem certeza?</h3>
              <p className="text-gray-500 font-medium mb-10">Esta ação não pode ser desfeita. O item será removido permanentemente.</p>
              <div className="flex gap-4">
                <button onClick={() => contentSubTab === 'trips' ? handleDeleteViagem(showDeleteConfirm) : handleDeleteEvento(showDeleteConfirm)} className="flex-grow h-14 bg-red-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-red-600 transition-all shadow-lg">
                  Sim, Remover
                </button>
                <button onClick={() => setShowDeleteConfirm(null)} className="flex-grow h-14 bg-gray-100 text-gray-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all">
                  Cancelar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
