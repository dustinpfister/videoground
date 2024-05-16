# Videoground

I wanted to a make tool for creating videos using electronjs, threejs, and a whole lot of vanilla javaScript code to create video projects. VideoGround is then the project that I came up with that I use to make videos that I post to my [javaweaver Youtube channel](https://www.youtube.com/user/javaweaver) that I also embed into [my blog posts on threejs](https://dustinpfister.github.io/categories/three-js/). So you can check out the channel if you would like to see what some content looks like using this tool.

<div align="center">
      <a href="https://www.youtube.com/watch?v=Mq37hBHx-Qc">
         <img src="https://img.youtube.com/vi/Mq37hBHx-Qc/0.jpg" style="width:50%;">
      </a>
    <p>
        Video for my <a href="https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-biplane-group">biplane group threejs project</a> that also uses a <a href="https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-object-grid-wrap-land">land module</a> that works on top my <a href="https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-object-grid-wrap">grid wrap module</a> that I use often in projects
    </p>
</div>

## What the goals where with this project

I was able to get the core set of goals that I wanted with this project done right away, however it is true that I first set the bar very low for myself on this one. I just simply wanted to make a tool that I can use to create a whole bunch of frame images with some javaScript code on top of threejs, and have a basic interface to work with some high level javaScript code that runs on top of this. I can then take it from there by using ffmpeg, and other tools to create a final video product that can then be uploaded to YouTube. Sense then I have starting to take note of new features and changes I would like to make from there on out, and thus far this has been the case on a revision by revision basis.

* R0 - Basic frame by frame export feature working
* R1 - Built in feature for loading \*.dae files
* R2 - Can load additional scripts without hacking over video ground source code
* R3 - Resolution modes in place
* R4 - New scene object each time javascript code is loaded again
* R5 - VIDEO.init method can be used to return a promise, allows using all kinds of loaders
* R6 - RUN button over auto running code as it is being edited
* R7 - User data folder, last video on start
* R8 - Start and end frame render range feature
* R9 - Simple 2D canvas rendering, VIDEO.update methods can now return a Promise

## What the current goals with this project are ( R10+ )

The main idea I have now in R10 has to do with writing data in general along with the frames. The main interest with this is to create audio sample data to use with the aplay command, or directly author a wav file, but this can of course have all kinds of applications beyond that. Other use cases would have to do with logging debug data out in plain text, or html format, or create any kind of data alone with the frames.

## Frame by Frame Exporting

The main way of exporting thus far is as a collection of png files for each frame written to a target export folder in the OS file system. Once I have a collection of images from there I can use a command line tool like [ffmpeg](https://ffmpeg.org/) to create a video file from this collection of image files. I can then take that raw video file made from the frames, and create another video file with ffmpeg, or any video editing program for that matter. There I can include an audio track that is made with additional software tools like [Musescore](https://musescore.org/en), [Audacity](https://www.audacityteam.org/) and anything else that can be used to work out what the audio track should be.

Exporting this way may not be preferred for many reasons that I do not care to get into detail with here. However I have found that this is just simply a tired yet true way of exporting that has not broken for me yet. This kind of exporting will still work just fine when it comes to sticking to short 30 second to maybe at most 10 minute videos. After that the shortcomings of this form of exporting do start to become a bit a pain but might still be workable. If I do keep working on this project maybe I will get around to having better export options, but in any case this kind of export must always work as a fall back of sorts in the event that other options break.

## Install

As of thing writing I am just committing directly to the master branch. Still of the latest state of the project works okay there is just cloning down a copy, cd into the folder, and then do an npm install. After that one can just call npm start to run videoground. When cloning down one might want to make the depth 1 so that you do not pull down the full commit history.

```
$ git clone --depth 1 https://github.com/dustinpfister/videoground
$ cd videoground
$ npm install
$ npm start
```

### Download a specific revision

The latest is not always the greatest when it comes to many things with software. When it comes to videoground the latest state of master might not always be stable. It then might be a good idea to clone down a certain revision such as R8 for example. 

To install a specific revision number the process is more or less the same. I will just want to add the -b option when using the clone sub command of git. While doing so I might want to name a different name for the folder such as vgr8 or something to that effect if I am going to have more than one revision to work with on a system. 

```
$ git clone -b "0.9.0" --depth 1 https://github.com/dustinpfister/videoground vgr6
$ cd vgr6
$ npm install
$ npm start
```

## How to start making videos

Once videoground is up and running the next question is how to get going making videos with this. There is a whole lot of ground to cover with that one, I am making a lot of changes at the time of this writing, and there is also no official DOCS at this time. So for now it would be best to just look at the source code of the start videos, and additional content repositories that I have set up thus far. In this section I will be going over what the options are when it comes to a hello world example, and where to find example and project videos.

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

As of R6 there are at least two methods that I would want to define for the main VIDEO API. There is the init method that will be called once to set up the scene object, and do anything and everything that needs to happen to set up the video. The init method can return a promise and this will delay the calling of the update method for the first time. The update method is then the other method that I would want to define when it comes to what I want to do on frame by frame basis.

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

### The start-videos folder of this repo

In the [start-videos folder](https://github.com/dustinpfister/videoground/tree/master/start-videos) I have a number of video files that are intended to be starting points for projects, but are also used to just demonstrate or test features of videoground itself while I work on it. One of these files will be the official start video that will be used each time video ground starts for the first time. 

### My Content repos

Thus far I just have two PUBLIC content repositories one called [videoground-blog-posts](https://github.com/dustinpfister/videoground-blog-posts), and the other is called [videoground-beta-world](https://github.com/dustinpfister/videoground-beta-world). As the name suggests with videoground-blog-posts this is a repo of videos that are to be used as video embeds for my [blog posts on threejs](https://dustinpfister.github.io/categories/three-js/). The other collection is called videoground-beta-world and that one is being used as a dumping ground for experimental content that may or may not lead to other collections of content.

## Creating a video from frame images with ffmpeg

Once I use the export to frames feature I will then want to use software outside of videoground to create a raw video, as well as a final result for upload. Although I am sure there are a number of options for making a video from a collection of frame files I have come to like to use ffmpeg from the command line.

### Create raw video from frames

If I have a folder of png files in the range of 'frame-000000.png' to 'frame-999999.png', then using ffmpeg with the -i option should work with the value 'frame-%06d.png'. I will then want to add any additional options such as setting the framerate, and of course I will want to give an output file. When doing so I will want to set the yuv420p pixel format for the output file. I have also found that I can also sneek in an audio source along with the frames so I only have to render once. When adding audio I have found that I will also want to set the audio quality as well such as 192k.

```
$ ffmpeg -framerate 30 -i frame-%06d.png -i video.wav -b:a 192k -pix_fmt yuv420p raw.mp4
```

### Create a final video from raw video and audio

If I just have a raw video file made from the frames alone, ffmpeg can once again be used to create a final video with an audio file. To do this I will just need to give the video and audio files as import source files, and then the final output file that I want.

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

## LICENSE

I am declaring all of the original source code that I have written under the terms of the GPL V2 LICENSE. This repo contains some borrowed source code which is of course under the terms of the respective licenses of those projects. Many of which are also GPL or MIT licensed projects.
