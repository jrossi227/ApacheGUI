@echo off
IF DEFINED JAVA_HOME GOTO DEFINED
IF DEFINED JRE_HOME GOTO DEFINED
ECHO JAVA_HOME and JRE_HOME are NOT defined, one of these environment variables must be defined.
(PAUSE)
GOTO END
:DEFINED
set TOMCAT_HOME=..\tomcat
cd %TOMCAT_HOME%\bin
call elevate.exe run.bat
cd ../../bin
:END
