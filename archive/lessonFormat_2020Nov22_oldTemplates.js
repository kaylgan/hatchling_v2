// extra functions to work with narration
function extraCode(whichCode) {
  let lesson = [];

  function makeLesson(lessonText) {
    let mylesson = [], asIs = false;
    for (let i = 0; i < lessonText.length; i++) {
      if (lessonText[i][2]) { asIs = true; }
      mylesson = mylesson.concat(getLessonPattern(lessonText[i][0], lessonText[i][1], asIs));
    }
    getNextLesson(true, mylesson);
    getPracticeIndex(true, 0);
    generatePracticeLetters(getNextLesson(), 0, Math.min(getPracticeIndex()+10, getNextLesson().length));
  }

  function updateGreenKeys(add, remove = []) {
    for (let i = 0; i < add.length; i++) { document.getElementById(add[i]).classList.add("green-key"); }
    for (let i = 0; i < remove.length; i++) { document.getElementById(remove[i]).classList.remove("green-key"); }
  }

  switch (whichCode) {
    case ("enterToContinue"):
      document.getElementById("side-view").hidden = true;
      let narration = document.getElementById("narration");

      setTimeout(function() {
        // if user hasn't already hit enter, prompt (early lessons only)
        if (narration.innerHTML === "Tutorial" || narration.innerHTML === "Lesson 01: Pinkies") {
          narration.innerHTML = "type the ENTER key to continue";
        }
        // wiggle only if user still hasn't hit enter
        if (narration.innerHTML === "type the ENTER key to continue") { narration.classList.add("wiggle"); }
        setTimeout(function() { narration.classList.remove("wiggle"); }, 7000)
      }, 1500);
    break;
    case ("showSideView"):
      document.getElementById("side-view").hidden = false;
      document.getElementById("lp-fend").classList.remove("top-key", "bottom-key");
      document.getElementById("lp-ftip").classList.remove("top-dot", "bottom-dot");
      break;
    case ("hideSideView"):
      document.getElementById("side-view").hidden = true;
      break;
    case ("adjustThumb"):
      document.getElementById("thumb-side").style.transform = 'translate(-6px, -5px)';
      break;
    case ("readjustThumb"):
      document.getElementById("thumb-side").style.transform = 'translateX(0px)';
      break;
    case ("pointerForward"):
      document.getElementById("finger-side-middle").classList.add("pointer-forward");
      document.getElementById("finger-side-tip").classList.add("pointer-tip-forward");
      document.getElementById("lp-fend").classList.remove("bottom-key");
      document.getElementById("lp-ftip").classList.remove("bottom-dot");
      document.getElementById("lp-fend").classList.add("top-key");
      document.getElementById("lp-ftip").classList.add("top-dot");
      break;
    case ("pointerBackward"):
      document.getElementById("finger-side-middle").classList.add("pointer-backward");
      document.getElementById("finger-side-tip").classList.add("pointer-tip-backward");
      document.getElementById("lp-fend").classList.remove("top-key");
      document.getElementById("lp-ftip").classList.remove("top-dot");
      document.getElementById("lp-fend").classList.add("bottom-key");
      document.getElementById("lp-ftip").classList.add("bottom-dot");
      break;
    case ("clearPractice"):
      clearPracticeLetters();
      break;
    case ("greenPinkies"):
      updateGreenKeys(["key-Q", "key-A"]);
      break;
    case ("greenPinkiesRight"):
      updateGreenKeys(["key-P", "key-colon", "key-lbrace", "key-quote"], ["key-Q", "key-A"]);
      break;
    case ("pinkyLessons"):
      updateGreenKeys(["key-Q", "key-A"]);
      lesson = [
        ["ab", ["S", "-S"]],
        ["ab2", ["-T", "-S"]],
        ["ab3", ["-D", "-Z"]],
        ["ab", ["-T", "-D"]],
        ["ab2", ["-S", "-Z"]]
      ];
      break;
    case ("pinkyLessonsBriefs"):
      lesson = [
        ["ab3", ["S", "-T"]],
        ["ab3", ["is", "the"]],
        ["ab", ["is", "-S"]],
        ["ab2", ["the", "-D"]]
      ];
      break;
    case ("greenThumbs"):
      updateGreenKeys(["key-C", "key-V", "key-N", "key-M"]);
      break;
    case ("shortVowels"):
      lesson = [
        ["five", ["sat", "set", "sit", "sod", "suds"]],
        ["five2", ["sat", "set", "sit", "sod", "suds"]],
        ["five3", ["sat", "set", "sit", "sod", "suds"]]
      ];
      break;
    case ("longVowels"):
      lesson = [
        ["five", ["say", "seed", "sight", "sow", "suit"]],
        ["five2", ["say", "seed", "sight", "sow", "suit"]],
        ["five3", ["say", "seed", "sight", "sow", "suit"]]
      ];
      break;
    case ("greenO"):
      updateGreenKeys([], ["key-C"]);
      break;
    case ("greenOO"):
      updateGreenKeys(["key-C"], ["key-N", "key-M"]);
      break;
    case ("greenAE"):
      updateGreenKeys(["key-N"], ["key-V"]);
      break;
    case ("greenAU"):
      updateGreenKeys(["key-M"], ["key-N"]);
      break;
    case ("greenOU"):
      updateGreenKeys(["key-V"], ["key-C"]);
      break;
    case ("oVowels"):
      updateGreenKeys(["key-C", "key-N"]);
      lesson = [
        ["five", ["soy", "soot", "road", "rode", "road"]],
        ["five2", ["sea", "see", "rode", "out", "saw"]],
        ["ab", ["sale", "sail"]],
        ["five3", ["soy", "soot", "saw", "out", "sea"]],
        ["asIs", ["out", "out-", "set", "out", "out-", "set"], true]
      ];
      break;
    case ("clearGreenThumbs"):
      updateGreenKeys([], ["key-C", "key-V", "key-N", "key-M"]);
      break;
    case ("clearGreenPinkies"):
      updateGreenKeys([], ["key-A", "key-Q", "key-P", "key-colon", "key-lbrace", "key-quote"]);
      break;
    case ("clearGreenMiddles"):
      updateGreenKeys([], ["key-E", "key-D", "key-I", "key-K"]);
      break;
    case ("clearGreenPointers"):
      updateGreenKeys([], ["key-R", "key-F", "key-U", "key-J"]);
      break;
    case ("greenAsterisks"):
      updateGreenKeys(["key-T", "key-G", "key-Y", "key-H"]);
      break;
    case("leftRing"):
      updateGreenKeys(["key-W", "key-S"]);
      lesson = [
        ["abc", ["T", "K", "D"]],
        ["abc2", ["it", "can", "did"]],
        ["six", ["T", "K", "D", "it", "can", "did"]],
        ["six2", ["T", "K", "D", "it", "can", "did"]]
      ]
      break;
    case("rightRing"):
      updateGreenKeys(["key-O", "key-L"]);
      lesson = [
        ["ab3", ["-L", "-G"]],
        ["ab", ["-L", "-G"]],
        ["six", ["call", "kale", "tug", "dig", "tile", "dial"]],
        ["ab2", ["starring", "starred"]]
      ];
      break;
    case ("greenLeftMiddles"):
      updateGreenKeys([], ["key-W", "key-S", "key-O", "key-L"]);
      break;
    case ("leftMiddle"):
      updateGreenKeys(["key-E", "key-D"]);
      lesson = [
        ["ab", ["P", "W"]],
        ["abc", ["P", "W", "B"]],
        ["ab2", ["about", "with"]],
        ["five", ["P", "W", "B", "about", "with"]],
        ["five2", ["P", "W", "B", "bee", "about"]]
      ];
      break;
    case ("rightMiddle"):
      updateGreenKeys(["key-I", "key-K"]);
      lesson = [
        ["ab2", ["-P", "-B"]],
        ["abc2", ["-P", "-B", "-N"]],
        ["ab", ["an", "be"]],
        ["five2", ["-P", "-B", "-N", "an", "be"]],
        ["five3", ["-P", "-B", "-N", "an", "be"]],
        ["abc", ["be", "being", "can be"]]
      ]
      break;
    case ("middleLettersLeft"):
      // F Q X G
      lesson = [
        ["ab", ["F", "Q"]],
        ["ab2", ["Q", "X"]],
        ["abc", ["F", "Q", "X"]],
        ["ab3", ["F", "G"]],
        ["ab2", ["G", "Q"]],
        ["five", ["G", "F", "Q", "G", "X"]],
        ["six", ["F", "X", "Q", "G", "X", "G"]]
      ];
      break;
    case ("middleLettersRight"):
      // -M -K -X -J
      lesson = [
        ["ab2", ["-M", "-K"]],
        ["ab3", ["-K", "-X"]],
        ["abc2", ["-M", "-K", "-X"]],
        ["ab", ["-M", "-J"]],
        ["ab3", ["-J", "-K"]],
        ["abc2", ["-K", "-M", "-J"]],
        ["five2", ["-J", "-M", "-K", "-J", "-X"]],
        ["six2", ["-M", "-X", "-K", "-J", "-X", "-J"]]
      ];
      break;
    case ("middleLettersReviewLeft"):
      // -P -B -N -M -K -X -J P W B F Q X G, T K D S, -L -G -T -S -D -Z
      lesson = [
        ["asIs", ["S", "T", "K", "P", "W", "S", "T", "K", "P", "W"], true],
        ["asIs", ["S", "T", "K", "P", "W", "S", "T", "K", "P", "W"], true],
        ["asIs", ["S", "S", "T", "K", "D", "D", "P", "W", "B", "B"], true],
        ["asIs", ["T", "K", "P", "W", "G", "D", "B", "D", "B", "G"], true],
        ["asIs", ["T", "P", "F", "K", "W", "Q", "K", "P", "X", "G"], true],
        ["asIs", ["S", "T", "K", "D", "P", "W", "B", "F", "Q", "X"], true]
      ];
      break;
    case ("middleLettersReviewRight"):
      ["asIs", ["-P", "-B", "-L", "-G", "-T", "-S", "-D", "-Z", "-D", "-Z"], true],
      ["asIs", ["-P", "-B", "-L", "-G", "-T", "-S", "-T", "-D", "-S", "-Z"], true],
      ["asIs", ["-P", "-B", "-N", "-N", "-L", "-G", "-L", "-G", "-N", "-N"], true],
      ["asIs", ["-T", "-D", "-T", "-D", "-S", "-Z", "-S", "-Z", "-T", "-S"], true],
      ["asIs", ["-P", "-B", "-N", "-P", "-L", "-M", "-B", "-G", "-K", "-X"], true],
      ["asIs", ["-P", "-B", "-L", "-G", "-J", "-M", "-K", "-J", "-J", "-N"], true]
      break;
    case ("middleLettersReviewAll"):
      ["asIs", ["S", "-T", "S", "-S", "S", "-D", "S", "-Z", "-S", "-Z"], true],
      ["asIs", ["T", "-L", "K", "-G", "T", "-L", "K", "-G", "D", "D"], true],
      ["asIs", ["P", "W", "-P", "-B", "B", "-N", "P", "W", "-P", "-B"], true],
      ["ab", ["F", "-M"]],
      ["ab2", ["Q", "-K"]],
      ["ab3", ["X", "-X"]],
      ["ab", ["B", "-N"]],
      ["ab3", ["G", "-J"]],
      ["asIs", ["S", "-S", "T", "-T", "K", "-K", "P", "-P", "D", "-D"], true]
      ["asIs", ["B", "-B", "G", "-G", "X", "-X", "D", "-D", "G", "-G"], true]
      break;
    case ("middleAffixes"):
      lesson = [
        ["six", ["section", "sponge", "entice", "intact", "I'm", "cement"]],
        ["six2", ["section", "sponge", "entice", "I'm", "possible", "cement"]],
        ["abc", ["I'm", "im-", "possible"]]
      ];
      break;
    case ("leftPointer"):
      updateGreenKeys(["key-R", "key-F"], ["key-T", "key-G", "key-Y", "key-H"]);
      lesson = [
        ["abc", ["H", "R", "L"]],
        ["abc2", ["had", "are", "will"]],
        ["six", ["H", "had", "R", "are", "L", "will"]]
      ];
      break;
    case ("rightPointer"):
      updateGreenKeys(["key-U", "key-J"]);
      lesson = [
        ["ab", ["-F", "-R"]],
        ["abc2", ["of", "are", "ever"]],
        ["five", ["-F", "of", "-R", "are", "ever"]],
        ["ab2", ["of", "off"]],
        ["ab3", ["ever", "every"]],
        ["five2", ["everything", "everywhere", "everybody", "everyday", "everyone"]]
      ];
      break;
    case ("someWords"):
      lesson = [
        ["six", ["something", "somewhere", "somebody", "someday", "someone", "sometime"]],
        ["five2", ["somehow", "someplace", "someday", "someone", "sometime"]],
        ["five", ["someplace", "something", "somewhere", "somehow", "somebody"]]
      ];
      break;
    case ("pointerLetters1"):
      lesson = [
        ["ab", ["Z", "V"]],
        ["ab3", ["V", "-V"]],
        ["abc2", ["V", "-V", "Z"]],
        ["five", ["V", "-V", "Z", "-Z", "-V"]]
      ];
      break;
    case ("pointerLetters2"):
      lesson = [
        ["ab2", ["M", "N"]],
        ["ab", ["N", "M"]],
        ["ab3", ["M", "-M"]],
        ["ab", ["N", "-N"]]
      ];
      break;
    case ("pointerLetters3"):
      lesson = [
        ["ab3", ["C", "ch"]],
        ["ab", ["ch", "-ch"]],
        ["abc", ["C", "ch", "-ch"]],
        ["abc2", ["C", "ch", "-ch"]],
      ];
      break;
    case ("pointerLetters4"):
      lesson = [
        ["ab3", ["J", "Y"]],
        ["ab2", ["Y", "J"]],
        ["ab", ["J", "-J"]],
        ["abc", ["Y", "J", "-J"]]
      ];
      break;
    case ("pointerBriefs"):
      lesson = [
        ["ab2", ["in", "why"]],
        ["ab3", ["have", "consider"]],
        ["five", ["have", "why", "consider", "have", "in"]]
      ];
      break;
    case ("pointerLettersReview"):
      lesson = [
        ["ab", ["N", "Y"]],
        ["abc2", ["J", "V", "Z"]],
        ["ab2", ["M", "N"]],
        ["ab", ["-F", "-V"]],
        ["abc", ["C", "ch", "-ch"]],
        ["ab3", ["M", "-ch"]]
      ];
      break;
    case ("ngeConflict"):
      lesson = [
        ["ab2", ["lung", "lunge"]],
        ["ab3", ["bing", "binge"]],
        ["ab", ["lung", "bing"]],
        ["ab3", ["lunge", "binge"]]
      ]
      break;
    case ("highlightNumberBar"):
      updateGreenKeys(["key-one", "key-two", "key-three", "key-four", "key-five",
      "key-six", "key-seven", "key-eight", "key-nine", "key-zero", "key-minus", "key-equals"]);
      break;
    case ("highlightNumber1"):
      updateGreenKeys(["key-Q"], ["key-three", "key-four", "key-five",
      "key-six", "key-seven", "key-eight", "key-nine", "key-zero", "key-minus", "key-equals"]);
      break;
    case ("highlightNumber0"):
      updateGreenKeys(["key-three", "key-four", "key-V"], ["key-one", "key-two", "key-Q"])
      break;
    case ("highlightNumbers"):
      updateGreenKeys(["key-Q", "key-W", "key-E", "key-R", "key-C", "key-U", "key-I", "key-O", "key-P"],
      ["key-three", "key-four"])
      break;
    case ("clearNumbers"):
      updateGreenKeys([], ["key-Q", "key-W", "key-E", "key-R", "key-C", "key-V", "key-U", "key-I", "key-O", "key-P"])
      break;
    default:
      console.log("extra code not defined");
  }

  if (lesson) { makeLesson(lesson); }
}


// follow pattern for current lesson, replacing letters with approriate keys
function getLessonPattern(pattern, letters, keepOriginal = false) {
  let template = "", finalPattern = "";
  let replacements = null;
  let placeHolders = "abcdef".split("");
  let templates = {
    "ab": "a b a b b a b b a a",
    "ab2": "a b a b a a b b a a",
    "ab3": "a a a b b b a b b a",
    "abc": "a b c a b c a a b c",
    "abc2": "a a b b c c a a c c",
    "five": "a b c d e a b c d e",
    "five2": "a a b b c c d d e e",
    "five3": "a c e b d c b a e d",
    "six": "a d b e c f d e f f",
    "six2": "b b e e a a d d c f"
  }

  let replacements2 = {'a': letters[0], 'b': letters[1], 'c': letters[2],
  'd': letters[3], 'e': letters[4], 'f': letters[5]};
  console.log(replacements2);

  if (!keepOriginal) {
    switch (pattern) {
      case ("ab"):
        template = "a b a b b a b b a a";
        replacements = {'a': letters[0], 'b': letters[1]};
        break;
      case ("ab2"):
        template = "a b a b a a b b a a";
        replacements = {'a': letters[0], 'b': letters[1]};
        break;
      case ("ab3"):
        template = "a a a b b b a b b a";
        replacements = {'a': letters[0], 'b': letters[1]};
        break;
      case ("five"):
        template = "a b c d e a b c d e";
        replacements = {'a': letters[0], 'b': letters[1], 'c': letters[2],
        'd': letters[3], 'e': letters[4]};
        break;
      case ("five2"):
        template = "a a b b c c d d e e";
        replacements = {'a': letters[0], 'b': letters[1], 'c': letters[2],
        'd': letters[3], 'e': letters[4]};
        break;
      case ("five3"):
        template = "a c e b d c b a e d";
        replacements = {'a': letters[0], 'b': letters[1], 'c': letters[2],
        'd': letters[3], 'e': letters[4]};
        break;
      case ("abc"):
        template = "a b c a b c a a b c";
        replacements = {'a': letters[0], 'b': letters[1], 'c': letters[2]};
        break;
      case ("abc2"):
        template = "a a b b c c a a c c";
        replacements = {'a': letters[0], 'b': letters[1], 'c': letters[2]};
        break;
      case ("six"):
        template = "a d b e c f d e f f";
        replacements = {'a': letters[0], 'b': letters[1], 'c': letters[2],
        'd': letters[3], 'e': letters[4], 'f': letters[5]};
        break;
      case ("six2"):
        template = "b b e e a a d d c f";
        replacements = {'a': letters[0], 'b': letters[1], 'c': letters[2],
        'd': letters[3], 'e': letters[4], 'f': letters[5]};
      default:
        console.log("pattern not found");
    }

    finalPattern = template.replace(/[a-z]/g, m => replacements2[m]);
    return finalPattern.split(" ");
  } else {
    return letters; // for use in makeLesson
  }
}


// generate keyboard, hands, other elements
function generateElements() {
  generateKeyboard();
  generateRightHand();
  generateStenoOrder();
  getNextLesson(true, ["Click", "on", "Tutorial", "in", "the", "Lessons", "Menu", "to", "get", "started"]);
  generatePracticeLetters(getNextLesson());
  menuListener();
}
generateElements();
