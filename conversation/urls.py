from django.urls import path
from .views import AllConversations, OneConversation


urlpatterns = [
    path('', AllConversations.as_view()),
    path('<int:pk>/', OneConversation.as_view())

]
