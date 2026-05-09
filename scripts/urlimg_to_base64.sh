#!/usr/bin/env bash
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <url>"
    exit 1
fi

url="$1"
ext="${url##*.}"
if [[ $ext == "svg" ]]; then
    echo "data:image/svg+xml;base64,$(base64 <(curl -Ls "$url") | tr -d '\n')"
    exit 0
else
    base64 <(curl -Ls "$url") | tr -d '\n' | awk '{print "data:image/'$ext';base64," $0}'
fi
