import React, { useRef, useEffect } from 'react';

const NotePlayer = ({ play }) => {
  const playerRef = useRef(null);
  const loadedRef = useRef(false);
  const libsLoadedRef = useRef(false);
  const timeoutRefs = useRef([]);
  const activeNotesRef = useRef(new Map()); // Track active notes for smoother transitions
  const recentNotesRef = useRef([]);
  const AVOID_REPETITION_LENGTH = 5; // How many recent notes to avoid
  
  // Musical scales and patterns
  const scales = {
    // Major scales (MIDI note numbers relative to C)
    cMajor: [0, 2, 4, 5, 7, 9, 11],
    fMajor: [0, 2, 4, 5, 7, 9, 11].map(n => n + 5),
    gMajor: [0, 2, 4, 5, 7, 9, 11].map(n => n + 7),
    
    // Natural minor scales
    aMinor: [0, 2, 3, 5, 7, 8, 10],
    
    // Modal scales for color
    dorian: [0, 2, 3, 5, 7, 9, 10],
    lydian: [0, 2, 4, 6, 7, 9, 11],
    
    // Pentatonic for more consonant intervals
    majorPentatonic: [0, 2, 4, 7, 9],
    minorPentatonic: [0, 3, 5, 7, 10],

    // More experimental scales
    wholeTone: [0, 2, 4, 6, 8, 10], // Dreamy, ambiguous
    octatonic: [0, 1, 3, 4, 6, 7, 9, 10], // Diminished scale
    chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // All notes
    augmented: [0, 3, 4, 7, 8, 11], // Symmetrical augmented
    blues: [0, 3, 5, 6, 7, 10], // Blues scale with blue notes
  };
  
  // Current musical state
  const currentState = useRef({
    rootNote: 60, // Middle C
    scale: 'cMajor',
    lastNote: null,
    lastInterval: 0,
    momentum: 0, // For creating melodic lines
    pendingNotes: [], // For arpeggios and chords
    phrase: [], // Store last few notes to create phrases
    phraseDirection: 0, // 1 for ascending, -1 for descending, 0 for mixed
    tempo: 120, // BPM
    currentKey: 'C', // Track current key for modulation
    modulation: { target: null, progress: 0 } // Gradual modulation state
  });
  
  // Rhythm patterns (in 16th note subdivisions)
  const rhythmPatterns = [
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // Quarter notes
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0], // Dotted half notes
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // Mixed
  ];
  
  const LOWEST_NOTE = 48;
  const HIGHEST_NOTE = 84;
  
  // Duration weights (removing shorter notes, favoring quarter notes and longer)
  const durationWeights = {
    'h': 3,  // Half notes
    'w': 1   // Whole notes
  };

  // Load libraries as script tags and initialize the player
  useEffect(() => {
    const loadLibrariesAndInitPlayer = async () => {
      try {
        // Create a promise that resolves when both scripts are loaded
        const loadLibraries = () => {
          return new Promise((resolve, reject) => {
            // Check if already loaded
            if (window.mm && window.Tone) {
              libsLoadedRef.current = true;
              resolve();
              return;
            }

            // Create and load Tone.js
            const toneScript = document.createElement('script');
            toneScript.type = 'module';
            toneScript.textContent = `
              import('https://cdn.jsdelivr.net/npm/tone@next/+esm').then(module => {
                window.Tone = module.default || module;
                window.toneLoaded = true;
              });
            `;
            document.head.appendChild(toneScript);

            // Create and load Magenta
            const mmScript = document.createElement('script');
            mmScript.type = 'module';
            mmScript.textContent = `
              import('https://cdn.jsdelivr.net/npm/@magenta/music@1.23.1/+esm').then(module => {
                window.mm = module.default || module;
                window.mmLoaded = true;
              });
            `;
            document.head.appendChild(mmScript);

            // Check for both libraries to be loaded
            const checkInterval = setInterval(() => {
              if (window.toneLoaded && window.mmLoaded) {
                clearInterval(checkInterval);
                libsLoadedRef.current = true;
                resolve();
              }
            }, 100);

            // Timeout after 10 seconds
            setTimeout(() => {
              if (!libsLoadedRef.current) {
                clearInterval(checkInterval);
                reject(new Error('Failed to load libraries'));
              }
            }, 10000);
          });
        };

        // Load the libraries
        await loadLibraries();

        // Create player instance
        playerRef.current = new window.mm.SoundFontPlayer(
          "https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus"
        );

        // Load all the samples we might need
        const seq = {
          notes: Array.from({ length: HIGHEST_NOTE - LOWEST_NOTE + 1 }, (_, i) => ({
            pitch: LOWEST_NOTE + i,
          })),
        };

        await playerRef.current.loadSamples(seq);
        loadedRef.current = true;
        console.log("NotePlayer samples loaded");
        
        // Initialize musical state
        selectNewScale();
      } catch (error) {
        console.error("Error loading NotePlayer samples:", error);
      }
    };

    loadLibrariesAndInitPlayer();

    // Cleanup
    return () => {
      if (playerRef.current) {
        playerRef.current = null;
      }
      // Clear all pending timeouts
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefs.current = [];
      
      // Stop all active notes
      activeNotesRef.current.forEach((noteData, pitch) => {
        if (playerRef.current) {
          playerRef.current.playNoteUp({ pitch });
        }
      });
      activeNotesRef.current.clear();
    };
  }, []);

  // Play a random note when triggered
  useEffect(() => {
    if (play && loadedRef.current && playerRef.current) {
      playMusicalNote();
    }
  }, [play]);
  
  // Select a new scale occasionally for variety
  const selectNewScale = () => {
    const state = currentState.current;
    
    // More frequent modulation for more experimental feel
    if (Math.random() < 0.08) {
      // Smooth key modulation - move to closely related keys
      const keyRelationships = {
        'C': ['F', 'G', 'A', 'E', 'Bb'],  // Added more distant keys
        'F': ['C', 'Bb', 'D', 'G', 'Eb'], // Added more distant keys
        'G': ['C', 'D', 'E', 'A', 'F'],   // Added more distant keys
        'A': ['C', 'D', 'F', 'E', 'G'],   // Added more distant keys
        'E': ['A', 'B', 'C#', 'G#', 'D'], // Added more distant keys
        'Bb': ['F', 'Eb', 'G', 'C', 'Ab'] // Added more distant keys
      };
      
      const possibleKeys = keyRelationships[state.currentKey] || ['C'];
      const newKey = possibleKeys[Math.floor(Math.random() * possibleKeys.length)];
      
      // Map keys to scales with more experimental options
      const keyToScale = {
        'C': ['cMajor', 'wholeTone', 'chromatic'],
        'F': ['fMajor', 'octatonic', 'blues'],
        'G': ['gMajor', 'augmented', 'chromatic'],
        'A': ['aMinor', 'blues', 'octatonic'],
        'D': ['dorian', 'wholeTone', 'chromatic'],
        'E': ['majorPentatonic', 'augmented', 'blues'],
        'Bb': ['minorPentatonic', 'octatonic', 'chromatic']
      };
      
      const keyToRoot = {
        'C': 60,
        'F': 65,
        'G': 67,
        'A': 57,
        'D': 62,
        'E': 64,
        'Bb': 58
      };
      
      // Randomly select from available scales for the key
      const availableScales = keyToScale[newKey] || ['cMajor'];
      state.scale = availableScales[Math.floor(Math.random() * availableScales.length)];
      state.rootNote = keyToRoot[newKey] || 60;
      state.currentKey = newKey;
      
      console.log(`Modulated to ${newKey} (${state.scale})`);
    }
  };

  const findScaleDegree = (pitch, rootNote, scale) => {
  const noteInScale = (pitch - rootNote + 120) % 12; // Ensure positive
  let bestIndex = 0;
  let minDistance = Infinity;
  
  scale.forEach((note, index) => {
    const distance = Math.abs(note - noteInScale);
    if (distance < minDistance) {
      minDistance = distance;
      bestIndex = index;
    }
  });
  
  // Calculate octave
  const octave = Math.floor((pitch - rootNote) / 12);
  return { scaleDegree: bestIndex, octave };
};
  
  // Get weighted random choice
  const getWeightedRandom = (weights) => {
    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;
    
    for (const [key, weight] of Object.entries(weights)) {
      random -= weight;
      if (random <= 0) return key;
    }
    return Object.keys(weights)[0];
  };
  
  // Generate melodic intervals based on momentum and phrase structure
  const generateMelodicInterval = () => {
    const state = currentState.current;
    let intervalWeights = {};
    
    // Check recent notes to avoid repetition
    const recentNotes = state.phrase.slice(-4);
    const lastNote = recentNotes[recentNotes.length - 1];
    
    // Analyze recent phrase pattern
    let hasAscended = 0;
    let hasDescended = 0;
    
    for (let i = 1; i < recentNotes.length; i++) {
      if (recentNotes[i] > recentNotes[i-1]) hasAscended++;
      if (recentNotes[i] < recentNotes[i-1]) hasDescended++;
    }
    
    // More experimental intervals with occasional dissonance
    if (hasAscended > hasDescended + 1) {
      // We've been ascending, favor descent or staying
      intervalWeights = {
        '-2': 4, '-1': 3, '0': 1, '1': 2, '2': 2, // Reduced weight for same note
        '-3': 3, '3': 2,
        '-4': 2, '4': 1,
        '-5': 1, '5': 1,
        '-6': 0.5, '6': 0.5,
        '-7': 0.3, '7': 0.3,
        '-8': 0.2, '8': 0.2,
        '-9': 0.1, '9': 0.1,
      };
    } else if (hasDescended > hasAscended + 1) {
      // We've been descending, favor ascent or staying
      intervalWeights = {
        '1': 3, '2': 3, '0': 1, '-1': 2, '-2': 2, // Reduced weight for same note
        '3': 3, '-3': 2,
        '4': 2, '-4': 1,
        '5': 1, '-5': 1,
        '6': 0.5, '-6': 0.5,
        '7': 0.3, '-7': 0.3,
        '8': 0.2, '-8': 0.2,
        '9': 0.1, '-9': 0.1,
      };
    } else {
      // Balanced motion with more experimental intervals
      intervalWeights = {
        '-2': 3, '-1': 3, '0': 1, '1': 3, '2': 3, // Reduced weight for same note
        '-3': 2, '3': 2,
        '-4': 2, '4': 2,
        '-5': 1.5, '5': 1.5,
        '-6': 1, '6': 1,
        '-7': 0.5, '7': 0.5,
        '-8': 0.3, '8': 0.3,
        '-9': 0.2, '9': 0.2,
      };
    }
    
    // Further reduce weight for intervals that would repeat recent notes
    if (recentNotes.length >= 2) {
      const lastInterval = lastNote - recentNotes[recentNotes.length - 2];
      if (lastInterval === 0) {
        // If last note was a repeat, strongly avoid repeating again
        intervalWeights['0'] = 0.1;
      }
      
      // Check for patterns of 3 or more repeated notes
      let repeatedCount = 1;
      for (let i = recentNotes.length - 2; i >= 0; i--) {
        if (recentNotes[i] === lastNote) {
          repeatedCount++;
        } else {
          break;
        }
      }
      
      if (repeatedCount >= 2) {
        // If we've already repeated notes, strongly avoid the same interval
        intervalWeights['0'] = 0;
      }
    }
    
    return parseInt(getWeightedRandom(intervalWeights));
  };
  
  // Get note from scale
  const getNoteFromScale = (scaleIndex, octaveShift = 0) => {
    const scale = scales[currentState.current.scale];
    
    // Handle negative scale indices
    let realIndex = scaleIndex;
    let realOctave = octaveShift;
    
    while (realIndex < 0) {
      realIndex += scale.length;
      realOctave--;
    }
    
    const noteInScale = scale[realIndex % scale.length];
    const octave = Math.floor(realIndex / scale.length) + realOctave;
    const finalNote = currentState.current.rootNote + noteInScale + (12 * octave);
    
    // Ensure we return a valid MIDI note number
    return Math.max(LOWEST_NOTE, Math.min(HIGHEST_NOTE, finalNote));
  };
  
  // Generate rhythmically aware timing
  const generateRhythmicTiming = () => {
    const state = currentState.current;
    const pattern = rhythmPatterns[0]; // Use the simplest pattern for now
    const currentBeat = (Date.now() / (60000 / state.tempo)) % pattern.length;
    const nearestBeat = Math.round(currentBeat);
    
    // Wait until next strong beat if we're off rhythm
    const waitTime = pattern[nearestBeat % pattern.length] ? 0 : 
      ((nearestBeat + 1) % pattern.length - currentBeat) * (60000 / state.tempo / 4);
    
    return Math.max(0, waitTime);
  };

  const playMusicalNote = async () => {
    if (!loadedRef.current || !playerRef.current || !window.Tone) {
      console.log("NotePlayer still loading...");
      return;
    }

    try {
      // Resume audio context if needed
      if (window.Tone.context.state !== 'running') {
        await window.Tone.context.resume();
      }
      
      const state = currentState.current;
      selectNewScale(); // Occasionally modulate
      
      // Check if we have pending notes (for arpeggios/chords)
      if (state.pendingNotes.length > 0) {
        const pitch = state.pendingNotes.shift();
        if (typeof pitch === 'number' && !isNaN(pitch)) {
          await playNote(pitch);
        }
        return;
      }
      
      // 30% chance to play a chord or arpeggio
      if (Math.random() < 0.4) {
        const chordType = Math.random() < 0.7 ? 'arpeggio' : 'chord';
        const scale = scales[state.scale];
        
        // Choose chord based on recent melodic context
        let rootIndex;
        if (state.lastNote !== null) {
          // Find closest scale degree to last note
          const lastScaleDegree = (state.lastNote - state.rootNote) % 12;
          rootIndex = scale.findIndex(note => note === lastScaleDegree);
          if (rootIndex === -1) rootIndex = 0;
          
          // Choose a harmonically related chord
          const harmonicChoices = [0, 2, 4]; // I, iii, V
          rootIndex = harmonicChoices[Math.floor(Math.random() * harmonicChoices.length)];
        } else {
          rootIndex = 0; // Start with tonic
        }
        
        // Build chord (triad)
        const chordIntervals = [0, 2, 4];
        const chordNotes = chordIntervals.map(interval => 
          getNoteFromScale(rootIndex + interval)
        ).filter(note => typeof note === 'number' && !isNaN(note));
        
        if (chordType === 'chord') {
          // Play all notes simultaneously
          chordNotes.forEach(pitch => playNote(pitch, 1000));
        } else {
          // Play as arpeggio (sequence)
          state.pendingNotes = chordNotes.slice(1); // Add remaining notes to queue
          playNote(chordNotes[0]);
        }
        return;
      }
      
      // Generate next note melodically
      let pitch;
      if (state.lastNote === null) {
        // First note - pick from middle range with harmonic importance
        const scale = scales[state.scale];
        const harmonicNotes = [0, 2, 4]; // Tonic, third, fifth
        const scaleIndex = harmonicNotes[Math.floor(Math.random() * harmonicNotes.length)];
        pitch = getNoteFromScale(scaleIndex, 1); // One octave up from root
      } else {
        // Generate melodic interval based on phrase analysis
        const interval = generateMelodicInterval();
        
        // Find current note in scale
        const currentNoteInScale = (state.lastNote - state.rootNote) % 12;
        let currentScaleIndex = scales[state.scale].findIndex(note => note === currentNoteInScale);
        
        if (currentScaleIndex === -1) {
          // Not in current scale, find closest note
          currentScaleIndex = 0;
          let minDistance = Infinity;
          scales[state.scale].forEach((note, index) => {
            const distance = Math.abs(note - currentNoteInScale);
            if (distance < minDistance) {
              minDistance = distance;
              currentScaleIndex = index;
            }
          });
        }
        
        // Calculate current octave
        const currentOctave = Math.floor((state.lastNote - state.rootNote) / 12);
        
        // Calculate new scale position
        const newScaleIndex = currentScaleIndex + interval;
        
        pitch = getNoteFromScale(newScaleIndex, currentOctave);
        
        // Keep within a comfortable range
        pitch = Math.max(LOWEST_NOTE + 12, Math.min(HIGHEST_NOTE - 12, pitch));
        
        // Update momentum more gradually
        state.momentum += interval * 0.5;
        state.momentum *= 0.9; // Stronger decay for more melodic behavior
      }
      
      // Add note to phrase history
      state.phrase.push(pitch);
      if (state.phrase.length > 8) {
        state.phrase.shift(); // Keep only last 8 notes
      }
      
      // Update state
      state.lastNote = pitch;
      state.lastInterval = pitch - (state.lastNote || pitch);
      
      // Rhythmic timing
      const delay = generateRhythmicTiming();
      
      // Select duration with weights
      const duration = getWeightedRandom(durationWeights);
      const durationMs = {
        'h': 1000,  // Half note
        'w': 2000   // Whole note
      }[duration];
      
      // Play with slight delay for rhythm
      setTimeout(async () => {
        await playNote(pitch, durationMs);
      }, delay);
      
    } catch (error) {
      console.error("Error playing note:", error);
    }
  };
  
  // Helper function to play a single note with improved smoothness and fadeout
  const playNote = async (pitch, durationMs = 1000) => {
    try {
      // Check if component is still mounted
      if (!playerRef.current) return;

      // Validate pitch is a valid number
      if (typeof pitch !== 'number' || isNaN(pitch)) {
        console.error("Invalid pitch:", pitch);
        return;
      }
      
      // Ensure pitch is within valid MIDI range
      const validPitch = Math.max(LOWEST_NOTE, Math.min(HIGHEST_NOTE, Math.round(pitch)));
      
      // Extended release time for smoother fadeout
      const baseReleaseTime = 4000; // Much longer base release time
      const maxReleaseTime = 8000; // Much longer max release time
      const releasePercentage = 0.9; // Use almost the entire duration for release
      const releaseTime = Math.max(baseReleaseTime, Math.min(maxReleaseTime, durationMs * releasePercentage));
      
      // Velocity options with more variety for smoother dynamics
      const velocityOptions = [63, 79, 47, 95, 111, 31, 15, 127];
      
      // Function to try playing with different velocities
      const tryPlayWithVelocity = async (tryPitch, tryVelocity) => {
        return new Promise((resolve) => {
          try {
            playerRef.current.playNoteDown({ 
              pitch: tryPitch, 
              velocity: tryVelocity
            });
            resolve(true);
          } catch (error) {
            resolve(false);
          }
        });
      };
      
      // Try to play the main note with different velocities
      let successVelocity = null;
      for (const vel of velocityOptions) {
        const success = await tryPlayWithVelocity(validPitch, vel);
        if (success) {
          successVelocity = vel;
          break;
        }
      }
      
      // If no velocity worked, log and return
      if (!successVelocity) {
        console.warn(`No available velocity for pitch ${validPitch}`);
        return;
      }
      
      // Track this note as active
      const noteId = `${validPitch}_${Date.now()}`;
      activeNotesRef.current.set(noteId, {
        pitch: validPitch,
        velocity: successVelocity,
        startTime: Date.now(),
        duration: durationMs,
        releaseTime: releaseTime
      });
      
      // Simple fadeout with just one release
      const fadeTimeout = setTimeout(() => {
        if (playerRef.current) {
          playerRef.current.playNoteUp({ pitch: validPitch });
          activeNotesRef.current.delete(noteId);
        }
      }, durationMs + releaseTime);
      
      timeoutRefs.current.push(fadeTimeout);
      
    } catch (error) {
      console.error("Error playing single note:", error);
    }
  };

  // This component is invisible/headless
  return null;
};

export default NotePlayer;