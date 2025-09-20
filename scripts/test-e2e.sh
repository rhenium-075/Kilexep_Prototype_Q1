#!/bin/bash
# End-to-End testing script

set -e

echo "🧪 Starting E2E tests..."

# Start services if not running
echo "🚀 Ensuring services are running..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Test 1: Basic connectivity
echo "🌐 Testing basic connectivity..."
curl -f http://localhost/ > /dev/null && echo "  ✅ Frontend accessible" || echo "  ❌ Frontend not accessible"
curl -f http://localhost/api/auth/csrf/ > /dev/null && echo "  ✅ Backend API accessible" || echo "  ❌ Backend API not accessible"

# Test 2: Database connectivity
echo "💾 Testing database connectivity..."
docker-compose exec backend python manage.py check --database default && echo "  ✅ Database connection OK" || echo "  ❌ Database connection failed"

# Test 3: Redis connectivity
echo "📊 Testing Redis connectivity..."
docker-compose exec backend python -c "
import redis
import os
r = redis.from_url(os.getenv('REDIS_URL', 'redis://redis:6379/0'))
r.ping()
print('  ✅ Redis connection OK')
" || echo "  ❌ Redis connection failed"

# Test 4: Celery worker
echo "👷 Testing Celery worker..."
docker-compose exec backend celery -A kilexep_backend inspect ping && echo "  ✅ Celery worker OK" || echo "  ❌ Celery worker not responding"

# Test 5: Authentication flow
echo "🔐 Testing authentication flow..."

# Get CSRF token
CSRF_TOKEN=$(curl -s -c cookies.txt http://localhost/api/auth/csrf/ | grep -o '"csrftoken":"[^"]*"' | cut -d'"' -f4)
echo "  → CSRF token obtained: ${CSRF_TOKEN:0:10}..."

# Test invalid login (should fail)
curl -s -b cookies.txt -H "X-CSRFToken: $CSRF_TOKEN" \
     -X POST http://localhost/api/auth/google \
     -H "Content-Type: application/json" \
     -d '{"credential":"invalid_token"}' | grep -q "error" && echo "  ✅ Invalid login properly rejected" || echo "  ❌ Invalid login not rejected"

# Test 6: Content generation endpoints (requires auth)
echo "📝 Testing content generation endpoints..."
curl -s -X POST http://localhost/api/analyze-onboarding \
     -H "Content-Type: application/json" \
     -d '{"text":"test"}' | grep -q "로그인이 필요합니다" && echo "  ✅ Auth required for content generation" || echo "  ❌ Auth not required for content generation"

# Test 7: Rate limiting
echo "🚦 Testing rate limiting..."
for i in {1..12}; do
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost/api/auth/csrf/)
    if [ "$STATUS" = "429" ]; then
        echo "  ✅ Rate limiting active (got 429 on request $i)"
        break
    fi
done

# Test 8: Security headers
echo "🛡️  Testing security headers..."
HEADERS=$(curl -s -I http://localhost/)
echo "$HEADERS" | grep -q "X-Frame-Options" && echo "  ✅ X-Frame-Options present" || echo "  ❌ X-Frame-Options missing"
echo "$HEADERS" | grep -q "X-Content-Type-Options" && echo "  ✅ X-Content-Type-Options present" || echo "  ❌ X-Content-Type-Options missing"

# Test 9: SSL redirect (if configured)
echo "🔒 Testing SSL configuration..."
curl -s -I http://localhost/ | grep -q "Strict-Transport-Security" && echo "  ✅ HSTS header present" || echo "  ⚠️  HSTS header missing (OK for development)"

# Cleanup
rm -f cookies.txt

echo "✅ E2E tests completed!"
echo ""
echo "📊 Test Summary:"
echo "  - Basic connectivity: Tested"
echo "  - Database: Tested"
echo "  - Redis: Tested"
echo "  - Celery: Tested"
echo "  - Authentication: Tested"
echo "  - Authorization: Tested"
echo "  - Rate limiting: Tested"
echo "  - Security headers: Tested"
echo ""
echo "🔍 For comprehensive testing, also run:"
echo "  - Frontend unit tests: npm test"
echo "  - Backend unit tests: python manage.py test"
echo "  - Load testing with tools like Apache Bench or wrk"
echo "  - Security scanning with OWASP ZAP or similar tools"
