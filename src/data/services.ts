import type { Service } from "@/types";

/**
 * Somente formas de atendimento confirmadas publicamente.
 * Serviços farmacêuticos (aferição de pressão, aplicação de injetáveis etc.)
 * NÃO foram confirmados. Adicionar aqui quando a drogaria validar.
 */
export const services: Service[] = [
  {
    id: "entrega",
    title: "Entrega em casa",
    description:
      "Você monta o pedido, informa o endereço e combina a entrega com a nossa equipe pelo WhatsApp.",
  },
  {
    id: "retirada",
    title: "Retirada na loja",
    description:
      "Peça pelo site e combine a retirada com a equipe. Estamos na Rua Diomar Monteiro, 88.",
  },
  {
    id: "whatsapp",
    title: "Pedido pelo WhatsApp",
    description:
      "Não achou o que procura? Mande o nome do produto e a gente verifica a disponibilidade para você.",
  },
];
