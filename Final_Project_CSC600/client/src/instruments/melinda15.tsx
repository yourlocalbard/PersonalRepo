// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React, {useEffect} from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Kalimba.
 ** ------------------------------------------------------------------------ */

interface KalimbaKeyProps {
  note: string; // C, D, E, F, G, A, B
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

//drawing of the pianokey includes some inline functions and styling
export function KalimbaKey({
  note,
  synth,
  minor,
  index,
}: KalimbaKeyProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the piano.
   * See `PianoKeyWithoutJSX` for the React component without JSX.
   */
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div
      onMouseDown={() => synth?.triggerAttackRelease(`${note}`, "8n")} // Question: what is `onMouseDown`?
      //Answer: onMouseDown is the indication that the mouse clicks on a specific part of the instrument
      // onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
      //Answer: onMouseUp is when there is no input coming from the mouse being clicked down, so the mouse is up
      className={classNames('ba pointer absolute dim', {
        'black bg-white h4': !minor, // major keys are white
      })}
      style={{
        // CSS
        top: 0,
        left: `${index * 2}rem`,
        width: '1.5rem',
        marginLeft: '1rem',
        borderBottomLeftRadius: '40px',
        borderBottomRightRadius: '40px',
      }}
    ></div>
  );
}


function KalimbaType({ title, onClick, active }: any): JSX.Element {
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

//the notes that are in the piano
function Kalimba({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'D', idx: 7, octave: 6 }, //octave 6
    { note: 'B', idx: 8, octave: 5 }, //octave 5
    { note: 'G', idx: 9, octave: 5 }, //octave 5
    { note: 'E', idx: 10, octave: 5  }, //octave 5
    { note: 'C', idx: 11, octave: 5  }, //octave 5
    { note: 'A', idx: 12, octave: 4  }, //octave 4
    { note: 'F', idx: 13, octave: 4  }, //octave 4
    { note: 'D', idx: 14, octave: 4  }, //octave 4
    { note: 'C', idx: 15, octave: 4  }, //octave 4
    { note: 'E', idx: 16, octave: 4  }, //octave 4
    { note: 'G', idx: 17, octave: 4  }, //octave 4
    { note: 'B', idx: 18, octave: 4  }, //octave 4
    { note: 'D', idx: 19, octave: 5  }, //octave 5
    { note: 'F', idx: 20, octave: 5  }, //octave 5
    { note: 'A', idx: 21, octave: 5  }, //octave 5
    { note: 'C', idx: 22, octave: 6  }, //octave 6
    { note: 'E', idx: 23, octave: 6  }, //octave 6
  ]);

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.FMSynth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
        envelope: {
          attack: 1,
          decay: 0.5,
          release: 1,
          sustain: 1
        }

      }).toDestination() as any;
    });
  };

  useEffect(() => {
    setOscillator("square20");
  }, []);

  // const oscillators: List<OscillatorType> = List([
  //   'sine',
  //   'sawtooth',
  //   'square',
  //   'triangle',
  //   'fmsine',
  //   'fmsawtooth',
  //   'fmtriangle',
  //   'amsine',
  //   'amsawtooth',
  //   'amtriangle',
  // ]) as List<OscillatorType>;

  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
        {Range(1, 2).map(octave =>
          keys.map(key => {
            const note = `${key.note}${key.octave}`;
            return (
              <KalimbaKey
                key={note} //react key
                note={note}
                synth={synth}
                octave={octave} 
                index={(octave - 2) * 2 + key.idx}
              />
            );
          }),
        )}
      </div>
      {/* <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <KalimbaType
            key={o}
            title={o}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))}
      </div> */}
    </div>
  );
}

export const KalimbaInstrument = new Instrument('Kalimba', Kalimba);
