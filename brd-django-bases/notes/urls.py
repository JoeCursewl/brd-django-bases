from django.urls import path
from . import views

urlpatterns = [
    path('', views.main_page),
    path('create-note/', views.register_note),
]