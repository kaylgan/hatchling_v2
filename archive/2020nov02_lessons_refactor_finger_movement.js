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
  // document.getElementById("right-thumb").style.transform = 'rotate(31deg) translate(-10px, 1px)';
  document.getElementById("right-thumb").classList.add("adjustment");
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
      // pressKeys(sortedKeys); // show Enter key pressed on keyboard
    } else {
      getLastKey(true, keyStroke); // update last key pressed
      positionHand(sortedKeys, keyStroke);
      pressKeys(keysPressed);
      if (word) { clearStenoOrder(); } // reset steno order so only word is displayed
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

  // map of chords used in lessons
  let oneKey = {
    "a": "is", "q": "is", "p": "the", "m": "you", "w": "it", "s": "can", "k": "be",
    "d": "with", "r": "had", "f": "are", "u": "of", "j": "are"
  };
  let twoKeys = {
    "av": "so", "qv": "so", "sw": "did", "\;m": "us", "vw": "to", "sv": "could",
    "\;w": "it's", "\;c": "as", "cp": "at", "de": "about", "ik": "an", "ew": "if",
    "kl": "being", "ks": "can be", "ow": "it'll", "\'w": "it has", "lw": "-ing it",
    "dn": "we", "dv": "would", "al": "something", "lq": "something", "im": "up",
    "fr": "will", "ju": "ever", "uv": "off", "af": "have", "fs": "consider",
    "rs": "ch", "iu": "-ch", "nu": "every", "al": "something", "ql": "something",
    "ak": "somebody", "kq": "somebody", "\;a": "SS", "\;q": "SS", "cu": "after",
    "nr": "he", "rw": "this", "jm": "you're", "jv": "or", "dr": "when",
    "df": "were", "dj": "where"
  };
  let threeKeys = {
    "acp": "sat", "qcp": "sat", "anp": "set", "npq": "set", "\[av": "sod",
    "\[qv": "sod", "anv": "sow", "nqv": "sow", "acn": "sea", "cnq": "sea",
    "acm": "saw", "cmq": "saw", "fpv": "rot", "\[fv": "rod", "ikr": "\-",
    "cmn": "a", "lmw": "tug", "mpv": "out", "mno": "ill", "cmo": "all", "\[ac": "sad",
    "\[cq": "sad", "svw": "do", "aes": "and", "eqs": "and", "\[ow": "it would",
    "klw": "it can", "dvw": "two", "ikv": "on", "dmn": "which", "dno": "well",
    "\;no": "else", "ivw": "top", "cvw": "too", "ekv": "possible", "erw": "in",
    "dfs": "why", "jnu": "every", "adf": "somewhere", "dfq": "somewhere", "cju": "after-",
    "mrv": "how", "nrw": "they", "jrw": "there", "frw": "there", "anr": "she", "nqr": "she", "\;fr": "also",
    "enr": "me", "jnr": "her", "jmv": "our", "jno": "early", "jnv": "other", "crw": "that",
    "cio": "am", "cdr": "what", "drv": "who", "ejw": "for", "efw": "from", "cru": "half", "clw": "tag",
    "\'an": "says", "\'nq": "says", "\[an": "said", "\[nq": "said", "ain": "cep", "inq": "cep"
  }
  let fourPlusKeys = {
    "acjw": "star", "cjqw": "star", "\;acjw": "stars", "\;cjqw": "stars", "cmpv": "out-",
    "\[acjw": "starred", "\[cjqw": "starred", "amnp": "sit", "mnpq": "sit", "\;amnp": "sits",
    "\;mnpq": "sits", "\'\[am": "suds", "\'\[mq": "suds", "acmn": "say", "cmnq": "say",
    "\[acnv": "seed", "\[cnqv": "seed", "acmnpv": "sight", "cmnpqv": "sight",
    "acmpv": "suit", "cmpqv": "suit", "amnv": "soy", "mnqv": "soy", "acpv": "soot",
    "cpqv": "soot", "cfpv": "root", "\[fnv": "rode", "\[cfv": "road", "acnv": "see", "cnqv": "see",
    "\;fpv": "rots", "\'\[fv": "rods", "eiow": "\.", "dkls": "\,", "\'\[cnqv": "seeds",
    "\'\[acnv": "seeds", "cmnv": "eye", "cmos": "call", "cmnos": "kale", "lmnsw": "dig",
    "cmnosvw": "dial", "acjlw": "starring", "cjlqw": "starring", "alnp": "setting",
    "lnpq": "setting", "clmos": "calling", "\[lmns": "kidding", "lsvw": "dog",
    "\[acmn": "said", "\[cmnq": "said", "\;cmv": "use", "\'cmv": "use", "cmnsw": "day",
    "\[nosv": "cold", "\'\[mv": "outside", "\[acl": "sagged", "\;mnp": "its", "cmnow": "tail",
    "cnow": "tale", "\[mnp": "it'd", "cmnov": "I'll", "acmnw": "stay", "cmnqw": "stay",
    "\[acmnv": "sighed", "\[cmnqv": "sighed", "\;dls": "\"", "\;fls": "\"", "aclmnps": "skating",
    "clmnpqs": "skating", "dios": "\?", "eklw": "\!", "\;cmnv": "ice", "\[cmos": "called",
    "desw": "go", "aemns": "and I", "aeps": "and the","aems": "and you", "aces": "and a", "aeklmns": "and I can",
    "emnqs": "and I", "epqs": "and the","emqs": "and you", "ceqs": "and a", "eklmnqs": "and I can",
    "cdenv": "bee", "\;cdw": "it was", "cdiknpw": "it wasn't", "\[klw": "it could", "aiov": "some", "ioqv": "some",
    "\[cdesvw": "good", "ceinov": "people", "iknov": "only", "cdikp": "want", "cimnovw": "time", "demp": "but",
    "demn": "by", "cdmn": "way", "cklmnw": "take", "\;cdem": "because", "\'cdem": "because", "cdikp": "want",
    "iosv": "come", "cdekl": "back", "denpsw": "get", "depsw": "get", "dikm": "one", "cdemnv": "buy", "ciknv": "even",
    "\;akln": "section", "\;klnq": "section", "aeiklv": "sponge", "eiklqv": "sponge", "\;acdemnv": "entice",
    "\;cdemnqv": "entice", "ainop": "cement", "inopq": "cement", "acdeklp": "intact", "cdeklpq": "intact",
    "imno": "im\-", "cimnov": "I'm", "jlnu": "everything", "djnu": "everywhere", "jknu": "everybody", "\[jnu": "everyday",
    "ijknu": "everyone", "acmnsw": "someday", "cmnqsw": "someday", "aeikr": "someone", "eikqr": "someone", "acimnovw": "sometime",
    "cimnoqvw": "sometime", "aemrv": "somehow", "emqrv": "somehow", "\;acefmnr": "someplace", "\;cefmnqr": "someplace",
    "emrvw": "now", "cfklrv": "look", "imnor": "him", "\;mnr": "his", "\'mnr": "his", "cfiov": "room", "ceikrvw": "noon",
    "enrvw": "know", "delsw": "going", "cervw": "into", "dfjmsv": "your", "\;mrv": "house", "mnrw": "think", "jnrw": "they're",
    "cjmnrw": "their", "\;aklv": "socks", "\;klqv": "socks", "demnsuw": "give", "djklv": "work", "adfmpsu": "just", "emnr": "my",
    "epruv": "most", "\'nrw": "these", "\;ejmnw": "first", "\;cfpsuw": "drafts", "emnrw": "any", "inorw": "them", "jnuv": "over",
    "iknrw": "then", "cikrw": "than", "cjmu": "over-", "\[adfmnsv": "joyed", "ejnrvw": "another", "cdfjnsv": "year", "\;acjpw": "starts",
    "\;cjpqw": "starts", "eprvw": "not", "cfklmnrv": "like", "emrw": "new", "cdfhjns": "area", "cdfgjns": "area", "ceklmnr": "make", "ervw": "no",
    "\;cklmns": "cakes", "ceikr": "man", "ajvw": "store", "jqvw": "store", "cejlmpw": "forgot", "ejlpvw": "forget", "\;iklmnrw": "things",
    "cemnprvw": "night", "diknp": "went", "ikmn": "in-", "\[cdj": "ward", "cmnsu": "cave", "ejmpw": "further", "\;crw": "that is", "cjrw": "that are",
    "crtu": "1/2", "cruy": "1/2", "jkmr": "hush", "\;efkln": "precious", "cdekn": "baby", "ciju": "amp", "cijou": "ample", "fnoru": "level",
    "cmprw": "thought", "cepry": "math", "ceprt": "math", "fnopruv": "a lot of", "inpstw": "depth", "inpswy": "depth", "cdehmnv": "bye",
    "cdemnvy": "bye", "cdkln": "weak", "fnpru": "left", "dehmn": "bi-", "degmn": "bi-", "cfpru": "last", "cdklnv": "week",
    "\[adjknu": "swerved", "\[djknqu": "swerved", "fnsuvw": "drove", "\[cijk": "around", "jkmsu": "curve", "eiklmnrt": "mink",
    "eihklmnr": "mink", "cmnp": "ate", "dfklnsv": "yolk", "cfgiklsw": "drank", "cfhiklsw": "drank", "ehlmnor": "milk", "elmnort": "milk",
    "\;cejmpsv": "computers", "eikrsv": "common", "\[klnps": "connected", "\[cdmnsvw": "divide", "acdjnv": "severe", "cdjnqv": "severe",
    "ceijkru": "march", "ikmsvw": "down", "cmor": "hall", "fijklmoru": "lunch", "\;fikmr": "lunch", "fijkmru": "lurch", "deijknu": "bench",
    "\;ckl": "axe", "\;chkl": "action", "\;cgkl": "action", "\;cklt": "action", "fiklmr": "lung", "fiklmor": "lunge", "deiklmn": "bing",
    "degiklmn": "binge", "ainps": "concept", "inpqs": "concept", "\;amsw": "discuss", "\;mqsw": "discuss", "aceklmnr": "mistake", "ceklmnqr": "mistake",
    "deiknsw": "again", "fosv": "control", "imopsvw": "document", "fklmnrs": "click", "jnovw": "tutorial", "\;fiknruv": "lessons",
    "\;fiknruy": "lessons", "\;fiknrtu": "lessons", "ceikmrv": "menu", "\[acjpw": "started", "\[cjpqw": "started"
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
      f[key].finger.classList.remove("top-key", "bottom-key", "thumb-c", "thumb-v", "thumb-n", "thumb-m");
      f[key].dot.classList.remove("top-dot", "bottom-dot", "bottom-pointer-dot", "bottom-pinky-dot");
      f[key].full.classList.remove("just-asterisk", "asterisk", "asterisk-reverse", "left-pinky-Z");
    }

    // remove any specialized movements
    // f["leftThumb"].finger.style.transform = 'rotate(35deg) translate(0, 0)';
    // f["leftThumb"].finger.classList.remove("thumb-c");
    // f["leftThumb"].finger.classList.remove("thumb-v");
    // f["rightThumb"].finger.style.transform = 'rotate(31deg) translate(-10px, 1px)';
    // f["leftPinky"].full.classList.remove("left-pinky-Z");
    // f["rightPinky"].full.classList.remove("asterisk-reverse");
    sidePointer.style.transform = 'rotate(172deg) translate(0, 0) scaleY(1)';
    sidePointerTip.style.transform = 'rotate(182deg) translate(0, 0) scaleY(1)';

    f["rightRotatedPinky"].full.hidden = true;
    f["rightPinky"].full.hidden = false;

    // f["rightRotatedPinky"].dot.classList.remove("bottom-pinky-dot");
    // f["rightPointer"].dot.classList.remove("bottom-pointer-dot");
    // f["leftPointer"].dot.classList.remove("bottom-pointer-dot");
  }
  clearKeys();

  // get the finger associated with a pressed key; key-value pair from map (finger: key pressed, etc.)
  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key].keys.includes(value));
  }

  // process keys that have a conflict, e.g. duplicate steno key
  let keyPairs = {
    "\;": "p",
    "\[": "\'",
    "\'": "\;",
    "a": "q",
    "c": "v",
    "d": "e",
    "f": "r",
    "g": "f",
    "h": "j",
    "i": "k",
    "j": "u",
    "l": "o",
    "m": "n",
    "p": "\[",
    "r": "t",
    "s": "w",
    "u": "y"
  }

  for (let i = 0; i < keysPressed.length; i++) {
    // if a finger pressed multiple keys, only move it once
    if (Object.keys(keyPairs).includes(keysPressed[i]) && keysPressed.includes(keyPairs[keysPressed[i]])) {
      console.log("skipping " + keysPressed[i] + ", found both in keyPairs");
      if (!stenoKey) {
        stenoKey = "middles";
      }
      // if (keysPressed.includes("a") && keysPressed.includes("q")) {
      //   moveFinger("q", "leftPinky"); // avoid conflict from two left "S" steno keys
      // // } else if (keysPressed.includes("c") && keysPressed.includes("v")) {
      // //   moveFinger("x", "leftThumb"); // process a c/v thumb press. no associated steno key.
      // } else if (keysPressed.includes("r") && keysPressed.includes("t")) {
      //   stenoKey = "H*"; // r/t pointer press, no associated steno key
      //   moveFinger("t", "leftPointer");
      // } else if (keysPressed.includes("f") && keysPressed.includes("g")) {
      //   stenoKey = "R*"; // f/g pointer press, no associated steno key
      //   moveFinger("g", "leftPointer");
      // } else if (keysPressed.includes("h") && keysPressed.includes("j")) {
      //   stenoKey = "*R-"; // h/j pointer press, no associated steno key
      //   moveFinger("h", "rightPointer");
      // } else if (keysPressed.includes("p") && keysPressed.includes("\[")) {
      //   stenoKey = "-TD"; // p/[ pinky press, no associated steno key
      //   moveFinger("\[", "rightPinky");
      // } else if (keysPressed.includes("\;") && keysPressed.includes("\'")) {
      //   stenoKey = "-SZ"; // p/[ pinky press, no associated steno key
      //   moveFinger("\'", "rightPinky");
      // }
    } else {
      moveFinger(keysPressed[i], getKeyByValue(f, keysPressed[i]));
    }



    // moveFinger(keysPressed[i], getKeyByValue(f, keysPressed[i]));
  }

  // move each finger to the proper key
  function moveFinger(keyDown, currentFinger, middle = false) {
    let fingerClasses = {
      "c": "thumb-c",
      "v": "thumb-v"
    }
    if (fingerClasses[keyDown]) {
      f[currentFinger].finger.classList.add(fingerClasses[keyDown]);
    }

    if (stenoKey === "middles") {
      f[currentFinger].finger.classList.remove("thumb-c", "thumb-v", "thumb-n", "thumb-m");
    }


    console.log("moving " + keyDown);
    // move finger in correct direction/angle
    switch (keyDown) {
      // ---------- THUMBS ----------
      // case ("c"):
        // f[currentFinger].finger.style.transform = 'rotate(20deg) translate(-22px, 4px)';
        // f[currentFinger].finger.classList.add("thumb-c");
        // break;
      // case ("v"):
      //   if (stenoKey === "middles") {
      //     f[currentFinger].finger.classList.remove("thumb-c", "thumb-v");
      //   }
      //   else {
      //     // f[currentFinger].finger.style.transform = 'rotate(35deg) translate(15px, -5px)';
      //     f[currentFinger].finger.classList.add("thumb-v");
      //   }
      //   break;
      case ("n"):
        if (stenoKey === "middles") {
          // f[currentFinger].finger.style.transform = 'rotate(31deg) translate(-10px, 1px)';
          f[currentFinger].finger.classList.remove("thumb-n", "thumb-m");
        }
        else {
          // f[currentFinger].finger.style.transform = 'rotate(35deg) translate(10px, -10px)';
          f[currentFinger].finger.classList.add("thumb-n");
        }
        break;
      case ("m"):
        // f[currentFinger].finger.style.transform = 'rotate(15deg) translate(-30px, 4px)';
        f[currentFinger].finger.classList.add("thumb-m");
        break;

      // ---------- RIGHT PINKY ----------
      case ("\["):
        if (stenoKey === "-TD") {
          f["rightPinky"].finger.classList.add("top-key");
          f["rightPinky"].dot.classList.add("top-dot");
          f["rightPinky"].full.classList.add("asterisk-reverse");
        }
        else {
          f["rightPinky"].full.hidden = true;
          f["rightRotatedPinky"].full.hidden = false;
          f["rightRotatedPinky"].finger.classList.add("top-key");
          f["rightRotatedPinky"].dot.classList.add("top-dot");
        }
        break;
      case ("\'"):
        if (stenoKey === "-SZ") {
          f["rightPinky"].finger.classList.add("bottom-key");
          f["rightPinky"].dot.classList.add("bottom-dot");
          f["rightPinky"].full.classList.add("asterisk-reverse");
        } else {
          f["rightPinky"].full.hidden = true;
          f["rightRotatedPinky"].full.hidden = false;
          f["rightRotatedPinky"].finger.classList.add("bottom-key");
          f["rightRotatedPinky"].dot.classList.add("bottom-pinky-dot");
        }
        break;

      // ---------- LEFT POINTER ----------
      case ("t"):
        // f["leftPointer"].full.classList.add("just-asterisk");
        f["leftMiddle"].full.classList.add("asterisk");
        f["leftRing"].full.classList.add("asterisk");
        f["leftPinky"].full.classList.add("asterisk");
        f["leftPointer"].finger.classList.add("top-key");
        f["leftPointer"].dot.classList.add("top-dot");
        if (stenoKey === "H*") { f["leftPointer"].full.classList.add("asterisk"); }
        else { f["leftPointer"].full.classList.add("just-asterisk"); }
        if (stenoKey === "Z") {
          f["leftPinky"].full.classList.add("left-pinky-Z")
          f["leftPinky"].finger.classList.add("top-key");
          f["leftPinky"].dot.classList.add("top-dot");
        }
        break;
      case ("g"):
        // f["leftPointer"].full.classList.add("just-asterisk");
        f["leftMiddle"].full.classList.add("asterisk");
        f["leftRing"].full.classList.add("asterisk");
        f["leftPinky"].full.classList.add("asterisk");
        f["leftPointer"].finger.classList.add("bottom-key");
        f["leftPointer"].dot.classList.add("bottom-pointer-dot");
        if (stenoKey === "R*") { f["leftPointer"].full.classList.add("asterisk"); }
        else { f["leftPointer"].full.classList.add("just-asterisk"); }
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
        // f["rightPointer"].full.classList.add("just-asterisk");
        f["rightPointer"].finger.classList.add("bottom-key");
        f["rightPointer"].dot.classList.add("bottom-pointer-dot");
        if (stenoKey === "*R-") { f["rightPointer"].full.classList.add("asterisk"); }
        else { f["rightPointer"].full.classList.add("just-asterisk"); }
        break;
      default:
        // console.log("default");
    }

    upKeys = ["q", "w", "e", "r", "u", "i", "o", "p"];
    downKeys = ["a", "s", "d", "f", "j", "k", "l", "\;"];
    middleKeysSteno = ["B", "D", "G", "-J", "L", "-N", "-V", "Z", "middles"];
    middleKeyStenoFirsts = {
      "B": ""
    }

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
      // if (middleKeysSteno.includes(stenoKey))
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
    if (event.key === " ") { clearStenoOrder(); }
  }, false);
}


// remove highlights from all letters in steno order
function clearStenoOrder() {
  let letters = document.getElementsByClassName("steno-order-letter");
  for (let i = 0; i < letters.length; i++) {
    letters[i].classList.remove("highlighted-steno");
  }
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
  console.log("start " + start + " end " + end);
  let practiceDiv = document.getElementById("practice");

  // clear the practice div if there are any letters in it
  if (practiceDiv.firstChild) {
    clearPracticeLetters();
  }

  getPracticeIndex(true, start);

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

    let practiceLetter = null;
    if (practiceLetters.length < getNextLesson().length) {
      practiceLetter = practiceLetters[getPracticeIndex() % 10];
    } else {
      practiceLetter = practiceLetters[getPracticeIndex()];
    }

    // repeat or restart lesson if user types S-S
    if (dictionaryWord === "SS") {
      clearPracticeLetters();
      getPracticeIndex(true, 0);
      generatePracticeLetters(getNextLesson(), 0, Math.min(getPracticeIndex()+10, getNextLesson().length));
    }

    if (userKeystroke === practiceLetter.innerHTML || dictionaryWord.toLowerCase() === practiceLetter.innerHTML.toLowerCase()) {
      console.log("match!");
      getPracticeIndex(true, getPracticeIndex()+1);
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
        generatePracticeLetters(["Type S-S to repeat exercise, or press ENTER to continue"], 0, 1);
      }
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
  let vocabBox = document.getElementById("vocabBox");
  let index = 0;

  let lessonTitleTop = 10, lessonTitleWidth = 300;

  // lessons text
  // {text: "Tutorial", left: 35, top: 0, width: 300, highlight: false, highlightElement: null, extraCode, lesson}
  let narrationText = [
    {text: document.getElementById("tutorial").innerHTML, top: lessonTitleTop, width: lessonTitleWidth, extraCode: "enterToContinue"},
    {text: "Welcome to Hatchling, a web app to help you get used to stenography \
      using " + '<a href="https://github.com/openstenoproject/plover/wiki/Installation-Guide#installation"\
       target="_blank">' + "Plover" + '</a>' + " or similar software."},
    {text: "You may have noticed that this QWERTY keyboard has some unusual letters added to it.",
    highlight: true, highlightElement: document.getElementById("keyboard")},
    {text: "These are steno machine letters overlaid on a typical keyboard."},
    {text: "Stenography differs quite a bit from traditional typing, but it is still basically a process of quickly finding key positions."},
    {text: "These lessons are designed to mimic typical qwerty keyboarding lessons. The lessons work best without Plover or other steno software \
      turned on, and they should work with most normal (non n-key rollover) keyboards.",
      left: 72, width: 300, top: 5, highlight: true, highlightElement: document.getElementById("nav-lessons")},
    {text: "This will hopefully help qwerty typists to build muscle memory for steno key positions in a way that is already familiar.",
      left: 72, width: 300, top: 5},
    {text: "Now that you have some background info, let's take a look at hand positions.", extraCode: "showSideView"},
    {text: "For the home row placement, the ends of the fingertips are placed in the cracks between keys (see above).",
    highlight: true, highlightElement: document.getElementById("side-view")},
    {text: "The thumbs are turned on their sides, also above cracks (see keyboard to left for a better view of this).",
    highlight: true, highlightElement: document.getElementById("thumb-side"), extraCode: "adjustThumb"},
    {text: "Each finger can reach forward to press the top key...",
    highlight: true, highlightElement: document.getElementById("finger-side-tip"), extraCode: "readjustThumb"},
    {text: "Notice the movement on the keyboard, as well -- the teal represents a very simplified fingertip. \
    The grayish circles represent a general area of contact on the key.",
    extraCode: "pointerForward"},
    {text: "Now, backwards movement.", extraCode: "pointerBackward"},
    {text: "Let's try typing a word. Type either S key with your left pinky (qwerty Q or A). \
      Release each key after you type it, just like normal qwerty typing." + '<br><br>' + "\
      Next, type T (qwerty W) with your left ring finger." + '<br>' +"\
      Type A (qwerty C) by moving your left thumb a little to the left." + '<br>' + "\
      Last, move your RIGHT pointer down to R (qwerty J).",
      width: 600, lesson: ["S", "T", "A", "-R"]},
    {text: "When you start doing full stenography on your keyboard, you will press all of those keys at the same time. \
      Give it a try, pressing the same keys you just used. You should STAR (not STRA) spelled out in the black highlights \
      above the keyboard. If not, press SPACE and try again. If you are sure you are pressing the right keys, but you are not \
      seeing STAR, press ENTER.", highlight: true, highlightElement: document.getElementById("steno-order"),
      lesson: ["star"],
      extraCode: "clearPractice"},
    {text: "Some non n-key-rollver keyboards \
      may not output STAR correctly, while others will be able to. If your keyboard is not able to, there is a workaround. \
      Press S. While still holding it, also press T, then release only S. Then press A while still holding T, and release \
      T while A is still pressed. Repeat this once more for A to R. This is much slower than pressing all the keys at once, \
      but it works well enough until you are ready to get an n-key-rollover keyboard.", lesson: ["star", "star", "star", "star"]},
    {text: "As you type, you will notice the hands above moving. Don't worry if your hand and finger angles don't match \
      or if your whole hands shift a bit to press keys - the hands here are a VERY simplified representation. \
      Just concentrate on placing your fingertips or thumb sides on the proper key or crack." + '<br><br>' + "\
      You can see a video of how keyboard stenography actually \
      looks " + '<a href="https://www.youtube.com/watch?v=Il8DT_alCLk" target="_blank">' + "here" + '</a>' + ". \
      Notice that the hands still stay close to the home position, but the hand movements are much more flexible.", width: 750},
    {text: "Hey, wait... Just what is this bar here, anyway? This shows steno order. This is the order that keys are processed by steno software \
      in order to form a word.", top: lessonTitleTop,
      highlight: true, highlightElement: document.getElementById("steno-order")},
    {text: "The keys are processed from left to right and top to bottom. Left-finger keys precede vowel \
      keys in a word, and vowels precede right-finger keys. This is why you may have gotten 'STRA' \
      instead of 'STAR' if you accidentally typed a left-hand R in the exercise earlier"},
    {text: "A mnemonic for remembering steno order consonants: STicK PaW HeRe FoR Peanut Butter. LarGe ToeS DoZe (modified \
      from " + '<a href="https://github.com/openstenoproject/plover/wiki/Stenotype-Mnemonics-for-Beginners-(English)"\
       target="_blank">' + "here" + '</a>' + ")"},
    {text: "Don't worry if you don't remember everything yet or if it looks like you cannot possibly write words like 'water'. \
      These things will be reinforced and explained in the upcoming lessons."},
    {text: "Type 'Enter' to go to the next lesson!"},
    {text: document.getElementById("lesson1").innerHTML, top: lessonTitleTop, width: lessonTitleWidth, extraCode: "enterToContinue"},
    {text: "The left pinky is in charge of the S keys. On a normal steno machine, the S's are combined into one big key. \
    You can use whichever S key you want. You can use the top S on some words, and the bottom S on other words.",
    left: 5, top: 80, width: 300, extraCode: "greenPinkies"},
    {text: "Give it a try. Type some S's with the top key, and some with the bottom. At the end of the typing exercise, you can type S-S \
    to repeat the exercise. This means press a left-pinky S and a right-pinky S at the same time. You can also use this key combination to restart \
    an exercise at any point. You can also skip any lesson by hitting Enter.", left: 32, top: 115, width: 400,
    lesson: ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"]},
    {text: "The right pinky is in charge of four keys: -T, -S, -D, and -Z. Note that the right-hand letters are designated \
    with a dash. This is the case unless they are in a word like STAR -- in that case, only one R (the right one) can come after \
    A in steno order, so the dash is not necessary. Left-hand letters are occasionally designated with a dash afterwards (S-), especially \
    if they are followed by a right-hand letter but no vowel.", left: 70, top: 95, width: 300, extraCode: "greenPinkiesRight"},
    {text: "Try reaching your right pinky to each key. You may need to move more of your hand than just the pinky. That is okay -- do \
    whatever is comfortable. Just return to home position when you are done.",
    left: 70, top: 95, width: 300, lesson: ["-T", "-S", "-D", "-Z", "-T", "-S", "-D", "-Z"]},
    {text: "Now we will review all of the pinky keys. Remember that S is the left S, and -S is the right S.",
    left: 40, top: 115, width: 250, extraCode: "pinkyLessons"},
    {text: "Time for your first briefs! Briefs are abbreviations for longer words. So instead of typing out IS for 'is', \
    with your steno software you can just type S.", left: 38, top: 115, width: 300, vocab: ["is: S"]},
    {text: "Note that S, but not -S, is a brief. If you just type -S with your steno software on, it will likely output \"es\". This is \
    because you use -S to make words plural. It will add \"s\" or \"es\" to words, whichever is appropriate. Similarly, -Z will \
    also output \"s\" or \"es\" to make other words plural (such as those already ending in \"s\"). -D serves a similar purpose. It \
    adds \"ed\" to words to make them past tense. You can use these suffixes with a word you type, or right after. E.g. STARS (all in \
    one movement, or \"chord\") and STAR\/-S (two chords, separated by the forward slash -- press S,T,A,R together, release keys, then press -S) both output \"stars\".",
    left: 24, top: 105, width: 725},
    {text: "-T is another brief. If you type it, your steno software will output \"the\".", vocab: ["the: -T"], left: 40, top: 115, width: 200},
    {text: "Now we will practice some briefs and do a little bit of letter review as well.", left: 38, top: 115, width: 275,
    extraCode: "pinkyLessonsBriefs"},
    {text: "And, for extra credit ... You haven't been formally introduced to all of these letters, but you have typed them if you \
    did the tutorial. Give these a try.", left: 40, top: 115, width: 250, vocab: ["star: STAR", "stars: STARS", "(or STAR\\-S)", "starred: STARD", "(or STAR\\-D)"],
    lesson: ["S", "T", "A", "-R", "star", "stars", "starred"]},
    {text: document.getElementById("lesson2").innerHTML,  top: lessonTitleTop, width: lessonTitleWidth},
    {text: "This lesson will focus on vowels. When you press a vowel key by itself, you get the short vowel sounds, such as in \
    sat, set, sit, sod, and suds. Where is the I key, you ask? There isn't one. Instead, you press the E and U keys together.",
    left: 35, top: 115, width: 400},
    {text: "Let's practice these short vowels. To write suds, use the chord SUDZ (do you remember that -Z is sometimes used for plurals? \
    -Z comes after -D in steno order, so words ending in \"d\" are often made plural this way, as are words ending in -S). Remember, if your keyboard doesn't output the \
    correct letters when they are pressed all at once, press the first key, then press the second while still holding the first, \
    then release the first key while still holding the second. And so forth for each pair of keys.", left: 32, top: 115, width: 500,
    vocab: ["sat: SAT", "set: SET", "sit: SEUT", "sod: SOD", "suds: SUDZ"], extraCode: "shortVowels"},
    {text: "Now we will look at long vowel sounds, such as in say, seed, sight, sow (like sow seeds), and suit. To form these, press the \
    letter key for the vowel, then add in all the thumb keys of the opposite thumb. So long A is AEU, long E is AOE, long I is AOEU, and \
    long U is AOU. Long O is the only exception -- you will press OE to make a long O sound.", left: 34, top: 115, width: 450},
    {text: "We will learn more about why O doesn't follow the rules soon. For now, let's practice the long vowel \
    sounds." + '<br><br>' + "If you are using a non n-key rollover keyboard, you may experience difficulties outputting these words \
    (if you weren't having issues already). This is because the vowel keys are close together on the keyboard and in the same row, \
    so they are more likely to have conflicts. So to repeat the workaround technique once more for the word \"seed\": \
    Press S, press A without releasing S. Release S. Without releasing A, press O. Release A. And so on for O to E, E to D.",
    left: 28, top: 105, width: 600, vocab: ["say: SAEU", "seed: SAOED", "sight: SAOEUT", "sow: SOE", "suds: SUDZ"], extraCode: "longVowels"},
    {text: "We will revisit that pesky O now. The chord that should be a long O, OEU, is instead reserved for \"oy\" sounds, like \
    in soy. We have another set of keys, AO, for \"oo\", like in soot. However, AO is also used to distinguish between homophones. \
    Rode is ROED, while road is RAOD. Similarly, AE is used for words like see (SAOE) and sea (SAE). Other combos are AU, used for \
    aw-sounds like in saw (SAU), and OU, used for ow-sounds like in out (OUT).",
    left: 34, top: 110, width: 450},
    {text: "Let's try it out. We will do some r words even though we haven't officially used r yet. Use the left-hand r. \
    Note that for words beginning with out- the prefix AOUT is used, rather than the chord OUT. This helps keep words together \
    - e.g. outset instead of out set. (This is known as a word boundary error.) When we practice prefixes and suffixes in these lessons, \
    they will usually be broken up into strokes. That is, you will see \"out-\" and \"set\" for \"outset\" instead of just \"outset\".",
    left: 36, top: 115, width: 350, affix: ["AOUT: out-"],
    vocab: ["soy: SOEU", "soot: SAOT", "rode: ROED", "road: RAOD", "sea: SAE", "see: SAOE", "saw: SAU", "out: OUT", "outset: AOUT/SET"], extraCode: "oVowels"},
    {text: "One last note -- words or syllables that have just one vowel are spelled using that vowel, even if that sound could be represented by other vowels. \
    Even though saw and rot have the same \"ah\" vowel sound, saw is SAU, but rot is ROT (not RAUT).",
    left: 34, top: 115, width: 450,
    vocab: ["rot: ROT", "rots: ROTS", "rod: ROD", "rods: RODZ"],
    lesson: ["rot", "rots", "rod", "rods", "rod", "road", "rode", "rod", "rode", "road"]},
    {text: document.getElementById("sentences1").innerHTML,  top: lessonTitleTop, width: lessonTitleWidth, },
    {text: "We will learn a little bit of punctuation now. We haven't met all of these keys yet, but we will get better \
    acquainted with them later. These are all single chords. The hyphen between letters is for clarity, for left-hand keys not followed by a vowel.", left: 34, top: 115, width: 400,
    vocab: ["period: TP-PL", "comma: KW-BG", "hyphen: H-PB"]},
    {text: "You won't have to worry about typing spaces. Steno software adds them automatically.",
    left: 40, top: 115, width: 250},
    {text: "EU SAEU KW-BG -T SAOE H-PB SAU EU ROED S- SO STARD TP-PL",
    left: 30, top: 115, width: 550, vocab: ["I: EU", "so: SO"],
    lesson: ("I say , the see - saw I rode is so starred .").split(" "), full: true},
    {text: "U SET -T SOD TP-PL U SEUT TP-PL U SOE SAOEDZ TP-PL", left: 40, top: 115, width: 200,
    vocab: ["you: U"],
    lesson: ("You set the sod . You sit . You sow seeds .").split(" "), full: true},
    {text: "EU SAOE U SAU -T SAE SUDZ TP-PL", left: 40, top: 115, width: 200, lesson: ("I see you saw the sea suds .").split(" "),
    full: true},
    {text: "-T AOEU SAU AEU SAOEUT H-PB RODZ ROED -T RAOD TP-PL", left: 40, top: 115, width: 200, vocab: ["a: AEU", "(the word, not the letter)", "eye: AOEU"],
    lesson: ("The eye saw a sight - rods rode the road .").split(" "),
    full: true},
    {text: "-T SAOT SEUTS KW-BG -T RAOT ROTS TP-PL", left: 40, top: 115, width: 200, vocab: ["root: RAOT"], lesson: ("The soot sits , the root rots .").split(" "),
    full: true},
    {text: "-T SOEU SAOUT S- AEU SAOEUT TP-PL", left: 40, top: 115, width: 200, lesson: ("The soy suit is a sight .").split(" "), full: true},
    {text: document.getElementById("lesson3").innerHTML, top: lessonTitleTop, width: lessonTitleWidth,
    extraCode: "clearGreenPinkies"},
    {text: "The left ring finger is in charge of T and K. Stenography is phonetic, so any words starting with a \"k\" \
    sound will use the K key -- e.g. call and cat. By pressing T and K together, we get the letter D.", left: 32, top: 110, width: 400,
    vocab: ["it: T", "can: K", "did: TK"], extraCode: "leftRing"},
    {text: "For the right ring finger, we have -L and -G. G is also used to add -ing to the ends of words. -LG is used for words \
    that end in -lge. This is not phonetic (-lge sounds like -lj), but it is used so that the -L and -J keys are not in conflict (more \
    on this when we get to the middle finger keys).", left: 30, top: 110, width: 500,
    affix: ["-ing: -G", "-LG: -lge"], vocab: ["call: KAUL", "kale: KAEUL", "tug: TUG", "dig: TKEUG", "tile: TAOEUL", "dial: TKAOEUL", "starring: STARG (or STAR\-G)"],
    extraCode: "rightRing"},
    {text: "Now we will learn a technique for writing words called inversion. Every once in a while, you can bend the application of steno order \
    just a teensy bit so you can fit a word into one chord. If two letters are adjacent in a chord, but are out of steno order, you can swap \
    their order. For instance, if we wanted to write \"setting\", we would use SETG. This doesn't follow steno order, though, so we cannot type \
    this. What we can do is invert the T and G to get SEGT, and use this to write \"setting\". When we invert ending strokes like this, it is sometimes \
    called \"folding in\" the ending.", left: 36, top: 115, width: 300, vocab: ["setting: SEGT", "calling: KAULG", "kidding: KEUGD"],
    lesson: ["setting", "starring", "calling", "kidding", "setting", "kidding", "calling", "kidding", "setting", "setting"]},
    {text: "Try reading this steno outline. You haven't learned all of these words yet, but you should be able to figure out most of them (except KO, \
    which is the brief for \"could\"). Hit enter to see and practice the answer." + '<br><br>' + "\
    -T TKOG SAEUD TO US T- KO AOUS AEU TKAEU OUT TP-PL", left: 30, top: 110, width: 550},
    {text: "Note that \"use\" can be written either phonetically (AOUZ) or based on spelling (AOUS)." + '<br><br>' + "\
    -T TKOG SAEUD TO US T- KO AOUZ AEU TKAEU OUT TP-PL", left: 30, top: 110, width: 550,
    vocab: ["dog: TKOG", "said: SAEUD", "(recall that say was SAEU)", "to: TO", "us: US", "could: KO", "use: AOUZ or AOUS", "day: TKAEU"],
    lesson: ("The dog said to us it could use a day out .").split(" "), full: true},
    {text: "T-S AS KOELD AS AOEUS OUDZ TP-PL", left: 40, top: 115, width: 300,
    vocab: ["it's: T-S", "as: AS", "cold: KOELD", "ice: AOEUS", "outside: OUDZ"],
    lesson: ("It's as cold as ice outside .").split(" ")},
    {text: "AE is used to distinguish between the homophones in this sentence. Tale has an E in it and tail does not, \
    so tale is the one that is mapped to AE.)", left: 40, top: 115, width: 300,
    vocab: ["sagged: SAGD", "its: EUTS", "tail: TAEUL", "at: AT", "sad: SAD", "tale: TAEL"],
    lesson: ("The dog sagged its tail at the sad tale .").split(" "), full: true},
    {text: "ITo type -TD, place your pinky on the crack between -T and -D.", left: 40, top: 115, width: 300,
    vocab: ["it'd: EUTD", "ill: EUL", "I'll: AOEUL", "stay: STAEU", "sighed: SAOEUD", "opening quotation mark: KW-GS", "closing quotation mark: KR-GS"],
    lesson: ("\" It'd set us ill . I'll stay \, \" the dog sighed .").split(" "), full: true},
    {text: "All: AUL | Skating: SKAEUGT | ?: KW-PL | !: TP-BG", left: 40, top: 115, width: 300,
    vocab: ["all: AUL", "do: DO", "skating: SKAEUGT", "called: KAULD", "question mark: KW-PL", "exclamation point: TP-BG"],
    lesson: ("\" See all the ice ? I'll do skating ! \" the dog called .").split(" "), full: true},
    {text: document.getElementById("lesson4").innerHTML, top: lessonTitleTop, width: lessonTitleWidth},
    {text: "Moving on to the middle finger keys, we have P and W for the left hand. Pressed together, the P and W keys produce B.",
    left: 40, top: 115, width: 300,
    affix: ["be-: PWE"], vocab: ["about: PW", "with: W", "bee: PWAOE"],
    extraCode: "leftMiddle"},
    {text: "Now that we have the P key, we can write the brief for and, SKP (all left keys). We can combine this with other keys to make many short phrases. \
    The vocab list shows a handful of examples.",
    left: 40, top: 115, width: 300,
    vocab: ["and: SKP", "and the: SKP-T", "and you: SKPU", "and I: SKPEU", "and a: SKPA", "and I can: SKPEUBG"],
    lesson: ["and", "and I", "and you", "and a", "and the", "and I can"]},
    {text: "We can make some similar phrases using it.", left: 40, top: 115, width: 300,
    vocab: ["it was: TWAS", "it wasn't: TWAEPBT", "it would: T-LD", "it can: T-BG", "it could: T-BGD", "it'll: T-L", "it has: T-Z", "-ing it: T-G"],
    lesson: ["it was", "it wasn't", "it would", "it can", "it could", "it'll", "it has", "see", "-ing it"]},
    {text: "For the right hand, we have -P, -B, and -N when they are pressed together.",
    left: 40, top: 115, width: 300,
    vocab: ["an: -N", "be: -B", "being: -BG", "can be: K-B"],
    extraCode: "rightMiddle"},
    {text: "The middle fingers are also used in typing a few other new letters. For the left hand, TP is F and TKPB is G. \
    For the right hand, -PL is -M, -BG is -K, -BGS is -X (think -KS to help you remember this), and -PBLG is -J.",
    left: 40, top: 115, width: 300,
    vocab: ["if: TP", "go: TKPB", "examine: KP", "request: KW"],
    extraCode: "middleLetters"},
    {text: "Time to practice some more sentences.", left: 40, top: 115, width: 300,
    vocab: ["some: SOPL", "good: TKPWAOD", "people: PAOEPL", "only: OEPBL", "want: WAPBT", "time: TAOEUPL"],
    lesson: "Some good people only want time .".split(" ")},
    {text: "PWUT KW-BG PWEU -T WAEU KW-BG WE WO TAEUBG TWO BAUS (or BAUZ) WE WAPBT TO TP-PL",
    left: 40, top: 115, width: 300,
    vocab: ["but: PWUT", "by: PWEU", "way: WAEU", "we: WE", "would: WO", "take: TAEUBG", "two: TWO", "because: BAUS or BAUZ"],
    lesson: "But , by the way , we would take two because we want to .".split(" "), full: true},
    {text: "KOPL OPB PWABG SKP TKPWET WUPB TP-PL",
    vocab: ["come: KOPL", "on: OPB", "back: PWABG", "get: TKPWET or TKPW-T", "one: WUPB"],
    left: 40, top: 115, width: 300, lesson: "Come on back and get one .".split(" ")},
    {text: "WEU WO U PWAOEU KW-PL WEU WO -B TKPWAOD KW-PL", left: 40, top: 115, width: 300,
    vocab: ["which: WEU", "buy: PWAOEU"],
    lesson: "Which would you buy ? Which would be good ?".split(" "), full: true},
    {text: "WEL KW-BG S- T- AOEPB S-G U WAPBT KW-BG SKP S-G ELS UP OPB TOP TAO KW-BG", left: 40, top: 115, width: 300,
    vocab: ["well: WEL", "even: AOEPB", "something: S-G", "else: ELS", "up: UP", "top: TOP", "too: TAO"],
    lesson: "Well , is it even something you want ? And something else up on top too ?".split(" "), full: true},
    {text: "Here are a few new prefixes and suffixes.", left: 40, top: 115, width: 300,
    affix: ["-shun: -GS", "-kshun: -BGS", "-ment: -PLT", "-nge: -PBG", "im-: EUPL", "ent-/int-: SPW"],
    vocab: ["station: STAEUGS", "section: SEBGS", "cement: SEPLT or SAOEPLT", "sponge: SPOPBG", "possible: POB", "impossible: EUPL/POB",
    "I'm: AOEUPL", "entice: SPWAOEUS", "intact: SPWABGT"],
    extraCode: "middleAffixes"},
    {text: document.getElementById("lesson5").innerHTML, top: lessonTitleTop, width: lessonTitleWidth},
    {text: "For our last pair of fingers, we will finally introduce those bizarre asterisks in the middle of the keyboard.",},
    {text: " On a steno machine, there is just one long key for the asterisk, kind of like the left S key. Normally, the right index finger is in charge of the \
    asterisk. However, it is acceptable to use whichever index finger feels suitable for the word you are trying to write."},
    {text: "The asterisk allows you to delete the last stroke that was output. It also is used to distinguish between homophones or chords that have the same keys. \
    We will not be doing any deleting in these lessons, but we will use the asterisk to distinguish chords."},
    {text: "First, let's take a look at the other letters for the index fingers. The left index finger controls the H and R keys. Combined, these \
    produce L.",
    vocab: ["H: had", "R: are", "L: will"], extraCode: "leftPointer"},
    {text: "The right pointer presses the -F key and the -R key. -RF does not produce a letter, but it is a brief for \"every\". You can produce related briefs \
    by adding letters such as -G and -N.",
    vocab: ["-F: of", "OF: off", "-R: are (same as R-)", "-FR: ever", "EFR: every", "EFRG: everything", "WEFR: everywhere", "EFRB: everybody", "EFRD: everyday", "EFRPB: everyone"],
    extraCode: "rightPointer"},
    {text: "We can form some \"some\" words similarly.",
    vocab: ["something: S-G (s+ing)", "somewhere: SWR", "somebody: S-B", "someday: STKAEU (s+day)", "someone: SPHPB (smn)", "sometime: STAOEUPL (stime)", "somehow: SPHOU (smou)",
    "someplace: SPHRAEUS (s+place)"], extraCode: "someWords"},
    {text: "Some other letters that the pointers produce are Z (S*), N (TPH), M (PH), Y (KWR), J (SKWR), C (KR), and V (SR), as well as the \
    ch-sound (KH). The righthand ch sound is produced using -FP. There is just one more letter for the right hand, V (*F). In some cases where \
    there is no conflict, just the -F can be used in place of *F.",
    vocab: ["N: in", "Y: why", "V: have", "C: consider"], extraCode: "pointerLetters"},
    {text: "Now we will work on some sentences with some more new briefs."},
    {text: "TPHOU KW-GB HRAOBG AF HEUPL TP-PL HE S- TPH HEUS (or HEUZ) RAOPL TH AFR/TPHAOPB.", affix: ["AFR: -after"], vocab: ["AF: after", "afternoon: AFR/TPHAOPB", "afternoon (brief): AFPB"],
    lesson: ("Now , look after him . He is in his room this after- noon .").split(" "), full: true},
    {text: "TKO U TPHOE HOW UR TKPW-G TPHAO KWROUR HOUS KW-PL", lesson: ("Do you know how you're going into your house ?").split(" "), full: true},
    {text: "THE THEU THER TKPW-G OUT THR- TPH THAEUR SOBGS", lesson: ("They think they're going out there in their socks .").split(" "), full: true},
    {text: "HR SHE HR-S TKPWEUF PHE HER WORBG KW-BG OR HR SHE SKWRUFT TKPWEUF PHE PHEU WORBG KW-PL (-st: -FT and *S | You can use -F in place of -S \
    in words that have an -S before the end, such as JUFT (just), MOFT (most), and MAFK (mask). Sometimes you will need to use *S, like for LIFT (lift) \
    and L*IS , list.)", lesson: ("Will she also give me her work , or will she just give me my work ?").split(" "), full: true},
    {text: "PHOFT -F THEZ R OUR TPEURS TKRAFTS TP-PL", lesson: ("Most of these are our first drafts .").split(" "), full: true},
    {text: "HOU R TPHEU -F THEPL ERL (or ER/HREU) KW-PL", lesson: ("How are any of them early ?").split(" "), full: true},
    {text: "S- T- OEFR KW-BG THEPB KW-BG OER THAPB THA KW-PL EU APL AUFR/SKWROEUD TP-BG", lesson: ("Is it over , then , other than that ? I am over- joyed !").split(" "), full: true},
    {text: "WHA F- WH TPHOER KWRAOER STARTS KW-BG TH KWRA*ER S- TPHOT HRAOEUBG TPHU KW-PL", lesson: ("What if when another year starts , this area is not like new ?").split(" "), full: true},
    {text: "WHO HR PHAEUBG TPHO KAEUBGS KW-PL", lesson: ("Who will make no cakes ?").split(" "), full: true},
    {text: "TH S- TPHOT TP-R -T PHAPB TPR- -T STOR KW-BG WHO TPAURGT THA EU TPORGT THEUPBGS TP-PL (TPAUR is the prefix for-. TPOR is used to \
    differentiate \ forgot and forget. Also notice that \"for\" is F-R, and \"from\" is FR-, so they use the same R as if they were written out in full.)",
    lesson: ("This is not for the man from the store , who forgot that I forget things .").split(" "), full: true},
    {text: "THAS AUL THAR THR TP-PL", lesson: ["That is", "all", "that are", "there", "."], full: true},
    {text: "TPH-T TPHAOEUT KW-BG SHE WEPBT EUPB/WARD KW-BG TPURT TPHAOT -T KAEUF TP-PL", lesson: ("In the night , she went in- ward , further into the cave .").split(" "), full: true},
    {text: "EU SR TO SR-T WUPB THA S- HAF OF TP-PL SAOE KW-PL -T TAG SEZ HA*F OF TP-PL", lesson: ("I have to have the one that is half off . See ? The tag says 1/2 off .").split(" "), full: true},
    {text: "We are nearly done with the lesson. Let's just look at a few more prefixes and suffixes."},
    {text: "HURB KW-BG PRERBS PWAEB TP-PL (-sh: -RB | -shus: -RBS | baby can also be written out as PWAEU/PWEU)", lesson: ("Hush , precious baby .").split(" "), full: true},
    {text: "-T AFRP (or APL/*P) HREFL S- AFRPL (or APL/*PL) TP-PL (mp: -*PL or -FRP. -FRP allows us to write -mple just by adding an -L, -FRPL. \
    Notice that *PL was used for \"ample\", and amp was distinguished by writing just *P. A*PL is used to write \"a.m.\")",
    lesson: ("The amp level is ample .").split(" "), full: true},
    {text: "EU THAUT PHA*T H- HROEFLT TK*EPT (-th: *T | a lot: HROELT | a lot of: HROEFLT) ", lesson: (["I", "thought", "math", "had", "a lot of", "depth", "."]), full: true},
    {text: "HE SED PWAO*EU TO HEUS WAEBG HREFT PW*EU/SEP HRAFT WAOEBG TP-PL (bi-: PW*EU | Notice that weak, which is spelled with an AE, \
    uses the AE disambiguator. We used SAEUD for \"said\" before. Now we will use the brief, SED)", lesson: ("He said bye to his weak left bi- cep last week .").split(" "), full: true},
    {text: "HE SWEFRBD AS HE TKROEF ARPBD -T KUFRB TP-PL (-rve: -FRB)", lesson: ("He swerved as he drove around the curve .").split(" "), full: true},
    {text: "-T PH*EUPBG AEUT -T KWROEBG SKP TKRA*PBG -T PH*EULG TP-PL (-nk: *PBG | -lk: *LG  We can't use -LK because the -L in -BLG breaks up the -K chord \
    Also note that yolk is spelled phonetically, like \"yoke\")", lesson: ("The mink ate the yolk and drank the milk .").split(" "), full: true},
    {text: "W-R WR- -T KPAOURTS TPH -T KPHOPB RAOPL KEBGTD TP-PL (con- and com-: K-)", lesson: ("Where were the computers in the common room connected ?").split(" "), full: true},
    {text: "EU PHAFRPB TKOUPB -T HAUL TO HRUFRPBLG (or HRUPBS) KW-BG THEPB HRUFRPB TO -T PWEFRPB TP-PL (-rch: -FRPB | -nch: -FRPB, unless there is a conflict \
    like lunch vs lurch. The -rch word is given the -FRPB ending, and -nch becomes -FRPBLG.)", lesson: ("I march down the hall to lunch , then lurch to the bench .").split(" "), full: true},
    {text: "We are going to address a few more conflicts. Consider axe vs action. -ction is normally written -BGS, and so is -X. Here, -X takes priority \
    and we add an asterisk to -ction. So we have axe: ABGS and action: A*BGS", lesson: ["axe", "axe", "action", "action", "axe", "action", "axe", "action"]},
    {text: "What if we want to write a word like \"divide\"? If we try to combine TK and SR, the TK breaks up the SR. Instead, what we can do is substitue a W- \
    for the V-. So we would write TKWAOEUD. See if you can apply the same rule to \"severe\".", lesson: ["divide", "divide", "divide", "divide", "severe", "severe", "severe", "severe"]},
    {text: "Remember using -PBG to write sponge? What if we have something like lung and lunge? We use -PBG for the hard G sound and \
    add a * for the soft G, i.e. PWEUPBG for bing and PW*EUPBG for binge. This doesn't always work, though. Binge can also be written by adding -J, \
    PWEUPB/-PBLG. Similarly, we can write HRUPBG for lung and HRUPBLG or HRUPB/-PBLG for lunge.", extraCode: "ngeConflict"},
    {text: "Now for a little more inversion, which we introduced in the ring finger lesson. concept: SKEPT (inversion of con- and S-) | discuss: STKUS \
    (inversion of d and s) | mistake: SPHAEUBG (inversion of m and s)", lesson: ["concept", "discuss", "mistake", "mistake", "discuss", "concept"]},
    {text: "One final trick -- to form some briefs, we can drop consonants or even full syllables. Recall that K is used for com- and con- prefixes. \
    again: TKPWEPB (drop the leading a-) | control: KROL (drop the middle t) | document: TKOUPLT (drop the middle cu)", lesson: ["again", "again", "control", "document", "control", "again", "document", "control", "document", "document"]}
  ]

  // go to selected index
  function showNarration() {
    // use preset width if set, else set a width relative to string length
    if (narrationText[index].width != null) { narration.style.width = narrationText[index].width + "px"; }
    else if (narrationText[index].text.length < 100) {
      console.log("times 5");
      narration.style.width = narrationText[index].text.length * 5 + "px";
    }
    else if (narrationText[index].text.length < 200) {
      narration.style.width = narrationText[index].text.length * 3 + "px";
    }
    else if (narrationText[index].text.length < 300) {
      console.log(narrationText[index].text.length + " times 2");
      narration.style.width = narrationText[index].text.length * 2 + "px";
    }
    else {
      console.log(narrationText[index].text.length + " times 2 also");
      narration.style.width = narrationText[index].text.length * 1.2 + "px";
    }

    // set narration box text
    narration.innerHTML = narrationText[index].text;

    // set narration box x position
    let widthPercentage = 100 * (narration.getBoundingClientRect().width / window.innerWidth);
    if (narrationText[index].left != null) { narration.style.left = narrationText[index].left + "\%"; }
    else { narration.style.left = ((100 - widthPercentage) / 2) + "\%"; }

    // set narration box y position
    if (narrationText[index].top != null) { narration.style.top = narrationText[index].top + "\%"; }
    else { narration.style.top = 115 + "\%"; }

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

      if (narrationText[index].full) {
        generatePracticeLetters(getNextLesson(), 0, getNextLesson().length);
      } else {
        generatePracticeLetters(getNextLesson(), 0, Math.min(getPracticeIndex()+10, getNextLesson().length));
      }

    }

    // make sure narration box isn't still wiggling
    document.getElementById("narration").classList.remove("wiggle");
    console.log("wiggle removed");

    // show vocab if there is any
    if (!narrationText[index].vocab && !narrationText[index].affix) {
      vocabBox.hidden = true;
    }

    if (narrationText[index].vocab || narrationText[index].affix) {
      vocabBox.innerHTML = "";
    }

    if (narrationText[index].affix) {
      vocabBox.innerHTML += '<span class="headingSpan vocabSpan">' + "Prefixes & Suffixes" + '<br>' + '</span>';
      vocabBox.innerHTML += '<span class="vocabSpan">' + narrationText[index].affix.join("</span><br><span class='vocabSpan'>") + '</span>';
      vocabBox.hidden = false;
    }

    if (narrationText[index].vocab && narrationText[index].affix) {
      vocabBox.innerHTML += '<br>';
    }

    if (narrationText[index].vocab) {
      vocabBox.innerHTML += '<span class="headingSpan vocabSpan">' + "Vocab" + '<br>' + '</span>';
      vocabBox.innerHTML += '<span class="vocabSpan">' + narrationText[index].vocab.join("</span><br><span class='vocabSpan'>") + '</span>';
      vocabBox.hidden = false;
    }

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
      // event.preventDefault();
      narration.hidden = false;
      document.getElementById("side-view").hidden = true;
      console.log("clicked " + this.innerHTML);
      index = menuIndices[i];
      clearPracticeLetters();
      showNarration();
    }, false);
  }

  // get the next narration text, position, etc. to display when user hits enter
  document.body.addEventListener("keydown", nextText, false);
  function nextText() {
    if (event.key === "Enter" && (index < narrationText.length)) {
      clearPracticeLetters();
      showNarration(index);
    }
  }
}


// extra functions to work with narration
function extraCode(whichCode) {
  let lesson = [];

  function makeLesson(lessonText) {
    let mylesson = [];
    let asIs = false;
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
      document.getElementById("finger-side-middle").style.transform = 'rotate(172deg) translate(0, 0) scaleY(1)';
      document.getElementById("finger-side-tip").style.transform = 'rotate(182deg) translate(0, 0)';
      document.getElementById("lp-fend").classList.remove("top-key");
      document.getElementById("lp-ftip").classList.remove("top-dot");
      document.getElementById("lp-fend").classList.remove("bottom-key");
      document.getElementById("lp-ftip").classList.remove("bottom-dot");
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
      updateGreenKeys(["key-Q", "key-A"]);
      break;
    case ("greenPinkiesRight"):
      updateGreenKeys(["key-P", "key-colon", "key-lbrace", "key-quote"], ["key-Q", "key-A"]);
      break;
    case ("pinkyLessons"):
      document.getElementById("key-Q").classList.add("green-key");
      document.getElementById("key-A").classList.add("green-key");

      lesson = [
        ["ab", ["S", "-S"]],
        ["ab2", ["-T", "-S"]],
        ["ab3", ["-D", "-Z"]],
        ["ab", ["-T", "-D"]],
        ["ab2", ["-S", "-Z"]]
      ];
      // makeLesson(pinkyContent);
      break;
    case ("pinkyLessonsBriefs"):
      lesson = [
        ["ab3", ["S", "-T"]],
        ["ab3", ["is", "the"]],
        ["ab", ["is", "-S"]],
        ["ab2", ["the", "-D"]]
      ];
      // makeLesson(lessonContent);
      break;
    case ("shortVowels"):
      lesson = [
        ["five", ["sat", "set", "sit", "sod", "suds"]],
        ["five2", ["sat", "set", "sit", "sod", "suds"]],
        ["five3", ["sat", "set", "sit", "sod", "suds"]]
      ];
      // makeLesson(shortVowels);
      break;
    case ("longVowels"):
      lesson = [
        ["five", ["say", "seed", "sight", "sow", "suit"]],
        ["five2", ["say", "seed", "sight", "sow", "suit"]],
        ["five3", ["say", "seed", "sight", "sow", "suit"]]
      ];
      // makeLesson(longVowels);
      break;
    case ("oVowels"):
      lesson = [
        ["five", ["soy", "soot", "road", "rode", "road"]],
        ["five2", ["sea", "see", "rode", "out", "saw"]],
        ["five3", ["soy", "soot", "saw", "out", "sea"]],
        ["abc", ["out", "out-", "set", "out", "out-", "set"], true]
      ];
      // makeLesson(oVowels);
      break;
    case("clearGreenPinkies"):
      document.getElementById("key-A").classList.remove("green-key");
      document.getElementById("key-Q").classList.remove("green-key");
      document.getElementById("key-P").classList.remove("green-key");
      document.getElementById("key-colon").classList.remove("green-key");
      document.getElementById("key-lbrace").classList.remove("green-key");
      document.getElementById("key-quote").classList.remove("green-key");
      break;
    case("leftRing"):
      document.getElementById("key-W").classList.add("green-key");
      document.getElementById("key-S").classList.add("green-key");
      lesson = [
        ["abc", ["T", "K", "D"]],
        ["abc2", ["it", "can", "did"]],
        ["six", ["T", "K", "D", "it", "can", "did"]],
        ["six2", ["T", "K", "D", "it", "can", "did"]]
      ]
      // makeLesson(leftRing);
      break;
    case("rightRing"):
      document.getElementById("key-O").classList.add("green-key");
      document.getElementById("key-L").classList.add("green-key");
      lesson = [
        ["ab3", ["-L", "-G"]],
        ["ab", ["-L", "-G"]],
        ["six", ["call", "kale", "tug", "dig", "tile", "dial"]],
        ["ab2", ["starring", "starred"]]
      ];
      // makeLesson(rightRing);
      break;
    case ("leftMiddle"):
      document.getElementById("key-W").classList.remove("green-key");
      document.getElementById("key-S").classList.remove("green-key");
      document.getElementById("key-O").classList.remove("green-key");
      document.getElementById("key-L").classList.remove("green-key");
      document.getElementById("key-E").classList.add("green-key");
      document.getElementById("key-D").classList.add("green-key");
      lesson = [
        ["ab", ["P", "W"]],
        ["abc", ["P", "W", "B"]],
        ["ab2", ["about", "with"]],
        ["five", ["P", "W", "B", "about", "with"]],
        ["five2", ["P", "W", "B", "bee", "about"]]
      ];
      // makeLesson(leftMiddle);
      break;
    case ("rightMiddle"):
      document.getElementById("key-I").classList.add("green-key");
      document.getElementById("key-K").classList.add("green-key");
      lesson = [
        ["ab2", ["-P", "-B"]],
        ["abc2", ["-P", "-B", "-N"]],
        ["ab", ["an", "be"]],
        ["five2", ["-P", "-B", "-N", "an", "be"]],
        ["five3", ["-P", "-B", "-N", "an", "be"]],
        ["abc", ["be", "being", "can be"]]
      ]
      // makeLesson(rightMiddle);
      break;
    case ("middleLetters"):
      lesson = [
        ["ab", ["F", "G"]],
        ["ab2", ["-M", "-K"]],
        ["ab3", ["-K", "-X"]],
        ["abc2", ["-K", "-M", "-J"]],
        ["six", ["F", "G", "-M", "-K", "-X", "-J"]],
        ["six2", ["F", "G", "-M", "-K", "-X", "-J"]],
        ["abc", ["Q", "X"]],
        ["abc2", ["Q", "X"]]
      ];
      // makeLesson(middleLetters);
      break;
    case ("middleAffixes"):
      lesson = [
        ["six", ["section", "sponge", "entice", "intact", "I'm", "cement"]],
        ["six2", ["section", "sponge", "entice", "I'm", "possible", "cement"]],
        ["abc", ["I'm", "im-", "possible"]]
      ];
      // makeLesson(middleAffixes);
      break;
    case ("leftPointer"):
      document.getElementById("key-E").classList.remove("green-key");
      document.getElementById("key-D").classList.remove("green-key");
      document.getElementById("key-I").classList.remove("green-key");
      document.getElementById("key-K").classList.remove("green-key");
      document.getElementById("key-R").classList.add("green-key");
      document.getElementById("key-F").classList.add("green-key");
      document.getElementById("key-T").classList.add("green-key");
      document.getElementById("key-G").classList.add("green-key");
      lesson = [
        ["abc", ["H", "R", "L"]],
        ["abc2", ["had", "are", "will"]],
        ["six", ["H", "had", "R", "are", "L", "will"]]
      ];
      // makeLesson(leftPointer);
      break;
    case ("rightPointer"):
      document.getElementById("key-U").classList.add("green-key");
      document.getElementById("key-J").classList.add("green-key");
      document.getElementById("key-Y").classList.add("green-key");
      document.getElementById("key-H").classList.add("green-key");
      lesson = [
        ["ab", ["-F", "-R"]],
        ["abc2", ["of", "are", "ever"]],
        ["five", ["-F", "of", "-R", "are", "ever"]],
        ["ab2", ["of", "off"]],
        ["ab3", ["ever", "every"]],
        ["five2", ["everything", "everywhere", "everybody", "everyday", "everyone"]]
      ];
      // makeLesson(rightPointer);
      break;
    case ("someWords"):
      lesson = [
        ["six", ["something", "somewhere", "somebody", "someday", "someone", "sometime"]],
        ["five2", ["somehow", "someplace", "someday", "someone", "sometime"]],
        ["five", ["someplace", "something", "somewhere", "somehow", "somebody"]]
      ];
      break;
    case ("pointerLetters"):
      lesson = [
        ["ab", ["N", "Y"]],
        ["ab2", ["J", "V", "Z"]],
        ["ab2", ["M", "N"]],
        ["ab", ["-F", "-V"]],
        ["abc", ["C", "ch", "-ch"]],
        ["ab2", ["in", "why"]],
        ["ab3", ["have", "consider"]]
      ];
      break;
    case ("ngeConflict"):
      lesson = [
        ["ab2", ["lung", "lunge"]],
        ["ab3", ["bing", "binge"]]
      ]
    default:
      console.log("extra code not defined");
  }

  if (lesson) { makeLesson(lesson); }
}


// follow pattern for current lesson, but replace with approriate keys
function getLessonPattern(pattern, letters, keepOriginal = false) {
  let template = "";
  let finalPattern = "";
  let replacements = null;

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

    finalPattern = template.replace(/[a-z]/g, m => replacements[m]);
    return finalPattern.split(" ");
  } else {
    // for use in makeLesson
    return letters;
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
