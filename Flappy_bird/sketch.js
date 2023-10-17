let bird;
let pipes = [];
let isGameOver = false; // Tracks the game state
let points = 0;
let coinSFX;

function setup() {
  createCanvas(400, 600);
  bird = new Bird(); // Instantiate a new bird from the bird class
  pipes.push(new Pipe()); // Instantiate a new pipe
  coinSFX = loadSound('Pickup_Coin.mp3'); // Load coin sound
}

function draw() {
  background(153, 204, 255);
  
  if (!isGameOver){ // If the game is still going
    for (let i = pipes.length - 1; i >= 0; i--){ // Go trough every instantiated pipe
      pipes[i].update();
      pipes[i].show();

      if(pipes[i].hits(bird)){ // If a collision is detected
        isGameOver = true;
      }
      
      if (pipes[i].score(bird)){ // Detect a point score
        points += 1; // Add 1 point
        coinSFX.play() // Play the coin SFX
      }
      
      textSize(32);
      fill(0);
      textAlign(LEFT, TOP);
      text(`Points: ${points}`, 0, 0);

      if (pipes[i].offscreen()){ // If the pipe is off screen
        pipes.splice(i, 1); // Remove the pipe from the array to save memory
      }
    }
    bird.update(); // Update the bird's physics
    bird.show(); // Show the new position of the bird

    if (frameCount % 100 === 0){ // Every 100 frames
      pipes.push(new Pipe()); // Instantiate a new pipe
    }
  }
  
  else{
    // Game over screen
    textSize(32);
    fill(0);
    textAlign(CENTER, CENTER);
    text(`Game Over\nPress space to retry\nScore: ${points}`, width / 2, height / 2);
  }
}

function keyPressed(){
  if (key === ' ') { // On pressing the space bar
    bird.jump();
    
    if (isGameOver){ // Press space to reset the game
      resetGame();
    }
  }
}

// Reset all variables to their initial state
function resetGame(){
  pipes = [];
  bird = new Bird();
  isGameOver = false;
  points = 0;
}

class Bird{
  constructor(){
    this.y = height/2; // Start the bird at the middle of the screen
    this.x = 64; // Bird's starting x coordinate
    this.gravity = 0.6;
    this.lift = -15; // Jump height
    this.velocity = 0; // Current velocity. Is affected by the lift and gravity
  }
  
  jump(){
    this.velocity += this.lift; // Moves the bird towards the top of the screen
  }
  
  update(){
    this.velocity += this.gravity; // Adds gravity by moving the bird to towards the bottom
    this.y += this.velocity; // Updates the bird's y position
    
    // Prevent the bird from going over the top
    if (this.y > height){ 
      this.y = height;
      this.velocity = 0;
    }
    
    // Prevents the bird from going below the bottom of the screen
    if (this.y < 0){
      this.y = 0;
      this.velocity = 0;
    }
  }
  
  // Shows the bird's new position
  show(){
    fill(255, 153, 102);
    ellipse(this.x, this.y, 32, 32);
  }
}

class Pipe{
  constructor(){
    this.top = random(height/2); // Selects a random position from 0 to the half of the screen vertically
    this.bottom = random(height/2);
    this.x = width; // Start the pipe at the right of the canvas
    this.w = 20; // Pipe width
    this.speed = 2; // Pipe speed
  }
  
  update(){
    this.x -= this.speed; // Move the pipes to the left
  }
  
  show(){
    fill(0, 204, 102);
    rect(this.x, 0, this.w, this.top); // Top pipe
    rect(this.x, height - this.bottom, this.w, this.bottom); // Bottom pipe
  }
  
  // Detect collision
  hits(bird){
    if (bird.y < this.top || bird.y > height - this.bottom){ // If it's above the top pipe or below the bottom pipe
      if (bird.x > this.x && bird.x < this.x + this.w){ // If it's within the pipe's width
        return true;
      }
    }
    return false;
  }
  
  score(bird){
    if (bird.x == this.x){ // If it's within the pipe's width
      return true;
    }
    return false;
  }
  
  // Check if the pipe is off screen. Used to despawn the pipes.
  offscreen(){
    return this.x < -this.w;
  }
}