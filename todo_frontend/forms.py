# User Creation Forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.forms.widgets import EmailInput, TextInput


class CreateUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password1",
            "password2",
        ]
        widgets = {
            "username": TextInput(
                attrs={"placeholder": "Enter Username..."},
            ),
            "email": EmailInput(
                attrs={"placeholder": "Enter Email..."},
            ),
        }
