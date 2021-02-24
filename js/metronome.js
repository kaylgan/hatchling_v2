/*
  modified from:
  https://grantjam.es/creating-a-simple-metronome-using-javascript-and-the-web-audio-api
  https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Advanced_techniques
*/

/* Typical Workflow: Input --> Effects --> Destination
  1) Create audio context
  2) Inside the context, create sources
    e.g. <audio>, oscillator, stream
  3) Create effects nodes
    e.g. reverb, biquad, filter, panner, compressor
  4) Choose final desination of audio
  5) Connect the sources up to the effects and the effects to the destination */

class Metronome
{
    constructor(tempo = 120)
    {
        this.audioContext = null;
        this.notesInQueue = [];         // notes that have been put into the web audio and may or may not have been played yet {note, time}
        this.currentQuarterNote = 0;
        this.tempo = tempo;
        this.lookahead = 25;          // How frequently to call scheduling function (in milliseconds)
        this.scheduleAheadTime = 0.1;   // How far ahead to schedule audio (sec)
        this.nextNoteTime = 0.0;     // when the next note is due
        this.isRunning = false;
        this.intervalID = null;
        this.lastNoteDrawn = 1;
    }

    nextNote()
    {
        let numberOfPads = 4;
        if (document.title == "custom - Hatchling") {
          console.log("no pads");
        } else {
          numberOfPads = document.querySelectorAll('.pads')[0].querySelectorAll('button').length;
        }

        // Advance current note and time by a quarter note (crotchet if you're posh)
        var secondsPerBeat = 60.0 / this.tempo; // Notice this picks up the CURRENT tempo value to calculate beat length.
        this.nextNoteTime += secondsPerBeat; // Add beat length to last beat time

        this.currentQuarterNote++;    // Advance the beat number, wrap to zero
        if (this.currentQuarterNote == numberOfPads) {
            this.currentQuarterNote = 0;
        }
    }

    scheduleNote(beatNumber, time) // (2) INSIDE THE CONTEXT, CREATE SOURCES
    {
        // push the note on the queue, even if we're not playing.
        this.notesInQueue.push({ note: beatNumber, time: time });

        // create an oscillator
        const osc = this.audioContext.createOscillator();
        const envelope = this.audioContext.createGain(); // (3) CREATE EFFECTS NODES

        osc.frequency.value = (beatNumber % 4 == 0) ? 1000 : 800;
        envelope.gain.value = 1;
        envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
        envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

        // (4) CHOOSE FINAL DESTINATION OF AUDIO
        // (5) CONNECT THE SOURCES UP TO THE EFFECTS, AND THE EFFECTS TO THE DESTINATION
        osc.connect(envelope);
        envelope.connect(this.audioContext.destination);

        playSound();
        // if (document.title == "Practice (from Steno Jig) - Hatchling Practice") {
        //   // console.log("no pads");
        //   playSound();
        // } else if (document.querySelectorAll('.pads button')[beatNumber].getAttribute('aria-checked') === 'true') {
        //   playSound();
        // }

        function playSound() {
          osc.start(time);
          osc.stop(time + 0.03);
        }
    }

    scheduler()
    {
        // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
        while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime ) {
            this.scheduleNote(this.currentQuarterNote, this.nextNoteTime);
            this.nextNote();
        }
    }

    start() // (1) CREATE AUDIO CONTEXT
    {
        if (this.isRunning) return;

        if (this.audioContext == null)
        {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        this.isRunning = true;

        this.currentQuarterNote = 0;
        this.nextNoteTime = this.audioContext.currentTime + 0.05;

        this.intervalID = setInterval(() => this.scheduler(), this.lookahead);
    }

    stop()
    {
        this.isRunning = false;

        clearInterval(this.intervalID);
    }

    startStop()
    {
        if (this.isRunning) {
            this.stop();
        }
        else {
            this.start();
        }
    }
}
