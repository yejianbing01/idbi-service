FROM node:20-alpine3.18 as build-stage

ARG app_name

COPY . /app

WORKDIR /app

RUN npm install pnpm -g

RUN pnpm install

RUN pnpm run build

# production stage
FROM node:20-alpine3.18 as production-stage

COPY --from=build-stage /app/dist/apps /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app/${app_name}

RUN npm install pnpm -g

RUN pnpm install --production

EXPOSE 3000

CMD ["node", "./main.js"]
