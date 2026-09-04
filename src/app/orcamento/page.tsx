import type { Metadata } from "next";
import Link from "next/link";
import { getProductByCode, getProductsByCategory } from "@/data/catalog";
import { company, whatsappLink } from "@/data/company";
import { LeadForm } from "@/components/LeadForm";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Solicitar orçamento",
  description: "Solicite orçamento de componentes para cadeiras de escritório. Sua solicitação é direcionada automaticamente ao representante da sua região.",
};

type Search = { produto?: string | string[]; categoria?: string; tipo?: string; segmento?: string };

export default async function QuotePage({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const codes = (Array.isArray(sp.produto) ? sp.produto : sp.produto ? sp.produto.split(",") : [])
    .map((c) => getProductByCode(c.trim())?.code)
    .filter((c): c is string => Boolean(c));
  const fromCategory = sp.categoria ? getProductsByCategory(sp.categoria).map((p) => p.code) : [];
  const initial = Array.from(new Set([...codes, ...fromCategory]));
  const type = sp.tipo === "documentacao" ? "documentacao" : "orcamento";

  return (
    <>
      <PageHero
        eyebrow="Orçamento"
        title={type === "documentacao" ? "Solicitar documentação técnica" : "Solicite um orçamento"}
        description="Informe empresa, cidade, produto, quantidade e aplicação. Direcionamos automaticamente ao comercial responsável pela sua região, que retorna em até 1 dia útil."
      />
      <section className="bg-steel-50 py-12 md:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="rounded-lg border border-steel-200 bg-white p-6 md:p-8">
            <LeadForm type={type} initialProducts={initial} initialSegment={sp.segmento ?? ""} source="/orcamento" />
          </div>
          <aside className="space-y-5">
            <div className="rounded-lg border border-steel-200 bg-white p-6">
              <h2 className="font-bold text-steel-900">Prefere falar agora?</h2>
              <div className="mt-4 space-y-3">
                {company.phones.map((p) => (
                  <a key={p.digits} href={whatsappLink(p.digits, "Olá, gostaria de um orçamento.")} target="_blank" rel="noreferrer" className="block rounded-md border border-steel-200 p-3 hover:border-[#25D366]">
                    <span className="block text-xs text-steel-500">{p.label}</span>
                    <span className="font-bold text-steel-900">{p.number}</span>
                  </a>
                ))}
                <a href={`mailto:${company.email}`} className="block rounded-md border border-steel-200 p-3 hover:border-brand-500">
                  <span className="block text-xs text-steel-500">E-mail comercial</span>
                  <span className="font-bold text-steel-900">{company.email}</span>
                </a>
              </div>
              <p className="mt-3 text-xs text-steel-500">{company.hours}</p>
            </div>
            <div className="rounded-lg bg-steel-900 p-6 text-white">
              <h2 className="font-bold">O que acontece depois</h2>
              <ol className="mt-3 space-y-2 text-sm text-steel-200">
                <li>1. Sua solicitação recebe um protocolo.</li>
                <li>2. É roteada ao representante da sua UF (ou à fábrica).</li>
                <li>3. Você recebe proposta com preço, prazo e condições.</li>
                <li>4. Se quiser, enviamos amostra antes do pedido.</li>
              </ol>
              <Link href="/representantes" className="mt-4 inline-block text-sm font-semibold text-brand-300">Ver representante da minha região →</Link>
            </div>
            <div className="rounded-lg border border-steel-200 bg-white p-6 text-sm text-steel-600">
              <p className="font-bold text-steel-900">Política de preços</p>
              <p className="mt-1">Tabelas de preço e condições comerciais são restritas ao atendimento comercial e não são publicadas no site.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
