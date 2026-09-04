import type { Metadata } from "next";
import Link from "next/link";
import { company, whatsappLink } from "@/data/company";
import { LeadForm } from "@/components/LeadForm";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Comboflex Metalúrgica: WhatsApp, telefone, e-mail e endereço da fábrica em Jaú/SP.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contato" title="Fale com a Comboflex" description="Escolha o canal mais rápido: WhatsApp para atendimento imediato, formulário para solicitações com detalhes técnicos." />
      <section className="bg-steel-50 py-12 md:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[380px_1fr]">
          <aside className="space-y-4">
            {company.phones.map((p) => (
              <a key={p.digits} href={whatsappLink(p.digits, "Olá, vim pelo site da Comboflex.")} target="_blank" rel="noreferrer" className="block rounded-lg border border-steel-200 bg-white p-5 hover:border-[#25D366]">
                <p className="text-xs font-bold uppercase tracking-wider text-steel-500">WhatsApp • {p.label}</p>
                <p className="mt-1 text-xl font-black text-steel-900">{p.number}</p>
              </a>
            ))}
            <a href={`mailto:${company.email}`} className="block rounded-lg border border-steel-200 bg-white p-5 hover:border-brand-500">
              <p className="text-xs font-bold uppercase tracking-wider text-steel-500">E-mail</p>
              <p className="mt-1 text-lg font-bold text-steel-900">{company.email}</p>
            </a>
            <div className="rounded-lg border border-steel-200 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-steel-500">Fábrica</p>
              <p className="mt-1 text-sm text-steel-800">{company.address}</p>
              <p className="mt-1 text-sm text-steel-600">{company.hours}</p>
              <a href={company.mapsUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-brand-600">Abrir no Google Maps →</a>
            </div>
            <div className="rounded-lg bg-steel-900 p-5 text-sm text-white">
              <p className="font-bold">Já sabe o que precisa?</p>
              <div className="mt-3 flex flex-col gap-2">
                <Link href="/orcamento" className="btn-primary">Solicitar orçamento</Link>
                <Link href="/representantes" className="btn border border-white/30 text-white hover:bg-white/10">Representante da minha região</Link>
              </div>
            </div>
          </aside>
          <div className="rounded-lg border border-steel-200 bg-white p-6 md:p-8">
            <h2 className="text-2xl font-black text-steel-900">Envie uma mensagem</h2>
            <p className="mt-1 mb-6 text-sm text-steel-600">Dúvidas técnicas, parcerias, imprensa ou interesse em ser representante.</p>
            <LeadForm type="contato" source="/contato" />
          </div>
        </div>
      </section>
    </>
  );
}
