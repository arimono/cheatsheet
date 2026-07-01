## Overview
Backup and debug flag review checks Android manifest settings that can expose app data or allow unsafe debugging behavior.

## Steps
- Decode the manifest.
- Check `debuggable`, `allowBackup`, and backup rules.
- Validate whether the build is production or test.
- Attempt backup only when approved.
- Link exposed data to local storage review.

## Evidence
Capture manifest path, flag value, build type, and recoverable data impact.
