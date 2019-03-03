@echo off
chcp 65001
SETLOCAL ENABLEDELAYEDEXPANSION
@echo off
chcp 65001
SETLOCAL ENABLEDELAYEDEXPANSION

for /f "delims=" %%f IN ('dir /b /s ".\*.mp3"') do (
set file1=%%~nf.wav
echo "file :" !file1!
set fic1=%%f
echo "file : " !fic1!
rem CALL "C:\tools\VLC\VLCPortable\VLCPortable.exe"  "!fic1!" --sout="#transcode{vcodec=none,acodec=mp3,ab=320,channels=2,samplerate=48000}:std{access=file{no-overwrite},mux=mp3,dst="""!file1!"""}" vlc://quit
ffmpeg -i "%%f" -acodec pcm_u8 -ar 22050 "%%f.wav"
)
echo .
echo conversion finished
pause