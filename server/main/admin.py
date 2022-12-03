from django.contrib import admin
from .models import Contract


class ContractAdmin(admin.ModelAdmin):
    list_display = ('description',)
    search_fields = ('description',)
    list_filter = ('description',)
    ordering = ('description',)
    filter_horizontal = ()
    list_per_page = 25


admin.site.register(Contract, ContractAdmin)