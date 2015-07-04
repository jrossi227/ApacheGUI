if [ $UID -ne 0 ]; then
  sudo ../tomcat/bin/startup.sh
  exit
fi

exec ../tomcat/bin/startup.sh 
