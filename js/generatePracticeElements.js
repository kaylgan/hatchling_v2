// window.scrollTo(0, document.body.scrollHeight);
// window.scrollTo(0, document.querySelector("drill-content").scrollHeight);
// console.log("scrolled");

/*
  metronome is modified from:
  https://grantjam.es/creating-a-simple-metronome-using-javascript-and-the-web-audio-api
  https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Advanced_techniques
*/

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

  //----------TEMPO
  const bpmControl = document.querySelector('#bpm');
  bpmControl.value = 120;
  const bpmValEl = document.querySelector('#bpmval');
  let tempo = bpmControl.value;

  bpmControl.addEventListener('change', ev => {
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
      }
      else {
          event.target.dataset.playing = 'false';
      }
  });
}
configureMetronome();
