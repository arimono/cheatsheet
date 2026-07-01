## Overview
CSRF testing checks whether a browser can be tricked into sending authenticated state-changing requests.

## Steps
- Identify state-changing POST, PUT, PATCH, and DELETE requests.
- Check whether CSRF tokens are required and bound to the session.
- Review SameSite cookie settings.
- Test Origin and Referer enforcement.
- Confirm whether user interaction is required.

## Evidence
Capture request, missing or reusable token, cookie attributes, and state change impact.
