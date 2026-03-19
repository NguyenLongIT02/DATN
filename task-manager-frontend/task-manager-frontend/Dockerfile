# =============================================
# Stage 1: Build the React/Vite application
# =============================================
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json .

# Install dependencies
RUN npm ci --silent

# Copy source code
COPY . .

# Build the application (environment variables are injected at runtime via nginx)
RUN npm run build

# =============================================
# Stage 2: Serve with Nginx
# =============================================
FROM nginx:1.25-alpine

# Copy the built app from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
