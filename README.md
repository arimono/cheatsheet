# Tactical Intelligence Archive

Frontend-only pentest command archive for fast copy/paste workflows.

## Run Locally

```powershell
python -m http.server 5173 --bind 127.0.0.1
```

Open:

```text
http://127.0.0.1:5173/
```

The site is static HTML, CSS, and JavaScript. It can be hosted on GitHub Pages, Netlify, Cloudflare Pages, or any normal static file host.

## Contributor Workflow

- Write note content in `content/notes/*.md`.
- Register the note in `data/archive.json`.
- Put related note ids in `next` to create the linked next-step map.
- Use placeholders like `<TARGET_IP>`, `<DOMAIN>`, `<USER>`, `<PASSWORD>`, `<DC_IP>`, `<URL>`, `<WORDLIST>`, and `<FILE>` in command strings.
- Open `#/preview` in the app to check Markdown rendering before committing.

More detail is in `CONTRIBUTING.md`.
