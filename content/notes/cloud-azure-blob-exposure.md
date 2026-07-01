## Overview
Azure Blob exposure review checks whether containers or blobs are readable beyond the intended audience.

## Steps
- Confirm tenant, subscription, storage account, and container are in scope.
- Check the public access configuration.
- List blobs with an authenticated identity.
- Test anonymous blob access only when the rules allow it.
- Compare actual access against expected data classification.

## Evidence
Capture storage account, container, blob path, access level, and proof of exposure.
