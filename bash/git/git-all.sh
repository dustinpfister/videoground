#!/bin/bash

# path where git folders are ( "/home/pi/Documents/github_dustinpfister" )
gitpath=$1

# git sub command (pull push status)
gitcomm=$2

folders=$( ls -p $gitpath | grep -e / | cut -d / -f 1 )
cpwd=$( pwd );
for folder in $folders; do
  cd "${gitpath}/${folder}"
  echo -e "----------\n"
  echo -e "running a git ${gitcomm} for ${folder} \n\n"
  git $gitcomm
  echo -e "----------\n"
done
cd $cpwd