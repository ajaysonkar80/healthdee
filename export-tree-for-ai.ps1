$IGNORE = "node_modules,.next,.git"
$OUT_DIR = "ai-tree"

New-Item -ItemType Directory -Force -Path $OUT_DIR | Out-Null

Write-Host "Generating root overview..."
npx tree-cli -L 4 --ignore $IGNORE |
  Out-File "$OUT_DIR\tree-root.txt" -Encoding utf8


$folders = @(
  "app",
  "db",
  "domains",
  "repositories",
  "policies",
  "utils",
  "hooks",
  "lib",
  "server"
  
)

foreach ($folder in $folders) {
  if (Test-Path $folder) {
    Write-Host "Generating tree for $folder..."
    npx tree-cli $folder --ignore $IGNORE |
  Out-File "$OUT_DIR\tree-$folder.txt" -Encoding utf8

  }
}

Write-Host "✅ AI-safe tree export complete → $OUT_DIR\"
