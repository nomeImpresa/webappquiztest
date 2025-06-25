#!/bin/sh

echo "[•] Build produzione..."
docker compose -f docker-compose-build.yml build
echo "[✓] Build completata."
