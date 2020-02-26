var HintType = {
    GAME : {value: 0, name: "Game", code: "G"}, 
    PROGRAMMING: {value: 1, name: "Programming", code: "P"}, 
    SHOUTOUTS: {value: 2, name: "Shoutouts", code: "S"}, 
    COMEDIC: {value: 3, name: "Comedic", code: "C"}, 
    FUTURISM: {value: 4, name: "Futurism", code: "F"},
    DEFAULT: {value: 5, name: "Default", code: "D"},
  };
  

class Hint {
    constructor(lines, hintType) {
        this.lines = (lines == null || lines == undefined) ? ["Empty"] : lines;
        this.hintType = (hintType == null || hintType == undefined)? HintType.DEFAULT : hintType;
    }
}

const gameStartHints = [
    new Hint([
        "EAT!",
    ], HintType.GAME),
    new Hint([
        "The 'Celestials' are coming...",
    ], HintType.GAME),
    new Hint([
        "HUNGRY, HUNGRY, HUNGRY!!!",
    ], HintType.GAME),
    new Hint([
        "GO!",
    ], HintType.GAME),
    new Hint([
        "I hope you're hungry...",
    ], HintType.GAME),
    new Hint([
        "Lith is unstoppable!",
    ], HintType.GAME),
    new Hint([
        "Lith is the greatest!",
    ], HintType.GAME),
    new Hint([
        "Here they come!",
    ], HintType.GAME),
    new Hint([
        "I hope you're ready.",
    ], HintType.GAME),
    new Hint([
        "Tick tock!",
    ], HintType.GAME),
    new Hint([
        "Monolith might!",
    ], HintType.GAME),
    new Hint([
        "YUM YUM YUM YUM YUM!",
    ], HintType.GAME),
    new Hint([
        "GO LITH!!!",
    ], HintType.GAME),
    new Hint([
        "They look Monoliscious!",
    ], HintType.GAME),
    new Hint([
        "Ready for a midnight snack?",
    ], HintType.GAME),
    new Hint([
        "Lith want eat PLANET!",
    ], HintType.GAME),
    new Hint([
        "WE LOVE LITH!",
    ], HintType.GAME),
    new Hint([
        "Lith Lith LITH!!!",
    ], HintType.GAME),
    new Hint([
        "Divine providence!",
    ], HintType.GAME),
    new Hint([
        "The 'Celestials' ain't nothin'!",
    ], HintType.GAME),
    new Hint([
        "How's that 'Flutter'?",
    ], HintType.GAME),
    new Hint([
        "Is anyone else concerned",
        "about Lith?"
    ], HintType.GAME),
    new Hint([
        "Uhh...",
        "Lith IS unstoppable..."
    ], HintType.GAME),
    new Hint([
        "Are Monoliths bad?"
    ], HintType.GAME),
    new Hint([
        "Theseus' ship?"
    ], HintType.GAME),
]

const allHints =[
    //Game hints
    new Hint([
        "Lith is getting hungrier...",
        "FEED HER!"
    ], HintType.GAME),
    new Hint([
        "The 'Celestials' are yours to eat!",
        "But don't eat the little ones..."
    ], HintType.GAME),
    new Hint([
        "You are looking quite dashing!",
        "H or double-click to dash!"
    ], HintType.GAME),
    new Hint([
        "If a 'Celestial' is smaller than Lith",
        "She will die trying to eat it."
    ], HintType.GAME),
    new Hint([
        "You can move by clicking, with WASD",
        "Or with the arrow keys.",
        "H.l.L. even supports touch controls!",
        "WHAT!?"
    ], HintType.GAME),
    // Programming related
    new Hint([
        "What a nice screen dim!",
        "Discovered by accident..."
    ], HintType.PROGRAMMING),
    // Shoutouts
    new Hint([
        "YO CORBIN!!!",
        "Don't be blue.",
        "I'm green!",
        "@Sensei. Obv. best Instructor..."
    ], HintType.SHOUTOUTS),
    new Hint([
        "Yo Dev10!"
    ], HintType.SHOUTOUTS),
    new Hint([
        "Yo Harley!"
    ], HintType.SHOUTOUTS),
    new Hint([
        "TARA W!!!"
    ], HintType.SHOUTOUTS),
    new Hint([
        "Team Danielle!"
    ], HintType.SHOUTOUTS),
    new Hint([
        "Toast!",
        "That's you if you face",
        "Eddy's Ryu!"
    ], HintType.SHOUTOUTS),
    new Hint([
        "Music by Jerome Pullin! :D",
        "Flutter is amazing!",
        "Why aren't you famous?"
    ], HintType.SHOUTOUTS),
    new Hint([
        "Thomas S.-- a bibliophile,",
        "a nasty Link, an esteemed coder,",
        "and he knows about the Kardashev",
        "scale?!",
    ], HintType.SHOUTOUTS),
    new Hint([
        "Touger -- world record",
        "typing speed champion,",
        "succint wisdom."
    ], HintType.SHOUTOUTS),
    new Hint([
        "Duncan Henry--",
        "Master algorithmist,",
        "145 I.Q. at least,",
        "exceedingly kind gentleman."
    ], HintType.SHOUTOUTS),
    new Hint([
        "Mac Ferguson--",
        "A humble genius,",
        "a serene perspective,",
        "coding experience of 10 people!"
    ], HintType.SHOUTOUTS),
    new Hint([
        "Jacob White...",
        "will outclass all of",
        "us in six months time."
    ], HintType.SHOUTOUTS),
    new Hint([
        "John Brown",
        "incarnation of empathy,",
        "polite to a p,",
        "and eats code for lunch!"
    ], HintType.SHOUTOUTS),
    new Hint([
        "Beth Raymond--",
        "your own personal ghost writer",
        "and Big Bang Theorist!"
    ], HintType.SHOUTOUTS),
    new Hint([
        "Nicolas Graese--",
        "master of the modulus,",
        "king of efficieny...",
        "We should make a game together!"
    ], HintType.SHOUTOUTS),
    new Hint([
        "Julie--",
        "fellow animator,",
        "hard worker, hard coder,",
        "sharp as a tack!"
    ], HintType.SHOUTOUTS),
    new Hint([
        "Mark C--",
        "quick as a whip,",
        "reliable, focused,",
        "and one nasty DeDeDe!"
    ], HintType.SHOUTOUTS),
    new Hint([
        "Mayzer--",
        "a kind heart,",
        "a warm soul,",
        "a fellow head-shaver!"
    ], HintType.SHOUTOUTS),
    new Hint([
        "Joe--",
        "music lover,",
        "hell on keys,",
        "and most stylish Dev10er!"
    ], HintType.SHOUTOUTS),
    new Hint([
        "Tom--",
        "reserved, strong",
        "exceptional gentleman,",
        "and most handsome Dev10er!"
    ], HintType.SHOUTOUTS),
    new Hint([
        "Chon--",
        "THE PEOPLE'S CHAMPION",
        "'nuff said...'",
    ], HintType.SHOUTOUTS),
    new Hint([
        "Ryan--",
        "calm and collected,",
        "devoted husband,",
        "great musical talent,",
        "excellent sense of humor."
    ], HintType.SHOUTOUTS),
    // Comedic
    new Hint([
        "You can't get mono from a Monolith!",
        "... wait can you?!"
    ], HintType.COMEDIC),
    new Hint([
        "AAAAHHHUUUUUUUHHHHHAAAAAAHHHHH",
        "AAAAHHHUUUUUUUHHHHHAAAAAAHHHHH",
        "AAAAHHHUUUUUUUHHHHHAAAAAAHHHHH",
        "AAAAHHHUUUUUUUHHHHHAAAAAAHHHHH!!!"
    ], HintType.COMEDIC),
    new Hint([
        "Daisy, Daisy give me your answer do.",
    ], HintType.COMEDIC),
    new Hint([
        "I'm half crazy all for the love of you.",
    ], HintType.COMEDIC),
    new Hint([
        "It won't be a stylish marriage...",
    ], HintType.COMEDIC),
    new Hint([
        "...but you'll enjoy the carriage.",
    ], HintType.COMEDIC),
    new Hint([
        "And you'll look sweet upon the seat...",
    ], HintType.COMEDIC),
    new Hint([
        "...of a bicycle made for two!",
    ], HintType.COMEDIC),
    new Hint([
        "Well I'll be a monkey's uncle!",
        "Or a monkey's ancestor?"
    ], HintType.COMEDIC),
    new Hint([
        "There's only one Lith...",
        "that's why they call her Mono-Lith!"
    ], HintType.COMEDIC),
    new Hint([
        "I hope you're enjoying Super Lith Wor-",
        "I mean Hungry li'l Lith."
    ], HintType.COMEDIC),
    new Hint([
        "What do you get if you have two Liths???",
        "...",
        "A whole new fighting game character!",
        "Get it? Bi-Lith!"
    ], HintType.COMEDIC),
    new Hint([
        "Poor Lith...",
        "Stanley Kubrick won't return her calls."
    ], HintType.COMEDIC),
    new Hint([
        "If you hear horrific screaming...",
        "it means you shouln't be touching Lith."
    ], HintType.COMEDIC),
    new Hint([
        "Lith is totally unique!",
        "There's no one else like her in the whole universe!",
        "Except for the countless other Monoliths she's created..."
    ], HintType.COMEDIC),
    new Hint([
        "Modern humans aren't even on the Kardashev Scale.",
        "Type 0?",
        "I BLAME BILL GATES!"
    ], HintType.COMEDIC),
    new Hint([
        "Lith is a girl!",
        "Does that even make sense?"
    ], HintType.COMEDIC),
    new Hint([
        "Don't let Lith stonewall you.",
        "Get it?"
    ], HintType.COMEDIC),
    new Hint([
        "Time for some black-box testing!",
        "Get it?"
    ], HintType.COMEDIC),
    new Hint([
        "Stephen Hawking once held a party for time travelers.",
        "No one came...",
        "I guess he should have sent the invitation back in time!"
    ], HintType.COMEDIC),
    new Hint([
        "It's not that big of a deal to be absorbed by Lith.",
        "You'll understand perfectly once she absorbs you."
    ], HintType.COMEDIC),
    new Hint([
        "Lith has known you since you were a chimpanzee.",
        "That's a long time!"
    ], HintType.COMEDIC),
    new Hint([
        "Lith is so, so hungry.",
    ], HintType.COMEDIC),
    // Scientific philosophy / Science facts.
    new Hint([
        "An early Type-I Civilization is planetary."
    ], HintType.FUTURISM),
    new Hint([
        "A late Type-I Civilization is stellar."
    ], HintType.FUTURISM),
    new Hint([
        "A Type-II Civilization is interstellar."
    ], HintType.FUTURISM),
    new Hint([
        "A Type-III Civilization is galactic."
    ], HintType.FUTURISM),
    new Hint([
        "A Type-IV Civilization is intergalactic."
    ], HintType.FUTURISM),
    new Hint([
        "A Type-V Civilization is temporal."
    ], HintType.FUTURISM),
    new Hint([
        "The Kardashev Scale is a hypothetical model used to",
        "predict a civilization's technological development",
        "based on its energy production."
    ], HintType.FUTURISM),
    new Hint([
        "A 'Kardashevian god' is a hypothetical creature",
        "that combusts/digests time in order to travel through time."
    ], HintType.FUTURISM),
    new Hint([
        "'The Great Filter' is a hypothesis to explain why",
        "extraterrestrial intelligences have not yet made contact."
    ], HintType.FUTURISM),
    new Hint([
        "These 'Celestials' look so tasty.",
        "It would be a shame if they went uneaten..."
    ], HintType.FUTURISM),
    new Hint([
        "If time travelers will ever exist",
        "then they exist now."
    ], HintType.FUTURISM),
    new Hint([
        "If time travelers will ever exist",
        "then they may be affecting us now",
        "and may not be aware",
        "nor concerned."
    ], HintType.FUTURISM),
    new Hint([
        "If human or human derived time travelers",
        "will ever exist then they",
        "exist now."
    ], HintType.FUTURISM),
    new Hint([
        "Humans are more likely to be trustworthy",
        "than alien intelligences who may",
        "or may not have evolved or maintained",
        "empathy."
    ], HintType.FUTURISM),
    new Hint([
        "Human or human derived time travelers",
        "are more likely to be trustworthy",
        "than alien time travelers."
    ], HintType.FUTURISM),
    new Hint([
        "The electron spin of antimatter",
        "is opposite of matter's!"
    ], HintType.FUTURISM),
    new Hint([
        "The arrow of time of antimatter",
        "is opposite that of matter!"
    ], HintType.FUTURISM),
    new Hint([
        "There are ten dimensions.",
        "The first three are the 'presence' dimensions.",
        "These dimensions are comprised of matter!"
    ], HintType.FUTURISM),
    new Hint([
        "There are ten dimensions.",
        "The second three are the 'possibility' dimensions.",
        "These dimensions are comprised of possibility(time)!"
    ], HintType.FUTURISM),
    new Hint([
        "There are ten dimensions.",
        "The third three are the 'precept' dimensions.",
        "These dimensions are comprised of chemical",
        "and physical rules to all lower dimnensions."
    ], HintType.FUTURISM),
    new Hint([
        "There are ten dimensions.",
        "The tenth dimension comprises all",
        "possible rules for all possible times",
        "for all possible material realities."
    ], HintType.FUTURISM),
];