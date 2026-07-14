# Source de remplacement pour les 15 images de galerie cassees sur le CDN Manus
# (Paris / Barcelone / Casablanca). Telecharge des photos sous licence libre
# depuis Wikimedia Commons et ecrit un fichier de credits (attribution + licence).
#
# Aucune cle API requise. Les images sont enregistrees dans client/public/images/
# et les credits dans client/public/images/PHOTO_CREDITS.md

$ErrorActionPreference = "Continue"
$dest = "client/public/images"
$ua = "KhamciVoyages-MigrationBot/1.0 (contact: khamcivoyages@gmail.com)"
New-Item -ItemType Directory -Force -Path $dest | Out-Null

# nom local  =>  requete de recherche Commons
$targets = [ordered]@{
  "paris-eiffel"          = "Eiffel Tower Paris"
  "paris-louvre"          = "Louvre Pyramid Paris"
  "paris-seine"           = "Seine river Paris bridge"
  "paris-notre-dame"      = "Notre-Dame de Paris cathedral"
  "paris-montmartre"      = "Sacre-Coeur Basilica Montmartre"
  "barcelona-sagrada"     = "Sagrada Familia Barcelona"
  "barcelona-park-guell"  = "Park Guell Barcelona"
  "barcelona-gothic"      = "Gothic Quarter Barcelona street"
  "barcelona-beach"       = "Barceloneta beach Barcelona"
  "barcelona-ramblas"     = "La Rambla Barcelona"
  "casablanca-mosquee"    = "Hassan II Mosque Casablanca"
  "casablanca-medina"     = "Old Medina Casablanca"
  "casablanca-corniche"   = "Ain Diab Corniche Casablanca"
  "casablanca-vieille-ville" = "Casablanca old town architecture"
  "casablanca-port"       = "Port of Casablanca"
}

$api = "https://commons.wikimedia.org/w/api.php"
$credits = @()
$ok = 0; $ko = 0; $failed = @()

function Decode-Html($s) {
  if ($null -eq $s) { return "" }
  return ($s -replace "<[^>]+>", "" -replace "&amp;", "&" -replace "&#039;", "'" -replace "&quot;", '"').Trim()
}

foreach ($name in $targets.Keys) {
  $query = $targets[$name]
  $params = @{
    action = "query"; format = "json"; generator = "search"
    gsrsearch = "$query"; gsrnamespace = "6"; gsrlimit = "25"
    prop = "imageinfo"; iiprop = "url|size|extmetadata"; iiurlwidth = "1280"
  }
  $qs = ($params.GetEnumerator() | ForEach-Object { "$($_.Key)=$([uri]::EscapeDataString($_.Value))" }) -join "&"
  $url = "$api`?$qs"

  try {
    $resp = Invoke-RestMethod -Uri $url -Headers @{ "User-Agent" = $ua } -ErrorAction Stop
  } catch {
    Write-Host "[FAIL] $name -- recherche API: $($_.Exception.Message)" -ForegroundColor Red
    $ko++; $failed += $name; continue
  }

  $pages = @()
  if ($resp.query -and $resp.query.pages) {
    $pages = $resp.query.pages.PSObject.Properties.Value | Sort-Object index
  }

  $picked = $null
  foreach ($p in $pages) {
    $ii = $p.imageinfo
    if (-not $ii) { continue }
    $info = $ii[0]
    if (-not $info.thumburl) { continue }
    $titleLower = "$($p.title)".ToLower()
    if ($titleLower -notmatch "\.(jpg|jpeg)$") { continue }          # JPG seulement
    if ($info.width -lt 1200) { continue }                            # assez grand
    if ($info.width -le $info.height) { continue }                    # paysage de preference
    $picked = $info; break
  }
  # fallback: relacher la contrainte paysage
  if (-not $picked) {
    foreach ($p in $pages) {
      $ii = $p.imageinfo; if (-not $ii) { continue }
      $info = $ii[0]
      if (-not $info.thumburl) { continue }
      if ("$($p.title)".ToLower() -notmatch "\.(jpg|jpeg)$") { continue }
      if ($info.width -lt 1000) { continue }
      $picked = $info; break
    }
  }

  if (-not $picked) {
    Write-Host "[FAIL] $name -- aucun candidat exploitable" -ForegroundColor Red
    $ko++; $failed += $name; continue
  }

  $out = Join-Path $dest "$name.jpg"
  try {
    Invoke-WebRequest -Uri $picked.thumburl -OutFile $out -Headers @{ "User-Agent" = $ua } -ErrorAction Stop -UseBasicParsing
    $size = (Get-Item $out).Length
    if ($size -lt 4096) { throw "taille suspecte $size octets" }

    $meta = $picked.extmetadata
    $artist  = if ($meta.Artist) { Decode-Html $meta.Artist.value } else { "Auteur inconnu" }
    $license = if ($meta.LicenseShortName) { Decode-Html $meta.LicenseShortName.value } else { "Voir page Commons" }
    $credits += [pscustomobject]@{
      File = "$name.jpg"; Artist = $artist; License = $license; Source = $picked.descriptionurl
    }
    Write-Host "[OK] $name.jpg ($([math]::Round($size/1KB,1)) KB) -- $license" -ForegroundColor Green
    $ok++
  } catch {
    Write-Host "[FAIL] $name -- telechargement: $($_.Exception.Message)" -ForegroundColor Red
    $ko++; $failed += $name
  }
}

# Ecrire les credits
$md = @("# Credits photos -- galeries destinations", "",
        "Images sous licence libre issues de Wikimedia Commons.", "")
foreach ($c in $credits) {
  $md += "- **$($c.File)** -- $($c.Artist) -- $($c.License) -- <$($c.Source)>"
}
$md -join "`n" | Out-File -FilePath (Join-Path $dest "PHOTO_CREDITS.md") -Encoding utf8

Write-Host ""
Write-Host "Bilan : $ok OK, $ko en echec." -ForegroundColor Cyan
if ($failed.Count) { Write-Host ("Manquants: " + ($failed -join ", ")) -ForegroundColor Yellow }
