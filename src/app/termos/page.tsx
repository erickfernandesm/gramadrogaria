import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/layout/LegalPlaceholder";

export const metadata: Metadata = {
  title: "Termos de Uso",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return <LegalPlaceholder title="Termos de Uso" />;
}
