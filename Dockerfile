FROM node:8

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install
RUN npm install -g serve
RUN npm run build
RUN rm -rf node_modules

EXPOSE 5000

CMD [ "serve",  "-s",  "build" ]