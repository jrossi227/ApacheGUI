Website 
---------------

The ApacheGUI website is located here (http://apachegui.net). Questions and comments can be sent to apachegui.net@gmail.com or by creating an issue.

Packages
----------------

ApacheGUI Packages are hosted on sourceforge. They can be accessed from the following link https://sourceforge.net/projects/apachegui/


Development Environment
---------------

ApacheGUI is currently a web application that has been packaged into a tomcat environment. The ApacheGUI source code is currently structured as an Eclipse web project. It can be imported to Eclipse using the EGit Eclipse plugin. 

Project Dependancies
---------------

ApacheGUI is dependant on the following project(s). It is not required to download these projects however a large amount of source code uses classes and methods in these projects.

- ApacheConfParser (https://github.com/jrossi227/ApacheConfParser). The code from this project is included in *WebContent/WEB-INF/lib/ApacheConfParser-{version}.jar*.

Building ApacheGUI
----------------

Although Windows is fully supported, it is recommended to use a Linux or Mac OSX distribution when developing ApacheGUI. This is because Apache and Tomcat run more smoothly on IX based distributions.

####Build Dependancies

- Node js
- Ant 
- Java 1.6+
- Latest ApacheGUI package

####Linux / Mac OSX build steps
1. Download the latest package from the package site (https://sourceforge.net/projects/apachegui/files/). A Package will follow the naming convention *ApacheGUI-{version}.tar.gz*.
2. Extract the package to a directory of your choice.
3. Edit *build/build.properties* and set *apachegui.home* to the location in step 2.
4. Navigate to the *build* directory.
5. Run the Ant options below.

######Ant options
- *ant war.all* minifies required javascript and builds a new war under *build/dist* 
- *ant war.dev* copies required javascript without minification and builds a new war under *build/dist* 
- *ant deploy* moves the war from *build/dist* to *apachegui.home/tomcat/webapps*. This will re-depoly the application.
- *ant package* stops ApacheGUI and builds a new .tar.gz package. The file is put into the *package.dir* directory that is specified in *build/build.properties*.

####Windows

1. Download the latest package from the package site (https://sourceforge.net/projects/apachegui/files/). A Package will follow the naming convention *ApacheGUI-Windows{architecture}-{version}.msi*.
2. Install the ApacheGUI msi.
3. Edit *build/build.properties* and set *apachegui.home* to the install location in step 2. This is usually located under *C:\Program Files\ApacheGUI*
4. Navigate to the *build* directory.
5. Run the Ant options below.

######Ant options
- *ant war.all* minifies required javascript and builds a new war under *build/dist* 
- *ant war.dev* copies required javascript without minification and builds a new war under *build/dist* 
- *ant deploy* stops ApacheGUI moves the war from *build/dist* to *apachegui.home/tomcat/webapps* and starts ApacheGUI. This will re-depoly the application.
