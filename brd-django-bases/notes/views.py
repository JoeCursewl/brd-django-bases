from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.esponse("ESTAMOS EN LA PARTE DE LAS NOTES")
def register_note(request):
    return render(request, 'notes.html')

def main_page(request):
    return render(request, 'brd_home.html')