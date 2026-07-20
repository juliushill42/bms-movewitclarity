#!/bin/bash
# 1. Clear out the corrupted local state link
rm -rf .vercel

# 2. Force a completely clean project name to ignore the broken remote path settings
NEW_PROJECT_NAME="bms-clarity-core"

echo "[*] Launching zero-prompt automated pipeline..."

# 3. Deploy non-interactively using the local temp cache override
npx --cache /tmp/vercel-cache vercel deploy \
  --name "$NEW_PROJECT_NAME" \
  --yes \
  --prod

echo "[+] Execution cycle complete."
