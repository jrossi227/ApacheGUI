@echo off
IF DEFINED APACHEGUIJRE_HOME set JRE_HOME=%APACHEGUIJRE_HOME%
call service install ApacheGUI
call net start ApacheGUI
(PAUSE)