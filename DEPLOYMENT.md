# Vercel frontend and Render backend

## Render
1. Create a Blueprint from this repository and select the deployment branch.
2. Set MONGODB_URI to your MongoDB Atlas connection URI using Render's secret environment settings.
3. Set FRONTEND_URL to the exact Vercel frontend origin (no trailing slash).
4. Set SENDER_EMAIL and EMAIL_PASSWORD for password reset emails.
5. Wait for /health to return {"status":"ok"} and copy the assigned Render service URL.

## Vercel
1. Import this repository and choose Root Directory: gym-forntend.
2. Replace REPLACE_WITH_RENDER_SERVICE in gym-forntend/vercel.json with the real Render hostname.
3. Framework: Create React App. Build: npm run build. Output: build.
4. Deploy the branch containing these fixes, then update Render FRONTEND_URL to match.
5. Check signup, login, page refresh, memberships, members and logout.

Requests use the same-origin /api proxy so secure login cookies work without third-party cookies.
No database or hosting account has been provisioned by these source changes.

## Repository hygiene
A tracked .env and node_modules exist in the original repository. Remove them from tracking and rotate any real secrets previously committed before public production use. Do not paste secrets into chat or commit them.
The root gym-management-system entry is a broken submodule and is removed in this change.
