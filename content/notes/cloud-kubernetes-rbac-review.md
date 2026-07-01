## Overview
Kubernetes RBAC review checks whether identities can read secrets, exec into pods, create workloads, or cross namespace boundaries.

## Steps
- Confirm cluster context and namespace.
- List effective permissions.
- Review role bindings and cluster role bindings.
- Check secret read, pod exec, and workload creation rights.
- Document privilege escalation paths.

## Evidence
Capture identity, namespace, allowed verb, resource, and escalation path.
