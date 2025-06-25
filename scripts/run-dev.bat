@echo off
docker compose down
docker compose -f docker-compose-build.yml down
docker compose up -d
echo [✓] Ambiente di sviluppo avviato.
pause
