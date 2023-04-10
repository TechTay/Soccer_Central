from django.db import models
from authentication.models import User
# Create your models here.

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class History(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    date = models.DateField()
    time = models.TimeField(auto_now=False, auto_now_add=False)
