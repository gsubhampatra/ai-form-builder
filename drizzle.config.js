import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql", 
  schema: "./configs/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://formdb_owner:i5DTLS1qNkIF@ep-red-hat-a1jy311l.ap-southeast-1.aws.neon.tech/ai-form-builder?sslmode=require",
  },
});
