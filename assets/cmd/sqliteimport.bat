@echo off
cls
type %cd%\resources\hapag.lloyd.importer.txt
REM setLocal EnableDelayedExpansion
Set "cecho=%cd%\projects\HLECHO\x64\Release\cecho_x64.exe"
Set "PRG=%cd%\release\HLSQLIiteImport\sqliteimport.exe"
set "sexec=%~dp0\sqlite3.exe"
set "importsql=%cd%\release\HLSQLIiteImport\_sqliteimport.sql"
REM set "dbfile=%cd%\projects\HLECHO\Win32\Release\hlimport.db"
set "dbfile=%cd%\release\HLSQLIiteImport\hlimport.db"
REM SET "QUERY=select rowid, name from %temptable% limit 1000000;"
REM set timestamp=%time:~0,2%
REM setLocal EnableDelayedExpansion

REM echo %cecho%
%cecho% {\u07 \u07}
%cecho% {01}INITIALIZING SQLCMD IMPORT{#}{\n}
echo -----------------------------------------------------
%cecho% {01}Hapag Lloyd - SQLite Importer{#}{\n}
echo -----------------------------------------------------
echo -----------------------------------------------------
REM echo %time%
%cecho% {yellow on black}%time%{#}{\n}
echo -----------------------------------------------------
timeout 1 > NUL
%cecho% {white on black}%LINE%{#}{\n}
%cecho% {blue on black}Hapag Lloyd - SQLite Importer{#}{\n}
%cecho% {white on black}%LINE%{#}{\n}
del %dbfile%
%cecho% {white on black}"%sexec%" "%dbfile%" ".read %importsql%"{#}{\n}
REM echo "%sexec%" "%dbfile%" ".read %importsql%"
call "%sexec%" "%dbfile%" ".read %importsql%"
@echo off
%cecho% {white on black}%LINE%{#}{\n}
REM echo start %PRG%
%cecho% {white on black}start %PRG%{#}{\n}
%cecho% {white on black}%LINE%{#}{\n}
start %PRG%
timeout 3 > NUL
pause
@echo on