// 무작위 원형 그리기

// var song

var points = []
var mult = 0.005


// function preload(){//동일 폴더 저장 파일
//     song=loadSound('./assets/music/Recollections.mp3')//노래 파일||경로 삽입
// }

function setup(){
    createCanvas(windowWidth,windowHeight)
    background(30)
    angleMode(DEGREES)
    noiseDetail(1)

    var density = 30
    //뻑뻑함
    var space = width / density

    for(var x= 0; x < width; x +=space){
        for(var y=0; y < height; y +=space){
            var p=createVector(x + random(-10, 10) , y + random(-10, 10))
            points.push(p)
        }
    }
}


function draw(){
    noStroke()

    for (var i = 0; i < points.length; i++){

        var r=map(points[i].x, 0, width, 50, 255)
        var g=map(points[i].y, 0, width, 50, 255)
        var b=map(points[i].x, 0, width, 255, 50)

        fill(r, g, b)

        var angle = map(noise(points[i].x * mult, points[i].y * mult), 0, 1, 0, 720)

        points[i].add(createVector(cos(angle),sin(angle)))

        if(dist(width/ 2, height/ 2, points[i].x, points[i].y) < 200) {
            ellipse(points[i].x, points[i].y, 1)
        }
    }
}

// function mouseClicked(fxn){
//     if(song.isPlaying()){
//       song.pause()
//       noLoop()
//     }else{
//       song.play()
//       loop()
//     }
// }