from django.contrib import admin
from .models import Notesreal

# Register your models here.

class NoteOrder(admin.ModelAdmin):
    readonly_fields = ("created_at", )

admin.site.register(Notesreal, NoteOrder)
