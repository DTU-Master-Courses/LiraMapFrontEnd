FROM node:16-alpine AS builder
ENV NODE_ENV development

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
# RUN is for a single-use command in the build process of the container
RUN yarn install

# Copy app files
COPY . .

# Start the app; think in the context of container lifecycle (starting container)
# CMD [ "yarn", "build" ]
RUN yarn build

# Bundle static assets with nginx
FROM nginx:1.23-alpine as production
ENV NODE_ENV production

# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start nginx
CMD ["nginx", "-g", "daemon off;"]