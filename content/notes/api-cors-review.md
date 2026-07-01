## Overview
CORS review checks whether browser-based origins can read sensitive API responses beyond the intended frontends.

## Steps
- Test trusted, untrusted, and null origins.
- Check preflight responses.
- Look for reflected origins with credentials allowed.
- Confirm whether sensitive data is browser-readable.
- Document exploitability with session context.

## Evidence
Record origin, CORS headers, credentials behavior, endpoint, and exposed data.
