# Aku Ruo Uno Club Elections

React + Express voting app. Local development uses a JSON file; Vercel deployments require PostgreSQL so election data persists across serverless instances.

## Run locally

1. Install Node.js 20.19 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and set `ADMIN_PASSWORD` and a unique, random `SESSION_SECRET`.
4. Run `npm run dev:all` and open <http://localhost:5173/>.

The local API runs on port 3001 and Vite proxies `/api` requests to it. Local election state is saved in `.data/election.json`.

## Deploy to Vercel

1. Import the repository into Vercel using the project root. The build command is `npm run build`, and the output directory is `dist` (both are configured in `vercel.json`).
2. Create and connect a PostgreSQL database through the Vercel Marketplace. Set `DATABASE_URL` to the database's pooled connection string.
3. Add these environment variables in Vercel's project settings. Use a unique admin password of at least 12 characters and a unique session secret of at least 32 characters. Apply them to Production, and to Preview if you want preview deployments to use the API:
   - `DATABASE_URL`: the PostgreSQL pooled connection string.
   - `ADMIN_PASSWORD`: a strong, unique admin password.
   - `SESSION_SECRET`: a unique random value. Generate one with `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`.
4. Deploy. The first API request initializes the `election_state` table. Check `/api/health`; it should return `{"ok":true,"storage":"postgres"}`.

Do not set `VITE_API_URL` in Vercel for a same-domain deployment. Keep real credentials in Vercel's environment settings or a local `.env` file; never commit them. `.env.example` contains placeholders only.

Local `.data/election.json` contents are **not** copied to the Vercel database automatically. If you have existing ballots or settings to preserve, migrate them to PostgreSQL before directing voters to the deployment. Vercel's function filesystem is not durable, and the API refuses to use local JSON storage in Vercel.

## Election limitations

When candidates tie on vote count, the candidate whose earliest supporting ballot was submitted first is selected. If timestamps match, stored ballot order breaks the tie. The results page identifies when this rule was used.

After a ballot is recorded, participants can optionally share a Cyberlife Digital support message and promotional image through Facebook, X/Twitter, Instagram, TikTok, or WhatsApp. Image sharing uses the device share sheet when supported; otherwise participants can download the image and upload it in their social app. The message does not include ballot choices.

The current duplicate-vote check uses a browser-stored device identifier, not verified voter identity. A voter can clear or change it, so this is not suitable for a binding election without member authentication or one-use voter codes, plus appropriate audit and recovery controls. Test the complete ballot, admin, results, and backup/recovery flows before opening voting.
