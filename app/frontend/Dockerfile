FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

#choosing port 2000 for docker frontend (react)
EXPOSE 2000

ENV PORT=2000

#RUN npm install -g serve

#CMD ["serve", "-s", "build", "-l", "5000"]
CMD ["npm", "start"]

LABEL maintainer="Saanvi Molugu"
LABEL description="image for frontend"