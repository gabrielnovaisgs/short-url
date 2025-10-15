FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /usr/src/app
COPY ["turbo.json", "pnpm*.yaml","package*.json", "./"]
COPY "packages/shared" "./packages/shared"
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile


FROM base AS frontbuilder
WORKDIR  /usr/src/app
COPY --from=base /usr/src/app ./
COPY "./apps/front" "./apps/front"
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile 
RUN pnpm run -r build

WORKDIR  /usr/src/app/apps/front
RUN cp -r ./public .next/standalone/apps/front && cp -r ./.next/static .next/standalone/.next/

FROM node:24-alpine AS front
WORKDIR /app
COPY --from=frontbuilder /usr/src/app/apps/front/.next ./
EXPOSE 3000
CMD ["node", "/app/standalone/apps/front/server.js"]

FROM base AS back
WORKDIR  /usr/src/app
COPY --from=base /usr/src/app ./
COPY "./apps/back" "./apps/back"
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
EXPOSE 3000
CMD [ "pnpm", "run", "start" ]