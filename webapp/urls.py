from django.conf.urls import url
from django.urls import path
from webapp import views

urlpatterns = [
    path(r'', views.index),
    path(r'test/', views.index),
]