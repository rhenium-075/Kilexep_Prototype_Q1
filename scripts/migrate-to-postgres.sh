#!/bin/bash
# Migration script to PostgreSQL

set -e

echo "🔄 Starting migration to PostgreSQL..."

# Stop existing containers
echo "⏹️  Stopping existing containers..."
docker-compose down

# Build new containers with PostgreSQL
echo "🏗️  Building containers with PostgreSQL..."
docker-compose build

# Start PostgreSQL first
echo "🚀 Starting PostgreSQL..."
docker-compose up -d db

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
timeout 60s bash -c 'until docker-compose exec db pg_isready -U kilexep_user -d kilexep; do sleep 2; done'

# Run Django migrations
echo "🔄 Running Django migrations..."
docker-compose run --rm backend python manage.py makemigrations
docker-compose run --rm backend python manage.py migrate

# Create superuser (optional)
echo "👤 Creating superuser (optional)..."
docker-compose run --rm backend python manage.py shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(is_superuser=True).exists():
    User.objects.create_superuser('admin', 'admin@kilexep.com', 'admin123')
    print('Superuser created: admin / admin123')
else:
    print('Superuser already exists')
" || echo "Superuser creation skipped"

# Start all services
echo "🚀 Starting all services..."
docker-compose up -d

echo "✅ Migration to PostgreSQL completed!"
echo "📊 Database: PostgreSQL 15"
echo "🔗 Connection: postgresql://kilexep_user:kilexep_password@localhost:5432/kilexep"
echo "👤 Admin: admin / admin123 (if created)"
echo "🌐 Backend: http://localhost:8000"
echo "🌐 Frontend: http://localhost:80"
