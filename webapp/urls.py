from django.conf.urls import url
from django.urls import path
from webapp import views

urlpatterns = [
    path(r'', views.index),
    path(r'test/', views.index),
    # 获取图表数据
    path(r'get-chart-data/', views.get_chart_data),
]