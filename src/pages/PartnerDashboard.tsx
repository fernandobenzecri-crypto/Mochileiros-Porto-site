import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { 
  Users, 
  TrendingUp, 
  Star, 
  Calendar, 
  Clock, 
  ArrowUpRight,
  Loader2,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  ChevronRight,
  User
} from "lucide-react";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  limit,
  doc,
  getDoc
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PartnerDashboard() {
  const { id } = useParams();
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [partner, setPartner] = useState<any>(null);
  const [usages, setUsages] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalUsages: 0,
    uniqueMembers: 0,
    avgRating: 4.8,
    newMembers: 0
  });

  useEffect(() => {
    async function fetchPartnerData() {
      if (!id) return;
      setLoading(true);

      try {
        // 1. Get partner info
        const partnerDoc = await getDoc(doc(db, "partners", id));
        if (!partnerDoc.exists()) {
          // If not found, check if current user is a partner
          // For demo purposes, we'll allow access if the user is an admin
          if (profile?.role !== 'admin') {
            navigate("/");
            return;
          }
          setPartner({ nome: "Parceiro Demo", categoria: "Restaurante" });
        } else {
          setPartner(partnerDoc.data());
        }

        // 2. Get usages
        const usagesQuery = query(
          collection(db, "usages"),
          where("parceiroId", "==", id),
          orderBy("created_at", "desc"),
          limit(50)
        );
        const usagesSnap = await getDocs(usagesQuery);
        const usagesData = usagesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsages(usagesData);

        // 3. Calculate stats
        const uniqueUsers = new Set(usagesData.map((u: any) => u.userId)).size;
        setStats({
          totalUsages: usagesData.length,
          uniqueMembers: uniqueUsers,
          avgRating: 4.8,
          newMembers: Math.floor(uniqueUsers * 0.3) // Mocking new members
        });

      } catch (err) {
        console.error("Error fetching partner data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPartnerData();
  }, [id, profile, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-gray flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-brand-green" />
      </div>
    );
  }

  const chartData = [
    { name: 'Seg', value: 4 },
    { name: 'Ter', value: 7 },
    { name: 'Qua', value: 5 },
    { name: 'Qui', value: 8 },
    { name: 'Sex', value: 12 },
    { name: 'Sáb', value: 18 },
    { name: 'Dom', value: 15 },
  ];

  return (
    <div className="min-h-screen bg-brand-gray pt-32 pb-20 px-4">
      <Helmet>
        <title>Painel do Parceiro | {partner?.nome}</title>
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-brand-navy text-brand-green rounded-2xl flex items-center justify-center">
                <LayoutDashboard size={24} />
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-black text-brand-dark tracking-tighter uppercase leading-none">
                Painel do <span className="text-brand-green">Parceiro</span>
              </h1>
            </div>
            <p className="text-gray-500 font-medium text-lg">Bem-vindo, {partner?.nome}. Veja como sua parceria está performando.</p>
          </div>
          
          <button 
            onClick={() => logout()}
            className="flex items-center gap-3 text-gray-400 font-black uppercase tracking-widest text-[10px] hover:text-red-500 transition-colors"
          >
            Sair do Painel <LogOut size={16} />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Utilizações (Mês)", value: stats.totalUsages, icon: TrendingUp, color: "text-brand-green", trend: "+63%" },
            { label: "Membros Únicos", value: stats.uniqueMembers, icon: Users, color: "text-blue-500", trend: "+20%" },
            { label: "Avaliação Média", value: stats.avgRating, icon: Star, color: "text-yellow-500", trend: "Estável" },
            { label: "Novos Membros", value: stats.newMembers, icon: Calendar, color: "text-purple-500", trend: "Novo" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 relative overflow-hidden group"
            >
              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-start">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gray-50 ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <div className="text-[10px] font-black text-brand-green bg-brand-green/10 px-2 py-1 rounded-full">
                    {stat.trend}
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-display font-black text-brand-dark leading-none">{stat.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white p-10 rounded-[50px] shadow-2xl border border-gray-100 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight">Utilizações por Dia</h2>
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Últimos 7 dias</div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 900 }} 
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                  <Tooltip 
                    cursor={{ fill: '#f8f8f8' }}
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="value" fill="#2d7a4f" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-brand-navy p-10 rounded-[50px] shadow-2xl text-white space-y-8">
            <h2 className="text-2xl font-display font-black uppercase tracking-tight">Últimas Utilizações</h2>
            <div className="space-y-6">
              {usages.length > 0 ? usages.map((usage, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-brand-navy transition-all">
                      <User size={18} />
                    </div>
                    <div>
                      <div className="font-bold text-sm">{usage.userName}</div>
                      <div className="text-[10px] text-white/40 font-medium">{usage.data} às {usage.hora}</div>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-white/20 group-hover:text-brand-green transition-all" />
                </div>
              )) : (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-white/20">
                    <Clock size={32} />
                  </div>
                  <p className="text-white/40 text-xs font-medium uppercase tracking-widest">Nenhuma utilização recente</p>
                </div>
              )}
            </div>
            <button className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border border-white/10">
              Ver Histórico Completo
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white p-10 rounded-[50px] shadow-2xl border border-gray-100 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight">Últimas Avaliações</h2>
            <div className="flex items-center gap-2 text-yellow-500 font-black">
              <Star size={20} fill="currentColor" /> 4.8/5.0
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { user: "Ana Paula", rating: 5, comment: "Excelente atendimento e o desconto VIP foi aplicado sem problemas!" },
              { user: "Carlos Silva", rating: 4, comment: "Comida maravilhosa, recomendo muito para a comunidade." },
              { user: "Mariana Costa", rating: 5, comment: "O melhor parceiro do Porto, sempre muito atenciosos." }
            ].map((review, i) => (
              <div key={i} className="p-8 bg-brand-gray rounded-[32px] space-y-4">
                <div className="flex justify-between items-start">
                  <div className="font-bold text-brand-dark">{review.user}</div>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} className="text-yellow-500 fill-yellow-500" />)}
                  </div>
                </div>
                <p className="text-gray-500 text-xs font-medium leading-relaxed italic">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
