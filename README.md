Website 
---------------

The ApacheGUI website is located here [http://apachegui.net](http://apachegui.net). Questions and comments can be posted on the [forum](http://forum.apachegui.net) or sent directly to apachegui.net@gmail.com.

Packages
----------------

ApacheGUI Packages are hosted on sourceforge. They can be accessed from the following link [https://sourceforge.net/projects/apachegui/](https://sourceforge.net/projects/apachegui/)


Development Environment
---------------

ApacheGUI is a Maven enabled web project. The project is portable and can be imported to any Java IDE as a Maven project.  

Project Dependancies
---------------

ApacheGUI is dependant on the following project(s). It is not required to download these projects however a large amount of source code uses classes and methods in these projects. The code from these projects are included as a Maven dependencies.

- ApacheConfParser ([https://github.com/jrossi227/ApacheConfParser](https://github.com/jrossi227/ApacheConfParser)). This library is used to parse the Apache Server configuration. This library is included as a Maven dependency.
- ApacheGUIJdbc ([https://github.com/jrossi227/ApacheGUIJdbc](https://github.com/jrossi227/ApacheGUIJdbc)). This library is used to communicate with the internal SQLite database that ApacheGUI uses. This library is included as a Maven dependency.

Building ApacheGUI
----------------

Although Windows is fully supported, it is recommended to use a Linux or Mac OSX distribution when developing ApacheGUI. This is because Apache and Tomcat run more efficiently on IX based distributions.

####Build Dependancies

- Node js
- Maven 2+
- Java 1.6+
- Latest ApacheGUI package

####Linux / Mac OSX build steps
1. Set the *environment* property in pom.xml to IX. The *apachegui.home* property uses the environment property to determine the location of ApacheGUI.
2. Navigate to the root directory in the source project (Where pom.xml is located).
3. Run the Maven builds below.

######Maven options
- ```mvn clean deploy -P prod``` minifies required javascript and builds a new war under the *target* directory. 
- ```mvn clean deploy -P dev``` copies required javascript without minification and builds a new war under the *target* directory. This task is meant to speed up war builds for development. 
- ```mvn clean install -P prod``` minifies required javascript and builds a new war under the *target* directory. The war is then moved from the *target* directory to *[apachegui.home]/tomcat/webapps*. This will re-deploy the application.
- ```mvn clean install -P dev``` copies required javascript without minification and builds a new war under the *target* directory. The war is then moved from the *target* directory to *[apachegui.home]/tomcat/webapps*. This will re-deploy the application. This task is meant to speed up war builds for development. 
- ```mvn antrun:run -P package``` stops ApacheGUI and builds a new .tar.gz archive. The .tar.gz archive is put into the *package.dir* directory that is specified in the pom.xml properties.

####Windows

1. Set the *environment* property in pom.xml to Windows64 or Windows32 depending on your WIndows architecture. The *apachegui.home* property uses the environment property to determine the location of ApacheGUI.
2. Navigate to the root directory in the source project (Where pom.xml is located).
3. Run the Maven builds below.

######Maven options
- ```mvn clean deploy -P prod``` minifies required javascript and builds a new war under the *target* directory. 
- ```mvn clean deploy -P dev``` copies required javascript without minification and builds a new war under the *target* directory. This task is meant to speed up war builds for development. 
- ```mvn clean install -P prod``` minifies required javascript and builds a new war under the *target* directory. The task then stops ApacheGUI, moves the war from the *target* directory to *[apachegui.home]/tomcat/webapps* and starts ApacheGUI. This will re-deploy the application.
- ```mvn clean install -P dev``` copies required javascript without minification and builds a new war under the *target* directory. The task then stops ApacheGUI, moves the war from the *target* directory to *[apachegui.home]/tomcat/webapps* and starts ApacheGUI. This will re-deploy the application. This task is meant to speed up war builds for development. 
- ```mvn antrun:run -P package``` stops ApacheGUI and builds a new .zip archive. The .zip archive is put into the *package.dir* directory that is specified in the pom.xml properties.
