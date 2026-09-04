import type { Metadata } from "next";
import Link from "next/link";
import { categories, getProductByCode, products } from "@/data/catalog";
import { company, segments, whatsappLink } from "@/data/company";
import { LeadForm } from "@/components/LeadForm";
import { PageHero, SectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "Amostras e materiais comerciais",
  description: "Como solicitar amostras de componentes Comboflex e acessar materiais digitais para representantes e revendas.",
};

export default async function SamplesPage({ searchParams }: { searchParams: Promise<{ produto?: string }> }) {
  const sp = await searchParams;
  const initial = sp.produto ? [getProductByCode(sp.produto)?.code].filter((c): c is string => Boolean(c)) : [];

  const kits = [
    { name: "Kit apresentação – Linha Back System", items: "Back System Lion + lâmina + folder da linha", for: "Fabricantes de cadeiras operativas" },
    { name: "Kit apresentação – Mecanismos", items: "Mecanismo Relax CF-201 + ficha técnica + tabela de compatibilidade", for: "Fabricantes e projetos corporativos" },
    { name: "Kit revenda – Reposição", items: "Pistão classe 3 + Back System Standard + guia de instalação", for: "Lojistas, assistências e e-commerce" },
  ];

  const digital = [
    { title: "Catálogo técnico digital (PDF)", text: "Versão pública sem preços, para encaminhar por WhatsApp ou e-mail.", href: "/catalogo" },
    { title: "Ficha técnica por produto", text: "Cada página de produto é uma ficha técnica compartilhável, com código, medidas e compatibilidades.", href: "/produtos" },
    { title: "Página por mercado", text: "Links diretos para fabricantes, revendas, corporativo, e-commerce e licitações.", href: "/solucoes" },
    { title: "Documentos de qualidade", text: "Laudos, certificados e declarações para anexar em propostas.", href: "/qualidade" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Amostras e materiais comerciais"
        title="Teste antes de comprar e apresente a marca com o material certo"
        description="Enviamos amostras identificadas com a marca Comboflex, sempre acompanhadas do folder das demais linhas. Representantes e revendas têm material digital pronto para encaminhar pelo WhatsApp."
      >
        <a href="#solicitar" className="btn-primary">Solicitar amostra</a>
        <Link href="/catalogo" className="btn bg-white text-steel-900 hover:bg-steel-100">Catálogo digital</Link>
      </PageHero>

      <section className="bg-white py-14 md:py-20">
        <div className="container-x">
          <SectionTitle eyebrow="Como funciona" title="Solicitação de amostras em 4 passos" />
          <ol className="mt-8 grid gap-5 md:grid-cols-4">
            {[
              { t: "Escolha o item", d: "Informe o código (ex.: CF-BS-101) ou descreva a aplicação. Se tiver uma peça de referência, envie foto." },
              { t: "Qualificação", d: "O representante confirma volume previsto, prazo do projeto e o acabamento desejado." },
              { t: "Envio identificado", d: "A amostra segue com etiqueta Comboflex, ficha técnica impressa e folder com as demais linhas." },
              { t: "Validação e pedido", d: "Após aprovação na sua linha, o representante formaliza proposta e programa entregas." },
            ].map((s, i) => (
              <li key={s.t} className="rounded-lg border border-steel-200 p-5">
                <span className="text-3xl font-black text-brand-500">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-bold text-steel-900">{s.t}</h3>
                <p className="mt-1.5 text-sm text-steel-600">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 grid gap-4 rounded-lg bg-steel-50 p-6 text-sm text-steel-700 md:grid-cols-3">
            <p><strong className="text-steel-900">Custo:</strong> amostras unitárias são gratuitas para empresas com volume previsto; frete por conta do solicitante. Demais casos, valor abatido no primeiro pedido.</p>
            <p><strong className="text-steel-900">Prazo:</strong> itens de linha em até 5 dias úteis; itens sob medida conforme cronograma de protótipo.</p>
            <p><strong className="text-steel-900">Padrão de envio:</strong> toda amostra sai com identificação da marca, código gravado e material das outras famílias de produto.</p>
          </div>
        </div>
      </section>

      <section className="bg-steel-50 py-14 md:py-20">
        <div className="container-x">
          <SectionTitle eyebrow="Kits de apresentação" title="Kits prontos para representantes e visitas técnicas" description="Conjuntos padronizados que mostram a linha completa e ajudam o cliente a visualizar a cadeira montada." />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {kits.map((k) => (
              <div key={k.name} className="rounded-lg border border-steel-200 bg-white p-6">
                <h3 className="font-bold text-steel-900">{k.name}</h3>
                <p className="mt-2 text-sm text-steel-700"><span className="font-semibold">Contém:</span> {k.items}</p>
                <p className="mt-1 text-sm text-steel-600"><span className="font-semibold">Indicado para:</span> {k.for}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Materiais digitais" title="Para encaminhar pelo WhatsApp" description="Tudo o que o representante precisa para apresentar a Comboflex sem esperar por PDF: links diretos, compartilháveis e sempre atualizados." />
            <ul className="mt-8 space-y-3">
              {digital.map((d) => (
                <li key={d.title}>
                  <Link href={d.href} className="flex items-start justify-between gap-4 rounded-lg border border-steel-200 p-4 hover:border-brand-400">
                    <div>
                      <p className="font-bold text-steel-900">{d.title}</p>
                      <p className="mt-0.5 text-sm text-steel-600">{d.text}</p>
                    </div>
                    <span className="text-brand-600">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-steel-900">Links rápidos por família (copie e envie)</h3>
            <ul className="mt-4 divide-y divide-steel-100 rounded-lg border border-steel-200 text-sm">
              {categories.map((c) => (
                <li key={c.slug} className="flex items-center justify-between px-4 py-2.5">
                  <span className="text-steel-800">{c.name}</span>
                  <code className="rounded bg-steel-100 px-2 py-0.5 text-xs text-steel-700">comboflex.com.br/produtos/{c.slug}</code>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 font-bold text-steel-900">Mensagem sugerida para representantes</h3>
            <div className="mt-3 rounded-lg bg-[#e7ffdb] p-4 text-sm text-steel-800">
              Olá! Sou representante da Comboflex Metalúrgica (Jaú/SP), fabricante nacional de componentes para cadeiras de
              escritório: back systems, mecanismos, lâminas, estruturas, pistões e flanges. Veja o catálogo técnico em
              comboflex.com.br/catalogo e me diga qual componente você precisa – envio amostra e orçamento.
            </div>
            <a href={whatsappLink(company.phones[0].digits, "Olá! Sou representante e gostaria de receber o kit de apresentação Comboflex.")} target="_blank" rel="noreferrer" className="btn-whatsapp mt-4">
              Sou representante: solicitar kit
            </a>
          </div>
        </div>
      </section>

      <section id="solicitar" className="bg-steel-50 py-14 md:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_340px]">
          <div className="rounded-lg border border-steel-200 bg-white p-6 md:p-8">
            <h2 className="text-2xl font-black text-steel-900">Solicitar amostra</h2>
            <p className="mt-1 mb-6 text-sm text-steel-600">Selecione os itens de interesse. Temos {products.length} produtos de linha; para itens sob medida, descreva nas observações.</p>
            <LeadForm type="amostra" initialProducts={initial} source="/amostras" />
          </div>
          <aside className="space-y-4">
            <div className="rounded-lg border border-steel-200 bg-white p-5 text-sm">
              <p className="font-bold text-steel-900">Amostra por perfil</p>
              <ul className="mt-2 space-y-1 text-steel-700">
                {segments.map((s) => (
                  <li key={s.slug}><Link href={`/solucoes/${s.slug}`} className="hover:text-brand-600">{s.icon} {s.name}</Link></li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
