FROM node:24

WORKDIR /app

# Copy package and lockfile from repository root (compose uses project root as build context)
COPY backend/package.json backend/pnpm-lock.yaml ./

# Use Corepack (bundled with modern Node) to activate a stable pnpm version
# This avoids installing pnpm globally via npm which can hang in CI or restricted networks.
RUN corepack enable && \
	corepack prepare pnpm@latest --activate && \
	pnpm install --frozen-lockfile

# Copy rest of source
COPY backend/ ./

EXPOSE 3000

# Fix CMD array syntax and run dev script
CMD ["pnpm", "run", "start:dev"]

