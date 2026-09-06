# Linux cheat-sheet — <your name>

*Started Day 6. Add to it every time you meet a new command.*

| Command | What it does | Example |
|---------|--------------|---------|
| `pwd` | print working directory — where am I | `pwd` |
| `ls` | list files here | `ls -l` (details) · `ls -a` (hidden) |
| `cd` | change directory | `cd /etc` · `cd ..` · `cd` (home) |
| `cat` | dump a (short) file to the screen | `cat /etc/os-release` |
| `less` | page through a long file | `less /etc/services` (`q` quits, `/` searches) |
| `head` / `tail` | first / last N lines | `head -n 20 file` · `tail -f log` (follow) |
| `wc` | count lines / words / bytes | `wc -l /etc/passwd` |
| `find` | locate files by name / type / size | `find /etc -name "*.conf"` |
| `grep` | search for text inside files | `grep -ri "password" .` |
| `man` / `--help` | read the manual for a command | `man ls` · `ls --help` |
| `which` | where does this command live | `which python3` |
| `cut` | split a line, take a field | `cut -d: -f1 /etc/passwd` |
| `sort` | sort lines | `sort` · `sort -n` (numeric) |
| `\|` (pipe) | send output of one command into the next | `cat f \| grep x \| wc -l` |
| `>` / `>>` | write / append output to a file | `ls > files.txt` |

<!-- add your own below as you learn them (Day 7: chmod, chown, sudo, ps, kill, systemctl, ...) -->
