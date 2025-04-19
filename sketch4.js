// 파형 입체 모형

var song

function preload(){//동일 폴더 저장 파일
    song=loadSound('./assets/music/MoonlightMagic.mp3')//노래 파일||경로 삽입
}

function setup(){
    createCanvas(windowWidth,windowHeight,WEBGL)
    angleMode(DEGREES)
}

function draw(){
    background(30)
    
    rotateX(60)

    noFill()
    stroke(255)

    for( var i=0 ; i<50; i++){
        
        var r=map(sin(frameCount/2), -1, 1, 100, 200)
        var g=map(i, 0, 50, 100, 200)
        var b=map(cos(frameCount), -1, 1, 200, 100)

        stroke(r, g, b)
        
        rotate(frameCount/150)//속도

        beginShape()
        
        for(var j=0; j<360; j +=60){
            var rad= i*7// 도형 크기
            var x=rad*cos(j)
            var y=rad*sin(j)
            var z=sin((frameCount * 2 + i * 5)/2) * 70//속도2
    
            vertex(x,y,z)
        }
        endShape(CLOSE)
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