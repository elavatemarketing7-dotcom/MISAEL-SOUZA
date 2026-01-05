import React from 'react';
import { Target, Users, TrendingUp, Layout, Globe, MessageCircle } from 'lucide-react';

export const EXPERT = {
  name: "Misael Souza",
  profession: "Marketing para Clínicas de Estética",
  address: "São Paulo - São Vicente",
  whatsappPhone: "5513978245122",
  whatsapp: "https://api.whatsapp.com/send?phone=5513978245122&text=Olá+Misael,+vi+seu+site+e+gostaria+de+uma+consultoria+gratuita!",
  instagram: "https://www.instagram.com/elevatemarketing.ofc/",
  profilePhoto: "https://i.imgur.com/cLklV44.jpeg"
};

export const PROOF_IMAGES = [
  "https://i.imgur.com/TbKeWpe.png",
  "https://i.imgur.com/KALkmh2.png",
  "https://i.imgur.com/YQUvXqA.png",
  "https://i.imgur.com/c6Fk8Zl.png",
  "https://i.imgur.com/ccdp7RU.png",
  "https://i.imgur.com/LTW5voG.png",
  "https://i.imgur.com/RMplkkN.png",
  "https://i.imgur.com/iYzHuko.png",
  "https://i.imgur.com/21tSgFx.png",
  "https://i.imgur.com/p1s8aCz.png"
];

export const TESTIMONIAL_VIDEOS = [
  "https://i.imgur.com/72oPLaz.mp4",
  "https://i.imgur.com/cMtwYDD.mp4",
  "https://i.imgur.com/NAnkN5X.mp4"
];

export const TRUST_CARDS = [
  {
    icon: <Users className="w-8 h-8 text-amber-500" />,
    title: "Foco no Orgânico",
    description: "Extraímos o máximo da sua base de clientes atual sem gastar 1 real em anúncios."
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-amber-500" />,
    title: "Faturamento 30x",
    description: "Estratégias validadas para escalar o faturamento usando inteligência de dados."
  },
  {
    icon: <Layout className="w-8 h-8 text-amber-500" />,
    title: "Sites de Alta Performance",
    description: "Landing pages exclusivas com o melhor custo-benefício do mercado para quem está começando."
  },
  {
    icon: <Target className="w-8 h-8 text-amber-500" />,
    title: "Estratégia Personalizada",
    description: "Cada clínica é única. Não usamos fórmulas prontas, criamos o seu caminho."
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Qual o seu momento atual?",
    options: [
      "Sou doutor(a) e estou começando agora",
      "Já tenho uma clínica estruturada",
      "Sou gestor de clínica de estética"
    ]
  },
  {
    id: 2,
    question: "Você possui uma base de dados de clientes?",
    options: [
      "Sim, tenho uma lista de contatos/pacientes",
      "Não, meus contatos são poucos/desorganizados",
      "Gostaria de começar a construir"
    ]
  },
  {
    id: 3,
    question: "Quanto você investe hoje em tráfego pago (anúncios)?",
    options: [
      "Não invisto nada",
      "Menos de R$ 1.000 / mês",
      "Mais de R$ 2.000 / mês",
      "Quero parar de depender de anúncios"
    ]
  },
  {
    id: 4,
    question: "Qual seu maior objetivo para os próximos 30 dias?",
    options: [
      "Aumentar o faturamento sem gastos extras",
      "Ter um site profissional e atraente",
      "Organizar minha estratégia de vendas"
    ]
  }
];