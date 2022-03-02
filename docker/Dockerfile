FROM node:16 as builder
RUN npm i -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml tsconfig.json ./
COPY ./src ./src
RUN pnpm i

RUN ls -lha
CMD ["pnpm", "start"]
