FROM node:18.12.0

WORKDIR /usr/src/app

COPY --chown=node:node . /usr/src/app

RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
