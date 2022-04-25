# Videoground

This is an idea for an electron.js application that I am calling videoground, which is a play on the words 'video', and 'playground'. In other words the main goal with this project is to just simply have fun with electronjs, threejs, vuejs, my own vanilla javaScript code to make a cool project that can be used to make videos. 

The core idea of what I think this project should do is to just simply create a collection of png files for each frame as a means of exporting. Once I have a collection of images from there I can use a tool like ffmpeg to create a video file. Once I have a video file making a final product will then involve using additional software tools such as audacity, MuseScore, and OpenShot to add audio and preform any additional final processing type tasks.


## What the goals are with this project

When it comes to what the goals are in terms of adding features there is only so much that I might want to add. If I do keep working on this I am going to end up completing the core set of features that I want. Once that is done I am going to want to be a little more reserved about adding features, choosing to move forward with features that I only really truly want and need. In fact as of r3 I would say I am all ready at a point where the goal is to just refine the features that I all ready have in place.

* ( done in r0 ) export as images so that ffmpeg can be used to create a video that way
* ( done in r1 ) I will want to be able to load dae files, and any supporting assets in terms of textures used
* ( done in r2 ) I will want to be able to load scripts for each video file
* ( done in r3 ) I should go with just one 'youtube friendly' resolution

## Official js files

On top of the core of what videoground is I should also have a number of official javaScript files that are to be used with video javaScript files.

* ( done in r3 ) canvas.js - to create and update canvas textures to use in materials
* ( done in r3 ) guy.js - My old guy model that I made a while back
* ( done in r3 ) guy-canvas.js - canvas draw methods to use with guy.js
* ( done in r3 ) helper-vertex-normals.js - the threejs file for this to help show what is going on with the normal attribute of geometry
* ( done in r3 ) I will want a module that can be used to define 'sequences' like that in my test vjs system that I was using to make videos

## Official start-videos

In the start-videos folder I have a number of video files that are intended to be starting points for projects, but are also used to just demonstrate features of videoground itself, as well as official additional features such as the canvas.js file to create canvas textures.

## Creating a video from frame images with ffmpeg

If I have a folder of png files in the range of 'frame-0000.png' to 'frame-9999.png', then using ffmpeg with the -i option should work with the value 'frame-%04d.png'. I will then want to add any additional options such as setting the framerate, and of course I will want to give an output file.

```
$ ffmpeg -framerate 30 -i frame-%04d.png -pix_fmt yuv420p output.mp4
```

## Getting this working

with the root of this folder as the current working folder just do an npm install, and then an npm start.

```
$ npm install
$ npm start
```

