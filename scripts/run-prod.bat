@echo off
echo [•] Avvio ambiente di produzione...
docker compose down
docker compose -f docker-compose-build.yml down
docker compose -f docker-compose-build.yml build
docker compose -f docker-compose-build.yml up -d
echo [✓] Produzione attiva.
pause
