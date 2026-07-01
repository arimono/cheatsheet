## Overview
Web server cron persistence review checks whether scheduled jobs on web hosts can maintain server-side execution.

## Steps
- Confirm server persistence review is authorized.
- List user, system, and application scheduled jobs.
- Check jobs that execute from web roots, upload paths, or temporary directories.
- Correlate job creation time with deployment and test windows.
- Document safe cleanup and scheduler monitoring.

## Evidence
Record host, job owner, schedule, command, script path, timestamp, and cleanup decision.
