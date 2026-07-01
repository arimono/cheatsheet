## Overview
IAM privilege review maps what the current cloud principal can do and where privilege escalation or lateral movement may exist.

## Steps
- Identify the active principal.
- Collect attached and inline policies.
- Check role trust policies and assume-role paths.
- Simulate sensitive permissions before attempting risky actions.

## Evidence
Document principal ARN, policy source, allowed action, target resource, and recommended least-privilege change.
