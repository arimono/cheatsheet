## Overview
DNS enumeration discovers hostnames, zones, mail records, and topology clues that guide later service and web testing.

## Steps
- Identify authoritative DNS servers.
- Test zone transfer against scoped servers.
- Check recursion exposure.
- Collect hostnames and map them to services.
- Feed discovered names into web and network scanning.

## Evidence
Capture queried server, record type, exposed records, and any internal hostnames.
