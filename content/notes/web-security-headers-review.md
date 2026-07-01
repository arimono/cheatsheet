## Overview
Security headers review checks browser-side hardening controls such as CSP, HSTS, frame protection, and cookie flags.

## Steps
- Capture headers from authenticated and unauthenticated pages.
- Review redirects for dropped headers.
- Check cookie flags and HSTS scope.
- Treat missing headers according to actual exploitability.
- Link CSP gaps to XSS impact.

## Evidence
Record URL, response headers, missing or weak control, and the practical risk.
