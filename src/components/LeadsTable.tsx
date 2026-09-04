"use client";

import { Fragment, useState } from "react";

type LeadRow = {
  id: number;
  type: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  city: string | null;
  state: string | null;
  segment: string | null;
  productCodes: string[] | null;
  quantity: string | null;
  application: string | null;
  message: string | null;
  assignedRepName: string | null;
  status: string;
  source: string | null;
  createdAt: string;
};

const typeLabel: Record<string, string> = {
  orcamento: "Orçamento",
  amostra: "Amostra",
  contato: "Contato",
  catalogo: "Catálogo",
  documentacao: "Documentação",
};

const statusLabel: Record<string, string> = {
  novo: "Novo",
  em_atendimento: "Em atendimento",
  concluido: "Concluído",
};

const statusTone: Record<string, string> = {
  novo: "bg-brand-50 text-brand-700",
  em_atendimento: "bg-amber-50 text-amber-700",
  concluido: "bg-green-50 text-green-700",
};

export function LeadsTable({ initial, adminKey }: { initial: LeadRow[]; adminKey: string }) {
  const [rows, setRows] = useState(initial);
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState<number | null>(null);

  async function updateStatus(id: number, status: string) {
    const res = await fetch(`/api/leads/${id}?key=${encodeURIComponent(adminKey)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) setRows((r) => r.map((l) => (l.id === id ? { ...l, status } : l)));
  }

  const list = rows.filter((r) => !filter || r.type === filter || r.status === filter);

  return (
    <div className="rounded-lg border border-steel-200 bg-white">
      <div className="flex flex-wrap items-center gap-2 border-b border-steel-200 p-3">
        {["", "novo", "orcamento", "amostra", "documentacao", "contato", "catalogo"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded px-3 py-1 text-xs font-semibold ${filter === f ? "bg-steel-900 text-white" : "bg-steel-100 text-steel-700"}`}>
            {f === "" ? "Todos" : f === "novo" ? "Novos" : typeLabel[f]}
          </button>
        ))}
      </div>
      {list.length === 0 ? (
        <p className="p-8 text-center text-sm text-steel-500">Nenhum lead ainda. As solicitações do site aparecerão aqui.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-steel-50 text-left text-xs font-bold uppercase tracking-wider text-steel-500">
              <tr>
                <th className="px-3 py-2">#</th>
                <th className="px-3 py-2">Data</th>
                <th className="px-3 py-2">Tipo</th>
                <th className="px-3 py-2">Empresa / contato</th>
                <th className="px-3 py-2">Local</th>
                <th className="px-3 py-2">Produtos</th>
                <th className="px-3 py-2">Responsável</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steel-100">
              {list.map((l) => (
                <Fragment key={l.id}>
                  <tr className="cursor-pointer align-top hover:bg-steel-50" onClick={() => setOpen(open === l.id ? null : l.id)}>
                    <td className="px-3 py-2 font-mono text-xs">{l.id}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs">{new Date(l.createdAt).toLocaleString("pt-BR")}</td>
                    <td className="px-3 py-2">{typeLabel[l.type] ?? l.type}</td>
                    <td className="px-3 py-2">
                      <p className="font-semibold text-steel-900">{l.companyName}</p>
                      <p className="text-xs text-steel-600">{l.contactName} • {l.phone}</p>
                    </td>
                    <td className="px-3 py-2 text-xs">{[l.city, l.state].filter(Boolean).join("/") || "—"}</td>
                    <td className="px-3 py-2 text-xs">{l.productCodes?.length ? l.productCodes.join(", ") : "—"}</td>
                    <td className="px-3 py-2 text-xs">{l.assignedRepName ?? "—"}</td>
                    <td className="px-3 py-2" onClick={(e) => e.stopPropagation()}>
                      <select value={l.status} onChange={(e) => updateStatus(l.id, e.target.value)} className={`rounded px-2 py-1 text-xs font-semibold ${statusTone[l.status]}`}>
                        {Object.entries(statusLabel).map(([k, v]) => (
                          <option key={k} value={k}>{v}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  {open === l.id && (
                    <tr className="bg-steel-50">
                      <td colSpan={8} className="px-4 py-3 text-xs text-steel-700">
                        <div className="grid gap-2 md:grid-cols-3">
                          <p><strong>E-mail:</strong> {l.email}</p>
                          <p><strong>Segmento:</strong> {l.segment ?? "—"}</p>
                          <p><strong>Origem:</strong> {l.source ?? "—"}</p>
                          <p><strong>Quantidade:</strong> {l.quantity ?? "—"}</p>
                          <p className="md:col-span-2"><strong>Aplicação:</strong> {l.application ?? "—"}</p>
                          <p className="md:col-span-3"><strong>Mensagem:</strong> {l.message ?? "—"}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
