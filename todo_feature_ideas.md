# videoground - todo list - possible features

<!-- 2D RENDERING -->


<!-- JSM -->

## () - rx - javaScript and JSM client systems, and Revision Number Selection
* () set REVISION const in constants.js set to '9_dev'
* () try bumping electionjs to 16.2.8 which is using chrome 96 and node 16.9
* () I will want a window-main-javascript html file for using a threejs revision by way of three.min.js
* () I will want a window-main-jsm html file for using three.module.js
* () add r91, r146, and r149 (or r150 if out ) for additional threejs revision options
* () add three.min.js for all revision where available
* () add three.module.js for all revisions where available
* () update README to reflect changes made in R9
* () REVISION in constants.js, and package.json set to 9 and commit with message '0.9.0'

<!-- PLUG IN SYSTEM -->
## () - rx - plugin system
* () set REVISION const in constants.js set to '10_dev'
* () try bumping electionjs to 17.4.11 which using chrome 98 and node 16.13
* () start an plugin system so that I have a way to start creating built in, and optional features
* () see about turning the export by frame feature the first built in plugin
* () start a new repo videoground-plugins that will work as a way to pull down optional plugins
* () have a diolog that can be used to pull up an index of plugins for this repo
* () have it so that more than one github url can be given
* () the first option plugin can be something like a javaScript formatter
* () update README to reflect changes made in R10
* () REVISION in constants.js, and package.json set to 10 and commit with message '0.10.0'

## () - rx - file open recent plugin
* () set REVISION const in constants.js set to '11_dev'
* () try bumping electionjs to 18.3.15 which is the latest for 18.x, might not work okay so be prepared to say with 17.x
* () This might need to be an optional plug in actually
* () see about having a file > Open Recent menu option

<!-- DAE LOADER REMOVAL -->

I would like remove the old DAE loader that I have in the core ov videoground in favor of having this kind of functionaly as an optional user space module.

## () - rx - remove dae loading feature
* () remove dae loading feature
* () I will see need a way to make sure legacy videos will work if I have a decent plugin system as this time

## () - rx - Clean sm object on each call of setup method
* () I will need to turn client.js into a module that returns a public API like clientMod
* () have a clientMod.createSM method
* () have a clientMod.setup method
* () have a createSM method in client.js
* () have a clean sm object on each call of 

<!-- LIBS -->

## () - rx - Logger lib
* () set REVISION const in constants.js set to '13_dev'
* () try bumping electionjs to to 20.3.12, might not work out okay so be ready to stay fixed at lateset stable
* () start a /lib/logger/index.js that will be the main logger lib used by all javaScript files
* () have a videoAPI.createLogger funciton that can be used to create a logger for each of the client files

<!-- USER INTERFACE -->

## () - rx - export to frames dialog?
<!-- /menu.js -->
* () I would still like to have an export to frames dialog
* () can click a browse button as a way to set/change export folder
* () see about starting a dialog in menu.js, just getting all the info there and being done with it.
<!-- settings.json -->
* () use settings.json to store a default folder for exporting frames
* () make the default location in the user data folder
* () create the folder if it is not there

## () - rx - file new option
* () set REVISION const in constants.js set to '12_dev'
* () try bumping electionjs to to 19.1.9, might not work out okay so be ready to stay fixed at lateset stable
* () start a file > new option in menu.js
* () use the hard coded start video as the start point for the new video
* () when creating a new file the fileName and filePath vm data object values should be null
* () use videoAPI.saveAsDialog in save event when fileName and filePath vm data object values are null
* () start a file > new from template option
* () have a way to set a templates location in settings.json

<!-- FFMPEG -->

## () - rx - ffmpeg bin as part of package
* I can add ffmpeg binaries as part of the over all end product and then write scripts to automate work
* I will want bins for each supported os kernal and arch (armhf and i368 Linux, and i386 Win 10)
```
https://johnvansickle.com/ffmpeg/
```
* the size of an ffmpeg bin is about 30mb, so I might want to just have one bin for each final os package

<!-- EXPORT OPTIONS -->

## () - rx - export menu, ffmpeg, and options
* start an export menu that will be the new home for 'export to images' in the File menu
* rename 'export to images' to just simply 'to images'
* I will want to start a 'to video' option
* the 'to video' export will still use 'to images' but will also call ffmpeg to create a video, and delete frames when done
* have an 'options' menu item that can be used to set a location for an ffmpeg bin to use

