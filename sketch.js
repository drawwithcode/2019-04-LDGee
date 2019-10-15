//variables
var frenzyImage;
var backgroundImage2;
var mySong;
var asterisk;
var capture;
var gale;
var robetta;

function preload() {
  //preloading images
  frenzyImage = loadImage('./assets/logofrenzy-12.png');
  backgroundImage2 = loadImage('./assets/image1.jpg');
  mySong = loadSound('./assets/audio2.mp3');
  asterisk = loadImage('./assets/asterisk.png');
  gale = loadImage('./assets/gale.png');
  robetta = loadImage('./assets/robetta.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  imageMode(CENTER);

  //setup analyzer and music
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong)

  mySong.pause();
  mySong.playMode('sustain');

  //setup camera
  capture = createCapture(VIDEO);
  capture.size(1, 1);
}

function draw() {

  //background image
  image(backgroundImage2, windowWidth / 2, windowHeight / 2 + 70, backgroundImage2.width / 3, backgroundImage2.height / 3);
  //background graphic element
  image(robetta, 200, 400, robetta.width / 2.1, robetta.height / 2.1, mouseY / 5);

  //display analyzer
  var volume = 0;
  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, height);

  //asterisk and pulsing aura displayed
  push();
  var y = noise(frameCount / 300) * windowHeight;
  var x = noise(frameCount / 300 + 23456789) * windowWidth;
  noStroke();
  var color = get(x, y);
  fill(220, 0, 0, 50);
  ellipse(x, y, volume * 2);
  ellipse(x, y, volume * 1.25);
  pop();
  image(asterisk, x, y, 50, 50);

  //pulsing image over the background
  image(gale, windowWidth / 2, windowHeight / 2 + 70, backgroundImage2.width / 3 + volume / 3, backgroundImage2.height / 3 + volume / 3);

  if (mySong.isPlaying() == true) {
    //camera displayed
    push();
    imageMode(CENTER);
    image(capture, 1440, height / 2 + 35, 350, 262.5);
    pop();
  } else {
    noStroke();
    textFont('helvetica');
    text('click - extreme mental agitation', 170, 200);
  }

  //white background overlay
  background(255, mouseY / 6);

  //a lot of text instr
  textAlign(CENTER);
  fill(220, 10, 0, mouseY / 2);
  textSize(12 + volume / 20);
  text('visit @ frenzy.altervista.org', width / 2, height / 2 + 340);
  fill(255, mouseY / 2.5);
  textSize(15);
  text('45.4642° N, 9.1900° E', width / 2, 50);
  text((mouseX), width / 2 - 15, 90);
  text((mouseY), width / 2 + 15, 90);
  textAlign(LEFT);
  push();
  fill(255, mouseY / 2.5);
  text('frenzy is a concept – a vision – in my mind deeply linked in what i consider to be my aesthetic research. frenzy is many things and also, it is nothing. it is primordial, it is a visceral feeling. frenzy is my experimentation. frenzy is me shouting – i want everything, and i want it now.-',
    170, 440, 200);
  pop();

  //translated text in the right
  push();
  textSize(35);
  textAlign(CENTER);
  angleMode(DEGREES);
  translate(1280, height / 2);
  rotate(90);
  text('frenzy is everything.      frenzy is you.', 0, 0);
  rotate(180);
  pop();

  //frenzy title
  image(frenzyImage, windowWidth / 2, windowHeight / 2 + 50, frenzyImage.width / 2, frenzyImage.height / 2);

  //line
  stroke(255, mouseY / 6);
  line(width / 2 - 70, 65, width / 2 + 70, 65);
}

//music switch
function mouseClicked() {
  if (mySong.isPlaying() == false) {
    mySong.play();
  } else {
    mySong.pause();
  }
}
