## Overview
LAPS review checks whether local administrator passwords are protected and whether read permissions are over-delegated.

## Steps
- Identify computers managed by LAPS.
- Review who can read password attributes.
- Test read access with the lowest-risk account.
- Confirm expiration and rotation behavior.
- Recommend reducing delegated read rights.

## Evidence
Capture computer object, delegated principal, attribute access, and affected administrative boundary.
