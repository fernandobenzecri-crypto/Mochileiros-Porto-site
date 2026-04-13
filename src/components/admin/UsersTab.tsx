import React from "react";
import { Crown, Mail, Calendar, ShieldCheck, ShieldAlert, Coins } from "lucide-react";
import { UserProfile } from "../../firebase";

interface UsersTabProps {
  users: UserProfile[];
  searchTerm: string;
  onToggleVip: (userId: string, currentStatus: boolean) => void;
  formatDate: (timestamp: any) => string;
}

export default function UsersTab({ users, searchTerm, onToggleVip, formatDate }: UsersTabProps) {
  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[1000px]">
        <thead>
          <tr className="bg-brand-gray/50 text-[10px] uppercase tracking-[0.4em] font-black text-gray-400">
            <th className="px-12 py-8">Membro</th>
            <th className="px-12 py-8">E-mail</th>
            <th className="px-12 py-8">Plano</th>
            <th className="px-12 py-8">Pagamento</th>
            <th className="px-12 py-8">Mochis</th>
            <th className="px-12 py-8 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {filteredUsers.map((user) => (
            <tr key={user.uid} className="border-t border-gray-50 hover:bg-brand-gray/30 transition-all duration-500 group">
              <td className="px-12 py-10">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-display font-black text-lg ${user.is_vip ? 'bg-brand-navy text-brand-green' : 'bg-brand-gray text-gray-400'}`}>
                    {user.name?.charAt(0)}
                  </div>
                  <div>
                    <div className="font-display font-black text-lg text-brand-dark uppercase tracking-tighter flex items-center gap-2">
                      {user.name}
                      {user.tipoMembro === 'embaixador' && <ShieldCheck size={14} className="text-brand-green" />}
                    </div>
                    <div className="text-[10px] text-gray-400 font-bold">Membro desde {formatDate(user.created_at)}</div>
                  </div>
                </div>
              </td>
              <td className="px-12 py-10">
                <div className="flex items-center gap-2 text-gray-500 font-medium">
                  <Mail size={14} /> {user.email}
                </div>
              </td>
              <td className="px-12 py-10">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                  user.is_vip ? 'bg-brand-green/10 text-brand-green border-brand-green/20' : 'bg-gray-100 text-gray-400 border-gray-200'
                }`}>
                  {user.is_vip ? (user.plan_type || 'VIP') : 'Explorador'}
                </span>
              </td>
              <td className="px-12 py-10">
                <div className="flex items-center gap-2">
                  {user.last_payment_status === 'paid' ? (
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                  ) : (
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                  )}
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    {user.last_payment_status === 'paid' ? 'Em dia' : 'Pendente'}
                  </span>
                </div>
              </td>
              <td className="px-12 py-10">
                <div className="flex items-center gap-2">
                  <Coins size={14} className="text-brand-green" />
                  <span className="font-bold text-brand-dark">{user.mochis || 0}</span>
                </div>
              </td>
              <td className="px-12 py-10 text-right">
                <button 
                  onClick={() => onToggleVip(user.uid, user.is_vip || false)}
                  className={`px-6 py-2 rounded-full text-[8px] font-black uppercase tracking-widest transition-all shadow-lg ${
                    user.is_vip ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-brand-green text-white hover:bg-brand-dark'
                  }`}
                >
                  {user.is_vip ? 'Remover VIP' : 'Tornar VIP'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
