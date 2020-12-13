from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import Group

# Create your views here.
from .forms import CreateUserForm
from .decorator import if_logged_in

# Restrict user if not logged in
@login_required(login_url="login")
def home_page(request):
    context = {"username": request.user.id}
    return render(request, "todo_frontend/index.html", context)


@if_logged_in  # Redirect user to home page if already logged
def login_page(request):
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


@if_logged_in  # Redirect user to home page if already logged
def signup_page(request):
    # Get Empty Form (when loading page)
    form = CreateUserForm()

    if request.method == "POST":
        # Get data into form
        form = CreateUserForm(request.POST)
        # Validate form
        if form.is_valid():
            # Save user info into database and return user
            user = form.save()
            # Get username
            username = form.cleaned_data.get("username")

            # Get user group - customer
            group = Group.objects.get(name="customer")
            # Assign this user to customer group
            user.groups.add(group)

            # Save below string to send info to Login Page
            messages.success(request, f"Account Created For {username}🎉 Please Log In🖱")
            # Redirect to Login
            return redirect("login")

    context = {"form": form}
    return render(request, "todo_frontend/signup.html", context)


def logout_user(request):
    logout(request)
    return redirect("login")