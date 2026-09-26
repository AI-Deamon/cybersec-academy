# Threat model — <app name>

*Day 10 artifact. Keep it to one page. This is the seed of the Week 2 assignment.*

## 1. What are we building?

Short description + a simple diagram (ASCII is fine):

```
[ user / browser ] --(1)--> [ web app ] --(2)--> [ database ]
                                  |
                                 (3)
                                  v
                          [ 3rd-party API ]
```

**Trust boundaries** (where data goes from less-trusted to more-trusted):
- (1) internet → the app
- (2) the app → the database
- (3) the app → the 3rd party

**Assets** (what's worth protecting): _______________________________

**Likely threat actor(s) and why:** ________________________________

## 2. What can go wrong? (pick 3 components/flows; use STRIDE)

| # | Component / flow | STRIDE category | The threat, concretely |
|---|------------------|-----------------|------------------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |

STRIDE = **S**poofing · **T**ampering · **R**epudiation · **I**nfo disclosure ·
**D**enial of service · **E**levation of privilege.

## 3. What do we do about it? (one control per threat)

| # | Control | Type (preventive / detective / corrective) |
|---|---------|--------------------------------------------|
| 1 | | |
| 2 | | |
| 3 | | |

## 4. Did we do a good job?

- Biggest risk left unaddressed: __________________________________
- One thing you'd check next: _____________________________________
