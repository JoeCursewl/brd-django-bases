from django.urls import path
from . import views

urlpatterns = [
    path('', views.main_page, name='home'),
    path('create-note/', views.register_note, name='notes'),
    path('notes/getnotes', views.get_notes, name='getnotes'),
    path('notes/<int:note_id>/', views.note_detail, name='notedetail'),
]