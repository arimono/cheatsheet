## Overview
APK static analysis inspects application code, resources, manifest configuration, and packaged secrets before runtime testing.

## Steps
- Decompile resources with apktool.
- Decompile source with jadx.
- Search for endpoints, keys, tokens, hardcoded credentials, and Firebase configuration.
- Review exported activities, services, receivers, and permissions.

## Evidence
Capture file path, code reference, package name, and why the value or component matters.
