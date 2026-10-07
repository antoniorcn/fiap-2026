REM Guardar:
REM 	* Diretorio onde está o Android SDK ==> C:\usr\Android\SDK
REM 	* Diretorio onde está o Java 17 ==> C:\usr\jdk-17.0.15-full
	
SET JAVA_HOME=C:\usr\jdk-17.0.15-full
SET ANDROID_HOME=C:\usr\Android\SDK
SET ANDROID_SDK_ROOT=C:\usr\Android\SDK
SET PATH=%JAVA_HOME%\bin;%ANDROID_HOME%\emulator;%ANDROID_HOME%\tools;%ANDROID_HOME%\tools\bin;%ANDROID_HOME%\platform-tools;%PATH%