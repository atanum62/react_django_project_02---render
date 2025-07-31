from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer,NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

# 👇 View to handle User Registration (Sign-Up)
class CreateUserView(generics.CreateAPIView):
    # ✅ Fetch all users (not usually needed but required by DRF)
    queryset = User.objects.all()
    
    # ✅ Should be UserSerializer (for converting JSON <-> User model)
    serializer_class = UserSerializer
    
    # ✅ This API can be accessed without authentication (open for sign-up)
    permission_classes = [AllowAny]

# ✅ View to list all notes of a logged-in user AND create a new note
class NoteListCreate(generics.ListCreateAPIView):
    # Serializer that will convert Note model <-> JSON
    serializer_class = NoteSerializer
    
    # Only authenticated users can access this API
    permission_classes = [IsAuthenticated]

    # ✅ Fetch only notes that belong to the logged-in user
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    # ✅ When creating a note, automatically set the current user as the author
    def perform_create(self, serializer):
        if serializer.is_valid():  # Validate incoming data
            serializer.save(author=self.request.user)  # Save note with author
        else:
            print(serializer.errors)  # Print errors if invalid (not commonly used in production)


# ✅ View to delete a note (only if it belongs to the logged-in user)
class NoteDelete(generics.DestroyAPIView):
    # Serializer for note deletion response
    serializer_class = NoteSerializer
    
    # Only authenticated users can delete notes
    permission_classes = [IsAuthenticated]

    # ✅ Ensure user can only delete their own notes
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)