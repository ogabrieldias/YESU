export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "geral" | "tecnico" | "financeiro" | "entrega";
}

export const faqItems: FAQItem[] = [
  {
    id: "1",
    question: "Quanto custa carregar uma scooter elétrica YESU?",
    answer:
      "O custo médio de carregamento completo é de apenas R$ 2,50 a R$ 4,00 com a energia elétrica no Brasil. Comparado a um tanque de gasolina que custa entre R$ 50 a R$ 80, a economia é de mais de 90% por recarga. Uma recarga completa leva de 4 a 8 horas dependendo do modelo.",
    category: "financeiro",
  },
  {
    id: "2",
    question: "Preciso de CNH para pilotar uma scooter elétrica?",
    answer:
      "Depende da potência e velocidade do modelo. Scooters até 50cc (equivalente) geralmente exigem no mínimo CNH categoria A ou ACC. Nossos modelos mais potentes (YESU Sport) requerem CNH-A. Recomendamos verificar a legislação atual do CONTRAN para o modelo específico de interesse.",
    category: "geral",
  },
  {
    id: "3",
    question: "Qual a vida útil da bateria?",
    answer:
      "As baterias de íons de lítio das scooters YESU possuem vida útil de 500 a 1.000 ciclos de carga completa, mantendo acima de 80% da capacidade original. Isso representa de 3 a 5 anos de uso intenso diário. Ao final da vida útil, a bateria pode ser substituída com custo inferior a 30% do valor do veículo.",
    category: "tecnico",
  },
  {
    id: "4",
    question: "Posso andar na chuva com a scooter elétrica?",
    answer:
      "Sim! Todas as scooters YESU possuem classificação IP67 nos componentes elétricos críticos, garantindo proteção contra chuva e até imersão parcial em água. Os freios a disco hidráulicos mantêm performance mesmo molhados. Recomendamos cuidados normais similares a qualquer moto.",
    category: "tecnico",
  },
  {
    id: "5",
    question: "Como funciona a garantia?",
    answer:
      "Oferecemos garantia de 1 ano para os modelos Urban Pro, Sport e Cargo, e 2 anos para o Max Range. A garantia cobre defeitos de fabricação no motor, bateria, controlador e componentes eletrônicos. O suporte técnico é realizado por nossa rede de assistências autorizadas ou via suporte remoto.",
    category: "geral",
  },
  {
    id: "6",
    question: "Qual o prazo de entrega?",
    answer:
      "Entregamos para todo o Brasil. Para capitais e regiões metropolitanas o prazo é de 3 a 7 dias úteis. Para interior e demais localidades, de 7 a 15 dias úteis. O frete é calculado no momento da compra. Oferecemos rastreamento em tempo real após o despacho.",
    category: "entrega",
  },
  {
    id: "7",
    question: "Posso financiar a compra?",
    answer:
      "Sim! Trabalhamos com parcelamento em até 30x no cartão de crédito e financiamento via boleto. Aceitamos as principais bandeiras: Visa, Mastercard, Elo e American Express. Para empresas, temos condições especiais para frota com análise de crédito simplificada.",
    category: "financeiro",
  },
  {
    id: "8",
    question: "Existe manutenção periódica necessária?",
    answer:
      "A manutenção de scooters elétricas é muito mais simples e barata que veículos a combustão. Não há óleo, filtros, correia dentada ou velas para trocar. A manutenção básica envolve verificação de freios, calibragem de pneus, limpeza e revisão dos contatos elétricos a cada 5.000km. Custo estimado 80% menor que moto a gasolina.",
    category: "tecnico",
  },
  {
    id: "9",
    question: "Posso usar para delivery profissional?",
    answer:
      "Absolutamente! Nossa linha YESU Cargo foi desenvolvida especificamente para uso profissional intenso. Com capacidade de 200kg de carga, baú de 45L e bateria removível para troca rápida, ela é a escolha ideal para entregadores e empresas de logística urbana. Temos condições especiais para frota.",
    category: "geral",
  },
  {
    id: "10",
    question: "Como funciona o processo de compra?",
    answer:
      "O processo é simples: (1) Escolha seu modelo no site ou via WhatsApp, (2) Faça o pagamento via PIX, cartão ou parcelado, (3) Aguarde a entrega em até 15 dias úteis. Nossa equipe entra em contato para confirmar dados e acompanha todo o processo até a entrega na sua porta com checklist completo.",
    category: "entrega",
  },
];
