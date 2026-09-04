"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { company, whatsappLink } from "@/data/company";
import { Logo } from "./Logo";

const nav = [
  { href: "/quem-somos", label: "Quem somos" },
  { href: "/produtos", label: "Produtos" },
  { href: "/catalogo", label: "Catálogo técnico" },
  { href: "/solucoes", label: "Soluções por mercado" },
  { href: "/qualidade", label: "Qualidade" },
  { href: "/amostras", label: "Amostras" },
  { href: "/representantes", label: "Representantes" },
  { href: "/feiras-e-parcerias", label: "Feiras" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="no-print sticky top-0 z-40 border-b border-steel-200 bg-white/95 backdrop-blur">
      <div className="hidden bg-steel-900 text-xs text-steel-200 md:block">
        <div className="container-x flex h-9 items-center justify-between">
          <span>Indústria de componentes metálicos para cadeiras de escritório • Jaú/SP • Produção nacional</span>
          <div className="flex items-center gap-5">
            <a href={`mailto:${company.email}`} className="hover:text-white">
              {company.email}
            </a>
            <a
              href={whatsappLink(company.phones[0].digits, "Olá, vim pelo site da Comboflex.")}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              WhatsApp {company.phones[0].number}
            </a>
          </div>
        </div>
      </div>
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Comboflex – Página inicial">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-brand-50 text-brand-700" : "text-steel-700 hover:bg-steel-100 hover:text-steel-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/orcamento" className="btn-primary px-4 py-2">
            Solicitar orçamento
          </Link>
        </div>
        <button
          className="rounded-md border border-steel-300 p-2 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-steel-200 bg-white lg:hidden">
          <nav className="container-x flex flex-col py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-steel-800 hover:bg-steel-100"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contato" onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium text-steel-800 hover:bg-steel-100">
              Contato
            </Link>
            <Link href="/orcamento" onClick={() => setOpen(false)} className="btn-primary mt-2">
              Solicitar orçamento
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
