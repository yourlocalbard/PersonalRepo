// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const yourlocalbard = new Visualizer(
  'yourlocalbard',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background('#fae'); //Change the background color to pink
    //Because who does hearts without a pink background???
    p5.strokeWeight(dim * 0.01);
    p5.stroke(0, 0, 0, 255);
    //p5.noFill();
    p5.angleMode('degrees');
    p5.translate(width / 2, height / 2);

    const values = analyzer.getValue();    

    function heart(xpos : number, ypos : number, size : number) {        
        p5.beginShape();
        const index = p5.floor(p5.map(0, 0, 180, 0, values.length - 1));
        const amplitude = values[index] as number;
        const r = p5.map(amplitude, -1, 1, 150, 350);
        const x = p5.map(0, 0, values.length - 1, 0, width);
        const y = height / 2 + amplitude * height;
        
        p5.vertex(x, y);
        p5.bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
        p5.bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
        p5.translate(xpos, ypos);
        p5.endShape();
    }

    // Manually centering this heart because I'm lazy
    heart(-100, -275, 200);
  }, 
);
