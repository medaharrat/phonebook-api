# Using node v15.x
FROM node:15

# Set server home
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy app
COPY . .

# Install dependencies
RUN npm install

# Expose ports
EXPOSE 8000

# Start command
CMD ["npm", "run", "start"]