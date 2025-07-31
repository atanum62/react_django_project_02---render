from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # ✅ Django Admin Panel
    path('admin/', admin.site.urls),
    
    # ✅ User Registration API
    # Endpoint -> POST: /api/users/register/
    # Calls CreateUserView which creates a new user account
    path("api/users/register/", CreateUserView.as_view(), name="register"),
    
    # ✅ JWT Token Generation API
    # Endpoint -> POST: /api/token/
    # Body -> { "username": "atanu", "password": "12345" }
    # Returns -> Access token + Refresh token
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    
    # ✅ JWT Token Refresh API
    # Endpoint -> POST: /api/token/refresh/
    # Body -> { "refresh": "<refresh_token>" }
    # Returns -> New access token without asking for username/password again
    # ⚠️ You had a typo "refrash" -> changed to "refresh"
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    
    # ✅ Browsable API login/logout
    # Endpoint -> /api_auth/login/ and /api_auth/logout/
    # Useful for DRF's built-in browsable API authentication
    path("api_auth/", include("rest_framework.urls")),
    path("api/",include("api.urls")),
]
