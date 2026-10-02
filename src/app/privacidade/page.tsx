import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/layout/LegalPlaceholder";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return <LegalPlaceholder title="Política de Privacidade" />;
}
