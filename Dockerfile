FROM oven/bun:alpine

WORKDIR /usr/src/app

COPY package.json bun.lockb ./
RUN bun install

COPY . .

# Compila o projeto, se necessário, ou prepara para execução direta
# RUN bun build ./src/app.ts --outdir ./build
# Nota: Bun executa arquivos TypeScript diretamente, então pode não ser necessário um passo de compilação separado

EXPOSE 4000

CMD ["bun", "run", "src/app.ts"]
