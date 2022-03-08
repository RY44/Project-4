from django.urls import path
from .views import AllComments

urlpatterns = [
    path('', AllComments.as_view())
]
