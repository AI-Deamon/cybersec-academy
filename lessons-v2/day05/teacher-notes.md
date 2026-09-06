# Day 5 — Teacher Notes

**Teach from:** `day05.md` (deck + speaker notes).
**This file:** cut-list, background, demo runbook, checkpoint, exit check, FAQ.
**Day 5 also carries the Week 1 assignment brief** — the last ~16 minutes. Don't let the
crypto content eat that time.

---

## The analogy — locks and seals on the mail (postal extension, from §9)

Day 3 postal → Day 5 adds **how you protect what's in the mail**:

| Concept | Postal image |
|---|---|
| symmetric encryption | a lockbox both parties have a copy of the same key to |
| asymmetric / public key | you hand out open padlocks with your name on them; anyone snaps one shut, only your key opens it |
| hash | a tamper-evident wax seal — break it and everyone can tell |
| signature | your signet-ring stamp pressed into the wax — proves *you* sealed it |
| certificate | a notary's stamped statement that "this seal belongs to `example.com`" |

Callback allowed: the Day 4 "phone scrambler" = symmetric encryption. No new analogy beyond this.

---

## Must-teach vs. cut-if-short

**Never cut:**
- **Hash ≠ encryption** (one-way, no key).
- **Passwords = salt + slow hash**, never plaintext, never "encrypted" (the trap).
- The crack "do it now" (at least the fast MD5 part).
- The **assignment brief** (16 min, protected).

**Cut in this order if behind:**
1. The certificate "do it now" → show one on the projector for 60 s instead.
2. The `sha256sum` avalanche "do it now" → describe it, show two pre-made hashes on a slide.
3. Signature detail → keep only "private signs, public verifies; a certificate is a CA's
   signature binding a public key to a name."
4. The asymmetric slide's "it's slow, so only used to agree a symmetric key" nuance.

---

## Background for topics people get shaky on

### Symmetric vs asymmetric
- **Symmetric** (AES): one key, both sides. Fast (GB/s). Problem: key distribution.
- **Asymmetric** (RSA, elliptic-curve / ECDHE): keypair, mathematically linked, one public one
  private. Solves distribution — you can publish the public key. Slow (thousands of ops/s), so
  real systems use it **only to bootstrap a symmetric key**, then switch.
- "Locks *to* you": anyone encrypts with your public key; only your private key decrypts.
- "Signs *as* you": you encrypt a digest with your private key; anyone checks with your public
  key. Same maths, opposite direction.

### Hashing
- Properties: deterministic, fixed-length output, fast to compute, **infeasible to reverse**,
  **infeasible to find two inputs with the same hash** (collision resistance), avalanche.
- **MD5** (128-bit) and **SHA-1** (160-bit): collisions are practical — do not use for
  security. Fine only as non-security checksums.
- **SHA-256 / SHA-3 / BLAKE2**: current general-purpose hashes.
- A hash alone is **not** a password-storage function — it's too fast (see below).

### Password storage
- Plaintext: catastrophic.
- Encrypted (reversible): nearly as bad — the key lives on the same server; one breach = all
  passwords.
- Fast hash (MD5/SHA-256 of the password): a GPU does **billions/sec** → any common password
  falls in seconds. Salt helps against precomputation but not against targeted cracking.
- **Right answer:** a purpose-built slow KDF — **bcrypt**, **scrypt**, or **Argon2** — with a
  per-user random **salt** and a work factor tuned to ~0.1–0.5 s per hash. Now the attacker
  gets thousands/sec, not billions.
- **Pepper** (a secret added to all hashes, stored separately from the DB): optional extra.
- Rule of thumb for students: *if a site can email you your existing password, it's storing it
  wrong.*

### TLS handshake (the 4-step teaching model)
1. **ClientHello** — "here are the ciphers I support" (+ in TLS 1.3, a key share).
2. **ServerHello + Certificate** — the server picks a cipher and sends its certificate chain.
3. **Key agreement** — both sides use asymmetric maths (ECDHE) to arrive at the *same*
   symmetric key without ever sending it.
4. **Encrypted data** — everything from here is symmetric-encrypted and integrity-checked.
Real TLS 1.3 does this in one round trip; the 4 steps are the concept, not the packet count.

### Certificates & trust
- A certificate = `{public key, domain name, validity dates, issuer}` + the issuer's
  **signature** over all of it.
- Your browser/OS ships with ~100–150 **root CA** public keys it trusts implicitly.
- A site's cert is signed by an intermediate, signed by a root → the **chain**.
- **Certificate Transparency**: all issued certs are logged publicly, so a mis-issued cert for
  your domain is detectable.
- Domain-validated certs (Let's Encrypt) are free and issued in minutes — which is why "has a
  cert" ≠ "trustworthy" (Day 4 trap, reinforced).

### "Don't roll your own crypto"
The algorithms are public and heavily analysed. The failures are almost always in
*implementation* — reused nonces, bad randomness, timing side-channels, padding oracles. Use a
vetted library (libsodium/NaCl, the platform's TLS stack, `cryptography` in Python). This is a
genuine industry rule, not caution for beginners.

---

## Demo runbook

### Setup / pre-flight
1. In `assets/`, run **`python3 make_targets.py`** — regenerates `hashes.txt` so the MD5s
   match `wordlist.txt` exactly. (A generated `hashes.txt` is committed, but regenerate to be
   safe.)
2. Test: `python3 crack.py <first-hash-from-hashes.txt> wordlist.txt` → cracks instantly.
3. Test the slow one: `python3 crack.py "pbkdf2$..." wordlist.txt` → **grinds ~2 minutes**
   through all 132 words and finishes with **not found**. That duration is deliberate — you
   start it, then teach the next slide over it.
4. Record `assets/crack-demo.mp4` as a fallback.

### Student environment
- `crack.py` is **pure Python 3 stdlib** — no installs. Works anywhere Python 3 is present.
- Students **without Python yet** (Python is set up properly on Day 9): follow on the
  projector, or run it on the **shared class Kali** (one account each). Nobody is blocked.
- Real tools (`hashcat`, `john`) + `rockyou.txt` live on the class Kali for anyone who wants
  the genuine article — point keen students there, don't teach the flags today.

### The three "do it now" beats
| Beat | Command | Expected |
|---|---|---|
| certificate | browser padlock → certificate details | issuer = a public CA; a chain to a trusted root; validity dates; the public key |
| avalanche | `sha256sum msg.txt` before/after a 1-char edit (Win: `Get-FileHash`) | two totally unrelated 64-char hex strings |
| crack | `python3 crack.py <hash> wordlist.txt` | 3 MD5s crack in <0.01 s; the 4th MD5 misses (not in list); the pbkdf2 one grinds and misses |

### Failure modes
| Symptom | Fix |
|---|---|
| `python3` not found (Windows) | use `python`, or the Microsoft Store Python, or the class Kali |
| `sha256sum` not on Windows | `Get-FileHash -Algorithm SHA256 msg.txt` or `certutil -hashfile msg.txt SHA256` |
| pbkdf2 run finishes too fast / too slow on a given machine | edit `ITERS` in `make_targets.py` (÷2 or ×2) and regenerate |
| student cracked the "should miss" MD5 | they added words to the list — fine, that's the lesson about wordlist size |
| school TLS proxy | the cert "issued by" will be the proxy, not a public CA — use it as a live example of a broken trust chain |

---

## Checkpoint (by end of the crypto section)

Each student can:
- [ ] say which of encryption / hashing / signatures gives secrecy, tamper-evidence, identity
- [ ] explain why a hash is not encryption (no key, one-way)
- [ ] state how passwords should be stored (salt + slow hash) and why "encrypted" is wrong
- [ ] describe what a certificate is (a CA's signature binding a public key to a domain name)

---

## Exit check (last 2 min, before the brief)

1. A site stores passwords as `SHA-256(password)`. Why is that still bad? — *SHA-256 is fast;
   a GPU tries billions/sec, so common passwords fall quickly. Needs salt + a slow KDF.*
2. Encryption or hashing — which can you undo with the right key? — *Encryption. Hashing has
   no key and can't be undone.*
3. What does a Certificate Authority actually vouch for? — *That a particular public key
   belongs to a particular domain name — not that the site is honest or safe.*

---

## Week 1 assignment brief (last ~16 min)

Full spec + marking checklist are in `week1/student-pack.md`. Walk all four parts (~3 min
each), then take questions:

- **A — Integrate:** the 7-step login story, their own words, Days 1–5. (= tonight's homework,
  expanded and polished.)
- **B — R&D stretch:** DoH explainer **or** one real DNS/TLS CVE. This is the "learn something
  I didn't teach" part — where strong students go deep.
- **C — Hands-on evidence:** IP/MAC/gateway, ping+traceroute, one DevTools request.
  **Credentials blurred.**
- **D — Reflection:** 3–4 honest sentences.
- **One PDF, before Monday.** Late = the Week 2 material has already moved on.

Emphasise: *your own words* (Part A copied from a website scores zero), and *blur credentials*
in screenshots.

---

## FAQ

- **"If MD5 is broken why do I still see it?"** As a non-security checksum (file integrity on
  fast, trusted networks) it's fine. For anything an attacker could exploit — passwords,
  signatures, certificates — it's dead.
- **"Why not just use a huge symmetric key and skip asymmetric?"** Key size isn't the
  problem — *distribution* is. Asymmetric is how two strangers agree on a key over a wire an
  eavesdropper controls.
- **"Is quantum going to break all this?"** It threatens today's asymmetric (RSA/ECC);
  symmetric and hashes mostly just need bigger sizes. Post-quantum algorithms are being rolled
  out now. Out of scope for this course.
- **"Can I decrypt HTTPS traffic I captured?"** Not without the keys. That's the whole point.
  (A proxy you control, that both endpoints trust, can — that's how corporate TLS inspection
  and Burp Suite work; Day 16.)
- **"How do password managers help?"** They generate long random passwords (so cracking fails)
  and only autofill on the exact right domain (so phishing fails).
