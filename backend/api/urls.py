from django.urls import path
from . import views

urlpatterns = [
    # ✅ API endpoint to list all notes of logged-in user (GET)
    # and to create a new note (POST)
    # URL → /notes/
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),

    # ✅ API endpoint to delete a specific note by its primary key (id)
    # URL → /notes/delete/1/  (will delete note with id=1)
    # ⚠️ Fixed missing parentheses in as_view()
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
]
