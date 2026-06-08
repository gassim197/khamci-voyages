# Telecharge toutes les images depuis le CDN Manus vers client/public/images/
# Strip les hash des noms pour produire des chemins lisibles.

$ErrorActionPreference = "Continue"
$dest = "client/public/images"

# S'assurer que le dossier de destination existe
New-Item -ItemType Directory -Force -Path $dest | Out-Null

# Extraire toutes les URLs Manus CDN uniques depuis le code source
$urls = Get-ChildItem -Recurse client/src -Include *.ts,*.tsx |
  Select-String -Pattern "https://d2xsxph8kpxj0f\.cloudfront\.net/[^`"']+\.webp" -AllMatches |
  ForEach-Object { $_.Matches.Value } |
  Sort-Object -Unique

Write-Host "Trouve $($urls.Count) URLs uniques a telecharger." -ForegroundColor Cyan
Write-Host ""

$ok = 0
$ko = 0

foreach ($url in $urls) {
  $filename = ($url -split "/")[-1]
  # Strip le hash : pattern "name-HASH22chars.webp" -> "name.webp"
  $cleanName = $filename -replace "-[A-Za-z0-9]{18,30}\.webp$", ".webp"
  $out = Join-Path $dest $cleanName

  try {
    Invoke-WebRequest -Uri $url -OutFile $out -ErrorAction Stop -UseBasicParsing
    $size = (Get-Item $out).Length
    if ($size -lt 1024) {
      Write-Host "[!] $cleanName telecharge a $size octets -- probablement une erreur" -ForegroundColor Yellow
      $ko++
    } else {
      Write-Host "[OK] $cleanName ($([math]::Round($size/1KB,1)) KB)" -ForegroundColor Green
      $ok++
    }
  } catch {
    Write-Host "[FAIL] $cleanName -- $($_.Exception.Message)" -ForegroundColor Red
    $ko++
  }
}

Write-Host ""
Write-Host "Bilan : $ok telechargements OK, $ko en echec." -ForegroundColor Cyan
