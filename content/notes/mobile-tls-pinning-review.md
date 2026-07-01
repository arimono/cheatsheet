## Overview
TLS pinning review checks whether mobile traffic can be inspected during authorized testing and whether sensitive APIs are protected correctly.

## Steps
- Configure the test proxy and install the CA certificate.
- Observe whether normal app traffic is visible.
- Identify pinning libraries or custom trust managers.
- Use Frida or Objection to bypass pinning only in the test environment.
- Review exposed requests for secrets, tokens, and authorization gaps.

## Evidence
Record proxy configuration, bypass method, endpoint, sensitive request, and mitigation.
