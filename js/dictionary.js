// -------------------- check if the keystroke is a word --------------------
function checkDictionary(keyArray, reverse = false, reverseEntry = "") {
  // add the keys pressed to a string for processing
  let arrayToString = "";
  for (let i = 0; i < keyArray.length; i++) { arrayToString += keyArray[i]; }

  // map of chords used in lessons
  let oneKey = {
    "a": "is", "p": "the", "m": "you", "w": "it", "s": "can", "k": "be",
    "d": "with", "r": "had", "f": "are", "u": "of", "j": "are",
    "l": "-ing", "o": "-le, -ly", "\[": "-ed"
  };
  let twoKeys = {
    "mn": "I", "av": "so", "sw": "did", "\;m": "us", "vw": "to", "sv": "could",
    "\;w": "it's", "\;c": "as", "'c": "as", "cp": "at", "de": "about", "ik": "an", "ew": "if",
    "kl": "being", "ks": "can be", "ow": "it'll", "\'w": "it has", "lw": "-ing it",
    "dn": "we", "dv": "would", "al": "something", "im": "up",
    "fr": "will", "ju": "ever", "uv": "off", "af": "have", "fs": "consider",
    "rs": "ch", "iu": "-ch", "nu": "every", "al": "something",
    "ak": "somebody", "\;a": "SS", "cu": "after",
    "nr": "he", "rw": "this", "jm": "you're", "jv": "or", "dr": "when",
    "df": "were", "dj": "where", "es": "examine", "ds": "request",
    "1a": "1", "2w": "2", "3e": "3", "4r": "4", "3c": "5", "3v": "0", "7u": "6",
    "8i": "7", "9o": "8", "0p": "9", "lo": "-lch, -lge",
    "go": "-le", "jk": "-sh", "\;l": "-tion, -sion (-shun)",
    "pu": "-st", "\;g": "-st",
     "gp": "-th", "as": "ask",
    "cl": "ago", "fw": "interest", "jw": "interest", "\[c": "add",
    "aw": "is it", "aw": "st"
  };
  let threeKeys = {
    "acw": "sta", "acp": "sat", "anp": "set", "\[av": "sod",
    "anv": "sow", "acn": "sea",
    "acm": "saw", "fpv": "rot", "\[fv": "rod", "ikr": "\-",
    "cmn": "a", "lmw": "tug", "mpv": "out", "mno": "ill", "cmo": "all", "\[ac": "sad",
    "svw": "do", "aes": "and", "\[ow": "it would",
    "klw": "it can", "dvw": "two", "ikv": "on", "dmn": "which", "dno": "well",
    "\;no": "else", "ivw": "top", "cvw": "too", "ekv": "possible", "erw": "in",
    "dfs": "why", "jnu": "every", "adf": "somewhere", "cju": "after-",
    "mrv": "how", "nrw": "they", "jrw": "there", "frw": "there", "anr": "she", "\;fr": "also",
    "enr": "me", "jnr": "her", "jmv": "our", "jno": "early", "jnv": "other", "crw": "that",
    "cio": "am", "cdr": "what", "drv": "who", "ejw": "for", "efw": "from", "cru": "half", "clw": "tag",
    "\'an": "says", "ain": "cep", "eim": "pup", "cnp": "eight",
    "den": "be-", "\;kl": "-ction (-kshun)", "ade": "ent-, int-",
    "glo": "-lk", "iop": "-ment", "gio": "-mp",
    "iju": "-mp", "ikl": "-ng, -nge", "jku": "-rve", "\;jk": "-tious, -cious (-shus)",
    "acu": "save", "kmo": "you believe", "\;am": "suss",
    "cps": "cat", "juv": "offer", "\;uv": "office", "\[as": "asked",
    "afw": "center", "\[an": "said", "uvw": "to have", "\;rw": "this is"
  }
  let fourPlusKeys = {
    "acjw": "star", "\;acjw": "stars", "cmpv": "out-",
    "\[acjw": "starred", "amnp": "sit", "\;amnp": "sits",
    "\'\[am": "suds", "acmn": "say",
    "\[acnv": "seed", "acmnpv": "sight",
    "acmpv": "suit", "amnv": "soy", "acpv": "soot",
    "cfpv": "root", "\[fnv": "rode", "\[cfv": "road", "acnv": "see",
    "\;fpv": "rots", "\'\[fv": "rods", "eiow": "\.", "dkls": "\,",
    "\'\[acnv": "seeds", "cmnv": "eye", "jksw": "--", "cmos": "call", "cmnos": "kale", "lmnsw": "dig",
    "cmnosvw": "dial", "cmnovw": "tile", "aclnv": "seeing", "alnp": "setting",
    "clmos": "calling", "\[lmns": "kidding", "lsvw": "dog",
    "\[acmn": "said", "\;cmv": "use", "\'cmv": "use", "cmnsw": "day",
    "\[nosv": "cold", "\'\[mv": "outside", "\[acl": "sagged", "\;mnp": "its", "cmnow": "tail",
    "cnow": "tale", "\[mnp": "it'd", "cmnov": "I'll", "acmnw": "stay",
    "\;cnv": "ease", "\;dls": "\"", "\;fls": "\" ", "\;fgls": "\" ", "aclmnps": "skating",
    "dios": "\?", "eklw": "\!", "\;cmnv": "ice", "\[cmos": "called",
    "desw": "go", "aemns": "and I", "aeps": "and the","aems": "and you", "aces": "and a", "aeklmns": "and I can",
    "cdenv": "bee", "\;cdw": "it was", "cdiknpw": "it wasn't", "\[klw": "it could", "aiov": "some",
    "\[cdesvw": "good", "ceinov": "people", "iknov": "only", "cdikp": "want", "cimnovw": "time", "demp": "but",
    "demn": "by", "cdmn": "way", "cklmnw": "take", "\;cdem": "because", "\'cdem": "because", "cdikp": "want",
    "iosv": "come", "cdekl": "back", "denpsw": "get", "depsw": "get", "dikm": "one", "cdemnv": "buy", "ciknv": "even",
    "\;akln": "section", "aeiklv": "sponge", "\;acdemnv": "entice",
    "ainop": "cement", "acinopv": "cement", "acdeklp": "intact",
    "imno": "im\-", "cimnov": "I'm", "jlnu": "everything", "djnu": "everywhere", "jknu": "everybody", "\[jnu": "everyday",
    "ijknu": "everyone", "acmnsw": "someday", "aeikr": "someone", "acimnovw": "sometime",
    "aemrv": "somehow", "\;acefmnr": "someplace",
    "emrvw": "now", "cfklrv": "look", "imnor": "him", "\;mnr": "his", "\'mnr": "his", "cfiov": "room", "ceikrvw": "noon",
    "enrvw": "know", "delsw": "going", "cervw": "into", "dfjmsv": "your", "\;mrv": "house", "mnrw": "think", "jnrw": "they're",
    "cjmnrw": "their", "\;aklv": "socks", "demnsuw": "give", "djklv": "work", "adfmpsu": "just", "emnr": "my",
    "epruv": "most", "enpruv": "most", "\'nrw": "these", "\;cnrvw": "these", "\'cnrvw": "these", "\;ejmnw": "first", "ejmnpuw": "first", "\;cfpsuw": "drafts", "emnrw": "any", "inorw": "them", "jnuv": "over",
    "iknrw": "then", "cikrw": "than", "cjmu": "over-", "\[adfmnsv": "joyed", "ejnrvw": "another", "cdfjnsv": "year", "\;acjpw": "starts",
    "eprvw": "not", "cfklmnrv": "like", "emrw": "new", "cdfgjns": "area", "ceklmnr": "make", "ervw": "no",
    "\;cklmns": "communication", "\;ceiklmrsv": "communication", "ceikr": "man", "ajvw": "store", "cejlmpw": "forgot", "ejlpvw": "forget", "\;iklmnrw": "things",
    "cemnprvw": "night", "diknp": "went", "ikmn": "in-", "\[cdj": "ward", "cmnsu": "cave", "cmnsuy": "cave", "cgmnsu": "cave", "ejmpw": "further", "\;crw": "that is", "cjrw": "that are",
    "cruy": "1/2", "cgru": "1/2", "jkmr": "hush", "\;efjkn": "precious", "cdekn": "baby", "ciju": "amp", "cijou": "ample", "fnoru": "level",
    "cmprw": "thought", "cepry": "math", "cegpr": "math", "fnopruv": "a lot of", "inpswy": "depth", "ginpsw": "depth", "cdehmnv": "bye",
    "cdegmnv": "bye", "cdkln": "weak", "fnpru": "left", "degmn": "bi-", "cfpru": "last", "cdklnv": "week",
    "\[adjknu": "swerved", "fnsuvw": "drove", "\[cijk": "around", "jkmsu": "curve", "eiklmnrt": "mink",
    "egiklmnr": "mink", "cmnp": "ate", "dfklnsv": "yolk", "cfgiklsw": "drank", "cfiklsw": "drank", "cfiklmnsw": "draining", "cfgiklmnsw": "draining",
    "eglmnor": "milk", "elmnort": "milk",
    "\;cejmpsv": "computers", "eikrsv": "common", "\[klnps": "connected", "\[cdmnsvw": "divide", "acdjnv": "severe",
    "ceijkru": "march", "ikmsvw": "down", "cmor": "hall", "fijklmoru": "lunch", "\;fikmr": "lunch", "fijkmru": "lurch", "deijknu": "bench",
    "\;ckl": "axe", "\;cgkl": "action", "fiklmr": "lung", "fiklmor": "lunge", "deiklmn": "bing", "degiklmn": "binge",
    "ainps": "concept", "\;amsw": "discuss",
    "aceklmnr": "mistake", "\;aemnrsw": "dismiss",
    "deiknsw": "again", "fosv": "control", "fnosvw": "control", "imopsvw": "document", "fklmnrs": "click", "jnovw": "tutorial", "\;fiknruv": "lessons",
    "\;fiknruy": "lessons", "\;fiknrtu": "lessons", "ceikmrv": "menu", "\[acjpw": "started",
    "delmno": "bilge", "delmo": "bulge", "\[acmnsvw": "decide", "aijmo": "summer",
    "ajnv": "sorry", "djnv": "worry", "ceknr": "maybe", "ceiknr": "many", "ejnrv": "mother", "cdjm": "water",
    "cfjn": "rather", "dejnv": "bother", "eimru": "much", "afnorv": "slowly", "acno": "sale",
    "acmno": "sail", "adlnos": "squelch", "delno": "belch", "mnps": "kit", "dfmns": "-y",
    "akmop": "subtle", "eprw": "in the", "\;acmn": "says", "\'acmn": "says",
    "cikms": "con-", "cejmw": "for-", "imno": "im-", "ikmn": "in-", "fmnr": "-ly",
    "ijku": "-nch, -rch", "ijklou": "-nch", "gikl": "-nge, -nk",
    "cmpv": "out-", "\;aclmnw": "station",
    "fmru": "love", "fruv": "love", "fgmru": "love",
    "acgnu": "savvy",
    "acnu": "satisfy", "acmnu": "safe", "cekmnr": "maybe",
    "ceprvw": "into the", "egjmpw": "further",
    "ceklru": "mask", "fmnpru": "lift", "\;fgmnr": "list",
    "cgio": "a.m.", "cdiknvw": "tween", "diknw": "between",
    "\[klmn": "I could", "\[klm": "you could", "\[klw": "it could", "\[aklnr": "she could",
    "\[klnr": "he could", "\[dkln": "we could", "\[klnrw": "they could", "\[dklrv": "who could", "\[cdklr": "what could",
    "\[klrs": "which could", "\[cklrw": "that could", "\'\[cdfiks": "I can't understand", "\'\[dfiksv": "I don't understand",
    "\'\[dfikmns": "I didn't understand", "\;aknor": "she believes",
    "\[dkno": "we believed", "\'\;am": "susses", "\;\[am": "sussed",
    "cmnopv": "islet", "\;afjln": "version", "einoprv": "moment", "ijkmrsu": "church", "eiknprs": "comment",
    "\;eiknprs": "comments", "\[cejmns": "compared", "cefnprsv": "complete", "\;efklnrs": "complex", "cejmpsv": "computer",
    "iopsv": "comment", "\;iopsv": "comments", "acdejmnv": "entire", "ceijosu": "example", "acdev": "into",
    "cinuv": "each", "cfiklmn": "range", "aceinuv": "speech", "aimu": "such",
    "cdiu": "watch", "cklmw": "talk", "acfmv": "view", "cdklm": "walk", "psuv": "cost", "\;psuv": "costs", "\;gsv": "cost", "\'\;gsv": "costs",
    "cfnpruv": "least", "\;cfgnrv": "least", "cepu": "past", "enpuv": "post", "\;egnv": "post", "fnpu": "rest", "\;fgn": "rest", "fklmnu": "risk",
    "npuw": "test", "\;gnw": "test", "ilosv": "coming", "cfjnorsv": "clearly", "celnovw": "feeling", "jlmsw": "during", "cmnorv": "highly",
    "cejnorvw": "nearly", "delpsw": "getting", "delnpsw": "getting", "deflnsvw": "growing", "eijklrv": "morning", "ceflmnr": "playing",
    "aclmn": "saying", "cfiklmnw": "training", "cflmnvw": "trying", "cdilu": "watching",
    "delmnsuw": "giving", "flmnru": "living", "clmuv": "using", "\[cmuv": "used", "\;\[cmv": "used",
    "cdefklmnru": "basically", "\[cdeiklmnv": "binding", "ceikns": "company", "efijovw": "former",
    "cefnoprsv": "completely", "cejklpw": "factor", "\;cejklpw": "factors", "cfjmnpr": "later", "\[cflnrv": "leading", "fijklrv": "longer",
    "celnprv": "meeting", "eopruv": "mostly", "enopruv": "mostly", "enruv": "movie", "\;enruv": "movies", "\[jnov": "older", "ceijmn": "paper",
    "\;ceijmn": "papers", "cejnp": "party", "\[aeikln": "spending", "acjlpw": "starting",
    "ajnvw": "story", "\;ajnvw": "stories", "\;dfjklv": "workers",
    "deuv": "above", "cdefnsvw": "agree", "fmrv": "allow", "eiklrv": "among", "ceijkmnop": "apparently", "efinuv": "approach",
    "emruw": "enough", "ejkmnorw": "initial", "ejkmnow": "official", "\;ejkmnow": "officials", "cijklou": "average",
    "ijkmps": "current", "\;ijkmnsuw": "different", "\'\;ijkmnsuw": "differences", "ijkmnpsuw": "different", "jnpu": "effort",
    "\;jnpu": "efforts", "cnouv": "evil", "cejmnpuw": "favorite", "ceikmnovw": "final", "cefikmnorvw": "finally", "deikmnsuw": "given",
    "\;fnoru": "levels", "\[fimnopr": "limited", "cejklpr": "market", "\[enprt": "method", "\[egnpr": "method", "\'\[enprt": "methods", "\'\[egnpr": "methods",
    "ceklmruv": "music", "\[enprvw": "noted", "ikuv": "often", "\;ceijkmnp": "parents",
    "\;cefklp": "practice", "cefmnpuv": "private", "ajnou": "several", "ajknov": "social",
    "aejkno": "special", "cikmpv": "unit", "cdfikmpsv": "unit", "afmnpu": "visit", "fklnpsw": "direct",
    "fklnopsw": "directly", "\[aenuv": "supposed", "\[jvw": "toward", "\[cdjw": "toward", "\[djvw": "toward",
    "eikmr": "money", "deik": "been", "\[ajknpv": "associated", "\;fklnrs": "collection",
    "ceikmprsv": "community", "\[cdeikmnrv": "behind", "\[ikmnr": "behind", "eklnpw": "effect", "klnpu": "effect", "ceklnpw": "affect", "cklpu": "affect",
    "\;klnpu": "effects", "\;eklnpw": "effects", "eovw": "follow", "\[eovw": "followed", "elovw": "following", "eijknvw": "foreign", "eijkvw": "foreign",
    "\[cejnv": "period", "\;acjnv": "serious", "\;acfjmn": "various", "fjno": "earlier",
    "cdmops": "quality", "acjmpsv": "security", "\[fjr": "already", "deju": "before",
    "ckop": "ability", "\;ciknpuv": "events", "jmruv": "however", "\[efnuv": "provide", "\'\[efnuv": "provides", "\;cfklnv": "reaction",
    "\[fnop": "related", "fiklnors": "college", "\;cfjrsw": "dollars", "cdmos": "equal", "\;adikns": "sequence",
    "\'\;adikns": "sequences", "\'\;diknqs": "sequences", "\;cgs": "cast",
    "cpsu": "cast", "cepuw": "fast", "\;cegw": "fast",
    "\;adefgn": "interest", "fpruv": "lot of", "fpruvy": "loft", "fgpruv": "loft", "\;fgrv": "lost",
    "\;dgmnw": "twist", "dmnpuw": "twist", "djpuv": "worst",
    "\;dgjv": "worst", "cmovw": "actual", "cfmorvw": "actually",
    "cmosvw": "dual", "\;ceikmrvw": "nuance", "cfikmpvw": "truant",
    "acfmov": "value", "\;acfmov": "values", "\;eiklmw": "function", "\;eklmw": "function", "deiknpu": "benefit",
    "\;deiknpu": "benefits", "\[fnps": "credit", "\;almnsw": "decision", "acikmnsvw": "design", "\[acikmnsvw": "designed",
    "cgjnpv": "either", "eiklmnorvw": "enjoy", "jmnpru": "history", "acemnpsvw": "despite", "\;acnsvw": "disease", "\[eorv": "model",
    "\;\[eorv": "models", "\'\[egorv": "models", "aiklmno": "single", "nopvw": "total", "fnoprvw": "totally", "\[aenrw": "instead", "\[afouv": "involved",
    "\;cfimno": "remains", "adfijknors": "generally", "\[acfkmnsvw": "described", "\;acflmns": "concentration", "\;acflmnsw": "administration",
    "fiklrv": "long", "cfiklrv": "along", "\;fsv": "cross", "\;cfsv": "across", "\;iklnw": "tension", "\;ciklnw": "attention",
    "\;aceijknv": "experience", "\;ceijknsv": "experience", "\;aceijnopv": "experiments", "acmsuv": "executive", "cflmnorv": "likely",
    "dlmnos": "quickly", "cdlnov": "weekly", "cflrv": "looking", "cdlm": "walking", "clmw": "talking", "\[cenprvw": "needed",
    "\[acmnpsvw": "decided", "\[cdmnpsvw": "divided", "ceglor": "magical", "fglor": "logical", "eglorw": "neurological",
    "egmnpruv": "motive", "cdmpuvw": "intuitive", "\;acmnsuvw": "decisive", "\;cgnruv": "adhesive", "fijkpru": "alternative",
    "\;cflnv": "region", "\'\;cflnv": "regions", "\;elmnv": "poison", "\;aclnv": "season", "\;cflnvw": "treason", "\;clnv": "essential",
    "\;lsu": "confidential", "ajns": "cancer", "anos": "cancel", "\;emnov": "policy", "\;enov": "poles", "cnpruvw": "theist",
    "mnpruvw": "atheist", "ikps": "can't", "aikps": "cannot", "cfos": "corral", "acfos": "central", "acfow": "central",
    "cfpsu": "craft", "acfpsu": "contrast", "cfnpsu": "contrast", "aciknv": "seen", "aciknsv": "scene",
    "acikn": "scene", "jmops": "culture", "cejmpvw": "future", "\[ceiknrvw": "indeed", "\;acdlmnw": "situation", "\;acdlmn": "situation",
    "efmnp": "pretty", "fiklmn": "ring", "afiklmnw": "string", "\;acikmnv": "signs", "\;acikmnsv": "science",
    "\;ceikor": "animals", "\;cdfgjns": "areas", "cfjnorv": "really", "aiknp": "sent", "fiknps": "cent",
    "afmn": "I have", "cmnrw": "that I", "acmnuy": "-safe", "acgmnu": "-safe"
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

  // process asterisk keys and S keys
  let sortLetters = function(text) { return text.split('').sort().join(''); }
  if (arrayToString.includes("h") || arrayToString.includes("t") || arrayToString.includes("y")) {
    arrayToString = arrayToString.replace(/h|t|y/, 'g');
    arrayToString = sortLetters(arrayToString);
  } else if (arrayToString.includes("q")) {
    arrayToString = arrayToString.replace('q', 'a');
    arrayToString = sortLetters(arrayToString);
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
