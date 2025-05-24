let points = [];
let mult = 0.005;

let leftColors = {};
let rightColors = {};
let centers = [];

var song

function preload(){//동일 폴더 저장 파일
  // song=loadSound('./assets/music/TheThoughtofYou.mp3')
  song=loadSound('./assets/music/Wander.mp3')  
  // song=loadSound('./assets/music/RhythmChanges.mp3')//노래 파일||경로 삽입
    
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  document.body.style.overflow = 'hidden';

  background(30);
  angleMode(DEGREES);
  noiseDetail(1);

  initSketch();

  // 5초마다 다시 초기화
  setInterval(() => {
    background(30);
    initSketch();
  }, 10000);
}

function initSketch() {
  points = [];
  let density = 30;
  let space = width / density;

  for (let x = 0; x < width; x += space) {
    for (let y = 0; y < height; y += space) {
      let p = createVector(x + random(-10, 10), y + random(-10, 10));
      points.push(p);
    }
  }

  shuffle(points, true);

  leftColors = {
    r1: random(255),
    r2: random(255),
    g1: random(255),
    g2: random(255),
    b1: random(255),
    b2: random(255)
  };

  rightColors = {
    r1: random(255),
    r2: random(255),
    g1: random(255),
    g2: random(255),
    b1: random(255),
    b2: random(255)
  };

  mult = random(0.002, 0.01);

  // 중심 5개 (가운데도 추가!!)
  centers = [
    createVector(width / 4, height / 4),
    createVector(3 * width / 4, height / 4),
    createVector(width / 4, 3 * height / 4),
    createVector(3 * width / 4, 3 * height / 4),
    createVector(width / 2, height / 2)  // 추가: 가운데 중심
  ];

  frameCount = 0; // 리셋
}

function draw() {
  noStroke();

  let max = frameCount * 5;
  if (max > points.length) {
    max = points.length;
  }

  for (let i = 0; i < max; i++) {
    let p = points[i];

    // 색이 부드럽게 바뀌도록, 중간을 넓게 설정
    let mixRatio = constrain(map(p.x, width * 0.2, width * 0.8, 0, 1), 0, 1);

    // 색 섞기 (좌측 - 우측)
    let r = lerp(
      map(p.x, 0, width, leftColors.r1, leftColors.r2),
      map(p.x, 0, width, rightColors.r1, rightColors.r2),
      mixRatio
    );
    let g = lerp(
      map(p.y, 0, height, leftColors.g1, leftColors.g2),
      map(p.y, 0, height, rightColors.g1, rightColors.g2),
      mixRatio
    );
    let b = lerp(
      map(p.x, 0, width, leftColors.b1, leftColors.b2),
      map(p.x, 0, width, rightColors.b1, rightColors.b2),
      mixRatio
    );

    // 가장 가까운 중심점 거리
    let minDist = Infinity;
    for (let c of centers) {
      let d = dist(c.x, c.y, p.x, p.y);
      if (d < minDist) minDist = d;
    }

    let alpha = map(minDist, 0, 350, 400, 0);

    fill(r, g, b, alpha);

    let angle = map(noise(p.x * mult, p.y * mult), 0, 1, 0, 720);
    p.add(createVector(cos(angle), sin(angle)));

    // 중심 중 하나라도 반경 350 이내면 그리기
    for (let c of centers) {
      if (dist(c.x, c.y, p.x, p.y) < 350) {
        ellipse(p.x, p.y, 1);
        break;
      }
    }
  }
}

// 윈도우 크기 변경 시 캔버스 리사이즈
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(30); // 배경 다시 칠하기
  initSketch(); // 새로운 화면 재구성
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