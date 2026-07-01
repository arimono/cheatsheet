## Overview
NFS enumeration discovers exported file systems and checks whether they expose sensitive files or unsafe mount options.

## Steps
- List exports from scoped hosts.
- Mount read-only when possible.
- Check permissions and ownership mappings.
- Look for secrets, backups, and deployment artifacts.
- Avoid write tests unless approved.

## Evidence
Capture export path, mount options, access level, sensitive file path, and business impact.
