/*
  metronome is modified from:
  https://grantjam.es/creating-a-simple-metronome-using-javascript-and-the-web-audio-api
  https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Advanced_techniques
*/

// -------------------- generate keyboard, hands, other elements --------------------
function generateElements() {
  generateKeyboard();
  generateRightHand();
  generateStenoOrder();
  getNextLesson(true, ["Click", "on", "Tutorial", "in", "the", "Lessons", "Menu", "to", "get", "started"]);
  generatePracticeLetters(getNextLesson());
  menuListener();
}
generateElements();

// -------------------- get the metronome instance --------------------
let getMetronome = (function(set = false, setValue = null) {
  let metronome = null;
  return function(setInner = set, setValueInner = setValue) {
    if (setInner) {
      metronome = setValueInner;
    }
    return metronome;
  }
})();

function configureMetronome() {
  var metronome = new Metronome();
  getMetronome(true, metronome);
  activateMetronomeButtons();

  //----------TEMPO
  const bpmControl = document.querySelector('#bpm');
  bpmControl.value = 120;
  const bpmValEl = document.querySelector('#bpmval');
  let tempo = bpmControl.value;

  bpmControl.addEventListener('input', ev => {
    tempo = Number(ev.target.value);
    metronome.tempo = parseInt(tempo);
    bpmValEl.innerText = tempo;
  }, false);

  //----------PLAY/PAUSE
  const playButton = document.querySelector('[data-playing]');
  let isPlaying = false;

  playButton.addEventListener('click', function() {
      metronome.startStop();

      if (metronome.isRunning) {
          event.target.dataset.playing = 'true';
          requestAnimationFrame(draw); // start the drawing loop.
      }
      else {
          event.target.dataset.playing = 'false';
      }
  });

  //----------SHOW/Hide
  const hideButton = document.getElementById('hide-button');
  const sequencer = document.getElementById('sequencer');
  const keyboard = document.getElementById('keyboard');
  const hands = document.getElementById('hands');
  const narration = document.getElementById('narration');
  const vocab = document.getElementById('notebook-paper');

  hideButton.addEventListener('click', function() {
    resetLesson();

    if (sequencer.hidden) {
      hideButton.innerHTML = '<i class="far fa-keyboard"></i>';
      sequencer.hidden = false;
      hands.hidden = true;
      keyboard.hidden = true;
      narration.hidden = true;
      vocab.hidden = true;
    } else {
      hideButton.innerHTML = '<i class="fas fa-drum"></i>';
      sequencer.hidden = true;
      hands.hidden = false;
      keyboard.hidden = false;
      if (narration.textContent) { narration.hidden = false; }
      vocab.hidden = false;
    }
  });

  // update the UI in time with the metronome
  function draw() {
    let drawNote = metronome.lastNoteDrawn;
    const currentTime = metronome.audioContext.currentTime;

    while (metronome.notesInQueue.length && metronome.notesInQueue[0].time < currentTime) {
      drawNote = metronome.notesInQueue[0].note;
      metronome.notesInQueue.splice(0,1);   // remove note from queue
    }

    // We only need to draw if the note has moved.
    if (metronome.lastNoteDrawn !== drawNote) {
      document.querySelectorAll('.pads').forEach(el => {
        if (metronome.tempo < 180) {
          // stop flashing for every pad if 3 or more flashes per second (!!PHOTOSENSITIVITY)
          el.children[drawNote].style.borderColor = 'yellow'; // hsla(49, 99%, 50%, 1)
        } else if (drawNote % 4 === 0){
          el.children[drawNote].style.borderColor = 'yellow'; // hsla(49, 99%, 50%, 1)
        }
        el.children[metronome.lastNoteDrawn].style.borderColor = 'black'; // hsla(0, 0%, 10%, 1)
      });

      metronome.lastNoteDrawn = drawNote;
    }

    requestAnimationFrame(draw); // set up to draw again
  }
}
configureMetronome();

// -------------------- add event listeners to metronome buttons --------------------
function activateMetronomeButtons(metronome = getMetronome()) {
  const pads = document.querySelectorAll('.pads');
  const allPadButtons = document.querySelectorAll('#tracks button');

  // switch aria attribute on click
  allPadButtons.forEach(el => {
    el.addEventListener('click', function buttonPress() {
      if (el.getAttribute('aria-checked') === 'false') {
        el.setAttribute('aria-checked', 'true');
      } else {
        el.setAttribute('aria-checked', 'false');
      }
    }, false);
  })
}

function removeMetronomeListeners() {
  const pads = document.querySelectorAll('.pads');
  const allPadButtons = document.querySelectorAll('#tracks button');

  // switch aria attribute on click
  allPadButtons.forEach(el => {
    el.removeEventListener('click', buttonPress, false)
  })
  // console.log("listeners removed");
}
