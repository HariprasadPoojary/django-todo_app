from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

#
from . import views

urlpatterns = [
    path("", views.api_home, name="api_home"),
    path("task_list/<str:custid>", views.task_list, name="task_list"),
    path("task_view/<str:id>/", views.task_view, name="task_view"),
    path("task_create/", views.task_create, name="task_create"),
    path("task_update/<str:id>/", views.task_update, name="task_update"),
    path("task_delete/<str:id>/", views.task_delete, name="task_delete"),
]

urlpatterns = format_suffix_patterns(urlpatterns)