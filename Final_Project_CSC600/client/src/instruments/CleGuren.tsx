// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React, {useEffect} from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import BongoImage from '../instruments/Bongo_Instrument_Image.png';
import { Frequency, Signal } from 'tone';
import { sign } from 'crypto';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

interface BongoKeyProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Synth | Tone.AMSynth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; 
  width: string;
  height: string;
  top: string;
}

export function BangoKey({
  note,
  synth,
  minor,
  index,
  width,
  height,
  top,
}: BongoKeyProps): JSX.Element {
  return (
    <div
      onMouseDown={() => synth?.triggerAttackRelease(`${note}`, "4n")}
      // onMouseUp={() => synth?.triggerRelease('+0.25')}
      className={classNames('pointer absolute dim', {
        'bg-black black h3': minor, 
        'black bg-white h4': !minor,
      })}
      style={{
        // CSS
        height: height,
        width: width,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '50%',
        display: 'inline-block',
        left: `${index * 2}rem`,
        top: top,
      }}
    ></div>
  );
}

function BongoType({ title, onClick, active }: any): JSX.Element {
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

function Bongo({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'A', idx: 0 , octave: 4, height: '104px', width: '104px', top: '0px'},
    { note: 'B', idx: 3.6 , octave: 4, height: '79px', width: '79px', top: '20px'},
  ]);

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.AMSynth({
        oscillator: {
          type: newType
        } as Tone.OmniOscillatorOptions,
        envelope: {
          attack: 0.1,
        }
      }).toDestination() as any;
    });
  };

  // useEffect(() => {
  //   setOscillator("triangle");
  // }, []);

  const oscillators: List<OscillatorType> = List([
    'sine',
    'sawtooth',
    'square',
    'triangle',
    // 'fmsine',
    // 'fmsawtooth',
    // 'fmtriangle',
    // 'amsine',
    // 'amsawtooth',
    // 'amtriangle',
  ]) as List<OscillatorType>;

  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4"
        style={{backgroundImage: `url(${BongoImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 100%'}}>
        {Range(2, 3).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${key.octave}`;
            return (
              <BangoKey
                key={note} //react key
                note={note}
                synth={synth}
                minor={isMinor}
                octave={octave}
                index={(octave - 2) * 7 + key.idx}
                height={key.height}
                width={key.width}
                top={key.top}
              />
            );
          }),
        )}
      </div>
      <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <BongoType
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

export const BongoInstrument = new Instrument('Bongo', Bongo);
