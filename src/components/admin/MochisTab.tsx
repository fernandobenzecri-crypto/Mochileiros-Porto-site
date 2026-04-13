import React, { useState, useEffect } from "react";
import { Sparkles, Coins, Target, Save, Clock, Power } from "lucide-react";
import { UserProfile, db } from "../../firebase";
import { doc, onSnapshot, setDoc, Timestamp } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { MOCHI_LEVELS } from "../../constants";

interface MochisTabProps {
  users: UserProfile[];
  searchTerm: string;
  onAdjustMochis: (userId: string) => void;
}

export default function MochisTab({ users, searchTerm, onAdjustMochis }: MochisTabProps) {
  const [mission, setMission] = useState<any>({
    title: "",
    description: "",
    mochisBonus: 0,
    endDate: "",
    active: false
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "monthly_mission"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setMission({
          ...data,
          endDate: data.endDate?.toDate ? data.endDate.toDate().toISOString().split('T')[0] : data.endDate
        });
      }
    });
    return () => unsub();
  }, []);

  const handleSaveMission = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "settings", "monthly_mission"), {
        ...mission,
        mochisBonus: Number(mission.mochisBonus),
        endDate: Timestamp.fromDate(new Date(mission.endDate))
      });
      toast.success("Missão do mês atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar missão:", error);
      toast.error("Erro ao salvar missão.");
    } finally {
      setSaving(false);
    }
  };

  const sortedUsers = [...users]
    .filter(u => u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || u.email?.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (b.mochis || 0) - (a.mochis || 0));

  return (
    <div className="space-y-12">
      {/* MISSION EDITOR */}
      <div className="p-10 bg-brand-gray/30 rounded-[40px] border border-gray-100 space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-navy text-white rounded-2xl flex items-center justify-center shadow-lg">
            <Target size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight">Configurar Missão do Mês</h3>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Ritual mensal de engajamento</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Título da Missão</label>
            <input 
              type="text"
              value={mission.title}
              onChange={(e) => setMission({...mission, title: e.target.value})}
              placeholder="Ex: Indica 1 amigo"
              className="w-full h-14 px-6 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-navy font-bold text-brand-dark"
            />
          </div>
          <div className="space-y-2 lg:col-span-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Descrição</label>
            <input 
              type="text"
              value={mission.description}
              onChange={(e) => setMission({...mission, description: e.target.value})}
              placeholder="Descreva o que o membro precisa fazer"
              className="w-full h-14 px-6 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-navy font-bold text-brand-dark"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Mochis Bônus</label>
            <div className="relative">
              <Coins className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-green" size={18} />
              <input 
                type="number"
                value={mission.mochisBonus}
                onChange={(e) => setMission({...mission, mochisBonus: e.target.value})}
                className="w-full h-14 pl-14 pr-6 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-navy font-bold text-brand-dark"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Data de Encerramento</label>
            <div className="relative">
              <Clock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="date"
                value={mission.endDate}
                onChange={(e) => setMission({...mission, endDate: e.target.value})}
                className="w-full h-14 pl-14 pr-6 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-navy font-bold text-brand-dark"
              />
            </div>
          </div>
          <div className="flex items-end gap-4">
            <button 
              onClick={() => setMission({...mission, active: !mission.active})}
              className={`h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 transition-all ${mission.active ? 'bg-brand-green text-white' : 'bg-gray-200 text-gray-500'}`}
            >
              <Power size={16} /> {mission.active ? 'Ativa' : 'Inativa'}
            </button>
            <button 
              onClick={handleSaveMission}
              disabled={saving}
              className="flex-1 h-14 bg-brand-navy text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-brand-dark transition-all shadow-xl disabled:opacity-50"
            >
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={16} />}
              Salvar Missão
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
        <thead>
          <tr className="bg-brand-gray/50 text-[10px] uppercase tracking-[0.4em] font-black text-gray-400">
            <th className="px-12 py-8">Ranking / Membro</th>
            <th className="px-12 py-8">Mochis</th>
            <th className="px-12 py-8">Nível</th>
            <th className="px-12 py-8">Indicações</th>
            <th className="px-12 py-8">Status</th>
            <th className="px-12 py-8 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {sortedUsers.map((user, i) => (
            <tr key={user.uid} className="border-t border-gray-50 hover:bg-brand-gray/30 transition-all duration-500 group">
              <td className="px-12 py-10">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-black ${i === 0 ? 'bg-brand-yellow text-brand-navy' : i === 1 ? 'bg-gray-200 text-gray-500' : i === 2 ? 'bg-orange-100 text-orange-500' : 'bg-brand-gray text-gray-400'}`}>
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-display font-black text-lg text-brand-dark uppercase tracking-tighter">{user.name}</div>
                    <div className="text-[10px] text-gray-400 font-bold">{user.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-12 py-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-brand-green/10 rounded-lg flex items-center justify-center text-brand-green">
                    <Sparkles size={14} />
                  </div>
                  <div className="font-black text-brand-dark text-lg">{user.mochis || 0}</div>
                </div>
              </td>
              <td className="px-12 py-10">
                <div className="text-xs text-gray-500 font-medium">
                  {MOCHI_LEVELS.find(l => (user.mochis || 0) >= l.min && (user.mochis || 0) <= l.max)?.name || "Explorador"}
                </div>
              </td>
              <td className="px-12 py-10">
                <div className="text-xs text-gray-400 font-medium">Indicações: {user.indicacoesConfirmadas || 0}</div>
              </td>
              <td className="px-12 py-10">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                  user.is_vip ? 'bg-brand-green/10 text-brand-green border-brand-green/20' : 'bg-gray-100 text-gray-400 border-gray-200'
                }`}>
                  {user.is_vip ? 'VIP' : 'FREE'}
                </span>
              </td>
              <td className="px-12 py-10 text-right">
                <button 
                  onClick={() => onAdjustMochis(user.uid)}
                  className="bg-brand-navy text-white px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest hover:bg-brand-green transition-all shadow-lg"
                >
                  Ajustar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}
