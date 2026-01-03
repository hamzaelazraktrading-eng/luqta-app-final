# Luqta - Arabic Deals & Coupons Platform

## Overview

Luqta (لُقطة) is an Arabic-language deals and coupons aggregation platform targeting Gulf region users. The application allows users to browse offers across categories (electronics, perfumes, fashion, home goods, accessories), save favorites locally, and access discount coupons. An admin panel enables content management for offers and coupons.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for transitions and interactions
- **Form Handling**: React Hook Form with Zod validation
- **RTL Support**: Full Arabic language support with right-to-left layout

The frontend follows a page-based architecture with shared components. Key pages include HomePage, CategoryPage, OfferDetailPage, CouponsPage, FavoritesPage, TrendingPage, and AdminPage.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful JSON API under `/api/*` routes
- **Development**: Vite dev server with HMR proxied through Express
- **Production**: Static file serving from built Vite output

The server uses a storage abstraction layer (`IStorage` interface) implemented by `DatabaseStorage` class, enabling potential swap of data sources.

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between frontend and backend)
- **Migrations**: Drizzle Kit with `db:push` command
- **Tables**: 
  - `offers` - Product deals with pricing, images, categories, affiliate links
  - `coupons` - Discount codes with expiry dates

### Build System
- **Client Build**: Vite bundling to `dist/public`
- **Server Build**: esbuild bundling to `dist/index.cjs`
- **Shared Code**: TypeScript path aliases (`@shared/*`) for schema sharing

### API Endpoints
- `GET /api/offers` - List offers with optional search and category filters
- `GET /api/offers/:id` - Get single offer
- `POST /api/offers` - Create offer
- `DELETE /api/offers/:id` - Delete offer
- `GET /api/coupons` - List active coupons
- `POST /api/coupons` - Create coupon
- `DELETE /api/coupons/:id` - Delete coupon

## External Dependencies

### Database
- **PostgreSQL**: Required via `DATABASE_URL` environment variable
- **Connection**: Uses `pg` Pool with Drizzle ORM

### UI Component Libraries
- **Radix UI**: Headless accessible primitives for dialogs, dropdowns, tabs, etc.
- **shadcn/ui**: Pre-built component styling on top of Radix

### Third-Party Services
- **Google Fonts**: Cairo and Tajawal fonts for Arabic typography

### Key Runtime Dependencies
- `drizzle-orm` / `drizzle-zod` - Database ORM and schema validation
- `@tanstack/react-query` - Async state management
- `framer-motion` - Animation library
- `react-hook-form` / `@hookform/resolvers` - Form management
- `wouter` - Client-side routing
- `zod` - Schema validation