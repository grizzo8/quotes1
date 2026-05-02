# Use the official Node.js image as the base
FROM node:18-alpine

# Set the working directory inside the server
WORKDIR /app

# Copy the package.json and install the dependencies
COPY package.json ./
RUN npm install

# Copy the rest of your app's code
COPY . .

# Build the Next.js app for production
RUN npm run build

# Open the port Google Cloud expects
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
