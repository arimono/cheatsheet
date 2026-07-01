## Overview
OpenAPI specification review uses published API schemas to map endpoints, methods, models, and hidden attack surface.

## Steps
- Locate Swagger or OpenAPI documents.
- Extract paths and schemas.
- Identify undocumented admin or internal endpoints.
- Compare auth requirements across methods.
- Feed risky paths into BOLA and mass-assignment testing.

## Evidence
Record spec URL, exposed paths, sensitive models, and auth assumptions.
