## Overview
LDAP domain reconnaissance collects domain structure, naming contexts, and directory exposure before deeper AD enumeration.

## Steps
- Confirm LDAP hosts and ports are in scope.
- Query RootDSE for naming contexts.
- Test whether anonymous bind is allowed.
- Use scoped credentials for deeper domain metadata.
- Feed domain context into BloodHound and Kerberos checks.

## Evidence
Record domain naming context, LDAP ports, bind behavior, domain controller, and any anonymous data exposure.
