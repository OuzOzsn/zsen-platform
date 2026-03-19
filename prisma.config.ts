import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // Prisma'ya şemalarımızın klasörde olduğunu söylüyoruz
  schema: "prisma/schema", 
  datasource: {
    url: env("DATABASE_URL"),
  },
});