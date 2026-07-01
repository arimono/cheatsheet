## Overview
BOLA and IDOR testing checks whether an API verifies object ownership before returning or modifying data.

## Steps
- Use at least two in-scope user accounts.
- Capture normal object access requests.
- Swap object identifiers while keeping the acting user's token.
- Test read, write, delete, export, and nested object endpoints.
- Keep payloads harmless unless the rules of engagement allow modification.

## Evidence
Document the acting user, object owner, endpoint, object id, response, and impact.
