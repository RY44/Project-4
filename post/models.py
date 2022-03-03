from django.db import models


# Create your models here.


class Post(models.Model):
    post_text = models.CharField(max_length=50, default=None)
    image_url = models.CharField(max_length=300, default=None)
    # user foreign key
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"user_post{self.id}"
      # will change this to equal user ID?
