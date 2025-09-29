
# Wish List Portal

A modern, full-stack wish list management portal built with Next.js (App Router), TypeScript, TailwindCSS, Prisma, and MySQL. Features authentication, admin dashboard, statistics, beautiful UI, and more.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Authentication & Authorization](#authentication--authorization)
- [Database & Prisma](#database--prisma)
- [UI/UX & Styling](#uiux--styling)
- [API Endpoints](#api-endpoints)
- [Admin Features](#admin-features)
- [Statistics & Charts](#statistics--charts)
- [Testing & Debugging](#testing--debugging)
- [Contributing](#contributing)
- [FAQ](#faq)
- [License](#license)

---

## Project Overview
Wish List Portal is a collaborative platform for users to create, manage, and share wish lists. It supports user authentication, admin management, statistics visualization, and a beautiful, responsive UI.

## Features
- User registration and login (JWT-based)
- Add, edit, delete, and mark wishes as purchased
- Responsive, modern UI with sticky navigation
- Admin dashboard to manage users and wishes
- Portal-wide statistics with interactive bar charts
- Protected routes and session management
- Email notifications (configurable)
- Table views with tooltips, icons, and row separators

## Tech Stack
- **Frontend:** Next.js (App Router), React, TypeScript
- **Styling:** TailwindCSS
- **Backend:** Next.js API routes, Node.js
- **Database:** MySQL (via Prisma ORM)
- **Auth:** JWT, localStorage session
- **Charts:** Recharts
- **Email:** Nodemailer

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
3. **Configure environment:**
	- Copy `.env.example` to `.env` and fill in DB, JWT, and email settings.
4. **Database setup:**
	- If you have migration permissions, run:
	  ```sh
	  npx prisma migrate dev
	  ```
	- Otherwise, apply the SQL in `prisma/migrations/manual-init.sql` manually.
5. **Start the app:**
	```sh
	npm run dev
	```
	Visit [http://localhost:3000](http://localhost:3000)

## Project Structure
```
with-list-portal/
├── src/
│   ├── app/           # Next.js App Router pages & API
│   ├── components/    # Reusable React components
│   └── lib/           # Utility libraries (prisma, auth, etc)
├── prisma/            # Prisma schema & migrations
├── public/            # Static assets
├── .env               # Environment variables
├── tailwind.config.js # TailwindCSS config
├── package.json       # Project metadata & scripts
```

## Authentication & Authorization
- JWT tokens are issued on login and stored in localStorage.
- Protected pages (wishes, stats, admin) require authentication.
- Admin role is checked for admin routes.
- Session is managed client-side; logout clears the token.

## Database & Prisma
- Prisma ORM is used for all DB access.
- Schema is defined in `prisma/schema.prisma`.
- If migrations are not possible, use `prisma/migrations/manual-init.sql`.
- Main tables: `User`, `Wish` (with relations).

## UI/UX & Styling
- TailwindCSS for all styling.
- Sticky header with navigation on all main pages.
- Tables are responsive, with icons for actions and tooltips on hover.
- Long text in tables is truncated with ellipsis and full text on hover.
- All actions (edit, delete, mark purchased) use meaningful icons.

## API Endpoints
- **/api/auth/login** — User login
- **/api/auth/register** — User registration
- **/api/wishes** — CRUD for wishes
- **/api/wishes/[id]** — Edit, delete, mark as purchased
- **/api/stats** — Portal statistics
- **/api/admin/users** — Admin: list users

## Admin Features
- View all users and their wish counts
- Delete users (if needed)
- See registration dates
- Access via `/admin` (admin role required)

## Statistics & Charts
- `/stats` — Table of all wishes
- `/stats-charts` — Interactive bar chart of portal stats (users, wishes, purchased, etc)
- Charts use Recharts and are fully responsive

## Testing & Debugging
- Manual testing recommended for UI and API
- Use browser dev tools for debugging
- Check console for errors and fix TypeScript issues promptly

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.
- Fork, branch, and submit PRs for all changes
- Write clear commit messages
- All code must be reviewed before merging

## FAQ
**Q: How do I reset my database?**
A: Drop all tables and re-run the SQL in `prisma/migrations/manual-init.sql`.

**Q: How do I add a new page?**
A: Create a new folder in `src/app/` with a `page.tsx` file.

**Q: How do I add a new API route?**
A: Create a folder in `src/app/api/` with a `route.ts` file.

**Q: How do I change the admin user?**
A: Update the user record in the database to set `role = 'admin'`.

## License
This project is licensed under the MIT License.

---

For questions or support, open an issue or contact the maintainer.
