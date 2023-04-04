from django.urls import path
from Comments import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('all/', views.get_all_comments),
    path('<str:video_id>/', views.user_comments),
]