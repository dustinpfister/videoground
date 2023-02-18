// utils.js - just a dumping ground for any utility funcitons I want to use for the client system
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

// remove all child nodes
// https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
utils.removeAllChildNodes = function(fromNode){
  while (fromNode.firstChild) {
    fromNode.removeChild(fromNode.lastChild);
  }
};
