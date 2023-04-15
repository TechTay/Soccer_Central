from django.urls import path
from Locations import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.location_list),
    path('users/', views.user_list),
    path('locationdetails/', views.location_detail),
    path('users/details/', views.user_detail),
    # http://127.0.0.1:8000/api/Locations/1/users/2/
    path('<int:location_pk>/users/<int:user_pk>/', views.user_locations)
    # path('<int:locations_pk>/history/<int:history_pk>/', views.locations_history) 
]