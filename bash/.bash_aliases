# ffmpeg
alias ffvg='ffmpeg -framerate 30 -i frame-%04d.png -pix_fmt yuv420p video.mp4'
alias ffvg-frames='/home/pi/bash/ffmpeg/cat.sh'
alias ffvg-cat='/home/pi/bash/ffmpeg/cat.sh'

# git
alias add='git add . '
alias a='git add . '
alias status='git status'
alias s='git status'
alias pull='git pull'
alias push='git push'
alias commit='git commit -m '
alias gitl='git log -n 100 --format="%H : %s"'
alias cl='git gc'
# alias for pullall pushall, statall
. ~/bash/git/bash_aliases

# some more ls aliases
alias ll='ls -l'
alias la='ls -A'
alias l='ls -CF'

# chmod
# make all *.sh files in pwd executable for the owner
alias ea='chmod 755 *.sh'

# nodejs bins
alias node8='/home/pi/node/node-v8.17.0-linux-armv7l/bin/node'
alias node14='/home/pi/node/node-v14.17.6-linux-armv7l/bin/node'
alias node16='/home/pi/node/node-v16.9.1-linux-armv7l/bin/node'

# grunt
alias gc='grunt commit'
