# Aku Ruo Uno Club Elections

React + Node voting app with a local JSON store for temporary development and PostgreSQL support for Vercel deployments.

## Run locally

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and set `ADMIN_PASSWORD` and a long random `SESSION_SECRET`.
4. Run `npm run start` in one terminal (API on port 3001).
5. Run `npm run dev` in another terminal (Vite on port 5173). Configure Vite proxy or use `VITE_API_URL=http://localhost:3001` in `.env.local`.

Local vote and election state are saved in `.data/election.json`.

## Deploy to Vercel

1. Import this repository into Vercel. Build command: `npm run build`; output directory: `dist`.
2. Add a PostgreSQL database through Vercel Marketplace (Neon or Supabase) and set `DATABASE_URL`.
3. Set `ADMIN_PASSWORD` and a long random `SESSION_SECRET` in Vercel environment variables.
4. Deploy. The API uses the Vercel function in `api/server.js`; the database is initialized on first request.

Do not use local JSON mode for a public Vercel deployment: function filesystems are not durable. LocalStorage device identifiers provide a basic one-device duplicate check, not verified voter identity. For a binding election, add member authentication or one-use voter codes and audit controls before voting opens.
# use "npm run dev:all" to start API and Vite together

For XAMPP subpath testing, use npm run dev:xampp then open http://localhost:5173/voting/. For standard local development, use npm run dev:all and open http://localhost:5173/.
