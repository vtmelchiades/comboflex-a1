import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x py-24 text-center">
      <p className="eyebrow">Erro 404</p>
      <h1 className="mt-2 text-3xl font-black text-steel-900">Página não encontrada</h1>
      <p className="mt-3 text-steel-600">O item ou a página que você procura não existe ou mudou de endereço.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/produtos" className="btn-primary">Ver produtos</Link>
        <Link href="/" className="btn-outline">Página inicial</Link>
      </div>
    </section>
  );
}
