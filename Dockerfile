FROM --platform=amd64 node:16.19-alpine3.16 as base

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY prisma ./prisma

RUN yarn run prisma migrate deploy

COPY . .

RUN yarn run build

FROM --platform=amd64 node:16.19-alpine3.16

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/src/main"]
