## Overview
BloodHound uses graph theory to map Active Directory relationships and find attack paths to high-value targets.

## Collection Methods
- **All**: Collects everything
- **DCOnly**: Only queries the DC, which is quieter
- **Session**: Enumerates sessions on computers
- **LoggedOn**: Uses remote registry to find logged-on users

## Analysis
Focus on:

- Shortest paths to Domain Admin
- Kerberoastable accounts with paths to DA
- Users with DCSync rights
- Computers with unconstrained delegation
