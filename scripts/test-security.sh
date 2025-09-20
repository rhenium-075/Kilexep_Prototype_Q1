#!/bin/bash
# Security testing script

set -e

echo "🔒 Starting security tests..."

# Check if containers are running
echo "📋 Checking container status..."
docker-compose ps

# Test 1: Authentication endpoints
echo "🔐 Testing authentication security..."

# Test rate limiting on auth endpoint
echo "  → Testing rate limiting..."
for i in {1..15}; do
    curl -s -o /dev/null -w "%{http_code}\n" \
        -X POST http://localhost/api/auth/csrf/ \
        -H "Content-Type: application/json" || true
done

# Test CSRF protection
echo "  → Testing CSRF protection..."
curl -X POST http://localhost/api/auth/google \
    -H "Content-Type: application/json" \
    -d '{"credential":"fake_token"}' \
    -w "Status: %{http_code}\n" || true

# Test 2: Security headers
echo "🛡️  Testing security headers..."
curl -I http://localhost/ | grep -E "(X-Frame-Options|X-Content-Type-Options|Strict-Transport-Security|Content-Security-Policy)" || echo "Some security headers missing"

# Test 3: CORS configuration
echo "🌐 Testing CORS configuration..."
curl -H "Origin: https://malicious-site.com" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     http://localhost/api/auth/csrf/ \
     -w "Status: %{http_code}\n" || true

# Test 4: Check for exposed sensitive information
echo "🔍 Checking for exposed sensitive information..."
curl -s http://localhost/api/debug/echo | grep -i "secret\|password\|token" || echo "No sensitive info exposed"

# Test 5: Database connection security
echo "💾 Testing database security..."
docker-compose exec db psql -U kilexep_user -d kilexep -c "SELECT version();" || echo "Database connection test failed"

# Test 6: Redis security
echo "📊 Testing Redis security..."
docker-compose exec redis redis-cli ping || echo "Redis connection test failed"

echo "✅ Security tests completed!"
echo ""
echo "📝 Manual checks needed:"
echo "  - Verify SSL/TLS certificates in production"
echo "  - Check firewall rules"
echo "  - Review access logs for suspicious activity"
echo "  - Verify backup and recovery procedures"
