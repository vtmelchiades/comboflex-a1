import {
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * Leads capturados pelo site: orçamento, amostra, contato, download de catálogo,
 * solicitação de documentação para licitação, etc.
 */
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  type: varchar("type", { length: 32 }).notNull(), // orcamento | amostra | contato | catalogo | documentacao
  companyName: varchar("company_name", { length: 160 }).notNull(),
  contactName: varchar("contact_name", { length: 120 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  city: varchar("city", { length: 120 }),
  state: varchar("state", { length: 2 }),
  segment: varchar("segment", { length: 64 }), // fabricante | revenda | corporativo | ecommerce | licitacao
  productCodes: jsonb("product_codes").$type<string[]>().default([]),
  quantity: varchar("quantity", { length: 80 }),
  application: text("application"),
  message: text("message"),
  assignedRepId: varchar("assigned_rep_id", { length: 64 }),
  assignedRepName: varchar("assigned_rep_name", { length: 120 }),
  status: varchar("status", { length: 24 }).notNull().default("novo"), // novo | em_atendimento | concluido
  source: varchar("source", { length: 120 }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/**
 * Registro de downloads do catálogo técnico (para métricas e follow-up comercial).
 */
export const catalogDownloads = pgTable("catalog_downloads", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id").references(() => leads.id, { onDelete: "set null" }),
  email: varchar("email", { length: 160 }).notNull(),
  companyName: varchar("company_name", { length: 160 }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
