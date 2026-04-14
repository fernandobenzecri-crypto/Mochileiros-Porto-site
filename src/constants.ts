/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const BRAND = {
  name: "Mochileiros Porto",
  tagline: "CONECTAR. PERTENCER. VIVER.",
  mission: "Mais que uma comunidade de imigrantes, somos a família que pudemos escolher que cresce a cada dia.",
  positioning: "Não somos uma agência de viagens. Somos um porto seguro para quem chegou sozinho e precisa pertencer a alguma coisa.",
  whatsapp: "+351 933 923 444",
  whatsappLink: "https://wa.me/351933923444",
  email: "tripsmochileirosporto@gmail.com",
  instagram: "@mochileirosporto",
  instagramLink: "https://instagram.com/mochileirosporto",
  founded: 2020,
  logo: "/logo.png",
  logoBW: "/logo-bw.png",
};

export const STATS = [
  { value: "500+", label: "Brasileiros impactados" },
  { value: "30+", label: "Excursões realizadas" },
  { value: "100+", label: "Eventos presenciais" },
  { value: "6 anos", label: "De comunidade ativa" },
  { value: "0", label: "Motivos para ficar sozinho" },
];

export const CALENDAR_2026 = [
  { id: "ourense-2026", date: "22 Abr", destination: "Termas Ourense", price: "€28", status: "Confirmado", type: "Excursão", poster: "https://picsum.photos/seed/ourense/400/600", spotsLeft: 8 },
  { id: "santiago-2026", date: "02 Mai", destination: "Santiago + Ponte de Lima", price: "€35", status: "Vagas Limitadas", type: "Excursão", poster: "https://picsum.photos/seed/santiago/400/600", spotsLeft: 12 },
  { id: "marrocos-2026", date: "12-16 Mai", destination: "Marrocos - Aventura no Deserto", price: "€180", status: "Confirmado", type: "Premium", poster: "https://picsum.photos/seed/morocco/400/600", spotsLeft: 4 },
  { id: "buda-2026", date: "10 Jul", destination: "Buda Eden + Nazaré", price: "€35", status: "Vagas Limitadas", type: "Excursão", poster: "https://picsum.photos/seed/buda/400/600", spotsLeft: 15 },
  { id: "madrid-2026", date: "10-12 Jul", destination: "Madrid + Parque Warner", price: "€180", status: "Confirmado", type: "Premium", poster: "https://picsum.photos/seed/madrid/400/600", spotsLeft: 6 },
  { id: "vigo-2026", date: "19 Jul", destination: "Praia do Samil - Vigo", price: "€25", status: "Confirmado", type: "Excursão", poster: "https://picsum.photos/seed/vigo/400/600", spotsLeft: 20 },
  { id: "geres-2026", date: "Jul-Set", destination: "Gerês + Cascatas", price: "€35", status: "Confirmado", type: "Excursão", poster: "https://picsum.photos/seed/geres/400/600", spotsLeft: 25 },
];

export const TESTIMONIALS = [
  {
    name: "Ana Paula",
    arrival: "2024",
    text: "Cheguei ao Porto em março sem conhecer ninguém. Em abril fui na primeira excursão com o Mochileiros. Em junho já tinha um grupo de amigos que vejo toda semana. Parece mentira, mas é real.",
    stars: 5,
  },
  {
    name: "Renata",
    arrival: "2023",
    text: "O grupo de mulheres da Camila mudou a minha relação com Portugal. Não é sobre viagens — é sobre pertencer.",
    stars: 5,
  },
];

export const ADVISORY_CATEGORIES = [
  {
    id: "docs",
    name: "Documentação Essencial",
    icon: "🗂️",
    tutorials: [
      { id: 1, title: "NIF – Número de Identificação Fiscal", desc: "Primeiro documento essencial para viver em Portugal. Obrigatório para quase tudo.", link: "https://portaldasfinancas.gov.pt" },
      { id: 2, title: "NISS – Número de Identificação da Segurança Social", desc: "Número essencial para trabalhar e ter direito a benefícios sociais.", link: "https://app.seg-social.pt" },
      { id: 3, title: "Atestado de Residência (Junta de Freguesia)", desc: "Como obter comprovativo oficial de residência na sua freguesia." },
    ]
  },
  {
    id: "health",
    name: "Saúde e SNS",
    icon: "🏥",
    tutorials: [
      { id: 4, title: "PB4 (CDAM) – Certificado de Assistência Médica", desc: "Passo a passo completo para obter o PB4 que garante acesso ao sistema de saúde português." },
      { id: 5, title: "Número de Utente (SNS) e Inscrição no Centro de Saúde", desc: "Registo no Serviço Nacional de Saúde para ter direito aos cuidados médicos." },
      { id: 6, title: "SNS24 – Conta e App do Serviço Nacional de Saúde", desc: "Plataforma digital para acesso aos serviços de saúde com o seu Número de Utente." },
      { id: 7, title: "CESD – Cartão Europeu de Seguro de Doença", desc: "Cartão para segurados da Segurança Social que viajam na UE/EEE/Suíça.", link: "https://app.seg-social.pt" },
    ]
  },
  {
    id: "work",
    name: "Trabalho e Impostos",
    icon: "💼",
    tutorials: [
      { id: 8, title: "Abertura de Atividade (Trabalhador Independente)", desc: "Como abrir atividade como freelancer ou prestador de serviços." },
      { id: 9, title: "Emprego com Contrato – Primeiros Passos", desc: "O que precisa saber ao começar a trabalhar com contrato em Portugal." },
      { id: 10, title: "IEFP – Inscrição, Emprego e Cursos", desc: "Como se inscrever no Instituto do Emprego para procurar trabalho e acessar formação.", link: "https://www.iefp.pt" },
      { id: 11, title: "Contabilidade Organizada vs Regime Simplificado", desc: "Guia completo para escolher o melhor regime contábil como trabalhador independente." },
      { id: 12, title: "Declaração Trimestral de IVA", desc: "Como preencher e submeter a declaração trimestral de IVA para trabalhadores independentes.", link: "https://portaldasfinancas.gov.pt" },
      { id: 13, title: "Dedução de Despesas Profissionais", desc: "Guia completo sobre quais despesas pode deduzir como trabalhador independente." },
      { id: 14, title: "Certidões de Inexistência de Dívida e Parcelamento", desc: "Como obter certidões das Finanças e Segurança Social e aderir a planos de pagamento.", hasSteps: true },
    ]
  },
  {
    id: "education",
    name: "Educação",
    icon: "🎓",
    tutorials: [
      { id: 15, title: "Equivalência do Ensino Médio (12.º) em Portugal", desc: "Guia completo para obter a equivalência do diploma brasileiro ao 12.º ano português." },
      { id: 16, title: "Reconhecimento de Diplomas de Nível Superior", desc: "Guia oficial para validar diploma universitário em Portugal através de 3 vias diferentes." },
      { id: 17, title: "Matrícula Escolar (Pré-escolar, Básica e Secundária)", desc: "Como matricular crianças e jovens no sistema educativo português." },
    ]
  },
  {
    id: "immigration",
    name: "Vistos e Imigração",
    icon: "✈️",
    tutorials: [
      { id: 18, title: "Visto de Procura de Trabalho (120 + 60 dias)", desc: "Permite entrar e permanecer em Portugal por 120 dias para procurar emprego, prorrogáveis por mais 60 dias." },
      { id: 19, title: "Carta Convite para Visitantes", desc: "Como fazer carta convite oficial para trazer familiares/amigos via AIMA.", link: "https://www.aima.gov.pt" },
      { id: 20, title: "Reagrupamento Familiar", desc: "Como trazer familiares para Portugal através da AIMA com documentação completa.", link: "https://www.aima.gov.pt" },
    ]
  },
  {
    id: "transport",
    name: "Transportes",
    icon: "🚌",
    tutorials: [
      { id: 21, title: "Cartão Andante (Transportes Grande Porto)", desc: "Como obter e usar o cartão de transportes públicos da Área Metropolitana do Porto.", link: "https://www.linhandante.com" },
      { id: 22, title: "Cartão Porto – 22 Viagens Grátis por Ano", desc: "Cartão gratuito da Câmara do Porto com 22 viagens Andante Z2 anuais para residentes.", link: "https://cartao.porto.pt" },
      { id: 23, title: "Passe Andante Gratuito para Jovens (4–23 anos)", desc: "Passes mensais gratuitos para estudantes até 23 anos na Área Metropolitana do Porto (desde jan/2024).", link: "https://portaldomunicipe.cm-porto.pt" },
    ]
  }
];

export const OFFICIAL_LINKS = [
  {
    category: "FINANÇAS E IMPOSTOS",
    links: [
      { label: "Portal das Finanças", url: "https://portaldasfinancas.gov.pt" }
    ]
  },
  {
    category: "SEGURANÇA SOCIAL",
    links: [
      { label: "Segurança Social Direta", url: "https://app.seg-social.pt" }
    ]
  },
  {
    category: "EMPREGO E FORMAÇÃO",
    links: [
      { label: "IEFP", url: "https://www.iefp.pt" }
    ]
  },
  {
    category: "IMIGRAÇÃO E VISTOS",
    links: [
      { label: "AIMA (ex-SEF)", url: "https://www.aima.gov.pt" }
    ]
  },
  {
    category: "TRANSPORTES PORTO",
    links: [
      { label: "Andante / Linho Andante", url: "https://www.linhandante.com" },
      { label: "Cartão Porto", url: "https://cartao.porto.pt" },
      { label: "Câmara Municipal Porto", url: "https://cm-porto.pt" }
    ]
  },
  {
    category: "NOTÍCIAS / LEGISLAÇÃO",
    links: [
      { label: "Diário da República", url: "https://diariodarepublica.pt/dr/detalhe/lei/61-2025-941547426" },
      { label: "Público Brasil (AIMA)", url: "https://www.publico.pt/2025/11/05/publico-brasil/noticia/aima-fechara-estrutura-missao-fim-ano-ampliara-quadro-funcionarios-2153513" },
      { label: "O Globo (Vistos)", url: "https://oglobo.globo.com/economia/noticia/2025/11/02/quer-trabalhar-em-portugal-veja-o-que-mudou-para-brasileiros-que-querem-morar-na-terrinha.ghtml" }
    ]
  }
];

export const LINKS = [
  { label: "💬 Comunidade WhatsApp", url: BRAND.whatsappLink, color: "bg-brand-green" },
  { label: "✈️ Próximas Viagens", url: "/viagens", color: "bg-brand-dark" },
  { label: "👑 Inscrição Clube VIP", url: "/clube-vip", color: "bg-brand-orange" },
  { label: "📸 Instagram @mochileirosporto", url: "https://instagram.com/mochileirosporto", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { label: "🎵 TikTok @mochileirosporto", url: "https://tiktok.com/@mochileirosporto", color: "bg-black" },
  { label: "📘 Facebook Mochileiros Porto", url: "https://facebook.com/mochileirosporto", color: "bg-[#1877F2]" },
  { label: "⚖️ Tutoriais de Imigração", url: "/assessoria", color: "bg-brand-dark" },
  { label: "🤝 Parcerias B2B", url: "/parcerias", color: "bg-brand-yellow", textColor: "text-brand-navy" },
  { label: "📧 Contato Email", url: `mailto:${BRAND.email}`, color: "bg-brand-navy" },
];

export const MOCHI_VALUES = {
  REFERRAL_SIGNUP: 200,
  REFERRAL_VIP: 500,
  VIP_RENEW: 150,
  TRIP_BOOKING: 100,
  SIGNUP_COMPLETE: 50,
  DAILY_LOGIN: 10,
};

export const MOCHI_LEVELS = [
  { 
    name: "Explorador", 
    min: 0, 
    max: 499, 
    color: "text-brand-green", 
    bg: "bg-brand-green/10",
    phrase: "Chegaste. E isso já diz muito sobre quem tu és.",
    unlock: "Guia do Imigrante premium"
  },
  { 
    name: "Trilheiro", 
    min: 500, 
    max: 1999, 
    color: "text-brand-navy", 
    bg: "bg-brand-navy/10",
    phrase: "Já sabes o caminho. E começas a abrir para outros.",
    unlock: "€15 desconto em excursão + badge no perfil"
  },
  { 
    name: "Guia", 
    min: 2000, 
    max: 4999, 
    color: "text-brand-orange", 
    bg: "bg-brand-orange/10",
    phrase: "A comunidade te conhece. A tua história inspira.",
    unlock: "Destaque no Instagram + entrada grátis na Toca"
  },
  { 
    name: "Lenda Mochileira", 
    min: 5000, 
    max: Infinity, 
    color: "text-brand-yellow", 
    bg: "bg-brand-yellow/10",
    phrase: "Não és mais membro. És parte da fundação desta história.",
    unlock: "Sessão 1:1 com o fundador + 2 meses VIP grátis + nome na Parede das Lendas"
  },
];

export const GALLERY_IMAGES = {
  termas: '/gallery/termas.jpg',
  ponteLima: '/gallery/ponte-lima.jpg',
  samba: '/gallery/samba.jpg',
  workshop: '/gallery/workshop.jpg',
  natal: '/gallery/natal.jpg',
  gerez: '/gallery/gerez.jpg',
  douro: '/gallery/douro.jpg',
  braga: '/gallery/braga.jpg',
  piquenique: '/gallery/piquenique.jpg',
  founders: '/founders.jpg',
  camila: '/camila.jpg',
  logo: '/logo.png',
  ogImage: '/og-image.jpg',
};
