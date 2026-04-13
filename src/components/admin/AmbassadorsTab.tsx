import React from "react";
import { Crown, Calendar, User, CheckCircle2, XCircle, Star, UserPlus, Users, Trophy } from "lucide-react";
import { UserProfile } from "../../firebase";

interface AmbassadorsTabProps {
  ambassadorSubTab: "applications" | "active" | "ranking";
  setAmbassadorSubTab: (tab: "applications" | "active" | "ranking") => void;
  ambassadorApps: any[];
  users: UserProfile[];
  onApprove: (app: any) => void;
  onReject: (appId: string) => void;
  formatDate: (timestamp: any) => string;
  tocaSettings: any;
  tocaMeeting: any;
  onAddHost: (e: React.FormEvent) => void;
  onRemoveHost: (uid: string) => void;
  onAwardHost: (uid: string) => void;
}

export default function AmbassadorsTab({
  ambassadorSubTab,
  setAmbassadorSubTab,
  ambassadorApps,
  users,
  onApprove,
  onReject,
  formatDate,
  tocaSettings,
  tocaMeeting,
  onAddHost,
  onRemoveHost,
  onAwardHost
}: AmbassadorsTabProps) {
  const activeAmbassadors = users.filter(u => u.tipoMembro === 'embaixador');

  return (
    <div className="space-y-0">
      <div className="p-8 border-b border-gray-50 flex gap-4">
        <button 
          onClick={() => setAmbassadorSubTab("applications")}
          className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${ambassadorSubTab === "applications" ? "bg-brand-green text-white" : "bg-gray-100 text-gray-400"}`}
        >
          Candidaturas ({ambassadorApps.filter(a => a.status === 'pendente').length})
        </button>
        <button 
          onClick={() => setAmbassadorSubTab("active")}
          className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${ambassadorSubTab === "active" ? "bg-brand-green text-white" : "bg-gray-100 text-gray-400"}`}
        >
          Ativos ({activeAmbassadors.length})
        </button>
        <button 
          onClick={() => setAmbassadorSubTab("ranking")}
          className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${ambassadorSubTab === "ranking" ? "bg-brand-green text-white" : "bg-gray-100 text-gray-400"}`}
        >
          Ranking e Recompensas
        </button>
      </div>

      <div className="overflow-x-auto">
        {ambassadorSubTab === "applications" ? (
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-brand-gray/50 text-[10px] uppercase tracking-[0.4em] font-black text-gray-400">
                <th className="px-12 py-8">Candidato</th>
                <th className="px-12 py-8">Motivação</th>
                <th className="px-12 py-8">Tempo PT</th>
                <th className="px-12 py-8">WhatsApp</th>
                <th className="px-12 py-8">Data</th>
                <th className="px-12 py-8 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {ambassadorApps.filter(a => a.status === 'pendente').map((app) => (
                <tr key={app.id} className="border-t border-gray-50 hover:bg-brand-gray/30 transition-all duration-500 group">
                  <td className="px-12 py-10">
                    <div className="font-display font-black text-lg text-brand-dark uppercase tracking-tighter">{app.name}</div>
                    <div className="text-[10px] text-gray-400 font-bold">{app.email}</div>
                  </td>
                  <td className="px-12 py-10">
                    <div className="text-xs text-gray-500 font-medium max-w-xs truncate" title={app.motivation}>{app.motivation}</div>
                  </td>
                  <td className="px-12 py-10">
                    <div className="text-xs text-brand-dark font-bold">{app.timeInPortugal}</div>
                  </td>
                  <td className="px-12 py-10">
                    <div className="text-xs text-gray-500 font-medium">{app.whatsapp}</div>
                  </td>
                  <td className="px-12 py-10">
                    <div className="text-xs text-gray-400 font-bold">{formatDate(app.createdAt)}</div>
                  </td>
                  <td className="px-12 py-10 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => onApprove(app)} className="p-3 bg-brand-green/10 text-brand-green rounded-2xl hover:bg-brand-green hover:text-white transition-all">
                        <CheckCircle2 size={18} />
                      </button>
                      <button onClick={() => onReject(app.id)} className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                        <XCircle size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : ambassadorSubTab === "active" ? (
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-brand-gray/50 text-[10px] uppercase tracking-[0.4em] font-black text-gray-400">
                <th className="px-12 py-8">Embaixador</th>
                <th className="px-12 py-8">Meta Atual</th>
                <th className="px-12 py-8">Pontos</th>
                <th className="px-12 py-8">Indicações</th>
                <th className="px-12 py-8">Acompanhados</th>
                <th className="px-12 py-8 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {activeAmbassadors.map((amb) => (
                <tr key={amb.uid} className="border-t border-gray-50 hover:bg-brand-gray/30 transition-all duration-500 group">
                  <td className="px-12 py-10">
                    <div className="font-display font-black text-lg text-brand-dark uppercase tracking-tighter">{amb.name}</div>
                    <div className="text-[10px] text-gray-400 font-bold">{amb.email}</div>
                  </td>
                  <td className="px-12 py-10">
                    <span className="px-3 py-1 bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 rounded-full text-[9px] font-black uppercase tracking-widest">
                      {amb.metaAtual || 'Básica'}
                    </span>
                  </td>
                  <td className="px-12 py-10 font-bold text-brand-dark">{amb.points || 0}</td>
                  <td className="px-12 py-10 font-bold text-brand-green">{amb.indicacoesConfirmadas || 0}</td>
                  <td className="px-12 py-10 font-bold text-blue-500">{amb.membrosAcompanhados || 0}</td>
                  <td className="px-12 py-10 text-right">
                    <button className="text-[10px] font-black uppercase tracking-widest text-brand-navy hover:text-brand-green">Detalhes</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-12 space-y-12">
            {/* Toca Meeting Management */}
            <div className="bg-brand-navy p-10 rounded-[50px] text-white">
              <div className="flex justify-between items-center mb-10">
                <div className="space-y-1">
                  <h3 className="text-2xl font-display font-black uppercase tracking-tight">Anfitriões da Toca</h3>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Próximo Ritual: {tocaSettings?.nextDate || 'TBD'}</p>
                </div>
                <div className="w-12 h-12 bg-brand-green/20 rounded-2xl flex items-center justify-center text-brand-green">
                  <Star size={24} />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Adicionar Anfitrião</h4>
                  <form onSubmit={onAddHost} className="flex gap-4">
                    <select name="userId" className="flex-grow h-14 px-6 bg-white/5 rounded-2xl font-bold border border-white/10 focus:ring-2 focus:ring-brand-green outline-none">
                      <option value="" className="bg-brand-navy">Selecionar Embaixador...</option>
                      {activeAmbassadors.map(amb => (
                        <option key={amb.uid} value={amb.uid} className="bg-brand-navy">{amb.name}</option>
                      ))}
                    </select>
                    <button type="submit" className="px-8 bg-brand-green text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-brand-dark transition-all">
                      Adicionar
                    </button>
                  </form>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Anfitriões Escalados</h4>
                  <div className="space-y-3">
                    {tocaMeeting?.hosts && Object.entries(tocaMeeting.hosts).map(([uid, host]: [string, any]) => (
                      <div key={uid} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-brand-green/20 rounded-xl flex items-center justify-center text-brand-green">
                            <User size={20} />
                          </div>
                          <div>
                            <div className="font-bold text-sm">{host.name}</div>
                            <div className="text-[8px] font-black uppercase tracking-widest text-white/30">
                              {host.awarded ? 'Pontuação Atribuída' : 'Aguardando Ritual'}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {!host.awarded && (
                            <button onClick={() => onAwardHost(uid)} className="p-2 bg-brand-green/20 text-brand-green rounded-lg hover:bg-brand-green hover:text-white transition-all">
                              <Trophy size={14} />
                            </button>
                          )}
                          <button onClick={() => onRemoveHost(uid)} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                            <XCircle size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
