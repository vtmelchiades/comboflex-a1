import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { company, differentials, representatives } from "@/data/company";
import { CtaBanner, PageHero, SectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "Quem somos – Indústria de componentes para cadeiras em Jaú/SP",
  description: "História, estrutura fabril, capacidade produtiva e visão de mercado da Comboflex Metalúrgica.",
};

const processes = [
  { t: "Corte e estampagem", d: "Prensas excêntricas e hidráulicas para estampagem de chapas de 2 a 10 mm, com ferramental próprio." },
  { t: "Dobra e conformação", d: "Dobradeiras CNC e conformação de tubos com precisão dimensional para estruturas e lâminas." },
  { t: "Solda MIG", d: "Células de solda MIG com dispositivos dedicados por produto, garantindo repetibilidade." },
  { t: "Usinagem e tratamento", d: "Usinagem de eixos e catracas em SAE 1045 e têmpera dos componentes de desgaste." },
  { t: "Pintura eletrostática", d: "Linha de pintura epóxi a pó com pré-tratamento, cura em estufa e inspeção de aderência." },
  { t: "Montagem e expedição", d: "Montagem de mecanismos e kits, teste funcional por amostragem e embalagem identificada." },
];

const timeline = [
  { y: "2016", t: "Fundação em Jaú/SP", d: "Início como fornecedora de lâminas e suportes estampados para fabricantes locais de cadeiras." },
  { y: "2019", t: "Linha de mecanismos", d: "Desenvolvimento dos primeiros mecanismos relax e back systems próprios, com ferramental dedicado." },
  { y: "2022", t: "Pintura própria e estruturas", d: "Internalização da pintura eletrostática e início da linha de estruturas tubulares e longarinas." },
  { y: "2024", t: "Rede nacional de representantes", d: "Parceria com a Corporate HUB e representantes regionais: atendimento nas cinco regiões do Brasil." },
  { y: "2026", t: "Lançamento Back System Lion", d: "Nova geração de back systems e kits completos, com documentação técnica para projetos corporativos e licitações." },
];

export default function AboutPage() {
  const statesCovered = new Set(representatives.flatMap((r) => r.states)).size;
  return (
    <>
      <PageHero
        eyebrow="Quem somos"
        title="Uma indústria metalúrgica dedicada à cadeira de escritório"
        description="A Comboflex é uma indústria de Jaú/SP especializada em componentes metálicos para cadeiras. Há mais de 8 anos fornecemos back systems, mecanismos, sistemas relax, lâminas, estruturas, pistões e flanges para a indústria moveleira brasileira."
        image="/images/fabrica.jpg"
      />

      <section className="bg-white py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionTitle eyebrow="Nossa história" title="Nascida no polo moveleiro, feita por quem entende de cadeira" />
            <div className="mt-5 space-y-4 text-steel-700">
              <p>
                A Comboflex Metalúrgica nasceu em Jaú, interior de São Paulo, atendendo fabricantes de cadeiras da região que precisavam de um fornecedor próximo, técnico e comprometido com prazo. Começamos com lâminas e peças estampadas e, ano após ano, ampliamos o portfólio até cobrir todos os componentes metálicos de uma cadeira giratória ou fixa.
              </p>
              <p>
                Hoje a empresa é conduzida por <strong>Angélica e Renato</strong>, que acompanham de perto a operação, a equipe e o relacionamento com clientes e parceiros. Essa proximidade é parte do nosso jeito de trabalhar: quem atende conhece a fábrica, e quem produz conhece o cliente.
              </p>
              <p>
                Nossa trajetória é marcada pelo conhecimento técnico, pela qualidade dos produtos, pelo comprometimento nas entregas e pela construção de relações de confiança com a indústria moveleira.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image src="/images/fabrica.jpg" alt="Interior da fábrica Comboflex" fill sizes="50vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-steel-900 py-14 text-white">
        <div className="container-x grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { v: `${company.yearsInMarket}+`, l: "anos de mercado" },
            { v: "7", l: "famílias de produtos" },
            { v: `${statesCovered}`, l: "estados com representante" },
            { v: "5", l: "regiões do Brasil atendidas" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-4xl font-black text-brand-400">{s.v}</p>
              <p className="mt-1 text-sm uppercase tracking-wider text-steel-300">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-steel-50 py-16 md:py-24">
        <div className="container-x">
          <SectionTitle eyebrow="Estrutura e capacidade produtiva" title="Processo completo dentro de casa" description="Do aço certificado à peça pintada e embalada: controlamos cada etapa para garantir repetibilidade e prazo." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {processes.map((p, i) => (
              <div key={p.t} className="rounded-lg border border-steel-200 bg-white p-6">
                <span className="text-xs font-bold text-brand-600">ETAPA {i + 1}</span>
                <h3 className="mt-1 font-bold text-steel-900">{p.t}</h3>
                <p className="mt-2 text-sm text-steel-600">{p.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 rounded-lg border border-steel-200 bg-white p-6 md:grid-cols-4">
            {[
              { l: "Localização", v: "Jaú/SP – polo moveleiro paulista, a 300 km da capital e com acesso às rodovias SP-225 e SP-255" },
              { l: "Matéria-prima", v: "Aço SAE 1020 e 1045 de usinas nacionais, com certificado por lote" },
              { l: "Capacidade", v: "Produção seriada com entregas programadas semanais ou mensais, conforme contrato" },
              { l: "Engenharia", v: "Desenvolvimento de ferramental e protótipos a partir de desenho ou amostra do cliente" },
            ].map((i) => (
              <div key={i.l}>
                <p className="text-xs font-bold uppercase tracking-wider text-steel-500">{i.l}</p>
                <p className="mt-1 text-sm text-steel-800">{i.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionTitle eyebrow="Linha do tempo" title="Crescimento passo a passo" />
          </div>
          <ol className="relative space-y-6 border-l-2 border-brand-200 pl-6">
            {timeline.map((t) => (
              <li key={t.y} className="relative">
                <span className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-4 border-white bg-brand-500" />
                <p className="text-sm font-black text-brand-600">{t.y}</p>
                <h3 className="font-bold text-steel-900">{t.t}</h3>
                <p className="text-sm text-steel-600">{t.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-steel-50 py-16 md:py-24">
        <div className="container-x">
          <SectionTitle eyebrow="Visão de mercado" title="Por que fabricantes escolhem um fornecedor nacional e completo" description="A cadeira de escritório brasileira precisa de componentes com reposição garantida, documentação e suporte técnico. É nisso que a Comboflex se posiciona." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {differentials.map((d) => (
              <div key={d.title} className="rounded-lg border border-steel-200 bg-white p-5">
                <span className="text-2xl" aria-hidden>{d.icon}</span>
                <h3 className="mt-3 font-bold text-steel-900">{d.title}</h3>
                <p className="mt-1.5 text-sm text-steel-600">{d.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/produtos" className="btn-primary">Conhecer os produtos</Link>
            <Link href="/feiras-e-parcerias" className="btn-outline">Feiras e parcerias</Link>
            <Link href="/qualidade" className="btn-outline">Qualidade e documentação</Link>
          </div>
        </div>
      </section>
      <CtaBanner title="Visite a fábrica" text="Recebemos compradores, engenheiros e especificadores em Jaú/SP para conhecer o processo e validar componentes em linha." />
    </>
  );
}
