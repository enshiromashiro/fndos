#!/bin/sh

ver=$(cat package.json | jq -r .version)
ref=$(git rev-parse --short HEAD)

sysinfo="{\"version\":\"${ver}\", \"commit\": \"${ref}\"}"
echo "$sysinfo" | jq | tee system-info.json
