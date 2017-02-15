cd 'C:\Users\Vahan\Desktop\survey2\media\connectivity\3'
Get-ChildItem -Path C:\Users\Vahan\Desktop\survey2\media\connectivity\3 -File -Recurse | ForEach-Object {
 $myfilename = $_.Name
 $mysp = $myfilename.IndexOf(".")
 $mynewfilename = $myfilename.Substring(0,$mysp) + "3"+$myfilename.Substring($mysp)
 ren $myfilename $mynewfilename
}