#!/bin/bash
# Dependency update and security check script

set -e

echo "📦 Starting dependency updates and security checks..."

# Backend dependencies
echo "🐍 Checking Python dependencies..."
cd backend

# Check for security vulnerabilities
echo "  → Checking for security vulnerabilities..."
pip install --upgrade pip safety
safety check --json || echo "Security issues found - review above"

# Update dependencies
echo "  → Updating Python dependencies..."
pip-review --local --interactive || pip install pip-review && pip-review --local --interactive

# Check outdated packages
echo "  → Checking outdated packages..."
pip list --outdated

cd ..

# Frontend dependencies
echo "📱 Checking Node.js dependencies..."

# Check for security vulnerabilities
echo "  → Auditing npm packages..."
npm audit --audit-level high

# Fix vulnerabilities
echo "  → Fixing vulnerabilities..."
npm audit fix

# Update dependencies
echo "  → Checking outdated packages..."
npm outdated

# Docker image updates
echo "🐳 Checking Docker image updates..."
echo "  → Current images:"
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.CreatedAt}}"

echo ""
echo "📋 Manual update recommendations:"
echo "  1. Update base images in Dockerfiles"
echo "  2. Review and test dependency updates"
echo "  3. Check for breaking changes in major version updates"
echo "  4. Update Docker Compose image versions"
echo ""
echo "🔍 Security scan recommendations:"
echo "  1. Run 'docker scout cves' on built images"
echo "  2. Use 'bandit' for Python security linting"
echo "  3. Use 'eslint-plugin-security' for JavaScript"
echo "  4. Regular penetration testing"

echo "✅ Dependency check completed!"
