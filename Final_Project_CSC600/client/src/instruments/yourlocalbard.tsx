// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import { MidSideSplit } from 'tone';
import { KeyObject } from 'crypto';

interface BassNoteProps {
  note: string,
  synth?: Tone.Synth;
  sharp?: boolean;
  index: number;
  octave: number;
}

export function BassNote({
  note, 
  synth,
  sharp, 
  index,
  octave, 
}: BassNoteProps): JSX.Element {
  return (
    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)} //When the mouse is clicked down
      onMouseUp={() => synth?.triggerRelease('+0.25')} //When the mouse is clicked up
      className={classNames('ba pointer absolute dim', { 
        'bg-black black h3': sharp, // minor keys are black
        'black bg-white h4': !sharp, // major keys are white 
      })}
      
      style={{
        // CSS
        //This part is the individual frets of the bass
        left: `${index * 6.25}rem`,
        zIndex: sharp ? 1 : 0,
        width: window.innerWidth,
        height: sharp ? '1.0rem' : '1.25rem',
        marginLeft: sharp ? '0rem' : -30,  
        backgroundColor: 'brown',
        borderBlockColor: 'black',
      }}     
    ></div>
  );
}

function BassType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
        'b--black black': active,
        'gray b--light-gray': !active,
      })}
    >
      {title}
    </div>
  );
}

function Bass({synth, setSynth}: InstrumentProps): JSX.Element {
  const EString = List([
    { note: 'E', idx: 0, octave: 1},
    { note: 'F', idx: 1, octave: 1},
    { note: 'F#', idx: 2, octave: 1},
    { note: 'G', idx: 3, octave: 1},
    { note: 'G#', idx: 4, octave: 1},
    { note: 'A', idx: 5, octave: 1},
    { note: 'A#', idx: 6, octave: 1},
    { note: 'B', idx: 7, octave: 1},
    { note: 'C', idx: 8, octave: 2}, //Drops down
    { note: 'C#', idx: 9, octave: 2},
    { note: 'D', idx: 10, octave: 2},
    { note: 'D#', idx: 11, octave: 2},
    { note: 'E', idx: 12, octave: 2},
  ]);

  const AString = List([
    { note: 'A', idx: 0, octave: 2},
    { note: 'A#', idx: 1, octave: 2},
    { note: 'B', idx: 2, octave: 2},
    { note: 'C', idx: 3, octave: 3}, //Drops down
    { note: 'C#', idx: 4, octave: 3},
    { note: 'D', idx: 5, octave: 3},
    { note: 'D#', idx: 6, octave: 3},
    { note: 'E', idx: 7, octave: 3},
    { note: 'F', idx: 8, octave: 3},
    { note: 'F#', idx: 9, octave: 3},
    { note: 'G', idx: 10, octave: 3},
    { note: 'G#', idx: 11, octave: 3},
    { note: 'A', idx: 12, octave: 3},
  ]);

  const DString = List([
    { note: 'D', idx: 0, octave: 3},
    { note: 'D#', idx: 1, octave: 3},
    { note: 'E', idx: 2, octave: 3},
    { note: 'F', idx: 3, octave: 3},
    { note: 'F#', idx: 4, octave: 3},
    { note: 'G', idx: 5, octave: 3},
    { note: 'G#', idx: 6, octave: 3},
    { note: 'A', idx: 7, octave: 3},
    { note: 'A#', idx: 8, octave: 3},
    { note: 'B', idx: 9, octave: 3},
    { note: 'C', idx: 10, octave: 4}, //Drops down
    { note: 'C#', idx: 11, octave: 3},
    { note: 'D', idx: 12, octave: 3},
  ]);

  const GString = List([
    { note: 'G', idx: 0, octave: 3},
    { note: 'G#', idx: 1, octave: 3},
    { note: 'A', idx: 2, octave: 3},
    { note: 'A#', idx: 3, octave: 3},
    { note: 'B', idx: 4, octave: 3},
    { note: 'C', idx: 5, octave: 4},
    { note: 'C#', idx: 6, octave: 4},
    { note: 'D', idx: 7, octave: 4},
    { note: 'D#', idx: 8, octave: 4},
    { note: 'E', idx: 9, octave: 4},
    { note: 'F', idx: 10, octave: 4},
    { note: 'F#', idx: 11, octave: 4},
    { note: 'G', idx: 12, octave: 4},
  ]);

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
      }).toDestination();
    });
  };

  const oscillators: List<OscillatorType> = List([
    'sine',
    'sawtooth',
    'square',
    'triangle',
    'fmsine',
    'fmsawtooth',
    'fmtriangle',
    'amsine',
    'amsawtooth',
    'amtriangle',
  ]) as List<OscillatorType>;

  return (
    <div className="pv4">
      <div className='relative dib h1 w-100 ml4'>
      {EString.map(key => {
            const note = `${key.note}${1}`;
            return (
              <BassNote
                key={note} //react key
                note={note}
                synth={synth}
                octave={key.octave}
                index={key.idx}
              />
            );
        })}
      </div>
      <div className='relative dib h1 w-100 ml4'>
      {AString.map(key => {
            const note = `${key.note}${2}`;
            return (
              <BassNote
                key={note} //react key
                note={note}
                synth={synth}
                octave={key.octave}
                index={key.idx}
              />
            );
        })}
      </div>
      <div className='relative dib h1 w-100 ml4'>
      {DString.map(key => {
            const note = `${key.note}${3}`;
            return (
              <BassNote
                key={note} //react key
                note={note}
                synth={synth}
                octave={key.octave}
                index={key.idx}
              />
            );
        })}
      </div>
      <div className='relative dib h1 w-100 ml4'>
      {GString.map(key => {
            const note = `${key.note}${4}`;
            return (
              <BassNote
                key={note} //react key
                note={note}
                synth={synth}
                octave={key.octave}
                index={key.idx}
              />
            );
        })}
      </div>
      <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <BassType
            key={o}
            title={o}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))}
      </div>
    </div>
  );
}

// For State.tsx
export const BassInstrument = new Instrument('Bass', Bass);
