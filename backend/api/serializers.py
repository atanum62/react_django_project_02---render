from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Note

# UserSerializer -> Converts User model to JSON and handles User creation
class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        # Linking this serializer to Django's built-in User model
        model = User
        
        # Fields which we want to expose in API
        # 'password' will not be returned in response (write-only)
        fields = ['id', 'username', 'password']
        
        # This ensures 'password' is only used during write operations
        # and not shown in GET requests
        extra_kwargs = {
            "password": {"write_only": True}
        }

    # Overriding create method to hash password properly
    # By default, serializer would save plain text password
    def create(self, validated_data):
        # **validated_data unpacks data like:
        # username=..., password=..., etc.
        # create_user() -> automatically hashes the password 
        # and sets default fields (like is_staff=False)
        user = User.objects.create_user(**validated_data)
        
        # Returning the created user instance
        return user


# 🔑 What create_user() Does
# Django me:
# User.objects.create_user(username, email=None, password=None, **extra_fields)
# ✅ 1. Creates User Instance
# Ye ek naya user object banata hai aur database me save karta hai.

# ✅ 2. Hashes Password
# Jab aap plain password dete ho:

# python
# Copy code
# User.objects.create_user(username="atanu", password="12345")
# Internally ye run hota hai:

# python
# Copy code
# user = User(username="atanu")
# user.set_password("12345")  # hashes password
# user.save()
# Isse database me hashed password store hota hai (plain text nahi).

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        #linking note model to serializer
        model=Note
        fields = "__all__"
        extra_kwargs={"author":{"read_only":True}}

