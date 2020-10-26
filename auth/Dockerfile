FROM node:12.19.0 as build

COPY --chown=node:node . .
RUN yarn install && yarn build

FROM node:12.19.0-alpine

RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app
WORKDIR /usr/src/app

COPY --chown=node:node --from=build ["dist", "package.json", "yarn.lock", "./"]
USER node
RUN yarn install --production

CMD ["node --max-old-space-size=1536", "dist/server.js"]