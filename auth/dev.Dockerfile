FROM node:12.19.0-alpine
ENV NODE_ENV=development

WORKDIR /app

COPY ["package.json", "yarn.lock*", "./"]
RUN yarn install && mv node_modules ./
COPY . .

CMD ["yarn", "dev"]