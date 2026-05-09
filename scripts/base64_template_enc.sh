#!/usr/bin/env bash
git_root="$(git rev-parse --show-toplevel)"
if [[ "$1" == "--dry-run" ]]; then
    echo "Dry run: no changes will be made."
fi
expr="(<img\s+src=\"|')(https:\/\/.*\.[a-zA-Z0-9]+)\""
for file in "$git_root"/Licenses/**/*; do
    content=$(cat "$file")
    if [[ "$content" =~ $expr ]]; then
        url="${BASH_REMATCH[2]}"
        encoded=$(./urlimg_to_base64.sh "$url")
        if [[ "$1" != "--dry-run" ]]; then
            if [[ $url != "*data:image/*" ]]; then
                sed -i "s|$url|$encoded|" "$file"
            else
                echo "$file: Skipping: $url is a data URL"
            fi
        else
            echo "$file: Would replace: $url with $encoded"
        fi
    fi
done
