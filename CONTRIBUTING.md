# Contributing Notes

This site is frontend-only. Contributors add Markdown files and update `data/archive.json`.

## Add a Note

1. Create a Markdown file in `content/notes`.
2. Add a matching entry in `data/archive.json`.
3. Use placeholders like `<TARGET_IP>`, `<DOMAIN>`, `<USER>`, `<PASSWORD>`, `<DC_IP>`, `<URL>`, `<WORDLIST>`, and `<FILE>` inside commands.
4. Link related notes with the `next` array. This powers the mind-map style next steps.
5. Open `#/preview` in the site to check Markdown rendering before committing.

## JSON Shape

```json
{
  "id": "unique-note-id",
  "title": "Technique Name",
  "category": "AD",
  "phase": "Enumeration",
  "severity": "Info",
  "tags": ["tag-one", "tag-two"],
  "file": "content/notes/example.md",
  "commands": ["tool --target <TARGET_IP>"],
  "checklist": ["Confirm scope", "Run command", "Document output"],
  "next": ["another-note-id"],
  "references": [{ "label": "Reference", "url": "https://example.com" }]
}
```

Keep commands scoped to authorized testing and add enough description for another contributor to understand when to use them.
