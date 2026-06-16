export interface ProductSpec {
  label: string;
  value: string;
  unit?: string;
  icon?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: number;
  priceInstallment: number;
  installments: number;
  category: "urban" | "cargo" | "sport" | "premium";
  badge?: string;
  badgeColor?: string;
  color: string;
  accentColor: string;
  // Image paths — insert your images here
  // Place images in: public/images/products/[slug]/
  coverImage: string;       // Main product image: public/images/products/[slug]/cover.jpg
  galleryImages: string[];  // Gallery: public/images/products/[slug]/gallery-1.jpg, etc.
  thumbnail: string;        // Small card thumb: public/images/products/[slug]/thumb.jpg
  specs: ProductSpec[];
  highlights: string[];
  colors: { name: string; hex: string }[];
  whatsappMessage: string;
  featured: boolean;
  order: number;
}

// ============================================================
// CATÁLOGO YESU BRASIL
// Para inserir imagens: coloque-as em public/images/products/[slug]/
// Substitua os caminhos de imagem abaixo
// ============================================================

export const products: Product[] = [
  {
    id: "1",
    slug: "yesu-urban-pro",
    name: "YESU Urban Pro",
    tagline: "A cidade é sua pista.",
    description:
      "Scooter elétrica urbana de alto desempenho. Design premium, tecnologia avançada e autonomia para enfrentar o dia a dia da cidade com eficiência e estilo.",
    longDescription:
      "A YESU Urban Pro foi projetada para quem não abre mão de estilo e eficiência. Com motor brushless de 2.000W, bateria de lítio de 72V e autonomia de até 80km, ela é a escolha certa para o dia a dia urbano. Sistema de recuperação de energia regenerativa, display LCD inteligente e conectividade Bluetooth para monitoramento via app. Freios a disco hidráulicos nas duas rodas garantem segurança total.",
    price: 8990,
    priceInstallment: 299,
    installments: 30,
    category: "urban",
    badge: "Mais Vendida",
    badgeColor: "#FF6B00",
    color: "#0d0d0d",
    accentColor: "#FF6B00",
    // ⚠️ INSERIR IMAGEM: public/images/products/yesu-urban-pro/cover.jpg
    coverImage: "/images/products/yesu-urban-pro/cover.jpg",
    // ⚠️ INSERIR IMAGENS: public/images/products/yesu-urban-pro/gallery-1.jpg até gallery-4.jpg
    galleryImages: [
      "/images/products/yesu-urban-pro/gallery-1.jpg",
      "/images/products/yesu-urban-pro/gallery-2.jpg",
      "/images/products/yesu-urban-pro/gallery-3.jpg",
      "/images/products/yesu-urban-pro/gallery-4.jpg",
    ],
    // ⚠️ INSERIR THUMBNAIL: public/images/products/yesu-urban-pro/thumb.jpg
    thumbnail: "/images/products/yesu-urban-pro/thumb.jpg",
    specs: [
      { label: "Autonomia", value: "80", unit: "km", icon: "battery" },
      { label: "Vel. Máxima", value: "70", unit: "km/h", icon: "gauge" },
      { label: "Motor", value: "2.000", unit: "W", icon: "zap" },
      { label: "Bateria", value: "72V 32Ah", unit: "", icon: "battery-charging" },
      { label: "Carga", value: "4-6", unit: "horas", icon: "clock" },
      { label: "Peso", value: "115", unit: "kg", icon: "weight" },
      { label: "Carga Máx.", value: "150", unit: "kg", icon: "user" },
      { label: "Garantia", value: "1", unit: "ano", icon: "shield" },
    ],
    highlights: [
      "Motor brushless de alta eficiência",
      "Freios a disco hidráulicos duplos",
      "Display LCD colorido inteligente",
      "Conectividade Bluetooth",
      "Recuperação de energia regenerativa",
      "Faróis LED full",
      "Porta USB integrada",
      "Alarme eletrônico",
    ],
    colors: [
      { name: "Preto Absoluto", hex: "#050505" },
      { name: "Branco Ártico", hex: "#F5F5F5" },
      { name: "Cinza Metálico", hex: "#8A8A8A" },
    ],
    whatsappMessage:
      "Olá! Tenho interesse na YESU Urban Pro. Gostaria de mais informações sobre preço e disponibilidade.",
    featured: true,
    order: 1,
  },
  {
    id: "2",
    slug: "yesu-max-range",
    name: "YESU Max Range",
    tagline: "Autonomia sem limites.",
    description:
      "Para quem percorre longas distâncias todos os dias. Bateria estendida de 72V 50Ah com autonomia real de até 120km por carga.",
    longDescription:
      "A YESU Max Range quebra as barreiras da mobilidade elétrica. Com a maior bateria da linha, oferece 120km de autonomia real em condições urbanas. Motor de 3.000W para subidas e cargas pesadas. Sistema de gestão de bateria (BMS) avançado que monitora cada célula em tempo real. Ideal para entregadores, profissionais e quem cobre grandes distâncias diárias. Carregamento rápido opcional em 2 horas.",
    price: 12490,
    priceInstallment: 416,
    installments: 30,
    category: "premium",
    badge: "Maior Autonomia",
    badgeColor: "#00A86B",
    color: "#0a0a0a",
    accentColor: "#00A86B",
    // ⚠️ INSERIR IMAGEM: public/images/products/yesu-max-range/cover.jpg
    coverImage: "/images/products/yesu-max-range/cover.jpg",
    galleryImages: [
      "/images/products/yesu-max-range/gallery-1.jpg",
      "/images/products/yesu-max-range/gallery-2.jpg",
      "/images/products/yesu-max-range/gallery-3.jpg",
      "/images/products/yesu-max-range/gallery-4.jpg",
    ],
    thumbnail: "/images/products/yesu-max-range/thumb.jpg",
    specs: [
      { label: "Autonomia", value: "120", unit: "km", icon: "battery" },
      { label: "Vel. Máxima", value: "80", unit: "km/h", icon: "gauge" },
      { label: "Motor", value: "3.000", unit: "W", icon: "zap" },
      { label: "Bateria", value: "72V 50Ah", unit: "", icon: "battery-charging" },
      { label: "Carga", value: "6-8", unit: "horas", icon: "clock" },
      { label: "Peso", value: "138", unit: "kg", icon: "weight" },
      { label: "Carga Máx.", value: "180", unit: "kg", icon: "user" },
      { label: "Garantia", value: "2", unit: "anos", icon: "shield" },
    ],
    highlights: [
      "Maior autonomia da categoria (120km)",
      "Motor 3.000W para cargas pesadas",
      "BMS inteligente com proteção celular",
      "Carregamento rápido opcional (2h)",
      "Suspensão hidráulica ajustável",
      "Baú traseiro 28L incluso",
      "GPS integrado anti-furto",
      "Modo eco e sport selecionável",
    ],
    colors: [
      { name: "Preto Absoluto", hex: "#050505" },
      { name: "Verde Elétrico", hex: "#00A86B" },
      { name: "Cinza Escuro", hex: "#2A2A2A" },
    ],
    whatsappMessage:
      "Olá! Tenho interesse na YESU Max Range. Gostaria de mais informações sobre preço e disponibilidade.",
    featured: true,
    order: 2,
  },
  {
    id: "3",
    slug: "yesu-sport",
    name: "YESU Sport",
    tagline: "Performance elétrica pura.",
    description:
      "A mais ágil da linha YESU. Design esportivo, aceleração impressionante e tecnologia de última geração para quem vive pela adrenalina.",
    longDescription:
      "A YESU Sport foi construída para quem exige máxima performance. Motor de 5.000W com pico de 8.000W para acelerações instantâneas do 0 a 60km/h em menos de 4 segundos. Suspensão esportiva ajustável, pneus de maior aderência e sistema de frenagem EBS integrado. Display TFT colorido de 7 polegadas com painel de performance em tempo real. A scooter elétrica mais esportiva do mercado brasileiro.",
    price: 18990,
    priceInstallment: 633,
    installments: 30,
    category: "sport",
    badge: "Alta Performance",
    badgeColor: "#FF6B00",
    color: "#0d0d0d",
    accentColor: "#FF6B00",
    // ⚠️ INSERIR IMAGEM: public/images/products/yesu-sport/cover.jpg
    coverImage: "/images/products/yesu-sport/cover.jpg",
    galleryImages: [
      "/images/products/yesu-sport/gallery-1.jpg",
      "/images/products/yesu-sport/gallery-2.jpg",
      "/images/products/yesu-sport/gallery-3.jpg",
      "/images/products/yesu-sport/gallery-4.jpg",
    ],
    thumbnail: "/images/products/yesu-sport/thumb.jpg",
    specs: [
      { label: "Autonomia", value: "90", unit: "km", icon: "battery" },
      { label: "Vel. Máxima", value: "100", unit: "km/h", icon: "gauge" },
      { label: "Motor", value: "5.000", unit: "W", icon: "zap" },
      { label: "Bateria", value: "72V 40Ah", unit: "", icon: "battery-charging" },
      { label: "0-60km/h", value: "< 4", unit: "seg", icon: "clock" },
      { label: "Peso", value: "128", unit: "kg", icon: "weight" },
      { label: "Carga Máx.", value: "160", unit: "kg", icon: "user" },
      { label: "Garantia", value: "1", unit: "ano", icon: "shield" },
    ],
    highlights: [
      "Motor 5.000W pico 8.000W",
      "0-60 km/h em menos de 4 segundos",
      "Display TFT 7\" colorido",
      "Sistema EBS de frenagem elétrica",
      "Suspensão esportiva ajustável",
      "Pneus de alta aderência 12\"",
      "3 modos de condução (Eco/Normal/Sport)",
      "LED DRL estilo racing",
    ],
    colors: [
      { name: "Preto Absoluto", hex: "#050505" },
      { name: "Laranja Elétrico", hex: "#FF6B00" },
      { name: "Vermelho Racing", hex: "#CC0000" },
    ],
    whatsappMessage:
      "Olá! Tenho interesse na YESU Sport. Gostaria de mais informações sobre preço e disponibilidade.",
    featured: true,
    order: 3,
  },
  {
    id: "4",
    slug: "yesu-cargo",
    name: "YESU Cargo",
    tagline: "Trabalhe mais. Gaste menos.",
    description:
      "A solução definitiva para delivery e logística urbana. Capacidade de carga ampliada, baú enorme e custo operacional mínimo.",
    longDescription:
      "A YESU Cargo foi desenvolvida especificamente para profissionais de delivery e logística urbana. Com plataforma de carga reforçada, baú de 45 litros e capacidade de 200kg, ela substitui completamente motos a combustão com custo operacional até 90% menor. Motor de 2.500W com torque para subidas e cargas pesadas. Bateria removível para troca rápida sem necessidade de ponto de recarga.",
    price: 10990,
    priceInstallment: 366,
    installments: 30,
    category: "cargo",
    badge: "Para Delivery",
    badgeColor: "#0080FF",
    color: "#0a0a0a",
    accentColor: "#0080FF",
    coverImage: "/images/products/yesu-cargo/cover.jpg",
    galleryImages: [
      "/images/products/yesu-cargo/gallery-1.jpg",
      "/images/products/yesu-cargo/gallery-2.jpg",
      "/images/products/yesu-cargo/gallery-3.jpg",
      "/images/products/yesu-cargo/gallery-4.jpg",
    ],
    thumbnail: "/images/products/yesu-cargo/thumb.jpg",
    specs: [
      { label: "Autonomia", value: "100", unit: "km", icon: "battery" },
      { label: "Vel. Máxima", value: "70", unit: "km/h", icon: "gauge" },
      { label: "Motor", value: "2.500", unit: "W", icon: "zap" },
      { label: "Carga Máx.", value: "200", unit: "kg", icon: "weight" },
      { label: "Volume Baú", value: "45", unit: "litros", icon: "package" },
      { label: "Bateria", value: "Removível", unit: "", icon: "battery-charging" },
      { label: "Carga", value: "5-7", unit: "horas", icon: "clock" },
      { label: "Garantia", value: "1", unit: "ano", icon: "shield" },
    ],
    highlights: [
      "Bateria removível para troca rápida",
      "Baú traseiro 45L reforçado",
      "Plataforma de carga 200kg",
      "Motor com alto torque para subidas",
      "Pneus anti-furo para uso profissional",
      "Sistema de rastreamento GPS incluso",
      "Faróis LED com alta luminosidade",
      "Custo operacional 90% menor",
    ],
    colors: [
      { name: "Preto Absoluto", hex: "#050505" },
      { name: "Azul Corporativo", hex: "#0080FF" },
      { name: "Branco Profissional", hex: "#F5F5F5" },
    ],
    whatsappMessage:
      "Olá! Tenho interesse na YESU Cargo para delivery. Gostaria de mais informações sobre preço e disponibilidade.",
    featured: false,
    order: 4,
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}
