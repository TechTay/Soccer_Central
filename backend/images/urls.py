from images import views
from django.urls import path
# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('all/', views.get_all_images),
    path('', views.user_images),
    path('', views.ViewImageSet),
]