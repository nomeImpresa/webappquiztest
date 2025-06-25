@echo off
echo [•] Arresto container esistenti...
docker compose down
docker compose -f docker-compose-build.yml down

echo [•] Rimozione cartella local_data (se esiste)...
docker run --rm -v %cd%:/project -w /project alpine sh -c "rm -rf local_data/"

echo [•] Avvio solo del DB...
docker compose up -d db
timeout /t 5

echo [•] Ripristino backup da scaffold/db.sql...
docker compose exec db psql -U postgres -d liveapp -f scaffold/db.sql

echo [•] Avvio completo del progetto...
docker compose up -d

echo [✓] Inizializzazione completata.
pause
