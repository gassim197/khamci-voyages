# Liste des candidats Wikimedia Commons (titre, dimensions) pour choix manuel.
$ua = "KhamciVoyages-MigrationBot/1.0 (contact: khamcivoyages@gmail.com)"
$api = "https://commons.wikimedia.org/w/api.php"

$queries = [ordered]@{
  "paris-notre-dame"        = "Notre-Dame de Paris cathedral facade"
  "paris-seine"             = "Seine Paris Pont Alexandre III"
  "barcelona-gothic"        = "Carrer del Bisbe Barcelona Gothic"
  "barcelona-beach"         = "Barceloneta beach Barcelona summer"
  "barcelona-ramblas"       = "La Rambla Barcelona promenade trees"
  "casablanca-vieille-ville"= "United Nations Square Casablanca"
  "casablanca-corniche"     = "Ain Diab beach Casablanca day"
}

foreach ($name in $queries.Keys) {
  Write-Host "===== $name  :  '$($queries[$name])' ====="
  $params = @{
    action="query"; format="json"; generator="search"
    gsrsearch=$queries[$name]; gsrnamespace="6"; gsrlimit="14"
    prop="imageinfo"; iiprop="url|size"; iiurlwidth="64"
  }
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
  Write-Host ""
}
