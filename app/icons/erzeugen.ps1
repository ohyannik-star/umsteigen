# Erzeugt die App-Symbole aus der Vorlage (quadratisches Bild mit abgerundeter Fläche auf schwarzem Grund).
# Aufruf in Windows PowerShell:  .\app\icons\erzeugen.ps1 -Vorlage <bild.jpg>
# Ergebnis in app/icons: symbol-1024.png (Master), icon-512.png, icon-192.png, apple-touch-icon.png (180) und
# icon-maskable-512.png (Android: Motiv verkleinert auf dunkelblauem Grund, damit runde Masken nichts abschneiden).
param([Parameter(Mandatory = $true)][string]$Vorlage)
Add-Type -AssemblyName System.Drawing
$ziel = $PSScriptRoot
$quelle = [System.Drawing.Bitmap]::FromFile((Resolve-Path $Vorlage))
$w = $quelle.Width; $h = $quelle.Height
$schwelle = 40
function Hell($b, $x, $y) { $c = $b.GetPixel($x, $y); return [Math]::Max($c.R, [Math]::Max($c.G, $c.B)) }

# 1) Rand der abgerundeten Fläche finden (Mitte jeder Seite) und quadratisch zuschneiden
$mY = [int]($h / 2); $mX = [int]($w / 2)
$l = 0; while ((Hell $quelle $l $mY) -lt $schwelle) { $l++ }
$r = $w - 1; while ((Hell $quelle $r $mY) -lt $schwelle) { $r-- }
$o = 0; while ((Hell $quelle $mX $o) -lt $schwelle) { $o++ }
$u = $h - 1; while ((Hell $quelle $mX $u) -lt $schwelle) { $u-- }
$seite = [Math]::Min($r - $l + 1, $u - $o + 1)
$x0 = [int]($l + (($r - $l + 1) - $seite) / 2); $y0 = [int]($o + (($u - $o + 1) - $seite) / 2)
$quadrat = New-Object System.Drawing.Bitmap $seite, $seite, ([System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
$g = [System.Drawing.Graphics]::FromImage($quadrat)
$g.DrawImage($quelle, (New-Object System.Drawing.Rectangle 0, 0, $seite, $seite), (New-Object System.Drawing.Rectangle $x0, $y0, $seite, $seite), [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose(); $quelle.Dispose()

# 2) Schwarze Ecken außerhalb der Fläche dunkelblau färben: je Zeile von links und rechts bis zum ersten hellen Punkt.
#    max() je Farbkanal lässt das Leuchten am Rand stehen und füllt nur das Schwarz.
$navy = [System.Drawing.Color]::FromArgb(3, 26, 72)
function Fuelle($b, $x, $y) {
  $c = $b.GetPixel($x, $y)
  $b.SetPixel($x, $y, [System.Drawing.Color]::FromArgb([Math]::Max($c.R, $navy.R), [Math]::Max($c.G, $navy.G), [Math]::Max($c.B, $navy.B)))
}
for ($y = 0; $y -lt $seite; $y++) {
  $x = 0; while ($x -lt $seite -and (Hell $quadrat $x $y) -lt $schwelle) { Fuelle $quadrat $x $y; $x++ }
  $x = $seite - 1; while ($x -ge 0 -and (Hell $quadrat $x $y) -lt $schwelle) { Fuelle $quadrat $x $y; $x-- }
}

function Speichere($bild, $groesse, $datei, $anteil) {
  $neu = New-Object System.Drawing.Bitmap $groesse, $groesse, ([System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
  $gr = [System.Drawing.Graphics]::FromImage($neu)
  $gr.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $gr.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $gr.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $gr.Clear($navy)
  $innen = [int][Math]::Round($groesse * $anteil); $rand = [int](($groesse - $innen) / 2)
  $attr = New-Object System.Drawing.Imaging.ImageAttributes
  $attr.SetWrapMode([System.Drawing.Drawing2D.WrapMode]::TileFlipXY)
  $gr.DrawImage($bild, (New-Object System.Drawing.Rectangle $rand, $rand, $innen, $innen), 0, 0, $bild.Width, $bild.Height, [System.Drawing.GraphicsUnit]::Pixel, $attr)
  $gr.Dispose()
  $neu.Save((Join-Path $ziel $datei), [System.Drawing.Imaging.ImageFormat]::Png)
  $neu.Dispose()
  "geschrieben: $datei ($groesse px)"
}
Speichere $quadrat 1024 'symbol-1024.png' 1
Speichere $quadrat 512 'icon-512.png' 1
Speichere $quadrat 192 'icon-192.png' 1
Speichere $quadrat 180 'apple-touch-icon.png' 1
# Android-Masken zeigen sicher nur einen Kreis mit 80 % Durchmesser; das Motiv reicht fast bis an den Rand, daher verkleinert
Speichere $quadrat 512 'icon-maskable-512.png' 0.85
$quadrat.Dispose()
