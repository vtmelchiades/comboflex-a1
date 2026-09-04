"use client";

import { useMemo, useState } from "react";
import { categories, products } from "@/data/catalog";
import { segments } from "@/data/company";
import { ProductCard } from "./ui";

export function ProductExplorer({ initialCategory = "" }: { initialCategory?: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [segment, setSegment] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (category && p.category !== category) return false;
      if (segment && !p.segments.includes(segment)) return false;
      if (!q) return true;
      const hay = [p.name, p.code, p.summary, ...p.applications, ...p.compatibility, ...p.variants].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [query, category, segment]);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <div>
          <label className="label" htmlFor="q">Buscar</label>
          <input id="q" className="input" placeholder="Nome, código, aplicação..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div>
          <p className="label">Família de produto</p>
          <div className="space-y-1">
            <button onClick={() => setCategory("")} className={`block w-full rounded px-3 py-1.5 text-left text-sm ${!category ? "bg-brand-50 font-semibold text-brand-700" : "text-steel-700 hover:bg-steel-100"}`}>
              Todas ({products.length})
            </button>
            {categories.map((c) => {
              const n = products.filter((p) => p.category === c.slug).length;
              return (
                <button key={c.slug} onClick={() => setCategory(c.slug)} className={`block w-full rounded px-3 py-1.5 text-left text-sm ${category === c.slug ? "bg-brand-50 font-semibold text-brand-700" : "text-steel-700 hover:bg-steel-100"}`}>
                  {c.name} ({n})
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label className="label" htmlFor="seg">Mercado / aplicação</label>
          <select id="seg" className="input" value={segment} onChange={(e) => setSegment(e.target.value)}>
            <option value="">Todos</option>
            {segments.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
          </select>
        </div>
        <div className="rounded-lg bg-steel-900 p-4 text-sm text-white">
          <p className="font-bold">Não encontrou?</p>
          <p className="mt-1 text-steel-300">Desenvolvemos peças sob desenho ou amostra.</p>
          <a href="/orcamento" className="mt-3 inline-block font-semibold text-brand-300">Falar com a engenharia →</a>
        </div>
      </aside>
      <div>
        <p className="mb-4 text-sm text-steel-600">
          {list.length} {list.length === 1 ? "produto encontrado" : "produtos encontrados"}
        </p>
        {list.length === 0 ? (
          <div className="rounded-lg border border-dashed border-steel-300 p-10 text-center text-steel-600">
            Nenhum produto corresponde aos filtros. Tente outro termo ou{" "}
            <a href="/orcamento" className="font-semibold text-brand-600">descreva o que precisa</a>.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
