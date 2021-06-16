function runExercise(fields) {
	if(fields.drill === 'NumberSentences') exercise = numberSentences(fields);
	else exercise = wordDrill(fields);
	if(exercise) {
		if(fields.hints) {
			var strokes = document.getElementById('strokes');
			if(fields.floating_hints) {
				strokes.style.position = 'fixed';
			}
			var translations = TypeJig.shortestTranslations(TypeJig.Translations.Plover);
			var hints = new StenoDisplay(strokes, translations, true);
		}
		var speed = {wpm: fields.wpm, cpm: fields.cpm};

		display_only('lesson');
		return setExercise(exercise.name, exercise, hints, speed);
	}
}

function getSettings() {
	var wpm = document.getElementById('wpm');
	var cpm = document.getElementById('cpm');
	var hints = document.getElementById('hints');
	if(cpm.checked) this.elements.cpm.value = 5 * wpm.value;
	else this.elements.wpm.value = wpm.value;
	this.elements.hints.value = hints.checked ? hints.value : '';
}

function setNewTempo() {
  let results = document.getElementById('results').innerText;
  let wpmStart = results.indexOf("\-") + 3;
  let wpmEnd = results.indexOf("W");
  let wpm = parseInt(results.substring(wpmStart, wpmEnd).trim());

  let newWPM = wpm;
  if (results.includes("no uncorrected")) {
    newWPM = wpm + 10;
  } else {
    newWPM = wpm - 10;
  }

  if (newWPM) {
    document.querySelector('#bpm').value = newWPM;
    document.querySelector('#bpmval').innerText = newWPM;
    getMetronome().tempo = newWPM;
		console.log("new tempo set to " + newWPM + " per " + results);
  } else {
    console.log("newWPM error");
  }
}

function getErrors() {
    // get all user-typed words
    let answers = document.querySelectorAll('#answer span');
    let answersText = [];
    for (let i = 0; i < answers.length; i++) {
      answersText.push(answers[i].textContent);
    }

    // get all incorrect user-typed words
    let incorrects = document.getElementsByClassName('incorrect');
    let incorrectsText = [], incorrectsIndices = [];
    for (let i = 0; i < incorrects.length; i++) {
      incorrectsText.push(incorrects[i].textContent);
      incorrectsIndices.push(answersText.indexOf(incorrects[i].textContent));
    }

    // get all words from exercise
    let exercise = document.querySelectorAll('#exercise span');
    let exerciseText = [], text = "";
    for (let i = 0; i < exercise.length; i++) {
      text = exercise[i].textContent;
      text = text.replace(/[.,!?;:]/g,""); // remove punctuation
      text = text.toLowerCase();
      exerciseText.push(text);
    }
    exerciseText = exerciseText.filter(function(str) {
  		return /\S/.test(str); // remove whitespace elements
  	});

    // get correct versions of all incorrect user-typed words
    let correctVersions = [];
    for (let i = 0; i < incorrectsIndices.length; i++) {
      if (exerciseText[incorrectsIndices[i]]) { correctVersions.push(exerciseText[incorrectsIndices[i]]); }
    }

    // repeat each incorrect word 6 times
    let repeats = 6;
    const makeRepeated = (arr, repeats) => Array.from({ length: repeats }, () => arr).flat();
    correctRepeats = makeRepeated(correctVersions, 6).sort();

    // add the original array to the end 2 times
    let repeatOriginal = 2;
    correctRepeats = correctRepeats.concat(makeRepeated(correctVersions, repeatOriginal));

    let words = correctRepeats;
    if (words.length == 0) {
      console.log("no errors");
			return new TypeJig.Exercise(["no", "errors"], 0, false, 'ordered');
    } else {
      return new TypeJig.Exercise(words, 0, false, 'ordered');
    }
}

function runCustom(evt) {
	evt.preventDefault();
	getSettings.call(this);
	var fields = getFormFields(this);
	if(storageAvailable('localStorage')) {
		localStorage.custom = fields.drill
	}
	TypeJig.WordSets.custom = fields.drill.trim().split(/\s+/m);
	fields.drill = 'custom';
	var jig = runExercise(fields);

	var again = document.getElementById('again');
	again.addEventListener('click', function(evt){
		evt.preventDefault();
		jig.reset();
	});

	let review = document.getElementById('review');
	review.addEventListener('click', function(evt){
		console.log('review');
		setNewTempo();
		evt.preventDefault();
		jig.exercise = getErrors();
		jig.reset();
	});
}

window.onload = function() {
	if(document.location.search !== '') {
		runExercise(parseQueryString(document.location.search));
	} else {
		// Add event listeners to get settings before submitting.
		var forms = document.querySelectorAll('form');
		for(var i=0; i<forms.length; ++i) {
			var form = forms[i]
			if(form.id === 'custom') {
				form.addEventListener('submit', runCustom);
			} else {
				form.addEventListener('submit', getSettings);
			}
		}

		// Add event listeners for word list buttons
		let wordListButtons = document.querySelectorAll('#word-lists button');
		for (let i = 0; i < wordListButtons.length; i++) { wordListButtons[i].addEventListener('click', listListener, false); }
		let textArea = document.getElementById("user-text");
		// let setText = "nothing selected";
		function listListener() {
			textArea.value = getWordList(event.target.id);
		}
	}
}

function display_only(show) {
	var i, tabs
	tabs = ['form', 'lesson']
	for (i in tabs) {
		document.getElementById(tabs[i]).style.display = tabs[i] === show ? 'block' : 'none'
	}
	let metronome = document.getElementById('metronome-content');
	metronome.hidden = show === 'form' ? true : false;
}

loadSettings()
if(storageAvailable('localStorage') && localStorage.custom != null) {
	let custom = document.getElementById('custom')
	custom.elements.drill.value = localStorage.custom
}
