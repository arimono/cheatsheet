## Overview
S3 public exposure review checks whether buckets or objects are readable, writable, or listable beyond the intended audience.

## Steps
- Confirm the target AWS account and bucket are in scope.
- Review public access block configuration.
- Review bucket policy and ACL exposure.
- Attempt anonymous access only when explicitly allowed.

## Evidence
Capture bucket name, policy statement, object path, and proof of access level.
