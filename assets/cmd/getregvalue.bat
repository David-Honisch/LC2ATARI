@echo off
REM setlocal ENABLEEXTENSIONS
REM echo Reading Registry
set "result="
set "KEY_NAME=%1"
set VALUE_TIME=%time%
set "VALUE_NAME=%2"
REM echo RUNNING:REG QUERY %KEY_NAME% /v %VALUE_NAME%
for /f "tokens=2*" %%a in ('reg query %KEY_NAME% /v %VALUE_NAME%') do (
    set type=%%a
    set data=%%b
)
set "result=%data%"
REM echo Registry Value RETURNS: %result%