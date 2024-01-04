song1 = "";
song2 = "";
rightwristX = 0;
rightwristY = 0;
leftwristX = 0;
leftwristY = 0;
leftwristscore = 0;
status_leftwrist = "";
rightwristscore = 0;
status_rightwrist = "";

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
  }
  
  function setup() {
    canvas = createCanvas(350, 350);
    canvas.center();
  
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
  }

  function modelLoaded() {
    console.log("posenet is initialized");
  }
  

  function gotPoses(results) {
    if(results.length > 0) {
      console.log(results);
      leftwristscore = results[0].pose.keypoints[9].score;
      leftwristX = results[0].pose.leftWrist.x;
      leftwristY = results[0].pose.leftWrist.y;
      console.log("lefteywristx = " + leftwristX + "leftwristy = " + leftwristY);
      rightwristX = results[0].pose.rightWrist.x;
      rightwristY = results[0].pose.rightWrist.y;
      console.log("rightwristx = " + rightwristX + "rightwristy = " + rightwristY);

      rightwristscore = results[0].pose.keypoints[10].score;
  
    }
  }
  
  function draw() {
      background("white")
      image(video, 0, 0, 350, 350)

      fill("#FF0000");
      stroke("FF0000");

      song1.isPlaying();

      status_leftwrist = song1;

      if(leftwristscore > 0.2) {
        circle(leftwristX, leftwristY, 20);
        song2.stop();
      }

      if(status_leftwrist = false) {
        song1.play()
        document.getElementById("songname").innerHTML = song1;
      }

      song2.isPlaying();

      status_rightwrist = song2;

      if(rightwristscore > 0.2) {
        circle(rightwristX, rightwristY, 20);
        song1.stop();
      }

      if(status_rightwrist == false) {
        song2.play();
        document.getElementById("songname").innerHTML = song2;
      }
  }
