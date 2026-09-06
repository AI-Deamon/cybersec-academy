---
marp: true
theme: dark-monospace
paginate: true
title: "Day 5 — Cryptography: Locks, Seals, and Signatures"
footer: "Practical Cyber Security (v2) · Week 1 · Day 5"
---

<!-- _class: lead -->

# Cryptography
## Day 5 — Locks, seals, and signatures (and you crack a real hash)

**Week 1 · Building the foundation · + Week 1 assignment brief**

<!--
RUN SHEET (~85 min). Hands-on INTERLEAVED. Assignment brief is the last block.
00:00 Journey check + hook (crack a hash on the projector)     4
00:04 What crypto is for — three jobs                          4
00:08 Job 1: encryption / symmetric                            6
00:14 Asymmetric / public key — solves key exchange            8
00:22 DO: inspect a real certificate                           4
00:26 Job 2: hashing — one-way, tamper-evident                 8
00:34 DO: sha256 a file, flip one byte                         4
00:38 Password storage done right (the trap)                   7
00:45 DO: crack hashes with a wordlist                        10
00:55 Job 3: signatures + the TLS handshake in 4 steps         6
01:01 Attack <-> defence + "don't roll your own"               5
01:06 Wrap + artifact (the 5-primitives table)                 3
01:09 WEEK 1 ASSIGNMENT BRIEF                                  16
CUT FIRST IF SHORT: the cert "do it now" (show one on the projector instead); the sha256 flip
(describe it); the signatures detail (keep "private signs, public verifies, a cert is a CA's
signature on a name").
NEVER CUT: hash != encryption; salt + slow hash for passwords; the crack "do it now";
the assignment brief.
ANALOGY (sanctioned extension of the postal system): locks and seals on the mail.
symmetric = a box with one key both sides copied · asymmetric = a padlock anyone can snap
shut but only the owner's key opens · hash = a tamper-evident wax seal · signature = a signet-ring stamp.
-->

---

## Where we are

- **Day 4:** the padlock locks the pipe (TLS).
- **Today:** how the lock actually works — encryption, hashing, signatures — and **you crack a
  real password hash.**
- **Friday brief:** your Week 1 weekend assignment (last 15 min).
- **Monday:** Week 2 — inside the operating system.

<!--
Learning Journey Check. Flag the assignment brief is coming at the end.
-->

---

## Hook — turning a hash back into a password

On the projector: a line like

```
5f4dcc3b5aa765d61d8327deb882cf99
```

That's how a decent website stores a password. Watch.

`python3 crack.py 5f4dcc3b5aa765d61d8327deb882cf99 wordlist.txt` → **`password`**

<!--
~1 minute. Run crack.py against an unsalted MD5 of "password". It falls instantly.
SAY: "if the site did it properly this would have taken years, not a second. Today you learn
the difference — and you do this yourself in 40 minutes."
Full student crack session is the "do it now" later; this is just the teaser.
-->

---

## What cryptography is *for* — three jobs

| Job | Question it answers | Tool |
|---|---|---|
| **Secrecy** | can anyone else read this? | encryption |
| **Tamper-evidence** | has this been changed? | hashing |
| **Identity** | who really sent / owns this? | signatures & certificates |

You **compose** these building blocks. **You never invent your own** — that's rule one.

<!--
Every secure system is some mix of these three. TLS (Day 4) uses all three at once.
"Don't roll your own crypto" — we'll come back to why at the end. Say it now so it sinks in.
-->

---

## Job 1 — Encryption (secrecy)

**plaintext  +  key  →  ciphertext**  (and back, with the key)

**Symmetric:** one key, shared by both sides. Fast. Used for the actual data.

The problem: **how do both sides get the same key** without an eavesdropper seeing it?

<!--
Analogy: a lockbox both sides have a copy of the key to. Great — but how did the second person
get a copy of the key without it being intercepted? That's THE problem asymmetric crypto solves.
AES is the symmetric cipher to name (don't teach internals).
-->

---

## Asymmetric (public-key) — solving key exchange

Two keys, mathematically linked:

- **public key** — share it with everyone. Locks things *to* you.
- **private key** — never shared. The only thing that unlocks them.

Anyone can encrypt *to* you; only you can read it. **No shared secret needed up front.**

It's slow — so in practice it's used only to **agree a symmetric key**, then switch to fast
symmetric for the data.

<!--
Analogy: you hand out open padlocks with your name on them (public key). Anyone snaps one shut
on a box and ships it; only your key (private) opens it.
RSA and ECDH/Elliptic-curve are the names. The "agree a symmetric key then switch" is exactly
the TLS handshake — callback at the signatures slide.
-->

---

## Do it now — look inside a certificate

Browser → click the **padlock** → "Connection secure" → **certificate details**.

Find:
- **Issued to** (the domain) and **Issued by** (the Certificate Authority)
- **Valid from / to** dates
- the **public key** and algorithm
- the **chain**: this cert ← an intermediate ← a **root CA** your browser trusts

<!--
3-4 min. Chrome: padlock -> Connection is secure -> Certificate is valid. Firefox similar.
The chain is the point: your browser ships with ~150 trusted root CAs; everything descends
from one of those by signatures. Forward-ref: if a school proxy is intercepting TLS, the
issuer here will be the proxy, not a public CA — real "who do you trust" example.
-->

---

## Job 2 — Hashing (tamper-evidence)

A hash function: **any input → a fixed-size fingerprint**, e.g. SHA-256 → 64 hex chars.

- **One-way** — you cannot get the input back from the hash.
- **Deterministic** — same input, same hash, every time.
- **Avalanche** — change one bit of input, ~half the output bits flip.
- **No key** — this is *not* encryption.

Uses: file integrity, "has this changed?", and password storage (next slide).

<!--
The "no key, can't reverse" point is the one students miss. Encryption is a locked box you can
open with the key. A hash is a paper shredder — deterministic, but there's no un-shredder.
SHA-256 good; MD5 and SHA-1 are broken (collisions) — name them as "don't use".
-->

---

## Do it now — the avalanche

```
echo "attack at dawn" > msg.txt ;  sha256sum msg.txt
echo "attack at dusk" > msg.txt ;  sha256sum msg.txt
```

(Windows: `Get-FileHash msg.txt`)

One letter changed. The entire hash is different — no resemblance. That's how a download page
knows your file wasn't tampered with.

<!--
2-3 min. Point at the two hashes side by side: not "a bit different" — completely different.
This is why a hash is a good tamper detector.
-->

---

## Password storage — done right (the trap)

**Wrong:** store the password. **Also wrong:** "encrypt" it — encryption is reversible, and
the key is right there on the server.

**Right:** store `slow_hash(password + unique_salt)`.

- **salt** — random, per-user, stored alongside. Stops one cracked hash cracking everyone's,
  and kills precomputed ("rainbow") tables.
- **slow** — bcrypt / scrypt / Argon2: deliberately takes ~0.25 s. You log in once; an
  attacker needs billions of guesses.

<!--
THE DAY 5 TRAP: "we encrypt the passwords." No — you HASH them, salted and slow. If you can
email a user their forgotten password, you're doing it wrong.
Fast hash (MD5/SHA-256 alone) of a password = crackable at billions/sec on a GPU. Slow hash
= thousands/sec. That factor is the whole game.
-->

---

## Do it now — crack some hashes

`crack.py` tries every word in a list against a hash.

```
python3 crack.py <hash> wordlist.txt
```

1. Crack the three **unsalted MD5** hashes in `hashes.txt` — seconds each.
2. One MD5 in the file **won't** crack — it's not in the wordlist. (Real lists have a billion words.)
3. Now start the **slow (pbkdf2) hash**. Let it grind in the background. It runs the whole list
   and finds *nothing*. *That's the point.*

*No Python yet? Follow on the projector, or run it on the class Kali.*

<!--
10 min. hashes.txt: MD5 of "password"/"iloveyou"/"qwerty123" (all in wordlist.txt), one MD5
NOT in the list, and one pbkdf2 (salted, 600k iters) that also isn't crackable here.
Start the pbkdf2 run, then talk over it for ~2 min; it ends with "not found".
crack.py is pure stdlib -- works anywhere Python 3 is installed (proper Python setup is Day 9).
Real tools (hashcat / john + rockyou) are on the class Kali for the keen -- don't teach flags today.
-->

---

## Job 3 — Signatures, and the TLS handshake

**Signature:** you *sign* with your **private** key; anyone verifies with your **public** key.
Proves **origin** (only you could sign) and **integrity** (any change breaks it).

A **certificate** = a Certificate Authority's *signature* on the statement
*"this public key belongs to `example.com`."*

**TLS handshake, 4 steps:** ① hello ② server sends its **certificate** ③ both sides use
asymmetric to **agree a symmetric key** ④ switch to fast symmetric encryption for the data.

<!--
This ties the whole day together: asymmetric (step 3) + certificate/signature (step 2) +
symmetric (step 4) + and TLS also hashes each record for integrity. All three jobs, one protocol.
-->

---

## Attack ↔ Defence

| Attack | Defence |
|---|---|
| **Offline hash cracking** (stole the DB, guess at billions/sec) | salt + **slow** hash (bcrypt/Argon2) |
| **Rainbow tables** (precomputed hash→password) | per-user salt makes them useless |
| **Weak/old crypto** (MD5, SHA-1, DES, RC4) | modern algorithms; keep libraries updated |
| **Forged / stolen certificate** | CA vetting, Certificate Transparency logs, HSTS, pinning |
| **You wrote your own cipher** | **don't** — use vetted libraries (libsodium, the platform TLS) |

<!--
"Don't roll your own crypto": every home-made cipher in history has been broken, usually fast.
The algorithms are public and battle-tested; the danger is in implementation. Use the library.
-->

---

## Today's attack / defence / artifact

- **Attack:** steal a password database and crack the weakly-stored hashes offline.
- **Defence:** salt + slow hash; modern ciphers; trust certificates, not vibes; never DIY crypto.
- **Artifact:** a table — the **5 primitives**, what each is for, one real use:
  symmetric encryption · asymmetric encryption · hash · salted-slow-hash (passwords) · signature/certificate.

<!--
Three lines into the repo. The 5-primitives table is the keeper.
-->

---

<!-- _class: lead -->

# Week 1 — Weekend Assignment brief

*(full spec in your student pack)*

---

## The assignment — 4 parts

- **A — Integrate:** the **7-step story** of logging into a website, keypress → TLS, in your
  own words (Days 1–5). A diagram helps.
- **B — R&D stretch:** *pick one* — explain **DNS-over-HTTPS** (what it fixes, one
  controversy), **or** find **one real CVE** in a DNS server or TLS library and explain it in
  3–4 sentences.
- **C — Hands-on evidence:** screenshots — your IP/MAC/gateway; a `ping` + `traceroute`; one
  request in DevTools → Network (credentials blurred).
- **D — Reflection:** 3–4 sentences — what clicked, what's still fuzzy.

**Submit one PDF before Monday.** Marking checklist is in the student pack.

<!--
Walk each part for ~3 min. Part A = tonight's homework, expanded. Part B is where strong
students stretch. Emphasise: your own words, blur credentials, one PDF.
Take questions. Then dismiss with the recap.
-->

---

<!-- _class: lead -->

## Recap

1. **Three jobs:** encryption = secrecy · hashing = tamper-evidence · signatures = identity.
2. **A hash is not encryption** — one-way, no key. Passwords are **salted + slow-hashed**, never encrypted.
3. **Don't roll your own crypto.** Compose vetted primitives.

<!--
Say the three lines. Monday: Week 2 opens the operating system — the layer that decides
"who can do what" on a machine.
-->
