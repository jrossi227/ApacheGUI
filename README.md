Website 
---------------

The ApacheGUI website is located here (http://apachegui.net). Questions and comments can be sent to apachegui.net@gmail.com

Builds
----------------

ApacheGUI Builds are hosted on sourceforge. They can be accessed from the following link https://sourceforge.net/projects/apachegui/


Development Environment
---------------

ApacheGUI is currently a web application that has been bundled into a tomcat environment. The ApacheGUI source code is currently structured as an Eclipse web project. It can be imported to Eclipse using the EGit Eclipse plugin. 

Project Dependancies
---------------

ApacheGUI is dependant on the following project(s). It is not required to download these projects however a large amount of source code uses classes and methods in these projects.

- ApacheConfParser (https://github.com/jrossi227/ApacheConfParser). This project is packaged under *WebContent/WEB-INF/lib/ApacheConfParser-{version}.jar*.

Building ApacheGUI
----------------

####Build Dependancies

- Node js
- Ant 
- Java 1.6+
- Latest ApacheGUI build

####Linux / Mac OSX build steps
1. Download the latest build from the builds site (https://sourceforge.net/projects/apachegui/files/). A Build will follow the naming convention *ApacheGUI-{version}.tar.gz*.
2. Extract the build to a directory of your choice.
3. Edit *build/build.properties* and set *apachegui.home* to the location in step 2.
4. Navigate to the *build* directory.
5. Run the Ant options below.

######Ant options
- *ant war.all* minifies required javascript and builds a new war under *build/dist* 
- *ant war.dev* copies required javascript without minification and builds a new war under *build/dist* 
- *ant deploy* moves the war from *build/dist* to *apachegui.home/tomcat/webapps* this will re-depoly the application.
- *ant package* stops ApacheGUI and builds a new .tar.gz package. The file is put into the *package.dir* directory that is specified in *build/build.properties*.
