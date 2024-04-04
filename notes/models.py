from django.db import models

# Create your models here.

class Notes(models.Model):
    _id_nota = models.IntegerField(auto_created=True)
    note_name = models.CharField(verbose_name="Nota", max_length=150)
    note_content = models.CharField(verbose_name="Contenido de la nota", max_length=500)
    note_author = models.CharField(verbose_name="Autor de la Nota", max_length=200)


class Notesreal(models.Model):
    nota = models.CharField(max_length=150)
    note_content = models.TextField(blank=True)
    nota_author = models.CharField(max_length=50)
    label_nota = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nota