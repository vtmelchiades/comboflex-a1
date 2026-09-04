import type { Metadata } from "next";
import Link from "next/link";
import { events, representatives } from "@/data/company";
import { Badge, CtaBanner, PageHero, SectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "Feiras, parcerias e autoridade de mercado",
  description: "Participação em feiras do setor moveleiro, parcerias estratégicas e projetos conjuntos da Comboflex Metalúrgica.",
};

export default function EventsPage() {
  const fairs = events.filter((e) => e.kind === "Feira");
  const partnerships = events.filter((e) => e.kind !== "Feira");
  const partnerCompanies = Array.from(new Set(representatives.map((r) => r.companyName)));

  return (
    <>
      <PageHero
        eyebrow="Feiras, parcerias e mercado"
        title="Presença onde a indústria moveleira se encontra"
        description="Participamos das principais feiras do setor, construímos parcerias comerciais de longo prazo e desenvolvemos projetos em conjunto com fabricantes reconhecidos."
      >
        <Link href="/contato" className="btn-primary">Agendar reunião em feira</Link>
        <Link href="/quem-somos" className="btn bg-white text-steel-900 hover:bg-steel-100">Conhecer a empresa</Link>
      </PageHero>

      <section className="bg-white py-14 md:py-20">
        <div className="container-x">
          <SectionTitle eyebrow="Feiras" title="Agenda e participações" />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {fairs.map((e) => (
              <div key={e.id} className="rounded-lg border border-steel-200 p-6">
                <div className="flex items-center gap-2">
                  <Badge tone={e.upcoming ? "brand" : "steel"}>{e.upcoming ? "Próxima" : "Realizada"}</Badge>
                  <span className="text-sm text-steel-500">{e.date}{e.location ? ` • ${e.location}` : ""}</span>
                </div>
                <h3 className="mt-3 text-xl font-black text-steel-900">{e.title}</h3>
                <p className="mt-2 text-sm text-steel-600">{e.description}</p>
                {e.upcoming && (
                  <Link href="/contato" className="mt-4 inline-block text-sm font-semibold text-brand-600">Agendar visita ao estande →</Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-steel-50 py-14 md:py-20">
        <div className="container-x">
          <SectionTitle eyebrow="Parcerias e projetos" title="Crescendo junto com o setor" description="Parcerias comerciais, codesenvolvimento com fabricantes e programas de relacionamento que sustentam a credibilidade da marca." />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {partnerships.map((e) => (
              <div key={e.id} className="rounded-lg border border-steel-200 bg-white p-6">
                <div className="flex items-center gap-2">
                  <Badge tone="brand">{e.kind}</Badge>
                  <span className="text-xs text-steel-500">{e.date}</span>
                </div>
                <h3 className="mt-3 font-bold text-steel-900">{e.title}</h3>
                <p className="mt-2 text-sm text-steel-600">{e.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Rede de parceiros comerciais" title="Empresas que representam a Comboflex" />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {partnerCompanies.map((c) => (
                <li key={c} className="flex items-center gap-3 rounded-lg border border-steel-200 p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded bg-steel-900 text-sm font-black text-white">{c.slice(0, 2).toUpperCase()}</span>
                  <span className="font-semibold text-steel-900">{c}</span>
                </li>
              ))}
            </ul>
            <Link href="/representantes" className="mt-5 inline-block text-sm font-semibold text-brand-600">Ver contatos por região →</Link>
          </div>
          <div className="rounded-lg bg-steel-900 p-8 text-white">
            <p className="eyebrow text-brand-400">Espaço para parceiros</p>
            <h3 className="mt-2 text-2xl font-black">Projetos conjuntos e cobranding</h3>
            <p className="mt-3 text-steel-200">
              Fabricantes de cadeiras, fornecedores de espumas, estofados e plásticos: desenvolvemos componentes em conjunto e apresentamos os projetos aqui, ao lado de marcas já reconhecidas no setor. Se a sua empresa quer construir um case com a Comboflex, fale conosco.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link href="/contato" className="btn-primary">Propor parceria</Link>
              <Link href="/amostras" className="btn border border-white/30 text-white hover:bg-white/10">Materiais comerciais</Link>
            </div>
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
