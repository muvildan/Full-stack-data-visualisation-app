FROM node:16-alpine
RUN apk update

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY . ./

RUN npm install

EXPOSE 3000
CMD ["npm", "run", "start"]