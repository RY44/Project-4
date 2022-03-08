from email.policy import default
from django.db import models
from django.forms import CharField
from jwt_auth.models import User
# Create your models here.


class Conversation(models.Model):
    test = models.CharField(max_length=50, default="test")
    post = models.ForeignKey(
        "post.Post",
        related_name="conversation",
        on_delete=models.CASCADE
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
