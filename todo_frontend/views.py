from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

# Create your views here.
from .forms import CreateUserForm

# Restrict user if not logged in
@login_required(login_url="login")
def home_page(request):
    context = {}
    return render(request, "todo_frontend/index.html", context)


def login_page(request):
    # Redirect user to home page if already logged in
    if request.user.is_authenticated:
        return redirect("home")
    context = {}

    if request.method == "POST":
        # Get Username and Password
        username = request.POST.get("username")
        password = request.POST.get("password")
        # Authenticate user
        user = authenticate(request, username=username, password=password)
        # Validate User
        if user is not None:
            # login user
            login(request, user)
            # Redirect to home
            #! Testing context["username"] = username
            return redirect("home")
        else:
            # Return Error and load same page
            messages.info(request, "Username or Password is incorrect 🙄 ")

    return render(request, "todo_frontend/login.html", context)


def logout_user(request):
    logout(request)
    return redirect("login")


def signup_page(request):
    # Redirect user to home page if already logged in
    if request.user.is_authenticated:
        return redirect("home")
    # Get Empty Form (when loading page)
    form = CreateUserForm()

    if request.method == "POST":
        # Get data into form
        form = CreateUserForm(request.POST)
        # Validate form
        if form.is_valid():
            # Save user info into database
            form.save()
            # Get username
            user = form.cleaned_data.get("username")
            # Save below string to send info to Login Page
            messages.success(request, f"Account Created For {user}🎉 Please Log In🖱")
            # Redirect to Login
            return redirect("login")

    context = {"form": form}
    return render(request, "todo_frontend/signup.html", context)