// 넘실거리는 원형 커튼 모형

var song
var start=0

function preload(){//동일 폴더 저장 파일
    // song=loadSound('./assets/music/HoveringThoughts.mp3')//노래 파일||경로 삽입
    song=loadSound('./assets/music/Renunciation.mp3')
    // song=loadSound('./assets/music/WhenTheNightComes.mp3')
}

function setup(){
    createCanvas(windowWidth,windowHeight)
    angleMode(DEGREES)

    noiseDetail(2, 1)
}



function draw(){
    background(30)
    noStroke()

    translate(width/2, height/2)

    var space=0.1

    for( var i=0 ; i<360; i+= space){

        var xoff=map(cos(i), -1, 1, 0, 3)
        var yoff=map(cos(i), -1, 1, 0, 3)

        var n=noise(xoff + start, yoff + start)

        var h=map(n, 0, 1,-150, 150)

        var r=map(sin(i), -1, 1, 100, 200)
        var g=map(h, -150, 150, 0, 150)
        var b=map(n, 0, 1, 150, 255)

        rotate(space)

        fill(r, g, b)

        rect(200, 0, h, 1)
    }
     // 글씨 추가
     fill(255) // 흰색
     textAlign(CENTER, CENTER)
     textSize(28)
     text("넘실거리는 생각들", 0, 0)

    start+=0.01
}

function mouseClicked(fxn){
    if(song.isPlaying()){
      song.pause()
      noLoop()
    }else{
      song.play()
      loop()
    }
}

// 파형 소리에 반응 버전

// var song;
// var start = 0;
// var fft;

// var lastBassEnergy = 0; // 이전의 bassEnergy 값
// var smoothAmp = 100; // 부드러운 진폭 변화
// var smoothFactor = 0.1; // 기본 보간 속도

// function preload() {
//   song=loadSound('./assets/music/Renunciation.mp3')
// }

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   angleMode(DEGREES);

//   noiseDetail(2, 1);
//   fft = new p5.FFT();
// }

// function draw() {
//   background(30);
//   noStroke();

//   translate(width / 2, height / 2);

//   let space = 0.1;

//   let spectrum = fft.analyze();
//   let bassEnergy = fft.getEnergy('bass'); // 베이스 음역대의 에너지

//   // 빠른 곡일수록 더 빠르게 반응하도록 보간 속도 조정
//   let bassSpeed = abs(bassEnergy - lastBassEnergy); // bassEnergy 변화 속도

//   // 빠른 변화가 있을 때 반응 속도 빠르게, 느릴 때는 천천히
//   smoothFactor = map(bassSpeed, 0, 255, 0.05, 0.2); // bassEnergy의 변화 속도에 따라 조정

//   // 부드럽게 변하는 진폭 값
//   smoothAmp = lerp(smoothAmp, map(bassEnergy, 0, 255, 100, 300), smoothFactor);
//   lastBassEnergy = bassEnergy; // 이전 bassEnergy 값 저장

//   for (var i = 0; i < 360; i += space) {
//     var xoff = map(cos(i), -1, 1, 0, 3);
//     var yoff = map(sin(i), -1, 1, 0, 3);

//     var n = noise(xoff + start, yoff + start);

//     // h 진폭을 소리 세기에 따라 부드럽게 조정
//     var h = map(n, 0, 1, -smoothAmp, smoothAmp);

//     var r = map(sin(i), -1, 1, 100, 200);
//     var g = map(h, -smoothAmp, smoothAmp, 0, 150);
//     var b = map(n, 0, 1, 150, 255);

//     rotate(space);

//     fill(r, g, b);
//     rect(200, 0, h, 1);
//   }

//   // 글씨
//   fill(255);
//   textAlign(CENTER, CENTER);
//   textSize(28);
//   text("넘실거리는 생각들", 0, 0);

//   // 부드럽게 넘실거리게
//   start += 0.01;
// }

// function mouseClicked() {
//   if (song.isPlaying()) {
//     song.pause();
//     noLoop();
//   } else {
//     song.play();
//     loop();
//   }
// }
   