export const company = {
  name: "Comboflex Metalúrgica",
  shortName: "Comboflex",
  tagline: "Componentes metálicos para cadeiras de escritório",
  city: "Jaú",
  state: "SP",
  address: "R. José Massucato, 2020 – Jardim Orlando Chesini Ometto, Jaú – SP, CEP 17212-640",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=R.+Jos%C3%A9+Massucato+2020+Ja%C3%BA+SP",
  phones: [
    { label: "Comercial – Fabricantes", number: "(14) 99714-5826", digits: "5514997145826" },
    { label: "Comercial – Lojistas e Revendas", number: "(14) 99720-9248", digits: "5514997209248" },
  ],
  email: "comercial@comboflex.com.br",
  instagram: "https://www.instagram.com/comboflexmetalurgica",
  founded: 2016,
  yearsInMarket: 8,
  hours: "Segunda a sexta, das 7h30 às 17h30",
};

export function whatsappLink(digits: string, text: string) {
  return `https://api.whatsapp.com/send?phone=${digits}&text=${encodeURIComponent(text)}`;
}

export type Representative = {
  id: string;
  name: string;
  companyName: string;
  states: string[];
  regionLabel: string;
  whatsapp: string;
  whatsappDigits: string;
  email?: string;
};

export const representatives: Representative[] = [
  {
    id: "gs-sp",
    name: "Sergio Arribabem",
    companyName: "G&S Representações",
    states: ["SP"],
    regionLabel: "São Paulo",
    whatsapp: "(19) 98149-4222",
    whatsappDigits: "5519981494222",
  },
  {
    id: "wss-es",
    name: "Wellington de Souza Santos",
    companyName: "WSS Vendas",
    states: ["ES"],
    regionLabel: "Espírito Santo",
    whatsapp: "(27) 99242-3354",
    whatsappDigits: "5527992423354",
    email: "vendas.wss5.0@gmail.com",
  },
  {
    id: "bpk-rn",
    name: "Breno Palovsck",
    companyName: "BPK Representações",
    states: ["RN", "PB", "PE"],
    regionLabel: "Rio Grande do Norte, Paraíba e Pernambuco",
    whatsapp: "(84) 98832-0984",
    whatsappDigits: "5584988320984",
    email: "bpkrepresentacoes@gmail.com",
  },
  {
    id: "bsv-mg",
    name: "Bruno Valentim",
    companyName: "BSV Comércio e Representações",
    states: ["MG"],
    regionLabel: "Minas Gerais",
    whatsapp: "(31) 98727-6009",
    whatsappDigits: "5531987276009",
    email: "bruno@bsvcomercial.com.br",
  },
  {
    id: "hub-ne",
    name: "Robson Silva",
    companyName: "Corporate HUB",
    states: ["CE", "PI", "MA"],
    regionLabel: "Ceará, Piauí e Maranhão",
    whatsapp: "(85) 98163-5891",
    whatsappDigits: "5585981635891",
  },
  {
    id: "hub-norte",
    name: "Ed Júnior",
    companyName: "Corporate HUB",
    states: ["AC", "AM", "RR", "PA", "RO", "TO", "AP"],
    regionLabel: "Região Norte",
    whatsapp: "(92) 98636-6765",
    whatsappDigits: "5592986366765",
  },
  {
    id: "hub-rs",
    name: "Marcelo Freire",
    companyName: "Corporate HUB",
    states: ["RS"],
    regionLabel: "Rio Grande do Sul",
    whatsapp: "(54) 99918-1837",
    whatsappDigits: "5554999181837",
  },
  {
    id: "acr-rs",
    name: "Antônio Comerlato",
    companyName: "ACR Representações",
    states: ["RS", "SC"],
    regionLabel: "Rio Grande do Sul e Santa Catarina",
    whatsapp: "(51) 99117-2027",
    whatsappDigits: "5551991172027",
    email: "acrtoni@gmail.com",
  },
];

/** Atendimento direto da fábrica para estados sem representante exclusivo. */
export const factoryRep: Representative = {
  id: "fabrica",
  name: "Equipe Comercial Comboflex",
  companyName: "Comboflex Metalúrgica – Jaú/SP",
  states: ["PR", "RJ", "GO", "MT", "MS", "DF", "BA", "SE", "AL"],
  regionLabel: "Demais estados – atendimento direto da fábrica",
  whatsapp: "(14) 99714-5826",
  whatsappDigits: "5514997145826",
  email: "comercial@comboflex.com.br",
};

export const brazilianStates = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
  "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

export function findRepresentativeForState(state?: string | null): Representative {
  if (!state) return factoryRep;
  const uf = state.toUpperCase();
  return representatives.find((r) => r.states.includes(uf)) ?? factoryRep;
}

export type Segment = {
  slug: string;
  name: string;
  headline: string;
  description: string;
  needs: string[];
  documents: string[];
  cta: string;
  icon: string;
};

export const segments: Segment[] = [
  {
    slug: "fabricantes",
    name: "Fabricantes de Cadeiras",
    headline: "Componentes padronizados, entrega programada e desenvolvimento sob desenho.",
    description:
      "Para indústrias moveleiras que montam cadeiras de escritório em série. Fornecemos mecanismos, back systems, lâminas, estruturas, pistões e flanges com furação padronizada, intercambiáveis entre si, e programamos entregas conforme o seu plano de produção.",
    needs: [
      "Intercambiabilidade entre componentes (furação 150 x 200 mm, cone 50/28 mm)",
      "Kits prontos para reduzir SKUs e erros de montagem",
      "Desenvolvimento de peças exclusivas a partir de desenho ou amostra",
      "Contrato de fornecimento com entregas programadas",
    ],
    documents: ["Fichas técnicas por produto", "Desenhos 2D em PDF/DWG", "Laudos de ensaio de carga", "Certificado de matéria-prima"],
    cta: "Solicitar orçamento para produção",
    icon: "🏭",
  },
  {
    slug: "revendas",
    name: "Revendas e Lojistas",
    headline: "Reposição rápida de peças com a marca que o seu cliente reconhece.",
    description:
      "Para lojas de móveis de escritório, assistências técnicas e distribuidores de peças. Oferecemos kits de reposição embalados individualmente com identificação Comboflex, pedidos mínimos reduzidos e material de apoio para venda no balcão e no WhatsApp.",
    needs: [
      "Kits de reposição (back system, pistão, mecanismo) em embalagem individual",
      "Pedido mínimo reduzido para itens de giro",
      "Tabela de compatibilidade para identificar a peça correta",
      "Material digital para envio ao consumidor final",
    ],
    documents: ["Tabela de compatibilidade", "Catálogo digital para WhatsApp", "Guia de instalação"],
    cta: "Falar com o comercial de lojistas",
    icon: "🏪",
  },
  {
    slug: "corporativo",
    name: "Mercado Corporativo",
    headline: "Especificação técnica para projetos de mobiliário corporativo.",
    description:
      "Para arquitetos, especificadores e fabricantes que atendem projetos corporativos. Nossos componentes seguem os requisitos da NBR 13962 e da NR-17 e são acompanhados de documentação para aprovação de projeto.",
    needs: [
      "Mecanismos sincronizados e pistões classe 4 para uso intensivo",
      "Laudos de ensaio e memoriais descritivos",
      "Padronização de componentes em grandes lotes",
      "Suporte técnico na especificação",
    ],
    documents: ["Memorial descritivo por componente", "Laudos de ensaio (NBR 13962)", "Declaração de conformidade NR-17"],
    cta: "Falar com o suporte técnico",
    icon: "🏢",
  },
  {
    slug: "ecommerce",
    name: "E-commerce e Marketplaces",
    headline: "Componentes e kits com fotos, medidas e conteúdo prontos para o anúncio.",
    description:
      "Para lojas virtuais e vendedores de marketplaces que comercializam cadeiras e peças de reposição. Disponibilizamos fotos em fundo neutro, fichas técnicas em formato de anúncio e embalagens preparadas para envio unitário.",
    needs: [
      "Embalagem individual resistente para transporte",
      "Fotos e descrições técnicas para anúncios",
      "Kits de reposição com alta demanda (pistão, back system, relax)",
      "Reposição contínua de estoque",
    ],
    documents: ["Banco de imagens", "Fichas técnicas em formato de anúncio", "Guia de instalação para o consumidor"],
    cta: "Solicitar kit de conteúdo",
    icon: "🛒",
  },
  {
    slug: "licitacoes",
    name: "Licitações e Órgãos Públicos",
    headline: "Documentação completa para atender editais e processos públicos.",
    description:
      "Para fabricantes e fornecedores que participam de licitações. Reunimos declarações, laudos, certificados de matéria-prima e memoriais técnicos para compor o processo, e produzimos os componentes conforme a especificação do edital.",
    needs: [
      "Documentação técnica organizada por item do edital",
      "Rastreabilidade de lote e certificado de matéria-prima",
      "Produção conforme especificação e prazo do contrato",
      "Longarinas, estruturas fixas e cadeiras giratórias em volume",
    ],
    documents: ["Laudos de ensaio de carga e ciclagem", "Certificado de matéria-prima", "Declaração de origem nacional", "Memoriais descritivos"],
    cta: "Solicitar documentação para licitação",
    icon: "📋",
  },
];

export function getSegment(slug: string) {
  return segments.find((s) => s.slug === slug);
}

export type QualityDocument = {
  id: string;
  title: string;
  type: "Laudo" | "Certificado" | "Ficha Técnica" | "Declaração" | "Norma" | "Manual";
  description: string;
  status: "disponivel" | "em_elaboracao";
  scope: string;
  updatedAt: string;
};

export const qualityDocuments: QualityDocument[] = [
  {
    id: "doc-01",
    title: "Fichas técnicas dos produtos",
    type: "Ficha Técnica",
    description: "Ficha técnica individual de cada item do catálogo, com medidas, material, acabamento e compatibilidades.",
    status: "disponivel",
    scope: "Todos os produtos",
    updatedAt: "2026-03",
  },
  {
    id: "doc-02",
    title: "Laudo de ensaio de carga estática – Back System Lion",
    type: "Laudo",
    description: "Ensaio de carga estática e de fadiga do conjunto encosto conforme NBR 13962.",
    status: "disponivel",
    scope: "CF-BS-101 / CF-BS-102",
    updatedAt: "2026-02",
  },
  {
    id: "doc-03",
    title: "Laudo de ciclagem – Mecanismos CF-MC-201 e CF-MC-202",
    type: "Laudo",
    description: "Ensaio de durabilidade por ciclagem (100.000 e 120.000 ciclos) e verificação de folgas.",
    status: "disponivel",
    scope: "CF-MC-201 / CF-MC-202",
    updatedAt: "2026-01",
  },
  {
    id: "doc-04",
    title: "Certificado de matéria-prima (aço SAE 1020 / 1045)",
    type: "Certificado",
    description: "Certificados de qualidade do aço emitidos pelas usinas fornecedoras, com rastreabilidade por lote.",
    status: "disponivel",
    scope: "Todos os produtos estampados",
    updatedAt: "2026-03",
  },
  {
    id: "doc-05",
    title: "Declaração de origem nacional",
    type: "Declaração",
    description: "Declaração de fabricação nacional para processos de licitação com margem de preferência.",
    status: "disponivel",
    scope: "Todos os produtos",
    updatedAt: "2026-01",
  },
  {
    id: "doc-06",
    title: "Declaração de conformidade – NR-17 (ergonomia)",
    type: "Declaração",
    description: "Declaração de atendimento aos requisitos de regulagem exigidos pela NR-17 para os mecanismos sincronizados e back systems.",
    status: "disponivel",
    scope: "CF-MC-202 / CF-BS-101",
    updatedAt: "2025-11",
  },
  {
    id: "doc-07",
    title: "Laudo de pistões classe 4 (DIN 4550 / BIFMA)",
    type: "Laudo",
    description: "Ensaio de segurança e durabilidade de pistões a gás classe 4.",
    status: "em_elaboracao",
    scope: "CF-PT-304",
    updatedAt: "Previsão 2026-06",
  },
  {
    id: "doc-08",
    title: "Certificação do processo de pintura eletrostática",
    type: "Certificado",
    description: "Ensaio de aderência e névoa salina da pintura epóxi (240 h).",
    status: "em_elaboracao",
    scope: "Todos os produtos pintados",
    updatedAt: "Previsão 2026-08",
  },
  {
    id: "doc-09",
    title: "Manual de instalação e manutenção",
    type: "Manual",
    description: "Guia ilustrado de montagem e cuidados para back systems, mecanismos e pistões.",
    status: "disponivel",
    scope: "Linhas BS, MC, RX e PT",
    updatedAt: "2026-02",
  },
];

export const standards = [
  { code: "ABNT NBR 13962", title: "Móveis para escritório – Cadeiras – Requisitos e métodos de ensaio" },
  { code: "NR-17", title: "Ergonomia – requisitos de regulagem de assentos e encostos" },
  { code: "DIN 4550 / ANSI-BIFMA X5.1", title: "Requisitos de segurança para pistões a gás e cadeiras de escritório" },
  { code: "ABNT NBR 8094", title: "Corrosão por exposição à névoa salina (pintura)" },
];

export type Event = {
  id: string;
  title: string;
  kind: "Feira" | "Parceria" | "Projeto";
  date: string;
  location?: string;
  description: string;
  upcoming?: boolean;
};

export const events: Event[] = [
  {
    id: "ev-01",
    title: "Movelsul Brasil",
    kind: "Feira",
    date: "Março de 2026",
    location: "Bento Gonçalves – RS",
    description: "Participação com estande próprio apresentando o lançamento Back System Lion e a linha de mecanismos sincronizados.",
  },
  {
    id: "ev-02",
    title: "FIMMA Brasil",
    kind: "Feira",
    date: "2027",
    location: "Bento Gonçalves – RS",
    description: "Feira de máquinas, matérias-primas e componentes para a indústria moveleira. Presença confirmada com a rede de representantes.",
    upcoming: true,
  },
  {
    id: "ev-03",
    title: "Rede Corporate HUB",
    kind: "Parceria",
    date: "Desde 2024",
    description: "Parceria comercial que ampliou o atendimento Comboflex para as regiões Norte, Nordeste e Sul, com representantes dedicados.",
  },
  {
    id: "ev-04",
    title: "Desenvolvimento conjunto com fabricantes de Jaú e região",
    kind: "Projeto",
    date: "Contínuo",
    description: "Projetos de codesenvolvimento de componentes exclusivos, do desenho à produção seriada, com fabricantes do polo moveleiro paulista.",
  },
  {
    id: "ev-05",
    title: "Programa de visitas técnicas à fábrica",
    kind: "Projeto",
    date: "Agenda aberta",
    description: "Recebemos compradores, engenheiros e especificadores para conhecer o processo produtivo e validar componentes em linha.",
    upcoming: true,
  },
];

export const differentials = [
  {
    title: "Produção 100% nacional",
    text: "Fábrica própria em Jaú/SP, no polo moveleiro paulista. Prazo, rastreabilidade e reposição sem depender de importação.",
    icon: "🇧🇷",
  },
  {
    title: "Qualidade controlada",
    text: "Aço certificado, estampagem de precisão, solda MIG e pintura eletrostática com inspeção em cada lote.",
    icon: "✅",
  },
  {
    title: "Variedade de componentes",
    text: "Sete famílias de produtos intercambiáveis: da lâmina ao mecanismo, você monta a cadeira inteira com um único fornecedor.",
    icon: "🧩",
  },
  {
    title: "Atendimento técnico",
    text: "Equipe que entende de cadeira. Ajudamos a especificar, comparar e escolher o componente certo para cada projeto.",
    icon: "🛠️",
  },
  {
    title: "Desenvolvimento de soluções",
    text: "Desenvolvemos peças sob desenho ou amostra, com protótipo aprovado antes da produção seriada.",
    icon: "📐",
  },
  {
    title: "Representantes em todo o Brasil",
    text: "Rede de representantes nas regiões Sudeste, Sul, Centro-Oeste, Nordeste e Norte com suporte comercial próximo.",
    icon: "📍",
  },
];
