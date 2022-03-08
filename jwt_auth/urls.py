from xml.etree.ElementInclude import include
from django.urls import path
from .views import RegisterView, LoginView, AllUsers, OneUser

urlpatterns = [
    path('user/', AllUsers.as_view()),
    path('user/<int:pk>/', OneUser.as_view()),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view())
]
