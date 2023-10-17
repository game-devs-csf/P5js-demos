let cookiesCount = 0; // Tracks the number of cookies on the screen
let spawnRate = 100; // Determines how often a new cookie is spawned

let cookies = []; // Array to store all the cookies
let img; // Image object for the cookie image

class Cookie {
  constructor(x, y, color = 'brown', size = 50) {
    this.x = x; // X position of the cookie
    this.y = y; // Y position of the cookie
    this.color = color; // Color of the cookie
    this.size = size; // Size of the cookie
  }
  
  draw() {
    fill(this.color); // Fill the cookie with its designated color
    ellipse(this.x, this.y, this.size, this.size); // Draw a circle representing the cookie
  }
  
  update() {
    this.y += 1; // Move the cookie down one pixel
  }
  
  hitTest(x, y) {
    let d = dist(x, y, this.x, this.y); // Calculate distance between mouse and cookie
    if (d < this.size / 2) { // Check if mouse is within cookie's radius
      return true; // If yes, return true
    } else {
      return false; // If no, return false
    }
  }
}

function setup() {
  createCanvas(600, 800); // Create a canvas element with specified dimensions
  textAlign(CENTER); // Center the text in the canvas
  noCursor(); // Hide the cursor
}

function drawMouse() {
  fill('red'); // Fill the mouse pointer with red color
  ellipse(mouseX, mouseY, 20, 20); // Draw a red circle representing the mouse pointer
}

function cookieText() {
  // Display cookies and click power
  textSize(24); // Set font size to 24 pixels
  fill(0); // Fill the text with black color
  text(`Cookies: ${cookiesCount}`, width / 2, 50); // Display the number of cookies at the center of the screen
}

function spawnCookie() {
  let x = random(40, width - 40); // Generate a random X coordinate for the cookie
  let c = new Cookie(x, 0, 'rgb(200, 100, 50)', 40); // Create a new cookie object with specified parameters
  return c; // Return the newly created cookie object
}

function draw() {
  background(220); // Fill the canvas with a light gray color
  cookieText(); // Display the number of cookies and click power
  
  for (let i = cookies.length - 1; i >= 0; i--) {
    let c = cookies[i]; // Get the current cookie object
    c.draw(); // Draw the cookie
    c.update(); // Update the cookie's position
    
    if (c.hitTest(mouseX, mouseY) && mouseIsPressed) { // Check if the mouse is clicked on the cookie
      cookiesCount += 1; // Increment the number of cookies collected
      cookies.splice(i, 1); // Remove the cookie from the array
      spawnRate = spawnRate > 10 ? spawnRate - 1 : 10; // Decrease the time interval between spawning cookies
    }
    
    if (c.y > height + c.size) { // Check if the cookie has fallen outside the canvas
      cookies.splice(i, 1); // Remove the cookie from the array
    }
  }
  
  if (frameCount % spawnRate === 0) { // Check if it's time to spawn a new cookie
    let c = spawnCookie(); // Create and return a new cookie object
    cookies.push(c); // Add the new cookie to the array
  }
  
  drawMouse(); // Draw the mouse pointer
}