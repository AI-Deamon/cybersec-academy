# Day 18 — Quiz (exit, 4 questions)
*Formative only — reinforces, doesn't punish.*

1. **In the shared responsibility model, the customer is responsible for:**
   a) The datacenter physical security
   b) Their data, IAM, configurations, and code
   c) The hypervisor
   d) The provider's network hardware
   **Answer: b**

2. **The #1 cause of cloud breaches is usually:**
   a) Zero-day exploits
   b) Misconfiguration (open storage, over-permissive IAM, wide-open security groups)
   c) Weak passwords only
   d) The provider's hardware failure
   **Answer: b**

3. **A cloud security group that is "open to 0.0.0.0/0" on an admin port primarily breaks:**
   a) Confidentiality of the provider
   b) Availability / Integrity (A/I) of your workload
   c) The hypervisor
   d) Nothing — that's normal
   **Answer: b**

4. **Defensive security (the defender's job) includes:**
   a) Only buying a firewall
   b) Hardening, patching, least privilege, AND monitoring
   c) Ignoring logs
   d) Disabling alerts
   **Answer: b**

---

## Optional extension (discussion)
5. Why does "it's in the cloud, so it's secure" fail?
   **Model answer:** The provider secures its infrastructure, but your data, IAM, network config, and code are your responsibility. A misconfigured bucket or security group is your breach — the lock was fine, the door was open.
