FROM node:14-alpine

# Create a working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the NestJS app's dependencies
RUN npm install

# Copy the rest of the app's files
COPY . .

# Running Prisma Generate (Fixing error where prisma generate does not run after npm install)
RUN yarn prisma generate
COPY prisma ./prisma/

# change directory to client
WORKDIR /app/client

# Install React app's dependencies
RUN npm install

# Build the React app
RUN npm run build

# change directory to root
WORKDIR /app

# Expose port 3000
EXPOSE 4000

# Start the app
CMD ["npm", "run", "start"]