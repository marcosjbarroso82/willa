FROM node:16

WORKDIR /usr/src/app/client

COPY ./client/package*.json ./

RUN npm install

WORKDIR /usr/src/app

COPY . .

EXPOSE 3000

WORKDIR /usr/src/app/client

CMD [ "npm", "start" ]

# CMD npm config set cache-min 9999999 && npm install --only=production && npm start