# Telecharge des fichiers Commons precis (choisis manuellement) + relance la
# recherche pour les 2 cas problematiques.
$ua = "KhamciVoyages-MigrationBot/1.0 (contact: khamcivoyages@gmail.com)"
$api = "https://commons.wikimedia.org/w/api.php"
$dest = "client/public/images"

function Decode-Html($s) {
  if ($null -eq $s) { return "" }
  return ($s -replace "<[^>]+>", "" -replace "&amp;", "&" -replace "&#039;", "'" -replace "&quot;", '"').Trim()
}

# nom local => titre exact du fichier Commons
$picks = [ordered]@{
  "paris-notre-dame"         = "File:Paris Notre-Dame Southeast View 01.JPG"
  "paris-seine"              = "File:Pont-Alexandre-III-et-Invalides.jpg"
  "barcelona-gothic"         = "File:Carrer del Bisbe bridge in July 01.jpg"
  "barcelona-beach"          = "File:Barceloneta Beach Barcelona Summer 2024 01.jpg"
  "casablanca-vieille-ville" = "File:Downtown, Casablanca.jpg"
}

$creditLines = @()
foreach ($name in $picks.Keys) {
  $title = $picks[$name]
  $params = @{ action="query"; format="json"; titles=$title; prop="imageinfo"; iiprop="url|size|extmetadata"; iiurlwidth="1400" }
  $qs = ($params.GetEnumerator() | ForEach-Object { "$($_.Key)=$([uri]::EscapeDataString($_.Value))" }) -join "&"
  try { $resp = Invoke-RestMethod -Uri "$api`?$qs" -Headers @{ "User-Agent"=$ua } -ErrorAction Stop }
  catch { Write-Host "[FAIL] $name -- API: $($_.Exception.Message)" -ForegroundColor Red; continue }
  $page = $resp.query.pages.PSObject.Properties.Value | Select-Object -First 1
  $info = $page.imageinfo[0]
  if (-not $info.thumburl) { Write-Host "[FAIL] $name -- pas de thumburl" -ForegroundColor Red; continue }
  $out = Join-Path $dest "$name.jpg"
  try {
    Invoke-WebRequest -Uri $info.thumburl -OutFile $out -Headers @{ "User-Agent"=$ua } -ErrorAction Stop -UseBasicParsing
    $size = (Get-Item $out).Length
    $meta = $info.extmetadata
    $artist  = if ($meta.Artist) { Decode-Html $meta.Artist.value } else { "Auteur inconnu" }
    $license = if ($meta.LicenseShortName) { Decode-Html $meta.LicenseShortName.value } else { "Voir Commons" }
    Write-Host "[OK] $name.jpg ($([math]::Round($size/1KB,1)) KB) -- $license" -ForegroundColor Green
    $creditLines += "- **$name.jpg** -- $artist -- $license -- <$($info.descriptionurl)>"
  } catch { Write-Host "[FAIL] $name -- DL: $($_.Exception.Message)" -ForegroundColor Red }
}

# Sauvegarde des lignes de credits mises a jour dans un fichier temporaire
$creditLines -join "`n" | Out-File -FilePath (Join-Path $dest "_credits_update.txt") -Encoding utf8

# --- Re-listing pour les 2 cas problematiques ---
$relist = [ordered]@{
  "barcelona-ramblas"   = "La Rambla Barcelona"
  "casablanca-corniche" = "Corniche Casablanca"
}
foreach ($name in $relist.Keys) {
  Write-Host ""
  Write-Host "===== candidats $name : '$($relist[$name])' ====="
  $params = @{ action="query"; format="json"; generator="search"; gsrsearch=$relist[$name]; gsrnamespace="6"; gsrlimit="16"; prop="imageinfo"; iiprop="url|size"; iiurlwidth="64" }
  $qs = ($params.GetEnumerator() | ForEach-Object { "$($_.Key)=$([uri]::EscapeDataString($_.Value))" }) -join "&"
  try { $resp = Invoke-RestMethod -Uri "$api`?$qs" -Headers @{ "User-Agent"=$ua } -ErrorAction Stop }
  catch { Write-Host "  ERREUR: $($_.Exception.Message)"; continue }
  $pages = $resp.query.pages.PSObject.Properties.Value | Sort-Object index
  $i = 0
  foreach ($p in $pages) {
    $info = $p.imageinfo[0]; if (-not $info) { continue }
    $orient = if ($info.width -gt $info.height) { "paysage" } else { "portrait" }
    $ext = if ("$($p.title)" -match "\.(jpg|jpeg)$") { "jpg" } else { "autre" }
    Write-Host ("  [{0,2}] {1,5}x{2,-5} {3} {4}  {5}" -f $i, $info.width, $info.height, $orient, $ext, ($p.title -replace '^File:',''))
    $i++
  }
}
