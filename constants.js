//-------- ----------
// NODE CORE MODULES
//-------- ----------
const path = require('path');
//-------- ----------
// CONSTS
//-------- ----------
const CONSTANT = {};
// the revision number for this version of videoground
CONSTANT.REVISION = '7_dev';
// hard coded start video URI
CONSTANT.URI_VIDEO_START = path.join(__dirname, 'start-videos/video18-r7-start.js');
// user data object for settings.json
CONSTANT.OPT_USERDATA_SETTINGS = {
    app_name: 'videoground_r' + CONSTANT.REVISION ,
    file_name: 'settings.json',
    data_default:{
       uri_video_start: CONSTANT.URI_VIDEO_START
    }
};
module.exports = CONSTANT;