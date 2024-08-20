# Use an official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy firebase configuration
COPY ./firebase.js /app/firebase.js

# Expose the port that the app runs on
EXPOSE 3333

# Start the application
CMD ["node", "index.js"]
