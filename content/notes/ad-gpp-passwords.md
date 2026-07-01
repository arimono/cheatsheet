## Overview
Group Policy Preference password review checks SYSVOL for legacy `cpassword` values that may expose reusable domain credentials.

## Steps
- Confirm SYSVOL access is in scope.
- Search policy XML files for `cpassword`.
- Decrypt only approved findings.
- Validate whether exposed accounts still exist.
- Trace where the account has access.

## Evidence
Record SYSVOL path, policy name, exposed account, current validity, and impact.
