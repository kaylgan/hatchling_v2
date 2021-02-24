// -------------------- check if the keystroke is a word --------------------
function checkDictionary(keyArray, reverse = false, reverseEntry = "") {
  // add the keys pressed to a string for processing
  let arrayToString = "";
  for (let i = 0; i < keyArray.length; i++) { arrayToString += keyArray[i]; }

  // map of chords used in lessons
  let oneKey = {
    "a": "is", "q": "is", "p": "the", "m": "you", "w": "it", "s": "can", "k": "be",
    "d": "with", "r": "had", "f": "are", "u": "of", "j": "are",
    "l": "-ing", "o": "-le, -ly", "\[": "-ed"
  };
  let twoKeys = {
    "mn": "I", "av": "so", "qv": "so", "sw": "did", "\;m": "us", "vw": "to", "sv": "could",
    "\;w": "it's", "\;c": "as", "cp": "at", "de": "about", "ik": "an", "ew": "if",
    "kl": "being", "ks": "can be", "ow": "it'll", "\'w": "it has", "lw": "-ing it",
    "dn": "we", "dv": "would", "al": "something", "lq": "something", "im": "up",
    "fr": "will", "ju": "ever", "uv": "off", "af": "have", "fs": "consider",
    "rs": "ch", "iu": "-ch", "nu": "every", "al": "something", "ql": "something",
    "ak": "somebody", "kq": "somebody", "\;a": "SS", "\;q": "SS", "cu": "after",
    "nr": "he", "rw": "this", "jm": "you're", "jv": "or", "dr": "when",
    "df": "were", "dj": "where", "es": "examine", "ds": "request",
    "1q": "1", "2w": "2", "3e": "3", "4r": "4", "3c": "5", "3v": "0", "7u": "6",
    "8i": "7", "9o": "8", "0p": "9", "lo": "-lch, -lge",
    "ot": "-le", "go": "-le", "oy": "-le", "ho": "-le", "jk": "-sh", "\;l": "-tion, -sion (-shun)",
    "pu": "-st", "\;t": "-st", "\;g": "-st", "\;y": "-st", "\;h": "-st",
    "pt": "-th", "gp": "-th", "py": "-th", "hp": "-th"
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
    "\'an": "says", "\'nq": "says", "ain": "cep", "inq": "cep", "eim": "pup", "cnp": "eight",
    "den": "be-", "\;kl": "-ction (-kshun)", "ade": "ent-, int-", "deq": "ent-, int-",
    "lot": "-lk", "glo": "-lk", "loy": "-lk", "hlo": "-lk", "iop": "-ment", "iot": "-mp", "gio": "-mp",
    "ioy": "-mp", "hio": "-mp", "iju": "-mp", "ikl": "-ng, -nge", "jku": "-rve", "\;jk": "-tious, -cious (-shus)",
    "acu": "save", "cqu": "save", "kmo": "you believe"
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
    "cmnosvw": "dial", "cmnovw": "tile", "acjlw": "starring", "cjlqw": "starring", "alnp": "setting",
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
    "\;cdemnqv": "entice", "ainop": "cement", "inopq": "cement", "acinopv": "cement", "cinopqv": "cement", "acdeklp": "intact", "cdeklpq": "intact",
    "imno": "im\-", "cimnov": "I'm", "jlnu": "everything", "djnu": "everywhere", "jknu": "everybody", "\[jnu": "everyday",
    "ijknu": "everyone", "acmnsw": "someday", "cmnqsw": "someday", "aeikr": "someone", "eikqr": "someone", "acimnovw": "sometime",
    "cimnoqvw": "sometime", "aemrv": "somehow", "emqrv": "somehow", "\;acefmnr": "someplace", "\;cefmnqr": "someplace",
    "emrvw": "now", "cfklrv": "look", "imnor": "him", "\;mnr": "his", "\'mnr": "his", "cfiov": "room", "ceikrvw": "noon",
    "enrvw": "know", "delsw": "going", "cervw": "into", "dfjmsv": "your", "\;mrv": "house", "mnrw": "think", "jnrw": "they're",
    "cjmnrw": "their", "\;aklv": "socks", "\;klqv": "socks", "demnsuw": "give", "djklv": "work", "adfmpsu": "just", "emnr": "my",
    "epruv": "most", "\'nrw": "these", "\;ejmnw": "first", "ejmnpuw": "first", "\;cfpsuw": "drafts", "emnrw": "any", "inorw": "them", "jnuv": "over",
    "iknrw": "then", "cikrw": "than", "cjmu": "over-", "\[adfmnsv": "joyed", "ejnrvw": "another", "cdfjnsv": "year", "\;acjpw": "starts",
    "\;cjpqw": "starts", "eprvw": "not", "cfklmnrv": "like", "emrw": "new", "cdfhjns": "area", "cdfgjns": "area", "ceklmnr": "make", "ervw": "no",
    "\;cklmns": "cakes", "ceikr": "man", "ajvw": "store", "jqvw": "store", "cejlmpw": "forgot", "ejlpvw": "forget", "\;iklmnrw": "things",
    "cemnprvw": "night", "diknp": "went", "ikmn": "in-", "\[cdj": "ward", "cmnsu": "cave", "ejmpw": "further", "\;crw": "that is", "cjrw": "that are",
    "crtu": "1/2", "cruy": "1/2", "jkmr": "hush", "\;efjkn": "precious", "cdekn": "baby", "ciju": "amp", "cijou": "ample", "fnoru": "level",
    "cmprw": "thought", "cepry": "math", "ceprt": "math", "fnopruv": "a lot of", "inpstw": "depth", "inpswy": "depth", "cdehmnv": "bye",
    "cdemnvy": "bye", "cdkln": "weak", "fnpru": "left", "dehmn": "bi-", "degmn": "bi-", "demnt": "bi-", "demny": "bi-", "cfpru": "last", "cdklnv": "week",
    "\[adjknu": "swerved", "\[djknqu": "swerved", "fnsuvw": "drove", "\[cijk": "around", "jkmsu": "curve", "eiklmnrt": "mink",
    "eihklmnr": "mink", "cmnp": "ate", "dfklnsv": "yolk", "cfgiklsw": "drank", "cfhiklsw": "drank", "ehlmnor": "milk", "elmnort": "milk",
    "\;cejmpsv": "computers", "eikrsv": "common", "\[klnps": "connected", "\[cdmnsvw": "divide", "acdjnv": "severe", "cdjnqv": "severe",
    "ceijkru": "march", "ikmsvw": "down", "cmor": "hall", "fijklmoru": "lunch", "\;fikmr": "lunch", "fijkmru": "lurch", "deijknu": "bench",
    "\;ckl": "axe", "\;chkl": "action", "\;cgkl": "action", "\;cklt": "action", "fiklmr": "lung", "fiklmor": "lunge", "deiklmn": "bing",
    "ainps": "concept", "inpqs": "concept", "\;amsw": "discuss", "\;mqsw": "discuss",
    "aceklmnr": "mistake", "ceklmnqr": "mistake", "\;aemnrsw": "dismiss", "\;emnqrsw": "dismiss",
    "deiknsw": "again", "fosv": "control", "fnosvw": "control", "imopsvw": "document", "fklmnrs": "click", "jnovw": "tutorial", "\;fiknruv": "lessons",
    "\;fiknruy": "lessons", "\;fiknrtu": "lessons", "ceikmrv": "menu", "\[acjpw": "started", "\[cjpqw": "started",
    "delmno": "bilge", "delmo": "bulge", "\[acmnsvw": "decide", "\[cmnqsvw": "decide", "aijmo": "summer", "ijmoq": "summer",
    "ajnv": "sorry", "jnqv": "sorry", "cjns": "carry", "ceknr": "maybe", "ceiknr": "many", "ejnrv": "mother", "cdjm": "water",
    "cfjn": "rather", "dejnv": "bother", "eimru": "much", "afnorv": "slowly", "fnoqrv": "slowly", "acno": "sale", "cnoq": "sale",
    "acmno": "sail", "cmnoq": "sail", "adlnos": "squelch", "dlnoqs": "squelch", "delno": "belch", "mnps": "kit", "dfmns": "-y",
    "akmop": "subtle", "kmopq": "subtle", "eprw": "in the", "\;acmn": "says", "\;cmnq": "says", "\'acmn": "says", "\'cmnq": "says",
    "iksv": "con-", "cikms": "con-", "cejmw": "for-", "imno": "im-", "ikmn": "in-", "fmnr": "-ly",
    "ijku": "-nch, -rch", "ijklou": "-nch", "iklt": "-nge, -nk", "gikl": "-nge, -nk", "ikly": "-nge, -nk", "hikl": "-nge, -nk",
    "cmpv": "out-", "\;aclmnw": "station", "\;clmnqw": "station",
    "fmru": "love", "fruv": "love", "fmrtu": "love", "fgmru": "love", "fmruy": "love", "fhmru": "love",
    "acnuy": "savvy", "acntu": "savvy", "acgnu": "savvy", "achuy": "savvy",
    "cnquy": "savvy", "cnqtu": "savvy", "cgnqu": "savvy", "chquy": "savvy",
    "acnu": "satisfy", "cnqu": "satisfy", "acmnu": "safe", "cmnqu": "safe", "cekmnr": "maybe",
    "ceprvw": "into the", "egjmpw": "further", "ejmptw": "further", "ejmpwy": "further", "eghjmpw": "further",
    "ceklru": "mask", "fmnpru": "lift", "\;fmnrt": "list", "\;fgmnr": "list", "\;fmnry": "list", "\;fhmnr": "list",
    "ciot": "a.m.", "cgio": "a.m.", "cioy": "a.m.", "chio": "a.m.", "degiklmn": "binge", "deiklmnt": "binge",
    "dehiklmn": "binge", "deiklmny": "binge", "cdiknvw": "tween", "diknw": "between",
    "\[klmn": "I could", "\[klm": "you could", "\[klw": "it could", "\[aklnr": "she could", "\[klnrq": "she could",
    "\[klnr": "he could", "\[dkln": "we could", "\[klnrw": "they could", "\[dklrv": "who could", "\[cdklr": "what could",
    "\[klrs": "which could", "\[cklrw": "that could", "\'\[cdfiks": "I can't understand", "\'\[dfiksv": "I don't understand",
    "\'\[dfikmns": "I didn't understand", "\;aknor": "she believes", "\;knoqr": "she believes",
    "\[dkno": "we believed"
  }

  // reverse lookup
  if (reverse) {
    let values = [];
    let arraysToCheck = [fourPlusKeys, threeKeys, twoKeys, oneKey];
    arraysToCheck.forEach(function(item) {
      let valueToKey = Object.keys(item).find(key => item[key] === reverseEntry);
      values.push(valueToKey);
    });
    let longestDef = values.sort(function(a, b) { return b.length - a.length; })[0];
    if (longestDef) { return longestDef; }
    else { return ""; }
  }

  // return a number
  if (arrayToString.match(/\d/) || arrayToString.includes("\-") || arrayToString.includes("\=")) {
    let qwertyNumbers = ["v", "q", "w", "e", "r", "c", "u", "i", "o", "p"];
    // check if a number key was pressed
    for (let i = 0; i < qwertyNumbers.length; i++) {
      if (arrayToString.includes(qwertyNumbers[i])) {
        let numberValue = i;
        i = qwertyNumbers.length;
        return numberValue.toString();
      }
    }
    return "";
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
    // console.log("no element mapped to that key combo");
  } else {
    // console.log("zero length");
  }
  return "";
}
