## Overview
SSRF testing checks whether the server can be made to send requests to unintended internal or external destinations.

## Steps
- Identify URL fetch, webhook, import, and preview features.
- Start with a controlled external callback.
- Test redirects, schemes, DNS behavior, and loopback carefully.
- Test cloud metadata endpoints only with explicit approval.
- Link confirmed metadata reachability to cloud impact notes.

## Evidence
Record vulnerable parameter, requested destination, observed callback, response behavior, and cloud context.
