# Kakeibo Application Setup Script
# This script automates the initial setup process

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Kakeibo App Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Check Java version
Write-Host "[1/5] Checking Java version..." -ForegroundColor Yellow
try {
    $javaVersion = java -version 2>&1 | Select-String "version" | ForEach-Object { $_.Line }
    Write-Host "  OK Java: $javaVersion" -ForegroundColor Green
} catch {
    Write-Host "  ERROR Java not found. Please install Java 21." -ForegroundColor Red
    exit 1
}

# 2. Check Node.js version
Write-Host "[2/5] Checking Node.js version..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "  OK Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ERROR Node.js not found. Please install Node.js." -ForegroundColor Red
    exit 1
}

# 3. Check Docker
Write-Host "[3/5] Checking Docker..." -ForegroundColor Yellow
try {
    $dockerVersion = docker --version
    Write-Host "  OK Docker: $dockerVersion" -ForegroundColor Green
    
    # Check if Docker Desktop is running
    $dockerInfo = docker info 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  ERROR Docker Desktop is not running." -ForegroundColor Red
        Write-Host "    Please start Docker Desktop and run this script again." -ForegroundColor Yellow
        exit 1
    }
    Write-Host "  OK Docker Desktop is running" -ForegroundColor Green
} catch {
    Write-Host "  ERROR Docker not found. Please install Docker Desktop." -ForegroundColor Red
    exit 1
}

# 4. Install frontend dependencies
Write-Host "[4/5] Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\kakeibo-frontend"
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "  OK Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "  ERROR Failed to install frontend dependencies" -ForegroundColor Red
    Set-Location $PSScriptRoot
    exit 1
}

# 5. Build backend (skip tests)
Write-Host "[5/5] Building backend (skipping tests)..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\kakeibo-backend"
& ".\gradlew.bat" build -x test
if ($LASTEXITCODE -eq 0) {
    Write-Host "  OK Backend build completed" -ForegroundColor Green
} else {
    Write-Host "  ERROR Backend build failed" -ForegroundColor Red
    Set-Location $PSScriptRoot
    exit 1
}

Set-Location $PSScriptRoot

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Open this folder in VSCode" -ForegroundColor White
Write-Host "2. Ctrl+Shift+P -> 'Tasks: Run Task' -> 'Start All Services'" -ForegroundColor White
Write-Host "   or press F5 to start debugging" -ForegroundColor White
Write-Host ""
Write-Host "Access URLs:" -ForegroundColor Yellow
Write-Host "  Frontend:  http://localhost:8080" -ForegroundColor White
Write-Host "  Backend:   http://localhost:9001" -ForegroundColor White
Write-Host ""
Write-Host "See SETUP.md for more details." -ForegroundColor Cyan
Write-Host ""
