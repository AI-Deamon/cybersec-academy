# Day 18 — Reference Sheet
*Keep — cloud = rented apartment; you secure your unit.*

- **Shared responsibility:** provider = infra/hardware; you = data, IAM, config, code.
- **Misconfiguration is the leading cloud risk** (open storage, over-permissive IAM, wide SG) — more often than zero-days.
- **VPC / security groups = segmentation** at cloud scale (Day 17 idea). Misconfigured SG = open fence.
- **Secure coding in cloud:** Day 16 fixes (parameterize/encode/validate) + no hardcoded secrets (secrets manager) + least-privilege IAM.
- **Defensive security:** hardening (close ports, disable defaults, patch) + monitoring (Day 19 preview).
- **Day 12 range = D17 segmentation = D18 VPC** (one idea, scaling up).

## Further reading
- Cloud provider shared-responsibility docs. CSPM concepts. Secrets management. DevSecOps / shift-left.
- Day 19: monitoring + IR on what you found today. Day 20: capstone integrates it.
