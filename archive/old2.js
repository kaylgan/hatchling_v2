// add keyboard keys, letters on keys; adjust widths of tab, shift, etc.
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

  // -------------------------add keys to each row-------------------------
  qwertyRows.forEach(function(item, index) {
    let currentRow = document.createElement("div");
    currentRow.id = qwertyNames[index];
    currentRow.classList.add("container");
    keyboard.appendChild(currentRow);

    // add formatting for steno keys vs non-steno keys
    for (let i = 0; i < item.length; i++) {
      let element = document.createElement("div");
      element.innerHTML = '<span class="grayed">' + item[i] + '</span>' + '<br>';

      // use placeholder for keys with only one letter row
      if (stenoRows[index] && stenoRows[index][i] == "\^") {
        element.innerHTML += '<span class="placeholder">' + stenoRows[index][i] + '</span>';
      } else if (stenoRows[index] && currentRow.id == "top-row") {
        element.innerHTML += stenoRows[index][i];
      } else if (stenoRows[index]) {
        element.innerHTML += '<span class="steno">' + stenoRows[index][i] + '</span>';
      }

      // add an id and class
      element.id = "key-" + ids[index][i];
      element.classList.add("key");
      currentRow.appendChild(element);
    }
  });

  // -------------------------style wide keys, e.g. space-------------------------
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


// get the last key pressed
let getLastKey = (function(set = false, setValue = "") {
  let lastKey = "";
  return function(setInner = set, setValueInner = setValue) {
    if (setInner) { lastKey = setValueInner; }
    console.log("lastKey is " + lastKey);
    return lastKey;
  }
})();


// make a clone of the left hand and mirror it; update ids
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
  document.getElementById("right-thumb").style.transform = 'rotate(31deg) translate(-10px, 1px)';
}


// add event listeners for steno keys
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
    console.log("keysPressed is " + keysPressed);
    let keyStroke = determineKeystroke(sortedKeys);
    let word = checkDictionary(sortedKeys);
    console.log("keyStroke is " + keyStroke);
    console.log("word is " + word);
    if (sortedKeys[0] === "Enter") {
      console.log("enter");
      pressKeys(sortedKeys);
    } else {
      getLastKey(true, keyStroke); // update last key pressed
      positionHand(sortedKeys, keyStroke);
      pressKeys(keysPressed);
      // setStenoOrder(getLastKey());
      setStenoOrder(keysPressed);
      compareToPractice(keyStroke, word);
    }

    keysPressed = [], keyMap = {}; // reset keyMap and keysPressed
    return sortedKeys;
  }

  // if a key is down, set its keyMap value to true
  function trackKeysDown(e) {
    e.preventDefault();
    keyMap[e.key] = true;
    return;
  }

  // if a key is up, set its keyMap value to false, update all keys pressed
  function trackKeysUp(e) {
    e.preventDefault();
    keyMap[e.key] = false;
    getAllKeysPressed();
    return;
  }

  document.body.focus();
  document.body.addEventListener("keydown", trackKeysDown, false);
  document.body.addEventListener("keyup", trackKeysUp, false);
}
listenForKeys();


// process the steno key/chord
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
    "ag": "z", "qt": "z", "at": "z", "fq": "z",
    "aq": "s",
    "mn": "i",
    "ik": "\-n",
    "io": "\-m", "kl": "\-k", "uy": "\-v"
  };
  let threeKeyMap = {
    "erw": "n", "dfs": "y",
    "\;kl": "\-x",
    "aqt": "z", "agq": "z"
  }
  let fourPlusKeyMap = {
    "adeqsw": "z", "deqsw": "z", "adesw": "z",
    "desw": "g", "adfs": "j",
    "iklo": "\-j",
  }

  // make sure longest chord is processed and not its substrings
  let length = arrayToString.length;
  if (length >= 4 && fourPlusKeyMap[arrayToString]) {
    return fourPlusKeyMap[arrayToString].toUpperCase();
  } else if (length === 3 && threeKeyMap[arrayToString]) {
    return threeKeyMap[arrayToString].toUpperCase();
  } else if (length === 2 && twoKeyMap[arrayToString]) {
    return twoKeyMap[arrayToString].toUpperCase();
  } else if (length === 1 && stenoMap[arrayToString]) {
    return stenoMap[arrayToString].toUpperCase();
  } else if (length > 0) {
    console.log("no element mapped to that key combo");
  } else {
    console.log("zero length");
  }
  return "";
}


// check if the keystroke is a word
function checkDictionary(keyArray) {
  // add the keys pressed to a string for processing
  let arrayToString = "";
  for (let i = 0; i < keyArray.length; i++) { arrayToString += keyArray[i]; }

  // maps of steno keys and chords corresponding to keystrokes
  let oneKey = {
    "a": "is", "q": "is"
  };
  let twoKeys = {
    "sw": "d", "de": "b"
  };
  let threeKeys = {
    "erw": "n", "dfs": "y"
  }
  let fourPlusKeys = {
    "acjw": "star", "cjqw": "star",
    "\;acjw": "stars", "\;cjqw": "stars",
    "\[acjw": "starred", "\[cjqw": "starred"
  }

  // make sure longest chord is processed and not its substrings
  let length = arrayToString.length;
  if (length >= 4 && fourPlusKeys[arrayToString]) {
    return fourPlusKeys[arrayToString];
  } else if (length === 3 && threeKeys[arrayToString]) {
    return threeKeys[arrayToString];
  } else if (length === 2 && twoKeys[arrayToString]) {
    return twoKeys[arrayToString];
  } else if (length === 1 && oneKey[arrayToString]) {
    return oneKey[arrayToString];
  } else if (length > 0) {
    console.log("no element mapped to that key combo");
  } else {
    console.log("zero length");
  }
  return "";
}


// position the right and left hand on the keyboard
function positionHand(keysPressed, stenoKey) {
  // fingers map
  let f = {
    "leftPinky": {keys: ["q", "a"], finger: document.getElementById("lpi-fend"), dot: document.getElementById("lpi-ftip"),
    full: document.getElementById("left-pinky")},
    "leftRing": {keys: ["w", "s"], finger: document.getElementById("lr-fend"), dot: document.getElementById("lr-ftip"),
    full: document.getElementById("left-ring")},
    "leftMiddle": {keys: ["e", "d"], finger: document.getElementById("lm-fend"), dot: document.getElementById("lm-ftip"),
    full: document.getElementById("left-middle")},
    "leftPointer": {keys: ["r", "f", "t", "g"], finger: document.getElementById("lp-fend"), dot: document.getElementById("lp-ftip"),
    full: document.getElementById("left-pointer")},
    "leftThumb": {keys: ["c", "v"], finger: document.getElementById("left-thumb"), dot: document.getElementById("lt-ftip"),
    full: document.getElementById("left-thumb")},
    "rightThumb": {keys: ["n", "m"], finger: document.getElementById("right-thumb"), dot: document.getElementById("rt-ftip"),
    full: document.getElementById("right-thumb")},
    "rightPointer": {keys: ["y", "h", "u", "j"], finger: document.getElementById("rp-fend"), dot: document.getElementById("rp-ftip"),
    full: document.getElementById("right-pointer")},
    "rightMiddle": {keys: ["i", "k"], finger: document.getElementById("rm-fend"), dot: document.getElementById("rm-ftip"),
    full: document.getElementById("right-middle")},
    "rightRing": {keys: ["o", "l"], finger: document.getElementById("rr-fend"), dot: document.getElementById("rr-ftip"),
    full: document.getElementById("right-ring")},
    "rightPinky": {keys: ["p", "\;"], finger: document.getElementById("rpi-fend"), dot: document.getElementById("rpi-ftip"),
    full: document.getElementById("right-pinky")},
    "rightRotatedPinky": {keys: ["\[", "\'"], finger: document.getElementById("rpi-rotated-fend"), dot: document.getElementById("rpi-rotated-ftip"),
    full: document.getElementById("right-rotated-pinky")}
  }

  // side view of hand
  let sidePointer = document.getElementById("finger-side-middle");
  let sidePointerTip = document.getElementById("finger-side-tip");

  // reset the view
  function clearKeys() {
    // remove any normal up/down movements
    for (let key in f) {
      f[key].finger.classList.remove("top-key", "bottom-key");
      f[key].dot.classList.remove("top-dot", "bottom-dot");
      f[key].full.classList.remove("just-asterisk", "asterisk");
    }

    // remove any specialized movements
    f["leftThumb"].finger.style.transform = 'rotate(35deg) translate(0, 0)';
    f["rightThumb"].finger.style.transform = 'rotate(31deg) translate(-10px, 1px)';
    f["leftPinky"].full.classList.remove("left-pinky-Z");
    sidePointer.style.transform = 'rotate(172deg) translate(0, 0) scaleY(1)';
    sidePointerTip.style.transform = 'rotate(182deg) translate(0, 0) scaleY(1)';

    f["rightRotatedPinky"].full.hidden = true;
    f["rightPinky"].full.hidden = false;

    f["rightRotatedPinky"].dot.classList.remove("bottom-pinky-dot");
    f["rightPointer"].dot.classList.remove("bottom-pointer-dot");
    f["leftPointer"].dot.classList.remove("bottom-pointer-dot");
  }
  clearKeys();

  // get the finger associated with a pressed key; key-value pair from map (finger: key pressed, etc.)
  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key].keys.includes(value));
  }

  // process keys that have a conflict, e.g. duplicate steno key
  for (let i = 0; i < keysPressed.length; i++) {
    if (stenoKey === "S" && keysPressed.length === 2) {
      moveFinger("z", "leftPinky"); // avoid conflict from two left "S" steno keys
      break;
    } else if (keysPressed.includes("c") && keysPressed.includes("v")) {
      moveFinger("x", "leftThumb"); // process a c/v thumb press. no associated steno key.
      break;
    }
    moveFinger(keysPressed[i], getKeyByValue(f, keysPressed[i]));
  }

  // move each finger to the proper key
  function moveFinger(keyDown, currentFinger) {
    // move finger in correct direction/angle
    switch (keyDown) {
      // ---------- THUMBS ----------
      case ("c"):
        f[currentFinger].finger.style.transform = 'rotate(20deg) translate(-22px, 4px)';
        break;
      case ("v"):
        f[currentFinger].finger.style.transform = 'rotate(35deg) translate(15px, -5px)';
        break;
      case ("x"):
        if (f[currentFinger]) { f[currentFinger].finger.style.transform = 'rotate(35deg) translate(0, 0)'; }
        break;
      case ("n"):
        if (stenoKey === "I") { f[currentFinger].finger.style.transform = 'rotate(31deg) translate(-10px, 1px)'; }
        else { f[currentFinger].finger.style.transform = 'rotate(35deg) translate(10px, -10px)'; }
        break;
      case ("m"):
        f[currentFinger].finger.style.transform = 'rotate(15deg) translate(-30px, 4px)';
        break;

      // ---------- RIGHT PINKY ----------
      case ("\["):
        f["rightPinky"].full.hidden = true;
        f["rightRotatedPinky"].full.hidden = false;
        f["rightRotatedPinky"].finger.classList.add("top-key");
        f["rightRotatedPinky"].dot.classList.add("top-dot");
        break;
      case ("\'"):
        f["rightPinky"].full.hidden = true;
        f["rightRotatedPinky"].full.hidden = false;
        f["rightRotatedPinky"].finger.classList.add("bottom-key");
        f["rightRotatedPinky"].dot.classList.add("bottom-pinky-dot");
        break;

      // ---------- LEFT POINTER ----------
      case ("t"):
        f["leftPointer"].full.classList.add("just-asterisk");
        f["leftMiddle"].full.classList.add("asterisk");
        f["leftRing"].full.classList.add("asterisk");
        f["leftPinky"].full.classList.add("asterisk");
        f["leftPointer"].finger.classList.add("top-key");
        f["leftPointer"].dot.classList.add("top-dot");
        if (stenoKey === "Z") {
          f["leftPinky"].full.classList.add("left-pinky-Z")
          f["leftPinky"].finger.classList.add("top-key");
          f["leftPinky"].dot.classList.add("top-dot");
        }
        break;
      case ("g"):
        f["leftPointer"].full.classList.add("just-asterisk");
        f["leftMiddle"].full.classList.add("asterisk");
        f["leftRing"].full.classList.add("asterisk");
        f["leftPinky"].full.classList.add("asterisk");
        f["leftPointer"].finger.classList.add("bottom-key");
        f["leftPointer"].dot.classList.add("bottom-pointer-dot");
        if (stenoKey === "Z") {
          f["leftPinky"].full.classList.add("left-pinky-Z")
          f["leftPinky"].finger.classList.add("bottom-key");
          f["leftPinky"].dot.classList.add("bottom-dot");
        }
        break;

      // ---------- RIGHT POINTER ----------
      case ("y"):
        f["rightMiddle"].full.classList.add("asterisk");
        f["rightRing"].full.classList.add("asterisk");
        f["rightPinky"].full.classList.add("asterisk");
        f["rightPointer"].finger.classList.add("top-key");
        f["rightPointer"].dot.classList.add("top-dot");
        if (stenoKey === "\-V") { f["rightPointer"].full.classList.add("asterisk"); }
        else { f["rightPointer"].full.classList.add("just-asterisk"); }
        break;
      case ("h"):
        f["rightMiddle"].full.classList.add("asterisk");
        f["rightRing"].full.classList.add("asterisk");
        f["rightPinky"].full.classList.add("asterisk");
        f["rightPointer"].full.classList.add("just-asterisk");
        f["rightPointer"].finger.classList.add("bottom-key");
        f["rightPointer"].dot.classList.add("bottom-pointer-dot");
        break;
      default:
        // console.log("default");
    }

    upKeys = ["q", "w", "e", "r", "u", "i", "o", "p"];
    downKeys = ["a", "s", "d", "f", "j", "k", "l", "\;"];
    middleKeysSteno = ["B", "D", "G", "-J", "L", "-N", "-V", "Z"];

    // move other fingers up or down
    if (downKeys.includes(keyDown) && !middleKeysSteno.includes(stenoKey)) {
      // ------------------------------ FINGERS, MOVE DOWN ------------------------------
      f[currentFinger].finger.classList.add("bottom-key");
      f[currentFinger].dot.classList.add("bottom-dot");

      if (currentFinger === "leftPointer") {
        sidePointer.style.transform = 'rotate(173deg) translate(2px, 3px) scaleY(0.9)';
        sidePointerTip.style.transform = 'rotate(209deg) translate(10px, -1px) scaleY(1)';
      }
    } else if (upKeys.includes(keyDown) && !middleKeysSteno.includes(stenoKey)) {
      // ------------------------------ FINGERS, MOVE UP ------------------------------
      f[currentFinger].finger.classList.add("top-key");
      f[currentFinger].dot.classList.add("top-dot");

      if (currentFinger === "leftPointer") {
        sidePointer.style.transform = 'rotate(159deg) translate(-6px, -2px) scaleY(1.1)';
        sidePointerTip.style.transform = 'rotate(170deg) translate(-15px, -2px)';
      }
    } else if (f[currentFinger]) {
      // console.log("middle keys"); // fingers stay in initial position
    } else {
      console.log("undefined key");
    }
  }
}


// change color of each key that is pressed
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
  "Control": "left-ctrl", " ": "space", "ArrowLeft": "arrows", "ArrowRight": "arrows",
  "ArrowUp": "arrows", "ArrowDown": "arrows", "Shift": "left-shift", "Control": "left-ctrl"
  }

  let currentIds = [], currentKey = "";

  // get ids of all pressed keys
  for (let i = 0; i < keysPressed.length; i++) {
    if (keyIds[keysPressed[i]]) {
      currentKey = document.getElementById("key\-" + keyIds[keysPressed[i]]); // non-letters
    } else if ((/[a-zA-Z]/).test(keysPressed[i])) {
      currentKey = document.getElementById("key\-" + keysPressed[i].toUpperCase()); // letters
    }
    currentKey.classList.add("pressed-key");
    currentIds.push(currentKey);
  }

  setTimeout(function() {
    for (let i = 0; i < currentIds.length; i++) {
      currentIds[i].classList.remove("pressed-key");
    }
  }, 200);
}


// generate steno order display
function generateStenoOrder() {
  let stenoOrder = "STKPWHRAO*EUFRPBLGTSDZ";
  let stenoOrderElement = document.getElementById("steno-order");

  for (let i = 0; i < stenoOrder.length; i++) {
    let currentElement = document.createElement("span");
    currentElement.innerHTML = stenoOrder[i];
    if (i < 12) { currentElement.id = "steno" + stenoOrder[i]; } // left-hand and vowel steno keys
    else { currentElement.id = "steno\-" + stenoOrder[i]; } // right-hand steno keys
    currentElement.classList.add("steno-order-letter");
    stenoOrderElement.appendChild(currentElement);
  }

  document.body.addEventListener("keydown", function() {
    let letters = document.getElementsByClassName("steno-order-letter");
    if (event.key === " ") {
      console.log("space");
      for (let i = 0; i < letters.length; i++) {
        letters[i].classList.remove("highlighted-steno");
      }
    }
  }, false);
}


function setStenoOrder(keys) {
  let stenoMap = {
    "q": "s", "a": "s", "w": "t", "s": "k", "e": "p", "d": "w", "r": "h",
    "f": "r", "t": "*", "g": "*", "y": "*", "h": "*", "u": "\-f", "j": "\-r",
    "i": "\-p", "k": "\-b", "o": "\-l", "l": "\-g", "p": "\-t", "\;": "\-s", "\[": "\-d",
    "'": "\-z", "c": "a", "v": "o", "n": "e", "m": "u"
  };
  // console.log("set" + keys);
  for (let i = 0; i < keys.length; i++) {
    // console.log(stenoMap[keys[i]]);
    if (!stenoMap[keys[i]]) { continue; }
    let currentLetter = document.getElementById("steno" + stenoMap[keys[i]].toUpperCase());
    if (currentLetter) { currentLetter.classList.add("highlighted-steno"); }
  }
}


// generate letters for user to type
function generatePracticeLetters(letters = [], start = 0, end = 10) {
  let practiceDiv = document.getElementById("practice");

  // clear the practice div if there are any letters in it
  if (practiceDiv.firstChild) {
    clearPracticeLetters();
  }

  getPracticeIndex(true, start);
  // console.log("start value is " + start);
  // console.log("(generatePracticeLetters) practice index is now " + getPracticeIndex());
  for (let i = start; i < end; i++) {
    let currentLetter = document.createElement("div");
    currentLetter.innerHTML = letters[i];
    currentLetter.classList.add("practice-letter");
    practiceDiv.appendChild(currentLetter);
  }
}


// remove all practice letters
function clearPracticeLetters() {
  let practiceDiv = document.getElementById("practice");
  while (practiceDiv.firstChild) {
    practiceDiv.removeChild(practiceDiv.firstChild);
  }
}


// compare user keystroke to practice letters
function compareToPractice(userKeystroke, dictionaryWord) {
  let practiceDiv = document.getElementById("practice");
  if (practiceDiv.firstChild) {
    let practiceLetters = practiceDiv.childNodes;
    let practiceLetter = practiceLetters[getPracticeIndex() % 10];
    // let practiceLetter = practiceDiv.firstChild;
    // console.log("now comparing " + userKeystroke + " to " + practiceLetter.innerHTML);
    // console.log("index: " + getPracticeIndex());
    // console.log("mod 10: " + getPracticeIndex() % 10);
    if (userKeystroke === practiceLetter.innerHTML || dictionaryWord === practiceLetter.innerHTML) {
      console.log("match!");
      getPracticeIndex(true, getPracticeIndex()+1);
      // practiceLetter.parentNode.removeChild(practiceLetter);

      if (practiceLetter != practiceDiv.lastChild) {
        practiceLetter.innerHTML = "";
        console.log("not last letter");
      } else if (getPracticeIndex() < getNextLesson().length) {
        console.log("generating new lesson, 10 more");
        clearPracticeLetters();
        generatePracticeLetters(getNextLesson(), getPracticeIndex(), Math.min(getPracticeIndex()+10, getNextLesson().length));
      } else {
        clearPracticeLetters();
        getPracticeIndex(true, 0);
        console.log("end of lesson");
      }

      // if (!practiceDiv.firstChild && (getPracticeIndex() < getNextLesson().length)) {
      //   console.log("generating new lesson, 10 more");
      //   generatePracticeLetters(getNextLesson(), getPracticeIndex(), Math.min(getPracticeIndex()+10, getNextLesson().length));
      // } else if (!practiceDiv.firstChild) {
      //   console.log("end of lesson");
      // }
    } else {
      console.log("not match...");
    }
  } else {
    console.log("out of letters");
  }
}


// get the next set of practice letters
let getNextLesson = (function(set = false, setValue = []) {
  let nextLesson = [];
  return function(setInner = set, setValueInner = setValue) {
    if (setInner) { nextLesson = setValueInner; }
    // console.log("(getNextLesson) nextLesson is " + nextLesson);
    return nextLesson;
  }
})();


// get the index for practice letters
let getPracticeIndex = (function(set = false, setValue = 0) {
  let practiceIndex = 0;
  return function(setInner = set, setValueInner = setValue) {
    if (setInner) {
      // console.log("setInner is true, setting to " + setValueInner);
      practiceIndex = setValueInner;
      if (practiceIndex >= getNextLesson().length) { return -1; }
     }
    // console.log("(getPracticeIndex) practiceIndex is " + practiceIndex);
    return practiceIndex;
  }
})();


// select item from lessons menu
function menuListener() {
  let items = document.querySelectorAll("#dropdown-content span");
  let narration = document.getElementById("narration");
  let index = 0;

  // lessons text
  // {text: "Tutorial", left: 35, top: 0, width: 300, highlight: false, highlightElement: null, extraCode, lesson}
  let narrationText = [
    {text: "Tutorial", left: 38, top: 0, width: 300, extraCode: "enterToContinue"},
    {text: "Welcome to Hatchling, a web app to help you get used to stenography \
      using " + '<a href="https://github.com/openstenoproject/plover/wiki/Installation-Guide#installation"\
       target="_blank">' + "Plover" + '</a>' + " or similar software.", left: 38, top: 115, width: 250},
    {text: "You may have noticed that this QWERTY keyboard has some unusual letters added to it.", left: 37, top: 115, width: 225,
    highlight: true, highlightElement: document.getElementById("keyboard")},
    {text: "These are steno machine letters overlaid on a typical keyboard.", left: 37, top: 115, width: 225},
    {text: "Stenography differs quite a bit from traditional typing, but it is still basically a process of quickly finding key positions.",
      left: 34, top: 115, width: 325},
    {text: "These lessons are designed to mimic typical qwerty keyboarding lessons. The early lessons work best without Plover or other steno software \
      activated (I will let you know when to turn your software on), and they should work with a normal (non n-key rollover) keyboard.",
      left: 3, top: 50, width: 200, highlight: true, highlightElement: document.getElementById("dropbtn")},
    {text: "This will hopefully help qwerty typists to build muscle memory for steno key positions in a way that is already familiar.",
      left: 3, top: 50, width: 200},
    {text: "Now that you have some background info, let's take a look at hand positions.", left: 70, top: 95, width: 200},
    {text: "For the home row placement, the ends of the fingertips are placed in the cracks between keys (see above).", left: 70, top: 95, width: 200,
    highlight: true, highlightElement: document.getElementById("side-view")},
    {text: "The thumbs are turned on their sides, also above cracks (see keyboard to left for a better view of this).", left: 70, top: 95, width: 200,
    highlight: true, highlightElement: document.getElementById("thumb-side")},
    {text: "Each finger can reach forward to press the top key...", left: 70, top: 95, width: 200,
    highlight: true, highlightElement: document.getElementById("finger-side-tip")},
    {text: "Notice the movement on the keyboard, as well -- the blue represents a very simplified fingertip.",
    left: 70, top: 95, width: 200, extraCode: "pointerForward"},
    {text: "Now, backwards movement.", left: 71, top: 95, width: 120, extraCode: "pointerBackward"},
    {text: "Let's try typing a word. Type either S key with your left pinky (qwerty Q or A). \
      Release each key after you type it, just like normal qwerty typing." + '<BR><BR>' + "\
      Next, type T (qwerty W) with your left ring finger." + '<BR><BR>' + "\
      Type A (qwerty C) by moving your left thumb a little to the left." + '<BR><BR>' + "\
      Last, move your RIGHT pointer down to R (qwerty J)." + '<BR><BR>' + "\
      You should see the word 'STAR' (not 'STRA') spelled out in the black highlights above the keyboard. If not, press SPACE and try again.",
      left: 30, top: 115, width: 550, highlight: true, highlightElement: document.getElementById("steno-order"),
      lesson: ["S", "T", "A", "-R"]},
    {text: "When you start doing full stenography on your keyboard, you will press all of those keys at the same time. \
      Give it a try, pressing the same keys you just used. You should see STAR again. Some non n-key-rollver keyboards \
      may not output this correctly, while others will be able to. If your keyboard is not able to, there is a workaround. \
      Press S. While still holding it, also press T, then release only S. Then press A while still holding T, and release \
      T while A is still pressed. Repeat this once more for A to R.",
      left: 20, top: 115, width: 800, extraCode: "clearPractice"},
    {text: "As you type, you will notice the hands above moving. Don't worry if your hand and finger angles don't match \
      or if your whole hands shift a bit to press keys - the hands here are a VERY simplified representation. \
      Just concentrate on placing your fingertips or thumb sides on the proper key or crack." + '<BR><BR>' + "\
      You can see a video of how steno actually \
      looks " + '<a href="https://www.youtube.com/watch?v=Il8DT_alCLk" target="_blank">' + "here" + '</a>' + ". \
      Note that the hands still stay close to the home row, but the hand movements are much more flexible.",
      left: 32, top: 115, width: 450},
    {text: "Hey, wait. Just what is this bar here, anyway? This is steno order. This is the order that keys are processed by a steno machine \
      or steno software in order to form a word.", left: 30, top: 35, width: 500,
      highlight: true, highlightElement: document.getElementById("steno-order")},
    {text: "The keys are processed from left to right and top to bottom. Left-finger keys precede vowel \
      keys in a word, and vowels precede right-finger keys. This is why you may have gotten 'STRA' \
      instead of 'STAR' if you accidentally typed a left-hand R in the exercise earlier", left: 30, top: 115, width: 500},
    {text: "A mnemonic for remembering steno order consonants: STicK PaW HeRe FoR Peanut Butter. LarGe ToeS DoZe (modified \
      from " + '<a href="https://github.com/openstenoproject/plover/wiki/Stenotype-Mnemonics-for-Beginners-(English)"\
       target="_blank">' + "here" + '</a>' + ")",
      left: 32, top: 115, width: 400},
    {text: "Don't worry if you don't remember everything yet or if it looks like you cannot possibly write words like 'water'. \
      These things will be reinforced and explained in the upcoming lessons.", left: 32, top: 115, width: 400},
    {text: "Type 'Enter' to go to the next lesson!", left: 40, top: 115, width: 150},
    {text: "Lesson 01: Pinkies", left: 38, top: 0, width: 300, extraCode: "enterToContinue"},
    {text: "The left pinky is in charge of the S keys. On a normal steno machine, the S's are combined into one big key. \
    You can use whichever S key you want. You can use the top S on some words, and the bottom S on other words.",
    left: 5, top: 80, width: 300, extraCode: "greenPinkies"},
    {text: "Give it a try. Type some S's with the top key, and some with the bottom.", left: 40, top: 115, width: 200,
    lesson: ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"]},
    {text: "The right pinky is in charge of four keys: -T, -S, -D, and -Z. Note that the right-hand letters are designated \
    with a dash. This is the case unless they are in a word like STAR -- in that case, only one R (the right one) can come after \
    A in steno order, so the dash is not necessary.", left: 70, top: 95, width: 300, extraCode: "greenPinkiesRight"},
    {text: "Try reaching your right pinky to each key. You may need to move more of your hand than just the pinky. That is okay -- do \
    whatever is comfortable. Just return to home position when you are done.",
    left: 70, top: 95, width: 300, lesson: ["-T", "-S", "-D", "-Z", "-T", "-S", "-D", "-Z"]},
    {text: "Now we will review all of the pinky keys. Remember that S is the left S, and -S is the right S.",
    left: 40, top: 115, width: 250, extraCode: "pinkyLessons"},
    {text: "Time for your first briefs! Briefs are abbreviations for longer words. So instead of typing out IS for 'is', \
    with your steno software you can just type S.", left: 38, top: 115, width: 300},
    {text: "Note that S, but not -S, is a brief. If you just type -S with your steno software on, it will likely output \"es\". This is \
    because you use -S to make words plural. It will add \"s\" or \"es\" to words, whichever is appropriate. Similarly, -Z will \
    also output \"s\" or \"es\" to make other words plural (such as those already ending in \"s\"). -D serves a similar purpose. It \
    adds \"ed\" to words to make them past tense.",
    left: 35, top: 115, width: 450},
    {text: "-T is another brief. If you type it, your steno software will output \"the\".", left: 40, top: 115, width: 150},
    {text: "Now we will practice some briefs and do a little bit of letter review, as well.", left: 40, top: 115, width: 250,
    extraCode: "pinkyLessonsBriefs"}
  ]

  // go to selected index
  function showNarration(lessonIndex) {
    // position narration box
    narration.innerHTML = narrationText[index].text;
    narration.style.left = narrationText[index].left + "\%";
    narration.style.top = narrationText[index].top + "\%";
    narration.style.width = narrationText[index].width + "px";

    // add highlights
    if (narrationText[index].highlight) {
      narrationText[index].highlightElement.classList.add("highlight-element");
    }

    // remove highlights
    if (index > 0 && narrationText[index-1].highlight) {
      console.log("removing highlight");
      narrationText[index - 1].highlightElement.classList.remove("highlight-element");
    }

    // call an additional function, if needed
    if (narrationText[index].extraCode) {
      extraCode(narrationText[index].extraCode);
    }

    // set letters for lesson
    if (narrationText[index].lesson) {
      getNextLesson(true, narrationText[index].lesson);
      getPracticeIndex(true, 0);
      generatePracticeLetters(getNextLesson(), 0, Math.min(getPracticeIndex()+10, getNextLesson().length));
      // generatePracticeLetters(getNextLesson());
    }

    // make sure narration box isn't still wiggling
    document.getElementById("narration").classList.remove("wiggle");
    console.log("wiggle removed");

    index++;;
  }

  // get starting indices of lessons
  let menuIndices = [];
  for (let i = 0; i < items.length; i++) {
    menuIndices.push(narrationText.findIndex(obj => obj.text === items[i].innerHTML));
  }

  // add event listener to each menu item
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function() {
      narration.hidden = false;
      document.getElementById("dropbtn").classList.remove("wiggle-big");
      console.log("clicked " + this.innerHTML);
      index = menuIndices[i];
      clearPracticeLetters();
      showNarration(index);
    }, false);
  }

  // get the next narration text, position, etc. to display when user hits enter
  document.body.addEventListener("keydown", nextText, false);
  function nextText() {
    if (event.key === "Enter" && (index < narrationText.length)) {
      if (menuIndices.includes(index)) {
        console.log("clearing");
        // clearPracticeLetters();
      } else {
        console.log("not clearing");
      }
      showNarration(index);
    }
  }
}


// extra functions to work with narration
function extraCode(whichFunction) {
  // let functionToCall = null;

  function makeLesson(lessonText) {
    // let lessonContent = [
    //   ["ab3", ["S", "-T"]],
    //   ["ab3", ["is", "the"]]
    // ]
    let mylesson = [];

    for (let i = 0; i < lessonText.length; i++) {
      mylesson = mylesson.concat(getLessonPattern(lessonText[i][0], lessonText[i][1]));
    }
    // let myarray1 = getLessonPattern("ab3", ["is", "the"]);
    // let myarray1 = getLessonPattern(lessonContent[0][0], lessonContent[0][1]);
    // let mylesson = myarray1;
    getNextLesson(true, mylesson);
    getPracticeIndex(true, 0);
    generatePracticeLetters(getNextLesson(), 0, Math.min(getPracticeIndex()+10, getNextLesson().length));
  }

  switch (whichFunction) {
    case ("enterToContinue"):
      let narration = document.getElementById("narration");

      setTimeout(function() {
        // if user hasn't already hit enter, prompt
        if (narration.innerHTML === "Tutorial" || narration.innerHTML === "Lesson 01: Pinkies") {
          narration.innerHTML = "type the ENTER key to continue";
        }
        if (narration.innerHTML === "type the ENTER key to continue") { narration.classList.add("wiggle"); }
        setTimeout(function() { narration.classList.remove("wiggle"); }, 7000)
      }, 1500);
    break;
    case ("pointerForward"):
      document.getElementById("finger-side-middle").style.transform = 'rotate(159deg) translate(-6px, -2px) scaleY(1.1)';
      document.getElementById("finger-side-tip").style.transform = 'rotate(170deg) translate(-15px, -2px)';
      document.getElementById("lp-fend").classList.remove("bottom-key");
      document.getElementById("lp-ftip").classList.remove("bottom-dot");
      document.getElementById("lp-fend").classList.add("top-key");
      document.getElementById("lp-ftip").classList.add("top-dot");
      break;
    case ("pointerBackward"):
      document.getElementById("finger-side-middle").style.transform = 'rotate(173deg) translate(2px, 3px) scaleY(0.9)';
      document.getElementById("finger-side-tip").style.transform = 'rotate(209deg) translate(10px, -1px) scaleY(1)';
      document.getElementById("lp-fend").classList.remove("top-key");
      document.getElementById("lp-ftip").classList.remove("top-dot");
      document.getElementById("lp-fend").classList.add("bottom-key");
      document.getElementById("lp-ftip").classList.add("bottom-dot");
      break;
    case ("clearPractice"):
      clearPracticeLetters();
      break;
    case ("greenPinkies"):
      document.getElementById("key-Q").classList.add("green-key");
      document.getElementById("key-A").classList.add("green-key");
      break;
    case ("greenPinkiesRight"):
      document.getElementById("key-Q").classList.remove("green-key");
      document.getElementById("key-A").classList.remove("green-key");
      document.getElementById("key-P").classList.add("green-key");
      document.getElementById("key-colon").classList.add("green-key");
      document.getElementById("key-lbrace").classList.add("green-key");
      document.getElementById("key-quote").classList.add("green-key");
      break;
    case ("pinkyLessons"):
      document.getElementById("key-Q").classList.add("green-key");
      document.getElementById("key-A").classList.add("green-key");

      // create practice content
      // let array1 = getLessonPattern("ab", ["S", "-S"]);
      // let array2 = getLessonPattern("ab2", ["-T", "-S"]);
      // let array3 = getLessonPattern("ab3", ["-D", "-Z"]);
      // let array4 = getLessonPattern("ab", ["-T", "-D"]);
      // let array5 = getLessonPattern("ab2", ["-S", "-Z"]);
      // let lesson = array1.concat(array2, array3, array4, array5);
      let pinkyContent = [
        ["ab", ["S", "-S"]],
        ["ab2", ["-T", "-S"]],
        ["ab3", ["-D", "-Z"]],
        ["ab", ["-T", "-D"]],
        ["ab2", ["-S", "-Z"]]
      ];
      makeLesson(pinkyContent);
      // getNextLesson(true, lesson);
      // getPracticeIndex(true, 0);
      // generatePracticeLetters(getNextLesson(), 0, Math.min(getPracticeIndex()+10, getNextLesson().length));
      break;
    case ("pinkyLessonsBriefs"):
      let lessonContent = [
        ["ab3", ["S", "-T"]],
        ["ab3", ["is", "the"]]
      ];
      // let mylesson = [];
      //
      // for (let i = 0; i < lessonContent.length; i++) {
      //   mylesson = mylesson.concat(getLessonPattern(lessonContent[i][0], lessonContent[i][1]));
      // }
      // let myarray1 = getLessonPattern("ab3", ["is", "the"]);
      // let myarray1 = getLessonPattern(lessonContent[0][0], lessonContent[0][1]);
      // let mylesson = myarray1;
      // getNextLesson(true, mylesson);
      // getPracticeIndex(true, 0);
      // generatePracticeLetters(getNextLesson(), 0, Math.min(getPracticeIndex()+10, getNextLesson().length));
      makeLesson(lessonContent);
      break;
    default:
      console.log("function not defined");
  }

  // functionToCall();
}


// follow pattern for current lesson, but replace with approriate keys
function getLessonPattern(pattern, letters) {
  let template = "";
  let finalPattern = "";
  let replacements = null;

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
    default:
      console.log("pattern not found");
  }

  finalPattern = template.replace(/[a-z]/g, m => replacements[m]);
  return finalPattern.split(" ");
}


// generate keyboard, hands, other elements
function generateElements() {
  generateKeyboard();
  generateRightHand();
  generateStenoOrder();
  getNextLesson(true, ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K",
  "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]);
  generatePracticeLetters(getNextLesson());
  menuListener();
  document.getElementById("dropbtn").classList.add("wiggle-big");
}
generateElements();
