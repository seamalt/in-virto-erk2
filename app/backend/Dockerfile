FROM python:3.12

# Install OpenJDK-17
RUN apt-get update && \
    apt-get install -y openjdk-17-jre-headless && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set JAVA_HOME
ENV JAVA_HOME /usr/lib/jvm/java-17-openjdk-amd64
ENV PATH $PATH:$JAVA_HOME/bin

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

#2001 is flask server for docker for development
EXPOSE 2001

CMD ["python", "app.py"]

LABEL maintainer="Saanvi Molugu"
LABEL description="image for backend"