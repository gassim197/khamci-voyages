# Remplace les URLs du CDN Manus par des chemins locaux dans le code source.
# - 6 fichiers a images intactes : remplacement regex vers /images/{name}.webp
# - 3 pages destinations : table de correspondance exacte vers /images/{name}.jpg
#   (certains slots renommes pour coller au sujet reellement affiche)
# Preserve l'encodage UTF-8 sans BOM.

$enc = New-Object System.Text.UTF8Encoding($false)
$base = "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx"

function Rewrite-File($path, [scriptblock]$transform) {
  $text = [System.IO.File]::ReadAllText($path)
  $new = & $transform $text
  if ($new -ne $text) {
    [System.IO.File]::WriteAllText($path, $new, $enc)
    Write-Host "[MODIFIE] $path" -ForegroundColor Green
  } else {
    Write-Host "[INCHANGE] $path" -ForegroundColor Yellow
  }
}

# --- 1) Fichiers a images intactes : regex generique webp ---
$webpFiles = @(
  "client/src/components/HeroSection.tsx",
  "client/src/components/DiscoverGuinea.tsx",
  "client/src/components/PopularDestinations.tsx",
  "client/src/components/DestinationGalleries.tsx",
  "client/src/data/blogArticles.ts",
  "client/src/pages/BangkokPage.tsx"
)
$pattern = [regex]::Escape($base) + "/([a-z0-9-]+?)-[A-Za-z0-9]{18,30}\.webp"
foreach ($f in $webpFiles) {
  Rewrite-File $f { param($t) [regex]::Replace($t, $pattern, '/images/$1.webp') }
}

# --- 2) Pages destinations : correspondance exacte vers .jpg ---
$map = @{
  "$base/paris-eiffel-eoSDWbxVc68iaNY5zrhadD.webp"        = "/images/paris-eiffel.jpg"
  "$base/paris-louvre-JokxWaVQ2ByDkgbcMFRZre.webp"        = "/images/paris-louvre.jpg"
  "$base/paris-seine-nxTGpV6UgRLvLURqaCvKjV.webp"         = "/images/paris-seine.jpg"
  "$base/paris-montmartre-HRxxwK8JQrvi6pWsZXxkf6.webp"    = "/images/paris-notre-dame.jpg"
  "$base/paris-champs-elysees-E96uTb8WHUNhqdArBWyFcW.webp"= "/images/paris-montmartre.jpg"

  "$base/barcelona-sagrada-JokxWaVQ2ByDkgbcMFRZre.webp"   = "/images/barcelona-sagrada.jpg"
  "$base/barcelona-park-guell-eoSDWbxVc68iaNY5zrhadD.webp"= "/images/barcelona-park-guell.jpg"
  "$base/barcelona-gothic-nxTGpV6UgRLvLURqaCvKjV.webp"    = "/images/barcelona-gothic.jpg"
  "$base/barcelona-beach-HRxxwK8JQrvi6pWsZXxkf6.webp"     = "/images/barcelona-beach.jpg"
  "$base/barcelona-ramblas-E96uTb8WHUNhqdArBWyFcW.webp"   = "/images/barcelona-ramblas.jpg"

  "$base/casablanca-mosquee-SktrDccbESw6gP3DzVwVoN.webp"  = "/images/casablanca-mosquee.jpg"
  "$base/casablanca-medina-URY6ip6CJooZd8Wsrczggg.webp"   = "/images/casablanca-medina.jpg"
  "$base/casablanca-corniche-L98xXcGjgPStsKD3MtrdPy.webp" = "/images/casablanca-corniche.jpg"
  "$base/casablanca-port-gCXvJb3ESxydTeJXGaCVYD.webp"     = "/images/casablanca-vieille-ville.jpg"
  "$base/casablanca-ville-77CpMWNC2n9TjTfRxzfeXY.webp"    = "/images/casablanca-port.jpg"
}
$pageFiles = @(
  "client/src/pages/ParisPage.tsx",
  "client/src/pages/BarcelonaPage.tsx",
  "client/src/pages/CasablancaPage.tsx"
)
foreach ($f in $pageFiles) {
  Rewrite-File $f {
    param($t)
    foreach ($k in $map.Keys) { $t = $t.Replace($k, $map[$k]) }
    return $t
  }
}
