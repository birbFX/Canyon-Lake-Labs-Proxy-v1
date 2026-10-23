> [!IMPORTANT]
> **This is AI vibe coding.**
> This project is a **passion project by Canyon Lake Labs**, built for fun and made
> almost entirely with AI assistance. It is a hobby project, not a polished
> commercial product. If you don't like AI-made software, that's completely
> fine — **don't use it.**

<h1 align="center">Canyon Lake Lab's Proxy Demo | v1</h1>

A lightweight, open public web proxy demo by **Canyon Lake Labs**. Enter an
address or a search and browse the web through the proxy.

This is the **public demo** build intentionally minimal. It's a minimal build that ships just the browser.

## Run it

```sh
npm install
npm run dev
```

Then open <http://localhost:3030>.

It runs on whatever `PORT` you provide (defaults to `3030`), so it deploys to
Render / Railway / Fly / a VPS with no extra config.

## Deploy

- **Render / Railway / Fly:** set the start command to `npm start` (or `node server.js`).
- The server serves the static UI and hosts the proxy endpoints (Wisp) itself.

## Notes

- Powered by the open-source [Scramjet](https://github.com/MercuryWorkshop/scramjet)
  proxy engine (AGPL-3.0). All credit for the engine goes to Mercury Workshop.
- This project is licensed under the AGPL-3.0.
