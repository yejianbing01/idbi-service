FROM node:20-alpine3.18 as build-stage

ARG app_name=my-service

COPY . /app

WORKDIR /app

RUN npm install pnpm -g

RUN pnpm install

RUN pnpm run build $app_name

# production stage
FROM node:20-alpine3.18 as production-stage

ARG app_name=my-service

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app
RUN npm install pnpm -g
RUN pnpm install --production

WORKDIR /app/apps/$app_name

EXPOSE 3000

CMD ["node", "./main.js"]
