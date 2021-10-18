# build environment
FROM node:alpine as build
WORKDIR /app
COPY package.json ./
COPY ./ ./
RUN npm install
RUN npm install react-scripts@3.0.1 -g
RUN npm run build

# production environment
FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]




