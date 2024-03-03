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

ARG BACKEND_URL="http://localhost:3102"
ENV BACKEND_URL=${BACKEND_URL}

RUN ["node", "/app/update.environment.mjs" ]
RUN BACKEND_URL=${BACKEND_URL} npm run build --configuration=automatedtest --verbose

FROM nginx:1.21-alpine

COPY --from=build /app/dist/todo-app/browser /usr/share/nginx/html

EXPOSE 80

