import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/layout/LegalPlaceholder";

export const metadata: Metadata = {
  title: "Trocas e devoluções",
  robots: { index: false, follow: true },
};

export default function ReturnsPage() {
  return <LegalPlaceholder title="Trocas e devoluções" />;
}
