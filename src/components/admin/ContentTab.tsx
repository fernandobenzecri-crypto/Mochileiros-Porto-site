import React from "react";
import { MapPin, Euro, Edit3, Trash2, Home, Globe, Plus } from "lucide-react";
import SafeImage from "../SafeImage";

interface ContentTabProps {
  contentSubTab: "trips" | "events";
  setContentSubTab: (tab: "trips" | "events") => void;
  viagens: any[];
  eventos: any[];
  searchTerm: string;
  formatDate: (timestamp: any) => string;
  onToggleViagemAtiva: (trip: any) => void;
  onToggleEventoAtivo: (event: any) => void;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  tocaSettings: any;
  onUpdateTocaSettings: (e: React.FormEvent) => void;
}

export default function ContentTab({ 
  contentSubTab, 
  setContentSubTab, 
  viagens, 
  eventos, 
  searchTerm, 
  formatDate, 
  onToggleViagemAtiva, 
  onToggleEventoAtivo, 
  onEdit, 
  onDelete,
  tocaSettings,
  onUpdateTocaSettings
}: ContentTabProps) {
  return (
    <div className="space-y-0">
      <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-4">
          <button 
            onClick={() => setContentSubTab("trips")}
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${contentSubTab === "trips" ? "bg-brand-green text-white" : "bg-gray-100 text-gray-400"}`}
          >
            Viagens ({viagens.filter(v => v.ativo).length} ativas)
          </button>
          <button 
            onClick={() => setContentSubTab("events")}
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${contentSubTab === "events" ? "bg-brand-green text-white" : "bg-gray-100 text-gray-400"}`}
          >
            Eventos ({eventos.filter(e => e.ativo).length} ativos)
          </button>
          <button 
            onClick={() => onEdit(null)}
            className="px-6 py-2 bg-brand-navy text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-green transition-all shadow-lg flex items-center gap-2"
          >
            <Plus size={14} /> Adicionar {contentSubTab === "trips" ? "Viagem" : "Evento"}
          </button>
        </div>
        <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">
          Gestão de {contentSubTab === "trips" ? "Viagens" : "Eventos"}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-brand-gray/50 text-[10px] uppercase tracking-[0.4em] font-black text-gray-400">
              <th className="px-12 py-8">{contentSubTab === "trips" ? "Viagem" : "Evento"}</th>
              <th className="px-12 py-8">{contentSubTab === "trips" ? "Destino" : "Local/Link"}</th>
              <th className="px-12 py-8">{contentSubTab === "trips" ? "Preços" : "Data/Hora"}</th>
              <th className="px-12 py-8">{contentSubTab === "trips" ? "Vagas" : "Tipo"}</th>
              <th className="px-12 py-8">Status</th>
              <th className="px-12 py-8 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {contentSubTab === "trips" ? (
              viagens.filter(v => v.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) || v.destino?.toLowerCase().includes(searchTerm.toLowerCase())).map((trip) => (
                <tr key={trip.id} className="border-t border-gray-50 hover:bg-brand-gray/30 transition-all duration-500 group">
                  <td className="px-12 py-10">
                    <div className="flex items-center gap-4">
                      {trip.imagemUrl && (
                        <SafeImage src={trip.imagemUrl} className="w-12 h-12 rounded-xl object-cover shadow-lg" alt={trip.titulo} />
                      )}
                      <div>
                        <div className="font-display font-black text-lg text-brand-dark uppercase tracking-tighter">{trip.titulo}</div>
                        <div className="text-[10px] text-gray-400 font-bold">Partida: {formatDate(trip.dataPartida)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-12 py-10">
                    <div className="flex flex-col gap-1">
                      <div className="text-xs text-gray-500 font-medium flex items-center gap-1">
                        <MapPin size={12} className="text-brand-green" /> {trip.destino}
                      </div>
                      <span className={`inline-flex w-fit items-center px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                        trip.tipo === 'premium' ? 'bg-brand-orange/10 text-brand-orange border-brand-orange/20' : 'bg-brand-green/10 text-brand-green border-brand-green/20'
                      }`}>
                        {trip.tipo}
                      </span>
                    </div>
                  </td>
                  <td className="px-12 py-10">
                    <div className="space-y-1">
                      <div className="font-black text-brand-dark flex items-center gap-1">
                        <Euro size={12} className="text-gray-400" /> {trip.precoPublico} <span className="text-[8px] text-gray-400 uppercase">Público</span>
                      </div>
                      <div className="font-black text-brand-green flex items-center gap-1">
                        <Euro size={12} className="text-brand-green/40" /> {trip.precoVip} <span className="text-[8px] text-brand-green/60 uppercase">VIP</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-12 py-10">
                    <div className="font-black text-brand-dark">{trip.vagasDisponiveis} / {trip.vagasTotal}</div>
                    <div className="text-[8px] text-gray-400 uppercase font-bold">Vagas Disponíveis</div>
                  </td>
                  <td className="px-12 py-10">
                    <button 
                      onClick={() => onToggleViagemAtiva(trip)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${trip.ativo ? 'bg-brand-green' : 'bg-gray-200'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${trip.ativo ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                    <div className="text-[8px] text-gray-400 uppercase font-bold mt-1">{trip.ativo ? 'Publicada' : 'Inativa'}</div>
                  </td>
                  <td className="px-12 py-10 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => onEdit(trip)} className="p-3 bg-brand-navy/10 text-brand-navy rounded-2xl hover:bg-brand-navy hover:text-white transition-all">
                        <Edit3 size={18} />
                      </button>
                      <button onClick={() => onDelete(trip.id)} className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <>
                <tr className="bg-brand-navy/5">
                  <td colSpan={6} className="px-12 py-8">
                    <div className="bg-brand-navy p-8 rounded-[40px] text-white">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-brand-green/20 rounded-2xl flex items-center justify-center text-brand-green">
                            <Home size={24} />
                          </div>
                          <div>
                            <h3 className="text-xl font-display font-black uppercase tracking-tight">Ritual na Toca</h3>
                            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Configurações do Próximo Encontro</p>
                          </div>
                        </div>
                      </div>
                      <form onSubmit={onUpdateTocaSettings} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Data</label>
                          <input name="date" defaultValue={tocaSettings?.nextDate || ""} placeholder="Ex: 15 de Abril" className="w-full h-12 px-6 bg-white/5 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-brand-green border border-white/10" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Hora</label>
                          <input name="time" defaultValue={tocaSettings?.nextTime || ""} placeholder="Ex: 19:30" className="w-full h-12 px-6 bg-white/5 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-brand-green border border-white/10" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Local</label>
                          <input name="location" defaultValue={tocaSettings?.location || "Toca dos Mochileiros"} className="w-full h-12 px-6 bg-white/5 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-brand-green border border-white/10" />
                        </div>
                        <button type="submit" className="h-12 bg-brand-green text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-brand-dark transition-all shadow-lg">
                          Atualizar Ritual
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
                {eventos.filter(e => e.titulo?.toLowerCase().includes(searchTerm.toLowerCase())).map((event) => (
                  <tr key={event.id} className={`border-t border-gray-50 hover:bg-brand-gray/30 transition-all duration-500 group ${event.tipo === 'toca' ? 'bg-brand-green/5 border-l-4 border-l-brand-green' : ''}`}>
                    <td className="px-12 py-10">
                      <div className="flex items-center gap-4">
                        {event.imagemUrl && (
                          <SafeImage src={event.imagemUrl} className="w-12 h-12 rounded-xl object-cover shadow-lg" alt={event.titulo} />
                        )}
                        <div>
                          <div className="font-display font-black text-lg text-brand-dark uppercase tracking-tighter flex items-center gap-2">
                            {event.titulo}
                            {event.tipo === 'toca' && <span className="text-[8px] bg-brand-green text-white px-2 py-0.5 rounded-full">🏠 TOCA</span>}
                          </div>
                          <div className="text-[10px] text-gray-400 font-bold">{formatDate(event.data)} às {event.horario}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-12 py-10">
                      <div className="text-xs text-gray-500 font-medium flex items-center gap-1">
                        {event.tipo === 'online' ? <Globe size={12} className="text-blue-500" /> : <MapPin size={12} className="text-brand-green" />}
                        {event.tipo === 'online' ? event.linkOnline : event.local}
                      </div>
                    </td>
                    <td className="px-12 py-10">
                      <div className="font-black text-brand-dark">{event.gratuito ? "GRATUITO" : `€${event.precoPublico}`}</div>
                    </td>
                    <td className="px-12 py-10">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        event.tipo === 'toca' ? 'bg-brand-green/10 text-brand-green border-brand-green/20' :
                        event.tipo === 'online' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                        'bg-brand-navy/10 text-brand-navy border-brand-navy/20'
                      }`}>
                        {event.tipo}
                      </span>
                    </td>
                    <td className="px-12 py-10">
                      <button onClick={() => onToggleEventoAtivo(event)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${event.ativo ? 'bg-brand-green' : 'bg-gray-200'}`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${event.ativo ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </td>
                    <td className="px-12 py-10 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => onEdit(event)} className="p-3 bg-brand-navy/10 text-brand-navy rounded-2xl hover:bg-brand-navy hover:text-white transition-all">
                          <Edit3 size={18} />
                        </button>
                        <button onClick={() => onDelete(event.id)} className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
