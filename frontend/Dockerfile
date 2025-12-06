FROM node:24

WORKDIR /app

COPY frontend/package.json frontend/pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install

COPY frontend/ ./

EXPOSE 4200

CMD [ "pnpm", "run", "start" ]