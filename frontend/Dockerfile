# Use Node.js version 16 on Alpine Linux
FROM node:16-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json .
COPY package-lock.json .

RUN npm i -g vite
# Install dependencies
RUN npm install

# Copy the entire project files into the working directory in the container
COPY . .

RUN npm run build

# Run the Vite development server
CMD ["npm", "run", "preview"]
