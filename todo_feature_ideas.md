# videoground - todo list - possible features

## () - rx - run button
* () make it so that the the state is not updated with each key press, have a 'run' button

## () - rx - ffmpeg bin as part of package
* I can add ffmpeg binaries as part of the over all end product and then write scripts to automate work
* I will want bins for each supported os kernal and arch (armhf and i368 Linux, and i386 Win 10)
```
https://johnvansickle.com/ffmpeg/
```
* the size of an ffmpeg bin is about 30mb, so I might want to just have one bin for each final os package

## () - rx - export menu, ffmpeg, and options
* start an export menu that will be the new home for 'export to images' in the File menu
* rename 'export to images' to just simply 'to images'
* I will want to start a 'to video' option
* the 'to video' export will still use 'to images' but will also call ffmpeg to create a video, and delete frames when done
* have an 'options' menu item that can be used to set a location for an ffmpeg bin to use

### () - rx - 
<!-- ./html/js-ui-video-code.js -->
* I will want vm.$data.filePath, vm.$data.fileDir, and vm.$data.fileName to help address some confusion
* start another text area that will be used as a means to display what is wrong, rtaher than using the javaScript console
<!-- world-position.js -->
* finish the world-position.js file in videoground-betaworld and make that part of the js folder hear also