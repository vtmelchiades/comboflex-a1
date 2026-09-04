export type Category = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
  highlights: string[];
};

export type Product = {
  slug: string;
  code: string;
  name: string;
  category: string; // category slug
  summary: string;
  description: string;
  image: string;
  isNew?: boolean;
  featured?: boolean;
  dimensions: { label: string; value: string }[];
  material: string;
  finish: string[];
  variants: string[];
  applications: string[];
  compatibility: string[];
  load?: string;
  minOrder: string;
  packaging?: string;
  technicalNotes?: string[];
  segments: string[]; // segment slugs
  drawing: {
    width: number; // mm
    height: number; // mm
    depth?: number; // mm
  };
};

export const categories: Category[] = [
  {
    slug: "back-systems",
    name: "Back Systems",
    shortName: "Back Systems",
    description:
      "Sistemas de fixação e regulagem de encosto com catraca de altura. A linha Lion é o lançamento Comboflex: mais rigidez, curso de regulagem ampliado e acabamento premium.",
    image: "/images/cat-back-system.jpg",
    highlights: ["Catraca com 6 a 8 posições", "Chapa SAE 1020 estampada", "Kit completo com lâmina e parafusos"],
  },
  {
    slug: "mecanismos",
    name: "Mecanismos",
    shortName: "Mecanismos",
    description:
      "Mecanismos de movimentação para cadeiras giratórias: relax, sincronizado e back system. Projetados para durabilidade em uso intensivo e montagem padronizada.",
    image: "/images/cat-mecanismos.jpg",
    highlights: ["Furação padrão 150 x 200 mm", "Cone universal para pistão", "Testados em ciclagem"],
  },
  {
    slug: "sistemas-relax",
    name: "Sistemas Relax",
    shortName: "Relax",
    description:
      "Sistemas de inclinação relax com trava e regulagem de tensão, indicados para cadeiras diretor e presidente em linhas corporativas e de revenda.",
    image: "/images/cat-mecanismos.jpg",
    highlights: ["Regulagem de tensão por manípulo", "Trava em posição de trabalho", "Compatível com bases padrão"],
  },
  {
    slug: "laminas",
    name: "Lâminas",
    shortName: "Lâminas",
    description:
      "Lâminas de encosto em aço estampado, com curvaturas e furações padronizadas para diferentes alturas de encosto, com ou sem regulagem.",
    image: "/images/cat-laminas.jpg",
    highlights: ["Aço SAE 1020 / 1045", "Espessuras de 6 a 10 mm", "Pintura epóxi ou cromagem"],
  },
  {
    slug: "estruturas",
    name: "Estruturas Metálicas",
    shortName: "Estruturas",
    description:
      "Estruturas tubulares para cadeiras fixas, aproximação, longarinas e bases. Solda MIG robotizada e conformação de tubo com precisão dimensional.",
    image: "/images/cat-estruturas.jpg",
    highlights: ["Tubo de aço 7/8\" a 1.1/4\"", "Solda MIG", "Sapatas e ponteiras inclusas"],
  },
  {
    slug: "pistoes",
    name: "Pistões a Gás",
    shortName: "Pistões",
    description:
      "Pistões pneumáticos classe 3 e classe 4 para regulagem de altura, com cone padrão e capas telescópicas.",
    image: "/images/cat-pistoes.jpg",
    highlights: ["Classe 3 e 4 (uso intensivo)", "Cone 50/28 mm padrão", "Cursos de 80 a 140 mm"],
  },
  {
    slug: "flanges",
    name: "Flanges e Suportes",
    shortName: "Flanges",
    description:
      "Flanges de assento, suportes de fixação, chapas de reforço e peças estampadas sob medida para montagem de assentos e encostos.",
    image: "/images/cat-flanges.jpg",
    highlights: ["Estampagem de precisão", "Furação padronizada", "Desenvolvimento sob desenho"],
  },
];

export const products: Product[] = [
  {
    slug: "back-system-lion",
    code: "CF-BS-101",
    name: "Back System Lion",
    category: "back-systems",
    summary: "Sistema de encosto com catraca de 8 posições, reforço lateral e acabamento epóxi preto texturizado.",
    description:
      "O Back System Lion é o lançamento da Comboflex para cadeiras operativas e executivas. Foi desenvolvido para oferecer maior rigidez no conjunto encosto-assento, eliminando folgas laterais e ampliando o curso de regulagem de altura. A catraca de 8 posições possui retorno automático ao ponto inicial, e o corpo em chapa estampada de 3 mm recebe reforço lateral dobrado para suportar uso intensivo.",
    image: "/images/cat-back-system.jpg",
    isNew: true,
    featured: true,
    dimensions: [
      { label: "Altura total", value: "320 mm" },
      { label: "Largura", value: "70 mm" },
      { label: "Curso de regulagem", value: "80 mm (8 posições de 10 mm)" },
      { label: "Espessura da chapa", value: "3,0 mm" },
      { label: "Furação de fixação no assento", value: "2 furos Ø 8,5 mm – entre centros 60 mm" },
      { label: "Furação no encosto", value: "4 furos Ø 6,5 mm – 40 x 60 mm" },
      { label: "Peso", value: "1,45 kg" },
    ],
    material: "Aço carbono SAE 1020 estampado, catraca em aço SAE 1045 temperado",
    finish: ["Pintura eletrostática epóxi preto texturizado", "Preto liso", "Cinza grafite (sob consulta)"],
    variants: ["Lion 8 posições (padrão)", "Lion 6 posições", "Lion com lâmina curva integrada"],
    applications: ["Cadeiras operativas", "Cadeiras executivas", "Cadeiras de caixa e atendimento"],
    compatibility: [
      "Mecanismos Comboflex CF-MC-201, CF-MC-202 e CF-MC-205",
      "Encostos com furação 40 x 60 mm",
      "Assentos com espessura de 12 a 18 mm",
    ],
    load: "Testado para 120 kg (NBR 13962)",
    minOrder: "50 unidades",
    packaging: "Caixa com 20 unidades, individualmente protegidas",
    technicalNotes: [
      "Retorno automático da catraca ao atingir a posição máxima.",
      "Fornecido com parafusos M8 e buchas de fixação.",
    ],
    segments: ["fabricantes", "corporativo", "licitacoes", "revendas"],
    drawing: { width: 70, height: 320, depth: 45 },
  },
  {
    slug: "kit-back-system-lion",
    code: "CF-BS-102",
    name: "Kit Back System Lion",
    category: "back-systems",
    summary: "Kit completo: Back System Lion + lâmina de encosto + capa plástica + parafusos, pronto para montagem.",
    description:
      "O Kit Back System Lion reúne todos os componentes para o encosto regulável em uma única embalagem, reduzindo o número de SKUs no seu estoque e eliminando erros de montagem. Inclui o Back System Lion, lâmina de encosto compatível, capa plástica de acabamento e o jogo completo de fixação.",
    image: "/images/cat-back-system.jpg",
    isNew: true,
    featured: true,
    dimensions: [
      { label: "Altura montada", value: "480 mm" },
      { label: "Curso de regulagem", value: "80 mm" },
      { label: "Lâmina", value: "40 x 6 mm – 380 mm de comprimento" },
      { label: "Peso do kit", value: "2,3 kg" },
    ],
    material: "Aço SAE 1020 / SAE 1045, capa em polipropileno injetado",
    finish: ["Epóxi preto texturizado", "Capa preta"],
    variants: ["Kit com lâmina reta", "Kit com lâmina curva", "Kit sem capa plástica"],
    applications: ["Cadeiras operativas", "Cadeiras executivas", "Reposição em revendas"],
    compatibility: ["Mecanismos Comboflex linha CF-MC", "Encostos com furação 40 x 60 mm"],
    load: "Testado para 120 kg (NBR 13962)",
    minOrder: "30 kits",
    packaging: "Caixa individual com identificação Comboflex",
    segments: ["fabricantes", "revendas", "ecommerce", "corporativo"],
    drawing: { width: 70, height: 480, depth: 60 },
  },
  {
    slug: "back-system-standard",
    code: "CF-BS-105",
    name: "Back System Standard",
    category: "back-systems",
    summary: "Sistema de encosto com catraca de 6 posições, solução econômica para cadeiras operativas de alto volume.",
    description:
      "Versão de entrada da linha de back systems Comboflex, com catraca de 6 posições e corpo em chapa de 2,5 mm. Mantém a mesma furação da linha Lion, permitindo intercambiabilidade na linha de montagem.",
    image: "/images/cat-back-system.jpg",
    dimensions: [
      { label: "Altura total", value: "290 mm" },
      { label: "Largura", value: "65 mm" },
      { label: "Curso de regulagem", value: "60 mm (6 posições)" },
      { label: "Espessura da chapa", value: "2,5 mm" },
      { label: "Peso", value: "1,1 kg" },
    ],
    material: "Aço carbono SAE 1020 estampado",
    finish: ["Epóxi preto liso", "Epóxi preto texturizado"],
    variants: ["6 posições (padrão)", "Com lâmina reta integrada"],
    applications: ["Cadeiras operativas", "Cadeiras secretária", "Cadeiras de caixa"],
    compatibility: ["Mecanismos Comboflex linha CF-MC", "Encostos com furação 40 x 60 mm"],
    load: "Testado para 110 kg",
    minOrder: "100 unidades",
    segments: ["fabricantes", "revendas"],
    drawing: { width: 65, height: 290, depth: 40 },
  },
  {
    slug: "mecanismo-relax-cf-201",
    code: "CF-MC-201",
    name: "Mecanismo Relax CF-201",
    category: "mecanismos",
    summary: "Mecanismo relax com trava, regulagem de tensão e alavanca de acionamento do pistão. Furação padrão 150 x 200 mm.",
    description:
      "Mecanismo relax com inclinação livre de até 15°, trava na posição de trabalho e regulagem de tensão por manípulo frontal. Corpo estampado em chapa de 3 mm com cone universal para pistão 50/28 mm. Ideal para cadeiras diretor e presidente.",
    image: "/images/cat-mecanismos.jpg",
    featured: true,
    dimensions: [
      { label: "Furação", value: "150 x 200 mm (padrão)" },
      { label: "Inclinação", value: "0° a 15°" },
      { label: "Cone do pistão", value: "Ø 50/28 mm" },
      { label: "Espessura da chapa", value: "3,0 mm" },
      { label: "Comprimento da alavanca", value: "220 mm" },
      { label: "Peso", value: "2,8 kg" },
    ],
    material: "Aço SAE 1020 estampado, eixo em aço SAE 1045, molas em aço mola",
    finish: ["Epóxi preto texturizado", "Manípulo em polipropileno preto"],
    variants: ["Com alavanca", "Sem alavanca (acionamento por cabo)", "Furação 125 x 125 mm"],
    applications: ["Cadeiras diretor", "Cadeiras presidente", "Cadeiras gamer"],
    compatibility: ["Pistões Comboflex CF-PT-301 a CF-PT-304", "Back Systems Comboflex", "Assentos com furação 150 x 200 mm"],
    load: "Testado para 150 kg – 100.000 ciclos",
    minOrder: "50 unidades",
    packaging: "Caixa com 6 unidades",
    segments: ["fabricantes", "corporativo", "licitacoes", "revendas"],
    drawing: { width: 200, height: 70, depth: 250 },
  },
  {
    slug: "mecanismo-sincronizado-cf-202",
    code: "CF-MC-202",
    name: "Mecanismo Sincronizado CF-202",
    category: "mecanismos",
    summary: "Mecanismo sincronizado 2:1 com trava multiposição, para cadeiras ergonômicas corporativas.",
    description:
      "Mecanismo sincronizado com relação de inclinação 2:1 entre encosto e assento, trava em 4 posições e regulagem de tensão. Atende às exigências de ergonomia de projetos corporativos e editais que citam a NBR 13962 e a NR-17.",
    image: "/images/cat-mecanismos.jpg",
    featured: true,
    dimensions: [
      { label: "Furação", value: "150 x 200 mm" },
      { label: "Inclinação do encosto", value: "0° a 20°" },
      { label: "Inclinação do assento", value: "0° a 10°" },
      { label: "Cone do pistão", value: "Ø 50/28 mm" },
      { label: "Peso", value: "3,4 kg" },
    ],
    material: "Aço SAE 1020 estampado, componentes móveis em SAE 1045",
    finish: ["Epóxi preto texturizado"],
    variants: ["Trava 4 posições (padrão)", "Trava 3 posições", "Com regulagem de profundidade de assento"],
    applications: ["Cadeiras ergonômicas", "Estações de trabalho corporativas", "Projetos de licitação"],
    compatibility: ["Pistões classe 4 Comboflex", "Back Systems Lion", "Bases Ø 640 a 700 mm"],
    load: "Testado para 150 kg – 120.000 ciclos",
    minOrder: "30 unidades",
    segments: ["fabricantes", "corporativo", "licitacoes"],
    drawing: { width: 200, height: 85, depth: 260 },
  },
  {
    slug: "mecanismo-back-system-cf-205",
    code: "CF-MC-205",
    name: "Mecanismo Back System CF-205",
    category: "mecanismos",
    summary: "Mecanismo fixo com suporte integrado para back system, a solução mais econômica para cadeiras operativas.",
    description:
      "Mecanismo de posição fixa com suporte traseiro integrado para encaixe direto do back system. Simples, robusto e com montagem rápida na linha de produção. Cone universal para pistão.",
    image: "/images/cat-mecanismos.jpg",
    dimensions: [
      { label: "Furação", value: "150 x 200 mm" },
      { label: "Cone do pistão", value: "Ø 50/28 mm" },
      { label: "Espessura da chapa", value: "2,5 mm" },
      { label: "Peso", value: "1,6 kg" },
    ],
    material: "Aço SAE 1020 estampado",
    finish: ["Epóxi preto liso"],
    variants: ["Com alavanca de pistão", "Sem alavanca"],
    applications: ["Cadeiras operativas", "Cadeiras secretária", "Cadeiras de caixa"],
    compatibility: ["Back System Lion e Standard", "Pistões Comboflex classe 3"],
    load: "Testado para 110 kg",
    minOrder: "100 unidades",
    segments: ["fabricantes", "revendas", "ecommerce"],
    drawing: { width: 200, height: 50, depth: 220 },
  },
  {
    slug: "sistema-relax-presidente",
    code: "CF-RX-210",
    name: "Sistema Relax Presidente",
    category: "sistemas-relax",
    summary: "Sistema relax reforçado com inclinação de 25°, trava e regulagem de tensão para cadeiras presidente.",
    description:
      "Sistema relax de alta capacidade para cadeiras presidente e gamer. Molas de tensão duplas, trava por came e eixo de Ø 12 mm. Mantém furação padrão para facilitar substituição de outros sistemas.",
    image: "/images/cat-mecanismos.jpg",
    dimensions: [
      { label: "Furação", value: "150 x 200 mm" },
      { label: "Inclinação", value: "0° a 25°" },
      { label: "Eixo", value: "Ø 12 mm" },
      { label: "Peso", value: "3,1 kg" },
    ],
    material: "Aço SAE 1020 estampado, eixo SAE 1045, molas duplas",
    finish: ["Epóxi preto texturizado"],
    variants: ["Padrão", "Com apoio de cabeça integrado", "Furação 125 x 125 mm"],
    applications: ["Cadeiras presidente", "Cadeiras gamer", "Poltronas executivas"],
    compatibility: ["Pistões classe 4 Comboflex", "Bases Ø 700 mm"],
    load: "Testado para 150 kg",
    minOrder: "30 unidades",
    segments: ["fabricantes", "ecommerce", "revendas"],
    drawing: { width: 200, height: 80, depth: 270 },
  },
  {
    slug: "sistema-relax-diretor",
    code: "CF-RX-211",
    name: "Sistema Relax Diretor",
    category: "sistemas-relax",
    summary: "Sistema relax compacto de 18° com trava, para cadeiras diretor de linha corporativa.",
    description:
      "Versão compacta do sistema relax, com inclinação de 18° e trava única, projetada para cadeiras diretor de médio porte. Excelente custo-benefício para linhas de revenda e e-commerce.",
    image: "/images/cat-mecanismos.jpg",
    dimensions: [
      { label: "Furação", value: "150 x 200 mm" },
      { label: "Inclinação", value: "0° a 18°" },
      { label: "Peso", value: "2,4 kg" },
    ],
    material: "Aço SAE 1020 estampado",
    finish: ["Epóxi preto texturizado"],
    variants: ["Padrão", "Sem alavanca"],
    applications: ["Cadeiras diretor", "Cadeiras home office"],
    compatibility: ["Pistões classe 3 e 4 Comboflex", "Bases Ø 640 mm"],
    load: "Testado para 120 kg",
    minOrder: "50 unidades",
    segments: ["fabricantes", "ecommerce", "revendas"],
    drawing: { width: 200, height: 65, depth: 240 },
  },
  {
    slug: "lamina-encosto-reta-40x6",
    code: "CF-LM-401",
    name: "Lâmina de Encosto Reta 40 x 6",
    category: "laminas",
    summary: "Lâmina reta em barra chata 40 x 6 mm, com furação padrão para back system e encosto.",
    description:
      "Lâmina de encosto em barra chata de aço, com dobra a 90° na base e furação padronizada. Disponível em diferentes comprimentos para atender encostos baixos, médios e altos.",
    image: "/images/cat-laminas.jpg",
    featured: true,
    dimensions: [
      { label: "Seção", value: "40 x 6 mm" },
      { label: "Comprimentos", value: "320 / 380 / 420 mm" },
      { label: "Furação superior", value: "4 furos Ø 6,5 mm – 40 x 60 mm" },
      { label: "Furação inferior", value: "2 furos Ø 8,5 mm – entre centros 60 mm" },
      { label: "Peso (380 mm)", value: "0,72 kg" },
    ],
    material: "Aço carbono SAE 1020 laminado",
    finish: ["Epóxi preto liso", "Epóxi preto texturizado", "Cromada (sob consulta)"],
    variants: ["320 mm", "380 mm", "420 mm", "Seção 50 x 8 mm"],
    applications: ["Cadeiras operativas", "Cadeiras secretária", "Cadeiras de caixa"],
    compatibility: ["Back Systems Comboflex", "Encostos com furação 40 x 60 mm"],
    minOrder: "100 unidades",
    segments: ["fabricantes", "revendas"],
    drawing: { width: 40, height: 380, depth: 6 },
  },
  {
    slug: "lamina-encosto-curva-l",
    code: "CF-LM-402",
    name: "Lâmina de Encosto Curva L",
    category: "laminas",
    summary: "Lâmina com curvatura ergonômica em L, para encostos médios e altos com maior conforto lombar.",
    description:
      "Lâmina com dupla curvatura conformada a frio, projetada para posicionar o encosto na região lombar com maior conforto. Seção 40 x 8 mm para maior rigidez.",
    image: "/images/cat-laminas.jpg",
    dimensions: [
      { label: "Seção", value: "40 x 8 mm" },
      { label: "Altura desenvolvida", value: "450 mm" },
      { label: "Avanço da curva", value: "85 mm" },
      { label: "Peso", value: "1,05 kg" },
    ],
    material: "Aço carbono SAE 1020 laminado",
    finish: ["Epóxi preto texturizado", "Cromada (sob consulta)"],
    variants: ["Curva simples", "Curva dupla", "Com regulagem por catraca"],
    applications: ["Cadeiras executivas", "Cadeiras diretor", "Cadeiras ergonômicas"],
    compatibility: ["Back System Lion", "Mecanismos CF-MC-201 e CF-MC-202"],
    minOrder: "100 unidades",
    segments: ["fabricantes", "corporativo", "licitacoes"],
    drawing: { width: 40, height: 450, depth: 85 },
  },
  {
    slug: "lamina-reforcada-50x10",
    code: "CF-LM-405",
    name: "Lâmina Reforçada 50 x 10",
    category: "laminas",
    summary: "Lâmina de alta resistência para cadeiras presidente, gamer e uso intensivo 24 horas.",
    description:
      "Lâmina em barra chata 50 x 10 mm em aço SAE 1045, indicada para encostos altos, cadeiras gamer e aplicações de uso intensivo (24 horas), como centrais de monitoramento e call centers.",
    image: "/images/cat-laminas.jpg",
    dimensions: [
      { label: "Seção", value: "50 x 10 mm" },
      { label: "Comprimentos", value: "480 / 520 mm" },
      { label: "Peso (520 mm)", value: "2,0 kg" },
    ],
    material: "Aço carbono SAE 1045 laminado",
    finish: ["Epóxi preto texturizado"],
    variants: ["480 mm", "520 mm", "Com furação para apoio de cabeça"],
    applications: ["Cadeiras presidente", "Cadeiras gamer", "Uso 24 horas"],
    compatibility: ["Sistema Relax Presidente CF-RX-210", "Mecanismo Sincronizado CF-MC-202"],
    load: "Testado para 150 kg",
    minOrder: "50 unidades",
    segments: ["fabricantes", "ecommerce", "corporativo"],
    drawing: { width: 50, height: 520, depth: 10 },
  },
  {
    slug: "estrutura-fixa-4-pes",
    code: "CF-ES-501",
    name: "Estrutura Fixa 4 Pés",
    category: "estruturas",
    summary: "Estrutura tubular 4 pés para cadeiras fixas e de aproximação, tubo 7/8\" com sapatas.",
    description:
      "Estrutura tubular soldada para cadeiras fixas, com quatro pés e travessas de reforço. Fornecida com sapatas de polipropileno e furação de fixação para assento e encosto. Empilhável na versão com afastadores.",
    image: "/images/cat-estruturas.jpg",
    featured: true,
    dimensions: [
      { label: "Tubo", value: "7/8\" x 1,50 mm" },
      { label: "Largura", value: "480 mm" },
      { label: "Profundidade", value: "520 mm" },
      { label: "Altura do assento", value: "450 mm" },
      { label: "Peso", value: "3,6 kg" },
    ],
    material: "Tubo de aço carbono, solda MIG",
    finish: ["Epóxi preto liso", "Epóxi cinza", "Cromada (sob consulta)"],
    variants: ["Padrão", "Empilhável", "Com prancheta", "Com braços"],
    applications: ["Cadeiras fixas de escritório", "Cadeiras de aproximação", "Auditórios e treinamento"],
    compatibility: ["Assentos e encostos com furação Comboflex", "Kits de braço CF-FL-608"],
    load: "Testado para 120 kg",
    minOrder: "50 unidades",
    segments: ["fabricantes", "corporativo", "licitacoes"],
    drawing: { width: 480, height: 450, depth: 520 },
  },
  {
    slug: "estrutura-sled-aproximacao",
    code: "CF-ES-502",
    name: "Estrutura Sled (Trenó) Aproximação",
    category: "estruturas",
    summary: "Estrutura contínua tipo trenó em tubo 1\", para cadeiras de aproximação e salas de reunião.",
    description:
      "Estrutura tipo trenó (sled) em tubo de 1\", conformada em peça única com solda MIG nas junções. Design contínuo que valoriza cadeiras de reunião e recepção.",
    image: "/images/cat-estruturas.jpg",
    dimensions: [
      { label: "Tubo", value: "1\" x 1,50 mm" },
      { label: "Largura", value: "520 mm" },
      { label: "Profundidade", value: "560 mm" },
      { label: "Altura do assento", value: "460 mm" },
      { label: "Peso", value: "4,2 kg" },
    ],
    material: "Tubo de aço carbono, solda MIG",
    finish: ["Epóxi preto texturizado", "Cromada"],
    variants: ["Sem braços", "Com braços integrados"],
    applications: ["Cadeiras de aproximação", "Salas de reunião", "Recepções"],
    compatibility: ["Assentos com furação 4 furos", "Encostos com lâmina CF-LM-401"],
    load: "Testado para 120 kg",
    minOrder: "30 unidades",
    segments: ["fabricantes", "corporativo"],
    drawing: { width: 520, height: 460, depth: 560 },
  },
  {
    slug: "longarina-3-lugares",
    code: "CF-ES-510",
    name: "Longarina 3 Lugares",
    category: "estruturas",
    summary: "Estrutura longarina para 3 lugares em tubo retangular, para recepções, hospitais e órgãos públicos.",
    description:
      "Estrutura longarina em tubo retangular 50 x 30 mm com pés em tubo oblongo e suportes de assento independentes. Muito utilizada em processos de licitação para áreas de espera.",
    image: "/images/cat-estruturas.jpg",
    dimensions: [
      { label: "Tubo principal", value: "50 x 30 x 1,50 mm" },
      { label: "Comprimento", value: "1.650 mm" },
      { label: "Entre eixos dos assentos", value: "550 mm" },
      { label: "Peso", value: "9,8 kg" },
    ],
    material: "Tubo de aço carbono, solda MIG",
    finish: ["Epóxi preto texturizado", "Epóxi cinza"],
    variants: ["2 lugares", "3 lugares", "4 lugares", "Com mesa lateral"],
    applications: ["Recepções", "Hospitais", "Órgãos públicos", "Áreas de espera"],
    compatibility: ["Assentos e encostos individuais Comboflex", "Kits de braço"],
    load: "Testado para 120 kg por lugar",
    minOrder: "10 unidades",
    segments: ["fabricantes", "licitacoes", "corporativo"],
    drawing: { width: 1650, height: 780, depth: 560 },
  },
  {
    slug: "pistao-classe-3-100mm",
    code: "CF-PT-301",
    name: "Pistão a Gás Classe 3 – Curso 100 mm",
    category: "pistoes",
    summary: "Pistão pneumático classe 3 com curso de 100 mm e cone padrão 50/28 mm, para cadeiras operativas.",
    description:
      "Pistão a gás classe 3 para regulagem de altura de cadeiras giratórias. Cone padrão para encaixe em mecanismos e bases, com capa telescópica preta em 3 estágios.",
    image: "/images/cat-pistoes.jpg",
    featured: true,
    dimensions: [
      { label: "Curso", value: "100 mm" },
      { label: "Comprimento fechado", value: "265 mm" },
      { label: "Cone superior", value: "Ø 50/28 mm" },
      { label: "Cone inferior", value: "Ø 50 mm" },
      { label: "Peso", value: "1,1 kg" },
    ],
    material: "Cilindro em aço, haste cromada, capa em polipropileno",
    finish: ["Preto com capa preta", "Cromado com capa preta"],
    variants: ["Curso 80 mm", "Curso 100 mm", "Curso 120 mm", "Curso 140 mm"],
    applications: ["Cadeiras operativas", "Cadeiras secretária", "Cadeiras de caixa (curso 140 mm)"],
    compatibility: ["Todos os mecanismos Comboflex", "Bases com cone Ø 50 mm"],
    load: "Classe 3 – até 120 kg",
    minOrder: "50 unidades",
    segments: ["fabricantes", "revendas", "ecommerce"],
    drawing: { width: 50, height: 265, depth: 50 },
  },
  {
    slug: "pistao-classe-4-120mm",
    code: "CF-PT-304",
    name: "Pistão a Gás Classe 4 – Curso 120 mm",
    category: "pistoes",
    summary: "Pistão pneumático classe 4 para uso intensivo, com curso de 120 mm e capa telescópica reforçada.",
    description:
      "Pistão classe 4 para uso intensivo e cadeiras de alta capacidade. Atende aos requisitos de segurança de editais corporativos e públicos que exigem classe 4 conforme BIFMA/DIN 4550.",
    image: "/images/cat-pistoes.jpg",
    dimensions: [
      { label: "Curso", value: "120 mm" },
      { label: "Comprimento fechado", value: "290 mm" },
      { label: "Cone superior", value: "Ø 50/28 mm" },
      { label: "Peso", value: "1,35 kg" },
    ],
    material: "Cilindro em aço com tratamento, haste cromada dura",
    finish: ["Preto com capa preta", "Cromado com capa preta"],
    variants: ["Curso 100 mm", "Curso 120 mm", "Curso 140 mm"],
    applications: ["Cadeiras presidente", "Uso 24 horas", "Projetos corporativos e licitações"],
    compatibility: ["Mecanismos CF-MC-201, CF-MC-202, CF-RX-210", "Bases com cone Ø 50 mm"],
    load: "Classe 4 – até 150 kg",
    minOrder: "30 unidades",
    segments: ["fabricantes", "corporativo", "licitacoes"],
    drawing: { width: 50, height: 290, depth: 50 },
  },
  {
    slug: "flange-assento-4-furos",
    code: "CF-FL-601",
    name: "Flange de Assento 4 Furos",
    category: "flanges",
    summary: "Flange estampada Ø 120 mm com cone para pistão e 4 furos de fixação, para cadeiras sem mecanismo.",
    description:
      "Flange estampada em chapa de 3 mm com cone interno para pistão Ø 50/28 mm e 4 furos de fixação. Utilizada em banquetas, cadeiras de caixa e assentos giratórios sem mecanismo.",
    image: "/images/cat-flanges.jpg",
    featured: true,
    dimensions: [
      { label: "Diâmetro", value: "120 mm" },
      { label: "Espessura", value: "3,0 mm" },
      { label: "Cone", value: "Ø 50/28 mm" },
      { label: "Furação", value: "4 furos Ø 8,5 mm – 90 x 90 mm" },
      { label: "Peso", value: "0,38 kg" },
    ],
    material: "Aço carbono SAE 1020 estampado",
    finish: ["Epóxi preto liso", "Zincada"],
    variants: ["Ø 120 mm", "Ø 150 mm", "Com alavanca de pistão"],
    applications: ["Banquetas", "Cadeiras de caixa", "Assentos giratórios simples"],
    compatibility: ["Pistões Comboflex", "Assentos de madeira ou plástico"],
    minOrder: "200 unidades",
    segments: ["fabricantes", "revendas"],
    drawing: { width: 120, height: 30, depth: 120 },
  },
  {
    slug: "suporte-braco-fixo",
    code: "CF-FL-608",
    name: "Suporte de Braço Fixo",
    category: "flanges",
    summary: "Suporte metálico de braço em chapa 5 mm, para fixação lateral em assentos e estruturas.",
    description:
      "Suporte de braço em chapa de aço 5 mm com dobra conformada e furação para apoia-braço de poliuretano ou polipropileno. Fornecido em par (direito e esquerdo).",
    image: "/images/cat-flanges.jpg",
    dimensions: [
      { label: "Altura", value: "230 mm" },
      { label: "Largura da base", value: "60 mm" },
      { label: "Espessura", value: "5,0 mm" },
      { label: "Peso do par", value: "1,2 kg" },
    ],
    material: "Aço carbono SAE 1020",
    finish: ["Epóxi preto texturizado", "Cromada (sob consulta)"],
    variants: ["Fixo (padrão)", "Com regulagem de altura", "Para estrutura fixa"],
    applications: ["Cadeiras operativas", "Cadeiras fixas", "Longarinas"],
    compatibility: ["Apoia-braços com furação 2 furos 80 mm", "Estruturas CF-ES-501 e CF-ES-510"],
    minOrder: "50 pares",
    segments: ["fabricantes", "revendas", "licitacoes"],
    drawing: { width: 60, height: 230, depth: 260 },
  },
  {
    slug: "chapa-reforco-assento",
    code: "CF-FL-612",
    name: "Chapa de Reforço de Assento",
    category: "flanges",
    summary: "Chapa estampada de reforço 150 x 200 mm para assentos em compensado ou polipropileno.",
    description:
      "Chapa de reforço com furação padrão 150 x 200 mm e buchas rebitadas M8, que distribui os esforços do mecanismo no assento e evita o arrancamento dos parafusos. Também produzimos chapas sob desenho do cliente.",
    image: "/images/cat-flanges.jpg",
    dimensions: [
      { label: "Dimensões", value: "220 x 270 mm" },
      { label: "Espessura", value: "2,0 mm" },
      { label: "Furação", value: "150 x 200 mm com buchas M8" },
      { label: "Peso", value: "0,85 kg" },
    ],
    material: "Aço carbono SAE 1020, buchas rebitadas",
    finish: ["Zincada", "Epóxi preto"],
    variants: ["150 x 200 mm", "125 x 125 mm", "Sob desenho"],
    applications: ["Assentos em compensado", "Assentos em polipropileno", "Projetos especiais"],
    compatibility: ["Todos os mecanismos com furação 150 x 200 mm"],
    minOrder: "200 unidades",
    segments: ["fabricantes"],
    drawing: { width: 220, height: 2, depth: 270 },
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductByCode(code: string) {
  return products.find((p) => p.code.toLowerCase() === code.toLowerCase());
}

export function getProductsByCategory(slug: string) {
  return products.filter((p) => p.category === slug);
}

export function getProductsBySegment(slug: string) {
  return products.filter((p) => p.segments.includes(slug));
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product, limit = 3) {
  const compatibleCodes = product.compatibility
    .flatMap((c) => c.match(/CF-[A-Z]{2}-\d{3}/g) ?? [])
    .map((c) => c.toUpperCase());
  const related = products.filter(
    (p) => p.slug !== product.slug && (compatibleCodes.includes(p.code) || p.category === product.category),
  );
  return related.slice(0, limit);
}
