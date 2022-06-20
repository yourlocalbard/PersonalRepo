// 3rd party
import { List, Map } from 'immutable';
import { BassInstrument } from './instruments/yourlocalbard';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { CleGuren } from './visualizers/CleGuren';
import { BongoInstrument } from './instruments/CleGuren';
import { WaveformVisualizer } from './visualizers/Waveform';
import { yourlocalbard } from './visualizers/yourlocalbard';
import { melinda15 } from './visualizers/melinda15';
import { KalimbaInstrument } from './instruments/melinda15';


/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
const instruments = List([PianoInstrument, BassInstrument, KalimbaInstrument, BongoInstrument]);       // similar to Instrument[]

/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
//const visualizers = List([WaveformVisualizer]);    // similar to Visualizer[]
const visualizers = List([WaveformVisualizer, CleGuren, yourlocalbard, melinda15]);


/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
  'instruments': instruments,
  'visualizers': visualizers,
});