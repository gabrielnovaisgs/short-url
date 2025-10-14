FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /usr/src/app
COPY ["turbo.json", "pnpm*.yaml","package*.json", "./"]
COPY "packages/shared" "./packages/shared"
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile


FROM base AS front
WORKDIR  /usr/src/app
COPY --from=base /usr/src/app ./
COPY "./apps/front" "./apps/front"
RUN pnpm  install --frozen-lockfile
RUN pnpm run -r build

EXPOSE 3000

CMD [ "pnpm", "run", "start" ]
