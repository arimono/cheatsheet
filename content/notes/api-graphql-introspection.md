## Overview
GraphQL introspection review checks whether the schema is exposed and whether sensitive operations are discoverable.

## Steps
- Confirm the GraphQL endpoint path.
- Test a minimal introspection query.
- Export the schema for offline review.
- Identify mutations, admin operations, object identifiers, and nested relationships.
- Send risky operations to authorization testing.

## Evidence
Record endpoint, introspection response, sensitive operation names, and whether authentication was required.
