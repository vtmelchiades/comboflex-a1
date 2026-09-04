"use client";

import { useMemo, useState, type FormEvent } from "react";
import { brazilianStates, segments } from "@/data/company";
import { categories, products } from "@/data/catalog";

type LeadType = "orcamento" | "amostra" | "contato" | "documentacao";

type RepInfo = {
  name: string;
  companyName: string;
  regionLabel: string;
  whatsapp: string;
  whatsappUrl: string;
  email: string | null;
};

const typeCopy: Record<LeadType, { title: string; submit: string; success: string }> = {
  orcamento: {
    title: "Solicitar orçamento",
    submit: "Enviar solicitação de orçamento",
    success: "Recebemos sua solicitação de orçamento.",
  },
  amostra: {
    title: "Solicitar amostra",
    submit: "Solicitar amostra",
    success: "Recebemos sua solicitação de amostra.",
  },
  contato: {
    title: "Fale conosco",
    submit: "Enviar mensagem",
    success: "Recebemos sua mensagem.",
  },
  documentacao: {
    title: "Solicitar documentação técnica",
    submit: "Solicitar documentos",
    success: "Recebemos sua solicitação de documentação.",
  },
};

export function LeadForm({
  type,
  initialProducts = [],
  initialSegment = "",
  source,
  compact = false,
}: {
  type: LeadType;
  initialProducts?: string[];
  initialSegment?: string;
  source?: string;
  compact?: boolean;
}) {
  const [selected, setSelected] = useState<string[]>(initialProducts);
  const [productQuery, setProductQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ leadId: number; representative: RepInfo } | null>(null);
  const copy = typeCopy[type];
  const showProducts = type === "orcamento" || type === "amostra" || type === "documentacao";

  const filtered = useMemo(() => {
    const q = productQuery.toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q));
  }, [productQuery]);

  function toggle(code: string) {
    setSelected((s) => (s.includes(code) ? s.filter((c) => c !== code) : [...s, code]));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const payload = {
      type,
      companyName: form.get("companyName"),
      contactName: form.get("contactName"),
      email: form.get("email"),
      phone: form.get("phone"),
      city: form.get("city"),
      state: form.get("state"),
      segment: form.get("segment"),
      quantity: form.get("quantity"),
      application: form.get("application"),
      message: form.get("message"),
      productCodes: selected,
      source: source ?? (typeof window !== "undefined" ? window.location.pathname : ""),
    };
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Não foi possível enviar. Tente novamente.");
      } else {
        setResult({ leadId: data.leadId, representative: data.representative });
      }
    } catch {
      setError("Falha de conexão. Tente novamente ou fale conosco pelo WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    const rep = result.representative;
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">✓</span>
          <div>
            <h3 className="text-lg font-bold text-green-900">{copy.success}</h3>
            <p className="mt-1 text-sm text-green-800">
              Protocolo <strong>#{result.leadId}</strong>. Sua solicitação foi direcionada automaticamente ao responsável
              comercial pela sua região:
            </p>
          </div>
        </div>
        <div className="mt-5 rounded-md border border-green-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-steel-500">Responsável comercial</p>
          <p className="mt-1 text-base font-bold text-steel-900">{rep.name}</p>
          <p className="text-sm text-steel-600">
            {rep.companyName} • {rep.regionLabel}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href={rep.whatsappUrl} target="_blank" rel="noreferrer" className="btn-whatsapp">
              Adiantar pelo WhatsApp ({rep.whatsapp})
            </a>
            {rep.email && (
              <a href={`mailto:${rep.email}`} className="btn-outline">
                {rep.email}
              </a>
            )}
          </div>
          <p className="mt-3 text-xs text-steel-500">
            O WhatsApp já abre com o resumo da sua solicitação preenchido. Retornamos em até 1 dia útil.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="companyName">Empresa *</label>
          <input id="companyName" name="companyName" required className="input" placeholder="Razão social ou nome fantasia" />
        </div>
        <div>
          <label className="label" htmlFor="contactName">Seu nome *</label>
          <input id="contactName" name="contactName" required className="input" placeholder="Nome do contato" />
        </div>
        <div>
          <label className="label" htmlFor="email">E-mail *</label>
          <input id="email" name="email" type="email" required className="input" placeholder="voce@empresa.com.br" />
        </div>
        <div>
          <label className="label" htmlFor="phone">WhatsApp / Telefone *</label>
          <input id="phone" name="phone" required className="input" placeholder="(14) 99999-9999" />
        </div>
        <div>
          <label className="label" htmlFor="city">Cidade {type !== "contato" && "*"}</label>
          <input id="city" name="city" required={type !== "contato"} className="input" placeholder="Cidade" />
        </div>
        <div>
          <label className="label" htmlFor="state">Estado (UF) {type !== "contato" && "*"}</label>
          <select id="state" name="state" required={type !== "contato"} className="input" defaultValue="">
            <option value="" disabled>Selecione</option>
            {brazilianStates.map((uf) => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>
        </div>
        <div className={compact ? "" : "sm:col-span-2"}>
          <label className="label" htmlFor="segment">Perfil da empresa</label>
          <select id="segment" name="segment" className="input" defaultValue={initialSegment}>
            <option value="">Selecione</option>
            {segments.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
            <option value="outro">Outro</option>
          </select>
        </div>
      </div>

      {showProducts && (
        <div>
          <div className="flex items-center justify-between">
            <span className="label">Produtos de interesse {type === "orcamento" && "*"}</span>
            {selected.length > 0 && (
              <span className="text-xs font-semibold text-brand-700">{selected.length} selecionado(s)</span>
            )}
          </div>
          {selected.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1.5">
              {selected.map((code) => {
                const p = products.find((x) => x.code === code);
                return (
                  <button
                    type="button"
                    key={code}
                    onClick={() => toggle(code)}
                    className="inline-flex items-center gap-1 rounded bg-brand-50 px-2 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-100"
                  >
                    {code} {p ? `– ${p.name}` : ""} <span aria-hidden>×</span>
                  </button>
                );
              })}
            </div>
          )}
          <input
            className="input mb-2"
            placeholder="Buscar por nome ou código (ex.: CF-MC-201, lâmina, pistão)"
            value={productQuery}
            onChange={(e) => setProductQuery(e.target.value)}
          />
          <div className="max-h-56 overflow-y-auto rounded-md border border-steel-200">
            {categories.map((cat) => {
              const items = filtered.filter((p) => p.category === cat.slug);
              if (!items.length) return null;
              return (
                <div key={cat.slug}>
                  <div className="sticky top-0 bg-steel-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-steel-600">
                    {cat.name}
                  </div>
                  {items.map((p) => (
                    <label key={p.code} className="flex cursor-pointer items-center gap-3 px-3 py-2 text-sm hover:bg-steel-50">
                      <input
                        type="checkbox"
                        checked={selected.includes(p.code)}
                        onChange={() => toggle(p.code)}
                        className="h-4 w-4 accent-brand-500"
                      />
                      <span className="font-mono text-xs text-brand-700">{p.code}</span>
                      <span className="text-steel-800">{p.name}</span>
                    </label>
                  ))}
                </div>
              );
            })}
            {filtered.length === 0 && <p className="p-3 text-sm text-steel-500">Nenhum produto encontrado.</p>}
          </div>
        </div>
      )}

      {(type === "orcamento" || type === "amostra") && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="quantity">
              {type === "amostra" ? "Volume previsto de compra" : "Quantidade estimada"}
            </label>
            <input id="quantity" name="quantity" className="input" placeholder="Ex.: 500 un/mês, lote único de 200" />
          </div>
          <div>
            <label className="label" htmlFor="application">Aplicação</label>
            <input id="application" name="application" className="input" placeholder="Ex.: cadeira operativa, longarina p/ licitação" />
          </div>
        </div>
      )}

      <div>
        <label className="label" htmlFor="message">
          {type === "documentacao" ? "Quais documentos você precisa? *" : "Observações"}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required={type === "documentacao" || type === "contato"}
          className="input"
          placeholder={
            type === "documentacao"
              ? "Ex.: laudo NBR 13962 do back system, certificado de matéria-prima e declaração de origem para o pregão nº..."
              : "Detalhes técnicos, prazos, acabamento desejado, desenho próprio, etc."
          }
        />
      </div>

      {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
          {loading ? "Enviando..." : copy.submit}
        </button>
        <p className="text-xs text-steel-500">
          Sua solicitação é direcionada automaticamente ao representante da sua região.
        </p>
      </div>
    </form>
  );
}
