from django.shortcuts import render

# Create your views here.
def home(request):
    context = {}
    return render(request, "todo_frontend/index.html", context)


def login(request):
    context = {}
    return render(request, "todo_frontend/login.html", context)


def signup(request):
    context = {}
    return render(request, "todo_frontend/signup.html", context)