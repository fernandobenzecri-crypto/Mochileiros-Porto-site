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

export const TUTORIALS = {
  public: [
    {
      title: 'Como Obter o NIF em Portugal',
      category: 'Documentação',
      description: 'Guia completo passo a passo para solicitar seu Número de Identificação Fiscal. Saiba quais documentos você precisa, onde solicitar e como usar seu NIF.',
      icon: '📋',
      url: 'https://eportugal.gov.pt/servicos/pedir-o-numero-de-identificacao-fiscal-para-pessoa-singular',
      details: [
        'Documentação necessária e onde conseguir',
        'Agendamento online na Autoridade Tributária',
        'Prazos de processamento atualizados',
        'Como usar seu NIF em bancos e empresas'
      ],
      links: [
        { label: "Portal das Finanças", url: "https://www.portaldasfinancas.gov.pt/" },
        { label: "Pedir NIF Online (ePortugal)", url: "https://eportugal.gov.pt/servicos/pedir-o-numero-de-identificacao-fiscal-para-pessoa-singular" },
        { label: "Lista de Balcões AT", url: "https://info.portaldasfinancas.gov.pt/pt/dgci/servicos_at/Paginas/default.aspx" }
      ]
    },
    {
      title: 'Processo AIMA Explicado',
      category: 'Imigração',
      description: 'Entenda o processo de autorização de residência passo a passo: documentos, agendamento, entrevista e prazos atualizados.',
      icon: '🏛️',
      url: 'https://aima.gov.pt/pt',
      details: [
        'Documentos necessários para AIMA',
        'Como agendar entrevista online',
        'O que esperar na entrevista',
        'Prazos de processamento (2026)'
      ],
      links: [
        { label: "Site Oficial AIMA", url: "https://aima.gov.pt/pt" },
        { label: "Portal de Agendamento", url: "https://aima.gov.pt/pt/agendamentos" },
        { label: "Checklist de Documentos", url: "https://aima.gov.pt/pt/vistos-e-autorizacoes" }
      ]
    },
    {
      title: 'Cartão Porto - 22 Viagens Grátis',
      category: 'Transportes',
      description: 'Como obter o benefício de mobilidade gratuita no Porto para residentes. Economize no transporte público local.',
      icon: '🚌',
      url: 'https://cartao.porto.pt/',
      details: [
        'Requisitos para o Cartão Porto',
        'Onde e como solicitar o benefício',
        'Zonas abrangidas (Z2)',
        'Validade e renovação anual'
      ],
      links: [
        { label: "Site Cartão Porto", url: "https://cartao.porto.pt/" },
        { label: "Rede de Transportes STCP", url: "https://www.stcp.pt/" },
        { label: "Mapa de Zonas Andante", url: "https://linhandante.com/tarifario/" }
      ]
    },
    {
      title: 'Sistema de Saúde (SNS)',
      category: 'Saúde',
      description: 'Como acessar o Serviço Nacional de Saúde como imigrante. Registro no centro de saúde e obtenção do número de utente.',
      icon: '⚕️',
      url: 'https://www.sns.gov.pt/',
      details: [
        'Como se registrar no SNS',
        'Encontrar seu médico de família',
        'Marcar consultas e prescrições',
        'Saúde privada vs. pública'
      ],
      links: [
        { label: "Portal do SNS", url: "https://www.sns.gov.pt/" },
        { label: "Localizador de Centros de Saúde", url: "https://www.sns.gov.pt/sns/pesquisa-de-entidades/" },
        { label: "Guia do Utente Estrangeiro", url: "https://www.sns24.gov.pt/guia/utente-estrangeiro/" }
      ]
    },
    {
      title: 'Como obter o NISS',
      category: 'Documentação',
      description: 'O Número de Identificação de Segurança Social é essencial para trabalhar e contribuir em Portugal. Saiba como pedir o seu.',
      icon: '💳',
      url: 'https://www.seg-social.pt/pedido-de-niss',
      details: [
        'Documentos para cidadãos estrangeiros',
        'Formulário online de pedido de NISS',
        'Prazos de atribuição do número',
        'Como consultar seu extrato de remunerações'
      ],
      links: [
        { label: "Segurança Social Direta", url: "https://app.seg-social.pt/ptss/" },
        { label: "Formulário NISS Estrangeiro", url: "https://www.seg-social.pt/pedido-de-niss" },
        { label: "Guia Prático NISS", url: "https://www.seg-social.pt/guias-praticos" }
      ]
    },
  ],
  vip: [
    {
      title: 'Otimização Fiscal Avançada',
      category: 'Impostos',
      description: 'Estratégias legais para otimizar seus impostos. Aprenda sobre deduções, RNH e como estruturar sua declaração para economizar.',
      icon: '💰',
      url: 'https://info.portaldasfinancas.gov.pt/pt/apoio_contribuinte/Folhetos_informativos/Documents/Non_regular_residents_Tax_regime.pdf',
      details: [
        'Regime de Residente Não Habitual (RNH)',
        'Deduções fiscais permitidas',
        'Estruturação de declaração de impostos',
        'Prazos fiscais importantes (IRS, IVA)'
      ],
      links: [
        { label: "Guia RNH Oficial", url: "https://info.portaldasfinancas.gov.pt/pt/apoio_contribuinte/Folhetos_informativos/Documents/Non_regular_residents_Tax_regime.pdf" },
        { label: "Simulador de IRS", url: "https://www.doutorfinancas.pt/simulador-irs-2025/" }
      ]
    },
    {
      title: 'Registro de Empresa em Portugal',
      category: 'Negócios',
      description: 'Guia para abrir seu próprio negócio. Tipos de empresas, registro na Conservatória e obtenção de NIF empresarial.',
      icon: '🏢',
      url: 'https://eportugal.gov.pt/servicos/criar-uma-empresa-na-hora',
      details: [
        'Tipos de empresas: Unipessoal, Lda, SA',
        'Processo de registro na Conservatória',
        'Abertura de conta bancária empresarial',
        'Subsídios para novos negócios'
      ],
      links: [
        { label: "Empresa na Hora", url: "https://eportugal.gov.pt/servicos/criar-uma-empresa-na-hora" },
        { label: "Portal da Empresa", url: "https://eportugal.gov.pt/espaco-empresa" },
        { label: "Segurança Social Direta", url: "https://app.seg-social.pt/ptss/" }
      ]
    },
    {
      title: 'Vistos de Investimento e D7',
      category: 'Vistos',
      description: 'Informações detalhadas sobre vistos de investimento e renda passiva. Valores mínimos, setores elegíveis e benefícios.',
      icon: '📈',
      url: 'https://vistos.mne.gov.pt/pt/vistos-nacionais/documentacao-instrutoria/residencia',
      details: [
        'Golden Visa e Visto D7',
        'Setores elegíveis e requisitos',
        'Benefícios de residência familiar',
        'Caminho para cidadania portuguesa'
      ],
      links: [
        { label: "Portal de Vistos MNE", url: "https://vistos.mne.gov.pt/pt/" },
        { label: "Invest in Portugal", url: "https://www.portugalglobal.pt/PT/InvestirPortugal/Paginas/InvestirPortugal.aspx" }
      ]
    },
  ],
};

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
