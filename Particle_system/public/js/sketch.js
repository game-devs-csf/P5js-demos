let particle, particleSystem
let bgNoise, bgMusic
let bg

function createParticle()
{
  particle = new Particle(createVector(200, 30), 100, 1)
  
  particle.velocity = createVector(random(-3, 3), random(-3,3))
  particle.acceleration = createVector(0, 0.098, 0)
  
  particle.draw = () => {
    fill(255, 0, 0, particle.lifespan)
    ellipse(particle.position.x, particle.position.y, 30,30)
  }
}

function preload()
{
  bg = loadImage('/assets/city_of_tears.jpg');
  bgNoise = loadSound('/assets/rain.mp3');
  bgMusic = loadSound('/assets/09-City-of-Tears - low quality.mp3')
}

function setup() {
  createCanvas(500, 500);
  particleSystem = new ParticleSystem(createVector(200, 30), 3)
  
  bgNoise.setVolume(0.1)
  bgNoise.loop(true)
  
  bgMusic.setVolume(0.1)
  bgMusic.loop(true)
  
}

function update()
{  
  if(particleSystem)
    particleSystem.run()
}
  
function draw() {
  background(bg);  
  textSize(18);
  text('Tap to play the music', 10, 20);
  update();
}

function mousePressed() {
  if (bgNoise.isPlaying() && bgMusic.isPlaying()) {
    
    bgNoise.stop();
    bgMusic.stop();
    
  } else {
    bgNoise.play();
    bgMusic.play();
  }
}