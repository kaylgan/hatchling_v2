// -------------------- extra functions to work with narration --------------------
function extraCode(whichCode) {
  // console.log("extraCode is " + whichCode);
  let lesson = [];

  function makeLesson(lessonText) {
    let mylesson = [], asIs = false;
    for (let i = 0; i < lessonText.length; i++) {
      if (lessonText[i][2]) {
        asIs = true;
        getNextLessonFull(true, true); // set next lesson full to true
      } else {
        getNextLessonFull(true, false); // set next lesson full to false
      }
      mylesson = mylesson.concat(getLessonPattern(lessonText[i][0], lessonText[i][1], asIs));
    }
    getNextLesson(true, mylesson);
    getPracticeIndex(true, 0);
    generatePracticeLetters(getNextLesson(), 0, Math.min(getPracticeIndex()+10, getNextLesson().length));
  }

  switch (whichCode) {
    case ("enterToContinue"):
      document.getElementById("side-view").hidden = true;
      let narration = document.getElementById("narration");

      setTimeout(function() {
        // if user hasn't already hit enter, prompt (early lessons only)
        if (narration.textContent === "Tutorial" || narration.textContent === "Pinkies") {
          narration.textContent = "type/tap ENTER to continue";
        }
        // wiggle only if user still hasn't hit enter
        if (narration.textContent === "type/tap ENTER to continue") { narration.classList.add("wiggle"); }
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
    case ("rightPinkies"):
      lesson = [
        ["ab2", ["-T", "-S"]], ["ab3", ["-T", "-S"]], ["ab", ["-T", "-S"]],
        ["ab3", ["-D", "-Z"]], ["ab4", ["-D", "-Z"]], ["ab2", ["-D", "-Z"]],
        ["ab", ["-T", "-D"]], ["ab2", ["-T", "-D"]], ["ab4", ["-T", "-D"]],
        ["ab2", ["-S", "-Z"]], ["ab", ["-S", "-Z"]], ["ab3", ["-S", "-Z"]],
        ["asIs", ["-T", "-S", "-D", "-Z", "-T", "-S", "-D", "-Z", "-T", "-Z"], true]
      ];
      break;
    case ("pinkyLessons"):
      lesson = [
        ["ab", ["S", "-S"]],
        ["abc", ["-S", "-Z", "S"]],
        ["abc2", ["-T", "-D", "-Z"]],
        ["five", ["S", "-S", "-T", "-D", "-Z"]],
        ["five2", ["-S", "-T", "S", "-D", "-Z"]],
        ["five3", ["-S", "S", "-T", "-D", "-Z"]]
      ];
      break;
    case ("pinkyLessonsBriefs"):
      lesson = [
        ["ab3", ["S", "-T"]],
        ["ab3", ["is", "the"]], ["ab4", ["is", "the"]],
        ["ab", ["is", "-S"]], ["ab2", ["is", "-S"]],
        ["ab2", ["the", "-D"]],
        ["abcd", ["is", "the", "-T", "S"]]
      ];
      break;
    case ("vowelKeys"):
      lesson = [
        ["ab3", ["A", "O"]], ["ab4", ["A", "O"]], ["ab2", ["A", "O"]],
        ["ab3", ["E", "U"]], ["ab2", ["E", "U"]],  ["ab", ["E", "U"]],
        ["five", ["A", "O", "E", "U", "E"]],
        ["five2", ["A", "O", "E", "U", "O"]],
        ["abcd", ["U", "O", "A", "E"]]
      ];
      break;
    case ("vowelKeys2"):
      lesson = [
        ["ab2", ["A", "O"]],
        ["ab2", ["E", "U"]],
        ["ab3", ["E", "I"]],
        ["ab", ["U", "I"]],
        ["ab4", ["A", "E"]],
        ["ab4", ["I", "A"]],
        ["ab4", ["O", "U"]],
        ["ab4", ["I", "O"]],
        ["ab4", ["A", "U"]],
        ["ab4", ["O", "E"]]
      ];
      break;
    case ("preShortVowels"):
      lesson = [
        ["asIs", ["S", "A", "-T", "S", "A", "-T", "S", "E", "-T", "-S"], true],
        ["asIs", ["S", "I", "-T", "S", "O", "-D", "S", "I", "-T", "-S"], true],
        ["asIs", ["S", "O", "-D", "S", "U", "-D", "S", "U", "-D", "-Z"], true],
        ["asIs", ["S", "U", "-D", "-Z", "S", "U", "-D", "-Z", "S", "-Z"], true]
      ];
      break;
    case ("shortVowels"):
      lesson = [
        ["five", ["sat", "set", "sit", "sod", "suds"]],
        ["ab", ["set", "sat"]], ["ab2", ["set", "sit"]], ["ab4", ["sat", "sit"]],
        ["ab2", ["sod", "suds"]], ["ab3", ["suds", "sod"]]
      ];
      break;
    case ("longVowelKeys"):
      lesson = [
        ["ab", ["Ā", "Ē"]],
        ["ab2", ["Ū", "Ī"]],
        ["ab", ["Ā", "Ū"]],
        ["ab2", ["Ē", "Ī"]],
        ["ab3", ["Ā", "Ī"]]
      ];
      break;
    case ("longVowelKeys2"):
      lesson = [
        ["ab", ["Ō", "Ā"]],
        ["ab", ["Ō", "Ē"]],
        ["ab2", ["Ū", "Ō"]],
        ["ab2", ["Ī", "Ō"]]
      ];
      break;
    case ("preLongVowels"):
      lesson = [
        ["asIs", ["S", "Ā", "S", "Ā", "S", "Ē", "-D", "S", "Ē", "-D"], true],
        ["asIs", ["S", "Ī", "-T", "S", "Ō", "S", "Ī", "-T", "S", "Ō"], true],
        ["asIs", ["S", "Ō", "S", "Ū", "-T", "S", "Ō", "S", "Ū", "-T"], true]
      ];
      break;
    case ("longVowels"):
      lesson = [
        ["five", ["say", "seed", "sight", "sow", "suit"]],
        ["five2", ["say", "seed", "sight", "sow", "suit"]],
        ["five3", ["say", "seed", "sight", "sow", "suit"]]
      ];
      break;
    case ("oVowels"):
      lesson = [
        ["ab2", ["road", "rode"]],
        ["ab3", ["sea", "see"]],
        ["ab2", ["soy", "soot"]],
        ["abc", ["see", "sea", "saw"]],
        ["five3", ["soy", "soot", "rode", "road", "out"]],
        ["asIs", ["out", "out-", "set", "out", "out-", "set"], true],
      ];
      break;
    case ("leftRing"):
      lesson = [
        ["ab2", ["T", "K"]], ["ab3", ["T", "K"]], ["ab", ["T", "K"]],
        ["abc", ["T", "K", "D"]], ["abc2", ["T", "K", "D"]],
        ["ab2", ["S", "T"]], ["ab3", ["S", "T"]], ["ab", ["S", "T"]],
        ["ab2", ["S", "K"]], ["ab3", ["S", "K"]], ["ab", ["S", "K"]],
        ["abc", ["S", "T", "K"]], ["abc2", ["S", "T", "K"]],
        ["ab", ["S", "D"]], ["ab", ["S", "D"]]
      ];
      break;
    case ("leftRing2"):
      lesson = [
        ["abc2", ["it", "can", "did"]], ["abc", ["it", "can", "did"]],
        ["six", ["T", "K", "D", "it", "can", "did"]],
        ["six2", ["T", "K", "D", "it", "can", "did"]],
        ["ab", ["it", "the"]], ["ab3", ["it", "the"]]
      ];
      break;
    case ("rightRing"):
      lesson = [
        ["ab3", ["-L", "-G"]], ["ab", ["-L", "-G"]], ["ab2", ["-L", "-G"]],
        ["ab2", ["-L", "-T"]], ["ab3", ["-L", "-T"]], ["ab", ["-L", "-T"]],
        ["ab", ["-L", "-D"]], ["ab4", ["-L", "-D"]], ["ab", ["-L", "-D"]],
        ["abc", ["-L", "-T", "-D"]], ["abc2", ["-L", "-T", "-D"]],
        ["ab2", ["-G", "-S"]], ["ab3", ["-G", "-S"]], ["ab3", ["-G", "-S"]],
        ["ab", ["-G", "-Z"]], ["ab", ["-G", "-Z"]], ["ab2", ["-G", "-Z"]],
        ["abc", ["-G", "-S", "-Z"]], ["abc2", ["-G", "-S", "-Z"]]
      ];
      break;
    case ("rightRing2"):
      lesson = [
        ["asIs", ["-lch, -lge", "-lch, -lge", "-ing", "-ing", "-lch, -lge", "-ing", "-lch, -lge", "-lch, -lge", "-ing", "-ing"], true]
      ];
      break;
    case("rightRingReview"):
      lesson = [
        ["ab", ["call", "kale"]],
        ["ab2", ["dig", "dial"]],
        ["ab3", ["tug", "tile"]],
        ["six", ["call", "kale", "tug", "dig", "tile", "dial"]]
      ];
      break;
    case ("leftMiddle"):
      lesson = [
        ["ab", ["P", "W"]], ["ab4", ["P", "W"]], ["ab3", ["P", "W"]],
        ["abc", ["P", "W", "B"]], ["abc2", ["P", "W", "B"]],
        ["ab2", ["about", "with"]],
        ["five", ["P", "W", "B", "about", "with"]],
        ["five2", ["P", "W", "B", "bee", "about"]],
        ["abc", ["be-", "bee", "B"]],
        ["ab2", ["S", "P"]], ["ab3", ["S", "P"]], ["ab", ["S", "P"]],
        ["ab", ["T", "P"]], ["ab", ["T", "P"]], ["ab2", ["T", "P"]],
        ["abc", ["S", "T", "P"]], ["abc2", ["S", "T", "P"]],
        ["ab2", ["S", "W"]], ["ab3", ["S", "W"]], ["ab4", ["S", "W"]],
        ["ab2", ["K", "W"]], ["ab", ["K", "W"]], ["ab4", ["K", "W"]],
        ["abc", ["S", "K", "W"]], ["abc2", ["S", "K", "W"]]
      ];
      break;
    case ("rightMiddle"):
      lesson = [
        ["ab2", ["-P", "-B"]], ["ab3", ["-P", "-B"]], ["ab", ["-P", "-B"]],
        ["abc2", ["-P", "-B", "-N"]],
        ["abc", ["-P", "-B", "-N"]],
        ["ab", ["an", "be"]],
        ["five3", ["-P", "-B", "-N", "an", "be"]],
        ["ab", ["-P", "-L"]], ["ab3", ["-P", "-L"]], ["ab4", ["-P", "-L"]],
        ["ab2", ["-P", "-T"]], ["ab3", ["-P", "-T"]], ["ab", ["-P", "-T"]],
        ["ab", ["-P", "-D"]], ["ab", ["-P", "-D"]], ["ab2", ["-P", "-D"]],
        ["abc", ["-P", "-L", "-T"]], ["abc2", ["-P", "-L", "-D"]],
        ["ab2", ["-B", "-G"]], ["ab3", ["-B", "-G"]], ["ab4", ["-B", "-G"]],
        ["ab4", ["-B", "-S"]], ["ab", ["-B", "-S"]], ["ab2", ["-B", "-S"]],
        ["ab2", ["-B", "-Z"]], ["ab", ["-B", "-Z"]], ["ab4", ["-B", "-Z"]],
        ["abc", ["-B", "-G", "-S"]], ["abc2", ["-B", "-G", "-Z"]],
        ["asIs", ["be", "being", "can be", "can be", "being", "can", "be", "can be", "being", "be"], true],
        ["asIs", ["be", "be-", "tween", "between", "being", "be-", "tween", "can be", "be-", "between"], true]
      ];
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
      lesson = [
        ["asIs", ["-P", "-B", "-L", "-G", "-T", "-S", "-D", "-Z", "-D", "-Z"], true],
        ["asIs", ["-P", "-B", "-L", "-G", "-T", "-S", "-T", "-D", "-S", "-Z"], true],
        ["asIs", ["-P", "-B", "-N", "-N", "-L", "-G", "-L", "-G", "-N", "-N"], true],
        ["asIs", ["-T", "-D", "-T", "-D", "-S", "-Z", "-S", "-Z", "-T", "-S"], true],
        ["asIs", ["-P", "-B", "-N", "-P", "-L", "-M", "-B", "-G", "-K", "-X"], true],
        ["asIs", ["-P", "-B", "-L", "-G", "-J", "-M", "-K", "-J", "-J", "-N"], true]
      ];
      break;
    case ("middleLettersReviewAll"):
      lesson = [
        ["ab", ["F", "-M"]],
        ["ab2", ["Q", "-K"]],
        ["ab3", ["X", "-X"]],
        ["ab", ["B", "-N"]],
        ["ab3", ["G", "-J"]],
        ["ab2", ["T", "-L"]],
        ["ab", ["K", "-G"]],
        ["ab3", ["W", "-B"]],
        ["ab2", ["P", "-P"]],
        ["ab2", ["A", "E"]],
        ["ab3", ["O", "U"]],
        ["asIs", ["S", "-S", "T", "-T", "K", "-K", "P", "-P", "W", "-B"], true],
        ["asIs", ["-P", "P", "-B", "W", "-L", "T", "-G", "K", "-T", "S"], true],
        ["asIs", ["S", "-T", "S", "-S", "S", "-D", "S", "-Z", "-S", "-Z"], true],
        ["asIs", ["B", "-B", "G", "-G", "X", "-X", "D", "-D", "G", "-G"], true]
      ];
      break;
    case ("middleAffixes"):
      lesson = [
        ["abc2", ["sponge", "im-", "possible"]],
        ["ab", ["entice", "intact"]],
        ["ab", ["I'm", "im-"]],
        ["six", ["section", "sponge", "entice", "intact", "I'm", "cement"]],
        ["six2", ["section", "sponge", "entice", "I'm", "possible", "cement"]],
        ["abc", ["I'm", "im-", "possible"]],
        ["asIs", ["-tion, -sion \(-shun\)", "-ction \(-kshun\)", "-ment", "ent-, int-",
        "-tion, -sion \(-shun\)", "-ction \(-kshun\)", "-ment", "ent-, int-", "im-", "im-"], true]
      ];
      break;
    case ("leftPointer"):
      lesson = [
        ["ab3", ["H", "R"]], ["ab2", ["H", "R"]], ["ab4", ["H", "R"]],
        ["abc", ["H", "R", "L"]], ["abc3", ["H", "R", "L"]],
        ["abc2", ["had", "are", "will"]],
        ["six", ["H", "had", "R", "are", "L", "will"]],
        ["ab", ["S", "H"]], ["ab3", ["S", "H"]], ["ab4", ["S", "H"]],
        ["ab2", ["T", "H"]], ["ab3", ["T", "H"]], ["ab", ["T", "H"]],
        ["ab", ["P", "H"]], ["ab", ["P", "H"]], ["ab2", ["P", "H"]],
        ["abc", ["S", "T", "H"]], ["abc2", ["S", "P", "H"]], ["abc3", ["T", "P", "H"]],
        ["ab2", ["S", "R"]], ["ab3", ["S", "R"]], ["ab4", ["S", "R"]],
        ["ab4", ["K", "R"]], ["ab", ["K", "R"]], ["ab2", ["K", "R"]],
        ["ab2", ["W", "R"]], ["ab", ["W", "R"]], ["ab4", ["W", "R"]],
        ["abc", ["S", "K", "R"]], ["abc2", ["S", "W", "R"]], ["abc3", ["K", "W", "R"]]
      ];
      break;
    case ("rightPointer"):
      lesson = [
        ["ab", ["-F", "-R"]], ["ab2", ["-F", "-R"]], ["ab3", ["-F", "-R"]],
        ["ab", ["-F", "-P"]], ["ab3", ["-F", "-P"]], ["ab4", ["-F", "-P"]],
        ["ab2", ["-F", "-L"]], ["ab3", ["-F", "-L"]], ["ab", ["-F", "-L"]],
        ["ab", ["-F", "-T"]], ["ab", ["-F", "-T"]], ["ab2", ["-F", "-T"]],
        ["ab", ["-F", "-D"]], ["ab", ["-F", "-D"]], ["ab2", ["-F", "-D"]],
        ["abc", ["-F", "-P", "-L"]], ["abc2", ["-F", "-L", "-T"]], ["abc3", ["-F", "-P", "-D"]],
        ["ab2", ["-R", "-B"]], ["ab3", ["-R", "-B"]], ["ab4", ["-R", "-B"]],
        ["ab4", ["-R", "-G"]], ["ab", ["-R", "-G"]], ["ab2", ["-R", "-G"]],
        ["ab2", ["-R", "-S"]], ["ab", ["-R", "-S"]], ["ab4", ["-R", "-S"]],
        ["ab2", ["-R", "-Z"]], ["ab3", ["-R", "-Z"]], ["ab4", ["-R", "-Z"]],
        ["abc", ["-R", "-B", "-G"]], ["abc2", ["-R", "-G", "-S"]], ["abc3", ["-R", "-B", "-Z"]]
      ];
      break;
    case ("rightPointerBriefs"):
      lesson = [
        ["five", ["-F", "of", "-R", "are", "ever"]],
        ["abc2", ["of", "are", "ever"]],
        ["ab2", ["of", "off"]],
      ];
      break;
    case ("everWords"):
      lesson = [
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
        ["ab2", ["M", "N"]],
        ["ab", ["N", "M"]],
        ["ab3", ["M", "-M"]],
        ["ab", ["N", "-N"]]
      ];
      break;
    case ("pointerLetters2"):
      lesson = [
        ["ab", ["Z", "V"]],
        ["ab3", ["V", "-V"]],
        ["abc2", ["V", "-V", "Z"]],
        ["five", ["V", "-V", "Z", "-Z", "-V"]]
      ];
      break;
    case ("pointerFBriefs"):
      lesson = [
        ["abc", ["love", "save", "love"]],
        ["ab", ["safe", "save"]],
        ["ab", ["save", "savvy"]],
        ["ab", ["savvy", "satisfy"]],
        ["ab2", ["safe", "-safe"]]
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
        ["five", ["N", "in", "Y", "why", "in"]],
        ["ab2", ["in", "why"]],
        ["five2", ["V", "have", "C", "consider", "C"]],
        ["ab3", ["have", "consider"]],
        ["five", ["have", "why", "consider", "have", "in"]]
      ];
      break;
    case ("pointerLettersReview"):
      lesson = [
        ["ab", ["N", "Y"]],
        ["ab2", ["N", "Y"]],
        ["abc2", ["J", "V", "Z"]],
        ["abc", ["J", "V", "Z"]],
        ["ab2", ["M", "N"]],
        ["ab3", ["M", "N"]],
        ["ab", ["-F", "-V"]],
        ["ab3", ["-F", "-V"]],
        ["abc2", ["C", "ch", "-ch"]],
        ["abc", ["C", "ch", "-ch"]],
        ["ab3", ["M", "-ch"]],
        ["ab", ["M", "-ch"]]
      ];
      break;
    case ("ngeConflict"):
      lesson = [
        ["ab", ["lung", "lunge"]],
        ["ab3", ["bing", "binge"]],
        ["ab", ["lung", "bing"]],
        ["ab3", ["lunge", "binge"]]
      ];
      break;
    case ("lrExtendedABC"):
      lesson = [
        ["ab", ["B", "-B"]],
        ["ab2", ["D", "-D"]],
        ["ab3", ["F", "-F"]],
        ["ab2", ["G", "-G"]],
        ["ab2", ["J", "-J"]],
        ["ab", ["K", "-K"]],
        ["ab3", ["L", "-L"]],
        ["ab3", ["M", "-M"]],
        ["ab", ["N", "-N"]],
        ["ab", ["P", "-P"]],
        ["ab2", ["R", "-R"]],
        ["ab3", ["S", "-S"]],
        ["ab3", ["T", "-T"]],
        ["ab", ["V", "-V"]],
        ["ab3", ["X", "-X"]],
        ["ab2", ["Z", "-Z"]]
      ];
      break;
    case ("affixReview"):
      lesson = [
        ["abc", ["be", "be-", "about"]],
        ["five", ["M", "were", "-sh", "-ch", "-sh"]],
        ["ab2", ["-st", "-th"]],
        ["ab", ["-mp", "-rve"]],
        ["asIs", ["-mp", "-rve", "-nch, -rch", "-nch, -rch", "-rve", "-mp", "-mp", "-nch, -rch", "-rve", "-nch, -rch"], true],
        ["asIs", ["-ment", "-ction (-kshun)", "-ction (-kshun)", "-ment", "-ment", "-ction (-kshun)", "-ment",
        "-ction (-kshun)", "-ction (-kshun)", "-ment"], true],
        ["asIs", ["-lch, -lge", "-lk", "-ng, -nge", "-nge, -nk", "-lch, -lge", "-lk", "-ng, -nge", "-nge, -nk", "-lk", "-lch, -lge"], true],
        ["asIs", ["-sh", "-tion, -sion (-shun)", "-tious, -cious (-shus)", "-ction (-kshun)",
        "-sh", "-tion, -sion (-shun)", "-tious, -cious (-shus)", "-ction (-kshun)", "-sh", "-tious, -cious (-shus)"], true]
      ];
      break;
    default:
      console.log("extra code not defined");
  }

  if (lesson.length > 0) { makeLesson(lesson); }
}

// -------------------- follow pattern for current lesson, replacing letters with approriate keys --------------------
function getLessonPattern(pattern, letters, keepOriginal = false) {
  if (!keepOriginal) {
    let templates = {
      "ab": "a b a b b a b b a a", "ab2": "a b a b a a b b a a",
      "ab3": "a a a b b b a b b a", "abc": "a b c a b c a a b c",
      "abc2": "a a b b c c a a c c", "five": "a b c d e a b c d e",
      "five2": "a a b b c c d d e e", "five3": "a c e b d c b a e d",
      "six": "a d b e c f d e f f", "six2": "b b e e a a d d c f",
      "ab4": "a b a b b a b a a b", "abc3": "a b c c b a a b c c",
      "abcd": "a b c d a b c d a b"
    };

    let replacements = {
      'a': letters[0], 'b': letters[1], 'c': letters[2],
      'd': letters[3], 'e': letters[4], 'f': letters[5]
    };

    let finalPattern = templates[pattern].replace(/[a-z]/g, m => replacements[m]);
    return finalPattern.split(" ");
  }
  else { return letters; } // for use in makeLesson
}
