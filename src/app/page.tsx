import Image from "next/image";
import Link from "next/link";
import { categories, getFeaturedProducts, products } from "@/data/catalog";
import { company, differentials, representatives, segments, whatsappLink } from "@/data/company";
import { CtaBanner, ProductCard, SectionTitle } from "@/components/ui";

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 6);
  const newProducts = products.filter((p) => p.isNew);
  const statesCovered = new Set(representatives.flatMap((r) => r.states)).size;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-steel-950 text-white">
        <Image src="/images/hero.jpg" alt="Componentes metálicos Comboflex" fill priority className="object-cover opacity-40" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-steel-950 via-steel-950/85 to-steel-950/30" />
        <div className="grid-pattern absolute inset-0" />
        <div className="container-x relative grid gap-10 py-20 md:py-28 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="eyebrow text-brand-400">Indústria metalúrgica • Jaú/SP • Desde {company.founded}</p>
            <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              Componentes metálicos para <span className="text-brand-400">cadeiras de escritório</span>, fabricados no Brasil.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-steel-200">
              Back systems, mecanismos, sistemas relax, lâminas, estruturas, pistões e flanges para fabricantes de
              cadeiras, revendas, projetos corporativos e licitações. Um único fornecedor para a cadeira inteira.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/produtos" className="btn-primary">
                Ver catálogo de produtos
              </Link>
              <Link href="/orcamento" className="btn bg-white text-steel-900 hover:bg-steel-100">
                Solicitar orçamento
              </Link>
              <Link href="/representantes" className="btn border border-white/40 text-white hover:bg-white/10">
                Encontrar representante
              </Link>
            </div>
            <dl className="mt-12 grid max-w-xl grid-cols-2 gap-6 border-t border-white/15 pt-8 sm:grid-cols-4">
              {[
                { v: `${company.yearsInMarket}+`, l: "anos de mercado" },
                { v: "7", l: "famílias de produtos" },
                { v: `${statesCovered}`, l: "estados com representante" },
                { v: "100%", l: "produção nacional" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="text-2xl font-black text-white md:text-3xl">{s.v}</dt>
                  <dd className="text-xs uppercase tracking-wider text-steel-300">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="hidden lg:block">
            <div className="rounded-lg border border-white/15 bg-white/5 p-6 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">Para quem é a Comboflex</p>
              <ul className="mt-4 space-y-3">
                {segments.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/solucoes/${s.slug}`}
                      className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold hover:border-brand-400 hover:bg-white/10"
                    >
                      <span className="flex items-center gap-3">
                        <span aria-hidden>{s.icon}</span> {s.name}
                      </span>
                      <span aria-hidden className="text-brand-300">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* O QUE FABRICAMOS */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle
              eyebrow="O que fabricamos"
              title="Sete famílias de componentes, projetadas para trabalhar juntas"
              description="Furação padrão 150 x 200 mm, cone 50/28 mm e acabamentos uniformes: os componentes Comboflex são intercambiáveis entre si e com o padrão de mercado."
            />
            <Link href="/produtos" className="btn-outline shrink-0">
              Ver todos os produtos
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/produtos/${c.slug}`}
                className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-lg bg-steel-900 text-white"
              >
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/40 to-transparent" />
                <div className="relative p-5">
                  <h3 className="text-lg font-bold">{c.name}</h3>
                  <p className="mt-1 text-xs text-steel-200">{products.filter((p) => p.category === c.slug).length} itens • {c.highlights[0]}</p>
                </div>
              </Link>
            ))}
            <div className="flex aspect-[4/3] flex-col justify-between rounded-lg border-2 border-dashed border-brand-300 bg-brand-50 p-5">
              <div>
                <p className="eyebrow">Sob medida</p>
                <h3 className="mt-2 text-lg font-bold text-steel-900">Não encontrou a peça?</h3>
                <p className="mt-1 text-sm text-steel-600">Desenvolvemos componentes a partir do seu desenho ou amostra, com protótipo aprovado.</p>
              </div>
              <Link href="/orcamento" className="text-sm font-bold text-brand-700">
                Falar com a engenharia →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LANÇAMENTO */}
      {newProducts.length > 0 && (
        <section className="bg-steel-900 py-16 text-white md:py-20">
          <div className="container-x grid items-center gap-10 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image src={newProducts[0].image} alt={newProducts[0].name} fill sizes="50vw" className="object-cover" />
              <span className="absolute left-4 top-4 rounded bg-brand-500 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                Lançamento
              </span>
            </div>
            <div>
              <p className="eyebrow text-brand-400">Novidade Comboflex</p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">Back System Lion e Kit Back System Lion</h2>
              <p className="mt-4 text-steel-200">
                Mais rigidez, catraca de 8 posições com retorno automático e acabamento epóxi texturizado. O kit reúne
                back system, lâmina, capa e parafusos em uma única embalagem – menos SKUs, menos erro de montagem.
              </p>
              <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
                {["Curso de regulagem de 80 mm", "Chapa SAE 1020 de 3 mm", "Testado para 120 kg (NBR 13962)", "Compatível com toda a linha CF-MC"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-400" /> {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                {newProducts.map((p) => (
                  <Link key={p.slug} href={`/produtos/${p.category}/${p.slug}`} className="btn-primary">
                    {p.name} →
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* DESTAQUES */}
      <section className="bg-steel-50 py-16 md:py-24">
        <div className="container-x">
          <SectionTitle eyebrow="Mais especificados" title="Produtos em destaque" description="Os itens mais pedidos por fabricantes e especificadores. Cada produto tem ficha técnica completa, desenho e compatibilidades." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionTitle eyebrow="Por que Comboflex" title="Uma indústria técnica, não apenas um fornecedor de peça" />
            <p className="mt-4 text-steel-600">
              A Comboflex nasceu dentro do polo moveleiro de Jaú/SP e cresceu atendendo fabricantes que precisam de
              componentes confiáveis, com entrega programada e suporte de quem entende de cadeira. Conduzida de perto
              por Angélica e Renato, a empresa acompanha cada etapa: do aço certificado à pintura final.
            </p>
            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-lg">
              <Image src="/images/fabrica.jpg" alt="Fábrica Comboflex em Jaú/SP" fill sizes="50vw" className="object-cover" />
            </div>
            <Link href="/quem-somos" className="btn-dark mt-6">
              Conhecer a fábrica
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {differentials.map((d) => (
              <div key={d.title} className="rounded-lg border border-steel-200 p-5">
                <span className="text-2xl" aria-hidden>{d.icon}</span>
                <h3 className="mt-3 font-bold text-steel-900">{d.title}</h3>
                <p className="mt-1.5 text-sm text-steel-600">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEGMENTOS */}
      <section className="bg-steel-50 py-16 md:py-24">
        <div className="container-x">
          <SectionTitle eyebrow="Soluções por mercado" title="Encontre o caminho certo para a sua necessidade" align="center" />
          <div className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {segments.map((s) => (
              <Link key={s.slug} href={`/solucoes/${s.slug}`} className="group rounded-lg border border-steel-200 bg-white p-5 transition-shadow hover:shadow-md">
                <span className="text-2xl" aria-hidden>{s.icon}</span>
                <h3 className="mt-3 font-bold text-steel-900 group-hover:text-brand-600">{s.name}</h3>
                <p className="mt-1.5 text-sm text-steel-600">{s.headline}</p>
                <span className="mt-4 block text-sm font-semibold text-brand-600">Ver solução →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COMO COMPRAR */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-x">
          <SectionTitle eyebrow="Como comprar" title="Do primeiro contato ao pedido em 4 passos" align="center" />
          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {[
              { t: "Encontre o componente", d: "Navegue pelo catálogo por família ou por mercado. Cada item tem código, medidas e compatibilidades.", href: "/produtos", l: "Ir ao catálogo" },
              { t: "Solicite orçamento ou amostra", d: "Preencha o formulário com empresa, cidade, produto e quantidade. Sem preço público: condições são tratadas pelo comercial.", href: "/orcamento", l: "Solicitar" },
              { t: "Fale com o representante", d: "Sua solicitação vai automaticamente para o representante da sua região, que retorna em até 1 dia útil.", href: "/representantes", l: "Ver regiões" },
              { t: "Receba com documentação", d: "Entrega programada, rastreabilidade de lote e documentos técnicos para o seu processo interno ou licitação.", href: "/qualidade", l: "Ver documentos" },
            ].map((step, i) => (
              <li key={step.t} className="relative rounded-lg border border-steel-200 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-lg font-black text-white">{i + 1}</span>
                <h3 className="mt-4 font-bold text-steel-900">{step.t}</h3>
                <p className="mt-2 text-sm text-steel-600">{step.d}</p>
                <Link href={step.href} className="mt-4 inline-block text-sm font-semibold text-brand-600">
                  {step.l} →
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CANAIS RÁPIDOS */}
      <section className="bg-steel-900 py-14 text-white">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {company.phones.map((p) => (
            <a key={p.digits} href={whatsappLink(p.digits, "Olá, vim pelo site da Comboflex.")} target="_blank" rel="noreferrer" className="rounded-lg border border-white/10 bg-white/5 p-6 hover:bg-white/10">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-300">WhatsApp • {p.label}</p>
              <p className="mt-2 text-2xl font-black">{p.number}</p>
              <p className="mt-1 text-sm text-steel-300">{company.hours}</p>
            </a>
          ))}
          <Link href="/catalogo" className="rounded-lg border border-brand-400/40 bg-brand-500/10 p-6 hover:bg-brand-500/20">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-300">Catálogo técnico digital</p>
            <p className="mt-2 text-2xl font-black">Consulte e baixe</p>
            <p className="mt-1 text-sm text-steel-300">Versão pública sem preços, para compradores, engenheiros e especificadores.</p>
          </Link>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
