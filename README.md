# Tactical Intelligence Archive

Frontend-only pentest command archive for fast copy/paste workflows.

## Deploy On GitHub Pages

This project is pure static HTML, CSS, JavaScript, JSON, and Markdown. No Python server, Node server, backend, or build step is required.

### Option 1: GitHub Pages From Branch

1. Push this folder to a GitHub repository.
2. Go to repository `Settings` > `Pages`.
3. Set `Source` to `Deploy from a branch`.
4. Select your branch and `/root`.
5. Open the GitHub Pages URL GitHub gives you.

### Option 2: GitHub Actions

This repo also includes `.github/workflows/pages.yml`. In repository `Settings` > `Pages`, set `Source` to `GitHub Actions`.

The site uses hash routes like:

```text
https://your-user.github.io/your-repo/#/category
https://your-user.github.io/your-repo/#/note/bloodhound-domain-enumeration
https://your-user.github.io/your-repo/#/preview
```

Hash routes are used so refreshes work on GitHub Pages without a backend rewrite server.

## Contributor Workflow

- Write note content in `content/notes/*.md`.
- Register the note in `data/archive.json`.
- Put related note ids in `next` to create the linked next-step map.
- Use placeholders like `<TARGET_IP>`, `<DOMAIN>`, `<USER>`, `<PASSWORD>`, `<DC_IP>`, `<URL>`, `<WORDLIST>`, and `<FILE>` in command strings.
- Open `#/preview` in the deployed app to check Markdown rendering before committing.

More detail is in `CONTRIBUTING.md`.
