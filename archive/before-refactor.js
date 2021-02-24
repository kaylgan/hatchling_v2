function generateKeyboard() {
  let topRow = ["\~", "\!", "\@", "\#", "\$", "\%", "\^", "\&", "\*", "\(", "\)", "\_", "\+", "Backspace"];
  let topRowNums = ["\`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "\-", "\=", ""];
  let topRowNames = ["tilde", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "zero", "minus", "equals", "backspace"];

  let alphabetTop = ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "\{" + " " + "\[", "\}" + '<br>' + "\]", "\|" + '<br>' + "\\"];
  let stenoTop = ["", "S", "T", "P", "H", "\*", "\*", "F", "P", "L", "T", "D", "", ""];
  let alphaTopNames = ["tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "lbrace", "rbrace", "backslash"];

  let alphabetMiddle = ["Caps Lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", "\:" + " " + "\;", "\"" + " " + "'", "Enter"];
  let stenoMiddle = ["", "S", "K", "W", "R", "\*", "\*", "R", "B", "G", "S", "Z", ""];
  let alphaMiddleNames = ["caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", "colon", "quote", "enter"];

  let alphabetBottom = ["Shift", "Z", "X", "C", "V", "B", "N", "M", "\<" + '<br>' + "\,", "\>" + '<br>' + "\.", "\?" + '<br>' + "\/", "Shift"];
  let stenoBottom = ["", "", "", "A", "O", "", "E", "U", "", "", "", ""];
  let alphaBottomNames = ["left-shift", "Z", "X", "C", "V", "B", "N", "M", "less-than", "greater-than", "question-mark", "right-shift"];

  let bottomRow = ["Ctrl", "Fn", "Alt", "Space", "Alt", "Ctrl", "Arrows"];
  let bottomRowNames = ["left-ctrl", "fn", "left-alt", "space", "right-alt", "right-ctrl", "arrows"];

  let keyboard = document.getElementById("keyboard");

  let qwertyRows = [topRow, alphabetTop, alphabetMiddle, alphabetBottom, bottomRow];
  let stenoRows = [topRowNums, stenoTop, stenoMiddle, stenoBottom];
  let qwertyNames = ["top-row", "alphabet-top", "alphabet-middle", "alphabet-bottom", "bottom-row"];
  let ids = [topRowNames, alphaTopNames, alphaMiddleNames, alphaBottomNames, bottomRowNames];
  qwertyRows.forEach(function(item, index) {
    console.log(qwertyNames[index]);
    let currentRow = document.createElement("div");
    currentRow.id = qwertyNames[index];
    currentRow.classList.add("container");
    keyboard.appendChild(currentRow);

    for (let i = 0; i < item.length; i++) {
      let element = document.createElement("div");
      element.innerHTML = '<span class="grayed">' + item[i] + '</span>' + '<br>';

      if (stenoRows[index] && stenoRows[index][i] == "\^") {
        element.innerHTML += '<span class="placeholder">' + stenoRows[index][i] + '</span>';
      } else if (stenoRows[index] && currentRow.id == "top-row") {
        element.innerHTML += stenoRows[index][i];
      } else if (stenoRows[index]) {
        element.innerHTML += '<span class="steno">' + stenoRows[index][i] + '</span>';
      }

      element.id = "key-" + ids[index][i];
      console.log(element.id);
      element.classList.add("key");
      currentRow.appendChild(element);
    }
  });

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
generateKeyboard();

let getLastKey = (function(set = false, setValue = "") {
  let lastKey = "";
  return function(setInner = set, setValueInner = setValue) {
    if (setInner) { lastKey = setValueInner; }
    console.log("lastKey is " + lastKey);
    return lastKey;
  }
})();

function generateRightHand() {
  let leftHand = document.getElementById("left-hand");
  let rightHand = leftHand.cloneNode(true);
  rightHand.style.transform = 'scaleX(-1) translate(64px, 12px) rotate(5deg)';
  rightHand.id = "right-hand";

  let rightChildren = rightHand.childNodes;
  // console.log(rightChildren.length);

  function changeChildIds(nodes) {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id) {
        nodes[i].id = nodes[i].id.replace("left", "right");
        if (nodes[i].id[0] === "l") {
          nodes[i].id = "r" + nodes[i].id.substring(1);
        }
        console.log(nodes[i].id);
      } else {
        // nodes[i].id = "right " + levelNumber + i;
        // console.log(nodes[i].id);
        console.log("no id for node " + i);
      }

      if (nodes[i].firstChild) {
        changeChildIds(nodes[i].childNodes);
      }
    }
  }

  changeChildIds(rightChildren);

  leftHand.after(rightHand);
  document.getElementById("right-thumb").style.transform = 'rotate(31deg) translate(-10px, 1px)';
}
generateRightHand();

function listenForKeys() {
  // console.log("in listenForKeys");
  let keyMap = {};
  let keysPressed = [];

  function getAllKeysPressed() {
    for (let key in keyMap) {
      if (!keyMap[key]) {
        // console.log("adding " + key);
        if (keysPressed.includes(key)) {
          //console.log("duplicate");
        }
        else {
          // console.log("unique");
          keysPressed.push(key);
        }
      } else {
        return []; // don't process array if any keys still pressed
      }
    }
    // console.log("keys: " + keysPressed);
    let sortedKeys = keysPressed.sort();
    keysPressed = [];
    keyMap = {};
    // console.log("sorted");
    // console.log(sortedKeys);
    let keyStroke = determineKeystroke(sortedKeys);
    // getLastKey(true, determineKeystroke(sortedKeys));
    getLastKey(true, keyStroke);
    // positionHand(sortedKeys);
    positionHand(sortedKeys, keyStroke);
    return sortedKeys;
  }

  function trackKeysDown(e) {
    // console.log("key down");
    keyMap[e.key] = true;
    e.preventDefault();
    // console.log(keyMap);
    return;
  }

  function trackKeysUp(e) {
    // console.log("key up");
    keyMap[e.key] = false;
    e.preventDefault();
    // console.log(keyMap);
    getAllKeysPressed();
    return;
  }

  document.body.focus();
  document.body.addEventListener("keydown", trackKeysDown, false);
  document.body.addEventListener("keyup", trackKeysUp, false);
}
listenForKeys();

function determineKeystroke(keyArray) {
  let arrayToString = "";
  for (let i = 0; i < keyArray.length; i++) {
    arrayToString += keyArray[i];
  }
  console.log(arrayToString);

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
    "iklo": "\-j"
  }

  let length = arrayToString.length;
  if (length >= 4) {
    // console.log(">= 4");
    if (fourPlusKeyMap[arrayToString]) { return fourPlusKeyMap[arrayToString].toUpperCase(); }
    else { console.log("no element mapped to that key combo"); }
  } else if (length === 3) {
    // console.log("just 3");
    if (threeKeyMap[arrayToString]) { return threeKeyMap[arrayToString].toUpperCase(); }
    else { console.log("no element mapped to that key combo"); }
  } else if (length === 2) {
    // console.log("only 2");
    if (twoKeyMap[arrayToString]) { return twoKeyMap[arrayToString].toUpperCase(); }
    else { console.log("no element mapped to that key combo"); }
  } else if (length === 1) {
    // console.log("single key");
    if (stenoMap[arrayToString]) { return stenoMap[arrayToString].toUpperCase(); }
    else { console.log("no element mapped to that key combo"); }
  } else {
    console.log("zero length");
  }
  return "";
}

function positionHand(keysPressed, stenoKey) {
  console.log("in pH: " + keysPressed + "," + stenoKey);

  // let thumb = document.getElementById("left-thumb");
  let sidePointer = document.getElementById("finger-side-middle");
  let sidePointerTip = document.getElementById("finger-side-tip");
  let sideThumb = document.getElementById("thumb-side");

  let fingerKeys = {
    "leftPinky": {keys: ["q", "a"], finger: document.getElementById("lpi-fend"), dot: document.getElementById("lpi-ftip")},
    "leftRing": {keys: ["w", "s"], finger: document.getElementById("lr-fend"), dot: document.getElementById("lr-ftip")},
    "leftMiddle": {keys: ["e", "d"], finger: document.getElementById("lm-fend"), dot: document.getElementById("lm-ftip")},
    "leftPointer": {keys: ["r", "f", "t", "g"], finger: document.getElementById("lp-fend"), dot: document.getElementById("lp-ftip")},
    "leftThumb": {keys: ["c", "v"], finger: document.getElementById("left-thumb")},
    "rightThumb": {keys: ["n", "m"], finger: document.getElementById("right-thumb")},
    "rightPointer": {keys: ["y", "h", "u", "j"], finger: document.getElementById("rp-fend"), dot: document.getElementById("rp-ftip")},
    "rightMiddle": {keys: ["i", "k"], finger: document.getElementById("rm-fend"), dot: document.getElementById("rm-ftip")},
    "rightRing": {keys: ["o", "l"], finger: document.getElementById("rr-fend"), dot: document.getElementById("rr-ftip")},
    "rightPinky": {keys: ["p", "\;", "\[", "\'"], finger: document.getElementById("rpi-fend"), dot: document.getElementById("rpi-ftip")},
    "rightRotatedPinky": {keys: ["\[", "\'"], finger: document.getElementById("rpi-rotated-fend"), dot: document.getElementById("rpi-rotated-ftip")}
  }

  function clearKeys() {
    for (let key in fingerKeys) {
      if (key === "leftThumb") {
        fingerKeys["leftThumb"].finger.style.transform = 'rotate(35deg) translate(0, 0)';
      } else if (key === "rightThumb") {
        fingerKeys["rightThumb"].finger.style.transform = 'rotate(31deg) translate(-10px, 1px)';
      } else {
        fingerKeys[key].finger.classList.remove("top-key");
        fingerKeys[key].dot.classList.remove("top-dot");
        fingerKeys[key].finger.classList.remove("bottom-key");
        fingerKeys[key].dot.classList.remove("bottom-dot");
        sidePointer.style.transform = 'rotate(172deg) translate(0, 0) scaleY(1)';
        sidePointerTip.style.transform = 'rotate(182deg) translate(0, 0) scaleY(1)';
      }
    }
    document.getElementById("right-rotated-pinky").hidden = true;
    document.getElementById("right-pinky").hidden = false;
    fingerKeys["rightRotatedPinky"].dot.classList.remove("bottom-pinky-dot");
    document.getElementById("right-pointer").classList.remove("just-asterisk");
    document.getElementById("right-pointer").classList.remove("asterisk");
    fingerKeys["rightPointer"].dot.classList.remove("bottom-pointer-dot");
    document.getElementById("right-middle").classList.remove("asterisk");
    document.getElementById("right-ring").classList.remove("asterisk");
    document.getElementById("right-pinky").classList.remove("asterisk");

    document.getElementById("left-pointer").classList.remove("just-asterisk");
    fingerKeys["leftPointer"].dot.classList.remove("bottom-pointer-dot");
    document.getElementById("left-middle").classList.remove("asterisk");
    document.getElementById("left-ring").classList.remove("asterisk");
    document.getElementById("left-pinky").classList.remove("asterisk");
  }
  clearKeys();

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key].keys.includes(value));
  }

  for (let i = 0; i < keysPressed.length; i++) {
    if (stenoKey === "S" && keysPressed.length === 2) {
      moveFinger("z", "leftPinky"); // avoid conflict from two left "S" steno keys
      break;
    } else if (keysPressed.includes("c") && keysPressed.includes("v")) {
      moveFinger("x", "leftThumb"); // process a c/v thumb press. no associated steno key.
      break;
    }
    console.log("keyValue: " + getKeyByValue(fingerKeys, keysPressed[i]));
    moveFinger(keysPressed[i], getKeyByValue(fingerKeys, keysPressed[i]));
  }

  function moveFinger(keyDown, currentFinger) {
    upKeys = ["q", "w", "e", "r", "u", "i", "o", "p"];
    downKeys = ["a", "s", "d", "f", "j", "k", "l", "\;"];
    leftKeys = ["y", "h"];
    rightKeys = ["t", "g", "\[", "\'"];

    middleKeysSteno = ["B", "D", "G", "-J", "L", "-N", "-V", "Z"];

    if (currentFinger === "leftThumb" || currentFinger === "rightThumb") {
      // move thumb
      if (keyDown === "c") {
        fingerKeys["leftThumb"].finger.style.transform = 'rotate(20deg) translate(-22px, 4px)';
      } else if (keyDown === "v") {
        fingerKeys["leftThumb"].finger.style.transform = 'rotate(35deg) translate(15px, -5px)';
      } else if (keyDown === "x") {
        console.log("middle thumb");
        fingerKeys["leftThumb"].finger.style.transform = 'rotate(35deg) translate(0, 0)';
      } else if (stenoKey === "I") {
        fingerKeys["rightThumb"].finger.style.transform = 'rotate(31deg) translate(-10px, 1px)';
      } else if (keyDown === "n") {
        fingerKeys["rightThumb"].finger.style.transform = 'rotate(35deg) translate(10px, -10px)';
      } else if (keyDown === "m") {
        fingerKeys["rightThumb"].finger.style.transform = 'rotate(15deg) translate(-30px, 4px)';
      }
    } else if (rightKeys.includes(keyDown)) {
      console.log("RIGHT KEY");
      if (keyDown === "\[") {
        document.getElementById("right-rotated-pinky").hidden = false;
        document.getElementById("right-pinky").hidden = true;
        fingerKeys["rightRotatedPinky"].finger.classList.add("top-key");
        fingerKeys["rightRotatedPinky"].dot.classList.add("top-dot");
      } else if (keyDown === "\'") {
        document.getElementById("right-rotated-pinky").hidden = false;
        document.getElementById("right-pinky").hidden = true;
        fingerKeys["rightRotatedPinky"].finger.classList.add("bottom-key");
        fingerKeys["rightRotatedPinky"].dot.classList.add("bottom-pinky-dot");
      } else if (keyDown === "t" || keyDown === "g") {
        document.getElementById("left-pointer").classList.add("just-asterisk");
        document.getElementById("left-middle").classList.add("asterisk");
        document.getElementById("left-ring").classList.add("asterisk");
        document.getElementById("left-pinky").classList.add("asterisk");
        if (keyDown === "t") {
          fingerKeys["leftPointer"].finger.classList.add("top-key");
          fingerKeys["leftPointer"].dot.classList.add("top-dot");
        } else {
          fingerKeys["leftPointer"].finger.classList.add("bottom-key");
          fingerKeys["leftPointer"].dot.classList.add("bottom-pointer-dot");
        }
      }
    } else if (leftKeys.includes(keyDown)) {
      console.log("LEFT KEY");
      let rightPointer = document.getElementById("right-pointer");
      if (stenoKey === "\-V") {
        rightPointer.classList.add("asterisk");
        fingerKeys["rightPointer"].finger.classList.add("top-key");
        fingerKeys["rightPointer"].dot.classList.add("top-dot");
      } else if (keyDown === "y") {
        rightPointer.classList.add("just-asterisk");
        fingerKeys["rightPointer"].finger.classList.add("top-key");
        fingerKeys["rightPointer"].dot.classList.add("top-dot");
      } else if (keyDown === "h") {
        rightPointer.classList.add("just-asterisk");
        fingerKeys["rightPointer"].finger.classList.add("bottom-key");
        fingerKeys["rightPointer"].dot.classList.add("bottom-pointer-dot");
      }
      document.getElementById("right-middle").classList.add("asterisk");
      document.getElementById("right-ring").classList.add("asterisk");
      document.getElementById("right-pinky").classList.add("asterisk");

    } else if (downKeys.includes(keyDown) && !middleKeysSteno.includes(stenoKey)) {
      // move non-thumb fingers
      console.log("down");
      fingerKeys[currentFinger].finger.classList.add("bottom-key");
      fingerKeys[currentFinger].dot.classList.add("bottom-dot");
      fingerKeys[currentFinger].finger.classList.remove("top-key");
      fingerKeys[currentFinger].dot.classList.remove("top-dot");
      // console.log(fingerKeys[currentFinger].finger.classList);

      if (currentFinger === "leftPointer") {
        sidePointer.style.transform = 'rotate(173deg) translate(2px, 3px) scaleY(0.9)';
        sidePointer.style.borderRightStyle = 'dashed';
        sidePointerTip.style.transform = 'rotate(209deg) translate(10px, -1px) scaleY(1)';
      }
    } else if (upKeys.includes(keyDown) && !middleKeysSteno.includes(stenoKey)) {
      console.log("up");
      fingerKeys[currentFinger].finger.classList.add("top-key");
      fingerKeys[currentFinger].dot.classList.add("top-dot");
      fingerKeys[currentFinger].finger.classList.remove("bottom-key");
      fingerKeys[currentFinger].dot.classList.remove("bottom-dot");
      // console.log(fingerKeys[currentFinger].finger.classList);

      if (currentFinger === "leftPointer") {
        sidePointer.style.transform = 'rotate(159deg) translate(-6px, -2px) scaleY(1.1)';
        sidePointerTip.style.transform = 'rotate(170deg) translate(-15px, -2px)';
      }
    } else if (fingerKeys[currentFinger]) {
      fingerKeys[currentFinger].finger.classList.remove("top-key");
      fingerKeys[currentFinger].dot.classList.remove("top-dot");
      fingerKeys[currentFinger].finger.classList.remove("bottom-key");
      fingerKeys[currentFinger].dot.classList.remove("bottom-dot");
      sidePointer.style.transform = 'rotate(172deg) translate(0, 0) scaleY(1)';
      sidePointerTip.style.transform = 'rotate(182deg) translate(0, 0) scaleY(1)';
    } else {
      console.log("undefined key");
    }
  }
}
