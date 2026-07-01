## Overview
Clickjacking testing checks whether sensitive workflows can be framed and trick users into unintended actions.

## Steps
- Identify sensitive authenticated actions.
- Check `X-Frame-Options` and CSP `frame-ancestors`.
- Build a harmless framing proof of concept.
- Assess whether impact requires user interaction.
- Document affected browser and workflow.

## Evidence
Capture target URL, frame behavior, missing control, and affected action.
