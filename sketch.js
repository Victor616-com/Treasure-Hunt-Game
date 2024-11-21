let classifier;
let video;
let label = "Waiting...";
let confidence = "Waiting...";
let gifOverlay;
let gifPlayed = false; // To ensure the GIF plays only once

function preload() {
  classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/FQZK-yTin/model.json", {flipped: true});
}

function gotResults(results) {
  label = results[0].label;
  confidence = roundUpToDecimals(results[0].confidence);
}

function roundUpToDecimals(number) {
  let factor = Math.pow(10, 2);
  return Math.ceil(number * factor) / factor;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO, {flipped: true});
  video.hide();
  classifier.classifyStart(video, gotResults); // Classify the loaded image

  

  gifOverlay = createImg("congratulations.gif"); // Replace with your GIF file path
  gifOverlay.position(0, 0);
  gifOverlay.size(width, height);
  gifOverlay.hide();
  gifOverlay.elt.loop = false; // Disable looping

}

function draw() {
  background(220);
  image(video, 0, 0, width, height, 0, 0, video.width, video.height, CONTAIN);
/*
  rectMode(CENTER);
  fill(0);
  rect(width / 2, height - 50, width, 50)

  textSize(32);
  fill(255);
  textAlign(CENTER, CENTER);
  noStroke();
  text("Label: " + label + ", " + "Confidence: " + confidence, width / 2, height - 50);
*/
  
  if (label === "Victor" && confidence > 0.9) {
    // Green overlay
    fill(0, 255, 0, 100); // Green with transparency
    rect(0, 0, width, height);
    gifOverlay.show();
   
    gifPlayed = true;

    // Draw the text over the green fill
    textSize(80);
    textStyle(BOLD); // Make the text bold
    textAlign(CENTER, CENTER);
    fill(255); // White text
    noStroke();
    text("You found it!", width / 2, height / 2);
  } else if (label === 'BG') {
    gifOverlay.hide();
    
    gifPlayed = false;
  } else {
    fill(255, 0, 0, 100); // Green with transparency
    rect(0, 0, width, height);
    gifOverlay.hide();
    
    // Draw the text over the green fill
    textSize(80);
    textStyle(BOLD); // Make the text bold
    textAlign(CENTER, CENTER);
    fill(255); // White text
    noStroke();
    text("Not this one!", width / 2, height / 2);
    gifPlayed = false;
  }

  

}
