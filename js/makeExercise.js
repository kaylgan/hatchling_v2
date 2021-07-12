// MODIFIED FROM JOSHUA GRAMS STENO JIG
// https://joshuagrams.github.io/steno-jig/

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
  } else {
    console.log("newWPM error");
  }
}

function generateDefaultExercise() {
    // let wordsStr = "after you complete an exercise, press the left " +
    // "arrow key to repeat the exercise, or press the right arrow key to practice any mistakes";
    let wordsStr = "Gray and pale blue, for instance, do not combine well, both being cold colors. All her life had been centered on him. I didn't stop to note the color of his uniform. At any rate, they didn't give it to us. As to the secretary, I can't say. I can't realize anything. However, the audience can't hear. I didn't choose her. It made me feel awful sorry for him, because his suit didn't fit him and looked kind of funny. The fire is out and the water is cold, but it can't be helped. He sat by me and didn't speak first. Gray and pale blue, for instance, do not combine well, both being cold colors. All her life had been centered on him. I didn't stop to note the color of his uniform. At any rate, they didn't give it to us. As to the secretary, I can't say. I can't realize anything. However, the audience can't hear. I didn't choose her. It made me feel awful sorry for him, because his suit didn't fit him and looked kind of funny. The fire is out and the water is cold, but it can't be helped. He sat by me and didn't speak first. Gray and pale blue, for instance, do not combine well, both being cold colors. All her life had been centered on him. I didn't stop to note the color of his uniform. At any rate, they didn't give it to us. As to the secretary, I can't say. I can't realize anything. However, the audience can't hear. I didn't choose her. It made me feel awful sorry for him, because his suit didn't fit him and looked kind of funny. The fire is out and the water is cold, but it can't be helped. He sat by me and didn't speak first. Gray and pale blue, for instance, do not combine well, both being cold colors. All her life had been centered on him. I didn't stop to note the color of his uniform. At any rate, they didn't give it to us. As to the secretary, I can't say. I can't realize anything. However, the audience can't hear. I didn't choose her. It made me feel awful sorry for him, because his suit didn't fit him and looked kind of funny. The fire is out and the water is cold, but it can't be helped. He sat by me and didn't speak first.";
    let words = wordsStr.split(" ");
    return new TypeJig.Exercise(words, 0, false, 'ordered');
}

function generateUserExercise() {
    const textArea = document.getElementById('user-text');
    // const button = document.getElementById('text-area-button');
    let words = textArea.value.split(' ');
    return new TypeJig.Exercise(words, 0, false, 'ordered');
}

function generateErrorsExercise() {
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
      return generateUserExercise();
    } else {
      return new TypeJig.Exercise(words, 0, false, 'ordered');
    }
}

window.onload = function () {
    // GENERATE DEFAULT EXERCISE TEXT
    let fields = parseQueryString(document.location.search)
    let name = "Practice (from Steno Jig)";

    let translations = TypeJig.shortestTranslations(TypeJig.Translations.Plover); //
    let strokes = document.getElementById('strokes'); //
    let hints = new StenoDisplay(strokes, translations, true); //

	  let speed = {wpm: fields.wpm, cpm: fields.cpm};

    let exercise = generateDefaultExercise();

    let jig = setExercise(name, exercise, hints, speed);

    // GENERATE EXERCISE FROM USER TEXT
    // const textArea = document.getElementById('user-text');
    // let button = document.getElementById('text-area-button');
    // textArea.value = '';
    // button.addEventListener('click', function (evt) {
    //   setNewTempo();
    //   evt.preventDefault();
    //   let exercise = generateUserExercise();
    //   jig.exercise = exercise;
    //   jig.reset();
    });

    // GENERATE ERROR-PRACTICE EXERCISES
    const again = document.getElementById('again');
    const another = document.getElementById('new');
    let nextSeed = prepareNextSeed(another);
    again.addEventListener('click', function (evt) {
        evt.preventDefault();
        jig.reset();
    });
    another.addEventListener('click', function (evt) {
        setNewTempo();
        evt.preventDefault();
        let exercise = generateErrorsExercise();
        jig.exercise = exercise;
        jig.reset();
        nextSeed = prepareNextSeed(another);
    });
}

setTheme()
