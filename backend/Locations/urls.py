from django.urls import path
from Locations import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('all/', views.get_all_locations),
    path('', views.user_locations),
]