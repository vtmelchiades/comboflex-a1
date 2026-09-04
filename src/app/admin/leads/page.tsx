import type { Metadata } from "next";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { LeadsTable } from "@/components/LeadsTable";

export const metadata: Metadata = { title: "Painel de leads", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminLeadsPage({ searchParams }: { searchParams: Promise<{ key?: string }> }) {
  const { key } = await searchParams;
  const adminKey = process.env.ADMIN_KEY ?? "comboflex";

  if (key !== adminKey) {
    return (
      <section className="container-x py-20">
        <div className="mx-auto max-w-md rounded-lg border border-steel-200 p-8">
          <h1 className="text-2xl font-black text-steel-900">Área comercial</h1>
          <p className="mt-2 text-sm text-steel-600">Informe a chave de acesso para visualizar os leads recebidos pelo site.</p>
          <form method="get" className="mt-5 space-y-3">
            <input name="key" type="password" className="input" placeholder="Chave de acesso" />
            <button className="btn-primary w-full">Entrar</button>
          </form>
          <p className="mt-3 text-xs text-steel-400">Configure a variável de ambiente ADMIN_KEY para definir a chave.</p>
        </div>
      </section>
    );
  }

  const rows = await db.select().from(leads).orderBy(desc(leads.createdAt)).limit(300);
  const serial = rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }));

  const counts = {
    total: rows.length,
    novo: rows.filter((r) => r.status === "novo").length,
    orcamento: rows.filter((r) => r.type === "orcamento").length,
    amostra: rows.filter((r) => r.type === "amostra").length,
    catalogo: rows.filter((r) => r.type === "catalogo").length,
  };

  return (
    <section className="bg-steel-50 py-10">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Área comercial</p>
            <h1 className="text-3xl font-black text-steel-900">Leads recebidos pelo site</h1>
            <p className="mt-1 text-sm text-steel-600">Cada lead é roteado automaticamente ao representante da UF informada.</p>
          </div>
          <a href={`/api/leads?key=${encodeURIComponent(key)}`} className="btn-outline px-4 py-2" target="_blank" rel="noreferrer">Exportar JSON</a>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
          {[
            ["Total", counts.total],
            ["Novos", counts.novo],
            ["Orçamentos", counts.orcamento],
            ["Amostras", counts.amostra],
            ["Catálogo", counts.catalogo],
          ].map(([l, v]) => (
            <div key={String(l)} className="rounded-lg border border-steel-200 bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-steel-500">{l}</p>
              <p className="text-2xl font-black text-steel-900">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <LeadsTable initial={serial} adminKey={key} />
        </div>
      </div>
    </section>
  );
}
