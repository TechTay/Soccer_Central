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
    # delete user model, creating a userLocation app that holds user and location as foreignKey. Boolean=isFavorite(check syntax)
    rating = models.PositiveIntegerField(choices=((1,'1 star'), (2,'2 stars'), (3,'3 stars'), (4,'4 stars'), (5,'5 Stars')))

    def __str__(self) -> str:
            return f"{self.title} {self.rating}-star rating for {self.title}"
    
class LocationHistory(models.Model):
     user = models.ForeignKey(User, on_delete=models.CASCADE)
     location = models.ForeignKey(Location, on_delete=models.CASCADE)
     date_of_play = models.DateField()

     def __str__(self) -> str:
            return f"{self.location}"