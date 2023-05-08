from django.urls import path
from Locations import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.location_list),
    path('users/', views.user_list),
    path('history/', views.history_list),
    path('locationdetails/', views.location_detail),
    path('users/details/', views.user_detail),
    path('historydetails/', views.history_detail),
    path('<int:location_pk>/history/<int:history_pk>/', views.locations_history), 
    path('<int:location_pk>/users/<int:user_pk>/', views.user_locations),
    path('<int:location_pk>/', views.join_game_details),
    path('update/<int:pk>/', views.location_image)
    # http://127.0.0.1:8000/api/Locations/1/users/2/
]