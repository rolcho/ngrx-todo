# Use the latest LTS version of Node.js as the base image
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript files
RUN npm run build

# Expose the port on which your Express application will run
EXPOSE 3000

# Start the Express application
CMD ["npm", "start"]