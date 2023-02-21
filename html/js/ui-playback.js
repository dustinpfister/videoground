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
            '<input type="text" size="5" v-model="targetFrame"><input type="button" value="set frame" v-on:click="setFrame">' +
            '<input type="text" size="5" v-model="sm.frameMax"><input type="button" value="set max frame" v-on:click="setFrame"><br>' +


'<select id="res_options" v-model="res_index" v-on:click="resChange">'+
    '<option v-for="(res, i) in sm.res_options">{{ i + \'_\' + res.w + \'x\' + res.h }}</option>' +
'</select><br>' +


             '<span> {{ sm.frame }} / {{ sm.frameMax }} </span>' + 
        '</div>',
        data: {
           sm: sm,
           res_index: '',
           targetFrame: 0
        },

updated: function(){
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
            // set a frame
            setFrame: function(){
                var sm = this.$data.sm;
                sm.frameMax = parseInt(sm.frameMax);
                sm.frameFrac = parseFloat(this.$data.targetFrame);
                sm.frame = Math.floor(sm.frameFrac);
                sm.setFrame();
            },
            // play or pause
            play: function(){
                var sm = this.$data.sm;
                sm.play();
            },
            resChange : function(e){
                // update sm.res_current_index
                const res_string = e.target.value;
                const sm = this.$data.sm;
                sm.res_current_index = parseInt(res_string.split('_')[0]);
                // update sm.res to the element in sm.res_options
                //sm.res = sm.res_options[sm.res_current_index];
                //console.log('current res index: ' + sm.res_current_index);
                //console.log('sm.res: ', sm.res);
                sm.resSet();
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