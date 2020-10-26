FROM node:12.19.0 as build

COPY --chown=node:node . .
RUN yarn install && yarn build

FROM node:12.19.0-alpine

RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app
WORKDIR /usr/src/app

COPY --chown=node:node . .
USER node
RUN yarn install

CMD ["yarn", "dev"]