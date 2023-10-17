// Declare global variables
let cookiesCount = 0; // Number of cookies collected
let spawnRate = 100; // Rate at which cookies spawn

// Create an empty array to store the cookies
let cookies = [];

// Load the cookie image
let img;

// Define the cookie class
class cookie {
  // Constructor
  constructor(x, y, size = 50) {
    // Set the cookie's position, color, and size
    this.x = x;
    this.y = y;
    this.size = size;
  }

  // Draw the cookie on the canvas
  draw() {
    // Draw the cookie image at the cookie's position
    image(img, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
  }

  // Update the cookie's position
  update() {
    // Move the cookie down by 1 pixel
    this.y += 1;
  }

  // Check if the cookie has been clicked
  hitTest(x, y) {
    // Calculate the distance between the mouse cursor and the cookie's center
    let d = dist(x, y, this.x, this.y);

    // If the distance is less than the cookie's radius, return true
    if (d < this.size / 2) 
      return true;
    else 
      return false;
  }
}

// Preload the cookie image
function preload() {
  img = loadImage('assets/cartoon_cookie.png');
}

// Setup the canvas and game
function setup() {
  // Create a canvas 600 pixels wide and 800 pixels high
  createCanvas(600, 800);

  // Set the text alignment to center
  textAlign(CENTER);

  // Hide the cursor
  noCursor();
}

// Draw a red circle to represent the mouse cursor
function drawMouse() {
  fill('red');
  ellipse(mouseX, mouseY, 20, 20);
}

// Display the number of cookies collected and the click power
function cookieText() {
  // Set the text size to 24 pixels
  textSize(24);

  // Set the text color to black
  fill(0);

  // Display the number of cookies collected
  text(`Cookies: ${cookiesCount}`, width / 2, 50);
}

// Spawn a new cookie
function spawnCookie() {
  // Generate a random x position for the cookie
  let x = random(40, width - 40);

  // Create a new cookie object and return it
  return new cookie(x, 0, 40);
}

// Draw the game
function draw() {
  // Clear the canvas
  background(220);

  // Display the cookie count and click power
  cookieText();

  // Loop through the cookies array and update each cookie
  for (let i = cookies.length - 1; i >= 0; i--) {
    let c = cookies[i];

    // Draw the cookie
    c.draw();

    // Update the cookie's position
    c.update();

    // Check if the cookie has been clicked
    if (c.hitTest(mouseX, mouseY) && mouseIsPressed) {
      // Increase the number of cookies collected
      cookiesCount += 1;

      // Remove the cookie from the array
      cookies.splice(i, 1);

      // Decrease the spawn rate
      spawnRate = spawnRate > 10 ? spawnRate - 1 : 10;
    }

    // If the cookie has moved off the bottom of the canvas, remove it from the array
    if (c.y > height + c.size) {
      cookies.splice(i, 1);
    }
  }

  // Spawn a new cookie if the spawn rate is met
  if (frameCount % spawnRate == 0) {
    let c = spawnCookie();
    cookies.push(c);
  }

  // Draw the mouse cursor
  drawMouse();
}
