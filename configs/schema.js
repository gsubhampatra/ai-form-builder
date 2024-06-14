const { text, varchar } = require("drizzle-orm/mysql-core");
const { pgTable, serial, integer } = require("drizzle-orm/pg-core");

export const JsonForms = pgTable("jsonForms", {
  id: serial("id").primaryKey(),
  jsonform: text("jsonform").notNull(),
  theme: text("theme"),
  background: text("background"),
  style: text("style"),
  createdBy: text("createdBy").notNull(),
  createdAt: text("createdAt").notNull(),
});

export const UserResponses = pgTable("userResponse", {
  id: serial("id").primaryKey(),
  jsonResponse: text("jsonResponse").notNull(),
  createdBy: text("createdBy").default("anonymous"),
  createdAt: text("createdAt").notNull(),
  formRef:integer("formRef").references(()=>JsonForms.id)
});
