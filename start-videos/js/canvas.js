var CanvasMod = (function () {

    var api = {};

    // just draw a solid color background
    var drawBackground = (ctx, canvas, style) => {
        ctx.fillStyle = style || 'gray';
        ctx.fillRect(-1, -1, canvas.width + 2, canvas.height + 2);
    };

    // draw methods
    var DRAW_METHODS = {};
    // hat draw methods
    DRAW_METHODS.def = {};
    // scripts default draw method
    DRAW_METHODS.def.stripes = (ctx, canvas, sm, opt) => {
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
    // random color grid
    var rndRange = function(range){
        return Math.floor( range[0] + Math.random() * (range[1] - range[0]) );
    };
    DRAW_METHODS.def.randomGrid = (ctx, canvas, sm, opt) => {
        var w = opt.gridWidth === undefined ? 60 : opt.gridWidth,
        h = w = opt.gridHeight === undefined ? 60 : opt.gridHeight,
        pxW = canvas.width / w,
        pxH = canvas.height / h, 
        i = w * h, x, y, r, g, b;
        opt.rRange = opt.rRange || [0, 0];
        opt.gRange = opt.gRange || [64, 180];
        opt.bRange = opt.bRange || [0, 0];
        while(i--){
            x = i % w;
            y = Math.floor(i / w);
            r = rndRange(opt.rRange)
            g = rndRange(opt.gRange);
            b = rndRange(opt.bRange);
            ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
            ctx.fillRect(x * pxW, y * pxH, pxW, pxH);
        }
    };
    // create and return a canvas texture
    api.createCanvasObject = function (sm, drawMethods, opt) {
        opt = opt || {};
        drawMethods = drawMethods || DRAW_METHODS;
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = opt.width === undefined ? 64 : opt.width;
        canvas.height = opt.height === undefined ? 64 : opt.height;
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        var canvasObj = {
            texture: texture,
            canvas: canvas,
            ctx: ctx,
            sm: sm,
            draw: function(opt){
                opt = opt || {};
                opt.drawClass = opt.drawClass || 'def';
                opt.drawMethod = opt.drawMethod || 'stripes';
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
