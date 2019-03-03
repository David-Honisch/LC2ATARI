echo converting *.wav to *.ogg 
for /r %%i in (*) do ffmpeg -i %%i -acodec libvorbis .\%%~ni.ogg