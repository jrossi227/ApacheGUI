if [ $UID -ne 0 ]; then
  sudo ../tomcat/bin/shutdown.sh
  exit
fi

exec ../tomcat/bin/shutdown.sh 
