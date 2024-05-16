//-------- ----------
// NODE CORE MODULES
//-------- ----------
const path = require('path');
//-------- ----------
// CONSTS
//-------- ----------
const CONSTANT = {};
// the revision number for this version of videoground
CONSTANT.REVISION = '10';
// hard coded start video URI
CONSTANT.URI_VIDEO_START = path.join(__dirname, '../../start-videos/video21-r10-start.js');
// user data object for settings.json
CONSTANT.OPT_USERDATA_SETTINGS = {
    app_name: 'videoground_r' + CONSTANT.REVISION ,
    file_name: 'settings.json',
    data_default:{
       uri_video_start: CONSTANT.URI_VIDEO_START
    }
};
module.exports = CONSTANT;
