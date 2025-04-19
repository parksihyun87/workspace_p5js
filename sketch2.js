var song

function preload(){//동일 폴더 저장 파일
    song=loadSound('./assets/music/HolyForever.mp3')//노래 파일||경로 삽입
}


function setup(){
    createCanvas(windowWidth,windowHeight)

    angleMode(DEGREES)
    rectMode(CENTER)
}



function draw(){
    background(10,20,30)
    noFill()
    stroke(255)

    translate(width/2, height/2)

    for( var i=0 ; i<200; i++){
        push()

        rotate(sin(frameCount+i)*100)

        var r=map(sin(frameCount),-1,1,50,255)
        var g=map(cos(frameCount/2),-1,1,50,255)
        var b=map(sin(frameCount/4),-1,1,50,255)

        stroke(r,g,b)

        rect(0, 0, 600- i * 3, 600- i * 3, 200-i)
        // 모양 조절

        pop()
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