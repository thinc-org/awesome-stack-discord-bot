FROM --platform=amd64 node:18-alpine as base

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY ./prisma ./prisma

RUN yarn run prisma generate

COPY . .

RUN yarn run build

FROM --platform=amd64 node:18-alpine

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/src/main"]
