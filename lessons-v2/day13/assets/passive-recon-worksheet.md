# Passive recon worksheet — <domain>

*Passive only. No `nmap`, no logins, no active probing. Instructor gives you the domain.*

## DNS
```
dig <domain> A        -> _______________________________________
dig <domain> MX       -> _______________________________________
dig <domain> NS       -> _______________________________________
dig <domain> TXT      -> _______________________________________  (SPF? verification records?)
```
Cloud / hosting provider guessed from the above: __________________

## Subdomains (Certificate Transparency)
crt.sh/?q=<domain>  — list what you find:
- _______________________________________________
- _______________________________________________
- _______________________________________________
Any that look internal / interesting (vpn, dev, jira, admin, staging)? ____________

## Tech stack
```
curl -sI https://<domain>            -> Server / X-Powered-By headers: ________________
curl -s https://<domain> | grep -i -E "generator|powered by|wp-content|/_next/|drupal"
```
Framework / CMS guess: ___________________________________________

## Exposure
- `https://<domain>/robots.txt` — disallowed paths of interest: ____________________
- Google dork `site:<domain> filetype:pdf` (or `inurl:admin`) — anything? ___________
- (If taught) Shodan `hostname:<domain>` — exposed services: ______________________

## 5-line target profile (copy into the Engagement Journal, Phase 2)
1. ________________________________________________________________
2. ________________________________________________________________
3. ________________________________________________________________
4. ________________________________________________________________
5. ________________________________________________________________
