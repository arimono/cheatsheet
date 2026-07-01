## Overview
DCSync review checks whether a principal has replication privileges that could allow domain credential extraction.

## Steps
- Confirm post-exploitation actions are allowed.
- Identify replication rights on the domain root.
- Determine whether rights are direct, inherited, or group-based.
- Avoid dumping secrets unless the rules explicitly allow it.
- Recommend removing unnecessary replication permissions.

## Evidence
Capture principal, privilege path, affected domain object, and safest proof of capability.
