// 무작위 원형 그리기

var song
var r1 
var r2 

var a1 = 0
var a2 = 0

var a1Inc
var a2Inc

var prevX
var prevY


function preload(){//동일 폴더 저장 파일
    song=loadSound('./assets/music/Recollections.mp3')//노래 파일||경로 삽입
}

function setup(){
    createCanvas(windowWidth,windowHeight)
    angleMode(DEGREES)
    background(30)

    resetSketch(); // 초기 랜덤 값 설정

    // 10초마다 랜덤 모양 재설정
    setInterval(() => {
        resetSketch();
    }, 20000); // 10000ms = 10초
}

function resetSketch() {
    background(30); // 기존 그림 지우기
    r1 = random(80, 220);
    r2 = random(70, 140);

    a1 = 0;
    a2 = 0;

    a1Inc = random(0.1, 0.3);//각도가 천천히 변하게 영향
    a2Inc = random(0.1, 0.3);

    isFirstDraw = true; 
}


function draw(){
    translate(width / 2, height / 2)
    stroke(255)
    
    for (var i =0; i < 100; i++){// 두번째 i한번에 긋는 선 개수
        var x1= r1 *cos(a1)
        var y1= r1 *sin(a1)
    
        var x2 = x1 + r2 * cos(a2)
        var y2 = y1 + r2 * sin(a2)
        
        
        var r=map(sin(frameCount), -1, 1, 100, 200)
        var g=map(cos(frameCount), -1, 1, 100, 200)
        var b=map(sin(frameCount), -1, 1, 200, 100)

        stroke(r, g, b)

        if (!isFirstDraw) {
            line(prevX, prevY, x2, y2);
        }
        
        isFirstDraw = false;
        prevX = x2;
        prevY = y2;

    
        line(prevX, prevY, x2, y2)
    
        prevX = x2
        prevY = y2
    
        a1 += a1Inc
        a2 += a2Inc
    }
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