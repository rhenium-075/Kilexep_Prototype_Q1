from django.contrib import admin
from django.urls import path, include
from core import views as core_views


urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Django-allauth URLs - both regular and headless
    path('accounts/', include('allauth.urls')),
    path('_allauth/', include('allauth.headless.urls')),
    
    # CSRF and health endpoints
    path('api/auth/csrf/', core_views.csrf_token_view),
    path('api/healthz', core_views.healthz),
    
    # App-specific endpoints
    path('api/', include('core.urls')),
    
    # Catch-all redirects (keep last)
    path('', include('core.redirects')),
]



