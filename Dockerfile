FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables
ARG NEXT_PUBLIC_GRESHAM_BACKEND
ENV NEXT_PUBLIC_GRESHAM_BACKEND=${NEXT_PUBLIC_GRESHAM_BACKEND}

ARG NEXT_PUBLIC_GRESHAM_AUTH
ENV NEXT_PUBLIC_GRESHAM_AUTH=${NEXT_PUBLIC_GRESHAM_AUTH}

# Build application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set the correct permission for the app directory and cache directories
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy built files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Set permissions for all copied files
RUN chown -R nextjs:nodejs /app

# Create and set permissions for cache directory
RUN mkdir -p .next/cache
RUN chown -R nextjs:nodejs .next/cache

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "start"]
