# This dockerfile is meant to be used in a development to enable hot reloading

FROM node:18-alpine

WORKDIR /backend

COPY ./ ./

RUN npm install

EXPOSE 3001

CMD ["npm", "run", "dev"]