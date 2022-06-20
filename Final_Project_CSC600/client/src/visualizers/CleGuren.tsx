// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';
import { Waveform } from 'tone';
import { SideNav } from '../SideNav';

// project imports
import { Visualizer } from '../Visualizers';

const manyStars: BackgroundEffects[] = [];

export const CleGuren = new Visualizer(
  'CleGuren',
  (p5: P5, analyzer: Tone.Analyser) => {
    const star = new BackgroundEffects(p5, 0, 0, 30, 70, 5);
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);
    
    p5.background(255, 71, 71, 255);
    p5.strokeWeight(100 * 0.01);
    p5.stroke(0, 0, 0, 255);
    p5.fill(28, 43, 252, 255);
    p5.translate(width / 2.5, height / 2);

    const values = analyzer.getValue();
    p5.beginShape();
    for (let i = 0; i <= 180; i++) {
      // wave[index] is values[i] aka amplitude
      const index = Math.floor(p5.map(i, 0, 180, 0, values.length - 1));

      const r = p5.map(values[index] as number, -1, 1, 150, 350) / 1.5;

      const x = r * Math.sin(i);
      const y = r * Math.cos(i);
      // Place vertex
      p5.vertex(x, y);
    }
    p5.endShape();

    p5.push();
    p5.fill(255, 255, 255);
    p5.beginShape();
    for (let i = 0; i <= 180; i++) {
      // wave[index] is values[i] aka amplitude
      const index = p5.floor(p5.map(i, 0, 180, 0, values.length - 1));

      const r = p5.map(values[index] as number, -1, 1, 150, 350) / 2;

      const x = r * p5.sin(i);
      const y = r * p5.cos(i);
      // Place vertex
      p5.vertex(x, y);
    }
    p5.endShape();
    p5.pop();

    // p5.push();
    // p5.fill(218, 42, 42, 255);
    // p5.beginShape();
    // for (let i = 0; i <= 180; i++) {
    //   // wave[index] is values[i] aka amplitude
    //   const index = p5.floor(p5.map(i, 0, 180, 0, values.length - 1));

    //   const r = p5.map(values[index] as number, -1, 1, 150, 350) / 3;

    //   const x = r * p5.sin(i);
    //   const y = r * p5.cos(i);
    //   // Place vertex
    //   p5.vertex(x, y);
    // }
    // p5.endShape();
    // p5.pop();

    // p5.push();
    // p5.fill(47, 17, 240, 255);
    // p5.beginShape();
    // for (let i = 0; i <= 180; i++) {
    //   // wave[index] is values[i] aka amplitude
    //   const index = p5.floor(p5.map(i, 0, 180, 0, values.length - 1));

    //   const r = p5.map(values[index] as number, -1, 1, 150, 350) / 4;

    //   const x = r * p5.sin(i);
    //   const y = r * p5.cos(i);
    //   // Place vertex
    //   p5.vertex(x, y);
    // }
    // p5.endShape();
    // p5.pop();

    p5.push();
    p5.rotate(p5.frameCount / -100.0);
    p5.fill(218, 42, 42, 255)
    star.createStar();
    p5.pop();

    if (manyStars.length < 20) {
      for (let i = 0; i < 10; i++) {
        const star2 = new BackgroundEffects(p5, p5.random(-800, -190), p5.random(-200, 200), 10, 20, 5);
        manyStars.push(star2);
        const star3 = new BackgroundEffects(p5, p5.random(190, 800), p5.random(-200, 200), 10, 20, 5);
        manyStars.push(star3);
      }
    }

    p5.push();
    p5.fill(255, 255, 255)
    for (let i = 0; i < manyStars.length; i++) {
      manyStars[i].createStar()
    }
    p5.pop();
  },
);

class BackgroundEffects {

  private p5: P5;
  private x: number;
  private y: number;
  private radius1: number;
  private radius2: number;
  private npoints: number;

  constructor(p5: P5, x_value: number, y_value: number, radius1_value: number, radius2_value: number, npoints_value: number){
    this.p5 = p5;
    this.x = x_value;
    this.y = y_value;
    this.radius1 = radius1_value;
    this.radius2 = radius2_value;
    this.npoints = npoints_value;
  }

  createStar() {
    let angle = this.p5.TWO_PI / this.npoints;
    let halfAngle = angle / 2.0;
    this.p5.beginShape();
    for (let a = 0; a < this.p5.TWO_PI; a += angle) {
      let sx = this.x + this.p5.cos(a) * this.radius2;
      let sy = this.y + this.p5.sin(a) * this.radius2;
      this.p5.vertex(sx, sy);
      sx = this.x + this.p5.cos(a + halfAngle) * this.radius1;
      sy = this.y + this.p5.sin(a + halfAngle) * this.radius1;
      this.p5.vertex(sx, sy);
    }
    this.p5.endShape(this.p5.CLOSE);
  }
}
