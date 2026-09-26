#!/bin/bash
# usage: ./sweep.sh <subnet-prefix>      e.g.  ./sweep.sh 127.0.0   or   ./sweep.sh 10.0.0
# Pings .1 through .254 and prints which addresses answer.
# ONLY run this against your own machine or the class lab. Scanning networks you do not
# own or have written permission for is illegal (Day 1: "no scope, no test").

subnet="$1"
if [ -z "$subnet" ]; then
  echo "usage: $0 <subnet-prefix>   e.g. $0 10.0.0"
  exit 1
fi

up=0
for i in $(seq 1 254); do
  if ping -c1 -W1 "$subnet.$i" &>/dev/null; then
    echo "$subnet.$i up"
    up=$((up + 1))
  fi
done

echo "---"
echo "$up host(s) responded"
