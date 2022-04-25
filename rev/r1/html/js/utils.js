var utils = {};

// DAE tools
utils.DAE = {};

// get the first Mesh or Group type object to be found
// in the given result object
utils.DAE.getMesh = function(result){
    var objects = result.scene.children,
    i = objects.length, obj;
    while(i--){
        obj = objects[i];
        if(obj.type === 'Mesh' || obj.type === 'Group'){
            return obj;
        }
    }
    return null;
};
