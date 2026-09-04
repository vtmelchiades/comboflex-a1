"use client";

import { useState } from "react";
import { brazilianStates, findRepresentativeForState, whatsappLink } from "@/data/company";

export function RepFinder() {
  const [uf, setUf] = useState("");
  const rep = uf ? findRepresentativeForState(uf) : null;

  return (
    <div className="rounded-lg border border-steel-200 bg-white p-6">
      <label className="label" htmlFor="uf-finder">Selecione o seu estado</label>
      <div className="flex gap-2">
        <select id="uf-finder" className="input max-w-[140px]" value={uf} onChange={(e) => setUf(e.target.value)}>
          <option value="">UF</option>
          {brazilianStates.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      {rep && (
        <div className="mt-5 rounded-md border border-brand-200 bg-brand-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Seu atendimento em {uf}</p>
          <p className="mt-1 text-lg font-black text-steel-900">{rep.name}</p>
          <p className="text-sm text-steel-700">{rep.companyName} • {rep.regionLabel}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href={whatsappLink(rep.whatsappDigits, `Olá ${rep.name.split(" ")[0]}, vim pelo site da Comboflex e sou de ${uf}.`)} target="_blank" rel="noreferrer" className="btn-whatsapp px-4 py-2">
              WhatsApp {rep.whatsapp}
            </a>
            {rep.email && (
              <a href={`mailto:${rep.email}`} className="btn-outline px-4 py-2">{rep.email}</a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
