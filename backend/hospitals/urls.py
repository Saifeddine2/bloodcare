from django.urls import path
from . import views

urlpatterns = [
    path('add_blood_stock/', views.add_blood_stock, name='add_blood_stock'),
    path('list_blood_stock/', views.list_blood_stock, name='list_blood_stock'),
    path('update_blood_stock/<int:pk>/', views.update_blood_stock, name='update_blood_stock'),
    path('list_blood_history/', views.list_blood_history, name='list_blood_history'),
    path('clear_blood_history/', views.clear_blood_history, name='clear_blood_history'),
    path('blood_totals/', views.blood_totals, name='blood_totals'),
    path('prediction/', views.prediction_view, name='prediction'),


]


