#!/usr/bin/env bash
#
#
#   A start bash script for this npm project that works well for me in Ubuntu 22.04 LTS
#   I was using bash v5.1.56 and npm 10.2.4
#   disown is a bash builtin command, check the man page for your version of bash ( $ man bash )
#
#   like any bash script start with bash, or make it executable with chmod and then run it
#
#   $ bash start.sh
#
#   $ chmod +x start.sh
#   $ ./start.sh
#
#

npm start &> /dev/null & disown 


