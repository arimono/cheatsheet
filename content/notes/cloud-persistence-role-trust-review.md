## Overview
Role trust persistence review checks whether cloud role trust policies create durable cross-account or external access paths.

## Steps
- Confirm role trust review is in scope.
- List roles with external, federated, or cross-account principals.
- Check recently modified assume-role policies.
- Review conditions such as external id, source account, and MFA requirements.
- Document risky trust paths and least-privilege changes.

## Evidence
Record role name, trusted principal, conditions, modification event, reachable permissions, and remediation status.
