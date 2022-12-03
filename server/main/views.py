from django.shortcuts import render
from django.http import HttpResponse
from .models import Contract
from rest_framework import viewsets
from rest_framework import serializers


from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters



def index(request):
    return HttpResponse("Hello, world. You're at the transcription index.")


class ContractSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Contract
        fields = '__all__'
        # fields = ['id', 'name', 'link', 'language', 'scraped_at', 'image', 'description', 'category']

# class ContractFilter(filters.FilterSet):

#     class Meta:
#         model = Contract
#         fields = ['category']

class ContractViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing Contracts.
    """
    # http_method_names = ['get', 'options', 'head']
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer
    filter_backends = (DjangoFilterBackend,)
    # filterset_class = ContractFilter
