from django.urls import path
from Locations import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.location_list),
    path('users/', views.user_list),
    path('<int:pk>', views.location_detail),
    path('users/<int:pk>', views.user_detail),
    # http://127.0.0.1:8000/api/Locations/1/users/2/
    path('Locations/users/', views.user_locations)
]