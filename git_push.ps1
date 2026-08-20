$gitCandidates = @(
    "C:\Users\Mr\AppData\Local\MinGit\cmd\git.exe",
    "C:\Program Files\Git\cmd\git.exe",
    "git"
)

$gitExe = $null
foreach ($g in $gitCandidates) {
    if (Test-Path $g -ErrorAction SilentlyContinue) {
        $gitExe = $g
        break
    } else {
        $where = where.exe $g 2>$null
        if ($where) {
            $gitExe = $g
            break
        }
    }
}

if (-not $gitExe) {
    Write-Error "Git executable not found."
    exit 1
}

Write-Host "Using Git at: $gitExe"
& $gitExe --version

# Set safe directory
& $gitExe config --global --add safe.directory "c:/Users/Mr/website"

# Initialize if needed
if (-not (Test-Path "c:\Users\Mr\website\.git")) {
    Write-Host "Initializing git repository..."
    & $gitExe init
}

# Configure default user if not set
$userName = & $gitExe config user.name
if (-not $userName) {
    & $gitExe config user.name "dillipsahudig33-sys"
    & $gitExe config user.email "dillipsahu@users.noreply.github.com"
}

# Add Remote
$remoteUrl = "https://github.com/dillipsahudig33-sys/hotel.git"
$existingRemote = & $gitExe remote get-url origin 2>$null
if (-not $existingRemote) {
    Write-Host "Adding remote origin..."
    & $gitExe remote add origin $remoteUrl
} else {
    Write-Host "Updating remote origin..."
    & $gitExe remote set-url origin $remoteUrl
}

# Set branch to main
& $gitExe branch -M main

# Stage all files
Write-Host "Staging files..."
& $gitExe add .

# Status
& $gitExe status

# Commit
Write-Host "Creating commit..."
& $gitExe commit -m "feat: Hotel Spandan official website with multi-cuisine menu, reservation system, photo gallery, and Vercel configuration"

# Push to origin main
Write-Host "Pushing to GitHub repo: $remoteUrl ..."
& $gitExe push -u origin main
