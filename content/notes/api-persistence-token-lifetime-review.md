## Overview
Long-lived token persistence review checks whether API tokens remain usable after logout, role change, or password reset.

## Steps
- Decode token metadata and expiry.
- Check refresh and rotation behavior.
- Test logout invalidation.
- Test revocation after password or role changes.
- Document replay window and compensating controls.

## Evidence
Record token type, issued time, expiry, revocation event, replay result, and affected endpoint.
