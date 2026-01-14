# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**smooth-parking-v2** is a parking payment service built with Next.js 16 (App Router), React 19, and TypeScript. The application supports multiple authentication methods (email, Google, Apple via AWS Cognito) and integrates with a Go backend API and Stripe for payments.

## Essential Commands

### Development

```bash
npm run dev              # Start development server with Turbopack
npm run build            # Production build with Turbopack
npm start                # Start production server
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
```

## Architecture

### Three-Layer Data Access Pattern

This codebase follows a strict three-layer architecture for data access as documented in `AGENTS.md`:

1. **Server Components (RSC)** - Default for initial renders, SEO, and confidential data

    - Fetch directly in `page.tsx` using `src/apis/*.server.ts`
    - Use `cache: 'no-store'` or `next: { tags: [...] }` for Data Cache management
    - Invoke `revalidateTag()` after mutations

2. **Route Handlers (/api)** - For high-frequency refetching and reusable APIs

    - Place in `src/app/api/<domain>/route.ts`
    - Client calls via `useQuery` from TanStack Query
    - Acts as BFF (Backend for Frontend) layer

3. **Server Actions** - Single entry point for all mutations (create/update/delete)
    - Feature-specific: `app/(...)/<route>/actions/`
    - Shared: `src/actions/`
    - Always call `revalidateTag()` or `invalidateQueries()` after success

### File Colocation Rules

**Feature-specific files stay colocated** under the route that owns them:

```
app/(private|public)/<route>/
├── page.tsx              # Server Component (default)
├── actions/              # Route-specific Server Actions
├── apis/                 # Route-specific fetch wrappers (*.server.ts, *.client.ts)
├── components/           # Client Components for this route
├── hooks/                # Local custom hooks
└── stores/               # Local state management
```

**Shared files** belong in top-level directories:

```
src/
├── actions/              # Shared Server Actions
├── apis/                 # Reusable API clients (*.server.ts, *.client.ts)
├── components/           # Design system UI components
├── lib/                  # Utilities (auth, http, etc.)
├── types/                # Shared TypeScript types
└── utils/                # Shared utility functions
```

**Decision criterion:** "If the URL changes, so does the responsibility." Only extract to shared directories when genuinely reused across multiple routes.

### Route Groups

- `(private)/` - Routes requiring authentication
- `(public)/` - Public routes (auth optional)
    - `(auth)/` - Authentication flows (login, signup)
    - `(welcome)/` - Onboarding steps

### Authentication & Session Management

- **JWT-based** with access/refresh tokens stored in HTTP-only cookies
- Session helpers in `src/lib/auth/session.ts`:
    - `getSession()` - Retrieves session with automatic token refresh
    - `persistAuthSession()` - Stores tokens in cookies
    - `clearAuthSession()` - Removes auth cookies
- **Social login flow** (Google/Apple):
    - Uses AWS Cognito Hosted UI
    - State validation with nonce via `src/lib/auth/socialState.ts`
    - Route factory pattern in `src/app/api/auth/social/routeFactory.ts`
    - See `auth_social_flow.md` for detailed sequence diagram

### API Integration

- **Base URL**: Set via `API_BASE_URL` environment variable
- **Wrapper**: `apiFetch()` from `src/lib/http/apiFetch.ts`
    - Automatically attaches Bearer token
    - Handles 401 with token refresh retry
    - Defaults to `cache: 'no-store'`
- **OpenAPI-generated types**: `src/types/generated/openapi.ts` and `schemas.ts`

### Sheet/Modal System

Two implementations exist (v1 and v2):

- **sheet** (v1): Client-side panel navigation with URL state
- **sheet-v2** (active): Server-rendered panels with registry pattern
    - Registry: `src/sheet-v2/server/registry.ts` (auto-generated)
    - Panels: `src/sheet-v2/panels/<modal>/<path>/`
    - Config: `src/sheet-v2/panels.config.json`
    - Generation: `npm run gen:panels:v2`

Panel registry maps `modalId` → `panelPath` → React component with depth-based navigation.

### Naming Conventions

- **Server-only files**: `*.server.ts` (for RSC/Server Actions)
- **Client-only files**: `*.client.ts` (for useQuery/client hooks)
- **Private route prefixes**: `_components/`, `_actions/`, `_apis/`, `_hooks/` (Next.js ignores `_` prefixed folders in routing)

## Important Patterns

### Error Handling

- Server Actions return Result types (not throwing exceptions)
- API calls use try-catch with proper error logging
- Social auth errors use `respondWithError()` helper

### Cache Invalidation

After mutations:

- RSC data: `revalidateTag('entity-id')` in Server Actions
- Query data: `queryClient.invalidateQueries(['key'])` in `useMutation`

Store tag names in `src/constants/cache.ts` when shared.

### Optimistic Updates

Combine `useOptimistic` (for RSC) or `useMutation` with `onMutate` (for Query):

```tsx
// For Query-managed data
const mutation = useMutation({
    mutationFn: serverAction,
    onMutate: async variables => {
        await qc.cancelQueries({ queryKey: ['key'] });
        const prev = qc.getQueryData(['key']);
        qc.setQueryData(['key'], optimisticValue);
        return { prev };
    },
    onError: (err, vars, context) => {
        if (context?.prev) qc.setQueryData(['key'], context.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['key'] }),
});
```

## Code Style

- **Language**: All code comments and documentation in **Japanese** (as per AGENTS.md)
- **TypeScript**: Strict mode enabled
- **Imports**: Use `@/*` alias for `src/*`
- **Formatting**: Prettier with Tailwind plugin
- **Component style**: Prefer Server Components; only add `'use client'` when necessary

## Testing & Validation

- No test framework currently configured
- API schemas validated via OpenAPI spec in `docs/bundled.yaml`
- Manual testing via DebugNavigation component (visible in dev mode)

## Environment Variables

Required variables (see `.env.local`):

- `API_BASE_URL` - Backend API endpoint
- Cognito credentials for social auth
- Stripe publishable key
- Device ID and language settings

## Important Notes

- **Never commit** `.env.local` or credentials
- **Always regenerate** types after OpenAPI changes (`npm run gen:openapi`)
- **Prefer editing** existing files over creating new ones
- **Colocate first**, extract to shared directories only when genuinely reused
- **Server Actions** are the single source of truth for mutations
- **Route Handlers** should be stateless BFF endpoints
- **All mutations** must handle cache invalidation appropriately
