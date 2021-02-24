// var metronome = new Metronome();
// activateMetronomeButtons();
//
// //----------TEMPO
// const bpmControl = document.querySelector('#bpm');
// const bpmValEl = document.querySelector('#bpmval');
// let tempo = bpmControl.value;
//
// bpmControl.addEventListener('input', ev => {
//   tempo = Number(ev.target.value);
//   metronome.tempo = parseInt(tempo);
//   bpmValEl.innerText = tempo;
// }, false);

// let lastNoteDrawn = 3;
// function draw() {
//   let drawNote = metronome.lastNoteDrawn;
//   const currentTime = metronome.audioContext.currentTime;
//
//   while (metronome.notesInQueue.length && metronome.notesInQueue[0].time < currentTime) {
//     drawNote = metronome.notesInQueue[0].note;
//     metronome.notesInQueue.splice(0,1);   // remove note from queue
//   }
//
//   // We only need to draw if the note has moved.
//   if (metronome.lastNoteDrawn !== drawNote) {
//     document.querySelectorAll('.pads').forEach(el => {
//       el.children[metronome.lastNoteDrawn].style.borderColor = 'hsla(0, 0%, 10%, 1)';
//       el.children[drawNote].style.borderColor = 'hsla(49, 99%, 50%, 1)';
//     });
//
//     metronome.lastNoteDrawn = drawNote;
//   }
//   // set up to draw again
//   requestAnimationFrame(draw);
// }

// //----------PLAY/PAUSE
// const playButton = document.querySelector('[data-playing]');
// let isPlaying = false;
// // var playPauseIcon = document.getElementById('play-pause-icon');
//
// // var playButton = document.getElementById('play-button');
// playButton.addEventListener('click', function() {
//     metronome.startStop();
//
//     if (metronome.isRunning) {
//         // playPauseIcon.className = 'pause';
//         event.target.dataset.playing = 'true';
//         requestAnimationFrame(draw); // start the drawing loop.
//     }
//     else {
//         // playPauseIcon.className = 'play';
//         event.target.dataset.playing = 'false';
//     }
//
// });
