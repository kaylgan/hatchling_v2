// computer passes one keystroke at a time. use map to keep track of multiple keys
function configureListeners() {
  let keyMap = {};
  let stenoMap = {
    "q": "s", "a": "s", "w": "t", "s": "k", "e": "p", "d": "w", "r": "h",
    "f": "r", "t": "*", "g": "*", "y": "*", "h": "*", "u": "f", "j": "r",
    "i": "p", "k": "b", "o": "l", "l": "g", "p": "t", "\;": "s", "\[": "d",
    "'": "z", "c": "a", "v": "o", "n": "e", "m": "u"
  };
  let twoKeyMap = {
    "kt": "d", "pw": "b", "hr": "l",
    "pt": "f", "kw": "q", "hp": "m",
    "rs": "v", "kr": "c", "kp": "x", "s*": "z",
    "eu": "i",
    "ik": "n",
    "io": "m", "kl": "k", "u*": "v"
  };
  let threeKeyMap = {
    "erw": "n", "dfs": "y",
    "kl\;": "x"
  }
  let fourPlusKeyMap = {
    "adeqsw": "z", "deqsw": "z", "adesw": "z",
    "desw": "g", "adfs": "j",
    "iklo": "j"
  }

  function keyHandler(e) {
    console.log("starting");
    e = e || event; // IE
    let currentKey = e.key;
    keyMap[currentKey] = e.type == 'keydown';
    // console.log(currentKey + ": " + stenoMap[currentKey]);

    let keyCombo = "";
    let keyArray = [];
    for (let key in keyMap) {
      if (keyMap[key]) {
        keyArray.push(key);
      }
      // keyMap[key] = false;
    }

    keyArray = keyArray.sort();
    let length = keyArray.length;

    switch (length) {
      case 3:
        console.log("hi 3");
        document.body.removeEventListener("keydown", keyHandler, false);
        break;
      case 2:
        console.log("hello 2");
        break;
      case 1:
        console.log("just 1");
        break;
      default:
        break;
    }

    keyArray = {};
    // keyMap = {};


  }
  document.body.addEventListener("keydown", keyHandler, false);
  document.body.addEventListener("keyup", keyHandler, false);
  document.body.addEventListener("keyup", function () {
    keyMap = {};
    console.log("clear");
  }, false);
}
// configureListeners();

// function Input(elmnt) {
//   let parent = elmnt, map = {}, intervals = {};
//
//   function ev_keyDown(ev) {
//     map[ev.key] = true;
//     ev.preventDefault();
//     return;
//   }
//
//   function ev_keyUp(ev) {
//     map[ev.key] = false;
//     ev.preventDefault();
//     return;
//   }
//
//   // returns true is key is down
//   function key_down(key) {
//     return map[key];
//   }
//
//   // returns true if all specified keys are down
//   function keys_down_array(array) {
//     for (let i = 0; i < array.length; i++) {
//       if (!key_down(array[i])) { return false; }
//       return true;
//     }
//   }
//
//   function keys_down_arguments() {
//     return keys_down_array(Array.from(arguments));
//   }
//
//   function clear() {
//     map = {};
//   }
//
//   function watch_loop(keylist, callback) {
//     return function() {
//       if (keys_down_array(keylist)) {
//         callback();
//       }
//     }
//   }
//
//   function watch(name, callback) {
//     let keylist = Array.from(arguments).splice(2);
//     intervals[name] = setInterval(watch_loop(keylist, callback), 1000/24);
//   }
//
//   function unwatch(name) {
//     clearInterval(intervals[name]);
//     delete intervals[name];
//   }
//
//   function detach() {
//     parent.removeEventListener("keydown", ev_keyDown);
//     parent.removeEventListener("keyup", ev_keyUp);
//   }
//
//   function attach() {
//     parent.addEventListener("keydown", ev_keyDown);
//     parent.addEventListener("keyup", ev_keyUp);
//   }
//
//   function Input() {
//     attach();
//     return {
//       key_down: key_down,
//       keys_down: keys_down_arguments,
//       watch: watch,
//       unwatch: unwatch,
//       clear: clear,
//       detach: detach
//     };
//   }
//
//   return Input();
// }
//
// function configureInput() {
//   let input_txt = Input(document.body);
//   input_txt.watch("print_5", function() {
//     console.log("FIVE");
//   }, "Control", "5");
// }
// configureInput();
