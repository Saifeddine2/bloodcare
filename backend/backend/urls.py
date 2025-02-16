from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('authentication.urls')),
    #endpoint to the TokenObtainPairView this view is responsible for generating a JWT access token and a refresh token 
    path('token/', jwt_views.TokenObtainPairView.as_view(), name ="token_obtain_pair"), 
    #It generates a new access token and returns it to the client (mora ma ki tqada)
   # path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
    path('alerte/', include('Alertes.urls')),
    path('chatbot/', include('chatbot_app.urls')),
    path('citizen/',include('citizens.urls')) ,
    path('hospitals/', include('hospitals.urls')),  
    path('Event/', include('Event.urls')),  
 

]