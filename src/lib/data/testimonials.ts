export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  rating: number;
  text: string;
  product: string;
  avatar: string; // ⚠️ INSERIR: public/images/testimonials/[id].jpg
  monthlyEconomy: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Carlos Mendes",
    role: "Entregador",
    city: "São Paulo, SP",
    rating: 5,
    text: "Comprei a YESU Cargo há 6 meses e minha vida mudou completamente. Antes gastava R$ 600/mês de gasolina. Hoje gasto menos de R$ 60 de luz. O custo-benefício é absurdo!",
    product: "YESU Cargo",
    avatar: "/images/testimonials/1.jpg",
    monthlyEconomy: 540,
  },
  {
    id: "2",
    name: "Ana Paula Silva",
    role: "Arquiteta",
    city: "Belo Horizonte, MG",
    rating: 5,
    text: "A Urban Pro é simplesmente incrível. Ando 40km por dia indo e voltando do trabalho. Carrego em casa de noite, zero preocupação. Design lindo e muito confortável.",
    product: "YESU Urban Pro",
    avatar: "/images/testimonials/2.jpg",
    monthlyEconomy: 320,
  },
  {
    id: "3",
    name: "Roberto Santos",
    role: "Médico",
    city: "Curitiba, PR",
    rating: 5,
    text: "Escolhi a Max Range pela autonomia. Faço 80km por dia entre o consultório e o hospital. Nunca fiquei sem bateria. Atendimento da YESU é top, entrega rápida e suporte excelente.",
    product: "YESU Max Range",
    avatar: "/images/testimonials/3.jpg",
    monthlyEconomy: 680,
  },
  {
    id: "4",
    name: "Fernanda Costa",
    role: "Professora",
    city: "Rio de Janeiro, RJ",
    rating: 5,
    text: "Economizei R$ 4.200 no primeiro ano! Além do dinheiro, me sinto bem sabendo que não emito CO₂. A Sport é veloz, divertida e me faz chegar antes de todo mundo.",
    product: "YESU Sport",
    avatar: "/images/testimonials/4.jpg",
    monthlyEconomy: 350,
  },
  {
    id: "5",
    name: "Marcos Oliveira",
    role: "Designer Gráfico",
    city: "Florianópolis, SC",
    rating: 5,
    text: "Comprei a Urban Pro e convenci mais 3 amigos a comprarem também. A qualidade é muito acima do que esperava pelo preço. Parece uma scooter europeia de marca premium.",
    product: "YESU Urban Pro",
    avatar: "/images/testimonials/5.jpg",
    monthlyEconomy: 280,
  },
  {
    id: "6",
    name: "Juliana Alves",
    role: "Empreendedora",
    city: "Goiânia, GO",
    rating: 5,
    text: "Tenho uma frota de 5 YESU Cargo para meu negócio de delivery. A economia operacional transformou meus lucros. ROI em menos de 6 meses. Recomendo para todo empresário.",
    product: "YESU Cargo",
    avatar: "/images/testimonials/6.jpg",
    monthlyEconomy: 2700,
  },
];
