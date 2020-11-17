from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Todo
from .serializers import TodoSerializer

# Create your views here.
def home(request):
    return HttpResponse("This is the home page")


@api_view(["GET"])
def api_home(request):
    api_urls = {
        "List": "/task-list/",
        "Detail View": "/task-detail/<str:pk>/",
        "Create": "/task-create/",
        "Update": "/task-update/<str:pk>/",
        "Delete": "/task-delete/<str:pk>/",
    }
    return Response(api_urls)


@api_view(["GET"])
def task_list(request):
    tasks = Todo.objects.all()
    serializer = TodoSerializer(tasks)
    return Response(serializer.data)


@api_view(["GET"])
def task_view(request, id):
    try:
        task = Todo.objects.get(id=id)
    except Todo.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = TodoSerializer(task)
    return Response(serializer.data)


@api_view(["POST"])
def task_create(request):
    serializer = TodoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def task_update(request, id):
    pass


def task_delete(request, id):
    pass