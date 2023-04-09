from django.db import models

# Create your models here.
class Image(models.Model):
     image_url = models.ImageField(upload_to=upload_to, blank=True, null=True)