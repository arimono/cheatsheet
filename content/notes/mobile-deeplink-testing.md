## Overview
Deep link testing checks whether external intents can open privileged screens, leak tokens, or bypass expected authentication.

## Steps
- Extract schemes, hosts, and paths from the manifest.
- Launch each link with safe test values.
- Try authenticated and unauthenticated app states.
- Check for redirects, token disclosure, and authorization bypass.

## Evidence
Record URI, activity, user state, expected behavior, and actual behavior.
