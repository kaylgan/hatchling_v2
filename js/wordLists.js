let getLastKey = (function(set = false, setValue = "") {
  let lastKey = "";
  return function(setInner = set, setValueInner = setValue) {
    if (setInner) { lastKey = setValueInner; }
    return lastKey;
  }
})();

// closure for word lists
let getWordList = (function(getValue) {
  console.log("In getWordList with " + getValue);
  let returnList = "empty list";

  return function (getValueInner = getValue) {
    console.log("In getWordList return with " + getValueInner);
    // get the proper word list
    switch (getValueInner) {
      case ("phonetic"):
        returnList = "a act age air all am an and art as at back bad base based big bill bit black blood book books both bought boy brain bring brought budget built but buy call called calls came can car care case cause chance change changed check chief child choice class clear close come comes cool course court cut date day days dead deal death did died does done door down drive drug drugs due eat else end face fact fall far feel felt few field fight file find fine fire food for force form found free friend friends from front full fun game gave gene get gets girl give gives go goes gone good got ground group groups growth guess guy guys had hair hand hard has head health heard heart held her here high him his hit hold home hope hot hour hours house how huge it its job keep kept key kids kill killed kind knew know known lack large late law lead leads learn led left less let life light like liked line lines live lived lives long look looked looks loss lot love low mail main make makes man may me mean means meet men met mice might miles mind month months more move moved must my name named names near need needs news nice night no none nor not note notes now off old on once one our out own page paid part parts pay per phone pick piece place plan plans play played please plus point points poor press price put quite race rate rates red right rights road role room rule rules run said same saw say says school schools see seem seemed seems seen send sense sent set share she short shot should show showed shown shows side since size small some son soon sort sound sounds source space spend spent staff stage start state states stay step still stock stop strong stuff style sure take takes tax team tell term terms than thanks them then these thing things those though thought thus time times told too took top town trade trial tried true try turn turned type types up us use vote wait want wants war was way ways we week weeks well went why wife will word words work worked works world worth year years yet";
        break;

      case ("phonetic-mod"):
        returnList = "basically binding building cases changes church clearly coming comment comments common companies company compared complete completely complex cost costs during each earlier entire example factor factors feeling film former getting giving going growing half have help higher highly into just last later leading least living longer lower meeting moment morning most mostly movie movies much nearly never older only paper papers party past places playing post range rest risk saying section simple sorry speech spending started starting stories story such talk test think training treated trying used using version view walk wanted watch watching water which workers";
        break;

      case ("unstressed"):
        returnList = "able above again agree allow among apparently approach associated average behind collection community couple cover current difference differences different direct directly early effect effects effort efforts enough even evil favorite final finally followed following foreign given initial level levels limited market maybe method methods money music noted offer office official officials often over parents people period players possible power practice private quality sample samples serious security several social special supposed toward unit various visit";
        break;

      case ("inversion"):
        returnList = "benefits control credit decision design designed despite disease either enjoy first further generally history model models single summer total totally";
        break;

      case ("stressed"):
        returnList = "ability ago already also any anyone anything anyway around before college dollars equal events ever function however provide provides reaction related sequence sequences";
        break;

      case ("consonants"):
        returnList = "according addition additional after against always amount another appropriate article available became because began beginning between beyond business campaign capital certain certainly character children clinical computer containing corporate countries country daughter determine determined developed development difficult director discussion economic economy education effective except expected families family father federal figure general government happen happened himself human husband identified imagine important include included includes including income individual industry information international language legal little local looking major majority making management members military minutes modern mother multiple national natural necessary normal nothing number numbers open order organization original other others particular particularly patient patients percent performance performed perhaps person personal political population position positive potential presence present president pressure previous previously probably product production products program programs proposed protein proteins public question questions rather reason reasons received recent recently record report reported reports required research response result results return second service services significant significantly similar simply somebody someone something sometimes species specific standard standards structure students subject suggest suggested system systems talking technology television themselves thinking together treatment understand unless until volume woman wonder yesterday";
        break;

      case ("other-words"):
        returnList = "across actual actually administration along animals area areas cancer central culture decided every everybody everyone everything experience experiments executive future indeed interest likely needed outside pretty really region regions season situation value values concentration described instead involved remains";
        break;

      case ("spelled"):
        returnList = "to I he do or so who when your two";
        break;

      case ("disambiguate"):
        returnList = "access action activities activity allowed analysis answer attention away basis believe below board body break by cannot can't cell cells center century contrast created data dear doing employees expression eyes financial genes gonna great greater hear independent issue issues itself knows larger leave list lost made many matter measure middle myself nation new next ok okay overall picture police policy popular primary problem problems process produced read reading real relationship running scene series sex site sites software studies study suggests support taken taking their through tissue under usually weight whole whose write would writing written wrong wrote yeah yes";
        break;

      case ("brief-only"):
        returnList = "about are ask asked be become been being could if in is of remember that the there they this today upon very were what whatever where whether while white with within you";
        break;

      case ("multi-only"):
        returnList = "added address agencies agency alone appear appears attack critics episode expressed increase increased interview medical nuclear provided relative review";
        break;

      case ("brief-multi-only"):
        returnList = "account almost although background city conditions consider considered consistent continue critical easy especially evidence exactly funny happy having idea inside interesting observed therefore without women working";
        break;

      default:
        returnList = "No list returned."
    }

    // return the word list
    return returnList;
  }
})();
