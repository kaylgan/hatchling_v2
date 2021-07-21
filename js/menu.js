// -------------------- select item from lessons menu, show lessons for rmenu items --------------------
function menuListener() {
  let items = document.querySelectorAll("#dropdown-content span");
  let narration = document.getElementById("narration");
  let vocabBox = document.getElementById("vocabBox");
  let index = -1, lessonTitleTop = 10, lessonTitleWidth = 300;

  /*
  lessons text and properties
  {text: "", left: 5, top: 5, width: 5, highlight: false, highlightElement: null, extraCode: "", lesson: "".split("")}
  added properties: greenKeysOn: [], greenKeysOff: []
  functions for extraCode are in lessonFormat.js
  functions for other properties are in this file, menu.js, towards the bottom
  */
  let narrationText = [
    {text: document.getElementById("tutorial").textContent, top: lessonTitleTop, width: lessonTitleWidth, extraCode: "enterToContinue",
    greenKeysOn: ["key-enter"]},
    {text: "Welcome to Hatchling, a web app to help you get used to stenography on a QWERTY keyboard.", greenKeysOff: ["key-enter"]},
    {text: "Use the ENTER key to move forward through each lesson. Use the BACKSPACE key to go backward. You can press these on your keyboard, or \
    you can tap them on the keyboard above.", greenKeysOn: ["key-enter", "key-backspace"]},
    {text: "Now that you know how to navigate, let's take a closer look at the qwerty keyboard above. You may have noticed that it has some unusual letters added to it.",
    highlight: true, highlightElement: document.getElementById("keyboard"), greenKeysOff: ["key-enter", "key-backspace"]},
    {text: "These are stenography machine letters overlaid on a typical keyboard."},
    {text: "Stenography differs quite a bit from traditional typing. At its core, however, it is still a process of quickly finding key positions."},
    {text: "These lessons have been designed to mimic typical qwerty keyboarding lessons in order to take advantage of this similarity."},
    {text: "This will hopefully help qwerty typists build muscle memory for steno key positions in a way that is familiar."},
    {text: "These lessons teach " + '<a href="https://www.openstenoproject.org" target="_blank">' + "\
    Plover Theory" + '</a>' +"."},
    {text: "However, they are meant to be completed without " + '\
    <a href="https://github.com/openstenoproject/plover/wiki/Installation-Guide#installation"\ target="_blank">' + "\
    Plover" + '</a>' + " or other steno software turned on."},
    {text: "The lessons should work with most normal keyboards, meaning ones that do not have n-key rollover (NKRO)."},
    {text: "Keyboards with n-key rollover are able to press a large number of keys at once without conflict.", extraCode: "hideSideView"},
    {text: "You will likely want to get an NKRO keyboard eventually. You can find a list of supported hardware \
    " + '<a href="https://github.com/openstenoproject/plover/wiki/Supported-Hardware"\ target="_blank">' + "\
    here" + '</a>' + ". But a regular keyboard is enough to get you through these lessons. \
    So let's start looking at hand positions.", extraCode: "showSideView"},
    {text: "If you type some letter keys, you will notice the hand images moving."},
    {text: "These hands show a very simplified representation of steno movements. They are much more rigid than real movements."},
    {text: "Just concentrate on placing your fingertips or thumb sides on the proper key or gap (which you will learn soon)."},
    {text: "You can see a video of how keyboard stenography actually \
    looks " + '<a href="https://www.youtube.com/watch?v=Il8DT_alCLk" target="_blank">' + "here" + '</a>' + "."},
    {text: "While qwerty keyboarding is based solely in the fingers, stenography incorporates the forearms into keypresses. This way, \
    the fingers don't have to press as hard, and there is less wrist strain as well."},
    {text: "For home row placement, the ends of the fingertips are placed on the gaps between keys.",
    highlight: true, highlightElement: document.getElementById("side-view"), extraCode: "readjustThumb"},
    {text: "The thumbs are turned on their sides, also above gaps.",
    highlight: true, highlightElement: document.getElementById("thumb-side"), extraCode: "adjustThumb"},
    {text: "Each finger can reach forward to press the top key (watch the hands move when you press ENTER) ...",
    highlight: true, highlightElement: document.getElementById("finger-side-tip"), extraCode: "readjustThumb"},
    {text: "Notice the movement on the full keyboard image, as well -- the teal represents a very simplified fingertip. \
    The grayish circles are just visual aids to help you see which keys are being pressed.",
    extraCode: "pointerForward"},
    {text: "Now, backwards movement." + '<br><br>' + '\
    <a href="https://www.artofchording.com/layout/chorded-keyboard.html#home-row" target="_blank">' + "\
    Here" + '</a>' + " are some useful images showing these positions.", extraCode: "pointerBackward"},
    {text: "The thumbs will move left and right to press keys, rather than forward and backward."},
    {text: "You will notice that some keys are duplicated on the keyboard. For instance, qwerty Q, A, and colon/semicolon \
    are all steno S's.", greenKeysOn: ["key-A", "key-Q", "key-colon"], extraCode: "hideSideView"},
    {text: "On a steno machine, the left-hand S's are combined into one long key. On a qwerty keyboard, you can use whichever one is easiest for the word \
    you are typing.", greenKeysOn: ["key-A", "key-Q"], greenKeysOff: ["key-colon"]},
    {text: "We will practice typing these different S's soon.", greenKeysOff: ["key-A", "key-Q"]},
    {text: "After you complete each exercise, you will see a message that says to type S-S to repeat the exercise. \
    This means press both S's at the same time. In other words ..."},
    {text: "press qwerty A + colon", greenKeysOn: ["key-A", "key-colon"]},
    {text: "or press qwerty Q + colon", greenKeysOn: ["key-Q", "key-colon"], greenKeysOff: ["key-A"]},
    {text: "Let's type our first key now. Take your left-hand pinky, and press either S key (qwerty Q or A).", lesson: ["S", "S", "S", "S", "S"],
    greenKeysOn: ["key-A", "key-Q"], greenKeysOff: ["key-colon"]},
    {text: "Now try using your right hand to type the third S key. In steno, right-hand consonants are designated with a dash preceding them. \
    So -S means right-hand S. Left-hand consonants are sometimes written with no dash (S). They may also be written with a dash afterwards (S-).",
    greenKeysOn: ["key-colon"], greenKeysOff: ["key-A", "key-Q"], lesson: ["-S", "-S", "-S", "-S", "-S"]},
    {text: "To summarize, S or S- means use the left hand. -S means use the right hand.",
    lesson: ["S", "-S", "S", "-S", "-S"], greenKeysOff: ["key-colon"]},
    {text: "See if you can type the word above.",
    lesson: ["S", "T", "A", "-R"], greenKeysOn: ["key-Q", "key-A", "key-W", "key-C", "key-J"]},
    {text: "When you start doing full stenography on your keyboard, you will press all of those keys at the same time."},
    {text: "If the following exercise does not work for you, skip it for now. We will discuss some keyboard limitations and a technique to work \
    around them."},
    {text: "See if you can type the word above. (Skip this for now if it is not working for you.)", highlight: true, highlightElement: document.getElementById("steno-order"),
    lesson: ["star"], extraCode: "clearPractice", greenKeysOn: ["key-Q", "key-A", "key-W", "key-C", "key-J"]},
    {text: "Some non n-key rollover keyboards may not output STAR correctly, but there is a workaround."},
    {text: "We will practice this workaround in the next few exercises."},
    {text: "Try these exercises even if your keyboard was able to type STAR. If you have a typical keyboard, you will likely need \
    the following technique later on in these lessons."},
    {text: "Press S. While still pressing S, press T. Then release only S. Then release T.", lesson: ["st", "st", "st", "st"],
    greenKeysOn: ["key-Q", "key-A", "key-W", "key-C", "key-J"]},
    {text: "Do the same thing this time, but keep holding T. Then ..." + '<br>' + "\
    While still pressing T, press A. Then release only T. Then release A.", lesson: ["sta", "sta", "sta", "sta"],
    greenKeysOn: ["key-Q", "key-A", "key-W", "key-C", "key-J"]},
    {text: "Do the same thing once more (S to T, T to A). But this time do A to -R as well.", lesson: ["star", "star", "star", "star"],
    greenKeysOn: ["key-Q", "key-A", "key-W", "key-C", "key-J"]},
    {text: "This technique is a simplified version of " + '<a href="http://plover.stenoknight.com/2011/02/plover-211-released.html" \
    target="_blank">' + "arpeggiating" + '</a>' + " keys. The more advanced form of arpeggiating \
    involves pressing 2-3 keys at a time instead of just one.", greenKeysOff: ["key-Q", "key-A", "key-W", "key-C", "key-J"]},
    {text: "Arpeggiating is much less efficient than pressing all the keys at once, \
    but it works well enough until you are ready to get an n-key rollover keyboard."},
    {text: "So just what was this bar here, anyway? This shows steno order. This is the order that keys are processed and output by steno software.",
    top: lessonTitleTop-15, highlight: true, highlightElement: document.getElementById("steno-order")},
    {text: "For each stroke of keys you type, the keys will be output from left to right and top to bottom. If you press a left-hand S and a left-hand \
    T, they will always be output as ST, not TS."},
    {text: "Likewise, if you press T- and K-, you will get TK but not KT."},
    {text: "Left-hand keys precede vowel keys in a stroke, and vowels precede right-hand keys."},
    {text: "This is the reason you may have gotten 'STRA' instead of 'STAR' if you accidentally typed a left-hand R in \
    the exercise earlier. The left-hand R is processed before vowels, while the right-hand R is processed after vowels."},
    {text: "If you ever want to clear the steno order highlights, just press SPACE."},
    {text: "Here is a mnemonic for remembering steno order consonants: STicK PaW HeRe FoR Peanut Butter. LarGe ToeS DoZe 🐕 (modified \
    from " + '<a href="https://github.com/openstenoproject/plover/wiki/Stenotype-Mnemonics-for-Beginners-(English)" \
    target="_blank">' + "here" + '</a>' + ")."},
    {text: "Last, we have this little drum button. Press this to toggle back and forth between the keyboard and a metronome view.",
    lesson: ["S", "-S", "S", "-S", "S"]},
    {text: "With the metronome, you can practice the current exercise at a target strokes/minute.", lesson: ["S", "-S", "S", "-S", "S"]},
    {text: "The strokes per minute will not always match the words per minute - punctuation \
    and multiple strokes per word will mean a slower WPM if you type everything on the beat.", highlight: true,
    highlightElement: document.getElementById("hide-button"), lesson: ["S", "-S", "S", "-S", "S"]},
    {text: "If you click the BPM slider, you can use the left and right arrow keys to fine-tune the BPM setting."},
    {text: "The metronome beat and moving highlight will repeat until you type all of the words. This allows for a bit of flexibility so that you \
    can make mistakes without having to start the entire exercise over.", lesson: ["S", "-S", "S", "-S", "S"]},
    {text: "You can still use S-S to restart an exercise while you are in metronome view.", lesson: ["S", "-S", "S", "-S", "S"]},
    {text: "You can also double click any word box below the metronome. This allows you to remove words you don't need to practice. S-S restores all \
    of the original words.", lesson: ["S", "-S", "S", "-S", "S"]},
    {text: "Don't worry if you don't remember everything we have covered in this lesson. Don't worry if it looks like you cannot possibly write words like \"water\". \
    These things will be reinforced and explained in the upcoming lessons."},
    {text: "Press ENTER to go to the next lesson!"},
    {text: document.getElementById("lesson1").textContent, top: lessonTitleTop, width: lessonTitleWidth, extraCode: "enterToContinue"},
    {text: "The left pinky is in charge of the S keys.", greenKeysOn: ["key-Q", "key-A"]},
    {text: "On a steno machine, the S's are combined into one big key.", greenKeysOn: ["key-Q", "key-A"]},
    {text: "You can use whichever S key you want. You might find that the top S is easier for some words, and the bottom S is easier for others.",
    greenKeysOn: ["key-Q", "key-A"]},
    {text: "We will practice this next. At the end of the typing exercise, you can type S-S if you want to repeat the exercise.",
    greenKeysOn: ["key-Q", "key-A", "key-colon"]},
    {text: "This means press a left-pinky S (qwerty Q or qwerty A) and a right-pinky S (qwerty colon/semi-colon) at the same time.",
    greenKeysOn: ["key-Q", "key-A", "key-colon"]},
    {text: "You can also press S-S to restart the exercise at any point.", greenKeysOn: ["key-Q", "key-A", "key-colon"]},
    {text: "You can skip any exercise at any time by hitting ENTER.", greenKeysOn: ["key-enter"], greenKeysOff: ["key-Q", "key-A", "key-colon"]},
    {text: "Give it a try.", lesson: ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    greenKeysOn: ["key-Q", "key-A"], greenKeysOff: ["key-enter"]},
    {text: "The right pinky is in charge of four keys: -T, -S, -D, and -Z.",
    greenKeysOn: ["key-P", "key-colon", "key-lbrace", "key-quote"], greenKeysOff: ["key-Q", "key-A"]},
    {text: "Recall that right-hand consonants are designated with a dash before them (e.g. -S).",
    greenKeysOn: ["key-U", "key-J", "key-I", "key-K", "key-O", "key-L", "key-P", "key-colon", "key-lbrace", "key-quote"]},
    {text: "This is the case unless they are in a word like STAR. In that case, only one R (the right one) can come after \
    A in steno order, so the dash is not necessary.",
    greenKeysOn: ["key-U", "key-J", "key-I", "key-K", "key-O", "key-L", "key-P", "key-colon", "key-lbrace", "key-quote"]},
    {text: "Left-hand consonants are occasionally designated with a dash afterwards (S-), especially \
    if they are followed by a right-hand letter but no vowel.",
    greenKeysOn: ["key-Q", "key-A", "key-W", "key-S", "key-E", "key-D", "key-R", "key-F"],
    greenKeysOff: ["key-U", "key-J", "key-I", "key-K", "key-O", "key-L", "key-P", "key-colon", "key-lbrace", "key-quote"]},
    {text: "Try reaching your right pinky to each key while keeping your other fingers close to home position.",
    extraCode: "rightPinkies", greenKeysOn: ["key-P", "key-colon", "key-lbrace", "key-quote"],
    greenKeysOff: ["key-Q", "key-A", "key-W", "key-S", "key-E", "key-D", "key-R", "key-F"]},
    {text: "Now we will review all of the pinky keys. Remember that S is the left S, and -S is the right S.",
    extraCode: "pinkyLessons", greenKeysOn: ["key-Q", "key-A", "key-P", "key-colon", "key-lbrace", "key-quote"]},
    {text: "Time for your first briefs! In stenography, most words are written based on how they sound (phonetically). Briefs are shortened forms for \
    words. So, instead of typing out something like IS for \"is\", \
    you can just type S.", vocab: ["is: S"], lesson: ["is", "S", "is", "is", "S"],
    greenKeysOff: ["key-Q", "key-A", "key-P", "key-colon", "key-lbrace", "key-quote"]},
    {text: "You can click on a word in the vocab box to move the hands above to the corresponding keys.", highlight: true,
    highlightElement: document.getElementById("notebook-paper"), vocab: ["is: S"]},
    {text: "You can also click on a word in the practice drill to move the hands.", highlight: true,
    highlightElement: document.getElementById("practice"), lesson: ["is"]},
    {text: "Note that S, but not -S, is a brief."},
    {text: "If you just type -S in a word processor with your steno software on, it will likely output \"es\". This is \
    because -S is used to make words plural. It will add \"s\" or \"es\" to words, whichever is appropriate."},
    {text: "-Z is also used to output \"s\" or \"es\" to make other words plural (such as those already ending in \"s\")."},
    {text: "-D serves a similar purpose. It adds \"ed\" to words to make them past tense."},
    {text: "You can use these endings with a word you type, or right after."},
    {text: "For instance, you can type \"stars\" in one stroke, STARS."},
    {text: "Or you can type \"stars\" in two strokes, STAR\/-S. This means type STAR, release the keys, then type -S. The strokes are separated by \
    the forward slash."},
    {text: "We know that S is a brief, but -S, -D, and -Z are not. -T is another brief. If you type it, your steno software will output \"the\".",
    vocab: ["the: -T"], lesson: ["the", "-T", "the", "the", "-T"]},
    {text: "Now we will practice some briefs and do a little bit of letter review as well.",
    extraCode: "pinkyLessonsBriefs"},
    {text: "And, for extra credit ... You haven't been formally introduced to all of these letters, but you have typed them if you \
    did the tutorial. Give these a try.", vocab: ["star: STAR", "stars: STARS", "starred: STARD"],
    lesson: ["S", "T", "A", "-R", "star", "stars", "starred"]},
    {text: "Take one more look at this \"stars\" vocab list. The added words, written with a \"~\", are included to teach theory only.",
    vocab: ["star: STAR", "stars: STARS", "~(or STAR\\-S)", "starred: STARD", "~(or STAR\\-D)"]},
    {text: "That is, we will usually not practice them in these exercises. These theory words just show other ways to type the same \
    words (usually with more strokes). Using more strokes can sometimes make it easier to type complicated words.",
    vocab: ["star: STAR", "stars: STARS", "~(or STAR\\-S)", "starred: STARD", "~(or STAR\\-D)"],
    lesson: ["star", "-S", "star", "-D", "star", "-S", "star", "-D"]},
    {text: document.getElementById("lesson2").textContent,  top: lessonTitleTop, width: lessonTitleWidth},
    {text: "This lesson will focus on vowels. To begin, let's practice the keys.", greenKeysOn: ["key-C", "key-V", "key-N", "key-M"],
    extraCode: "vowelKeys"},
    {text: "Where is the I key, you ask? There isn't one. Instead, you press the E and U keys together. To do this, place your thumb over \
    the gap between the two keys.", greenKeysOn: ["key-N", "key-M"], greenKeysOff: ["key-C", "key-V"],
    lesson: ["E", "U", "I", "E", "U", "I", "I", "I", "I", "I"]},
    {text: "Let's practice these a little more.", greenKeysOff: ["key-N", "key-M"], extraCode: "vowelKeys2"},
    {text: "When you press a vowel key by itself, you get the short vowel sounds, such as in \
    sat, set, sit, sod, and suds.",
    vocab: ["sat: SAT", "set: SET", "sit: SEUT", "sod: SOD", "suds: SUDZ"], extraCode: "preShortVowels"},
    {text: "Now, press S, A, and T all at once (arpeggiate if you need to). To press -DZ in \"suds\", center your pinky \
    over the gap between the -D and -Z.",
    vocab: ["sat: SAT", "set: SET", "sit: SEUT", "sod: SOD", "suds: SUDZ"], greenKeysOn: ["key-lbrace", "key-quote"], extraCode: "shortVowels"},
    {text: "Why is \"suds\" written with a -Z at the end instead of an -S? \
    If we used an -S, we would have written SUSD (\"sussed\") since -S is before -D in steno order. \
    This is why we use -Z to add -s or -es to words ending in -D.", greenKeysOff: ["key-lbrace", "key-quote"],
    lesson: ["suds", "stars", "suds", "stars", "suds", "suds", "stars"]},
    {text: "Similarly, to add -s or -es to words that already end in -S, we use -Z. Again, to press two keys at once, \
    focus on centering your finger (your pinky in this case) over the gap between the keys.",
    vocab: ["suss: SUS", "susses: SUSZ"], greenKeysOn: ["key-colon", "key-quote"], lesson: ["suss", "suss", "susses", "suss", "susses", "susses"]},
    {text: "If you did the tutorial, you saw that we use -D to add -ed. It can be a little tricky to type -S and -D \
    together, but give it a try. Try to press the top-right corner of -S and the bottom-left corner of -D (without \
    pressing the corners of -T and -Z).", greenKeysOn: ["key-lbrace", "key-colon"], greenKeysOff: ["key-quote"],
    vocab: ["sussed: SUSD"], lesson: ["sussed", "sussed", "sussed"]},
    {text: "Do you remember that words with a \"~\" are included to teach theory and sometimes show easier strokes? \
    This is an example of a word that may be easier to type in two strokes.", greenKeysOff: ["key-lbrace", "key-colon"],
    vocab: ["sussed: SUSD", "~(or SUS\\-D)"], lesson: ["suss", "-D", "suss", "-D"]},
    {text: "Now we will look at long vowel sounds, such as in say, seed, sight, sow (like sow seeds), and suit."},
    {text: "To form these, press the letter key for the vowel, then add in all the thumb keys of the opposite thumb. \
    So long A (this will be shown as \"Ā\" in exercises) is AEU, long E (Ē) is AOE, long I (Ī) is AOEU, and long U (Ū) is AOU."},
    {text: "You may need to arpeggiate these on a non-NKRO keyboard. (E.g. for Ā, press A. Without releasing A, press E. \
    Release A while still holding E. Then press U while still holding E. Release all keys, and you should see AEU highlighted in the steno \
    order bar.)", extraCode: "longVowelKeys"},
    {text: "Long O (Ō) is the only exception -- you will press OE to make a long O sound.", extraCode: "longVowelKeys2"},
    {text: "We will learn more about why O doesn't follow the rules soon. For now, let's practice the long vowel \
    sounds.", vocab: ["say: SAEU", "seed: SAOED", "sight: SAOEUT", "sow: SOE", "suit: SAOUT"], extraCode: "preLongVowels"},
    {text: "We will learn more about why O doesn't follow the rules soon. For now, let's practice the long vowel \
    sounds.", vocab: ["say: SAEU", "seed: SAOED", "sight: SAOEUT", "sow: SOE", "suit: SAOUT"], extraCode: "longVowels"},
    {text: "Once you get used to arpeggiating with one key at a time, try two or three keys at a time. Depending on your keyboard and \
    the word you are typing, you may even be able to press all the left-hand keys at once followed by all the right-hand keys."},
    {text: "For instance, try arpeggiating \"sight\" by pressing SAO (all keys at once). Continue pressing SAO down, then press EUT all at once. \
    Then release all the keys.",
    lesson: ["sat", "say", "set", "seed", "sit", "sight", "sod", "sow", "suds", "suit"]},
    {text: "We will revisit that pesky O now. The chord that should be a long O, OEU, is instead reserved for \"oy\" sounds, like \
    in soy.", vocab: ["soy: SOEU"], lesson: "soy soy soy soy soy".split(" ")},
    {text: "We have another set of keys, AO, for \"oo\", like in soot.", vocab: ["soot: SAOT"], lesson: "soot soot soot soot soot".split(" ")},
    {text: "AO is also used to distinguish between homophones. Rode is ROED, while road is RAOD. We will practice these R- words even though we haven't learned the R- key. Use the left-hand R. \
    (Note that you may need to arpeggiate single keys for \"road\" since the keys are close together.)",
    vocab: ["road: RAOD", "rode: ROED"],
    lesson: ["soot", "road", "soot", "road", "rode", "road", "rode", "rode", "road", "soot"]},
    {text: "Similarly, AE is used for homophones like see (SAOE) and sea (SAE). The word containing \"ea\" gets the EA."},
    {text: "If neither word contains \"ea\", e.g. sail and sale, the one that contains \"a\" and \"e\" would get the AE (sale, in this case).",
    vocab: ["see: SAOE", "sea: SAE"], lesson: ["see", "see", "sea", "sea", "see", "sea", "see", "sea"]},
    {text: "Another combo is AU, used for aw-sounds like in saw (SAU).", vocab: ["saw: SAU"], lesson: "saw saw saw saw saw".split(" ")},
    {text: "Notice that \"sod\" was written SOD, not SAUD, even though you \
    might say the vowel sounds the same. The aw-words are often spelled with \"au\"/\"aw\", like \"laud\" and \"law\"."},
    {text: "We tend to use spelling when a singleton vowel -- one with no vowels right next to it -- makes a short sound (e.g. \"sod\" as SOD). Otherwise, we \
    write words phonetically\
    (" + '<em><a href="https://sites.google.com/site/learnplover/lessons-1-fingers-and-keys#TOC-Rules-For-Short-Vowel-Sounds" target="_blank">' + "Learn Plover!" + '</a></em>' + ")."},
    {text: "Just remember that Single Short = Spelling (SSSpell)."},
    {text: "The word \"learn\" has two vowels next to each other, \"ea\". So we write this word phonetically (using the E key since we have a short \"e\" sound)."},
    {text: "What about \"hurt\"? That vowel sounds like the one in \"learn\", so we use an E, right? No. Remember, it is a Single vowel \
    making a Short sound, so we use Spelling (the U key)."},
    {text: "What about \"heart\", then? Multiple vowels means write it phonetically. This \"ea\" makes a short \"a\" sound (so use the A key)."},
    {text: "Sometimes we have vowels next to letters that modify the vowel sound (these pairs are often diphthongs). Some examples are w/y/h in now/nay/nah. \
    We saw this before with \"saw\" and \"soy\". We write such words phonetically."},
    {text: "One last sound combination we need to learn is OU, used for ow-sounds like in out. Words with this sound will usually have \
    an \"ou\" (ouch) or \"ow\" (now).",
    vocab: ["out: OUT"], lesson: "out out out out out".split(" ")},
    {text: "Note that for words beginning with out- the prefix AOUT is used, rather than the chord OUT. This helps keep words together \
    -- e.g. outset instead of out set. (This is known as a word boundary error.)"},
    {text: "When we practice prefixes and suffixes in these lessons, they will often be broken up into strokes."},
    {text: "That is, you will see \"out-\" and \"set\" for \"outset\" instead of just \"outset\". If you see \
    one box, you will need to use one stroke. If you see multiple boxes, you will need that number of strokes.",
    affix: ["AOUT: out-"], lesson: "out- out- out- out- out-".split(" ")},
    {text: "Let's review.",
    vocab: ["soy: SOEU", "soot: SAOT", "rode: ROED", "road: RAOD", "sea: SAE", "see: SAOE", "saw: SAU",
    "out: OUT", "outset: AOUT/SET"], extraCode: "oVowels"},
    {text: "That's enough vowel practice for now. Let's move on to a new lesson."},
    {text: document.getElementById("sentences1").textContent,  top: lessonTitleTop, width: lessonTitleWidth},
    {text: "We will learn a little bit of punctuation now. We haven't met all of these keys yet, but we will get better \
    acquainted with them later. Click on an entry in the vocab box if you are unsure how to type something.",
    vocab: ["\.: TP-PL", "\,: KW-BG", "\-: H-PB"]},
    {text: "Don't forget -- you can also click on a word in the practice drill to see the hand position for that word.", highlight: true,
    highlightElement: document.getElementById("practice"), vocab: ["\.: TP-PL", "\,: KW-BG", "\-: H-PB"], lesson: [".", ",", "\-"]},
    {text: "Note that these are all single chords. The hyphen between letters is for clarity. It indicates left-hand keys not followed by a vowel.",
    vocab: ["\.: TP-PL", "\,: KW-BG", "\-: H-PB"], lesson: [".", ".", ".", ",", ",", ",", "\-", "\-", "\-"]},
    {text: "You won't have to worry about typing spaces. Steno software adds them automatically. When you type with steno software, you will just \
    focus on typing words, just like in these exercises."},
    {text: "EU SAOE TP-PL", vocab: ["I: EU", "\.: TP-PL"], lesson: ["I", "see", "."]},
    {text: "EU SAEU KW-BG -T SAOE H-PB SAU EU ROED S- SO STARD TP-PL", vocab: ["\.: TP-PL", "\,: KW-BG", "\-: H-PB", "I: EU", "so: SO"],
    lesson: ("I say , the see - saw I rode is so starred .").split(" "), full: true},
    {text: "U SET -T SOD TP-PL U SEUT TP-PL U SOE SAOEDZ TP-PL", vocab: ["you: U"],
    lesson: ("You set the sod . You sit . You sow seeds .").split(" "), full: true},
    {text: "EU SAOE U SAU -T SAE SUDZ TP-PL", lesson: ("I see you saw the sea suds .").split(" "), full: true},
    {text: "-T AOEU SAU AEU SAOEUT TK-RB RODZ ROED -T RAOD TP-PL", vocab: ["eye: AOEU", "a: AEU", "(the word, not the letter)", "--: TK-RB", "rods: RODZ"],
    lesson: ("The eye saw a sight -- rods rode the road .").split(" "), full: true},
    {text: "-T SAOT SEUTS KW-BG -T RAOT ROTS TP-PL", vocab: ["root: RAOT", "rots: ROTS"], lesson: ("The soot sits , the root rots .").split(" "),
    full: true},
    {text: "-T SOEU SAOUT S- AEU SAOEUT TP-PL", lesson: ("The soy suit is a sight .").split(" "), full: true},
    {text: document.getElementById("lesson3").textContent, top: lessonTitleTop, width: lessonTitleWidth},
    {text: "The left ring finger is in charge of T and K. By pressing T and K together, we get the letter D.",
    greenKeysOn: ["key-W", "key-S"], extraCode: "leftRing"},
    {text: "Each of these letters, in turn, also functions as a brief.", vocab: ["it: T", "can: K", "did: TK"], greenKeysOn: ["key-W", "key-S"],
    extraCode: "leftRing2"},
    {text: "We mentioned in earlier lessons that stenography is phonetic, so any words starting with a \"k\" \
    sound will use the K key.", greenKeysOn: ["key-S", "key-C", "key-P"], greenKeysOff: ["key-W"],
    vocab: ["cat: KAT"], lesson: ["K", "A", "-T", "cat", "K", "A", "-T", "cat"]},
    {text: "For the right ring finger, we have -L and -G.", greenKeysOn: ["key-O", "key-L"], greenKeysOff: ["key-S", "key-C", "key-P"],
    extraCode: "rightRing"},
    {text: "G is also used to add -ing to the ends of words.", affix: ["-ing: -G"],
    vocab: ["seeing: SAOEG", "~(or SAOE\-G)"], greenKeysOn: ["key-O", "key-L"],
    lesson: ["see", "-G", "seeing", "seeing", "seeing", "see", "-G"]},
    {text: "-LG is used for words that end in -lge and -lch (we will practice these words in the Middles lesson). \
    We would normally want to use -LJ to make the phonetic -lge sound. However, -J keys overlap with -L, as we will see later.",
    affix: ["-lch, -lge: -LG"], greenKeysOn: ["key-O", "key-L"], extraCode: "rightRing2"},
    {text: "Let's practice these letters in a few new words.",
    vocab: ["call: KAUL", "kale: KAEUL", "tug: TUG", "dig: TKEUG", "dial: TKAOEUL", "tile: TAOEUL"],
    greenKeysOff: ["key-O", "key-L"], extraCode: "rightRingReview"},
    {text: "Do you remember that we mentioned \"sale\" vs \"sail\" in the pinkies lesson? Let's practice them now that we have -L. \
    Here, we use an AE in \"sale\", since it has an \"a\" and \an \"e\".",
    vocab: ["sale: SAEL", "sail: SAEUL"], lesson: ["sale", "sale", "sail", "sail", "sale", "sail", "sale", "sail"]},
    {text: "Now we will learn a few principles of Plover Theory that are used for fitting words into fewer strokes."},
    {text: "The first principle is dropping unstressed vowels."},
    {text: "When we look at word stress, we are looking at which syllable is stated with most emphasis."},
    {text: "This is commonly used for words that have more than one syllable."},
    {text: "If a word has just one syllable, it does not have word stress (so it does not have stressed or unstressed vowels)."},
    {text: "For multi-syllable words, we can look at word stress to determine which vowels are stressed. If the syllable is stressed, its vowels are stressed. \
    If the syllable is unstressed, its vowels are unstressed."},
    {text: "Generally, vowels that are pronounced like \
    \"uh\" (" + '<a href="https://blog.allaboutlearningpress.com/schwas/" target="_blank">' + "schwa sound" + '</a>' + ") are \
    unstressed. For instance, banana is often spoken as buh-na-nuh, " + '\
    <a href="https://pronuncian.com/intro-to-schwa" target="_blank">' + "\
    with the first and third a's unstressed" + '</a>' + "."},
    {text: "In dictionaries, word stress is often indicated with a stress mark, which looks like a single quote. For instance, \
    banana would look like ba-\'na-na, with a single quote (\') before the second syllable."},
    {text: "Unstressed vowels will often appear with a schwa symbol, which looks like an upside down \"e\"."},
    {text: "Consider the word \"islet\" (pronounced EYE+let). The \"i\" sound is stressed. The \"e\" sound in the second syllable is unstressed, \
    so we can drop that vowel (EYE+lt). This allows us to type this word in just one stroke.", vocab: ["islet: AOEULT"],
    lesson: ["islet", "islet", "islet", "islet"]},
    {text: "We have technically been dropping unstressed syllables when we've written -ed as -D, and when we've written -es as -S."},
    {text: "Now we will learn another principle for writing words with steno. This principle is called inversion."},
    {text: "Every once in a while, you can bend the application of steno order just a teensy bit so you can fit a word into \
    fewer strokes. If two sounds are adjacent in a chord, but are out of steno order, you can swap their order."},
    {text: "Inversion is meant to be used\
    " + '<a href=https://sites.google.com/site/learnplover/lessons-2-steno-order#TOC-Inversion" target="_blank">' + "\
    only once per word" + '</a>' + ", and only if the result does not conflict with an existing word."},
    {text: "Consider the word \"decide\". We could write this in two strokes as TKE/SAOEUD or TKAOE/SAOEUD."},
    {text: "If we look up \"decide\" in a dictionary, we see that the last syllable is stressed (de-SAHYD)."},
    {text: "Remember that unstressed syllables have unstressed vowels. The first syllable in de-SAHYD is unstressed. So the vowel \
    in that syllable (\"e\") is unstressed."},
    {text: "We can drop the unstressed \"e\" in TKE/SAOEUD or TKAOE/SAOEUD \
    to get TK/SAOEUD. S and TK are adjacent, so we can invert them to get STKAOEUD.",
    vocab: ["decide: STKAOEUD", "~(or TKE/SAOEUD)", "~(or TKAOE/SAOEUD)"], lesson: ["decide", "decide", "decide", "decide", "decide"]},
    {text: "Now consider the word \"setting\". We could write SET/-G. But there are just four keys here. Can we fit this into \
    a single stroke somehow? Perhaps we can use inversion?"},
    {text: "We can invert the T and -G to get SEGT. This is called \"folding in\" the ending. We will learn more about this in later lessons.",
    vocab: ["setting: SEGT", "~(or SET/-G)", "calling: KAULG", "kidding: KEUGD"], lesson: ["setting", "set", "-G", "setting", "set", "-G",
    "calling", "kidding", "setting", "kidding", "calling", "kidding", "setting", "setting"]},
    {text: "Time for more practice. Here, the word \"use\" can be written either phonetically (AOUZ) or based on spelling (AOUS)." + '<br><br>' + "\
    -T TKOG SAEUD TO US T- KO AOUZ AEU TKAEU OUT TP-PL",
    vocab: ["dog: TKOG", "said: SED", "said: SAEUD", "(say was SAEU)", "to: TO", "us: US", "could: KO", "use: AOUS", "use: AOUZ", "day: TKAEU"],
    lesson: ("The dog said to us it could use a day out .").split(" "), full: true},
    {text: "T-S AS KOELD AS AOEUS OUDZ TP-PL",
    vocab: ["it's: T-S", "as: AS", "as: AZ", "cold: KOELD", "ice: AOEUS", "outside: OUDZ"],
    lesson: ("It's as cold as ice outside .").split(" ")},
    {text: "AE is used to distinguish between the homophones in this sentence. Tale has an A and E in it, and tail does not, \
    so tale is the one that is mapped to AE.",
    vocab: ["sagged: SAGD", "its: EUTS", "tail: TAEUL", "at: AT", "sad: SAD", "tale: TAEL"],
    lesson: ("The dog sagged its tail at the sad tale .").split(" "), full: true},
    {text: "We will use some new punctuation in the next exercise. Like in the sentences lesson, we haven't formally used these letters. \
    Give it a try anyway. Click the vocab box and compare your finger positions to the keyboard above, if necessary."},
    {text: "To type -TD, place your pinky on the gap between -T and -D. Normally, fingers stay in their own columns. \
    The right pinky is an exception since it has to press two columns of keys. The pointers will also cross columns to press \
    asterisks, as we will see soon enough.",
    vocab: ["\": KW-GS", "(^ opening quotation)", "it'd: EUTD", "ill: EUL", "ease: AOES", "I'll: AOEUL", "stay: STAEU", "\": KR-GS",
    "(^ closing quotation)"],
    lesson: ["\"", "It'd", "set", "you", "ill", "at", "ease", ".", "I'll", "stay", "\,", "\" ", "the", "dog", "said", "."],
    full: true},
    {text: "KW-GS SAOE AUL -T AOEUS KW-PL AOEUL DO SKAEUGT TP-BG KR-GS -T TKOG KAULD TP-PL",
    vocab: ["all: AUL", "do: DO", "skating: SKAEUGT", "called: KAULD", "?: KW-PL", "!: TP-BG"],
    lesson: ["\"", "See", "all", "the", "ice", "?", "I'll", "do", "skating", "!", "\" ", "the", "dog", "called", "."], full: true},
    {text: "In this last sentence, Plover will actually output" + '<br><br>' + "\"See all the ice? I'll do skating!\" The dog called."},
    {text: "To fix this (\"The\" should be uncapitalized), we will need the asterisk key. We will learn this in the Pointers lesson."},
    {text: document.getElementById("lesson4").textContent, top: lessonTitleTop, width: lessonTitleWidth},
    {text: "Moving on to the middle finger keys, we have P and W for the left hand. Pressed together, the P and W keys produce B.",
    affix: ["be-: PWE"], vocab: ["about: PW", "with: W", "bee: PWAOE"], greenKeysOn: ["key-E", "key-D"], extraCode: "leftMiddle"},
    {text: "Let's quickly revisit the -lge suffix (-LG) we had before. Now that we have PW-, we can type a few words with the -lge ending.",
    affix: ["-lch, -lge: -LG"], vocab: ["bilge: PWEULG", "bulge: PWULG"], greenKeysOff: ["key-E", "key-D"],
    lesson: ["bilge", "bilge", "bulge", "bulge", "bilge", "bulge"]},
    {text: "Recall that the -LG suffix is also used for -lch endings.", affix: ["-lch, -lge: -LG"], vocab: ["squelch: SKWELG", "belch: PWELG"],
    lesson: ["belch", "squelch", "squelch", "belch", "belch"]},
    {text: "For the right hand, we have -P and -B. We get -N when they are pressed together.",
    vocab: ["an: -N", "be: -B", "being: -BG", "can be: K-B", "between: PWE/TWAOEPB", "(or TWEPB)"], extraCode: "rightMiddle",
    greenKeysOn: ["key-I", "key-K"]},
    {text: "Now that we have the P key, we can write the brief for \"and\", SKP (all left keys). This is not derived from dropping unstressed vowels \
    or from inversion. It is just a simple key combination since \"and\" is a frequently used word.", greenKeysOff: ["key-I", "key-K"],
    vocab: ["and: SKP"], lesson: "and and and and and".split(" ")},
    {text: "We can combine this with other keys to make many short phrases. \
    The vocab list shows a handful of examples.",
    vocab: ["and I: SKPEU", "and you: SKPU", "and a: SKPA", "and the: SKP-T", "and I can: SKPEUBG"],
    lesson: ["and", "and I", "and you", "and a", "and the", "and I can"]},
    {text: "We can make some similar phrases using \"it\".",
    vocab: ["it was: TWAS", "it wasn't: TWAEPBT", "it would: T-LD", "it can: T-BG", "it could: T-BGD", "it'll: T-L", "it has: T-Z", "-ing it: T-G"],
    lesson: ["it was", "it wasn't", "it would", "it can", "it could", "it'll", "it has", "see", "-ing it"]},
    {text: "The middle fingers are also used in typing a few other new letters. For the left hand, TP is F, KW is Q, TKPW is G, \
    and KP is X. If you are arpeggiating, try two keys at once for G (TK then PW).", extraCode: "middleLettersLeft"},
    {text: "Notice that the keys for Q (KW) happen to be a phonetic \"q\"-sound. You may have noticed this in the word \"squelch\" earlier."},
    {text: "We have some new briefs for these keys.", vocab: ["if: TP", "go: TKPW", "examine: KP", "request: KW"],
    lesson: ["if", "if", "if", "go", "go", "go", "examine", "examine", "examine", "request", "request", "request"]},
    {text: "For the right hand, -PL is -M, -BG is -K, -BGS is -X (think -KS to help you remember this), and -PBLG is -J.",
    extraCode: "middleLettersRight"},
    {text: "Time to review! Let's start with the left hand.", extraCode: "middleLettersReviewLeft"},
    {text: "Now we will review the right-hand letters.", extraCode: "middleLettersReviewRight"},
    {text: "Next, let's review all the letters we have learned on both hands.", extraCode: "middleLettersReviewAll"},
    {text: "Now we will practice some more sentences.",
    vocab: ["some: SOPL", "good: TKPWAOD", "people: PAOEPL", "only: OEPBL", "want: WAPBT", "time: TAOEUPL"],
    lesson: "Some good people only want time .".split(" ")},
    {text: "PWUT KW-BG PWEU -T WAEU KW-BG WE WO TAEUBG TWO BAUS WE WAPBT TO TP-PL",
    vocab: ["but: PWUT", "by: PWEU", "way: WAEU", "we: WE", "would: WO", "take: TAEUBG", "two: TWO", "because: BAUS", "(or BAUZ)"],
    lesson: "But , by the way , we would take two because we want to .".split(" "), full: true},
    {text: "KOPL OPB PWABG SKP TKPWET WUPB TP-PL",
    vocab: ["come: KOPL", "on: OPB", "back: PWABG", "get: TKPWET", "(or TKPW-T)", "one: WUPB"],
    lesson: "Come on back and get one .".split(" ")},
    {text: "WEU WO U PWAOEU KW-PL WEU WO -B TKPWAOD KW-PL",
    vocab: ["which: WEU", "buy: PWAOEU"],
    lesson: "Which would you buy ? Which would be good ?".split(" "), full: true},
    {text: "WEL KW-BG S- T- AOEPB S-G U WAPBT KW-PL SKP S-G ELS UP OPB TOP TAO KW-PL",
    vocab: ["well: WEL", "even: AOEPB", "something: S-G", "else: ELS", "up: UP", "top: TOP", "too: TAO"],
    lesson: "Well , is it even something you want ? And something else up on top too ?".split(" "), full: true},
    {text: "Here are a few new suffixes.",
    affix: ["-shun: -GS", "(e.g. -tion, -sion)", "-kshun: -BGS", "-ment: -PLT"],
    vocab: ["station: STAEUGS", "section: SEBGS", "cement: SEPLT", "(or SAOEPLT)"],
    lesson: ["station", "section", "cement", "section", "cement", "station", "station", "section", "section", "cement"]},
    {text: "Just a few more affixes, then we will move on to the pointers.",
    affix: ["-nge: -PBG", "im-: EUPL", "ent-/int-: SPW"],
    vocab: ["sponge: SPOPBG", "possible: POB", "impossible: EUPL/POB",
    "I'm: AOEUPL", "entice: SPWAOEUS", "intact: SPWABGT"],
    extraCode: "middleAffixes"},
    {text: document.getElementById("lesson5").textContent, top: lessonTitleTop, width: lessonTitleWidth},
    {text: "For our last pair of fingers, we will finally introduce those bizarre asterisks in the middle of the keyboard.",
    greenKeysOn: ["key-T", "key-G", "key-Y", "key-H"]},
    {text: " On a steno machine, there is just one long key for the asterisk, kind of like the left S key. Normally, the right index finger \
    is in charge of the asterisk.", greenKeysOn: ["key-T", "key-G", "key-Y", "key-H"]},
    {text: "However, it is acceptable to use whichever index finger feels suitable for the word you are trying to write.",
    greenKeysOn: ["key-T", "key-G", "key-Y", "key-H"]},
    {text: "The asterisk also allows you to delete the last stroke that was output. In addition, it can be used to distinguish between \
    homophones or other chords that have the same keys.", greenKeysOn: ["key-T", "key-G", "key-Y", "key-H"]},
    {text: "We will not be doing any deleting in these lessons, but we will use the asterisk to distinguish chords.",
    greenKeysOn: ["key-T", "key-G", "key-Y", "key-H"]},
    {text: "Before we practice using the asterisk, let's take a look at the other letters for the index fingers. The left index finger controls the \
    H and R keys. Combined, these produce L.", vocab: ["had: H", "are: R", "will: L"], extraCode: "leftPointer",
    greenKeysOn: ["key-R", "key-F"], greenKeysOff: ["key-T", "key-G", "key-Y", "key-H"]},
    {text: "The right pointer presses the -F key and the -R key.", extraCode: "rightPointer", greenKeysOn: ["key-U", "key-J"], greenKeysOff: ["key-R", "key-F"]},
    {text: "-FR does not produce a letter, but it is a brief for \"ever\". You can get \"every\" by adding an E to \"ever\".",
    vocab: ["ever: -FR", "every: EFR"], lesson: ["ever", "ever", "every", "every", "ever", "every", "ever"]},
    {text: "In the Rings lesson, we briefly talked about folding in endings. We sometimes fold in an E for -y endings. For \"sorry\", \
    we can use SOR and a folded-in E, giving us SOER. I find it helpful to think of EFR (\"every\") as folding a -y into -FR (\"ever\").",
    vocab: ["sorry: SOER", "~(or SOR/REU)", "worry: WOER", "~(or WOR/REU)"], lesson: ["sorry", "worry", "sorry", "worry", "sorry"]},
    {text: "You can also get \"everybody\" as \"every\" + -B, and \"everything\" as \"every\" + -ing (-G)",
    vocab: ["everything: EFRG", "everywhere: WEFR", "everybody: EFRB", "everyday: EFRD", "everyone: EFRPB"],
    extraCode: "everWords", greenKeysOff: ["key-U", "key-J"]},
    {text: "Here are some more briefs using the right pointer.", vocab: ["of: -F", "off: OF", "are: -R", "(or R-)"], extraCode: "rightPointerBriefs",
    greenKeysOn: ["key-U", "key-J"]},
    {text: "We have a number of new letters now that we have the pointer finger keys, such as M (PH) and N (TPH).",
    extraCode: "pointerLetters1"},
    {text: "We also have Z (S*), V (SR), and -V (*F). You can use any of the four asterisk keys to type these (e.g. qwerty Y and qwerty U for *F).",
    extraCode: "pointerLetters2"},
    {text: "If there is no conflict, just -F (no asterisk) can be used to type \"v\" in words.",
    vocab: ["love: HRUF", "(or HROF)", "(or HR*UF)", "save: SAF", "savvy: SA*EF", "(^ folded-in E)", "satisfy: SAEF", "safe: SAEUF", "-safe: SA*EUF"],
    extraCode: "pointerFBriefs"},
    {text: "You can also use -F in place of -S in some words. Some examples are MOFT (most) and MAFK (mask). \
    Sometimes you will need to use *S instead of -F, such as to differentiate LIFT (lift) and L*IS (list).", affix: ["-st: -FT", "-st: *S"],
    vocab: ["most: MOFT", "mask: MAFK", "~(or PHAS/-BG)", "lift: LIFT", "list: L*IS"],
    lesson: ["most", "mask", "most", "mask", "lift", "list", "list", "lift", "list", "list"]},
    {text: "If you recall from the vowels lesson, Single Short = Spell, but anything else should be phonetic. You may have noticed that MOFT does \
    not appear to follow this rule. Doesn't \"most\" have a long single vowel, so it should be written phonetically as MOEFT?"},
    {text: "That's right. Actually, MOEFT an included entry for \"most\" in the Plover Dictionary. MOEFT is the phonetic entry, while MOFT is a brief.",
    vocab: ["most: MOEFT", "(or MOFT)"], lesson: ["most", "most", "most", "most"]},
    {text: "We saw that *S can be used for -st. Sometimes you can use either -F or *S, as in CAFT and CA*S for \"cast\". You can also use *S \
    with inversion, such as in WOFRT (\"worst\").", affix: ["ent-, int-: SPW"],
    vocab: ["cast: KA*S", "(or KAFT)", "fast: TPAFT", "(or TPA*S)", "interest: SPWR*ES", "(or TR or T-R)", "lot of: HROFT", "loft: HRO*FT", "lost: HRO*S",
    "twist: TW*EUS", "(or TWEUFT)", "worst: WO*RS", "(or WOFRT)"],
    lesson: ["cast", "cast", "fast", "fast", "interest", "interest", "interest", "lot of", "loft", "lot of", "lost", "twist", "twist", "worst", "worst"]},
    {text: "Continuing our new letters, we have C (KR) as well as the ch-sound (KH). The right-hand -ch/-tch is produced using -FP.",
    extraCode: "pointerLetters3"},
    {text: "We generally use S- or K- to write words beginning with \"c\". However, there are some cases when we use C to distinguish similar chords.",
    vocab: ["sent: SEPBT", "cent: KREPBT"],
    lesson: ["sent", "sent", "cent", "cent", "sent", "cent", "sent", "cent"]},
    {text: "Some other letters that include the pointers are Y (KWR) and J (SKWR).", extraCode: "pointerLetters4"},
    {text: "There are only a few new briefs for these keys.", vocab: ["in: N", "why: Y", "have: V", "consider: C"], extraCode: "pointerBriefs"},
    {text: "Let's review these new letters a little more.", extraCode: "pointerLettersReview"},
    {text: "Just a few more notes now that we have all of the pointer letters."},
    {text: "We can form some \"some\" words in the same way that we formed \"every\" words earlier.",
    vocab: ["something: S-G", "someday: STKAEU","somewhere: SWR", "someone: SPHPB", "somebody: S-B", "sometime: STAOEUPL",
    "somehow: SPHOU","someplace: SPHRAEUS"], extraCode: "someWords"},
    {text: "Next, a note on vowels. We have AU for \"au\" words, but what about \"ua\"? We usually \
    use a long u, but it can be helpful to think of this as an \"oo\" (AO) plus a \"u\". In \"actual\" = ak-CHOO-ul, we have this OO-u.",
    vocab: ["actual: TAOUL", "dual: TKAOUL", "nuance: TPHAOUPBS", "truant: TRAOUPBT"],
    lesson: ["actual", "actual", "dual", "dual", "nuance", "nuance", "truant", "truant"]},
    {text: "Last, we need to fix some punctuation from the Rings lesson, as promised."},
    {text: "If we use KR-GS for the ending quotation mark, Plover will output \"The\" (capitalized), as above.",
    vocab: ["\": KR-GS", "(^ closing quotation)", "\": KW-GS", "(^ opening quotation)"],
    lesson: ["\"", "See", "all", "the", "ice", "?", "I'll", "do", "skating", "!", "\" ", "The", "dog", "called", "."], full: true},
    {text: "However, KR-GS will output \"the\" correctly if it follows a quotation ending in a comma.",
    vocab: ["\": KR-GS", "(^ closing quotation)", "\": KW-GS", "(^ opening quotation)"],
    lesson: ["\"", "I'll", "do", "skating", ",", "\" ", "the", "dog", "called", "."], full: true},
    {text: "Since we are ending the quotation with an exclamation point, we need to use KR*GS to get the proper capitalization.",
    vocab: ["\": KR*GS"], lesson: ["\"", "See", "all", "the", "ice", "?", "I'll", "do", "skating", "!", "\" ", "the", "dog", "called", "."],
    full: true},
    {text: document.getElementById("lesson6").textContent, top: lessonTitleTop, width: lessonTitleWidth},
    {text: "Now we will work on some sentences with some more new briefs."},
    {text: "TPHOU KW-BG HRAOBG AF HEUPL TP-PL HE S- TPH HEUS RAOPL TH AFR/TPHAOPB TP-PL", affix: ["after-: AFR"],
    vocab: ["now: TPHOU", "look: HRAOBG", "after: AF", "him: HEUPL", "he: HE", "his: HEUS", "(or HEUZ)", "room: RAOPL", "this: TH",
    "afternoon: AFR/TPHAOPB", "~(or AFPB)"],
    lesson: ("Now , look after him . He is in his room this after- noon .").split(" "), full: true},
    {text: "TKO U TPHOE HOU UR TKPW-G TPHAO KWROUR HOUS KW-PL",
    vocab: ["know: TPHOE", "how: HOW", "you're: UR", "going: TKPW-G", "into: TPHAO", "your: KWROUR", "house: HOUS"],
    lesson: ("Do you know how you're going into your house ?").split(" "), full: true},
    {text: "THE THEU THER PHAEB TKPW-G OUT THR TPH THAEUR SOBGS TP-PL",
    vocab: ["they: THE", "think: THEU", "they're: THER", "maybe: PHAEB", "(^ folded-in E)", "(or PHAEUB)", "there: THR", "their: THAEUR", "socks: SOBGS"],
    lesson: ("They think they're maybe going out there in their socks .").split(" "), full: true},
    {text: "HR SHE HR-S TKPWEUF PHE PHUFP -F HER WORBG KW-BG OR HR SHE SKWRUFT TKPWEUF PHE PHEU WORBG KW-PL",
    vocab: ["she: SHE", "also: HR-S", "~(or AL/SO)", "give: TKPWEUF", "me: PHE", "much: PHUFP", "her: HER", "work: WORBG", "or: OR",
    "just: SKWRUFT", "my: PHEU"],
    lesson: ("Will she also give me much of her work , or will she just give me my work ?").split(" "), full: true},
    {text: "PHOFT -F THEZ R OUR PHAEPB TPEURS TKRAFTS TP-PL",
    vocab: ["these: THEZ", "(or THAOES)", "(or THAOEZ)", "our: OUR", "many: PHAEPB", "(^ folded-in E)", "first: TPEURS", "(or TPEUFRT)", "drafts: TKRAFTS"],
    lesson: ("Most of these are our many first drafts .").split(" "), full: true},
    {text: "HOU R TPHEU -F THEPL ERL KW-PL",
    vocab: ["any: TPHEU", "them: THEPL", "early: ERL", "~(or ER/HREU)"],
    lesson: ("How are any of them early ?").split(" "), full: true},
    {text: "ST OEFR KW-BG THEPB KW-BG OER THAPB THA KW-PL EU APL AUFR/SKWROEUD TP-BG",
    vocab: ["is it: ST", "over: OEFR", "then: THEPB", "other: OER", "than: THAPB", "that: THA", "am: APL", "overjoyed: AUFR/SKWROEUD"],
    lesson: ["Is it", "over", ",", "then", ",", "other", "than", "that", "?", "I", "am", "over-", "joyed", "!"], full: true},
    {text: "WHA TP WH TPHOER KWRAOER STARTS KW-BG TH KWRA*ER S- TPHOT HRAOEUBG TPHU KW-PL",
    vocab: ["what: WHA", "when: WH", "another: TPHOER", "year: KWRAOER", "starts: STARTS", "area: KWRA*ER",
    "not: TPHOT", "like: HRAOEUBG", "new: TPHU"],
    lesson: ("What if when another year starts , this area is not like new ?").split(" "), full: true},
    {text: "WHO HR PHAEUBG TPHO KAEUBGS KW-PL",
    vocab: ["who: WHO", "make: PHAEUBG", "no: TPHO", "communication: KAEUBGS", "(or KPHAOUPBGS)"],
    lesson: ("Who will make no communication ?").split(" "), full: true},
    {text: "TPAUR is the prefix for-. TPOR is used to differentiate forgot and forget. Also notice that \"for\" is F-R, and \"from\" \
    is FR-, so they use the same R as if they were written out in full.",
    affix: ["for: TPAUR"], vocab: ["this is: TH-S", "for: TP-R", "from: TPR-", "man: PHAPB", "store: STOR", "that I: THAEU", "forgot: TPAURGT",
    "forget: TPORGT", "things: THEUPBGS"],
    lesson: ["This is", "not", "for", "the", "man", "from", "the", "store", ",", "who", "forgot", "that I", "forget", "things", "."], full: true},
    {text: "THAS AUL THAR THR TP-PL", vocab: ["that is: THAS", "that are: THAR"],
    lesson: ["That is", "all", "that are", "there", "."], full: true},
    {text: "SREU TOF -T WUPB THAS HAF OF TP-PL SAOE KW-PL -T TAG SEZ HA*F OF TP-PL",
    vocab: ["I have: SREU", "to have: TOF", "half: HAF", "tag: TAG", "says: SEZ", "(or SAEUZ)", "(or SAEUS)", "1/2: HA*F"],
    lesson: ["I have", "to have", "the", "one", "that is", "half", "off", ".", "See", "?", "The", "tag", "says", "1/2", "off", "."], full: true},
    {text: document.getElementById("lesson7").textContent, top: lessonTitleTop, width: lessonTitleWidth},
    {text: "Let's take a look at a few more prefixes, suffixes, and sounds."},
    {text: "HURB KW-BG PRERBS PWAEB TP-PL", affix: ["-sh: -RB", "-shus: -RBS"], vocab: ["hush: HURB", "precious: PRERBS", "baby: PWAEB", "~(or PWAEU/PWEU)"],
    lesson: ("Hush , precious baby .").split(" "), full: true},
    {text: "Using -FRP for -mp, we can write -mple just by adding an -L (-FRPL). Note that we can't use A*PL \
    for \"amp\" because \"a.m.\" is A*PL. We could add the suffix -le (*L) to A*PL to get \"ample\", however.",
    affix: ["-mp: -FRP", "(or *PL)", "-le: *L"], vocab: ["amp: AFRP", "~(or APL/-P)", "ample: AFRPL", "~(or APL/-PL)", "~(or A*PL/*L)", "level: HREFL",
    "eight: AET", "a.m.: A*PL", "(APL was am)", "subtle: SUBLT", "~(or SUT/*L)"],
    lesson: ("The amp level at eight a.m. is ample and subtle .").split(" "), full: true},
    {text: "EU THAUT PHA*T H- HROEFLT TK*EPT TP-PL",
    affix: ["-th: *T"], vocab: ["thought: THAUT", "math: PHA*T", "a lot of: HROEFLT", "(a lot: HROELT)", "depth: TK*EPT"],
    lesson: (["I", "thought", "math", "had", "a lot of", "depth", "."]), full: true},
    {text: "TPH-T TPHAOEUT KW-BG SHE WEPBT EUPB/WARD KW-BG TPURT TPHAOT -T KAEUF TP-PL", affix: ["in-: EUPB", "-th: *T"],
    vocab: ["in the: TPH-T", "night: TPHAOEUT", "went: WEPBT", "inward: EUPB/WARD", "further: TPURT", "(or TP*URT)", "into the: TPHAOT", "cave: KAEUF", "(or KA*EUF)"],
    lesson: ["In the", "night", ",", "she", "went", "in-", "ward", ",", "further", "into the", "cave", "."], full: true},
    {text: "Notice that weak uses the AE disambiguator since it contains a and e.",
    affix: ["bi-: PW*EU"], vocab: ["bye: PWAO*EU", "weak: WAEBG", "left: HREFT", "bicep: PW*EU/SEP",
    "last: HRAFT", "week: WAOEBG"],
    lesson: ("He said bye to his weak left bi- cep last week .").split(" "), full: true},
    {text: "HE SWEFRBD AOEPB AS HE TKROEF SHROEL ARPBD -T KUFRB TP-PL",
    affix: ["-rve: -FRB", "-ly: -L", "(or HREU)"], vocab: ["swerved: SWEFRBD", "drove: TKROEF", "slowly: SHROEL", "~(or SHROE/HREU)", "around: ARPBD",
    "~(or A/ROUPBD)", "curve: KUFRB"],
    lesson: ("He swerved even as he drove slowly around the curve .").split(" "), full: true},
    {text: "We can't use -LK to write -lk because the -L\
    breaks up the -K chord (-L + -BG = -BLG). Also note that yolk is spelled phonetically, like \"yoke\"",
    affix: ["-nk: *PBG", "-lk: *LG"], vocab: ["mink: PH*EUPBG", "ate: AEUT", "(vs AET, eight)", "yolk: KWROEBG", "drank: TKRA*PBG", "milk: PH*EULG"],
    lesson: ("The mink ate the yolk and drank the milk .").split(" "), full: true},
    {text: "The word \"drank\" has a long vowel, so you probably expected to write it as TKRA*EUPBG. However, this stroke is already used to write \"draining\". \
    So we use just an A in \"drank\" to disambiguate it from \"draining\". We could also write TKRAPBG since \"drang\" is not typically used in English.",
    vocab: ["drank: TKRA*PBG", "(or TKRAPBG)", "draining: TKRAEUPBG", "(or TKRA*EUPBG)"],
    lesson: ["drank", "drank", "draining", "draining", "drank", "draining"]},
    {text: "To remember W-R vs WR-, notice that \"where\" has more letters between \
    the \"w\" and the \"r\", and it uses the R that is further away (-R).", affix: ["con-: K-", "(or KAUPB)", "com-: K-"],
    vocab: ["where: W-R", "were: WR-", "computers: KPAOURTS", "common: KPHOPB", "~(or KOPL/PHOPB)", "connected: KEBGTD"],
    lesson: ("Where were the computers in the common room connected ?").split(" "), full: true},
    {text: "-FRPBLG is used for conflicts \
    like lunch vs lurch. The -rch word is given the -FRPB ending, and -nch becomes -FRPBLG.",
    affix: ["-rch: -FRPB", "-nch: -FRPB", "(or -FRPBLG)"], vocab: ["march: PHAFRPB", "down: TKOUPB", "hall: HAUL", "lunch: HRUFRPBLG", "(or HRUPBS)",
    "lurch: HRUFRPB", "bench: PWEFRPB"],
    lesson: ("I march down the hall to lunch , then lurch to the bench .").split(" "), full: true},
    {text: "Another useful ending is -y, as in \"puppy\". Note that a folded-in E would not work for these -y's (we would get \"pip\" and \"kit\").",
    affix: ["-y: KWREU"], vocab: ["puppy: PUP/KWREU", "kitty: KEUT/KWREU"],
    lesson: "pup -y kit -y pup -y pup -y kit -y".split(" ")},
    {text: "We are going to address a few more conflicts. Consider axe vs action."},
    {text: "-ction (you saw this as -kshun before, in the Middles lesson) is normally \
    written -BGS. -X is also written -BGS."},
    {text: "Here, -X is given priority over -BGS, so we add an asterisk to -ction. This leaves the higher priority -X with the easier stroke.",
    vocab: ["axe: ABGS", "action: A*BGS"], lesson: ["axe", "axe", "action", "action", "axe", "action", "axe", "action"]},
    {text: "In some cases, we follow specific rules for adding asterisks (such as -X takes priority over -ction). However, if one word is much more \
    common than the conflicting word, the less common word will use the asterisk instead."},
    {text: "What if we want to write a word like \"divide\"? If we try to combine TK and SR as STKR, the TK breaks up the SR. Instead, what we can do \
    is substitue a W- for the V-. So we would write TKWAOEUD. See if you can apply the same rule to \"severe\".",
    vocab: ["divide: TKWAOEUD", "~(or TKEU/SRAOEUD)", "severe: SWAOER", "~(or SE/SRAOER)"],
    lesson: ["divide", "divide", "divide", "divide", "severe", "severe", "severe", "severe"]},
    {text: "Remember using -PBG to write the -nge in \"sponge\"? What if we have something like \"bing\" and \"binge\"?"},
    {text: "We use -PBG for the hard G sound and add a * for the soft G. This gives us PWEUPBG for \"bing\" and PW*EUPBG for \"binge\". \
    Binge can also be written by adding -J, PWEUPB/-PBLG.",
    affix: ["-ng: -PBG", "-nge: -PBG", "(or *PBG)"], vocab: ["bing: PWEUPBG", "binge: PW*EUPBG", "~(or PWEUPB/-PBLG)"],
    lesson: ["bing", "binge", "bing", "binge", "bing", "binge"]},
    {text: "Similarly, we can write HRUPBG for \"lung\". We might expect HRU*PBG for lung, but it is not mapped to anything in the Plover Dictionary. \
    Instead, we can use HRUPB/-PBLG. We can also shorten this into the brief HRUPBLG.",
    affix: ["-ng: -PBG", "-nge: -PBG", "(or *PBG)"], vocab: ["lung: HRUPBG","lunge: HRUPBLG", "~(or HRUPB/-PBLG)", "~(or HRUPB/*PBLG)"],
    extraCode: "ngeConflict"},
    {text: "To write \"lunge\" as HRUPBLG, we \
    " + '<a href="https://sites.google.com/site/learnplover/lesson-9-designing-briefs#TOC-Drop-More-Sounds" target="_blank">\
    ' + "dropped a consonant" + '</a>' + ". Here are a few more words that drop consonants (here, middle t's or th's). \
    The word \"other\", which you saw as OER, also followed this pattern.",
    vocab: ["mother: MOER", "water: WAUR", "rather: RAER", "bother: PWOER"],
    lesson: ["lunge", "lunge", "other", "other", "mother", "water", "rather", "bother", "water", "water", "rather", "mother", "bother"]},
    {text: "Here we drop the middle c in document and the middle t in control (recall that K is used for com- and con- prefixes).",
    vocab: ["control: KROL", "~(or KAUPB/TROEL)", "~(or KOPB/TROEL)", "(or TKROEL)", "document: TKOUPLT", "~(or TKOBG/AOUPLT)", "~(or TKOBG/KWRAOUPLT)"],
    lesson: ["control", "document", "document", "control", "document", "control", "document"]},
    {text: "Now we will do little more inversion, which we introduced in the ring finger lesson."},
    {text: "For \"concept\", we invert con- (K) and S. For \"dismiss\" we invert d (TK) and s to get TKS, \"dis\". We can apply a similar pattern to \
    produce \"mis\". We can also invert m and r in \"summer\", SURPL.",
    vocab: ["concept: SKEPT", "~(or KOPB/SEPT)", "~(or KAUPB/SEPT)", "dismiss: STKPHEUS", "~(or TKEUS/PHEUS)", "mistake: SPHAEUBG",
    "~(or PHEUZ/TAEUBG)", "summer: SURPL", "~(or SUPL/ER)"],
    lesson: ["concept", "dismiss", "summer", "mistake", "mistake", "summer", "dismiss", "concept"]},
    {text: "Sometimes use multiple techniques in the same stroke. Here we use inversion (STK for \"dis\"). We might say that we dropped the middle \"c\" here, or \
    we might say that we " + '<a href="https://sites.google.com/site/learnplover/lesson-9-designing-briefs#TOC-Overlap-Chords" target="_blank">\
    ' + "overlapped" + '</a>' + " the \"c\" and the \"d\".",
    lesson: ["discuss", "discuss", "discuss", "discuss"], vocab: ["discuss: STKUS", "~(or TKEUS/KUS)"]},
    {text: "You have now learned a number of prefixes and suffixes for writing words. You also know a few techniques for fitting words into fewer strokes."},
    {text: "But we seem to be missing something. How can we write numbers? We will work on this in the next lesson."},
    {text: document.getElementById("lesson8").textContent, top: lessonTitleTop, width: lessonTitleWidth},
    {text: "In these lessons, we will only learn how to type single digits. You can use these single digits to form any number."},
    {text: "However, there are \
    " + '<a href="https://sites.google.com/site/learnplover/lesson-8-numbers" target="_blank">\
    ' + "more advanced techniques" + '</a>' + " that you can use to type large numbers more quickly."},
    {text: "A steno machine has a number bar above the keys. For a keyboard, the number keys, minus key, and plus key are part of the number bar. \
    To type a number, press any key in the number bar plus the steno key for a particular number."},
    {text: "The hands here have not been animated to show the motions for the numbers since there are so many possible movements."},
    {text: "One way to handle the number bar is to use the same finger to press a steno number as well as the number bar."},
    {text: "For instance, the steno key for 1 is S-. To press the number bar with this key, you could press qwerty 1 and qwerty Q both \
    with the left pinky finger.", vocab: ["1: #S", "(# means number bar)"], lesson: "1".repeat(5).split("")},
    {text: "Alternatively, you could use a separate finger to press the number bar while pressing \
    qwerty Q with your left pinky.", vocab: ["1: #S", "(# means number bar)"], lesson: "1".repeat(5).split("")},
    {text: "We will need our thumb to type 0 (O key). We might use the left middle finger to press the number bar (qwerty 3).",
    vocab: ["0: #O"], lesson: "0".repeat(5).split("")},
    {text: "Here are all the digits to practice. To type 5, you can use the thumb/middle finger technique you used for 0.",
    vocab: ["0: #O", "1: #S", "2: #T", "3: #P", "4: #H", "5: #A", "6: #-F", "7: #-P", "8: #-L", "9: #-T"],
    lesson: "0123456789".repeat(2).split("")},
    {text: "You can output multiple digits at once by pressing a number bar key and then as many of the digit keys as you want to press. \
    The numbers will be output in steno order."},
    {text: "Now you know all of the keys! Let's do some review!"},
    {text: "Here is an exercise to practice the full alphabet using left-hand and thumb keys.",
    lesson: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")},
    {text: "Sometimes you will have a word or name that you do not know a chord for, and you will need to spell it out letter by letter. This \
    is called fingerspelling."},
    {text: "To fingerspell, use the left hand letters plus an asterisk. Since Z is S*, you will need to use a long form of Z for \
    fingerspelling, STKPW. So use S* to fingerspell S and STKPW* to fingerspell Z."},
    {text: "Add -P to make the letter capital (e.g. S*P for capital \"S\"). Use S-P for spaces and TK-LS to remove space, if needed."},
    {text: '<a href="https://thepracticetest.com/typing/practice/alphabet" target="_blank">' + "This typing site" + '</a>' + " generates pangrams, \
    sentences which contain all the letters of the alphabet (you will need to turn on Plover to practice fingerspelling)."},
    {text: "Now let's review the right-hand keys (and thumbs again)."},
    {text: "The letters that aren't available for the right hand (C, H, Q, W, Y) have been replaced by -K's and E's. \
    This is because C's and Q's at the ends of words make a -K sound, and H's and W's at the ends of words are part of a \
    vowel sound (I chose E as this vowel placeholder).",
    lesson: ["A", "-B", "-K", "-D", "E", "-F", "-G", "E", "I", "-J", "-K", "-L", "-M", "-N", "O", "-P", "-K", "-R", "-S", "-T", "U", "-V", "E", "-X", "E", "-Z"]},
    {text: "Here is another ABC exercise. We will do the left and right letters together.", lesson: ["A", "B", "-B", "C", "-K", "D", "-D", "E", "F", "-F", "G", "-G", "H",
    "E", "I", "J", "-J", "K", "-K", "L", "-L", "M", "-M", "N", "-N", "O", "P", "-P", "Q", "-K", "R", "-R", "S", "-S", "T", "-T", "U", "V", "-V", "W", "E", "X",
    "-X", "Y", "E", "Z", "-Z"]},
    {text: "Here is a longer version of the exercise we just did.", extraCode: "lrExtendedABC"},
    {text: "And now, ABC Briefs. Left hand first.", lesson: ["A", "about", "consider", "did", "E", "if", "go", "had", "I", "J", "can", "will", "M", "in", "O",
    "P", "request", "are", "is", "it", "you", "have", "with", "examine", "why", "Z"]},
    {text: "Let's do right-hand ABC Briefs now (-K's and E's in place of letters as in the right-hand ABCs you did a few exercises back). \
    Notice that the right-hand keys have far fewer briefs than the left-hand keys did.",
    lesson: ["A", "be", "-K", "-D", "E", "of", "-G", "E", "I", "-J", "being", "-L", "-M", "an", "O", "-P", "-K", "are", "-S", "the", "you",
    "-V", "E", "-X", "E", "-Z"]},
    {text: "Here are the single-letter briefs alphabetized by word.",
    lesson: ["about", "an", "are", "be", "being", "can", "consider", "did", "examine", "go", "had", "have", "if", "in", "is", "it", "of",
    "request", "the", "why", "will", "with", "you"]},
    {text: "Let's practice all the affixes and sounds we have learned. The list is provided in the vocab box in \
    case you need a refresher.",
    vocab: ["after-: AFR", "be-: PWE", "bi-: PW*EU", "ch: KH", "-ch, -tch: -FP",
    "con-: KAUPB", "-ction (-kshun): -BGS", "-ed: -D", "ent-, int-: SPW",
    "for-: TPAUR", "im-: EUPL", "in-: EUPB", "-ing: -G", "-lch, -lge: -LG", "-lk: *LG"],
    lesson: ["after-", "be-", "bi-", "ch", "-ch", "con-", "-ction (-kshun)", "-ed", "ent-, int-",
    "for-", "im-", "in-", "-ing", "-lch, -lge", "-lk"]},
    {text: "Let's practice all the prefixes and suffixes we have learned. The list is provided in the vocab box in \
    case you need a refresher.",
    vocab: ["-le: *L", "-le, -ly: -L", "-ly: HREU", "-ment: -PLT", "-mp: FRP", "(or *PL)", "-nch, -rch: -FRPB", "-nch: -FRPBLG",
    "-ng, -nge: -PBG", "-nge, -nk: *PBG", "out-: AOUT", "-rve: -FRB", "-sh: -RB", "-tion, -sion (-shun): -GS",
    "-tious, -cious (-shus): -RBS", "-st: -FT", "(or *S)", "-th: *T", "-y: KWREU"],
    lesson: ["-le", "-le, -ly", "-ly", "-ment", "-mp", "-nch, -rch", "-nch", "-ng, -nge", "-nge, -nk", "out-", "-rve", "-sh",
    "-tion, -sion (-shun)", "-tious, -cious (-shus)", "-st", "-th", "-y"]},
    {text: "Here is one last affix exercise.", extraCode: "affixReview"},
    {text: document.getElementById("lesson9").textContent, top: lessonTitleTop, width: lessonTitleWidth},
    {text: "If you completed all of the earlier lessons, you have actually already done some phrasing. Let's review one \
    " + "of these sentences now. See if you can identify anything that might be considered \"phrasing\"."},
    {text: "TPH-T TPHAOEUT KW-BG SHE WEPBT EUPB/WARD KW-BG TPURT TPHAOT -T KAEUF TP-PL", affix: ["in-: EUPB", "-th: *T"],
    vocab: ["in the: TPH-T", "night: TPHAOEUT", "went: WEPBT", "inward: EUPB/WARD", "further: TPURT", "(or TP*URT)", "into the: TPHAOT", "cave: KAEUF", "(or KA*EUF)"],
    lesson: ["In the", "night", ",", "she", "went", "in-", "ward", ",", "further", "into the", "cave", "."], full: true},
    {text: "You may have spotted \"in the: TPH-T\" and \"into the: TPHAOT\". Each of these has a phrase expressed as a single stroke."},
    {text: "Plover includes some subject-verb phrases as well. There are eleven commonly-appearing subjects in Plover's dictionary. \
    " + "Most of these use the same strokes that you have already learned for these words (exception: \"which: KH-\")."},
    {text: '<table id="first-table"><tr><th>I</th><th>you</th><th>it</th><th>she</th><th>he</th><th>we</th>\
    ' + '<th>they</th><th>who</th><th>what</th><th>which</th><th>that</th>\
    ' + '<tr><td>EU</td><td>U</td><td>T-</td><td>SHE</td><td>HE</td><td>WE</td>\
    ' + '<td>THE</td><td>WHO</td><td>WHA</td><td>KH-</td><td>THA</td>\
    ' + '</tr></table>'},
    {text: "In phrasing, you will often see the verb stroked using the right-hand only. For the (helper) verb \"could\", we will use \"-BGD\" (-KD) rather \
    " + "than \"KO\" as we learned previously. We can then combine this with each of the subjects."},
    {text: '<table><tr><th>I could</th><th>you could</th><th>it could</th><th>she could</th><th>he could</th><th>we could</th></tr>\
    ' + '<tr><td>EUBGD</td><td>UBGD</td><td>T-BGD</td><td>SHEBGD</td><td>HEBGD</td><td>WEBGD</td></tr>\
    ' + '<tr><th>they could</th><th>who could</th><th>what could</th><th>which could</th><th>that could</th></tr>\
    ' + '<tr><td>THEBGD</td><td>WHOBGD</td><td>WHABGD</td><td>KH-BGD</td><td>THABGD</td>\
    ' + '</tr></table>'},
    {text: "Let's practice these.",
    vocab: ["[phrasing] -BGD: could", "I could: EUBGD", "you could: UBGD", "it could: T-BGD", "she could: SHEBGD", "he could: HEBGD", "we could: WEBGD",
    "they could: THEBGD", "who could: WHOBGD", "what could: WHABGD", "which could: KH-BGD", "that could: THABGD"],
    lesson: ["I could", "I could", "I could", "you could", "you could", "you could", "it could", "it could", "she could", "she could",
    "he could", "he could", "we could", "we could", "they could", "they could", "who could", "who could", "what could", "what could",
    "which could", "which could", "that could", "that could"]},
    {text: "You can form different tenses of verbs in these phrases, as well. Let's try it out using the phrase-form of believe, -BL.",
    vocab: ["[phrasing] -BL: believe", "[phrasing] -BLS: believes", "[phrasing] -BLD: believed", "you believe: UBL",
    "she believes: SHEBLS", "we believed: WEBLD"],
    lesson: ["you believe", "you believe", "she believes", "she believes", "we believed", "we believed"]},
    {text: "These types of phrases are simple enough to remember, but it can be difficult to form a large number of phrases that do not conflict with \
    other words defined in the Plover dictionary."},
    {text: "For instance, in the last exercise, we practiced \"you believe\" instead of \"I believe\" \
    because EUBL actually maps to the suffix \"-ible\"."},
    {text: "There is another phrasing system which has fewer conflicts. This system includes phrases like \"KWRAPBDZ: I can't understand\".",
    vocab: ["KWRAPBDZ: I can't understand"]},
    {text: "The left-hand keys (excluding vowels) form the left-hand phrase starter (LHPS), which is the subject in this case. \
    " + "Plover uses \"KWR\" for \"I\".", vocab: ["KWRAPBDZ: I can't understand", "[LHPS] KWR-: I",]},
    {text: "The right-hand keys (still excluding vowels) form the right-hand phrase ender (RHPE), which is a main verb here. -PBDZ is \
    " + "the RHPE for \"understand\".", vocab: ["KWRAPBDZ: I can't understand", "[LHPS] KWR-: I", "[RHPE] -PBDZ: understand"]},
    {text: "Finally, we have our vowel keys. Plover uses A for the helper verb, \"can't\".",
    vocab: ["KWRAPBDZ: I can't understand", "[LHPS] KWR-: I", "[RHPE] -PBDZ: understand", "[phrasing] A: can't"],
    lesson: ["I can't understand", "I can't understand", "I can't understand"]},
    {text: "Plover uses O (and sometimes OE) for \"don't\", and it uses EU for \"didn't\".",
    vocab: ["KWROPBDZ: I don't understand", "KWREUPBDZ: I didn't understand",],
    lesson: ["I don't understand", "I don't understand", "I didn't understand", "I didn't understand"]},
    {text: "Plover only partially implements the LHPS/RHPE phrasing system. The Plover dictionary contains a number of I-phrases, \
    " + "but does not appear to contain LHPS/RHPE phrases for any other subject."},
    {text: "The completeness of the phrase lists also varies for each verb. For instance, the Plover dictionary \
    " + "has different tenses of \"believe\" for seven subjects. But for the verb \"find\", there are only three \
    " + "subject-verb phrases total (I don't find, you find, we find)."},
    {text: "I have generated some of my own dictionaries for Plover to make these phrase lists more complete. I have attempted \
    " + " to mimic the phrasing provided in Plover Theory as much as possible."},
    {text: "You can find these files and learn more about their entries " + '<a href="downloads.html" target="_blank">' + "here" + '</a>' + "."},
    {text: document.getElementById("lesson10").textContent, top: lessonTitleTop, width: lessonTitleWidth},
    {text: "In the next few lessons, we will look at some common patterns for forming one-stroke briefs in the Plover dictionary. \
    The briefs we will look at here are usually not the simplest forms for these words."},
    {text: "However, knowing these patterns will help you write words you don't know a brief for. These patterns will also help you \
    understand how many other briefs in the dictionary are derived."},
    {text: "Recall that dropping unstressed vowels and inversion are both part of Plover Theory. The other techniques you will see here \
    are techniques used to form briefs, but are not rules of Plover Theory."},
    {text: "There are too many new words to include them all in the vocab box. Therefore, only a few sample words, along with any tricky words, \
    will be included there. Affixes have been included in the vocab box for review."},
    {text: "If you are unable to figure out how to type a word, click the word in the practice drill.",
    highlight: true, highlightElement: document.getElementById("practice"), lesson: ["click", "me"]},
    {text: "Phonetic Words with Possibly Unexpected Spelling", vocab: ["talk: TAUBG", "walk: WAUBG", "view: SRAOU"],
    lesson: ["talk", "talk", "walk", "walk", "view", "view"]},
    {text: "Phonetic Words with Complex Sounds", affix: ["-rch: -FRPB", "-ch: -FP", "-nge: -PBG"],
    vocab: ["church: KHUFRPB", "each: AOEFP", "speech: SPAOEFP", "such: SUFP", "watch: WAFP", "range: RAEUPBG", "~(rang: RAPBG)"],
    lesson: ["church", "each", "speech", "such", "watch", "range"]},
    {text: "Phonetic Words with Complex Sounds:" + '<br>' + "-F as -S" + '<br><br>' + "\
    Recall that -st can often be written as *S.", vocab: ["cost: KOFT", "(or KO*S)", "post: POEFT", "(or PO*ES)"],
    lesson: ["cost", "costs", "least", "past", "post", "rest", "risk", "test"]},
    {text: "Phonetic Words with Affixes", affix: ["ex-: KP", "-mp: -FRP", "(or *PL)", "-shun: -GS", "(e.g. -tion, -sion)", "com: K-", "-ment: -PLT", "ent-/int-: SPW"],
    vocab: ["comment: KPHEPBT", "(or KOPLT)", "comments: KPHEPBTS", "(or KOPLTS)"],
    lesson: ["version", "comment", "comments", "compared", "complete", "complex", "moment", "entire"]},
    {text: "Phonetic Words with Basic Endings", affix: ["-ing: -G", "-ly: -L", "-D: -ed"],
    vocab: ["clearly: KHRAOERL", "using: AOUFG", "used: AOUFD", "(or AOUSD)"],
    lesson: ["clearly", "highly", "nearly", "during", "feeling", "coming", "getting", "growing", "morning", "playing", "saying", "training",
    "trying", "watching", "giving", "living", "using", "used"]},
    {text: "Phonetic Words with Folded-In Endings", affix: ["-er: -R", "-ing: -G", "-y: E", "-ly: -L", "-or: -R"],
    vocab: ["binding: PWAOEUPBGD", "company: KPAEPB", "completely: KPHRAOELT", "movie: PHOEF"],
    lesson: ["binding", "company", "completely", "factor", "factors", "later", "leading", "longer", "meeting",
    "mostly", "movie", "movies", "older", "paper", "papers", "party", "spending", "starting", "stories", "story"]},
    {text: "Notice the spelling of \"movie\". This word is tricky, since it makes a sound like a long \"u\", but is not spelled with a \"u\".\
    So should we consider this to be a short single vowel, or a long vowel?", vocab: ["movie: PHOEF"]},
    {text: "The Plover Dictionary allows for either interpretation in this case. It uses a long \"u\" in PHAO*UF/SRAOE and PHAOU/SRAOE. \
    Notice that you can put the v-sound in both syllables or just the last. Plover typically allows words to be broken up either way."},
    {text: "There are also entries using just an \"o\" -- PHO*F/SRAOE, PHOF/KWREU, PHO/SRAOE, as well as PHOEF as we used before (remember that \
    the E here is for the folded in -y ending)."},
    {text: "Other words that are kind of tricky like this include \"ring\" and \"string\", which make a sound almost like a long \"e\". \
    In this case, Plover only includes entries based on spelling, REUPBG and STREUPBG."},
    {text: "In general, if you have a single vowel that makes a long vowel sound, but the sound doesn't match that vowel (e.g. ee with \"i\" \
    instead of \"e\", or oo\/u with \"o\"), try using SPELLING first. In other words ..."},
    {text: "... since \"ring\" is spelled with an \"i\", we try EU first (instead of ee = AOE). Since \"movie\" \
    is spelled with an \"o\", we try O (instead of oo = AO; instead of u = AOU) first.",
    vocab: ["ring: REUPBG", "string: STREUPBG", "(movie: PHOEF)"],
    lesson: ["ring", "string", "movie", "ring", "string", "movie"]},
    {text: "Phonetic Words with Folded-In Endings: Conflicting Keys" + '<br><br>' + "Sometimes it will seem like you cannot fold in an ending. \
    For instance, with \"basically\", we would need to break up the -BG (c-sound) in order to insert -L. We can work around this by using the left-hand \
    HR (L) instead.", affix: ["-ly: HR"],
    vocab: ["basically: PWHRAEUFBG", "actually: THRAOUL", "(actual: TAOUL)"],
    lesson: ["basically", "basically", "basically", "actually", "actually", "actually"]},
    {text: "Similarly, \"former\" already uses the -R key in \"form\". So we use the left-hand R to add \"-er\".", affix: ["-er: R"],
    vocab: ["former: TPRORPL", "workers: WRORBGS", "earlier: RERL", "(early: ERL)"], lesson: ["former", "former", "former", "workers", "workers", "workers", "earlier", "earlier"]},
    {text: document.getElementById("lesson11").textContent, top: lessonTitleTop, width: lessonTitleWidth},
    {text: "Remember that you can look a word up in a normal dictionary to determine stress."},
    {text: "Here, I will show stress with all caps. For instance, \"above\" is a-BOV. \
    This shows stress on the second syllable. Plover Theory allows us to drop unstressed vowels (shown in lowercase here), so we get a-BOV = BOV.",
    vocab: ["above: PWOF"], lesson: ["above", "above", "above"]},
    {text: "Let's practice a few more examples of dropping unstressed vowels. Notice that dropping unstressed vowels amounts to \
    dropping lowercase vowels here." + '<br><br>' + " \
    associated = a-SOE-shee-ate-ed = SOE-sh-t-d", vocab: ["associated: SOERBTD"], lesson: ["associated", "associated", "associated"]},
    {text: "collection = ko-LEK-shun = k-LEK-shn", affix: ["-ction (-kshun): -BGS"], vocab: ["collection: KHREBGS"],
    lesson: ["collection", "collection", "collection"]},
    {text: "You may have noted that \"associated\" can also be pronounced a-SOE-see-ate-ed (no \"sh\" in the third syllable). The Plover Dictionary does \
    include entries for this pronunciation. However, none of them can be compressed into a single stroke, which is our aim in this lesson."},
    {text: "community = ko-MYU-ni-tee = k-MYOO-n-t" + '<br><br>' + "Here, we use a long u (AOU) in MYU, since m (PH) and y (KWR) together would \
    break steno order. Similarly, \"value\" uses just a long u.", vocab: ["community: KPHAOUPBT", "value: SRAOUL", "(^ long-u and L are inverted)"],
    lesson: ["community", "community", "community", "value", "value", "values"]},
    {text: "Let's look at some words with first-syllable stress. For instance, the \
    word \"average\" can be pronounced AV-er-ij or AV-rij."},
    {text: "Dropping unstressed vowels in the first pronunciation, we get AV-er-ij = AV-r-j. \
    Dropping vowels in the second pronunciation, we get AV-rij = AV-rj. This results in the same stroke either way, AFRPBLG.",
    vocab: ["average: AFRPBLG"], lesson: ["average", "average", "average"]},
    {text: "Words with Unstressed Vowels: First Syllable Stress", vocab: ["foreign: TPOERPB", "(or TPORPB)", "follow: TPOL", "money: PHUPB",
    "quality: KWAULT", "security: SKAOURT", "unit: AOUPBT", "(or KWRAOUPBT)"],
    lesson: ["current", "different", "differences", "different", "differences", "effort", "efforts", "evil", "favorite", "final", "finally", "follow",
    "followed", "following", "foreign", "given", "levels", "limited", "market", "method", "methods", "money", "music", "noted", "offer", "office", "often",
    "parents", "period", "practice", "private", "quality", "security", "serious", "several", "social", "special", "unit", "various", "visit"]},
    {text: "Words with Unstressed Vowels: Second Syllable Stress",
    vocab: ["agree: TKPWRAOE", "apparently: PAEURPBLT", "(^ folded-in -L)", "behind: PWHAOEUPBD", "direct: TKREBGT", "effect: TPEBGT",
    "(or EFBGT)", "affect: TPAEBGT", "(^ AE disambiguator)", "(or AFBGT)"],
    lesson: ["again", "agree", "allow", "among", "apparently", "approach", "behind", "direct", "effect", "affect", "effect", "affect",
    "effects", "enough", "initial", "official", "officials"]},
    {text: "Notice that \"toward\" has different spellings available for \
    different pronunciations (e.g. tord => TORD, to-WARD = t-WARD => TWARD). For \"supposed\", we have suh-POHZD = s-POHZD => SPOEFD, \
    or suh-POH-zid = s-POH-zd = SPOEFD.", vocab: ["supposed: SPOEFD", "toward: TORD", "(or TWARD)"],
    lesson: ["supposed", "supposed", "supposed", "toward", "toward", "toward"]},
    {text: "In \"directly\", we want to fold in an -L, but we can't because it would break the -BG. Sometimes we go ahead and use these \
    overlapping keys anyway, as we saw in the Affixes lesson.", vocab: ["directly: TKREBLGT", "(direct: TKREBGT)"],
    lesson: ["directly", "direct", "directly", "direct"]},
    {text: "We can also use overlap to write \"function\" as TPUPBGS. Alternatively, we can drop consonants (recall this technique from the \
    Affixes lesson), as in TPUBGS.",
    affix: ["-ction (-kshun): -BGS"], vocab: ["function: TPUPBGS", "(or TPUBGS)"], lesson: ["function", "function", "function", "function"]},
    {text: "Dropping Other Sounds: Stressed Vowels" + '<br><br>' + "These words drop unstressed vowels as before, but they also drop stressed vowels.",
    vocab: ["already: L-RD", "before: PW-FR"], lesson: ["already", "already", "already", "before", "before", "before"]},
    {text: "Dropping Other Sounds: Stressed Vowels" + '<br><br>' + "The words here drop stressed vowels, but they leave one unstressed vowel.",
    vocab: ["ability: ABLT", "ago: AG", "events: AOEFPBTS"],
    lesson: ["ability", "ability", "ago", "ago", "events", "events"]},
    {text: "Now compare these same words to what we would have gotten by just dropping unstressed vowels as before." + '<br>' + "\
    ability = a-BIL-i-tee = BIL-t => PWEULT = built" + '<br>' + "ago = a-GOE => GOE = go" + '<br>' + "\
    events = e-VENTS = VENTS => SREPBTS = vents"},
    {text: "Also notice that we did not just drop both the stress and unstressed vowels. Before, we got PW-FR, which still resembles the word \
    \"before\". For this last set of words, we would have gotten BLT, G, and VNTS."},
    {text: "None of these closely resemble the words we wanted to derive them from. These are also already briefs for other words."},
    {text: "Dropping Other Sounds: Stressed Vowels" + '<br><br>' + "Here are some more words where we drop stressed syllables. For these words, \
    the first unstressed vowel remains in the brief.", affix: ["-shun: -GS", "(e.g. -tion, -sion)"],
    vocab: ["however: HOUFR", "provide: PROEFD", "reaction: RAOEBGS", "related: RELTD"], lesson: ["however", "however", "provide", "provide",
    "provides", "reaction", "reaction", "related", "related"]},
    {text: "Dropping Other Sounds: Stressed Vowels" + '<br><br>' + "This time, the last unstressed vowel remains in the brief.",
    vocab: ["college: KHREPBLG", "dollars: TKHRARS", "equal: KWAUL", "sequence: SKWEPBS"], lesson: ["college", "college", "dollars", "dollars",
    "equal", "equal", "sequence", "sequence", "sequences"]},
    {text: "Dropping Other Sounds: Vowels in Single-Syllable Words" + '<br><br>' + "Words with one syllable do not have word stress. So we \
    cannot technically drop stressed/unstressed vowels in these words."},
    {text: "However, some briefs for these words are formed by dropping vowels. \
    Here, we have ask = sk, and been = b-n.",
    vocab: ["ask: SK", "been: PWPB", "asked: SK-D"], lesson: ["ask", "ask", "been", "been", "asked", "asked"]},
    {text: document.getElementById("lesson12").textContent, top: lessonTitleTop, width: lessonTitleWidth},
    {text: "We first covered inversion in the Rings lesson. Let's see if we can write \"benefit\" using inversion. \
    Note that this words also drops unstressed vowels, since that is a principle of Plover Theory. We will show inverted letters in parentheses."},
    {text: "First, let's check out the word stress. benefit = BEN-e-fit = BEN-ft"},
    {text: "For BEN-ft, we use a left-hand B- (PW-), vowel E. Then we have nft as right-hand keys (-PB, -F, -T). To write these in steno order, \
    we swap -PB and -F to get PWEFPBT."},
    {text: "So we can write PWEFPBT => befnt = be(nf)t."},
    {text: "Let's practice this, as well as some other words that use inversion.",
    vocab: ["benefit: PWEFPBT", "credit: KRETD", "(^ cre(dt))", "decision: STKEUGS", "(^ (ds)ision)", "design: STKAOEUPB", "(^ (ds)in)"],
    lesson: ["benefit", "benefits", "credit", "decision", "design", "designed"]},
    {text: "See if you can figure out ways to write these words using inversion.",
    vocab: ["either: e(thr)", "(^ e(thr) = erth)", "enjoy: n(joi)", "(^ n(joi) = noij)", "history: his(tr)", "(^ use -F as s)"],
    lesson: ["either", "either", "enjoy", "enjoy", "history", "history"]},
    {text: "Here are a few more words to practice. Remember, if you don't know, you \
    can always click the word in the exercise above, and you will see its brief on the keyboard. Note that \"totally\" is the same as \"total\"\
    but adds a folded-in -ly ending.",
    vocab: ["models: PHOLSD", "(^ fold in -S)", "(or PHO*LDZ)", "(^ easier to type)"],
    lesson: ["despite", "disease", "model", "models", "models", "single", "total", "totally"]},
    {text: "These words use inversion and also drop consonants.",
    vocab: ["instead: STPHED", "(^ (ns)ed, drop t)", "involved: SROFLD", "(^ vo(lv)d, drop n)", "remains: RAEUPLS", "(^ r(ma)s, drop n)"],
    lesson: ["instead", "instead", "involved", "involved", "remains", "remains"]},
    {text: "Recall that inversion can be used to swap adjacent SOUNDS in a word, not just letters."},
    {text: "Here, \"animal\" (\"AN-i-mal\")becomes \"manl\" (drop unstressed vowels, invert \"m\" and \"an\"). \"Area\" (\"ER-e-ya\") becomes \"ya-er\" (drop one unstressed vowel, then invert). \
    \"Really\" (\"REEL-lee\") becomes \"lee-reel\". We drop the stressed vowels here to get \"lee-rl\".",
    vocab: ["animals: PHAPBL", "areas: KWRA*ERS", "really: HRAOERL"], lesson: ["animals", "animals", "areas", "areas", "really", "really"]},
    {text: "These words combine inversion with other brief-designing techniques. For \"general\" we use inversion, a folded-in \
    -ly ending, AND the -ly ending overlaps with the SKWR. For \"described\", we use inversion. We could either say that we drop the K consonant, or that \
    it overlaps with the TK.",
    vocab: ["generally: SKWHRERPBL", "(^ je(nr)l + fold in -ly)", "described: STKRAOEUBD", "(^ (ds)ribd)"],
    lesson: ["generally", "generally", "described", "described"]},
    {text: "We also have \"concentration\", which drops the n and t." + '<br><br>' + "kon-sen-TRA-shun = K-sn-TRA-shn (K for con-) \
    " + '<br>' + "= K-s-RA-shn (drop n and t) => (KS)RAEUGS => SKRAEUGS",
    affix: ["con-: K-", "-shun: -GS"], vocab: ["concentration: SKRAEUGS"], lesson: ["concentration", "concentration", "concentration"]},
    {text: "In \"administration\", we drop several vowels and consonants." + '<br><br>' + "ad-min-u-STRA-shun = d-mn-STRA-shun \
    " + '<br>' + "= d-STRA-shun (drop m, n) => (S(d&t))RAEUGS (overlap d,t) => STKRAEUGS",
    affix: ["-shun: -GS"], vocab: ["administration: STKRAEUGS"], lesson: ["administration", "administration", "administration"]},
    {text: document.getElementById("lesson13").textContent, top: lessonTitleTop, width: lessonTitleWidth},
    {text: "Other Patterns: \"Folding In\" a Prefix" + '<br><br>' + "We disambiguate long/along and cross/across by using AO in the a- words. \
    However, it can be useful to think of this as folding in the a- prefix.",
    vocab: ["long: HROPBG", "along: HRAOPBG", "cross: KROS", "across: KRAOS", "tension: TEPBGS", "attention: TAEPBGS"],
    lesson: ["long", "along", "long", "along", "cross", "across", "cross", "across", "tension", "attention", "tension", "attention"]},
    {text: "Other Patterns: ex- as S" + '<br><br>' + "Sometimes you will see ex- words whose briefs begin with S-. Consider \"experience\". \
    This is pronounced ik-SPEER-ee-uns. We drop the unstressed vowels and drop the first stressed consonant. We end up with SPEER-ns.",
    vocab: ["experience: SPAOERPBS", "(or KPAOERPBS)", "experiments: SPAOERPLTS", "executive: SKAOUF"],
    lesson: ["experience", "experience", "experiments", "experiments", "executive", "executive"]},
    {text: "Other Patterns: -kly as -LG", vocab: ["likely: HRAOEULG", "quickly: KWEULG", "weekly: WAOELG"],
    lesson: ["likely", "quickly", "weekly", "likely", "likely", "quickly", "quickly", "weekly", "weekly"]},
    {text: "Other Patterns: -king as -G", vocab: ["looking: HRAOG", "walking: WAUG", "talking: TAUG"],
    lesson: ["look", "looking", "looking", "walk", "walking", "walking", "talk", "talking", "talking"]},
    {text: "Other Patterns: -ded as -TD", vocab: ["needed: TPHAOETD", "decided: STKAOEUTD", "divided: TKWAOEUTD"],
    lesson: ["needed", "needed", "needed", "decided", "decided", "decided", "divided", "divided", "divided"]},
    {text: "Other Patterns: -cal as *LG", vocab: ["magical: PHA*LG", "logical: HR*LG", "neurological: TPH*LG"],
    lesson: ["magical", "logical", "neurological", "magical", "logical", "neurological"]},
    {text: "Other Patterns: -gion, -son, -tial as -GS", affix: ["-shun: -GS", "(e.g. -tion, -sion)"],
    vocab: ["region: RAOEGS", "regions: RAOEGSZ", "poison: POEUGS", "season: SAOEGS", "treason: TRAOEGS", "essential: AOEGS", "confidential: K-FGS"],
    lesson: ["region", "regions", "poison", "season", "treason", "essential", "essential", "confidential", "confidential"]},
    {text: "Disambiguators: OEU" + '<br><br>' + "OEU is less common than other vowel combinations, so it can often be used to disambiguate words.",
    vocab: ["policy: POEULS", "poles: POELS", "theist: THAOEFT", "atheist: THOEUFT"],
    lesson: ["policy", "policy", "poles", "poles", "theist", "theist", "atheist", "atheist"]},
    {text: "Other Patterns: Folding In -F for -ive Endings",
    vocab: ["motive: PHO*EUFT", "(PHOEUFT is moist)", "(PHOEFT is most)", "intuitive: TWAOUFT", "decisive: STKAOEUFS",
    "adhesive: HAO*EFS", "(HAOEFS is heaves)", "alternative: HR-FRPBT"], lesson: ["motive", "motive", "intuitive", "intuitive", "decisive", "decisive",
    "adhesive", "adhesive", "alternative", "alternative"]},
    {text: "Other Patterns: cans-, canc- as SK", vocab: ["cancer: SKER", "cancel: SKEL"],
    lesson: ["cancer", "cancer", "cancel", "cancel", "cancer", "cancel", "cancer", "cancel"]},
    {text: "Disambiguators: SK" + '<br><br>' + "This combination is sometimes used to disambiguate words with sc-, like seen vs. scene. However, it is \
    used in some less-expected pairs as well.",
    vocab: ["can't:  K-PBT", "cannot: SK-PBT", "corral: KRAL", "central: SKRAL", "(or STRAL)", "center: STR", "craft: KRAFT",
    "contrast: SKRAFT", "(or KRAEFT)", "seen: SAOEPB", "scene: SKAOEPB", "(or SAEPB)", "signs: SAOEUPBS", "science: SKAOEUPBS"],
    lesson: ["can't", "cannot", "can't", "cannot", "corral", "central", "central", "center", "craft", "contrast", "contrast", "seen",
    "seen", "scene", "scene", "signs", "science", "science"]},
    {text: "Unexpected Spellings" + '<br><br>' + "\"Culture\" and \"future\" use spelling instead of sound (\"ture\" sounds like \"chur\"). \
    \"Situation\" is sometimes pronounced as \"sich-u-way-shun\", hence the W. \"Indeed\" is disambiguated from \"need\" with an unexpected -PB.",
    vocab: ["culture: KURLT", "future: TPAOURT", "situation: STWAEUGS", "(or SWAEUGS)", "indeed: TPHAOEPBD"],
    lesson: ["culture", "future", "situation", "situation", "indeed", "indeed", "culture", "future"]},
    {text: "Unexpected Spellings" + '<br><br>' + "\"Pretty\" has a Single Short vowel, so we expect it to be SSSpelled, but it uses sound (\"i\") instead. \
    However, some of its multistroke forms (PRET/TEU, PRET/AOE) do use spelling.",
    vocab: ["pretty: PREUT"], lesson: ["pretty", "pretty", "pretty"]},
    {text: "In the Practice section (menu above), you will find a list of words titled \"Multiple Strokes Only\". See if you can come up with \
    your own briefs by using some of the techniques you've learned in these lessons" + " \
    (or check " + '<a href="my_briefs_top_1000.xlsx">' + "here" + '</a>' + " for some ideas)."},
    {text: document.getElementById("lesson14").textContent, top: lessonTitleTop, width: lessonTitleWidth},
    {text: "If you have gone through all of the lessons, you have learned the \
    " + '<a href="https://github.com/openstenoproject/plover/wiki/Top-100-English-Words-in-Plover\'s-Dictionary" target="_blank">' + "\
    Top 100 English Words in Plover's Dictionary" + '</a>' + "."},
    {text: "You have also learned patterns that can be used to write many of the 1000 most commonly used words in English."},
    {text: "If you click Practice in the menu above, you will see exercises to practice those 1000 words. These exercises divide \
    the words into categories (such as \"Phonetic Words\" and \"Words with Inversion\")."},
    {text: "I strongly recommend you read both \
    " + '<em><a href="https://sites.google.com/site/learnplover" target="_blank">' + "Learn Plover!" + '</a></em>' + " \
    " + " and " + '<em><a href="https://www.artofchording.com" target="_blank">' + "The Art of Chording" + '</a></em>' + ".\
    These books are free and online, and they will help you solidify and build on what you've learned here."},
    {text: "For more practice, check out the resources on the \
    " + '<a href="https://github.com/openstenoproject/plover/wiki/Learning-Stenography" target="_blank">' + "Open Steno Project GitHub page\
    " + '</a>' + "."}
  ]

  // go to selected index, show text for that index
  function showNarration() {
    if (!narrationText[index]) { return; } // if link to other page clicked, follow link

    // use preset width if set, else set a width relative to string length
    let textLength = narrationText[index].text.length;
    console.log("text length before: " + textLength);
    if (narrationText[index].text.includes("href")) { textLength -= 100; }
    console.log("text length: " + textLength);

    if (window.innerWidth > 2000) { textLength += 500; }

    if (window.innerWidth <= 450) { narration.style.width = 95 + "\%"; }
    else if (narrationText[index].width != null) { narration.style.width = narrationText[index].width + "px"; }
    else if (textLength < 50) {narration.style.width = 350 + "px"; }
    else if (textLength < 100) { narration.style.width = textLength * 6 + "px"; }
    else if (textLength < 200) { narration.style.width = textLength * 5 + "px"; }
    else if (textLength < 300) { narration.style.width = textLength * 4 + "px"; }
    else { narration.style.width = textLength * 2.2 + "px"; }

    // set narration box text
    narration.innerHTML = narrationText[index].text;

    // set narration box x position
    // let widthPercentage = 100 * (narration.getBoundingClientRect().width / window.innerWidth);
    // if (window.innerWidth <= 590 && (window.innerWidth < window.innerHeight)) { narration.style.left = 2.5 + "\%"; } // not landscape
    // else if (narrationText[index].left != null && (window.innerWidth < window.innerHeight) && window.innerWidth >= 780 && window.innerWidth < 1200) { narration.style.left = narrationText[index].left + "\%"; } // not landscape
    // else { narration.style.left = ((100 - widthPercentage) / 2) + "\%"; }

    // set narration box y position
    // if (window.innerWidth <= 780 || (window.innerWidth > window.innerHeight && window.innerWidth < 1100 && window.innerHeight > 780)) { narration.style.top = 85 + "\%"; } // include landscape
    // else if (narrationText[index].top != null && window.innerWidth < 1200) { narration.style.top = narrationText[index].top + "\%"; }
    // else { narration.style.top = 115 + "\%"; }

    // add and remove highlights
    if (narrationText[index].highlight) { narrationText[index].highlightElement.classList.add("highlight-element"); }
    if (index > 0 && narrationText[index-1].highlight) { narrationText[index - 1].highlightElement.classList.remove("highlight-element"); }

    // add and remove green keys
    if (narrationText[index].greenKeysOn) {
      for (let i = 0; i < narrationText[index].greenKeysOn.length; i++) {
        document.getElementById(narrationText[index].greenKeysOn[i]).classList.add("green-key");
      }
    }
    if (narrationText[index].greenKeysOff) {
      for (let i = 0; i < narrationText[index].greenKeysOff.length; i++) {
        document.getElementById(narrationText[index].greenKeysOff[i]).classList.remove("green-key");
      }
    }

    // call an additional function, if needed
    if (narrationText[index].extraCode) { extraCode(narrationText[index].extraCode); }

    // set letters for lesson
    if (narrationText[index].lesson) {
      getNextLesson(true, narrationText[index].lesson);
      getPracticeIndex(true, 0);

      // show the proper number of letters -- all, 10, or length or text
      if (narrationText[index].full && window.innerWidth > 480) {
        getNextLessonFull(true, true); // set next lesson full to true
        generatePracticeLetters(getNextLesson(), 0, getNextLesson().length);
       }
      else {
        getNextLessonFull(true, false); // set next lesson full to false
        generatePracticeLetters(getNextLesson(), 0, Math.min(getPracticeIndex()+10, getNextLesson().length));
      }
    }

    // make sure narration box isn't still wiggling
    document.getElementById("narration").classList.remove("wiggle");

    // set notebookPaper height to the same as keyboard (keyboard transformed for responsivity)
    let notebookPaper = document.getElementById("notebook-paper");
    let keyboardHeight = document.getElementById("keyboard").getBoundingClientRect().height;
    let stenoHeight = document.getElementById("steno-order").getBoundingClientRect().height;
    notebookPaper.style.maxHeight = stenoHeight + keyboardHeight + "px";

    // reset line height in vocab box
    let lines = document.getElementsByClassName("lines");
    lines[0].style.height = "98%";

    // show vocab if there is any, remove old vocab
    if (!narrationText[index].vocab && !narrationText[index].affix) { vocabBox.hidden = true; }
    if (narrationText[index].vocab || narrationText[index].affix) { vocabBox.innerHTML = ""; }

    // add vocab entries
    //---affixes and sounds entries
    if (narrationText[index].affix) {
      vocabBox.innerHTML += '<span class="headingSpan vocabSpan">' + "Affixes & Sounds" + '</span>';
      vocabBox.innerHTML += '<span class="vocabSpan">' + '<p>' + narrationText[index].affix.join("</p></span><span class='vocabSpan'><p>") + '</p>' + '</span>';
      vocabBox.hidden = false;
    }

    //---vocab entries
    if (narrationText[index].vocab) {
      vocabBox.innerHTML += '<span class="headingSpan vocabSpan">' + "Vocab" + '</span>';
      vocabBox.innerHTML += '<span class="vocabSpan">' + '<p>' + narrationText[index].vocab.join("</p></span><span class='vocabSpan'><p>") + '</p>' + '</span>';
      vocabBox.hidden = false;
    }

    // adjust height of red lines
    if (lines[0].clientHeight < 0.95 * vocabBox.scrollHeight) {
      lines[0].style.height = 0.99 * notebookPaper.scrollHeight + 'px';
    }
    notebookPaper.scrollTop = 0;

    // show hand positions when a vocabulary word is clicked
    let vocabSpans = document.querySelectorAll(".vocabSpan:not(.headingSpan)");
    for (let i = 0; i < vocabSpans.length; i++) { vocabSpans[i].addEventListener("click", vocabListener, false); }
    function vocabListener() {
      // console.log("pressed a span, text is " + event.target.textContent);
      let wordIndex = event.target.textContent.indexOf(":");
      let word = event.target.textContent.substring(0, wordIndex);
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

    index++; // go to the next index when done
  }

  // get starting indices of lessons
  let menuIndices = [];
  for (let i = 0; i < items.length; i++) { menuIndices.push(narrationText.findIndex(obj => obj.text === items[i].textContent)); }

  // show proper narration when a menu item is clicked; clear exercise and steno order
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function() {

      // show initial narration; clear steno order, exercise letters
      narration.hidden = false;
      document.getElementById("side-view").hidden = true;
      index = menuIndices[i];
      clearPracticeLetters();
      clearGreenKeys();
      clearStenoOrder();
      clearHighlights();
      showNarration();
    }, false);
  }

  // get the next narration text, position, etc. to display when user types/taps enter or backspace
  document.body.addEventListener("keydown", nextText, false);
  document.getElementById("key-enter").addEventListener("click", nextText, false);
  document.getElementById("key-backspace").addEventListener("click", nextText, false);
  function nextText() {
    // if index is within range, and enter tapped/typed, or backspace tapped/typed
    // also: if user taps text in enter/backspace button
    if ((index <= narrationText.length) && (index >= 0) &&
    ((event.key === "Enter") || (event.target.parentElement.id === "key-enter") || (event.target.id === "key-enter") ||
    (event.key === "Backspace") || (event.target.parentElement.id === "key-backspace") || (event.target.id === "key-backspace"))) {

      // clear the practice area, hand position on keyboard, etc.
      clearPracticeLetters();
      clearStenoOrder();
      positionHand("");
      clearHighlights();

      console.log("current index: " + index);
      if ((event.key === "Enter") || (event.target.parentElement.id === "key-enter") ||
      (event.target.id === "key-enter")) {
        if (index < narrationText.length) { showNarration(); }
        else { console.log("end of lessons"); }
      } else if (((event.key ==="Backspace") || (event.target.parentElement.id === "key-backspace") ||
      (event.target.id === "key-backspace")) && (index >= 2)) {
        clearGreenKeys();
        index = index - 2; // showNarration(index-2);
        showNarration();
      }
    }
  }
}
