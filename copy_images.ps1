$srcDir = "C:\Users\Mr\.gemini\antigravity-ide\brain\d48a9c3e-d927-467c-8328-cf762e77951e"
$destDir = "c:\Users\Mr\website\public\images"

# Copy user images with clean names
Copy-Item "$srcDir\.user_uploaded\media_1787138675849.jpg" "$destDir\hotel-facade-night.jpg" -Force
Copy-Item "$srcDir\.user_uploaded\media_1787138675869.jpg" "$destDir\hotel-building-lights.jpg" -Force
Copy-Item "$srcDir\.user_uploaded\media_1787138676042.jpg" "$destDir\royal-pakhala-thali.jpg" -Force
Copy-Item "$srcDir\.user_uploaded\media_1787138681767.jpg" "$destDir\spandan-special-curry.jpg" -Force
Copy-Item "$srcDir\.user_uploaded\media_1787138675781.jpg" "$destDir\crispy-chicken-kebab.jpg" -Force

# Copy generated supplementary images
$mocktail = Get-ChildItem "$srcDir\spandan_mocktails_drinks_*.jpg" | Select-Object -First 1
if ($mocktail) { Copy-Item $mocktail.FullName "$destDir\spandan-mocktails.jpg" -Force }

$tandoori = Get-ChildItem "$srcDir\spandan_tandoori_platter_*.jpg" | Select-Object -First 1
if ($tandoori) { Copy-Item $tandoori.FullName "$destDir\tandoori-platter.jpg" -Force }

$biryani = Get-ChildItem "$srcDir\spandan_dum_biryani_*.jpg" | Select-Object -First 1
if ($biryani) { Copy-Item $biryani.FullName "$destDir\biryani-handi.jpg" -Force }

$interior = Get-ChildItem "$srcDir\spandan_restaurant_interior_*.jpg" | Select-Object -First 1
if ($interior) { Copy-Item $interior.FullName "$destDir\restaurant-interior.jpg" -Force }

Write-Host "All images synchronized successfully."
Get-ChildItem $destDir | Select-Object Name, Length
