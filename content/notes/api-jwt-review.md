## Overview
JWT review checks whether API tokens are validated correctly and cannot be forged, replayed, or accepted outside their intended scope.

## Steps
- Decode the token header and claims.
- Check `alg`, `kid`, `iss`, `aud`, `exp`, and role claims.
- Test expired, modified, and missing-signature tokens only inside scope.
- Confirm server-side authorization, not just client-side claim display.

## Evidence
Save the original token metadata, modified claim, response code, and affected endpoint.
