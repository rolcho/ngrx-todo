# Use the official Node.js Alpine image as the base
FROM node:18-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the app source code to the working directory
COPY . .

RUN npm run build

FROM nginx:1.21-alpine

COPY --from=build /app/dist/todo-app/browser /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
ENV BACKEND_URL=$BACKEND_URL

EXPOSE 80

