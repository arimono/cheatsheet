## Overview
GPO startup persistence review checks whether domain policy scripts or recently changed GPOs could maintain execution across domain-joined systems.

## Steps
- Confirm GPO persistence review is explicitly authorized.
- Inventory recently modified GPOs and linked OUs.
- Review startup, logon, shutdown, and logoff scripts.
- Correlate SYSVOL changes with admin activity and test windows.
- Document cleanup, ownership, and change monitoring.

## Evidence
Record GPO name, link target, script path, modification time, editor, affected hosts, and cleanup decision.
