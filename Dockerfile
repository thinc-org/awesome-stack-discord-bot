FROM --platform=amd64 node:16.19-alpine3.16 as base

WORKDIR /app

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY prisma ./prisma

RUN pnpm migration:generate

COPY . .

RUN pnpm build

# RUN pnpm prune --prod

FROM --platform=amd64 node:16.19-alpine3.16

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/src/main"]
