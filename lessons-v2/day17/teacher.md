# Day 17 — AWS Services Reference (Security Lens)

**What this is:** a reference for the AWS services on the architecture diagram you're working
from, scoped to the ones that matter for today's cloud-security section — identity, the public
request path, and monitoring/logging. It does **not** cover compute, databases, CI/CD, AI, or
data-analytics services from that diagram; those aren't part of this course.

**How to use it:** optional background / your own reference, not a new slide or handout. Today's
actual teaching surface is still `day17.md` + `teacher-notes.md` (shared responsibility, the two
classic cloud failures, the `bad-policy.json` / `bad-bucket-policy.json` DO). This file exists so
you can answer a curious student's "wait, what's the difference between WAF and Shield?" without
improvising.

Each entry: **what it is → a plain example → the misconfiguration/attack scenario → the fix** —
same offense-then-defense pattern as the rest of the course.

---

## The request path (what the diagram's arrows trace)

```
Internet → Route 53 (DNS) → WAF + Shield (edge filtering) → Load Balancer / API Gateway
         → your app (EC2 / ECS / Lambda) → CloudFront (CDN) → S3 (storage)
```

Every hop is either a **control** (it can stop an attacker) or an **attack surface** (it can be
the thing that's misconfigured). The diagram's red box around "Cloud Network Management"
(VPC / VPN / Private Link) is pointing at the same idea Day 3 taught with NAT and private IPs:
that boundary is what decides whether a resource is reachable from the open internet at all,
before any identity or application-layer control even runs.

---

## A. Identity & Access

### IAM (Identity and Access Management)
- **What:** the policy engine — users, roles, and the JSON policies that say who can do what to
  which resource.
- **Example:** an EC2 instance assumes a role that allows `s3:GetObject` on one bucket, nothing
  else.
- **Scenario:** a role with `"Action": "*"`, `"Resource": "*"`, combined with an SSRF bug that
  reaches the instance metadata service (`169.254.169.254`) — this is exactly the chain in
  `archify/01-ssrf-metadata-creds.sequence.html`. The role's privilege level *is* the blast
  radius.
- **Fix:** least privilege, no wildcard actions/resources, permission boundaries, IAM Access
  Analyzer to catch over-grants before an attacker does.

### IAM Identity Center (AWS SSO)
- **What:** single sign-on for *human users* across one or many AWS accounts — usually federated
  with an external identity provider (Okta, Entra ID) — replacing individual long-lived IAM
  users.
- **Example:** your team logs into AWS through the company SSO portal instead of each person
  having an IAM username/password.
- **Scenario:** a phished SSO session doesn't just compromise one account — it compromises
  every AWS account and permission set that identity is federated into at once. The blast
  radius question changes from "one account" to "every account this identity touches."
- **Fix:** MFA enforced at the identity provider, short session duration, conditional-access
  policies, permission sets scoped tightly per account.

### Cognito
- **What:** identity for *your app's end users* (sign-up/sign-in, not AWS console access);
  issues JWTs and — via Identity Pools — can hand out temporary AWS credentials directly to a
  client app.
- **Example:** a mobile app's users log in through Cognito and get a short-lived credential that
  lets them upload their own photo directly to S3.
- **Scenario:** an Identity Pool with "unauthenticated identities" enabled, paired with an
  over-permissive IAM role attached to that pool — now *anyone who loads the app*, logged in or
  not, gets real temporary AWS credentials. This is a recurring real-world bug-bounty finding.
- **Fix:** disable unauthenticated identities unless genuinely needed, scope the attached role to
  exactly what an anonymous or logged-in client should touch, nothing more.

---

## B. Network & Edge (the request path)

### VPC (Virtual Private Cloud)
- **What:** your private network inside AWS — subnets, route tables, security groups, network
  ACLs.
- **Example:** app servers sit in a private subnet with no public IP; only the load balancer
  lives in the public subnet.
- **Scenario:** a security group open to `0.0.0.0/0` on an admin port (SSH/RDP, or worse, all
  ports) — mass internet scanners find and start brute-forcing it within minutes of going live.
- **Fix:** security groups scoped to known IPs or other security groups, no `0.0.0.0/0` on
  admin ports, use a bastion or SSM Session Manager instead of an open SSH port.

### VPN (Site-to-Site / Client VPN)
- **What:** an encrypted tunnel connecting an on-prem network or a remote user into the VPC.
- **Example:** the office connects to the VPC over an IPsec tunnel instead of exposing internal
  tools to the public internet.
- **Scenario:** a phished VPN credential puts the attacker "inside" the VPC's trust boundary just
  like an on-site employee — same point as this file's FAQ in `teacher-notes.md`: a VPN encrypts
  the link and checks the credential, it doesn't vet the device or the user's intent.
- **Fix:** MFA on VPN auth, device posture checks, treat "inside the VPN" as zero-trust territory
  — not an implicitly safe zone.

### PrivateLink
- **What:** lets a VPC reach an AWS service, or another VPC's service, without the traffic ever
  crossing the public internet — it rides AWS's own network via an ENI.
- **Example:** your app calls a vendor's API running in a different VPC over PrivateLink instead
  of over the public internet.
- **Scenario:** without it, that same call either needs a public route (bigger attack surface) or
  an open security-group rule to the internet.
- **Fix:** prefer VPC endpoints / PrivateLink for AWS-service traffic (S3, DynamoDB, Secrets
  Manager) so it never needs a public route or a NAT gateway at all.

### Route 53
- **What:** AWS's DNS service; also does health checks and traffic routing.
- **Example:** `api.yourapp.com` resolves through Route 53 to your load balancer.
- **Scenario:** an attacker who gets `route53:*` on a compromised IAM credential repoints your
  domain to their own server — a DNS hijack that works even if every app server behind it is
  perfectly secure.
- **Fix:** least-privilege + MFA on anything with Route 53 write access, DNSSEC, a registrar
  lock.

### WAF (Web Application Firewall)
- **What:** a layer-7 filter in front of CloudFront, the load balancer, or API Gateway; rules
  block known-bad patterns like SQLi/XSS payloads (direct callback to Day 16).
- **Example:** a managed rule blocks `' OR 1=1--` before it ever reaches the app.
- **Scenario:** same line as Day 16's recap — **a WAF is a layer, not a fix.** A novel encoding
  or an unmatched payload sails past the signature and still hits a genuinely vulnerable app.
- **Fix:** WAF reduces noise and buys time; the real fix is still parameterized queries and
  output encoding in the app itself.

### Shield
- **What:** DDoS protection. Standard is free and automatic on every account; Advanced is paid,
  with a 24/7 response team and cost protection against attack-driven scaling bills.
- **Example:** a volumetric flood against your load balancer is absorbed before it reaches your
  instances.
- **Scenario:** Shield protects *availability*, not *misconfiguration* — a public S3 bucket is
  still public with Shield fully active. Don't confuse "DDoS-protected" with "secure."
- **Fix:** Shield is one layer of the Attack ↔ Defence table, not the whole table — pair it with
  WAF and the actual access controls on the resource.

### Certificate Manager (ACM)
- **What:** issues and auto-renews free TLS certificates for AWS resources (CloudFront, load
  balancers, API Gateway).
- **Example:** your load balancer terminates HTTPS with an ACM certificate that renews itself
  with no manual step.
- **Scenario:** this is the Day 5 TLS/certificate-chain lesson, automated — ACM is AWS acting as
  (or brokering) the CA step for you.
- **Fix/note:** it's a defensive control, not an attack surface by itself; the risk sits one
  layer up, in whoever controls DNS validation for the domain.

### Load Balancer (ALB / NLB)
- **What:** distributes traffic across instances or containers. ALB is layer-7 (path/host
  routing); NLB is layer-4 (raw TCP/UDP, extreme throughput).
- **Example:** the ALB routes `/api/*` to one target group and `/static/*` to another.
- **Scenario:** an internal-only path (`/actuator`, `/debug`, an admin console) left reachable on
  the public listener because no one scoped the listener rules — now it's reachable by anyone on
  the internet who finds the URL.
- **Fix:** scope listener rules and target groups deliberately; admin/debug endpoints should
  never be on the public listener at all.

### API Gateway
- **What:** the managed front door for an API (REST/HTTP/WebSocket) — handles auth, throttling,
  and request validation before the request reaches your backend, often Lambda.
- **Example:** API Gateway validates a JWT and rate-limits a request before it invokes a Lambda
  function.
- **Scenario:** a stage with no authorizer configured, or a resource policy left wide open —
  every route becomes callable by anyone, bypassing whatever auth the Lambda behind it assumed
  was already enforced upstream.
- **Fix:** an explicit authorizer on every route, a resource policy scoped to expected callers —
  never assume "it's behind API Gateway" means "it's authenticated."

### CloudFront
- **What:** AWS's CDN — caches and serves content from edge locations close to users; can front
  S3, a load balancer, or any origin.
- **Example:** CloudFront serves a static site out of S3 with low latency worldwide.
- **Scenario:** an S3 origin without Origin Access Control (OAC) still has its own, separate
  bucket policy — if that policy is public, anyone can hit the bucket **directly**, skipping
  CloudFront's caching, WAF rules, and geo-restrictions entirely. This is one of the most common
  real-world cloud misconfigurations.
- **Fix:** Origin Access Control + a bucket policy that allows *only* the CloudFront
  distribution; block all other public access on the bucket itself.

---

## C. Monitoring & Logging

### CloudWatch
- **What:** metrics, logs, and alarms.
- **Example:** an alarm fires when a specific error string spikes in the app logs, or CPU stays
  above 90% for five minutes.
- **Scenario:** a credential-stuffing attack produces a spike in `401`/`403` responses on the
  load balancer — invisible unless someone built an alarm for exactly that. "No alarm" is a
  decision, not an absence.
- **Fix:** alarm on auth-failure spikes, unusual API call volume, and any root-account activity.

### CloudTrail
- **What:** an audit log of every API call made in the account — who, what, when, from where.
- **Example:** CloudTrail shows exactly which role called `iam:CreateAccessKey`, at 3am, from an
  unfamiliar IP.
- **Scenario:** this is literally step one of real AWS incident response — "pull CloudTrail" —
  and also step one many attackers try first: `cloudtrail:StopLogging` /
  `cloudtrail:DeleteTrail`. Disabled or deletable logging means the breach leaves no record.
- **Fix:** enable org-wide, turn on log file validation, ship logs to a separate account/bucket
  the compromised role can't reach, and alarm on `StopLogging`/`DeleteTrail` itself.

### AWS Config
- **What:** continuously records resource configuration and evaluates it against rules — e.g.
  "is any S3 bucket public," "is any security group open to `0.0.0.0/0`."
- **Example:** a Config rule flags the moment an engineer flips a bucket to public, before anyone
  outside the company finds it.
- **Scenario:** this is the automated, always-on version of today's `bad-policy.json` /
  `bad-bucket-policy.json` exercise — the difference between catching the mistake at 2am and
  reading about it in a breach report.
- **Fix/note:** worth naming explicitly when you run that DO — "a real team doesn't review this
  by hand once; Config does it continuously."

### X-Ray
- **What:** distributed tracing across microservices — shows the path one request took, which
  service it touched, how long each hop spent, and where it failed.
- **Example:** a trace shows a slow checkout request spent 4 of its 5 seconds waiting on a
  downstream payment service.
- **Scenario:** mostly a performance/debugging tool — the security angle is minor: an unexpected
  service showing up in a trace can be a sign of a compromised component calling somewhere it
  shouldn't.
- **Fix/note:** lowest-priority item on this page — good to know it exists, not core to today's
  lesson.

---

## D. Storage endpoint

### S3
Already fully covered in `teacher-notes.md`'s `bad-bucket-policy.json` answer key — see that
file rather than duplicating it here. One line for this diagram's context: S3 is almost always
the *last* hop in the request path above, which is exactly why the CloudFront-OAC scenario
matters — the CDN in front of it can be flawless and the bucket behind it still wide open.

---

## One scenario across every hop

Use this as a talking-point table if a student asks "so which one actually stops an attacker?" —
no single service does; each hop either narrows or widens the blast radius of the one before it.

| Hop | Control | What an attacker tries | What stops them / what fails if misconfigured |
|---|---|---|---|
| DNS | Route 53 | hijack the domain via a leaked/over-privileged credential | least-privilege + MFA on Route 53 write access |
| Edge | WAF + Shield | SQLi/XSS payload, volumetric flood | WAF blocks known patterns (not novel ones); Shield absorbs volume (not misconfig) |
| Perimeter | VPC security groups | scan for an open admin port | security groups scoped to known sources, no `0.0.0.0/0` on admin ports |
| App entry | Load Balancer / API Gateway | reach an internal-only path or unauthenticated route | listener rules scoped; explicit authorizer on every route |
| App → cloud | IAM (via SSRF → IMDS) | steal the instance's temporary credentials | least-privilege role + IMDSv2 — see today's `01-ssrf-metadata-creds` diagram |
| CDN → origin | CloudFront → S3 | bypass the CDN and hit the bucket directly | Origin Access Control + a bucket policy scoped to the distribution only |
| After the fact | CloudTrail + Config + CloudWatch | disable logging, or just go unnoticed | org-wide CloudTrail, Config rules, alarms on the right signals |

The through-line is the same one from today's recap: **least privilege + segmentation +
monitoring**, now walked hop-by-hop instead of as three bullet points.
