from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from .forms import CreateModelForm
from django.shortcuts import redirect
from .models import Notesreal

# Create your views here.esponse("ESTAMOS EN LA PARTE DE LAS NOTES")
def register_note(request):
    if request.method == 'GET':
        return render(request, 'notes.html', {
            'form': CreateModelForm
        })
    else:
        try:
            brd_form = CreateModelForm(request.POST)
            newNote = brd_form.save(commit=False)
            newNote.save()
            return redirect('home')
        except ValueError:
            return render(request, 'notes.html', {
                'form': CreateModelForm,
                'error': 'Datos Inválidos. Intente de nuevo.'
            })


def main_page(request):
    return render(request, 'brd_home.html')



def get_notes(request):
    notes = Notesreal.objects.all()
    return render(request, 'get_notes.html', {
        'notes': notes
    })


def note_detail(request, note_id):
    if request.method == 'GET':
        note = get_object_or_404(Notesreal, pk=note_id)
        form = CreateModelForm(instance=note)
        return render(request, 'note_detail.html', {
            'note': note,
            'form': form
        })
    else:
        try:
            note = get_object_or_404(Notesreal, pk=note_id)
            form = CreateModelForm(request.POST, instance=note)
            form.save()
            return redirect('getnotes')
        except ValueError:
            return render(request, 'note_detail.html', {
                'note': note,
                'form': form,
                'error': 'Error no se pudo actualizar la nota.'
            })