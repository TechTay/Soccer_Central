from django.db import models
from authentication.models import User
# from djangoratings.fields import RatingField
# Create your models here.

def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

class Location(models.Model):
    address = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    date = models.DateField()
    time = models.TimeField(auto_now=False, auto_now_add=False)
    image_url = models.ImageField(upload_to=upload_to, blank=True, null=True)
    user = models.ManyToManyField(User)
    # rating = RatingField(range=5) # 5 possible rating values, 1-5

    def __str__(self) -> str:
            return f"{self.title}"
    
class LocationHistory(models.Model):
     user = models.ForeignKey(User, on_delete=models.CASCADE)
     location = models.ForeignKey(Location, on_delete=models.CASCADE)
     date_of_play = models.DateField()
