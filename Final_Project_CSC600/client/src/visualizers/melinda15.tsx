// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

const particles: Particle[] = []; //array of particles to hold the particles that are created
let check: boolean = false; //a check that is used to make sure the particles are created only once

export const melinda15 = new Visualizer(
  'melinda15 - Night Sky',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);
    
    //drawing the area where the visualizer is in the website
    p5.background(p5.color(30,20,79));
    p5.strokeWeight(dim * 0.01);
    p5.stroke(255, 255, 255, 255);
    p5.angleMode('degrees');
    const values = analyzer.getValue();
    

    //drawing of the half circle or moon

    p5.push();

    p5.translate( width / 2, height);
    p5.beginShape();

    for (let i = 0; i < 180; i++) {
      const idx = p5.floor(p5.map(i, 0, 180, 0, values.length - 1 ));
      const amplitude = values[idx] as number;

      const r = 2 * p5.map(amplitude, -1, 1, 0, 256);
      const x = r * p5.cos(i);
      const y = r * -p5.sin(i);
    
      // Place vertex
      p5.vertex(x, y);
    }
    p5.endShape();

    p5.pop();


    //creation of the particles with check so it's only created one time throughout it's time updating
    if(check === false) {
      for(let i = 0; i < width / 7; i++) {
        const particle = new Particle(p5);
        particles.push(particle);
      }

      check = true;
      
    }
    
    //createParticle() will draw the particles onto the visualizer
    for(let i = 0; i < particles.length; i++) {
      particles[i].createParticle();
    }
    
  },
);

//Particle class that allows me to make the particles that will show up in my visualizer
class Particle {

  private p5: P5;
  private x: number;
  private y: number;
  private r: number;


  constructor(p5: P5){
    this.p5 = p5;
    this.x = p5.random(0,window.innerWidth);
    this.y = p5.random(0,window.innerHeight);
    this.r = p5.random(1,8);
  }
  
  createParticle() {
    this.p5.noStroke();
    this.p5.fill('rgba(255,255,255,255)');
    this.p5.circle(this.x, this.y, this.r);
  }

}
