# Stage 1: Build the React app
FROM node:20-alpine as builder
WORKDIR /app
COPY frontend/package*.json ./frontend/
RUN npm install --prefix ./frontend
COPY frontend ./frontend
RUN npm run build --prefix ./frontend

# Stage 2: Build the Express app
#FROM node:20-alpine as backend-builder
#WORKDIR /app
#COPY backend/package*.json ./backend/
#RUN npm install --prefix ./backend
#COPY backend ./backend
#EXPOSE 3000
#CMD ["npm", "start"]

# Stage 3: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/frontend/dist /usr/share/nginx/html
#COPY --from=backend-builder /app/backend /app/backend
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
#EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
