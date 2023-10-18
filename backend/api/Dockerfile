# Stage 1: Build the Node.js Express Server
FROM node:18 AS build

WORKDIR /app

RUN mkdir images

COPY server.js package.json ./

EXPOSE 5174

RUN npm install --save

# Start your Node.js Express server
CMD ["node", "server.js"]
