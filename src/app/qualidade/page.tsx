import type { Metadata } from "next";
import Link from "next/link";
import { qualityDocuments, standards } from "@/data/company";
import { Badge, CtaBanner, PageHero, SectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "Qualidade e documentação técnica",
  description: "Certificações, laudos, fichas técnicas, normas aplicáveis e documentos para processos corporativos e licitações.",
};

const controls = [
  { t: "Recebimento de aço", d: "Conferência de certificado de usina por lote e verificação dimensional da chapa e do tubo." },
  { t: "Controle em processo", d: "Inspeção dimensional por amostragem em estampagem, dobra e solda, com gabaritos dedicados." },
  { t: "Pintura", d: "Controle de espessura de camada e teste de aderência (grade) por lote pintado." },
  { t: "Teste funcional", d: "Mecanismos e back systems passam por teste de acionamento e verificação de folgas antes da embalagem." },
  { t: "Rastreabilidade", d: "Etiqueta com código, lote e data em cada embalagem, permitindo rastrear matéria-prima e processo." },
  { t: "Ensaios externos", d: "Ensaios de carga e ciclagem em laboratório parceiro, conforme NBR 13962, para itens de linha e projetos específicos." },
];

export default function QualityPage() {
  const available = qualityDocuments.filter((d) => d.status === "disponivel");
  const upcoming = qualityDocuments.filter((d) => d.status === "em_elaboracao");

  return (
    <>
      <PageHero
        eyebrow="Qualidade e documentação"
        title="Documentação técnica para especificar, aprovar e licitar com segurança"
        description="Reunimos aqui laudos, certificados, fichas técnicas e declarações. Os documentos são fornecidos ao comercial mediante solicitação, e novos materiais são incluídos assim que produzidos."
      >
        <Link href="/orcamento?tipo=documentacao" className="btn-primary">Solicitar documentos</Link>
        <Link href="/catalogo" className="btn bg-white text-steel-900 hover:bg-steel-100">Catálogo técnico</Link>
      </PageHero>

      <section className="bg-white py-12 md:py-16">
        <div className="container-x">
          <SectionTitle eyebrow="Biblioteca" title="Documentos disponíveis" description="Solicite pelo formulário informando o item e a finalidade (aprovação de projeto, edital, auditoria). Enviamos em PDF assinado." />
          <div className="mt-8 overflow-hidden rounded-lg border border-steel-200">
            <table className="w-full text-sm">
              <thead className="bg-steel-100 text-left text-xs font-bold uppercase tracking-wider text-steel-600">
                <tr>
                  <th className="px-4 py-3">Documento</th>
                  <th className="hidden px-4 py-3 md:table-cell">Tipo</th>
                  <th className="hidden px-4 py-3 lg:table-cell">Abrangência</th>
                  <th className="hidden px-4 py-3 md:table-cell">Atualização</th>
                  <th className="px-4 py-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-steel-100">
                {available.map((d) => (
                  <tr key={d.id} className="align-top">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-steel-900">{d.title}</p>
                      <p className="mt-0.5 text-xs text-steel-600">{d.description}</p>
                    </td>
                    <td className="hidden px-4 py-3 md:table-cell"><Badge>{d.type}</Badge></td>
                    <td className="hidden px-4 py-3 text-steel-700 lg:table-cell">{d.scope}</td>
                    <td className="hidden px-4 py-3 text-steel-700 md:table-cell">{d.updatedAt}</td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/orcamento?tipo=documentacao`} className="text-xs font-bold text-brand-600 hover:underline">Solicitar</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-10 text-lg font-bold text-steel-900">Em elaboração</h3>
          <p className="text-sm text-steel-600">Documentos em processo de ensaio ou certificação. Serão incluídos assim que emitidos.</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {upcoming.map((d) => (
              <div key={d.id} className="rounded-lg border border-dashed border-amber-300 bg-amber-50 p-5">
                <div className="flex items-center gap-2"><Badge tone="amber">{d.type}</Badge><Badge tone="amber">{d.updatedAt}</Badge></div>
                <p className="mt-2 font-semibold text-steel-900">{d.title}</p>
                <p className="text-sm text-steel-600">{d.description}</p>
                <p className="mt-1 text-xs text-steel-500">Abrangência: {d.scope}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-steel-50 py-12 md:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Normas aplicáveis" title="Referências normativas" />
            <ul className="mt-6 space-y-3">
              {standards.map((s) => (
                <li key={s.code} className="rounded-lg border border-steel-200 bg-white p-4">
                  <p className="font-mono text-sm font-bold text-brand-700">{s.code}</p>
                  <p className="text-sm text-steel-700">{s.title}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionTitle eyebrow="Controle de qualidade" title="Como garantimos cada lote" />
            <ul className="mt-6 space-y-3">
              {controls.map((c) => (
                <li key={c.t} className="flex gap-3 rounded-lg border border-steel-200 bg-white p-4">
                  <span className="text-green-600">✓</span>
                  <div>
                    <p className="font-semibold text-steel-900">{c.t}</p>
                    <p className="text-sm text-steel-600">{c.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container-x rounded-lg border border-brand-200 bg-brand-50 p-6 md:p-8">
          <h2 className="text-xl font-black text-steel-900">Para licitações e compras corporativas</h2>
          <p className="mt-2 max-w-3xl text-sm text-steel-700">
            Montamos o dossiê técnico por item do edital: ficha técnica, desenho, laudo, certificado de matéria-prima e declaração de origem nacional. Informe o número do processo e os itens para receber a documentação organizada.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/orcamento?tipo=documentacao&segmento=licitacoes" className="btn-primary">Solicitar dossiê para licitação</Link>
            <Link href="/solucoes/licitacoes" className="btn-outline">Ver solução para licitações</Link>
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
