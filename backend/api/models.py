from django.db import models
from django.contrib.auth.models import User

# ✅ Note model to store user's notes in the database
class Note(models.Model):
    # Title of the note (max length = 100 characters)
    title = models.CharField(max_length=100)
    
    # Main text/content of the note
    content = models.TextField()
    
    # Timestamp when the note is created (auto set once)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # ForeignKey → Each note belongs to a specific user (author)
    # on_delete=models.CASCADE → If user is deleted, all their notes also get deleted
    # related_name="notes" → Allows reverse relation (user.notes.all())
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    # String representation of the model (shown in admin panel)
    def __str__(self):
        return self.title
