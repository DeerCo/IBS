# This dockerfile is meant to be used in a development to enable hot reloading

FROM node:16.17.0

WORKDIR /frontend

COPY ./ ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]