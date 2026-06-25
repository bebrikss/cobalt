FROM node:24-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

FROM base AS build
WORKDIR /app
COPY . /app

RUN corepack enable
RUN apk add --no-cache python3 alpine-sdk

RUN pnpm install --prod --frozen-lockfile --force
RUN pnpm deploy --filter=@imput/cobalt-api --prod /prod/api
RUN git init && git config user.email "bot@railway.app" && git config user.name "Railway" && git commit --allow-empty -m "init"
RUN cp -r .git /prod/api/.git

FROM base AS api
WORKDIR /app

COPY --from=build --chown=node:node /prod/api /app

USER node

EXPOSE 9000
CMD [ "node", "src/cobalt" ]
