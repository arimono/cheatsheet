## Overview
Kerberoasting requests service tickets for accounts with SPNs and cracks the ticket material offline.

## Steps
- Use a scoped domain credential.
- Request service tickets from the domain controller.
- Crack hashes offline with the agreed wordlist and rules.
- Validate cracked credentials carefully and avoid lockouts.

## Evidence
Record the SPN, cracked account, privilege level, and exact business impact.
