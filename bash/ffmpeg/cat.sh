#!/bin/bash
ls video[0-9]*.mp4 | awk '{ printf "file \x27%s\x27\n", $0 }' > videos.txt;
cat videos.txt
ffmpeg -f concat -i videos.txt -c copy video-concat.mp4;
rm videos.txt