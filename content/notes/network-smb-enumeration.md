## Overview
SMB enumeration identifies shares, users, host metadata, and writable paths on Windows or Samba hosts.

## Steps
- Check whether anonymous share listing is allowed.
- Enumerate with scoped credentials when available.
- Review share permissions before downloading files.
- Look for credential material, backups, scripts, and deployment files.
- Link exposed credentials to AD and Web follow-up notes.

## Evidence
Record host, share name, access level, file path, and why the exposure matters.
