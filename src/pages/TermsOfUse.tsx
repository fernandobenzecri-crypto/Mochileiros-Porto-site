import React from "react";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-brand-gray pt-32 pb-20 px-4">
      <SEOHead
        title="Termos de Uso"
        description="Termos e condições de uso da plataforma Mochileiros Porto."
        url="https://mochileirosporto.com/termos-de-uso"
      />
      <Helmet>
        <title>Termos de Uso | Mochileiros Porto</title>
        <meta name="description" content="Termos e condições de participação na comunidade Mochileiros Porto." />
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
          <div className="w-20 h-20 bg-brand-yellow/10 rounded-3xl flex items-center justify-center text-brand-yellow mb-10">
            <FileText size={40} />
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-black text-brand-dark tracking-tighter uppercase mb-8">
            Termos de <span className="text-brand-yellow">Uso</span>
          </h1>

          <div className="prose prose-lg max-w-none text-gray-600 space-y-8 font-medium">
            <section>
              <h2 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight mb-4">1. Aceitação dos Termos</h2>
              <p>
                Ao aceder e utilizar a plataforma Mochileiros Porto, concorda em cumprir e estar vinculado aos seguintes termos e condições. Se não concordar com qualquer parte destes termos, não deverá utilizar os nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight mb-4">2. Elegibilidade</h2>
              <p>
                A nossa plataforma destina-se a pessoas com 18 anos ou mais que residam ou pretendam residir no Porto, Portugal, e que desejam integrar-se na comunidade local.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight mb-4">3. VIP Club e Pagamentos</h2>
              <p>
                O VIP Club é um serviço de subscrição pago. Ao subscrever, autoriza a cobrança recorrente no método de pagamento escolhido. Pode cancelar a sua subscrição a qualquer momento através do seu painel de membro, mantendo o acesso até ao final do período já pago. Não efetuamos reembolsos parciais.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight mb-4">4. Código de Conduta</h2>
              <p>
                Os membros comprometem-se a manter uma postura respeitosa em todos os eventos presenciais e interações digitais. Comportamentos discriminatórios, assédio ou spam resultarão na expulsão imediata da comunidade sem direito a reembolso.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight mb-4">5. Responsabilidade</h2>
              <p>
                A Mochileiros Porto facilita a conexão entre membros e parceiros, mas não se responsabiliza por incidentes ocorridos em eventos de terceiros ou por falhas na prestação de serviços de parceiros comerciais.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight mb-4">6. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo do site, incluindo logotipos, textos e design, é propriedade da Mochileiros Porto e não pode ser reproduzido sem autorização prévia.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight mb-4">7. Modificações</h2>
              <p>
                Reservamo-nos o direito de alterar estes termos a qualquer momento. As alterações entram em vigor assim que publicadas no site.
              </p>
              <p className="mt-8 text-sm text-gray-400">Última atualização: 10 de Abril de 2026</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
