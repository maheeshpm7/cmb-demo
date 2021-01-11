FROM node:10.15-slim

WORKDIR /app

ENV PORT 3000

EXPOSE ${PORT}

COPY ./package.json /app/package.json

RUN npm install

COPY . /app

ENTRYPOINT ["npm", "start"]
