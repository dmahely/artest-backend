FROM node:14

WORKDIR /usr/src/artest-backend
COPY package*.json ./
COPY .env.sample ./.env

ENV SPOTIFY_CLIENT_ID=${SPOTIFY_CLIENT_ID}
ENV SPOTIFY_CLIENT_SECRET=${SPOTIFY_CLIENT_SECRET}

RUN npm install

COPY . .
EXPOSE 4000

CMD [ "node", "app.js" ]