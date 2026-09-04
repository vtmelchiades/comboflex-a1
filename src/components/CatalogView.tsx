"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { categories, products } from "@/data/catalog";
import { company } from "@/data/company";
import { TechnicalDrawing } from "./ui";

export function CatalogView() {
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [showDrawings, setShowDrawings] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (category && p.category !== category) return false;
      if (!q) return true;
      return [p.name, p.code, p.summary, ...p.applications].join(" ").toLowerCase().includes(q);
    });
  }, [category, query]);

  function handleDownload() {
    if (registered) {
      window.print();
    } else {
      setShowGate(true);
    }
  }

  async function register(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(null);
    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "catalogo",
          companyName: f.get("companyName"),
          contactName: f.get("contactName"),
          email: f.get("email"),
          phone: f.get("phone"),
          state: f.get("state"),
          segment: f.get("segment"),
          source: "/catalogo",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Não foi possível registrar.");
      } else {
        setRegistered(true);
        setShowGate(false);
        setTimeout(() => window.print(), 300);
      }
    } catch {
      setError("Falha de conexão.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="no-print sticky top-16 z-30 -mx-4 mb-8 border-b border-steel-200 bg-white/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
          <input className="input max-w-xs" placeholder="Buscar código ou nome" value={query} onChange={(e) => setQuery(e.target.value)} />
          <select className="input max-w-xs" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Todas as famílias</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-sm text-steel-700">
            <input type="checkbox" checked={showDrawings} onChange={(e) => setShowDrawings(e.target.checked)} className="accent-brand-500" />
            Mostrar desenhos
          </label>
          <span className="text-sm text-steel-500">{list.length} itens</span>
          <div className="ml-auto flex gap-2">
            <button onClick={handleDownload} className="btn-primary px-4 py-2">
              Baixar em PDF
            </button>
          </div>
        </div>
      </div>

      {showGate && (
        <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-steel-950/60 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h3 className="text-lg font-black text-steel-900">Baixar catálogo técnico</h3>
            <p className="mt-1 text-sm text-steel-600">Informe seus dados para gerar o PDF. Usamos apenas para enviar atualizações do catálogo e apresentar o representante da sua região.</p>
            <form onSubmit={register} className="mt-4 space-y-3">
              <input name="companyName" required className="input" placeholder="Empresa *" />
              <input name="contactName" required className="input" placeholder="Seu nome *" />
              <input name="email" type="email" required className="input" placeholder="E-mail *" />
              <input name="phone" required className="input" placeholder="WhatsApp com DDD *" />
              <div className="grid grid-cols-2 gap-3">
                <input name="state" maxLength={2} className="input uppercase" placeholder="UF" />
                <select name="segment" className="input" defaultValue="">
                  <option value="">Perfil</option>
                  <option value="fabricantes">Fabricante</option>
                  <option value="revendas">Revenda</option>
                  <option value="corporativo">Corporativo</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="licitacoes">Licitação</option>
                </select>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="flex gap-2">
                <button type="submit" disabled={sending} className="btn-primary flex-1 disabled:opacity-60">
                  {sending ? "Gerando..." : "Gerar PDF"}
                </button>
                <button type="button" onClick={() => setShowGate(false)} className="btn-outline">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Print cover */}
      <div className="hidden print:block">
        <div className="mb-10 border-b-4 border-brand-500 pb-6">
          <p className="text-3xl font-black">COMBO<span className="text-brand-500">FLEX</span> Metalúrgica</p>
          <p className="text-lg font-semibold">Catálogo Técnico – Componentes para cadeiras de escritório</p>
          <p className="text-sm">{company.address} • {company.phones[0].number} • {company.email}</p>
          <p className="mt-1 text-xs">Versão pública sem preços. Condições comerciais pelo atendimento. Emitido em {new Date().toLocaleDateString("pt-BR")}.</p>
        </div>
      </div>

      {/* Catalog body */}
      <div className="space-y-12">
        {categories.map((cat) => {
          const items = list.filter((p) => p.category === cat.slug);
          if (!items.length) return null;
          return (
            <section key={cat.slug} className="print-break">
              <div className="flex items-end justify-between border-b-2 border-steel-900 pb-2">
                <div>
                  <p className="eyebrow">Família</p>
                  <h2 className="text-2xl font-black text-steel-900">{cat.name}</h2>
                </div>
                <span className="text-sm text-steel-500">{items.length} itens</span>
              </div>
              <p className="mt-2 max-w-3xl text-sm text-steel-600">{cat.description}</p>
              <div className="mt-6 space-y-6">
                {items.map((p) => (
                  <article key={p.slug} className="print-break grid gap-5 rounded-lg border border-steel-200 p-5 md:grid-cols-[180px_1fr]">
                    <div>
                      <div className="relative aspect-square overflow-hidden rounded bg-steel-100">
                        <Image src={p.image} alt={p.name} fill sizes="180px" className="object-cover" />
                      </div>
                      {showDrawings && (
                        <div className="mt-3 rounded border border-steel-100 bg-steel-50 p-1">
                          <TechnicalDrawing product={p} />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-mono text-sm font-bold text-brand-700">{p.code}</span>
                        <h3 className="text-lg font-bold text-steel-900">{p.name}</h3>
                        {p.isNew && <span className="rounded bg-brand-500 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">Lançamento</span>}
                      </div>
                      <p className="mt-1 text-sm text-steel-600">{p.summary}</p>
                      <div className="mt-3 grid gap-4 text-xs md:grid-cols-2">
                        <table className="w-full">
                          <tbody className="divide-y divide-steel-100">
                            {p.dimensions.map((d) => (
                              <tr key={d.label}>
                                <th className="py-1 pr-2 text-left font-medium text-steel-500">{d.label}</th>
                                <td className="py-1 text-right font-semibold text-steel-900">{d.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <dl className="space-y-1.5">
                          <div><dt className="inline font-semibold text-steel-700">Material: </dt><dd className="inline text-steel-700">{p.material}</dd></div>
                          <div><dt className="inline font-semibold text-steel-700">Acabamento: </dt><dd className="inline text-steel-700">{p.finish.join(", ")}</dd></div>
                          <div><dt className="inline font-semibold text-steel-700">Variações: </dt><dd className="inline text-steel-700">{p.variants.join(", ")}</dd></div>
                          <div><dt className="inline font-semibold text-steel-700">Aplicações: </dt><dd className="inline text-steel-700">{p.applications.join(", ")}</dd></div>
                          <div><dt className="inline font-semibold text-steel-700">Compatível com: </dt><dd className="inline text-steel-700">{p.compatibility.join("; ")}</dd></div>
                          {p.load && <div><dt className="inline font-semibold text-steel-700">Carga: </dt><dd className="inline text-steel-700">{p.load}</dd></div>}
                          <div><dt className="inline font-semibold text-steel-700">Qtd. mínima: </dt><dd className="inline text-steel-700">{p.minOrder}</dd></div>
                        </dl>
                      </div>
                      <div className="no-print mt-3 flex gap-3 text-xs font-semibold">
                        <Link href={`/produtos/${p.category}/${p.slug}`} className="text-brand-600 hover:underline">Ficha completa →</Link>
                        <Link href={`/orcamento?produto=${p.code}`} className="text-steel-700 hover:underline">Solicitar orçamento</Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
        {list.length === 0 && (
          <p className="rounded-lg border border-dashed border-steel-300 p-10 text-center text-steel-600">Nenhum item encontrado para o filtro atual.</p>
        )}
      </div>

      <div className="hidden print:block">
        <p className="mt-10 border-t pt-4 text-xs">
          Comboflex Metalúrgica • {company.address} • WhatsApp {company.phones[0].number} • {company.email} • comboflex.com.br
        </p>
      </div>
    </div>
  );
}
