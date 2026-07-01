## Overview
API key persistence review checks whether long-lived keys remain valid beyond their intended owner, scope, or lifecycle.

## Steps
- Confirm API key review is in scope.
- Inventory active keys, scopes, owners, and creation dates.
- Check rotation, expiration, and revocation behavior.
- Validate whether keys survive logout, password reset, or account disablement.
- Document replay window and least-privilege remediation.

## Evidence
Record key id, owner, scope, creation time, last used time, revocation event, replay result, and affected endpoint.
