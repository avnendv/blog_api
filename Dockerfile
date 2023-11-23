FROM node:20.9-alpine as build-stage

WORKDIR /app

COPY package*.json .

RUN yarn install

COPY . .

CMD ["yarn", "production"]