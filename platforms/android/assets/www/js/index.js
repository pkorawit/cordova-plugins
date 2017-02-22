// onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
var ongetLocationSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function ongetLocationError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(ongetLocationSuccess, ongetLocationError);
}


// onSuccess Callback
//   This method accepts a `Position` object, which contains
//   the current GPS coordinates
//
function onwatchLocationSuccess(position) {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var location = position.coords.latitude +
                    ', '+ position.coords.longitude +
                    ' timestamp(' + time + ')';
    $('#geolocation').val(location);
}

// onError Callback receives a PositionError object
//
function onwatchLocationError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

var watchID;
function watchLocation() {
  // Options: throw an error if no update is received every 30 seconds.
  //
  var options = { enableHighAccuracy: true, timeout: 30000 };
  watchID = navigator.geolocation.watchPosition(onwatchLocationSuccess, onwatchLocationError, options);
}

function cancelWatch() {
  navigator.geolocation.clearWatch(watchID);
  alert('Cleared');
}

function takePhoto() {
  openCamera();
}

function setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: false,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
}

function openCamera() {
    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);
    navigator.camera.getPicture(cameraSuccess, cameraError, options);
}

function cameraSuccess(imageUri){
  displayImage(imageUri);
}

function cameraError(error) {
    alert("Unable to obtain picture: " + error);
}

function displayImage(imgUri) {
    $('#photo').attr("src", imgUri);
    $('#fileURL').text(imgUri);
}

function getBattery() {
  window.addEventListener("batterystatus", onBatteryStatus, false);
}

function onBatteryStatus(status) {
    var text = "Level: " + status.level + " isPlugged: " + status.isPlugged;
    $('#bstatus').val(text);
}
