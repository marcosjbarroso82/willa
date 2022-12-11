from django.contrib import admin
from django.urls import path, include

# DRF imports
from rest_framework import routers
from base.views import ContractViewSet, UserViewSet, MessageViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)


router = routers.DefaultRouter()
router.register('contracts', ContractViewSet, 'contracts')
router.register('users', UserViewSet, 'users')
router.register('messages', MessageViewSet, 'messages')



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('base.api.urls')),

    path('api/models/', include(router.urls)),

    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    

]
