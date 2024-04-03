from django.forms import ModelForm
from .models import Notesreal

class CreateModelForm(ModelForm):
    class Meta:
        model = Notesreal
        fields = ['nota', 'note_content', 'nota_author', 'label_nota']