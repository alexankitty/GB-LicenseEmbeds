#!/usr/bin/env bash
git_root="$(git rev-parse --show-toplevel)"
web_root="https://alexankitty.github.io/GB-LicenseEmbeds"
if [[ "$1" == "--dry-run" ]]; then
    echo "Dry run: no changes will be made."
fi
expr="(<img\s+src=\"|')(https:\/\/.*\.[a-zA-Z0-9]+)\""
for file in "$git_root"/Licenses/**/*; do
    content=$(cat "$file")
    if [[ "$content" =~ $expr ]]; then
        url="${BASH_REMATCH[2]}"
        ext="${url##*.}"
        filename="${file##*/}"
        filename="${filename%.*}"
        category="${file%/*}"
        category="${category##*/}"
        image_path="$git_root/Images/$category/$filename.$ext"
        image_folder=${image_path%/*}
        web_path="$web_root/Images/$category/$filename.$ext"

        if [[ "$1" != "--dry-run" ]]; then
            mkdir -p "$image_folder"
            curl -Lso "$image_path" "$url"
            if [[ $url != *"$web_root"* ]]; then
                if [[ $ext == "svg" ]]; then
                    new_path="${image_path%.svg}.png"
                    web_path=${web_path%.svg}.png
                    inkscape -o "$new_path" "$image_path"
                    rm "$image_path"
                    image_path="$new_path"
                fi
                sed -i "s|$url|$web_path|" "$file"
            else
                echo "$file: Skipping: $url is already locally hosted."
            fi
        else
            printf "$file:\n $url ->\n $image_path\n $web_path\n\n"
        fi
    fi
done
