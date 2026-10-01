@echo off
rem START.cmd — يشغّل عيّنة درس بارق بلا إنترنت: خادم محلّيّ (serve.py) ثم المتصفّح بعد جاهزية الخادم.
rem ضعه بجانب index.html و serve.py. يجرّب «py -3» ثم «python» (لا يستعمل اختصار متجر Microsoft).
setlocal EnableExtensions
chcp 65001 >nul
cd /d "%~dp0"
if not exist "serve.py" ( echo serve.py غير موجود بجانب هذا الملف. & pause & exit /b 1 )

set "PY="
py -3 -c "import sys" >nul 2>&1 && set "PY=py -3"
if not defined PY ( python -c "import sys; sys.exit(0 if sys.version_info[0]==3 else 1)" >nul 2>&1 && set "PY=python" )
if not defined PY ( python3 -c "import sys" >nul 2>&1 && set "PY=python3" )
if not defined PY (
  echo لم يُعثر على Python 3. ثبّته من python.org ^(مع خيار Add to PATH^) ثم أعد المحاولة.
  pause
  exit /b 1
)

if exist "server.port" del /q "server.port" >nul 2>&1
start "Bareq server" /min %PY% serve.py 8770

rem انتظار الخادم حتى ٢٠ ثانية
set /a TRIES=0
:wait
set /a TRIES+=1
if %TRIES% gtr 40 ( echo تعذّر بدء الخادم. & pause & exit /b 1 )
if not exist "server.port" ( ping -n 1 -w 500 127.0.0.1 >nul & timeout /t 1 /nobreak >nul & goto wait )
set /p PORT=<"server.port"
powershell -NoProfile -Command "try{Invoke-WebRequest -UseBasicParsing -TimeoutSec 1 http://127.0.0.1:%PORT%/index.html | Out-Null; exit 0}catch{exit 1}" >nul 2>&1
if errorlevel 1 ( timeout /t 1 /nobreak >nul & goto wait )

start "" "http://127.0.0.1:%PORT%/index.html"
echo العيّنة تعمل على http://127.0.0.1:%PORT%/index.html — أغلق نافذة «Bareq server» لإيقافها.
timeout /t 5 >nul
endlocal
