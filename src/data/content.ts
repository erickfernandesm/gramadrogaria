/**
 * Textos institucionais editáveis.
 *
 * O texto "Sobre" foi escrito a partir do posicionamento local da drogaria,
 * porque não há história pública detalhada (ano de fundação, fundadores).
 * Quando a drogaria fornecer esses dados, basta editar os parágrafos abaixo.
 */
export const about = {
  title: "A farmácia do bairro, agora também no seu celular.",
  paragraphs: [
    "A Drogaria Grama fica na Rua Diomar Monteiro, no coração do bairro Grama, em Juiz de Fora. É aqui que muita gente da região resolve o remédio da semana, o item de higiene que acabou e a perfumaria do dia a dia.",
    "O site nasceu para encurtar esse caminho. Você pesquisa, monta o pedido pelo celular e fecha tudo pelo WhatsApp com a nossa equipe, que confirma disponibilidade e valores antes de separar. Depois é só receber em casa ou passar na loja.",
  ],
};

/** Passo a passo da entrega. Não inclui prazo nem taxa: são combinados no WhatsApp. */
export const deliverySteps: { title: string; text: string }[] = [
  { title: "Escolha seus produtos", text: "Use a busca ou navegue pelas categorias." },
  { title: "Monte seu pedido", text: "Ajuste as quantidades direto na lista." },
  { title: "Informe o endereço", text: "Rua, número, bairro e um ponto de referência." },
  { title: "Confirme pelo WhatsApp", text: "Nossa equipe confirma itens, valores e a entrega." },
  { title: "Receba em casa", text: "Sem sair de casa, com atendimento de quem é do bairro." },
];
