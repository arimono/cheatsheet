## Overview
Cloud metadata service review checks whether a workload can reach provider metadata endpoints and expose instance identity or credentials.

## Steps
- Confirm the workload and cloud provider are in scope.
- Test metadata reachability using provider-specific headers or tokens.
- Avoid retrieving credentials unless explicitly authorized.
- Check SSRF paths that may reach metadata from an application.
- Recommend IMDSv2, hop limits, firewalling, or workload identity controls.

## Evidence
Record reachable metadata path, request headers, workload context, and defensive control gaps.
