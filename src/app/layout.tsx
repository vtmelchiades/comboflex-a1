import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: {
    default: "Comboflex Metalúrgica – Componentes metálicos para cadeiras de escritório",
    template: "%s | Comboflex Metalúrgica",
  },
  description:
    "Indústria de Jaú/SP fabricante de back systems, mecanismos, sistemas relax, lâminas, estruturas, pistões e flanges para cadeiras de escritório. Catálogo técnico, orçamento e representantes em todo o Brasil.",
  keywords: [
    "componentes para cadeiras de escritório",
    "back system",
    "mecanismo relax",
    "mecanismo sincronizado",
    "lâmina de encosto",
    "pistão a gás",
    "flange",
    "metalúrgica Jaú",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-white text-steel-900 antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
