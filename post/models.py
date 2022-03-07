from django.db import models
from jwt_auth.models import User

# Create your models here.


class Post(models.Model):
    post_text = models.CharField(max_length=50, default=None)
    image_url = models.CharField(max_length=300, default="imageURL")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"user_post{self.id}"
