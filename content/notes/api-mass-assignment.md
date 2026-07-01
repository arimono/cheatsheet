## Overview
Mass assignment testing checks whether clients can set server-managed fields by adding unexpected properties to API requests.

## Steps
- Compare response objects with accepted request bodies.
- Identify fields such as role, status, owner, and price.
- Try harmless unauthorized field changes.
- Test create and update endpoints separately.
- Confirm whether the server persists unauthorized fields.

## Evidence
Capture endpoint, injected field, original value, resulting value, and privilege impact.
