# Drogaria Grama

Site da Drogaria Grama (Juiz de Fora, MG): catálogo, busca, pedido com entrega ou retirada e finalização pelo WhatsApp.

Next.js (App Router) + React + TypeScript + Tailwind CSS, exportado como site estático. Não há servidor nem banco de dados.

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # gera a pasta out/
npm run typecheck
```

## Publicar no Cloudflare Pages

1. Conecte o repositório do GitHub em Workers & Pages > Create > Pages.
2. Build command: `npm run build`
3. Build output directory: `out`
4. Variáveis de ambiente: `NODE_VERSION=20` e `NEXT_PUBLIC_SITE_URL=https://seu-dominio` (usada no sitemap, canonical e Schema.org).

## Onde editar cada coisa

| O quê | Arquivo |
| --- | --- |
| Nome, WhatsApp, telefone, endereço, horários, Instagram, domínio | `src/config/store.ts` |
| Menu e links do rodapé | `src/config/navigation.ts` |
| Produtos | `src/data/products.ts` |
| Categorias | `src/data/categories.ts` (e `CategorySlug` em `src/types/index.ts`) |
| Formas de atendimento | `src/data/services.ts` |
| Texto "Sobre" e passos da entrega | `src/data/content.ts` |
| Cores, tipografia, raios e sombras | `src/app/globals.css` (bloco `@theme`) |
| Mensagens enviadas ao WhatsApp | `src/lib/whatsapp.ts` |

## Pendências que dependem da drogaria

- **Catálogo real.** `src/data/products.ts` contém itens demonstrativos, sem marca e sem preço. Ao cadastrar os produtos reais, mude `IS_DEMO_CATALOG` para `false` para remover o aviso da vitrine.
- **Fotos dos produtos.** Hoje são ilustrações neutras em `public/produtos/`.
- **Horários.** Fontes públicas divergem, então `hours` está `null` e o site orienta consultar pelo WhatsApp. Preencher em `src/config/store.ts`.
- **Entrega.** Área, taxa e prazo (`fulfillment` em `store.ts`) aparecem no site assim que preenchidos.
- **Logo.** O arquivo disponível tem 150 px. Uma versão maior (ou SVG) deve substituir `public/logo.jpg` e `src/app/icon.jpg`.
- **Textos jurídicos.** `/privacidade`, `/termos` e `/trocas` têm só a estrutura; o conteúdo entra como `children` de `LegalPlaceholder`.
- **Domínio.** Ajustar `siteUrl` ou a variável `NEXT_PUBLIC_SITE_URL`.

## Regras do catálogo

- Sem `price`, o produto mostra "Consulte o preço" e o valor é confirmado no WhatsApp.
- Oferta só aparece com `price` e `oldPrice` reais; a seção e o link "Ofertas" surgem sozinhos.
- `requiresPrescription: true` tira o produto do carrinho e direciona para o WhatsApp.
- Descrições de medicamentos devem ser apenas comerciais: nada de indicação, posologia ou promessa de tratamento.

## Evolução

Os componentes leem dados só por `src/lib/catalog.ts`. Para ligar ERP, estoque ou banco de dados, troque a implementação dessas funções. O pedido é montado em `buildOrderMessage` (`src/lib/whatsapp.ts`), ponto natural para enviar também a um sistema de pedidos ou gateway de pagamento.
