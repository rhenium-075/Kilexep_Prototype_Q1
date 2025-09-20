from django.urls import path
from . import views

urlpatterns = [
    path('debug/echo', views.debug_echo, name='debug_echo'),
    # Email authentication routes removed - using Google OAuth only
    path('auth/complete-signup', views.complete_signup, name='complete_signup'),
    path('auth/logout', views.logout_view, name='logout'),

    path('analyze-onboarding', views.analyze_onboarding, name='analyze_onboarding'),
    path('analyze-trend-keywords', views.analyze_trend_keywords, name='analyze_trend_keywords'),

    path('generate-content', views.generate_content, name='generate_content'),
    path('generate-content-topics', views.generate_content_topics, name='generate_content_topics'),
    path('generate-content-from-topics', views.generate_content_from_topics, name='generate_content_from_topics'),

    path('user/status', views.get_user_status, name='user_status'),
    path('user/data', views.get_user_data, name='user_data'),
    path('user/generated-content', views.get_generated_content, name='user_generated_content'),
    path('delete-generated-content', views.delete_generated_content, name='delete_generated_content'),

    path('start_job', views.start_job, name='start_job'),
    path('job_status/<str:job_id>', views.job_status, name='job_status'),
]





