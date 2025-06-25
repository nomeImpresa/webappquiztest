@echo off
echo [•] Backup dati in scaffold\db.sql...

docker compose down
docker compose -f docker-compose-build.yml down

docker compose up -d db
timeout /t 5

docker compose exec db pg_dump -U postgres liveapp > scaffold\db.sql

echo [✓] Backup completato in scaffold\db.sql
pause
