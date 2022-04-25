var GuyCanvas = (function () {

    var api = {};

    // a default draw method for a canvas object
    var DRAW_DEFAULT = function (ctx, canvas, state) {
        ctx.fillStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.fillRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
        ctx.strokeStyle = '#00ff00';
        ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
    };
    // just draw a solid color background
    var drawBackground = (ctx, canvas, style) => {
        ctx.fillStyle = style || 'gray';
        ctx.fillRect(-1, -1, canvas.width + 2, canvas.height + 2);
    };

    var drawEye = function(ctx, x, y, xPer, yPer){
        xPer = xPer === undefined ? 0.5 : xPer;
        yPer = yPer === undefined ? 0.5 : yPer;
        ctx.fillStyle = 'black';
        // base eye area
        ctx.fillRect(x, y, 16, 16);
        var dx = 8 * xPer,
        dy = 8 * yPer;
        // eye color
        ctx.fillStyle = '#00ffff';
        ctx.fillRect(x + dx, y + dy, 8, 8);
        // pupils
        ctx.fillStyle = 'black';
        ctx.fillRect(x + dx + 2, y + dy + 2, 4, 4);
    };

    var drawGuyEyes = function(ctx, canvas, sm, opt){
        drawEye(ctx, 8, 16, opt.leftEyeXPer, opt.leftEyeYPer);
        drawEye(ctx, 40, 16, opt.rightEyeXPer, opt.rightEyeYPer);
    };

    // draw methods
    var DRAW_METHODS = {};

    // hat draw methods
    DRAW_METHODS.hat = {};

    DRAW_METHODS.hat.stripes = (ctx, canvas, sm, opt) => {
        drawBackground(ctx, canvas, 'white');
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 6;
        var i = 0,
        len = 6, y;
        while(i < len){
            y = canvas.height / len * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
            i += 1;
        }
    };

    // face draw methods
    DRAW_METHODS.face = {};

    DRAW_METHODS.face.plain = (ctx, canvas, sm, opt) => {
        // mouth percent option
        opt.mouthPer = opt.mouthPer === undefined ? 0 : opt.mouthPer;
        // solid color background
        drawBackground(ctx, canvas, 'white');
        // eyes
        drawGuyEyes(ctx, canvas, sm, opt);
        // mouth
        ctx.fillStyle = 'black';
        var mw = 25,
        mh = 8;
        ctx.fillRect(32 - mw / 2, 40, mw, mh);
    };

    // talk face
    DRAW_METHODS.face.talk = (ctx, canvas, sm, opt) => {
        // mouth percent option
        opt.mouthPer = opt.mouthPer === undefined ? 0 : opt.mouthPer;
        // solid color background
        drawBackground(ctx, canvas, 'white');
        // eye and mouth color
        drawGuyEyes(ctx, canvas, sm, opt); 
        // mouth
        ctx.fillStyle = 'black';
        var mw = 25 - 8 * opt.mouthPer,
        mh = 8 + 8 * opt.mouthPer;
        ctx.fillRect(32 - mw / 2, 40, mw, mh);
    };

    // create and return a canvas texture
    api.createCanvasObject = function (sm, drawMethods) {
        drawMethods = drawMethods || DRAW_METHODS;
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 64;
        canvas.height = 64;
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        var canvasObj = {
            texture: texture,
            canvas: canvas,
            ctx: ctx,
            sm: sm,
            draw: function(opt){
                opt = opt || {};
                opt.drawClass = opt.drawClass || 'face';
                opt.drawMethod = opt.drawMethod || 'plain';
                var drawFunc = drawMethods[opt.drawClass][opt.drawMethod];
                drawFunc.call(sm, ctx, canvas, sm, opt);
                texture.needsUpdate = true;
            }
        };
        return canvasObj;
    };

    // return public api
    return api;

}
    ());
