# Stage 1: Build the React App
FROM node:18 AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 5173
#RUN yarn build

CMD ["yarn", "dev"]