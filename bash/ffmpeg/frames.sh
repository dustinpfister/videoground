#!/bin/bash
ffmpeg -framerate 30 -i frame-%04d.png -pix_fmt yuv420p video.mp4;