cd 'C:\Users\Vahan\Desktop\survey2\media\tutorial_new_color'
Get-ChildItem -Path C:\Users\Vahan\Desktop\survey2\media\tutorial_new_color -File -Recurse | ForEach-Object {
 $myfilename = $_.Name
 $mysp = $myfilename.IndexOf(".svg")
 If($myfilename.Substring($mysp) -eq ".svg") {
 $myfilename
 $mysvg = $myfilename.Substring(0,$mysp)+ ".svg"
 $mypng = $myfilename.Substring(0,$mysp) + ".png"
 inkscape --export-area-drawing -e  $mypng $mysvg
  
 }
}