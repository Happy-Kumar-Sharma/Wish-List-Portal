# Contributing to Wish List Portal

Thank you for your interest in contributing to the Wish List Portal project! This guide will help you get started and ensure a smooth development experience.

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd with-list-portal
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in the required values (database, email, etc).

4. **Start the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Project Structure

- `src/app/` — Next.js App Router pages and API routes
- `src/components/` — Reusable React components
- `prisma/` — Prisma schema and migrations
- `public/` — Static assets

## Coding Guidelines

- Use TypeScript for all code.
- Use TailwindCSS for styling.
- Keep components modular and reusable.
- Use semantic HTML and accessible components.
- Write clear commit messages.

## Common Tasks

- **Add a new page:** Create a new folder in `src/app/` with a `page.tsx` file.
- **Add a new API route:** Create a folder in `src/app/api/` with a `route.ts` file.
- **Add a new component:** Place it in `src/components/` and use PascalCase for the filename.
- **Database changes:**
  - Update `prisma/schema.prisma` and run `npx prisma generate`.
  - If you can't run migrations, update the SQL in `prisma/migrations/manual-init.sql`.

## Authentication
- JWT-based authentication is used.
- Session is managed via localStorage.
- Protected pages redirect to login if not authenticated.

## UI/UX
- The sticky header is present on all main pages.
- Use the navigation bar to access all features.
- Tables use icons for actions with tooltips.

## Testing
- Manual testing is recommended for UI and API changes.
- Run the app locally and verify all flows.

## Reporting Issues
- Use GitHub Issues to report bugs or request features.
- Provide clear steps to reproduce and screenshots if possible.

## Code Reviews
- All changes should be submitted via Pull Request.
- At least one review is required before merging.

## Contact
For questions, contact the repository maintainer or open an issue.

Happy coding!
