import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { leads } from "@/db/schema";

export const dynamic = "force-dynamic";

const statuses = ["novo", "em_atendimento", "concluido"];

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const url = new URL(req.url);
  const key = url.searchParams.get("key");
  if (key !== (process.env.ADMIN_KEY ?? "comboflex")) {
    return NextResponse.json({ ok: false, error: "Não autorizado." }, { status: 401 });
  }
  const body = (await req.json().catch(() => ({}))) as { status?: string };
  if (!body.status || !statuses.includes(body.status)) {
    return NextResponse.json({ ok: false, error: "Status inválido." }, { status: 400 });
  }
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) {
    return NextResponse.json({ ok: false, error: "ID inválido." }, { status: 400 });
  }
  const [updated] = await db.update(leads).set({ status: body.status }).where(eq(leads.id, numericId)).returning();
  if (!updated) return NextResponse.json({ ok: false, error: "Lead não encontrado." }, { status: 404 });
  return NextResponse.json({ ok: true, lead: updated });
}
