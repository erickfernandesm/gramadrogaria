import type { NextConfig } from "next";

// Exportação estática: gera a pasta `out/`, publicada direto no Cloudflare Pages.
// Não há servidor Node em produção.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  agentRules: false,
  images: {
    // O otimizador de imagens do Next exige servidor; em export estático as
    // imagens são servidas como estão (já devem estar otimizadas em /public).
    unoptimized: true,
  },
};

export default nextConfig;
