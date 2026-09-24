$dirs = @(
    $env:ProgramFiles,
    ${env:ProgramFiles(x86)},
    $env:LOCALAPPDATA,
    $env:APPDATA,
    "C:\ProgramData"
)

foreach ($d in $dirs) {
    if (Test-Path $d) {
        $found = Get-ChildItem -Path $d -Filter "git.exe" -Recurse -ErrorAction SilentlyContinue -Depth 4
        if ($found) {
            Write-Host "FOUND: $($found.FullName)"
        }
    }
}
