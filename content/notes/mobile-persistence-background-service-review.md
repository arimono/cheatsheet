## Overview
Background service persistence review checks whether mobile apps can run sensitive behavior after boot or in the background.

## Steps
- Identify services, receivers, and boot handlers.
- Review WorkManager, JobScheduler, and foreground services.
- Validate whether background behavior needs user consent.
- Test lifecycle behavior in a controlled device.
- Document platform control and abuse case.

## Evidence
Record component name, trigger, permission, observed behavior, and user visibility.
