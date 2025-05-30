// 소리에 반응하는 파형과 입자들

var song
var img
var fft
var particles=[]

function preload(){//동일 폴더 저장 파일
  song=loadSound('./assets/music/Everglow.mp3')//노래 파일||경로 삽입//브라우저 화면 클릭시 재생
  img = loadImage('./assets/img/image.png')//배경 이미지 삽입
  
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  angleMode(DEGREES)
  imageMode(CENTER)
  rectMode(CENTER)
  fft= new p5.FFT(0.3)//0-8 smoothing

  img.filter(BLUR,12)//이미지 블러

  noLoop()
}


function draw(){
  background(0)
  stroke(255)
  strokeWeight(3)
  //Thickness of stroke 조절
  noFill()

  translate(width/2, height/2)

  fft.analyze()
  amp=fft.getEnergy(20, 200)

  push()
  if(amp>230){
    rotate(random(-0.5, 0.5))
  }

  image(img, 0, 0, width +100, height +100)
  pop()
  
  var wave=fft.waveform()

  for (var t = -1; t <= 1; t += 2){
    beginShape()
    for(var i=0; i<width; i+=0.6){//세번째 i(0~5) 파형 단순화 정도
      var index=floor(map(i, 0, 180, 0, wave.length-1))
      
      var r=map(wave[index],-1,1,150,350)
  
      var x=r *sin(i)*t
      var y=r*cos(i)
      vertex(x,y)
    }
    endShape()
  }

  var alpha=map(amp, 0, 255, 50, 10)
  fill(0,alpha)
  noStroke()
  rect(0, 0, width, height)


  //두번째 i 파티클 추가
  for (let i = 0; i < 2.4; i++) {
    let p = new Particle()
    particles.push(p)
  }
  // var p= new Particle()
  // particles.push(p)

  for(var i=particles.length-1; i>=0; i--){
    if (!particles[i].edges()){
      particles[i].update(amp>200)
      //amp 숫자가 작을 수록 작은 소리에 퍼져나감 조절
      particles[i].show()
    }else{
      particles.splice(i,1)
    }
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

class Particle{
  constructor(){
    this.pos=p5.Vector.random2D().mult(250)
    this.vel=createVector(0,0)
    this.acc=this.pos.copy().mult(random(0.0001,0.00001))

    this.w= random(3,5)

    this.color=[random(200,255),random(200,255),random(200,255)]
  }
  update(cond){
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    if(cond){
      this.pos.add(this.vel)
      this.pos.add(this.vel)
      this.pos.add(this.vel)
    }
  }
  edges(){
      if (this.pos.x < -width / 2 || this.pos.x>width/2||
      this.pos.y < -height / 2 || this.pos.y >height /2){
        return true
      } else {
        return false
      }
  }

  show(){
    noStroke()
    fill(this.color)
    ellipse(this.pos.x, this.pos.y, this.w)
  }
}