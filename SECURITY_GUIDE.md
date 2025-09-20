# Security Configuration Guide

## Production Environment Variables

Create a `.env` file with the following variables for production:

```bash
# Django Configuration - CRITICAL FOR PRODUCTION
DJANGO_SECRET_KEY=generate-a-strong-random-secret-key-here
DJANGO_DEBUG=false
DJANGO_ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-oauth-client-id

# Security Settings
BETA_MODE=false

# Optional: Gemini API
GEMINI_API_KEY=your-gemini-api-key-if-using-ai-features
```

## Security Checklist

### Before Production Deployment:

1. **Secret Key**: Generate a strong random `DJANGO_SECRET_KEY`
   ```bash
   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
   ```

2. **Debug Mode**: Set `DJANGO_DEBUG=false`

3. **Allowed Hosts**: Set `DJANGO_ALLOWED_HOSTS` to your actual domain(s)

4. **Beta Mode**: Set `BETA_MODE=false` to disable demo authentication bypass

5. **HTTPS**: Ensure your deployment uses HTTPS and update nginx configuration

6. **CORS Origins**: Update `PROD_ORIGINS` in `backend/kilexep_backend/settings.py`

7. **Nginx CORS**: Update allowed origins in `nginx/nginx.conf`

### Security Features Implemented:

- ✅ Google ID token verification (no client-side user data trust)
- ✅ CSRF protection on all state-changing endpoints
- ✅ CORS whitelist (no wildcard origins)
- ✅ Security headers (HSTS, CSP, X-Frame-Options, etc.)
- ✅ Secure session/CSRF cookies in production
- ✅ Password validation enabled
- ✅ Security logging configuration

### Manual Steps for Production:

1. **SSL Certificate**: Configure SSL/TLS in nginx or load balancer
2. **Database**: Migrate from SQLite to PostgreSQL
3. **Monitoring**: Set up log monitoring for security events
4. **Backups**: Configure database and file backups
5. **Rate Limiting**: Consider adding rate limiting for auth endpoints

## Development vs Production

The application automatically applies different security settings based on `DEBUG` mode:

- **Development** (`DEBUG=true`): Relaxed settings for local development
- **Production** (`DEBUG=false`): Strict security settings enforced

Never run production with `DEBUG=true`!
