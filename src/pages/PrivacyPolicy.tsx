import React from "react";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-brand-gray pt-32 pb-20 px-4">
      <SEOHead
        title="Política de Privacidade"
        description="Política de privacidade e proteção de dados do Mochileiros Porto, em conformidade com o RGPD."
        url="https://mochileirosporto.com/politica-de-privacidade"
      />
      <Helmet>
        <title>Política de Privacidade | Mochileiros Porto</title>
        <meta name="description" content="Saiba como protegemos seus dados na comunidade Mochileiros Porto." />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-brand-green font-black uppercase tracking-widest text-[10px] mb-8 hover:underline">
          <ArrowLeft size={14} /> Voltar ao Início
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-16 rounded-[60px] shadow-2xl border border-gray-100"
        >
          <div className="w-20 h-20 bg-brand-green/10 rounded-3xl flex items-center justify-center text-brand-green mb-10">
            <Shield size={40} />
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-black text-brand-dark tracking-tighter uppercase mb-8">
            Política de <span className="text-brand-green">Privacidade</span>
          </h1>

          <div className="prose prose-lg max-w-none text-gray-600 space-y-8 font-medium">
            <section>
              <h2 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight mb-4">1. Introdução</h2>
              <p>
                A comunidade Mochileiros Porto valoriza a sua privacidade. Esta política descreve como recolhemos, utilizamos e protegemos as suas informações pessoais de acordo com o Regulamento Geral sobre a Proteção de Dados (RGPD).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight mb-4">2. Dados que Recolhemos</h2>
              <p>Recolhemos informações que nos fornece diretamente ao:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Criar uma conta (nome, e-mail, palavra-passe);</li>
                <li>Completar o seu perfil (WhatsApp, bairro, foto);</li>
                <li>Subscrever o VIP Club (dados de faturação processados de forma segura pelo Stripe);</li>
                <li>Candidatar-se ao programa de Embaixadores.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight mb-4">3. Finalidade do Tratamento</h2>
              <p>Os seus dados são utilizados para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Gerir a sua conta e acesso à plataforma;</li>
                <li>Processar pagamentos e benefícios VIP;</li>
                <li>Enviar comunicações sobre eventos e atualizações da comunidade;</li>
                <li>Melhorar a experiência do utilizador no site.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight mb-4">4. Partilha de Dados</h2>
              <p>
                Não vendemos os seus dados a terceiros. Partilhamos informações apenas com prestadores de serviços essenciais, como o Stripe (pagamentos) e Firebase (armazenamento de dados), que cumprem rigorosas normas de segurança.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight mb-4">5. Os Seus Direitos</h2>
              <p>
                Ao abrigo do RGPD, tem o direito de aceder, retificar, exportar ou solicitar a eliminação dos seus dados pessoais. Para exercer estes direitos, contacte-nos através do e-mail oficial da comunidade.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight mb-4">6. Cookies</h2>
              <p>
                Utilizamos cookies técnicos essenciais para manter a sua sessão ativa e cookies analíticos anónimos para compreender como o site é utilizado.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight mb-4">7. Atualizações</h2>
              <p>
                Esta política pode ser atualizada periodicamente. Recomendamos a consulta regular desta página.
              </p>
              <p className="mt-8 text-sm text-gray-400">Última atualização: 10 de Abril de 2026</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
