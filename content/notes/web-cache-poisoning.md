## Overview
Web cache poisoning checks whether unkeyed inputs can alter cached responses served to other users.

## Steps
- Confirm cache testing is authorized.
- Identify cache indicators and keys.
- Use harmless markers in headers and query values.
- Avoid poisoning shared production caches.
- Validate hit and miss behavior carefully.

## Evidence
Record cache headers, unkeyed input, poisoned response marker, and affected audience.
