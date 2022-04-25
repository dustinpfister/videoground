(function () {

    var vm = new Vue({
        el: '#wrap_playpack',
        template: '<div class="wrap_ui">' +
            '<input type="button" value="play/pause" v-on:click="play"><br>' +

            '<input type="button" value="frame+" v-on:click="stepFrame(1)">  ' +
            '<input type="button" value="frame-" v-on:click="stepFrame(-1)"><br>' +

            '<input type="text" size="5" v-model="targetFrame"><input type="button" value="set frame" v-on:click="setFrame"><br>' +
            '<input type="text" size="5" v-model="sm.frameMax"><input type="button" value="set max frame" v-on:click="setFrame"><br>' +

             '<span> {{ sm.frame }} / {{ sm.frameMax}} </span>' + 
        '</div>',
        data: {
           sm: sm,
           targetFrame: 0
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
            }
        }
    });

    var writeFrame = (imageFolder, frameIndex) => {
        var data = vm.$data,
        sm = data.sm;
        data.targetFrame = frameIndex;
        vm.setFrame();
        // write the current frame
        videoAPI.writeFrame(imageFolder, sm.frame, sm.canvas.toDataURL(), (e) => {
            console.log('wrote frame: ' + frameIndex);
            var nextFrameIndex = frameIndex + 1;
            if(nextFrameIndex < sm.frameMax){
                writeFrame(imageFolder, nextFrameIndex);
            }
        });
    };

    videoAPI.on('menuExport', function(evnt, result, imageFolder, mode){
        writeFrame(imageFolder, 0); 
    });

}
    ());