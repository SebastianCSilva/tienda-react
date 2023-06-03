from django.urls import path, include

from .views import ListCategoriesView

urlpatterns = [
    path('categories', ListCategoriesView.as_view()),
]