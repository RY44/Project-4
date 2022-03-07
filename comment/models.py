from django.db import models
from django.forms import CharField

# Create your models here.


class Comment(models.Model):
    comment = models.CharField(max_length=70)
    conversation = models.ForeignKey(
        "conversation.Conversation",
        related_name="comment",
        on_delete=models.CASCADE
    )
