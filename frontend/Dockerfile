# # Multi-stage build for Next.js frontend
# FROM node:20-alpine AS base

# # Install dependencies only when needed
# FROM base AS deps
# WORKDIR /app

# # Copy package files
# COPY package.json package-lock.json* ./

# # Install dependencies
# RUN npm ci

# # Rebuild the source code only when needed
# FROM base AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .

# # Set environment variables for build
# ENV NEXT_TELEMETRY_DISABLED=1

# # Build the application
# RUN npm run build

# # Production image, copy all the files and run next
# FROM base AS runner
# WORKDIR /app

# ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1

# # Create a non-root user
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# # Copy necessary files
# # Create public directory and copy if exists
# RUN mkdir -p ./public
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# USER nextjs

# EXPOSE 3000

# ENV PORT=3000
# ENV HOSTNAME="0.0.0.0"

# CMD ["node", "server.js"]


# Multi-stage build for Next.js frontend
FROM node:20-alpine AS base

# ---------------- DEPENDENCIES ----------------
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# ---------------- BUILD ----------------
FROM base AS builder
WORKDIR /app

# 🔴 BUILD ARG
ARG NEXT_PUBLIC_API_URL

# 🔴 MAKE IT AVAILABLE TO NEXT.JS BUILD
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 🔴 NEXT.JS BUILD (NOW IT KNOWS API URL)
RUN npm run build

# ---------------- PRODUCTION ----------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir -p ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
