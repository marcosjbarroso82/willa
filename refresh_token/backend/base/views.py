from django.shortcuts import render
from .models import Contract, Message
# import user model
from django.contrib.auth.models import User

from rest_framework import viewsets, permissions, serializers
from rest_framework.decorators import action
from rest_framework.response import Response


# Contract ModelSerializer
class ContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = '__all__'



# Contract ModelViewSet
class ContractViewSet(viewsets.ModelViewSet):
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def get_seller_contracts(self, request):
        queryset = Contract.objects.filter(seller=request.user)
        serializer = ContractSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def get_buyer_contracts(self, request):
        queryset = Contract.objects.filter(buyer=request.user)
        serializer = ContractSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def create_buyer_contract(self, request):


        contract = Contract()
        contract.buyer = request.user
        contract.seller = User.objects.get(id=request.data['seller'])
        contract.body = request.data['body']
        contract.save()
        return Response(
            ContractSerializer(contract).data
        )


# User Model Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

# readonly list user endpoint
class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    # limit methods to GET
    http_method_names = ['get']



# Message Model Serializer
class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'
        
        
from django_filters.rest_framework import DjangoFilterBackend


# Message Model ViewSet
class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['contract']

    @action(detail=False, methods=['get'])
    def get_messages_by_contract(self, request):
        queryset = Message.objects.filter(contract=request.data['contract'])
        serializer = MessageSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def create_message(self, request):
        message = Message()
        message.contract = Contract.objects.get(id=request.data['contract'])
        message.sender = request.user
        message.receiver = User.objects.get(id=request.data['receiver'])
        message.body = request.data['body']
        message.save()
        return Response(
            MessageSerializer(message).data
        )