# Use the official Node.js Alpine image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the app source code to the working directory
COPY . .

# Build the Angular app
RUN npm run build

# Expose the port that the app will run on
EXPOSE 4200

# Start the app
CMD ["npm", "start"]