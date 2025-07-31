#!/usr/bin/env bash
set -o errexit  # agar koi command fail ho toh build ruk jaaye

# Install all Python dependencies
pip install -r requirements.txt

# Collect all static files into STATIC_ROOT
python manage.py collectstatic --no-input

# Apply database migrations
python manage.py migrate
