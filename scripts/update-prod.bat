@echo off
echo [•] Aggiornamento produzione...
docker compose -f docker-compose-build.yml build
docker compose -f docker-compose-build.yml up -d
echo [✓] Produzione aggiornata.
pause
