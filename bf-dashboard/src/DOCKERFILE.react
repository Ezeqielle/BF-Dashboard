# Stage 1: Build the React App
FROM node:14 AS build
WORKDIR /app
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install
COPY . ./
RUN npm run build

# Stage 2: Create the Final Image
FROM nginx:alpine
COPY --from=build /app/frontend/build /usr/share/nginx/html

# Expose the port for the React app (if needed)
EXPOSE 5173

# Start Nginx to serve the React app
CMD ["nginx", "-g", "daemon off;"]
