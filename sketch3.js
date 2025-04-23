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