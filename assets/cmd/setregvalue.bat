@echo off
setlocal ENABLEEXTENSIONS
echo WRITING Registry
REM set KEY_NAME="HKEY_CURRENT_USER\SOFTWARE\<Key>"
set "KEY_NAME=%1%"
REM set VALUE_NAME=%time%
set "VALUE_NAME=%2%"
set "VALUE=%3%"
echo call REG ADD %KEY_NAME% /v %VALUE_NAME% /f
call REG ADD %KEY_NAME% /v %VALUE_NAME% /d %VALUE% /f
call REG QUERY %KEY_NAME% /v %VALUE_NAME%