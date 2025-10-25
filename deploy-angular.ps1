# Script de Despliegue de Angular a Express
# Uso: .\deploy-angular.ps1 -AngularPath "ruta\a\tu\proyecto\angular"

param(
    [Parameter(Mandatory=$false)]
    [string]$AngularPath = "..\frontend",
    
    [Parameter(Mandatory=$false)]
    [string]$BuildConfig = "production"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Despliegue de Angular a Express" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si existe el proyecto Angular
if (-not (Test-Path $AngularPath)) {
    Write-Host "❌ Error: No se encontró el proyecto Angular en: $AngularPath" -ForegroundColor Red
    Write-Host "   Uso: .\deploy-angular.ps1 -AngularPath 'ruta\a\tu\proyecto'" -ForegroundColor Yellow
    exit 1
}

Write-Host "📂 Proyecto Angular: $AngularPath" -ForegroundColor Green
Write-Host "⚙️  Configuración: $BuildConfig" -ForegroundColor Green
Write-Host ""

# Navegar al proyecto Angular
Push-Location $AngularPath

Write-Host "🔨 Construyendo proyecto Angular..." -ForegroundColor Yellow
try {
    if ($BuildConfig -eq "production") {
        ng build --configuration production
    } else {
        ng build
    }
    
    if ($LASTEXITCODE -ne 0) {
        throw "Error en el build de Angular"
    }
    
    Write-Host "✅ Build completado exitosamente" -ForegroundColor Green
} catch {
    Write-Host "❌ Error al construir el proyecto: $_" -ForegroundColor Red
    Pop-Location
    exit 1
}

# Volver al directorio del backend
Pop-Location

# Buscar la carpeta dist
Write-Host ""
Write-Host "📦 Buscando archivos compilados..." -ForegroundColor Yellow

$distFolder = Get-ChildItem -Path $AngularPath\dist -Directory | Select-Object -First 1

if (-not $distFolder) {
    Write-Host "❌ Error: No se encontró la carpeta dist" -ForegroundColor Red
    exit 1
}

$distPath = $distFolder.FullName
Write-Host "📁 Carpeta dist encontrada: $distPath" -ForegroundColor Green

# Limpiar carpeta public (excepto index.html)
Write-Host ""
Write-Host "🧹 Limpiando carpeta public..." -ForegroundColor Yellow

$publicPath = ".\public"
if (Test-Path $publicPath) {
    Get-ChildItem -Path $publicPath -Recurse | Where-Object { $_.Name -ne "index.html" -or $_.FullName -notlike "*\public\index.html" } | Remove-Item -Force -Recurse -ErrorAction SilentlyContinue
    Write-Host "✅ Carpeta limpiada" -ForegroundColor Green
} else {
    New-Item -ItemType Directory -Path $publicPath | Out-Null
    Write-Host "✅ Carpeta public creada" -ForegroundColor Green
}

# Copiar archivos
Write-Host ""
Write-Host "📋 Copiando archivos al backend..." -ForegroundColor Yellow

try {
    Copy-Item -Path "$distPath\*" -Destination $publicPath -Recurse -Force
    Write-Host "✅ Archivos copiados exitosamente" -ForegroundColor Green
} catch {
    Write-Host "❌ Error al copiar archivos: $_" -ForegroundColor Red
    exit 1
}

# Verificar archivos copiados
Write-Host ""
Write-Host "📊 Archivos en public/:" -ForegroundColor Cyan
$files = Get-ChildItem -Path $publicPath -File
foreach ($file in $files) {
    $size = "{0:N2} KB" -f ($file.Length / 1KB)
    Write-Host "   - $($file.Name) ($size)" -ForegroundColor Gray
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  ✅ Despliegue Completado" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Para iniciar el servidor:" -ForegroundColor Yellow
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "🌐 La aplicación estará disponible en:" -ForegroundColor Yellow
Write-Host "   http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
