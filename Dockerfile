FROM oven/bun:alpine as base

WORKDIR /usr/app

FROM base AS install
COPY package.json bun.lockb /temp/dev/
RUN mkdir -p /temp/dev && \
    cd /temp/dev && \
    bun install --frozen-lockfile

COPY package.json bun.lockb /temp/prod/
RUN mkdir -p /temp/prod && \
    cd /temp/prod && \
    bun install --frozen-lockfile --production

FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# [optional] tests & build
# ENV NODE_ENV=production
# RUN bun test
# RUN bun run build

FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/app/src .
COPY --from=prerelease /usr/app/package.json .

USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "app.ts" ]
