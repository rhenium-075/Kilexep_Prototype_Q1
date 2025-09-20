from django.contrib.auth.models import AbstractUser
from django.db import models
import re

def normalize_email_for_storage(email: str) -> str:
    """Normalize email for consistent storage and matching"""
    e = (email or '').strip().lower()
    if not e:
        return ''
    try:
        local, domain = e.split('@', 1)
    except ValueError:
        return e
    if domain in ('gmail.com', 'googlemail.com'):
        # Gmail: remove dots, ignore +aliases
        local = local.split('+', 1)[0].replace('.', '')
        domain = 'gmail.com'
    return f'{local}@{domain}'

class User(AbstractUser):
    """Extended user model for Kilexep - Compatible with django-allauth"""
    email = models.EmailField(unique=True)
    email_lower = models.EmailField(unique=True, db_index=True)  # normalized for matching
    registration_completed = models.BooleanField(default=False)
    avatar_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Profile fields
    company = models.CharField(max_length=255, blank=True)
    role = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=50, blank=True)
    
    # Allauth compatibility - use email as primary identifier
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []  # Remove username from required fields
    
    def save(self, *args, **kwargs):
        if self.email:
            self.email_lower = normalize_email_for_storage(self.email)
            # Generate username from email if not provided
            if not self.username:
                self.username = self.email.split('@')[0]
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.email

class AuthIdentity(models.Model):
    """OAuth and external identity linking"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='identities')
    provider = models.CharField(max_length=50)  # 'google', 'email'
    provider_sub = models.CharField(max_length=255)  # Google sub, email for email auth
    email_normalized = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = [
            ('provider', 'provider_sub'),
        ]
        indexes = [
            models.Index(fields=['provider', 'email_normalized']),
        ]
    
    def save(self, *args, **kwargs):
        if self.email_normalized:
            self.email_normalized = normalize_email_for_storage(self.email_normalized)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f'{self.provider}:{self.provider_sub} -> {self.user.email}'
