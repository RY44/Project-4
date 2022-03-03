from django.urls import path
from .views import AllPosts, OnePost


urlpatterns = [
    path('', AllPosts.as_view()),
    path('post/', OnePost.as_view())
]
