#!/bin/sh
set -e

echo "⏳ Migration çalıştırılıyor..."
npx prisma migrate deploy --config prisma.config.ts

echo "✅ Tamam, uygulama başlatılıyor..."
exec npm start