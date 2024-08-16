# Build React frontend using Node.js
FROM node:18 AS frontend-build

WORKDIR /app/frontend

# Copy frontend files and install dependencies
COPY frontend/ ./
RUN npm install
RUN npm run build

# Python runtime environment for Flask with Java JDK (for padelpy)
FROM python:3.12-slim

RUN apt-get update && apt-get install -y \
    default-jdk \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY backend/ ./backend/

# Install Python libraries
WORKDIR /app/backend
RUN pip install --no-cache-dir -r requirements.txt

COPY --from=frontend-build /app/frontend/build /app/frontend/build

# Flask running on port 8080
EXPOSE 8080

CMD ["python", "app.py"]

LABEL author="Saanvi Molugu"
LABEL description="Runs React frontend and Flask backend"
