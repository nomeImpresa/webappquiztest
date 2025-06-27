#!/bin/sh

echo "[•] Arresto container esistenti..."
docker compose down
docker compose -f docker-compose-build.yml down

echo "[•] Avvio completo del progetto..."
docker compose up -d

echo "[✓] Inizializzazione completata."
