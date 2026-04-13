import React from "react";
import { Mail, Phone, ExternalLink, Plus } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  email: string;
  phone?: string;
  category: string;
  benefit: string;
  active: boolean;
}

interface PartnersTabProps {
  partners: Partner[];
  searchTerm: string;
  onEdit: (partner: Partner) => void;
  onDelete: (id: string) => void;
}

export default function PartnersTab({ partners, searchTerm, onEdit, onDelete }: PartnersTabProps) {
  const filteredPartners = partners.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[1000px]">
        <thead>
          <tr className="bg-brand-gray/50 text-[10px] uppercase tracking-[0.4em] font-black text-gray-400">
            <th className="px-12 py-8">Parceiro</th>
            <th className="px-12 py-8">Categoria</th>
            <th className="px-12 py-8">Benefício</th>
            <th className="px-12 py-8">E-mail</th>
            <th className="px-12 py-8">Status</th>
            <th className="px-12 py-8 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {filteredPartners.map((partner) => (
            <tr key={partner.id} className="border-t border-gray-50 hover:bg-brand-gray/30 transition-all duration-500 group">
              <td className="px-12 py-10">
                <div className="font-display font-black text-lg text-brand-dark uppercase tracking-tighter">{partner.name}</div>
              </td>
              <td className="px-12 py-10">
                <span className="px-3 py-1 bg-brand-gray rounded-full text-[9px] font-black uppercase tracking-widest text-gray-500">
                  {partner.category}
                </span>
              </td>
              <td className="px-12 py-10">
                <div className="font-bold text-brand-green">{partner.benefit}</div>
              </td>
              <td className="px-12 py-10">
                <div className="flex items-center gap-2 text-gray-500 font-medium">
                  <Mail size={14} /> {partner.email}
                </div>
              </td>
              <td className="px-12 py-10">
                <div className={`w-2 h-2 rounded-full ${partner.active ? 'bg-green-500' : 'bg-gray-300'}`} />
              </td>
              <td className="px-12 py-10 text-right">
                <button 
                  onClick={() => onEdit(partner)}
                  className="p-3 bg-brand-navy/10 text-brand-navy rounded-2xl hover:bg-brand-navy hover:text-white transition-all"
                >
                  <ExternalLink size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
