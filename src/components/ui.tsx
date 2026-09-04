import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Product } from "@/data/catalog";
import { getCategory } from "@/data/catalog";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  image,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-steel-950 text-white">
      {image && (
        <Image src={image} alt="" fill priority className="object-cover opacity-30" sizes="100vw" />
      )}
      <div className="grid-pattern absolute inset-0" />
      <div className="container-x relative py-16 md:py-20">
        <p className="eyebrow text-brand-400">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-black tracking-tight md:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-base text-steel-200 md:text-lg">{description}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2 text-2xl font-black tracking-tight text-steel-900 md:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-steel-600">{description}</p>}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Navegação estrutural" className="no-print text-sm text-steel-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-steel-900">
            Início
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span aria-hidden>/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-steel-900">
                {item.label}
              </Link>
            ) : (
              <span className="text-steel-900">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const category = getCategory(product.category);
  return (
    <Link
      href={`/produtos/${product.category}/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-steel-200 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-steel-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute left-3 top-3 rounded bg-brand-500 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
            Lançamento
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="font-mono font-semibold text-brand-700">{product.code}</span>
          <span className="text-steel-500">{category?.shortName}</span>
        </div>
        <h3 className="mt-1.5 text-base font-bold text-steel-900 group-hover:text-brand-600">{product.name}</h3>
        {!compact && <p className="mt-1.5 line-clamp-2 text-sm text-steel-600">{product.summary}</p>}
        <div className="mt-auto pt-4 text-sm font-semibold text-brand-600">Ver ficha técnica →</div>
      </div>
    </Link>
  );
}

/** Desenho técnico esquemático gerado a partir das dimensões principais. */
export function TechnicalDrawing({ product }: { product: Product }) {
  const { width, height, depth } = product.drawing;
  const maxDim = Math.max(width, height, depth ?? 0);
  const scale = 180 / maxDim;
  const w = Math.max(width * scale, 12);
  const h = Math.max(height * scale, 12);
  const d = Math.max((depth ?? 0) * scale, 12);

  // Vista frontal (largura x altura) e vista lateral (profundidade x altura)
  const pad = 40;
  const frontX = pad;
  const sideX = pad + w + 70;
  const topY = pad;
  const svgW = sideX + d + pad;
  const svgH = topY + h + pad + 10;

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      className="h-auto w-full max-w-md text-steel-800"
      role="img"
      aria-label={`Desenho técnico esquemático de ${product.name}`}
    >
      <defs>
        <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
        </pattern>
      </defs>
      {/* Front view */}
      <rect x={frontX} y={topY} width={w} height={h} fill="url(#hatch)" stroke="currentColor" strokeWidth="1.5" />
      <text x={frontX + w / 2} y={topY + h + 30} fontSize="9" textAnchor="middle" fill="currentColor" className="uppercase">
        Vista frontal
      </text>
      {/* width dim */}
      <line x1={frontX} y1={topY - 12} x2={frontX + w} y2={topY - 12} stroke="currentColor" strokeWidth="0.8" />
      <line x1={frontX} y1={topY - 17} x2={frontX} y2={topY - 7} stroke="currentColor" strokeWidth="0.8" />
      <line x1={frontX + w} y1={topY - 17} x2={frontX + w} y2={topY - 7} stroke="currentColor" strokeWidth="0.8" />
      <text x={frontX + w / 2} y={topY - 20} fontSize="9" textAnchor="middle" fill="currentColor">
        {width} mm
      </text>
      {/* height dim */}
      <line x1={frontX - 12} y1={topY} x2={frontX - 12} y2={topY + h} stroke="currentColor" strokeWidth="0.8" />
      <line x1={frontX - 17} y1={topY} x2={frontX - 7} y2={topY} stroke="currentColor" strokeWidth="0.8" />
      <line x1={frontX - 17} y1={topY + h} x2={frontX - 7} y2={topY + h} stroke="currentColor" strokeWidth="0.8" />
      <text
        x={frontX - 20}
        y={topY + h / 2}
        fontSize="9"
        textAnchor="middle"
        fill="currentColor"
        transform={`rotate(-90 ${frontX - 20} ${topY + h / 2})`}
      >
        {height} mm
      </text>
      {/* Side view */}
      {depth && (
        <>
          <rect x={sideX} y={topY} width={d} height={h} fill="url(#hatch)" stroke="currentColor" strokeWidth="1.5" />
          <text x={sideX + d / 2} y={topY + h + 30} fontSize="9" textAnchor="middle" fill="currentColor" className="uppercase">
            Vista lateral
          </text>
          <line x1={sideX} y1={topY - 12} x2={sideX + d} y2={topY - 12} stroke="currentColor" strokeWidth="0.8" />
          <line x1={sideX} y1={topY - 17} x2={sideX} y2={topY - 7} stroke="currentColor" strokeWidth="0.8" />
          <line x1={sideX + d} y1={topY - 17} x2={sideX + d} y2={topY - 7} stroke="currentColor" strokeWidth="0.8" />
          <text x={sideX + d / 2} y={topY - 20} fontSize="9" textAnchor="middle" fill="currentColor">
            {depth} mm
          </text>
        </>
      )}
      {/* Center lines */}
      <line
        x1={frontX + w / 2}
        y1={topY - 4}
        x2={frontX + w / 2}
        y2={topY + h + 4}
        stroke="currentColor"
        strokeWidth="0.5"
        strokeDasharray="6 2 1 2"
        opacity="0.6"
      />
      <text x={svgW - pad} y={svgH - 4} fontSize="8" textAnchor="end" fill="currentColor" opacity="0.7">
        {product.code} • Esquemático – dimensões principais em mm • Desenho 2D completo sob solicitação
      </text>
    </svg>
  );
}

export function CtaBanner({
  title = "Precisa de ajuda para especificar?",
  text = "Nossa equipe técnica ajuda você a escolher o componente certo, comparar variações e montar o pedido. Sem compromisso.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="no-print bg-brand-500 text-white">
      <div className="container-x flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-black md:text-3xl">{title}</h2>
          <p className="mt-2 max-w-xl text-brand-50">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/orcamento" className="btn bg-white text-brand-700 hover:bg-brand-50">
            Solicitar orçamento
          </Link>
          <Link href="/representantes" className="btn border border-white/60 text-white hover:bg-white/10">
            Encontrar representante
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Badge({ children, tone = "steel" }: { children: ReactNode; tone?: "steel" | "brand" | "green" | "amber" }) {
  const tones = {
    steel: "bg-steel-100 text-steel-700",
    brand: "bg-brand-50 text-brand-700",
    green: "bg-green-50 text-green-700",
    amber: "bg-amber-50 text-amber-700",
  };
  return <span className={`inline-flex rounded px-2 py-0.5 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}
