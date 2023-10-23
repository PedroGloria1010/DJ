let video;
let nosex;
let nosey;
let poseNet;
let poses = [];
function preload(){
song = loadSound("music.mp3");

  
}
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  
  
  poseNet = ml5.poseNet(video, modelReady);

  poseNet.on("pose", function(results) {
    if (results.length>0){
    poses = results;
    nosex = poses[0].pose.nose.x
    nosey = poses[0].pose.nose.y
    }
    console.log(nosex)
  });
  video.hide();
}

function modelReady() {
  select("#status").html("Model Loaded");
}

function draw() {
  image(video, 0, 0, width, height);
  circle(nosex,nosey,10);
  song.rate(nosex/320);
  if (song.isPlaying()){
  song.setVolume(nosey/480);
  }
}
function play() {
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.stop();
  } else {
    song.play();
  }
}
