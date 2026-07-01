## Overview
Container image review checks images for vulnerabilities, embedded secrets, risky defaults, and supply-chain issues.

## Steps
- Confirm image and registry are in scope.
- Scan the image for vulnerabilities and secrets.
- Review image history and layers.
- Check default user and entrypoint.
- Recommend rebuild or secret rotation where needed.

## Evidence
Record image digest, package or secret finding, layer context, and exploitability.
