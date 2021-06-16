// -------------------- add keyboard keys, letters on keys; adjust widths of tab, shift, etc.--------------------
function generateKeyboard() {
  // keyboard keys and steno keys
  let topRow = ["\~", "\!", "\@", "\#", "\$", "\%", "\^", "\&", "\*", "\(", "\)", "\_", "\+", "Backspace"];
  let topRowNums = ["\`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "\-", "\=", ""];
  let topRowNames = ["tilde", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "zero", "minus", "equals", "backspace"];

  let alphabetTop = ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "\{" + " " + "\[", "\}" + '<br>' + "\]", "\|" + '<br>' + "\\"];
  let stenoTop = ["", "S", "T", "P", "H", "\*", "\*", "F", "P", "L", "T", "D", "", ""];
  let alphaTopNames = ["tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "lbrace", "rbrace", "backslash"];

  let alphabetMiddle = ["CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", "\:" + " " + "\;", "\"" + " " + "'", "Enter"];
  let stenoMiddle = ["", "S", "K", "W", "R", "\*", "\*", "R", "B", "G", "S", "Z", ""];
  let alphaMiddleNames = ["caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", "colon", "quote", "enter"];

  let alphabetBottom = ["Shift", "Z", "X", "C", "V", "B", "N", "M", "\<" + '<br>' + "\,", "\>" + '<br>' + "\.", "\?" + '<br>' + "\/", "Shift"];
  let stenoBottom = ["", "", "", "A", "O", "", "E", "U", "", "", "", ""];
  let alphaBottomNames = ["left-shift", "Z", "X", "C", "V", "B", "N", "M", "less-than", "greater-than", "question-mark", "right-shift"];

  let bottomRow = ["Ctrl", "Fn", "Alt", " ", "Alt", "Ctrl", "Arrows"];
  let bottomRowNames = ["left-ctrl", "fn", "left-alt", "space", "right-alt", "right-ctrl", "arrows"];

  let keyboard = document.getElementById("keyboard");

  // row names for processing each row appropriately
  let qwertyRows = [topRow, alphabetTop, alphabetMiddle, alphabetBottom, bottomRow];
  let stenoRows = [topRowNums, stenoTop, stenoMiddle, stenoBottom];
  let qwertyNames = ["top-row", "alphabet-top", "alphabet-middle", "alphabet-bottom", "bottom-row"];
  let ids = [topRowNames, alphaTopNames, alphaMiddleNames, alphaBottomNames, bottomRowNames];

  // ---add keys to each row---
  qwertyRows.forEach(function(item, index) {
    let currentRow = document.createElement("div");
    currentRow.id = qwertyNames[index];
    currentRow.classList.add("container");
    keyboard.appendChild(currentRow);

    // add formatting for steno keys vs non-steno keys
    for (let i = 0; i < item.length; i++) {
      let element = document.createElement("div");
      element.innerHTML = '<span class="grayed">' + item[i] + '</span>' + '<br>';

      // use larger font size for steno keys
      if (stenoRows[index] && currentRow.id == "top-row") {
        element.innerHTML += '<span class="grayed">' + stenoRows[index][i] + '</span>';
      } else if (stenoRows[index]) {
        element.innerHTML += '<span class="steno">' + stenoRows[index][i] + '</span>';
      }

      // add an id and class
      element.id = "key-" + ids[index][i];
      element.classList.add("key");
      currentRow.appendChild(element);
    }
  });

  // ---style wide keys, e.g. space---
  let backspace = document.getElementById("key-backspace"), tab = document.getElementById("key-tab"), caps = document.getElementById("key-caps");
  let enter = document.getElementById("key-enter"), lshift = document.getElementById("key-left-shift"), rshift = document.getElementById("key-right-shift");
  let lctrl = document.getElementById("key-left-ctrl"), space = document.getElementById("key-space"), arrows = document.getElementById("key-arrows");
  let rctrl = document.getElementById("key-right-ctrl"), fn = document.getElementById("key-fn"), lalt = document.getElementById("key-left-alt");
  let ralt = document.getElementById("key-right-alt")

  let keyStyling = [backspace, tab, caps, enter, lshift, rshift, lctrl, fn, lalt, space, rctrl, ralt, arrows];
  for (let i = 0; i < keyStyling.length; i++) {
    if (keyStyling[i].previousElementSibling == null) {
      keyStyling[i].style.textAlign = 'left';
      keyStyling[i].style.paddingLeft = 2 + 'px';
      keyStyling[i].style.verticalAlign = 'text-bottom';
    } else if (keyStyling[i].nextElementSibling == null) {
      keyStyling[i].style.textAlign = 'right';
      keyStyling[i].style.paddingRight = 2 + 'px';
    }
  }

  backspace.style.width = 62 + 'px';
  tab.style.width = 62 + 'px';
  caps.style.width = 66 + 'px';
  enter.style.width = 78 + 'px';
  lshift.style.width = 94 + 'px';
  rshift.style.width = 93 + 'px';
  lctrl.style.width = 75 + 'px';
  space.style.width = 290 + 'px';
  arrows.style.width = 80 + 'px';
}

// -------------------- make a clone of the left hand and mirror it; update ids --------------------
function generateRightHand() {
  let leftHand = document.getElementById("left-hand");
  let rightHand = leftHand.cloneNode(true);
  rightHand.style.transform = 'scaleX(-1) translate(64px, 12px) rotate(5deg)';
  rightHand.id = "right-hand";
  let rightChildren = rightHand.childNodes;

  function changeChildIds(nodes) {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id) {
        nodes[i].id = nodes[i].id.replace("left", "right"); // replace left with right
        if (nodes[i].id[0] === "l") { nodes[i].id = "r" + nodes[i].id.substring(1); } // replace l with r
      } else {
        // console.log("no id for node " + i);
      }
      if (nodes[i].firstChild) { changeChildIds(nodes[i].childNodes); } // repeat for all children
    }
  }
  changeChildIds(rightChildren);

  leftHand.after(rightHand);
  document.getElementById("right-thumb").classList.add("adjustment");
}

// -------------------- get the last key pressed --------------------
let getLastKey = (function(set = false, setValue = "") {
  let lastKey = "";
  return function(setInner = set, setValueInner = setValue) {
    if (setInner) { lastKey = setValueInner; }
    return lastKey;
  }
})();

// -------------------- add event listeners for steno keys --------------------
function listenForKeys() {
  let keyMap = {}, keysPressed = [];

  // add key to key map if it hasn't been added already
  function getAllKeysPressed() {
    for (let key in keyMap) {
      if (!keyMap[key]) {
        if (!keysPressed.includes(key)) {
          keysPressed.push(key);
        } else {
          // console.log("duplicate"); // skip duplicates
        }
      } else {
        return []; // don't process array if any keys still pressed
      }
    }

    let sortedKeys = keysPressed.sort();
    let keyStroke = determineKeystroke(sortedKeys);
    let word = checkDictionary(sortedKeys);
    if (sortedKeys[0] === "Enter") {
      // console.log("enter");
    } else {
      getLastKey(true, keyStroke); // update last key pressed
      positionHand(sortedKeys, keyStroke);
      pressKeys(keysPressed);
      if (word) { clearStenoOrder(); } // reset steno order so only word is displayed
      setStenoOrder(keysPressed);
      compareToPractice(keyStroke, word);
      // compareToMetronomePractice(keyStroke, word);
    }

    keysPressed = [], keyMap = {}; // reset keyMap and keysPressed
    return sortedKeys;
  }

  // allow arrows to perform default behaviors
  let arrows = ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"];

  // if a key is down, set its keyMap value to true
  function trackKeysDown(e) {
    if (!arrows.includes(e.key)) { e.preventDefault(); }
    keyMap[e.key] = true;
    return;
  }

  // if a key is up, set its keyMap value to false, update all keys pressed
  function trackKeysUp(e) {
    if (!arrows.includes(e.key)) { e.preventDefault(); }
    keyMap[e.key] = false;
    getAllKeysPressed();
    return;
  }

  document.body.focus();
  document.body.addEventListener("keydown", trackKeysDown, false);
  document.body.addEventListener("keyup", trackKeysUp, false);
}
listenForKeys();

// -------------------- process the steno key/chord --------------------
function determineKeystroke(keyArray) {
  // add the keys pressed to a string for processing
  let arrayToString = "";
  for (let i = 0; i < keyArray.length; i++) { arrayToString += keyArray[i]; }

  // maps of steno keys and chords corresponding to keystrokes
  let stenoMap = {
    "q": "s", "a": "s", "w": "t", "s": "k", "e": "p", "d": "w", "r": "h",
    "f": "r", "t": "*", "g": "*", "y": "*", "h": "*", "u": "\-f", "j": "\-r",
    "i": "\-p", "k": "\-b", "o": "\-l", "l": "\-g", "p": "\-t", "\;": "\-s", "\[": "\-d",
    "'": "\-z", "c": "a", "v": "o", "n": "e", "m": "u"
  };
  let twoKeyMap = {
    "sw": "d", "de": "b", "fr": "l",
    "ew": "f", "ds": "q", "er": "m",
    "af": "v", "fs": "c", "es": "x",
    "ag": "z", "qt": "z", "at": "z", "gq": "z",
    "ah": "z", "qy": "z", "ay": "z", "hq": "z",
    "aq": "s",
    "mn": "i",
    "ik": "\-n",
    "io": "\-m", "kl": "\-k", "uy": "\-v",
    "tu": "\-v", "gu": "\-v", "hu": "-v",
    "\;\[": "\-sd"
  };
  let threeKeyMap = {
    "erw": "n", "dfs": "y",
    "\;kl": "\-x",
    "aqt": "z", "agq": "z",
    "aqy": "z", "ahq": "z"
  }
  let fourPlusKeyMap = {
    "adeqsw": "z", "deqsw": "z", "adesw": "z",
    "desw": "g", "adfs": "j",
    "iklo": "\-j",
    "cmnv": "ī"
  }

  // make sure longest chord is processed and not its substrings
  let length = arrayToString.length;
  if (length >= 4 && fourPlusKeyMap[arrayToString]) {
    if (fourPlusKeyMap[arrayToString] == "ī") { return fourPlusKeyMap[arrayToString]; }
    else { return fourPlusKeyMap[arrayToString].toUpperCase(); }
  } else if (length === 3 && threeKeyMap[arrayToString]) {
    return threeKeyMap[arrayToString].toUpperCase();
  } else if (length === 2 && twoKeyMap[arrayToString]) {
    return twoKeyMap[arrayToString].toUpperCase();
  } else if (length === 1 && stenoMap[arrayToString]) {
    return stenoMap[arrayToString].toUpperCase();
  } else if (length > 0) {
    // console.log("no element mapped to that key combo");
  } else {
    // console.log("zero length");
  }
  return "";
}

// -------------------- position the right and left hand on the keyboard --------------------
function positionHand(keysPressed, stenoKey = "") {
  // fingers map
  let f = {
    "leftPinky": {keys: ["q", "a", "1"], finger: document.getElementById("lpi-fend"), dot: document.getElementById("lpi-ftip"),
    full: document.getElementById("left-pinky")},
    "leftRing": {keys: ["w", "s", "2"], finger: document.getElementById("lr-fend"), dot: document.getElementById("lr-ftip"),
    full: document.getElementById("left-ring")},
    "leftMiddle": {keys: ["e", "d", "3"], finger: document.getElementById("lm-fend"), dot: document.getElementById("lm-ftip"),
    full: document.getElementById("left-middle")},
    "leftPointer": {keys: ["r", "f", "4", "5"], finger: document.getElementById("lp-fend"), dot: document.getElementById("lp-ftip"),
    full: document.getElementById("left-pointer")},
    "leftRotatedPointer": {keys: ["t", "g"], finger: document.getElementById("lp-rotated-fend"), dot: document.getElementById("lp-rotated-ftip"),
    full: document.getElementById("left-rotated-pointer")},
    "leftThumb": {keys: ["c", "v"], finger: document.getElementById("left-thumb"), dot: document.getElementById("lt-ftip"),
    full: document.getElementById("left-thumb")},
    "rightThumb": {keys: ["n", "m"], finger: document.getElementById("right-thumb"), dot: document.getElementById("rt-ftip"),
    full: document.getElementById("right-thumb")},
    "rightPointer": {keys: ["u", "j", "6", "7"], finger: document.getElementById("rp-fend"), dot: document.getElementById("rp-ftip"),
    full: document.getElementById("right-pointer")},
    "rightRotatedPointer": {keys: ["y", "h"], finger: document.getElementById("rp-rotated-fend"), dot: document.getElementById("rp-rotated-ftip"),
    full: document.getElementById("right-rotated-pointer")},
    "rightMiddle": {keys: ["i", "k", "8"], finger: document.getElementById("rm-fend"), dot: document.getElementById("rm-ftip"),
    full: document.getElementById("right-middle")},
    "rightRing": {keys: ["o", "l", "9"], finger: document.getElementById("rr-fend"), dot: document.getElementById("rr-ftip"),
    full: document.getElementById("right-ring")},
    "rightPinky": {keys: ["p", "\;", "0", "\-"], finger: document.getElementById("rpi-fend"), dot: document.getElementById("rpi-ftip"),
    full: document.getElementById("right-pinky")},
    "rightRotatedPinky": {keys: ["\[", "\'", "\="], finger: document.getElementById("rpi-rotated-fend"), dot: document.getElementById("rpi-rotated-ftip"),
    full: document.getElementById("right-rotated-pinky")}
  }

  // side view of hand
  let sidePointer = document.getElementById("finger-side-middle");
  let sidePointerTip = document.getElementById("finger-side-tip");

  // reset the view
  function clearKeys() {
    // remove any normal up/down movements
    for (let key in f) {
      f[key].finger.classList.remove("top-key", "bottom-key", "thumb-c", "thumb-v", "thumb-n", "thumb-m");
      f[key].dot.classList.remove("top-dot", "bottom-dot");
      f[key].full.classList.remove("just-asterisk", "asterisk", "asterisk-reverse", "pointer-asterisk");
    }

    if (sidePointer.hidden === false) {
      sidePointer.classList.remove("pointer-forward", "pointer-backward");
      sidePointerTip.classList.remove("pointer-tip-forward", "pointer-tip-backward");
    }

    f["rightRotatedPinky"].full.hidden = true;
    f["rightPinky"].full.hidden = false;
    f["rightRotatedPointer"].full.hidden = true;
    f["rightPointer"].full.hidden = false;
    f["leftRotatedPointer"].full.hidden = true;
    f["leftPointer"].full.hidden = false;
  }
  clearKeys();

  // get the finger associated with a pressed key; key-value pair from map (finger: key pressed, etc.)
  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key].keys.includes(value));
  }

  // if a finger presses multiple keys at once, only move finger once -- skip key, process value
  let regKeyPairs = {
    "a": "q", "s": "w", "d": "e", "f": "r", "g": "t",
    "h": "y", "j": "u", "i": "k", "l": "o", "\;": "p",
    "\'": "\[", "c": "v", "m": "n"
  };

  let specKeyPairs = {
    "r": "t", "f": "g", "u": "y", "j": "h", "\[": "p", "\'": "\;"
  };

  if (keysPressed.length === 1) {
    moveFinger(keysPressed[0], getKeyByValue(f, keysPressed[0]), false); // middle = false
  } else {
    for (let i = 0; i < keysPressed.length; i++) {
      let special = false, middle = false;
      let valueToKey = Object.keys(regKeyPairs).find(key => regKeyPairs[key] === keysPressed[i]);
      let specValueToKey = Object.keys(specKeyPairs).find(key => specKeyPairs[key] === keysPressed[i]);

      if (Object.keys(regKeyPairs).includes(keysPressed[i]) && keysPressed.includes(regKeyPairs[keysPressed[i]])) {
        // if key and value are a pair in regular keys, skip the key, process the value
      } else if (Object.values(regKeyPairs).includes(keysPressed[i]) && keysPressed.includes(valueToKey)) {
        moveFinger(keysPressed[i], getKeyByValue(f, keysPressed[i]), true, false); // middle = true, special = false
      } else if (Object.keys(specKeyPairs).includes(keysPressed[i]) && keysPressed.includes(specKeyPairs[keysPressed[i]])) {
        // if key and value are a pair in spec keys, skip the key, process the value
      } else if (Object.values(specKeyPairs).includes(keysPressed[i]) && keysPressed.includes(specValueToKey)) {
        moveFinger(keysPressed[i], getKeyByValue(f, keysPressed[i]), false, true); // middle = false, special = true
      } else {
        // otherwise process both key and value
        moveFinger(keysPressed[i], getKeyByValue(f, keysPressed[i]), false, false); // middle = false, special = false
      }
    }
  }

  // move each finger to the proper key
  function moveFinger(keyDown, currentFinger, middle = false, special = false) {
    // console.log(stenoKey);

    if (currentFinger === "rightRotatedPinky") {
      f["rightRotatedPinky"].full.hidden = false;
      f["rightPinky"].full.hidden = true;
    } else if (currentFinger === "rightRotatedPointer") {
      f["rightRotatedPointer"].full.hidden = false;
      f["rightPointer"].full.hidden = true;
    } else if (currentFinger === "leftRotatedPointer") {
      f["leftRotatedPointer"].full.hidden = false;
      f["leftPointer"].full.hidden = true;
    }

    if (keyDown.match(/\d/) || keyDown === "\-" || keyDown === "\=") {
      return; // don't move fingers for number bar
    }

    if (!middle) {
      let upMoves = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "\["];
      let downMoves = ["a", "s", "d", "f", "j", "k", "l", "\;", "\'"];
      let fingerClass = "", dotClass = "";

      if (upMoves.includes(keyDown)) {
        fingerClass = "top-key", dotClass = "top-dot";
      } else if (downMoves.includes(keyDown)) {
        fingerClass = "bottom-key", dotClass = "bottom-dot";
      } else {
        fingerClass = "thumb-" + keyDown;
      }

      if (fingerClass && f[currentFinger]) { f[currentFinger].finger.classList.add(fingerClass); }
      if (dotClass && f[currentFinger]) { f[currentFinger].dot.classList.add(dotClass); }

      // add specialized movements
      if (special) {
        let fingers = ["Middle", "Ring", "Pinky"];
        let direction = (currentFinger[0] === "l") ? "left" : "right";
        if ((keyDown === "p" || keyDown === "\;") && !stenoKey) {
          f[currentFinger].full.classList.add("asterisk-reverse");
        } else {
          f[currentFinger].full.classList.add("pointer-asterisk");
        }
      }
    }

    //---adjust pinky for -SD press---
    if (stenoKey === "\-SD") {
      f[currentFinger].finger.classList.remove("top-key");
      f[currentFinger].dot.classList.remove("top-dot");
    }

    //---middle keys (no movement)---
    if (middle) {
      f[currentFinger].finger.classList.remove("thumb-c", "thumb-v", "thumb-n", "thumb-m");
    }

    //---side view---
    if (sidePointer.hidden === false && currentFinger === "leftPointer") {
      if (keyDown === "f" && !middle) {
        sidePointer.classList.add("pointer-backward");
        sidePointerTip.classList.add("pointer-tip-backward");
      } else if (keyDown === "r" && !middle) {
        sidePointer.classList.add("pointer-forward");
        sidePointerTip.classList.add("pointer-tip-forward");
      } else {
        sidePointer.classList.remove("pointer-forward", "pointer-backward");
        sidePointerTip.classList.remove("pointer-tip-forward", "pointer-tip-backward");
      }
    }
  }
}

// -------------------- change color of each key that is pressed --------------------
function pressKeys(keysPressed) {
  let keyIds = {
	"\`": "tilde", "\~": "tilde", "\!": "one", "1": "one", "\@": "two", "2": "two",
  "\#": "three", "3": "three", "\$": "four", "4": "four", "\%": "five", "5": "five",
  "\^": "six", "6": "six", "\&": "seven", "7": "seven", "\*": "eight", "8": "eight",
  "\(": "nine", "9": "nine", "\)": "zero", "0": "zero", "\_": "minus", "\-": "minus",
  "\+": "equals", "\=": "equals", "Backspace": "backspace", "Tab": "tab",
  "\{": "lbrace", "\[": "lbrace", "\}": "rbrace", "\]": "rbrace",
  "\|": "backslash", "\\": "backslash", "CapsLock": "caps",
  "\:": "colon", "\;": "colon", "\"": "quote", "\'": "quote",
  "Enter": "enter", "\<": "less-than", "\,": "less-than",
  "\>": "greater-than", "\.": "greater-than", "\?": "question-mark", "\/": "question-mark",
  "Control": "left-ctrl", " ": "space", "Shift": "left-shift", "Control": "left-ctrl"
  }

  let currentIds = [], currentKey = "";

  // get ids of all pressed keys
  for (let i = 0; i < keysPressed.length; i++) {
    if (keyIds[keysPressed[i]]) {
      currentKey = document.getElementById("key\-" + keyIds[keysPressed[i]]); // non-letters
    } else if ((/[a-zA-Z]/).test(keysPressed[i])) {
      currentKey = document.getElementById("key\-" + keysPressed[i].toUpperCase()); // letters
    }

    if (currentKey) {
      currentKey.classList.add("pressed-key");
      currentIds.push(currentKey);
    }
  }

  setTimeout(function() {
    for (let i = 0; i < currentIds.length; i++) {
      currentIds[i].classList.remove("pressed-key");
    }
  }, 200);
}

// -------------------- generate steno order display --------------------
function generateStenoOrder() {
  let stenoOrder = "STKPWHRAO*EUFRPBLGTSDZ";
  let stenoOrderElement = document.getElementById("steno-order");

  for (let i = 0; i < stenoOrder.length; i++) {
    let currentElement = document.createElement("span");
    currentElement.textContent = stenoOrder[i];
    if (i < 12) { currentElement.id = "steno" + stenoOrder[i]; } // left-hand and vowel steno keys
    else { currentElement.id = "steno\-" + stenoOrder[i]; } // right-hand steno keys
    currentElement.classList.add("steno-order-letter");
    stenoOrderElement.appendChild(currentElement);
  }

  document.body.addEventListener("keydown", function() {
    if (event.key === " ") { clearStenoOrder(); }
  }, false);
}

// -------------------- remove highlights from all letters in steno order --------------------
function clearStenoOrder() {
  let letters = document.getElementsByClassName("steno-order-letter");
  for (let i = 0; i < letters.length; i++) {
    letters[i].classList.remove("highlighted-steno");
  }
}

// -------------------- highlight pressed keys in steno order --------------------
function setStenoOrder(keys) {
  let stenoMap = {
    "q": "s", "a": "s", "w": "t", "s": "k", "e": "p", "d": "w", "r": "h",
    "f": "r", "t": "*", "g": "*", "y": "*", "h": "*", "u": "\-f", "j": "\-r",
    "i": "\-p", "k": "\-b", "o": "\-l", "l": "\-g", "p": "\-t", "\;": "\-s", "\[": "\-d",
    "'": "\-z", "c": "a", "v": "o", "n": "e", "m": "u"
  };
  for (let i = 0; i < keys.length; i++) {
    if (!stenoMap[keys[i]]) { continue; }
    let currentLetter = document.getElementById("steno" + stenoMap[keys[i]].toUpperCase());
    if (currentLetter) { currentLetter.classList.add("highlighted-steno"); }
  }
}

// -------------------- generate letters for user to type --------------------
function generatePracticeLetters(letters = [], start = 0, end = 10) {
  let practiceDiv = document.getElementById("practice");
  let metronomeDiv = document.getElementById("metronome-practice");
  if (practiceDiv.firstChild || metronomeDiv.firstChild) { clearPracticeLetters(); } // clear practice and metronome divs

  getPracticeIndex(true, start);

  for (let i = start; i < end; i++) {
    let currentLetter = document.createElement("div");
    currentLetter.textContent = letters[i];
    currentLetter.classList.add("practice-letter");
    currentLetter.addEventListener("click", vocabWordListener, false);
    practiceDiv.appendChild(currentLetter);

    if (i === start) {
      // make first letter fully visible, on top
      currentLetter.style.zIndex = 5;
      let marginSize = currentLetter.getBoundingClientRect().width/5;
      if (window.innerWidth < 700) { currentLetter.style.marginLeft = marginSize + "%"; }
      currentLetter.style.overflow = "visible";
      currentLetter.style.minWidth = "auto";
    }

    let metronomeLetter = document.createElement("button");
    metronomeLetter.setAttribute("role", "switch");
    metronomeLetter.setAttribute("aria-checked", true);
    metronomeLetter.textContent = letters[i];
    metronomeLetter.classList.add("practice-letter");
    metronomeDiv.appendChild(metronomeLetter);
  }

  // show hand positions when a practice word is clicked
  // let practiceWords = document.querySelectorAll("practice-letter");
  // console.log("adding practiceWords?");
  // for (let i = 0; i < practiceWords.length; i++) { practiceWords[i].addEventListener("click", vocabWordListener, false); }
  function vocabWordListener() {
    console.log("pressed a span, text is " + event.target.textContent);
    // let wordIndex = event.target.textContent.indexOf(":");
    // let word = event.target.textContent.substring(0, wordIndex);
    let word = event.target.textContent.toLowerCase();
    // console.log(word);
    let reversed = checkDictionary([], true, word).split("");
    // console.log("reversed: " + reversed);
    if (reversed) {
      positionHand(reversed);
      pressKeys(reversed);
      clearStenoOrder();
      setStenoOrder(reversed);
    }
  }
}

// -------------------- remove all practice letters --------------------
function clearPracticeLetters() {
  let practiceDiv = document.getElementById("practice");
  while (practiceDiv.firstChild) {
    practiceDiv.removeChild(practiceDiv.firstChild);
  }

  let metronomeDiv = document.getElementById("metronome-practice");
  while (metronomeDiv.firstChild) {
    metronomeDiv.removeChild(metronomeDiv.firstChild);
  }

  removeMetronomeListeners();
}

// -------------------- clear highlighted elements --------------------
function clearHighlights() {
  // unhighlight any highlighted elements
  let highlighted = document.querySelectorAll(".highlight-element");
  highlighted.forEach(function (element) { element.classList.remove("highlight-element") });
}

function clearGreenKeys() {
  let greenKeys = document.querySelectorAll(".green-key");
  greenKeys.forEach(function (element) { element.classList.remove("green-key") });
}

// -------------------- compare user keystroke to practice letters --------------------
function compareToPractice(userKeystroke, dictionaryWord) {
  let practiceDiv = document.getElementById("practice");
  let metronomeDiv = document.getElementById("metronome-practice");
  if (practiceDiv.firstChild) {
    let practiceLetters = practiceDiv.childNodes;
    let metronomeLetters = metronomeDiv.childNodes;

    let practiceLetter = null, metronomeLetter = null;
    let nextPracticeLetter = null;
    if (practiceLetters.length < getNextLesson().length) {
      practiceLetter = practiceLetters[getPracticeIndex() % 10];
      nextPracticeLetter = practiceLetters[(getPracticeIndex() % 10) + 1];
      metronomeLetter = metronomeLetters[getPracticeIndex() % 10];
    } else {
      practiceLetter = practiceLetters[getPracticeIndex()];
      nextPracticeLetter = practiceLetters[getPracticeIndex() + 1];
      metronomeLetter = metronomeLetters[getPracticeIndex()];
    }

    // if (metronomeLetter.getAttribute('aria-checked') === 'false') {
    //   console.log("skip this one");
    //   getPracticeIndex(true, getPracticeIndex()+1);
    // }

    // repeat or restart lesson if user types S-S
    if (dictionaryWord === "SS") {
      clearPracticeLetters();
      getPracticeIndex(true, 0);
      if (getNextLessonFull()) {
        generatePracticeLetters(getNextLesson(), 0, getNextLesson().length);
      } else {
        generatePracticeLetters(getNextLesson(), 0, Math.min(getPracticeIndex()+10, getNextLesson().length));
      }

      activateMetronomeButtons();
    }

    if (userKeystroke === practiceLetter.textContent || dictionaryWord.toLowerCase() === practiceLetter.textContent.toLowerCase()) {
      // MATCH
      getPracticeIndex(true, getPracticeIndex()+1);
      let metronome = getMetronome();
      if (metronomeLetter.style.borderColor == 'yellow') {
        // console.log("yellow border");
        metronomeLetter.style.backgroundImage = 'none';
        metronomeLetter.style.backgroundColor = 'green';
      } else {
        // console.log("black border");
        metronomeLetter.style.backgroundImage = 'none';
        if (metronome.isRunning) { metronomeLetter.style.backgroundColor = 'red'; }
        else { metronomeLetter.style.backgroundColor = 'yellow'; }
      }

      if (practiceLetter != practiceDiv.lastChild) {
        // ANSWER CORRECT, NOT ON LAST LETTER DISPLAYED
        practiceLetter.textContent = "";
        practiceLetter.style.zIndex = -10;
        practiceLetter.style.minWidth = "1px";
        nextPracticeLetter.style.zIndex = 5;
        nextPracticeLetter.style.overflow = "visible";
        // if (nextPracticeLetter.getBoundingClientRect().width > 100) {
        //   nextPracticeLetter.style.minWidth = "auto";
        // }
        nextPracticeLetter.style.minWidth = "auto";
        metronomeLetter.textContent = "";
      } else if (getPracticeIndex() < getNextLesson().length) {
        // ON LAST LETTER DISPLAYED, DISPLAY REST OF EXERCISE
        generatePracticeLetters(getNextLesson(), getPracticeIndex(), Math.min(getPracticeIndex()+10, getNextLesson().length));
      } else {
        // ON LAST LETTER DISPLAYED, END OF LESSON
        getPracticeIndex(true, 0);
        metronome.stop();
        document.querySelector('[data-playing]').dataset.playing = 'false'; // show play button after metronome stops
        practiceDiv.textContent = "(Type S-S to repeat exercise, or press ENTER to continue)";
        metronomeLetter.textContent = "";
      }
    } else {
      // console.log("not match...");
    }
  } else {
    // console.log("out of letters");
  }
}

// -------------------- get the next set of practice letters --------------------
let getNextLesson = (function(set = false, setValue = []) {
  let nextLesson = [];
  return function(setInner = set, setValueInner = setValue) {
    if (setInner) { nextLesson = setValueInner; }
    return nextLesson;
  }
})();

// ----- get whether next lesson should be displayed in full
let getNextLessonFull = (function(set = false, setValue = false) {
  let nextLessonFull = false;
  return function(setInner = set, setValueInner = setValue) {
    if (setInner) { nextLessonFull = setValueInner; }
    return nextLessonFull;
  }
})();

// -------------------- get the index for practice letters --------------------
let getPracticeIndex = (function(set = false, setValue = 0) {
  let practiceIndex = 0;
  return function(setInner = set, setValueInner = setValue) {
    if (setInner) {
      practiceIndex = setValueInner;
      if (practiceIndex >= getNextLesson().length) { return -1; }
     }
    return practiceIndex;
  }
})();
