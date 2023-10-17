/**
* Creates a particle system based on a given particle.
*/
class ParticleSystem
{
  /**
  * Creates a particle system
  * @param {p5Vector} origin - The initial point of the particles (emmitter).
  * @param {number} spawnRate - How often a particle is spawned.
  */
  constructor(origin, spawnRate)
  {
    this.particles = []
    this.origin = origin
    this.spawnRate = spawnRate
  }
  
  addParticle()
  {
    const x = random(900)
    const life = random(150, 255)
    const particle = new Particle(createVector(x, -100), life, 2)
  
    particle.velocity = createVector(random(-0.2, 0.2), random(1,5))
    particle.acceleration = createVector(0, 0.098, 0)
  
    particle.draw = () => {
      stroke(80, 150, 160, particle.lifespan)
      const p = particle.position
      const v = particle.velocity.copy().normalize()
      line(p.x, p.y, p.x+particle.lineWidth*v.x, p.y+particle.lineWidth*v.y)
      //ellipse(particle.position.x, particle.position.y, 30,30)
    }
    this.particles.push(particle)  
  }
  
  run()
  {
    if(frameCount % this.spawnRate == 0)
    {
      for(let i = 0; i<50; i++)
        this.addParticle()
    }
    
    for(let index = this.particles.length-1; index >= 0; index--)
    {
      if(!this.particles[index].isDead())
      {
        //this.particles[index].applyForce(createVector(0, 0.01))
        this.particles[index].run()
      }
      else
        this.particles.splice(index, 1)
    }
    /*this.particles = this.particles.filter(p => !p.isDead())
    for(let particle of this.particles)
      particle.run()
    */
    /*for(let particle of this.particles)
    {
      if(particle.isDead())
        this.particles.splice(this.particles.indexOf(particle),1)
      else
        particle.run()
    }*/
    //console.log(this.particles.length)
  }
  
}