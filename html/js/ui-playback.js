// ui-playback-code.js - For playback controls of the video
(function () {
    //-------- ---------
    // VUE FOR PLAYBACK CONTROLS
    //-------- ---------
    var vm = new Vue({
        el: '#wrap_playpack',
        template: '<div class="wrap_ui wrap_ui_playback">' +
            '<span>Playback Controls:</span><br>' +
            '<input type="button" value="play/pause" v-on:click="play">' +
            '<input type="button" value="frame+" v-on:click="stepFrame(1)">' +
            '<input type="button" value="frame-" v-on:click="stepFrame(-1)"><br>' +


            '<input type="text" size="5" v-model="targetFrame" v-on:change="setFrame" >'+

            //!!! direct set of frameFrac might be cool in some ways, but I still like the target frame feature
            // that way I can just click set frame to keep setting back to a given point

            //'<input type="text" size="5" v-model="sm.frameFrac" v-on:change="setFrame" >'+

            '<input type="text" size="5" v-model="sm.frameMax">'+
            '<input type="button" value="Set frame to target" v-on:click="setFrame"><br>' +

            '<select ref="foo" id="res_options" v-model="res_index" v-on:click="resChange">'+
                '<option  v-bind:ref="\'res_\' + i" v-for="(res, i) in sm.res_options">{{ i + \'_\' + res.w + \'x\' + res.h }}</option>' +
            '</select><br>' +
            '<input type="button" value="preview+" v-on:click="stepPreview(1)">' +
            '<input type="button" value="preview-" v-on:click="stepPreview(-1)">' +
            ' {{ sm.previewSize }} <br>' +
             '<span> {{ sm.frame }} / {{ sm.frameMax }} </span>' + 
        '</div>',
        data: {
           sm: sm,
           res_index: '',
           targetFrame: 0
        },
        mounted: function() {
            // doing this to set starting option for res select element
            const option = this.$refs['res_' + sm.res_current_index][0];
            option.setAttribute('selected', 'selected')
        },
        updated: function(){
            // set the starting resoution index
            const res_current_index = this.$data.sm.res_current_index;
            const default_res_option = this.$el.querySelector('#res_options').children[res_current_index];
            default_res_option.selected = true;
        },
        methods: {
            stepFrame: function(delta){
                sm.frameFrac += parseInt(delta);
                sm.frameFrac = sm.frameFrac > sm.frameMax ? 0 : sm.frameFrac;
                sm.frameFrac = sm.frameFrac < 0 ? sm.frameMax : sm.frameFrac;
                sm.frame = Math.floor(sm.frameFrac);
                sm.setFrame();
            },
            stepPreview: function(delta){
                sm.previewSize += 5 * delta;
                sm.resSet();
                sm.setFrame();
            },
            // set a frame
            setFrame: function(){

                var sm = this.$data.sm;
                //sm.frameMax = parseInt(sm.frameMax);
                sm.frameFrac = parseFloat(this.$data.targetFrame);
                sm.frameFrac = parseFloat(sm.frameFrac);
                sm.frame = Math.floor(sm.frameFrac);
                sm.setFrame();
            },
            // play or pause
            play: function(){
                var sm = this.$data.sm;
                sm.play();
            },
            // res change method for the resolution section drop down menu
            resChange : function(e){
                // get the target value that wil contain the string with the index in it.
                const res_string = e.target.value;
                const sm = this.$data.sm;
                // call resSet passing new index to use
                const arr = res_string.split('_');
                if(arr[0] === '' || arr.length === 0){
                    console.log('THERE IS A PROBLEM GETTING THE RES INDEX');
                    console.log(arr);
                }else{
                    console.log('arr index looks good');
                    console.log(arr);
                    sm.resSet( parseInt( arr[0] ) );
                    sm.setFrame();
                }
            }
        }
    });
    //-------- ---------
    // WRITE FRAME RECURSIVE FUNCTION
    //-------- ---------
    var writeFrame = (imageFolder, frameIndex) => {
        var data = vm.$data,
        sm = data.sm;
        data.targetFrame = frameIndex;
        vm.setFrame();
        // write the current frame
        // calling writeFrame promise style
        videoAPI.writeFrame(imageFolder, sm.frame, sm.canvas.toDataURL())
        .then(() => {
            console.log('wrote frame: ' + frameIndex);
            var nextFrameIndex = frameIndex + 1;
            if(nextFrameIndex < sm.frameMax){
                writeFrame(imageFolder, nextFrameIndex);
            }
        })
        .catch((e)=>{
            console.warn(e);
        });
    };
    //-------- ---------
    // MENU EVENTS
    //-------- ---------
    videoAPI.on('menuExport', function(evnt, result, imageFolder, mode){
        writeFrame(imageFolder, 0); 
    });
}());