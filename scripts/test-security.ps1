# Security testing script for Windows

Write-Host "🔒 Starting security tests..." -ForegroundColor Green

# Check if containers are running
Write-Host "📋 Checking container status..." -ForegroundColor Yellow
docker-compose ps

# Test 1: Authentication endpoints
Write-Host "🔐 Testing authentication security..." -ForegroundColor Yellow

# Test rate limiting on auth endpoint
Write-Host "  → Testing rate limiting..." -ForegroundColor Cyan
for ($i = 1; $i -le 15; $i++) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost/api/auth/csrf/" -Method POST -ContentType "application/json" -ErrorAction SilentlyContinue
        Write-Host "Request $i : $($response.StatusCode)" -ForegroundColor Gray
    } catch {
        Write-Host "Request $i : $($_.Exception.Response.StatusCode)" -ForegroundColor Red
    }
}

# Test CSRF protection
Write-Host "  → Testing CSRF protection..." -ForegroundColor Cyan
try {
    $body = '{"credential":"fake_token"}'
    $response = Invoke-WebRequest -Uri "http://localhost/api/auth/google" -Method POST -Body $body -ContentType "application/json" -ErrorAction SilentlyContinue
    Write-Host "CSRF Test Status: $($response.StatusCode)" -ForegroundColor Gray
} catch {
    Write-Host "CSRF Test Status: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
}

# Test 2: Security headers
Write-Host "🛡️  Testing security headers..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost/" -Method HEAD -ErrorAction SilentlyContinue
    $securityHeaders = @(
        'X-Frame-Options',
        'X-Content-Type-Options', 
        'Strict-Transport-Security',
        'Content-Security-Policy'
    )
    
    foreach ($header in $securityHeaders) {
        if ($response.Headers[$header]) {
            Write-Host "  ✅ $header : $($response.Headers[$header])" -ForegroundColor Green
        } else {
            Write-Host "  ❌ $header : Missing" -ForegroundColor Red
        }
    }
} catch {
    Write-Host "Failed to test security headers" -ForegroundColor Red
}

# Test 3: CORS configuration
Write-Host "🌐 Testing CORS configuration..." -ForegroundColor Yellow
try {
    $headers = @{
        'Origin' = 'https://malicious-site.com'
        'Access-Control-Request-Method' = 'POST'
        'Access-Control-Request-Headers' = 'X-Requested-With'
    }
    $response = Invoke-WebRequest -Uri "http://localhost/api/auth/csrf/" -Method OPTIONS -Headers $headers -ErrorAction SilentlyContinue
    Write-Host "CORS Test Status: $($response.StatusCode)" -ForegroundColor Gray
} catch {
    Write-Host "CORS Test Status: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
}

# Test 4: Database connection security
Write-Host "💾 Testing database security..." -ForegroundColor Yellow
try {
    $dbTest = docker-compose exec db psql -U kilexep_user -d kilexep -c "SELECT version();"
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ Database connection successful" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Database connection failed" -ForegroundColor Red
    }
} catch {
    Write-Host "  ❌ Database connection test failed" -ForegroundColor Red
}

# Test 5: Redis security
Write-Host "📊 Testing Redis security..." -ForegroundColor Yellow
try {
    $redisTest = docker-compose exec redis redis-cli ping
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ Redis connection successful" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Redis connection failed" -ForegroundColor Red
    }
} catch {
    Write-Host "  ❌ Redis connection test failed" -ForegroundColor Red
}

Write-Host "✅ Security tests completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Manual checks needed:" -ForegroundColor Yellow
Write-Host "  - Verify SSL/TLS certificates in production" -ForegroundColor White
Write-Host "  - Check firewall rules" -ForegroundColor White
Write-Host "  - Review access logs for suspicious activity" -ForegroundColor White
Write-Host "  - Verify backup and recovery procedures" -ForegroundColor White
