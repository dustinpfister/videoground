﻿# Videoground

I wanted to make a real electronjs powered project that is a simple tool for making videos using threejs, vuejs, and a whole lot of vanilla javaScript code of my own. VideoGround is then the project that I came up with that I use to make videos that I post to [youtube at my javaweaver channel](https://www.youtube.com/user/javaweaver). So be sure to check out the channel if you would like to see what some content looks like using this tool.

<div align="center">
      <a href="https://www.youtube.com/watch?v=Mq37hBHx-Qc">
         <img src="https://img.youtube.com/vi/Mq37hBHx-Qc/0.jpg" style="width:50%;">
      </a>
</div>

The core idea of what I think this project should do is to just simply create a collection of png files for each frame as a means of exporting. Once I have a collection of images from there I can use a tool like ffmpeg to create a video file. Once I have a video file making a final product will then involve using additional software tools such as audacity, MuseScore, and OpenShot to add audio and preform any additional final processing type tasks.

## Install

If the latest revision will work okay just clone down a shallow copy with git. Once the folder is downloaded cd into the root of the folder and just do an npm install to get the version of electronjs that is set in the package.json file. Once everything is set up I can then just do an npm start to run videoground. If all works well the current state video should be displayed along with the source code for that video in the textarea element.

```
$ git clone --depth 1 https://github.com/dustinpfister/videoground
$ cd videoground
$ npm install
$ npm start
```
### Download a specific revision

The latest state of master might not always be the best revision to go with. So then there is cloning down a certain revision such as r4. To do so the process is more or less the same I will just want to add the -b option when using the clone sub command of git. Wile doing so I might want to name a different name for the folder such as vgr4 or something to that effect if I am going to have more than one revision to work with.

```
$ git clone -b "0.4.0" --depth 1 https://github.com/dustinpfister/videoground vgr4
$ cd vgr4
$ npm install
$ npm start
```

## How to start making videos

So then once videoground is up and running the nest question is how to get going making videos with this. In this section I will be going over what the options are when it comes to a hello world example, and where to find example videos to start with.

### Video Ground Hello world file

There are a number of feature to cover when it comes to everything there is to work with the core of videoground. However for now it might be best to just have a simple hello world example in the readme file here.

```js
// init method for the video
VIDEO.init = function(sm, scene, camera){
    // static camera
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    // GRID HELPER, Background
    scene.add(new THREE.GridHelper(8, 8));
    scene.background = new THREE.Color(0, 1, 1);
    // MESH
    let mesh = scene.userData.mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
};
// update method for the video
VIDEO.update = function(sm, scene, camera, per, bias){
    let mesh = scene.userData.mesh;
    mesh.position.x = -4 + 8 * sm.bias;
};
```

The two main functions to define in the javaScript file are VIDEO.init, and VIDEO.update. The init function will be called once to set up things, that the update function is how to go about updating things on a frame by fame basis.

### The start-videos folder of this repo

In the [start-videos folder](https://github.com/dustinpfister/videoground/tree/master/start-videos) I have a number of video files that are intended to be starting points for projects, but are also used to just demonstrate or test features of videoground itself while I work on it. One of these files will be the official start video that will be used each time video ground starts for the first time. 

### My videoground-blog-posts repository

Thus far I just have one content repository called [videoground-blog-posts](https://github.com/dustinpfister/videoground-blog-posts) where I have a massive collection of videos made using this program. As the name suggests this is a repo of videos that are to be used as video embeds for my [blog posts on threejs](https://dustinpfister.github.io/categories/three-js/).

## Official js files

On top of the core of what videoground is I should also have a number of official javaScript files that are to be used with video javaScript files. When I make an additional content repository I will want to have javaScript files that center around what the nature of the content is that I might not want to include in the core of videoground itself. Still there are some usual suspect module that I will likely want to include in the core of videoground. What I have in terms of these javaScript modules can be found in the start videos folder as of r5.

## Creating a video from frame images with ffmpeg

If I have a folder of png files in the range of 'frame-0000.png' to 'frame-9999.png', then using ffmpeg with the -i option should work with the value 'frame-%04d.png'. I will then want to add any additional options such as setting the framerate, and of course I will want to give an output file.

```
$ ffmpeg -framerate 30 -i frame-%04d.png -pix_fmt yuv420p output.mp4
```


## Getting this to work well on raspberry PI OS

I like using raspberry pi computers and with that the raspberry pi OS Linux based operating system. With that I have run into a lot of problems getting various things to work that have to do with 3d. For one thing I like to use blender to make DAE Files, but late versions of blender will not work on raspberry pi OS because the openGl requirements are to high. Still as far as getting video ground itself to work on rpi I have had success by making use of some fixes with flags when calling the electronjs binary, and also using older versions of the electronjs binary and thus also nodejs and chrome.

### Be sure to call the electronjs binary with the no-sandbox flag

I came into a problem with syscall 0403 when trying to run the electronjs binary on a late version of raspberry pi os \( bullseye \). I have [found a solution to this](https://github.com/electron/fiddle/issues/900) that involves passing the no sandbox flag when calling the electronjs binary. So I added this to the start script of the package.json file. So when I do a npm start the flag will be used.


```
  "scripts": {
    "start": "electron --no-sandbox ."
  },
```

### The latest is not always the greatest

Late versions of electronjs will not work at all, or will work with significant problems. So then I am keeping the version of electronjs and thus also node and chrome fixed at the latest revisions of cretin older major releases. Revisions r0 threw r5 have been using 10.4.7 of electronjs.

```
r0 – r5:
  electron: 10.4.7
  node: 12:16.3
  chrome: 85.0.4183.121
```

On raspberry pi os buster chromium 90.x is used, and on bullseye I am seeing 101.x when it comes to the builds in the official repos that are installed out of the box. So when updating to later versions of electronjs I will likely want to keep things in that range. Bleeding edge versions of electronjs using chrome 104+ do not seem to be working so great at the time of this writing.


## What the goals are with this project

When it comes to what the goals are in terms of adding features there is only so much that I might want to add. If I do keep working on this I am going to end up completing the core set of features that I want. Once that is done I am going to want to be a little more reserved about adding features, choosing to move forward with features that I only really truly want and need. In fact as of r3 I would say I am all ready at a point where the goal is to just refine the features that I all ready have in place.


