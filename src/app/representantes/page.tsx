import type { Metadata } from "next";
import Link from "next/link";
import { company, factoryRep, representatives, whatsappLink } from "@/data/company";
import { RepFinder } from "@/components/RepFinder";
import { CtaBanner, PageHero, SectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "Representantes e atendimento por região",
  description: "Encontre o representante Comboflex da sua região, contatos e orientações para pedido, orçamento e suporte técnico.",
};

const regions: { name: string; states: string[] }[] = [
  { name: "Sudeste", states: ["SP", "MG", "RJ", "ES"] },
  { name: "Sul", states: ["RS", "SC", "PR"] },
  { name: "Nordeste", states: ["BA", "CE", "PE", "RN", "PB", "PI", "MA", "SE", "AL"] },
  { name: "Norte", states: ["AM", "PA", "AC", "RO", "RR", "AP", "TO"] },
  { name: "Centro-Oeste", states: ["GO", "MT", "MS", "DF"] },
];

export default function RepsPage() {
  const all = [...representatives, factoryRep];
  return (
    <>
      <PageHero
        eyebrow="Representantes e atendimento"
        title="Quem procurar na sua região"
        description="Representantes comerciais nas cinco regiões do Brasil, com suporte próximo para orçamento, pedido e acompanhamento. Estados sem representante exclusivo são atendidos diretamente pela fábrica."
      >
        <Link href="/orcamento" className="btn-primary">Solicitar orçamento</Link>
        <Link href="/contato" className="btn bg-white text-steel-900 hover:bg-steel-100">Falar com a fábrica</Link>
      </PageHero>

      <section className="bg-steel-50 py-12 md:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[380px_1fr]">
          <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <RepFinder />
            <div className="rounded-lg bg-steel-900 p-6 text-sm text-white">
              <p className="font-bold">Como avançar</p>
              <ul className="mt-3 space-y-2 text-steel-200">
                <li><strong className="text-white">Orçamento:</strong> use o formulário ou chame o representante no WhatsApp com código e quantidade.</li>
                <li><strong className="text-white">Pedido:</strong> o representante formaliza a proposta; a fábrica confirma prazo e programa a entrega.</li>
                <li><strong className="text-white">Suporte técnico:</strong> dúvidas de montagem, compatibilidade e documentação vão direto à engenharia da fábrica.</li>
                <li><strong className="text-white">Lojistas e revendas:</strong> atendimento dedicado pelo WhatsApp {company.phones[1].number}.</li>
              </ul>
            </div>
          </div>
          <div>
            <SectionTitle eyebrow="Rede comercial" title="Representantes por região" />
            <div className="mt-8 space-y-8">
              {regions.map((r) => {
                const reps = all.filter((rep) => rep.states.some((s) => r.states.includes(s)));
                return (
                  <div key={r.name}>
                    <h3 className="flex items-center gap-3 text-lg font-bold text-steel-900">
                      {r.name}
                      <span className="text-xs font-semibold text-steel-500">{r.states.join(" • ")}</span>
                    </h3>
                    <div className="mt-3 grid gap-4 md:grid-cols-2">
                      {reps.map((rep) => (
                        <div key={rep.id + r.name} className="rounded-lg border border-steel-200 bg-white p-5">
                          <div className="flex flex-wrap gap-1">
                            {rep.states.filter((s) => r.states.includes(s)).map((s) => (
                              <span key={s} className="rounded bg-brand-50 px-1.5 py-0.5 text-[11px] font-bold text-brand-700">{s}</span>
                            ))}
                          </div>
                          <p className="mt-2 font-bold text-steel-900">{rep.name}</p>
                          <p className="text-sm text-steel-600">{rep.companyName}</p>
                          <div className="mt-3 flex flex-wrap gap-2 text-sm">
                            <a href={whatsappLink(rep.whatsappDigits, "Olá, vim pelo site da Comboflex.")} target="_blank" rel="noreferrer" className="font-semibold text-[#128C7E] hover:underline">
                              WhatsApp {rep.whatsapp}
                            </a>
                            {rep.email && (
                              <a href={`mailto:${rep.email}`} className="text-steel-600 hover:text-brand-600">{rep.email}</a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-x grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-steel-200 p-6">
            <h3 className="font-bold text-steel-900">Fábrica – Jaú/SP</h3>
            <p className="mt-2 text-sm text-steel-600">{company.address}</p>
            <p className="mt-1 text-sm text-steel-600">{company.hours}</p>
          </div>
          {company.phones.map((p) => (
            <a key={p.digits} href={whatsappLink(p.digits, "Olá, vim pelo site da Comboflex.")} target="_blank" rel="noreferrer" className="rounded-lg border border-steel-200 p-6 hover:border-[#25D366]">
              <h3 className="font-bold text-steel-900">{p.label}</h3>
              <p className="mt-2 text-xl font-black text-steel-900">{p.number}</p>
              <p className="text-sm text-steel-600">WhatsApp e telefone</p>
            </a>
          ))}
        </div>
        <div className="container-x mt-8">
          <div className="rounded-lg border border-dashed border-brand-300 bg-brand-50 p-6 text-sm text-steel-700">
            <strong className="text-steel-900">Quer representar a Comboflex?</strong> Buscamos representantes com atuação no setor moveleiro em PR, RJ, BA e Centro-Oeste.{" "}
            <Link href="/contato" className="font-semibold text-brand-700">Envie sua apresentação →</Link>
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
