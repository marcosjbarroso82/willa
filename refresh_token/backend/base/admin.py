from django.contrib import admin

# Register your models here.

from .models import Note, Contract


admin.site.register(Note)
admin.site.register(Contract)
