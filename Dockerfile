# == build stage == #
FROM node:12.13.1 as build-stage

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy application
COPY . .
RUN npm run build



# == production stage == #
FROM nginx as production-stage

# Copy build output
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy nginx conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]