from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Todo
from .serializers import TodoSerializer

# Create your views here.
@api_view(["GET"])
def api_home(request):
    api_urls = {
        "List": "/task_list/custid",
        "Detail View": "/task_detail/taskid/",
        "Create": "/task_create/",
        "Update": "/task_update/taskid/",
        "Delete": "/task_delete/taskid/",
    }
    return Response(api_urls)


@api_view(["GET"])
def task_list(request, custid, format=None):
    try:
        tasks = Todo.objects.filter(user_id=int(custid))
    except Todo.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = TodoSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def task_view(request, id, format=None):
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
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def task_update(request, id):
    try:
        task = Todo.objects.get(id=id)
    except Todo.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = TodoSerializer(instance=task, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def task_delete(request, id):
    try:
        task = Todo.objects.get(id=id)
    except Todo.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    task.delete()
    return Response("Item Deteled", status=status.HTTP_204_NO_CONTENT)
