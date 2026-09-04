import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { catalogDownloads, leads } from "@/db/schema";
import { findRepresentativeForState, whatsappLink } from "@/data/company";
import { getProductByCode } from "@/data/catalog";

export const dynamic = "force-dynamic";

const allowedTypes = ["orcamento", "amostra", "contato", "catalogo", "documentacao"] as const;
type LeadType = (typeof allowedTypes)[number];

function str(v: unknown, max = 500) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido." }, { status: 400 });
  }

  const type = str(body.type, 32) as LeadType;
  if (!allowedTypes.includes(type)) {
    return NextResponse.json({ ok: false, error: "Tipo de solicitação inválido." }, { status: 400 });
  }

  const companyName = str(body.companyName, 160);
  const contactName = str(body.contactName, 120);
  const email = str(body.email, 160);
  const phone = str(body.phone, 40);
  const city = str(body.city, 120);
  const state = str(body.state, 2).toUpperCase();
  const segment = str(body.segment, 64);
  const quantity = str(body.quantity, 80);
  const application = str(body.application, 2000);
  const message = str(body.message, 4000);
  const source = str(body.source, 120);

  const productCodes = Array.isArray(body.productCodes)
    ? (body.productCodes as unknown[]).map((c) => str(c, 20).toUpperCase()).filter(Boolean).slice(0, 30)
    : [];

  const errors: string[] = [];
  if (!companyName) errors.push("Informe a empresa.");
  if (!contactName) errors.push("Informe o nome do contato.");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Informe um e-mail válido.");
  if (!phone || phone.replace(/\D/g, "").length < 10) errors.push("Informe um telefone/WhatsApp válido com DDD.");
  if (type !== "catalogo" && type !== "contato" && !state) errors.push("Informe o estado (UF).");
  if (type === "orcamento" && productCodes.length === 0 && !message) {
    errors.push("Selecione ao menos um produto ou descreva o que precisa.");
  }
  if (errors.length) {
    return NextResponse.json({ ok: false, error: errors.join(" ") }, { status: 400 });
  }

  const rep = findRepresentativeForState(state);

  const [lead] = await db
    .insert(leads)
    .values({
      type,
      companyName,
      contactName,
      email,
      phone,
      city: city || null,
      state: state || null,
      segment: segment || null,
      productCodes,
      quantity: quantity || null,
      application: application || null,
      message: message || null,
      assignedRepId: rep.id,
      assignedRepName: `${rep.name} – ${rep.companyName}`,
      source: source || null,
    })
    .returning();

  if (type === "catalogo") {
    await db.insert(catalogDownloads).values({ leadId: lead.id, email, companyName });
  }

  // Monta mensagem pronta para o WhatsApp do representante responsável.
  const productLines = productCodes
    .map((code) => {
      const p = getProductByCode(code);
      return p ? `• ${p.code} – ${p.name}` : `• ${code}`;
    })
    .join("\n");

  const typeLabel: Record<LeadType, string> = {
    orcamento: "Solicitação de orçamento",
    amostra: "Solicitação de amostra",
    contato: "Contato",
    catalogo: "Download de catálogo",
    documentacao: "Solicitação de documentação",
  };

  const text = [
    `${typeLabel[type]} #${lead.id} – site Comboflex`,
    `Empresa: ${companyName}`,
    `Contato: ${contactName}`,
    city || state ? `Local: ${[city, state].filter(Boolean).join("/")}` : "",
    segment ? `Segmento: ${segment}` : "",
    productLines ? `Produtos:\n${productLines}` : "",
    quantity ? `Quantidade: ${quantity}` : "",
    application ? `Aplicação: ${application}` : "",
    message ? `Mensagem: ${message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return NextResponse.json({
    ok: true,
    leadId: lead.id,
    representative: {
      id: rep.id,
      name: rep.name,
      companyName: rep.companyName,
      regionLabel: rep.regionLabel,
      whatsapp: rep.whatsapp,
      whatsappUrl: whatsappLink(rep.whatsappDigits, text),
      email: rep.email ?? null,
    },
  });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get("key");
  const adminKey = process.env.ADMIN_KEY ?? "comboflex";
  if (key !== adminKey) {
    return NextResponse.json({ ok: false, error: "Não autorizado." }, { status: 401 });
  }
  const rows = await db.select().from(leads).orderBy(desc(leads.createdAt)).limit(200);
  return NextResponse.json({ ok: true, leads: rows });
}
