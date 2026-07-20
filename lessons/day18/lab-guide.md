# Day 18 — Lab Guide
**Goal:** Inside your Day 12 range, (1) find a misconfiguration in the lab container and map it to a CIA break + fix, and (2) apply a Day 16 secure-coding fix in a cloud/production context (parameterize / encode / no hardcoded secret / least-privilege IAM). No real cloud accounts; the lab container simulates the cloud workload.

**Prerequisites:** Your safe range with the lab container running (ADD tool list). **Only inspect/modify the range's container.**

---

## Task 1 — Shared responsibility (written, 3 min)
In one sentence: what does the cloud provider secure, and what do you secure? (Provider: infra/hardware. You: data, IAM, config, code.)

## Task 2 — Find the misconfiguration (in-range) (10 min)
Inspect the lab container's config. Find ONE misconfig, for example:
- A security group / firewall rule open to `0.0.0.0/0` on an admin port (22/3389), or
- A world-readable volume / "public" storage, or
- A hardcoded credential in the app config.
For what you find, write:
- The **CIA letter** it breaks (e.g., open port → A/I; public data → C).
- The **fix** (restrict CIDR to the range, tighten IAM, encrypt/remove public access).

## Task 3 — Secure coding in the cloud (8 min)
In the containerized app snippet, apply Day 16's fixes:
- Replace any string-built query with a **parameterized** one.
- Move any **hardcoded secret** to a secrets-manager reference (note it; don't need a real vault).
- Note **least-privilege IAM**: the app should use a narrow role, not admin.

---

## ✅ Checkpoint (show instructor before leaving)
- [ ] Stated the shared-responsibility split
- [ ] Found a misconfig + mapped CIA + fix
- [ ] Applied a Day 16 secure-coding fix in cloud context (parameterize / no hardcoded secret / least-priv IAM)

## Troubleshooting
- *Can't find the misconfig:* ask the instructor which file/rule is intentionally weak in your image — it's there by design.
- *Secret manager unavailable:* note the *principle* (externalize secrets) and where it would live; don't hardcode.
- *Wrong target:* inspect only your range container. Never touch external cloud accounts (Day 12 scope).

> ⚠️ **Ethics + scope (Day 1/12):** inspect/modify **only your range's container**. The misconfig hunt is a learning exercise on authorized lab infra — not a license to scan real cloud accounts.
