# Use the official Node.js runtime as the base image
FROM node:20-bullseye

# Set the working directory in the container
WORKDIR /usr/src/app


RUN apt-get update && \
    apt-get install -y \
      libnss3 \
      libatk1.0-0 \
      libatk-bridge2.0-0 \
      libcups2 \
      libx11-xcb1 \
      libxcomposite1 \
      libxdamage1 \
      libxrandr2 \
      libgbm1 \
      libpango1.0-0 \
      libasound2 \
      fonts-liberation \
      libwoff1 \
      libharfbuzz0b \
      libxshmfence1 \
      wget \
      curl \
      ca-certificates \
      && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json (if available)
COPY app/package*.json ./

# Install the application dependencies
RUN npm install
RUN npm install uuid
RUN npx playwright install
RUN npx playwright install --with-deps
RUN npm install dotenv
# Copy the rest of the application code
COPY app/ .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]