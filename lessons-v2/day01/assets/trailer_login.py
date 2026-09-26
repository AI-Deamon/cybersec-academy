#!/usr/bin/env python3
"""
Day 1 trailer-demo target: a deliberately plain-HTTP login form.

Purpose: let the instructor capture a cleartext username+password off the wire
with tcpdump/Wireshark in front of the class. NOT for any real use.

Run on the instructor machine (or the lab server) on the class network:

    python3 trailer_login.py            # serves http://0.0.0.0:8000/login

Then in another terminal:

    sudo tcpdump -i <iface> -A -s0 'tcp port 8000'

Submit the form in a browser (any username/password, e.g. student / hunter2),
switch to the tcpdump terminal, and point at the POST body:
    username=student&password=hunter2

Stdlib only. No dependencies. Ctrl-C to stop.
"""
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs

PORT = 8000

FORM = b"""<!doctype html><html><head><title>Staff Login</title></head>
<body style="font-family:sans-serif;max-width:320px;margin:80px auto">
<h2>Staff Portal</h2>
<form method="POST" action="/login">
  <p>Username<br><input name="username" autofocus></p>
  <p>Password<br><input name="password" type="password"></p>
  <button type="submit">Sign in</button>
</form>
<p style="color:#888;font-size:12px">Demo only. Served over plain HTTP on purpose.</p>
</body></html>"""


class Handler(BaseHTTPRequestHandler):
    def _send(self, body, status=200):
        self.send_response(status)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path.startswith("/login"):
            self._send(FORM)
        else:
            self.send_response(302)
            self.send_header("Location", "/login")
            self.end_headers()

    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        raw = self.rfile.read(length).decode("utf-8", "replace")
        fields = parse_qs(raw)
        user = fields.get("username", [""])[0]
        # The whole point: this line is what the class sees in the packet capture.
        print(f"  [captured] username={user!r} password={fields.get('password', [''])[0]!r}")
        self._send(
            b"<p style='font-family:sans-serif;margin:80px'>Signed in as "
            + user.encode("utf-8", "replace")
            + b". <a href='/login'>back</a></p>"
        )

    def log_message(self, *args):
        pass  # keep the console clean for the demo


if __name__ == "__main__":
    print(f"Trailer login target on http://0.0.0.0:{PORT}/login  (Ctrl-C to stop)")
    try:
        HTTPServer(("0.0.0.0", PORT), Handler).serve_forever()
    except KeyboardInterrupt:
        print("\nstopped")
