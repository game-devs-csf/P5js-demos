/**
* Represents a single particle
*/
class Particle
{
  /**
  * Creates a single particle
  * @param {p5vector} position - The initial position of the particle
  * @param {number} lifespan - The initial lifespan of the particle
  * @param {number} lifespanRate - How much the particle will live
  */
  constructor(position, lifespan = 255, lifespanRate = 1)
  {
    this.position = position
    this.velocity = createVector(0,0)
    this.aceleration = createVector(0,0)
    this.lifespan = lifespan
    this.lifespanRate = lifespanRate
    this.lineWidth = random(20, 50)
  }
  
  /**
  * Applies an external force to the particle.
  * @param {p5Vector} force - The force that is applied to the acceleration.
  */
  applyForce(force)
  {
    this.acceleration.add(force)
  }
  /**
  * Checks whether the particle is alive or dead.
  * @return {boolean} Bool that tells whether the particle is dead (true) or alive (false).
  */
  isDead()
  {
    return this.lifespan < 0 ? true : false
  }
  
  /**
  * Updates the position, and lifespan, of the particle.
  */
  update()
  {
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
    this.lifespan -= this.lifespanRate
  }
  
  /**
  * Draws the particle to a canvas. This method needs to be implemented based on the   particle type.
  */
  draw()
  {
    
  }
  
  /**
  * Updates and draws a particle.
  */
  run()
  {
    this.update()
    this.draw()
  }
}