from django.db import models
# from djangoratings.fields import RatingField
# Create your models here.

class Location(models.Model):
    address = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    date = models.DateField()
    time = models.TimeField(auto_now=False, auto_now_add=False)
    # rating = RatingField(range=5) # 5 possible rating values, 1-5