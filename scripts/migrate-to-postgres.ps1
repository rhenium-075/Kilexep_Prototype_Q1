# PowerShell script for PostgreSQL migration

Write-Host "🔄 Starting migration to PostgreSQL..." -ForegroundColor Green

# Stop existing containers
Write-Host "⏹️  Stopping existing containers..." -ForegroundColor Yellow
docker-compose down

# Build new containers with PostgreSQL
Write-Host "🏗️  Building containers with PostgreSQL..." -ForegroundColor Yellow
docker-compose build

# Start PostgreSQL first
Write-Host "🚀 Starting PostgreSQL..." -ForegroundColor Yellow
docker-compose up -d db

# Wait for PostgreSQL to be ready
Write-Host "⏳ Waiting for PostgreSQL to be ready..." -ForegroundColor Yellow
$timeout = 60
$elapsed = 0
do {
    Start-Sleep -Seconds 2
    $elapsed += 2
    $result = docker-compose exec db pg_isready -U kilexep_user -d kilexep 2>$null
    if ($LASTEXITCODE -eq 0) { break }
    if ($elapsed -ge $timeout) {
        Write-Host "❌ PostgreSQL failed to start within $timeout seconds" -ForegroundColor Red
        exit 1
    }
} while ($true)

Write-Host "✅ PostgreSQL is ready!" -ForegroundColor Green

# Run Django migrations
Write-Host "🔄 Running Django migrations..." -ForegroundColor Yellow
docker-compose run --rm backend python manage.py makemigrations
docker-compose run --rm backend python manage.py migrate

# Create superuser (optional)
Write-Host "👤 Creating superuser (optional)..." -ForegroundColor Yellow
$createSuperuser = @"
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(is_superuser=True).exists():
    User.objects.create_superuser('admin', 'admin@kilexep.com', 'admin123')
    print('Superuser created: admin / admin123')
else:
    print('Superuser already exists')
"@

try {
    docker-compose run --rm backend python manage.py shell -c $createSuperuser
} catch {
    Write-Host "Superuser creation skipped" -ForegroundColor Yellow
}

# Start all services
Write-Host "🚀 Starting all services..." -ForegroundColor Yellow
docker-compose up -d

Write-Host "✅ Migration to PostgreSQL completed!" -ForegroundColor Green
Write-Host "📊 Database: PostgreSQL 15" -ForegroundColor Cyan
Write-Host "🔗 Connection: postgresql://kilexep_user:kilexep_password@localhost:5432/kilexep" -ForegroundColor Cyan
Write-Host "👤 Admin: admin / admin123 (if created)" -ForegroundColor Cyan
Write-Host "🌐 Backend: http://localhost:8000" -ForegroundColor Cyan
Write-Host "🌐 Frontend: http://localhost:80" -ForegroundColor Cyan
