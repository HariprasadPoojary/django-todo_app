from todo.views import task_list
from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("login/", views.login, name="login"),
    path("signup/", views.signup, name="signup"),
    # APIs
    path("api/", views.api_home, name="api_home"),
    path("task_list/", views.task_list, name="task_list"),
    path("task_view/<str:id>/", views.task_view, name="task_view"),
    path("task_create/", views.task_create, name="task_create"),
    path("task_update/<str:id>/", views.task_update, name="task_update"),
    path("task_delete/<str:id>/", views.task_delete, name="task_delete"),
]
