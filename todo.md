# videoground todo list

## Known problems
* () - #0 - I have to disable CSP to get vuejs to work in the html files that I use in the html folder
* () - #1 - I am using eval to run javaScript code in the textarea element in html/js/client.js
* () - #2 - WINDOWS: when I reload from dev tools some times the video loads other times it does not in windows
* ( fixed in r1 ) - #3 - textures for dea files do not show up until frame+ or frame- is clicked
* ( fixed in r3 ) - #4 - WINDOWS: texture files will not load correctly in windows
* ( fixed in r2 ) - #5 - script tags keep being added each time a video is loaded
* ( fixed in r5 ) - #6 - it looks like scripts are not run in order of the index value, this should be the case
* ( fixed in r5 ) - #7 - syscall 0403 error running on rpi os bullseye see: https://github.com/electron/fiddle/issues/900
* ( fixed in r6 ) - #8 - videoAPI.webGL2-test-pass set true
* () - #9 - videoAPI.webGL2-test-pass still false when read client side look into another way to store state
* () - #10 - error loading dae textures when loading from more than one folder

## () - r9 - VIDEO.render, simple 2d rendering, update promise
* (done) have a sm.canvas be a plain old 2d canvas that is created once in video-setup.js
* (done) I will want a VIDEO.render function
* (done) if no VIDEO.render is defined in the video file, then the defualt action should be just what is all ready in place with this
* (done) video20-r9-start.js video demos new 2d rendering feature
* (done) sm.setDefaults method

<!-- update promise methods -->
* (done) work more on /lib/range-read to create the funcitons that I want to use for videoAPI.read
* (done) get alpha values working for rangeRead.read
* (done) I will want to have a videoAPI.read method that will use the fs.read method
* (done) video20-r9-start: makes use of videoAPI.read using the all ready in place promise feature of Video.init methods
* (done) video-setup: the sm.setFrame method will need to be updated to make use of any promise that might be there
* (done) video-setup: the loop method will need to be updated to step frame count when promise is resolved

* () ui-playback: vm.setFrame will need to return the promise returned by calling sm.setFrame
* () ui-playback: the writeFrame helper will need to be updated so that VideoAPI.writeFrame is called after promise is resolved

* () video20-r9-start: change what the byte range is from frame to frame

* () REVISION in constants.js, and package.json set to 9 and commit with message '0.9.0'

## ( done 06/11/2023 ) - r8 - render frames x to y
* (done) set REVISION const in constants.js set to '8_dev'
* (done) start a video19-r8-start.js file and make it the start video in constants.js
* (done) the 'set max frame' just calls the same set frame method, so I removed it.
* (done) call 'set frame' to 'set frame to target'
* (done) have an sm.render\_frame\_start as well as sm.render\_frame\_end
* (done) can set new sm render values in vm template
* (done) make video19-r8-start.js just a simply collection of moving shapes
* (done) fix bug with frame step - button not wrapping around
* (done) setting render range values to typical values after calling video init method
* (done) see about adding a keyboad shortcut for export to frames ctrl+e
* (done) REVISION in constants.js, and package.json set to 8 and commit with message '0.8.0'

## ( done 03/19/2023 ) - r7 - Settings.json,  last video on start
* (done) new REVISION const in preload.js set to '7_dev' string
* (done) try bumping electionjs to 14.2.9 that uses chrome 93 and node 14
* (done) add r146 to html/js/threejs
* (done) display REVISION const in about menu
* (done) new video18-r7-start.js file that will just be the new start video for this revision.
* (done) rename all the older start videos as video\[VIDNUMBER\]-r\[REVISION\]-\[DESC\]
* (done) make a settings.json file in the user data folder
* (done) use settings.json to set the location of a video file to start with
* (done) I will want a new videoAPI.getSettings method that will load the current state of settings.json
* (done) use the new videoAPI.getSettings method in ui-video-code.js to get the current start video uri
* (done) use the uri video start key in settings.json as the start video
* (done) use setings.json to set the start folder for opening or saving a file
* (done) update start file uri on each save of a file
* (done) client.js is to vague, just make it all part off video-setup.js
* (done) CSS: make it so that it is clear as to what is part of ui-playback and ui-video-code
* (done) see about making the start folder always be the same as the start file when opening a new file
* (done) looks like I am going to need a constants.js file
* (done) move new constants.js file to lib folder
* (done) README.md for constants.js
* (done) using webGL1Renderer
* (done) start folder location for saveAs should also be the same for open
* (done) I will want a helper function in menu.js for code that I am reparting for each menu action such as open, save as, ect
* (done) rename menuSaveFile event to menuSaveAsFile event
* (done) start a new menuSaveFile event
* (done) have a file > Save menu option that will directly save the file if there is a filename
* (done) have a videoAPI.saveAsDialog method that can be used from ui-video-code.js
* (done) Ctrl+s shortcut for save
* (done) Cyrl+o shortcut for open
* (done) removed vars that are not used anymore
* (done) make sec, fps-update, fps-movement, and lt part of sm object
* (done) using Object.assign to append to sm object
* (done) removed camera, renderer, and scene globals in favor of sm.camera, ect
* (done) current RESOLUTION as sm.res
* (done) have a resolution selection element for ui-playback
* (done) it would be nice to make the preview canvas bigger or smaller
* (done) pass false when setting size in sm.setup
* (done) make 720p the default res
* (done) LF to CRLF End Of Line Conversion
* (done) vm.$data.unsaved\_changes in ui-video-code.js
* (done) setTitle helper function in ui-video-code.js
* (done) update title on each text change event in ui-video-code.js
* (done) update title on each call of setFilePath in ui-video-code.js
* (done) asterisk in title when there are unsaved changes
* (done) fix bug where unsaved-changes does not go back to false when content goes back to the way it was
* (done) fixed a bug where a starting option for res was not being set to start with 
* (done) update README to reflect changes made in R7
* (done) REVISION in constants.js, and package.json set to 7 and commit with message '0.7.0'

## ( done 02/17/2023 ) - r6 - run button, User Data Folder started, Webgl test, help menu, VIDEO #17
* (done) bump electronjs up to 13.6.9
* (done) start VIDEO 17 that will be about a simple webgl2 test
* (done) make VIDEO 17 the start video
* (done) menuAbout event started
* (done) Display the result of this webgl test in the help about menu 
* (done) I will want to have a webgl2 test that involves using the isWebgl2 boolean of a webgl renderer
* (done) see about fixing #8
* (done) start a user data folder using code based off of the electronjs example for this
* (done) start system.json file in new user data folder
* (done) frame-dddddd.png in place of frame-dddd.png
* (done) start a videoAPI.log method
* (done) log method for ui-video-code.js
* (done) use log method of ui-video-code.js for all console.logs in the file
* (done) have new textChange method for ui-video-code.js that is called when text changes, but does nothing
* (done) add a new run button to the template, and have that call the updateVideo method
* (done) add a run button for the ui in video-code-ui.js
* (done) textarea-js CSS class for the text area for js input
* (done) add LICENSE
* (done) update readme file with legal section
* (done) update readme one last time before 0.6.0 tag


## ( done 08/16/2022 ) - r5 - Better running of scripts, VIDEO.init promise feature, video #15 #16
* (done) see about fixing #6 and make video #15 about that
* (done) videoAPI.loadFile returns a promise in preload.js
* (done) f5 for reload in Linux only for now because of #2 that is still a problem
* (done) add a feature where a promise can be returned by the VIDEO.init method of a video
* (done) make changes needed to client.js for new VIDEO.init feature
* (done) start a video 16 in which I am testing this out with the Buffer Geometry loader
* (done) videoAPI.writeJSFile returns a promise
* (done) videoAPI.writeFrame returns a promise
* (done) see if just adding --no-sandbox flag when calling electron binary will fix #7
* (done) update about dialog to display version of electronjs, and thus also nodejs and cromeium versions
* (done) update ui-video-code to use writeJSFile promise style
* (done) update ui-playback to use writeFrame promise style
* (done) remove old rev and bash folders 
* (done) update readme file with install section
* (done) update readme one last time before 0.5.0 tag

## ( done 07/28/2022 ) - r4 - new scene object on each run of sm.setup, sm.renderer, video #13, #14
* (done) passing sm.scene rather than scene var local to client.js in client.js
* (done) creating new Scene object on each call of sm.setup in client.js 
* (done) no longer setting background to black in sm.setup in client.js
* (done) passing sm.camera rather tha camera when calling VIDEO.update in client.js
* (done) using sm.camera, and sm.scene when calling renderer in sm.setFrame method in client.js
* (done) videoAPI.uri_startvideo value in preload.js
* (done) making use of videoAPI.uri_startvideo in ui-video-code.js
* (done) start video #13 in which I switch between a perspective and orthographic Camera
* (done) make video #13 the new start video
* (done) sm.renderer prop added to sm object in client.js
* (done) calling sm.renderer in update method of client.js
* (done) start video #14 in which I create a new renderer in an init method
* (done) sm.replaceRenderer method added as a way to update sm.renderer as well as sm.canvas
* (done) sm.camera created on each call of sm.setup
* (done) use shadows and other custom render features in video14
* (done) see about using WebGL1Renderer

## ( done 07/26/2022 ) - r3 - Resolution modes, video7-13 world-position.js
* (done) start a new canvas.js file that will contain the createCanvasObject method from guy-canvas.js
* (done) def draw method class built into the module
* (done) a def.stripes method
* (done) start a def.randomGrid method
* (done) color channel range options for def.randomGrid
* (done) remove createCanvasObject method and make this file about the custom canvas textures to use with guys.js
* (done) update video6 as needed, fixing any code breaking changes
* (done) reduce spacing between arms and body
* (done) Add a moveArms method and use that in the walk method
* (done) start a new video7 start video that will make use of all features thus far
* (done) use at least one dae file in video7
* (done) use guy.js script
* (done) use guy-canvas.js
* (done) use canvas.js
* (done) tweak color range for grass
* (done) set default scene background color to black
* (done) have more than one resolution or stick to one of the youtube friendly options with this such as 640x360
* (done) have a getRatio helper in client.js and use that to set the scaled size of the canvas
* (done) start video8.js in which I am making use of raycaster to get the position on the surface of a geometry of a mesh
* (done) For this video the mesh I will have a mesh with a sphere geometry and a mesh with the box geometry
* (done) I should be able to find a way to use raycaster as a way to set the position of the box mesh to the surface of the sphere
* (done) start a world.dae file that will be a sphere like object but with mountains and valleys
* (done) start a video9 file that will be just like video8 only I will be using world.dae, and world-position.js
* (done) display current file name in title
* (done) do way with file path display in ui
<!-- video 10 -->
* (done) start video10.js start video that will be on custom geometry
* (done) start with a geometry of just 6 Vertices in terms of position values, that will be two triangles then
* (done) change the position values over time
* (done) see about adding normals, and using the normal/depth materials
* (done) see about adding one more face
* (done) move more that one point
<!-- video 11 -->
* (done) start a new video 11 based off of video 10
* (done) this will be the same thing only now I will want to see about setting up groups for each face
* (done) use an array of materials and set a unique material index for each face
<!-- video 12 -->
* (done) start yet another video this one based off of video 11
* (done) this will be the same thing as video 11, but now I am looking into creating uvs for the geometry
* (done) Use canvas textures for the materials
* (done) fixed bug #3
* (done) window-main-r135.html
* (done) window-main-r140.html

## ( done 03/03/2022 ) - r2 - Scripts
* (done) set 0.2.0 for package.json
<!-- scripts -->
* (done) start a video6 start video that will be the first to use scripts
* (done) Have a VIDEO.scripts prop in video6 that is a collection of relative paths to additional javaScript files
* (done) I will want to have a loadDAE helper function in ui-video-code that will be called first
* (done) I will then want a load scripts helper also that will be called after loadDAE
* (done) see about using this new system to load my old guy.js module
* (done) use guy model in video6.js
* (done) start a guy-canvas.js javascript file that will be used to skin a mesh with canvas elements
* (done) make changes to client so that I can load more than one script
* (done) fixed #5 by removing all child nodes from a container div
<!-- guy-canvas.js -->
* (done) guy-canvas should create a canvas that is a sprite sheet of faces
* (done) use guy.js and guy-canvas.js in video6.js
<!-- video6.js -->
* (done) I want to have a crude cone hat for the head of the guy
* (done) draw eyes helper
* (done) red and white stripe pattern for hat
* (done) texture for grass

## ( done 02/28/2022 ) - r1 - DAE Files
* (done) set 0.1.0 for version in package.json
* (done) load a dea file result
* (done) use the dae result in a start video
* (done) no state object, just have an sm object and pass that to calls of VIDEO.update in client.js
* (done) the sm object should be there to work with in calls of VIDEO.init also
* (done) updating all init methods of all start video examples so that sm is the first argument of a VIDEO.init call
* (done) make sure dae files with textures load okay
* (done) start-videos folder location should be off of root rather than in the js folder for the client system
* (done) see about fixing bug #3
* (done) can load more than one DAE file
* (done) start video5 should just have mesh children
* (done) starting a utils.js file
* (done) I am going to want to have a method that can be used to parse out just the mesh objects from a dae result object

## ( done 02/26/2022 ) - r0 - General starting point working
* (done) have a \/html\/js folder
* (done) threejs will need to be part of the client system, go with a late version \( \/html\/js\/0.135.0\/three.min.js \)
* (done) I am also going to want to add vuejs as I like using that to make user interface controls
* (done) for now I am thinking I will just need a single browser window, with a mount point for one or more canvas elements
* (done) I started a VIDEO object standard for this project that will be the current video project
* (done) start a playback ui
* (done) playback ui should have a have frame + and - buttons
* (done) playback ui have a play-pause button
* (done) playback ui should have current frame and maxFrame text inputs
* (done) start a video js textarea ui that will be used to mutate the VIDEO object
* (done) I am going to want to have a way to load the text from video-start.js into the textarea by way of preload.js api
* (done) load the video-start.js file by way of eval / method for running javaScript
* (done) have a videoAPI.writeFrame method that takes a filePath, and canvas dataUrl for the frame
* (done) start an export to images option in the file menu that will be a folder of images for each frame
* (done) export all frames as png files so I can make a video using ffmpeg
* (done) I am going to want to pad the output file names with zeros
* (done) I am going to want a videoAPI.loadFile(path to file) method
* (done) there should be a way to start the program with a video file
* (done) must be able to adjust max frame count
* (done) start a help menu with a about option, in the about option display what the revision number is
* (done) use an input event for the textarea element to update the scene 
* (done) start a save as option
* (done) I will want to be able to save the video file code as a js file
* (done) see about reading package.json and using the minor patch number of version for the r number in about menu

