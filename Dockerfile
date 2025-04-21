FROM node:latest

RUN mkdir -p /qrest
WORKDIR /qrest
ENV EXPO_ROUTER_APP_ROOT=app
COPY package.json /qrest
RUN npm install
COPY . /qrest
EXPOSE 8081
CMD ["npx", "expo", "start"]
