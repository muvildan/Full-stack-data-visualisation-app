FROM node:16-alpine
# update packages
RUN apk update

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./
COPY src /app/src

RUN ls -a

RUN npm install
RUN npm run preload-docker

EXPOSE 8080
CMD ["npm", "run", "docker"]