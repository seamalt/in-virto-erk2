FROM ubuntu:22.04

# automatically installs java (for padelpy), python, NodeJs
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    python3.11 \
    python3-pip \
    nodejs \
    npm \
    openjdk-17-jdk \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN [ ! -e /usr/bin/python ] && ln -s /usr/bin/python3 /usr/bin/python || true && \
    [ ! -e /usr/bin/pip ] && ln -s /usr/bin/pip3 /usr/bin/pip || true


WORKDIR /app

# Build React app in frontend
COPY frontend/ ./frontend/
WORKDIR /app/frontend
RUN npm install && npm run build

# Copy backend files and dependencies, move to backend
WORKDIR /app
COPY backend/ ./backend/
WORKDIR /app/backend
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8080

# Run Flask
CMD ["python", "app.py"]

LABEL author="Saanvi Molugu"
LABEL description="Runs react frontend and flask backend"