import React from "react";
import { Mail, Phone, Calendar, ExternalLink } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  whatsapp?: string;
  service?: string;
  createdAt: any;
}

interface LeadsTabProps {
  leads: Lead[];
  searchTerm: string;
  formatDate: (timestamp: any) => string;
}

export default function LeadsTab({ leads, searchTerm, formatDate }: LeadsTabProps) {
  const filteredLeads = leads.filter(l => 
    l.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[1000px]">
        <thead>
          <tr className="bg-brand-gray/50 text-[10px] uppercase tracking-[0.4em] font-black text-gray-400">
            <th className="px-12 py-8">Lead</th>
            <th className="px-12 py-8">E-mail</th>
            <th className="px-12 py-8">WhatsApp</th>
            <th className="px-12 py-8">Serviço</th>
            <th className="px-12 py-8">Data</th>
            <th className="px-12 py-8 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {filteredLeads.map((lead) => (
            <tr key={lead.id} className="border-t border-gray-50 hover:bg-brand-gray/30 transition-all duration-500 group">
              <td className="px-12 py-10">
                <div>
                  <div className="font-display font-black text-lg text-brand-dark uppercase tracking-tighter">{lead.name}</div>
                </div>
              </td>
              <td className="px-12 py-10">
                <div className="flex items-center gap-2 text-gray-500 font-medium">
                  <Mail size={14} /> {lead.email}
                </div>
              </td>
              <td className="px-12 py-10">
                <div className="flex items-center gap-2 text-gray-500 font-medium">
                  <Phone size={14} /> {lead.whatsapp || 'N/A'}
                </div>
              </td>
              <td className="px-12 py-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-brand-navy/10 text-brand-navy border border-brand-navy/20">
                  {lead.service || 'Geral'}
                </span>
              </td>
              <td className="px-12 py-10">
                <div className="text-xs text-gray-400 font-bold">{formatDate(lead.createdAt)}</div>
              </td>
              <td className="px-12 py-10 text-right">
                <a 
                  href={`mailto:${lead.email}`}
                  className="p-3 bg-brand-navy/10 text-brand-navy rounded-2xl hover:bg-brand-navy hover:text-white transition-all inline-flex"
                >
                  <ExternalLink size={18} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
