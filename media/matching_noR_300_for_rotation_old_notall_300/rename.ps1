cd 'C:\Users\Vahan\Desktop\survey2\media\\matching_noR_300_for_rotation\1'
Get-ChildItem -Path C:\Users\Vahan\Desktop\survey2\media\\matching_noR_300_for_rotation\1 -File -Recurse | ForEach-Object {
 $myfilename = $_.Name
 $mysp = $myfilename.IndexOf(".")
 $mynewfilename = $myfilename.Substring(0,$mysp) + "1"+$myfilename.Substring($mysp)
 ren $myfilename $mynewfilename
}
cd 'C:\Users\Vahan\Desktop\survey2\media\\matching_noR_300_for_rotation\2'
Get-ChildItem -Path C:\Users\Vahan\Desktop\survey2\media\\matching_noR_300_for_rotation\2 -File -Recurse | ForEach-Object {
 $myfilename = $_.Name
 $mysp = $myfilename.IndexOf(".")
 $mynewfilename = $myfilename.Substring(0,$mysp) + "2"+$myfilename.Substring($mysp)
 ren $myfilename $mynewfilename
}
cd 'C:\Users\Vahan\Desktop\survey2\media\\matching_noR_300_for_rotation\3'
Get-ChildItem -Path C:\Users\Vahan\Desktop\survey2\media\\matching_noR_300_for_rotation\3 -File -Recurse | ForEach-Object {
 $myfilename = $_.Name
 $mysp = $myfilename.IndexOf(".")
 $mynewfilename = $myfilename.Substring(0,$mysp) + "3"+$myfilename.Substring($mysp)
 ren $myfilename $mynewfilename
}