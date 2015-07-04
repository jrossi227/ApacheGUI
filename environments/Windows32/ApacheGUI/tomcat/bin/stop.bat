@echo off
IF DEFINED APACHEGUIJRE_HOME set JRE_HOME=%APACHEGUIJRE_HOME%
call net stop ApacheGUI
call service remove ApacheGUI
(PAUSE)