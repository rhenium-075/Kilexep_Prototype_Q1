from django.http import HttpResponseRedirect
from django.urls import path


def redirect_to_frontend(_request):
    return HttpResponseRedirect('http://localhost:3000')

urlpatterns = [
    path('', redirect_to_frontend),
    path('dashboard', redirect_to_frontend),
    path('blog-auto', redirect_to_frontend),
    path('onboarding', redirect_to_frontend),
    path('trend-analyzer', redirect_to_frontend),
    path('content-generator', redirect_to_frontend),
]





