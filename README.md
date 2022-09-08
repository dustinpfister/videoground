# Videoground

I wanted to make simple tool for making videos using electronjs, threejs, vuejs, and a whole lot of vanilla javaScript code of my own. VideoGround is then the project that I came up with that I use to make videos that I post to [youtube at my javaweaver channel](https://www.youtube.com/user/javaweaver). So be sure to check out the channel if you would like to see what some content looks like using this tool.

<div align="center">
      <a href="https://www.youtube.com/watch?v=Mq37hBHx-Qc">
         <img src="https://img.youtube.com/vi/Mq37hBHx-Qc/0.jpg" style="width:50%;">
      </a>
    <p>
        Video for my <a href="https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-biplane-group">biplane group threejs project</a> that also uses a <a href="https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-object-grid-wrap-land">land module</a> that works on top my <a href="https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-object-grid-wrap">grid wrap module</a> that I use often in projects
    </p>
</div>


The core idea of what I think this project should do is to just simply create a collection of png files for each frame as a means of exporting. Once I have a collection of images from there I can use a tool like ffmpeg to create a video file from the command line. I can then take a raw video file made from the frames and create another video file with ffmpeg that will include an audio track that is made with additional software tools like [Musescore](https://musescore.org/en) and [Audacity](https://www.audacityteam.org/).

## What the goals are with this project

When it comes to what the goals are in terms of adding features there is only so much that I might want to add. If I do keep working on this I am going to end up completing the core set of features that I want. Once that is done I am going to want to be a little more reserved about adding features, choosing to move forward with features that I only really truly want and need. In fact as of r3 I would say I am all ready at a point where the goal is to just refine the features that I all ready have in place for the most part. I have made a lot of videos with this all ready, so in a way this is all ready a done deal.

## Install

If the latest revision will work okay just clone down a shallow copy with git. Once the folder is downloaded cd into the root of the folder and just do an npm install to get the version of electronjs that is set in the package.json file. Once everything is set up I can then just do an npm start to run videoground. If all works well the current state video should be displayed along with the source code for that video in the textarea element.

```
$ git clone --depth 1 https://github.com/dustinpfister/videoground
$ cd videoground
$ npm install
$ npm start
```
### Download a specific revision

The latest is not always the greatest when it comes to many things with software, often things go in a direction in which there are just to many features packed into a single application. However when it comes to videoground the latest state of master might not always be stable regardless if I keep this minimal or not. It then might be a good idea to clone down a certain revision such as r4 for example. 

To install a specific revision number the process is more or less the same. I will just want to add the -b option when using the clone sub command of git. While doing so I might want to name a different name for the folder such as vgr4 or something to that effect if I am going to have more than one revision to work with on a system.

```
$ git clone -b "0.4.0" --depth 1 https://github.com/dustinpfister/videoground vgr4
$ cd vgr4
$ npm install
$ npm start
```

## How to start making videos

So then once videoground is up and running the next question is how to get going making videos with this. There is a whole lot of ground to cover with that one as I use, and keep making all kinds of additional javaScript module that I use to make videos. In this section I will be going over what the options are when it comes to a hello world example, and where to find example videos to start with in other content projects that I have made thus far.

<div align="center">
    <a href="https://www.youtube.com/watch?v=AzuB6ExUE64">
        <img src="https://img.youtube.com/vi/AzuB6ExUE64/0.jpg" style="width:50%;">
    </a><br>
    <p>
        <a href="https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-weird-face-1">Weird Face one</a> from my 
        <a href="https://dustinpfister.github.io/2021/02/19/threejs-examples/">threejs example Project Collection</a>
    </p>
</div>

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

Once I use the export to frames feature I will then want to use software outside of videoground to create a raw video, as well as a final result for upload. Although I am sure there are a number of options for making a video from a collection of frame files I have come to like to use ffmpeg from the command line.

### Create raw video from frames

If I have a folder of png files in the range of 'frame-0000.png' to 'frame-9999.png', then using ffmpeg with the -i option should work with the value 'frame-%04d.png'. I will then want to add any additional options such as setting the framerate, and of course I will want to give an output file.

```
$ ffmpeg -framerate 30 -i frame-%04d.png -pix_fmt yuv420p raw.mp4
```

### Create a final video from raw video and audio

After I have my raw video file made from the frames, ffmpeg can unce again be used to create a final video with an audo file.

```
$ ffmpeg -i raw.mp4 -i bv-001-16m-30s.mp3 final.mp4
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

Late versions of electronjs will not work at all, or will work with significant problems. So then I am keeping the version of electronjs and thus also node and chrome fixed at the latest revisions of cretin older major releases. Revisions r0 threw r5 have been using 10.4.7 of electronjs. As of r6 forward I am starting to creep things forward but only to a certain point at this time because of limitations of the hardware and software used with a raspberry PI.

```
r0 – r5:
  electron: 10.4.7
  node: 12:16.3
  chrome: 85.0.4183.121
r6 - 
  electronjs: 13.6.9
  node 14.16.0
  chrome: 91.0.4472.164
```

On raspberry PI os buster chromium 90.x is used, and on bullseye I am seeing 101.x when it comes to the builds in the official repos that are installed out of the box. So when updating to later versions of electronjs I will likely want to keep things in that range. Bleeding edge versions of electronjs using chrome 104+ do not seem to be working so great at the time of this writing.

