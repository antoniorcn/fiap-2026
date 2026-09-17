SET JAVA_HOME=C:\opt\jdk-17.0.20.1-full
REM Se não tiver o Java 17, baixe ele do site ==> https://download.bell-sw.com/java/17.0.20.1+1/bellsoft-jdk17.0.20.1+1-windows-amd64.zip
SET ANDROID_HOME=C:\usr\Android\SDK
SET PATH=%JAVA_HOME%\bin;%ANDROID_HOME%\emulator;%ANDROID_HOME%\tools;%ANDROID_HOME%\tools\bin;%ANDROID_HOME%\platform-tools;%PATH%

java --version
adb --version