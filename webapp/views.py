from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
import random
import json


def index(request):
    return render(request, 'test.html')


def get_chart_data(request):
    data = {
        'code': 0,
        'chart1': {
            'name': 'chart1',
            'time': [i for i in range(99)],
            'value': [random.randint(1, 1000) for _ in range(99)]
        },
        'chart2': {
            'name': 'chart2',
            'time': [i for i in range(99)],
            'value': [random.randint(1, 1000) for _ in range(99)]
        }
    }
    return HttpResponse(json.dumps(data))
