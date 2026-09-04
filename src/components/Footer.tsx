import Link from "next/link";
import { company, whatsappLink } from "@/data/company";
import { categories } from "@/data/catalog";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="no-print border-t border-steel-800 bg-steel-950 text-steel-300">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Indústria de Jaú/SP especializada em componentes metálicos para cadeiras de escritório. Back systems,
            mecanismos, sistemas relax, lâminas, estruturas, pistões e flanges para fabricantes de todo o Brasil.
          </p>
          <div className="mt-5 space-y-1.5 text-sm">
            <p>{company.address}</p>
            <p>{company.hours}</p>
            <p>
              <a className="hover:text-white" href={`mailto:${company.email}`}>
                {company.email}
              </a>
            </p>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Produtos</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link className="hover:text-white" href={`/produtos/${c.slug}`}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Empresa</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link className="hover:text-white" href="/quem-somos">Quem somos</Link></li>
            <li><Link className="hover:text-white" href="/catalogo">Catálogo técnico</Link></li>
            <li><Link className="hover:text-white" href="/solucoes">Soluções por mercado</Link></li>
            <li><Link className="hover:text-white" href="/qualidade">Qualidade e documentação</Link></li>
            <li><Link className="hover:text-white" href="/amostras">Amostras</Link></li>
            <li><Link className="hover:text-white" href="/feiras-e-parcerias">Feiras e parcerias</Link></li>
            <li><Link className="hover:text-white" href="/representantes">Representantes</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Atendimento</h4>
          <ul className="mt-4 space-y-3 text-sm">
            {company.phones.map((p) => (
              <li key={p.digits}>
                <span className="block text-xs text-steel-500">{p.label}</span>
                <a
                  className="font-semibold text-white hover:text-brand-300"
                  href={whatsappLink(p.digits, "Olá, vim pelo site da Comboflex.")}
                  target="_blank"
                  rel="noreferrer"
                >
                  {p.number}
                </a>
              </li>
            ))}
            <li>
              <Link href="/orcamento" className="btn-primary mt-2 w-full">
                Solicitar orçamento
              </Link>
            </li>
            <li>
              <Link href="/contato" className="hover:text-white">
                Todos os canais de contato →
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-steel-800">
        <div className="container-x flex flex-col items-start justify-between gap-2 py-5 text-xs text-steel-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Comboflex Metalúrgica. Todos os direitos reservados.</p>
          <p>Preços e condições comerciais são informados exclusivamente pelo atendimento comercial.</p>
        </div>
      </div>
    </footer>
  );
}
