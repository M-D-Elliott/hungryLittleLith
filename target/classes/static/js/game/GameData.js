// class to handle initialization and resetting of gamedata.
class GameData {
    constructor(canvas) {
        this.state = {
            current: GameState.MAINMENU,
            callback: null,
        }
        this.screen = {
            canvas: canvas,
            ctx: canvas.getContext('2d'),
            clientGameDimensions: {
                x: 1,
                y: 1,
            },
            environment: null,
        };
        this.tools = {
            clock: null,
            listener: null,
        };
        this.characters = {
            lith: null,
            celestials: null
        };
        this.menus = {
            main: {
                background: null,
                titleImage: null,
                start: null,
                tutorialButton: null,
                tutorialSplash: null,
                creditsButton: null,
                creditsSplash: null,
                showCredits: false,
                showTutorial: false,
            },
            dashBoard: {
                background: null,
                pause: null,
                restart: null,
                scoreDisplay: null,
                dashIndicator: null,
                typeDisplay: null,
            },
        };
        this.splashes = {
            win: null,
            pause: null,
            gameOver: null,
            submit: null,
        };
        this.settings = {
            darkenTicks: 0,
            score: 0,
            paused: false,
            gameOver: false,
            continueMainMenu: true,
            win: false,
        };
        this.levelData = {
            spawnRate: MIN_SPAWN_RATE,
            level: 1,
            spawnType: SpawnType.LEVEL,
            spawnsSinceLastEdible: 0,
            edibleSpawnRarity: BASE_EDIBLE_SPAWN_RARITY,
            celestialSpeed: 1,
        };
        this.events = [];
        this.sound = {
            allow: ALLOW_SOUND,
            tracks: [],
            toggleButton: null,
            currentBackgroundMusic: null,
            pause: true,
        };
    }

    init() {
        const screen = this.screen;
        const tools = this.tools;

        // ********TOOLS**********
        screen.canvas.width = RESOLUTION.WIDTH;
        screen.canvas.height = RESOLUTION.HEIGHT;
        this.calcGameScreen();

        tools.clock = new Clock(MAX_TICK);
        tools.listener = new Listener(screen.canvas, screen.clientGameDimensions, DOUBLE_CLICK_INTERVAL);
        tools.listener.setEvents();

        // ********SOUND**********
        this.sound.tracks = this.loadMusic();

        // *********MENUS***********
        const buttonSound = this.sound.tracks[SoundTrack.ROLL_OVER_CLICK.value];
        this.sound.toggleButton = this.buildMusicToggleButton(buttonSound);

        this.menus.main.background = this.buildMainBackground();
        this.menus.main.titleImage = this.buildTitleImage();
        this.menus.main.start = this.buildStartGameButton(buttonSound);
        this.menus.main.tutorialButton = this.buildTutorialButton(buttonSound);
        this.menus.main.tutorialSplash = this.buildTutorialMenuSplash();
        this.menus.main.creditsButton = this.buildCreditsButton(buttonSound);
        this.menus.main.creditsSplash = this.buildCreditsMenuSplash();

        this.menus.dashBoard.background = this.buildDashBoardMenu();
        const dashBoardY = this.menus.dashBoard.background.y;
        this.menus.dashBoard.restart = this.buildRestartButton(dashBoardY, buttonSound);
        this.menus.dashBoard.pause = this.buildPauseButton(dashBoardY, buttonSound);
        this.menus.dashBoard.scoreDisplay = this.buildScoreDisplay(dashBoardY);
        this.menus.dashBoard.dashIndicator = this.buildDashIndicator(dashBoardY);
        this.menus.dashBoard.typeDisplay = this.buildTypeDisplay(dashBoardY);

        // **********LEVEL************
        screen.environment = new Environment(screen.canvas, screen.ctx, 'bg1', BASE_SCROLL_SPEED);

        // ******SCREEN SPLASHES******
        this.splashes.win = this.buildWinSplash();
        this.splashes.pause = this.buildPauseSplash();
        this.splashes.gameOver = this.buildWinSplash(GAME_OVER_TEXT);
        this.splashes.submit = this.buildSubmitButton(buttonSound);
        this.splashes.pause.render();



        // **********ETC************
        const self = this;
        //fixes game screen for mouse following behavior.
        window.onresize = function (event) {
            self.calcGameScreen();
        };

        return this;
    }


    reset() {

        // ******TOOLS/SETTINGS*********

        this.tools.clock.reset();
        this.settings.gameOver = false;
        this.settings.win = false;
        this.settings.paused = false;
        this.settings.continueMainMenu = true;
        this.settings.darkenTicks = 0;
        this.screen.ctx.fillStyle = "#FFFFFF";

        this.settings.score = 0;
        this.menus.dashBoard.scoreDisplay.text = SCORE_INDICATOR + this.settings.score;
        this.screen.environment.setBgSpeed(BASE_SCROLL_SPEED);

        // ***********SOUND************

        const tracks = this.sound.tracks;
        const dashSound = tracks[SoundTrack.WHOOSH.value];
        const eatSound = tracks[SoundTrack.EAT.value];
        this.changeTrack(SoundTrack.SPACE_CRUISE);

        // *********CHARACTERS************

        this.characters.lith = new Lith(80, 250, IMG_SCALE, this.screen);
        this.characters.lith.setScale(LITH_SCALE);
        this.characters.lith.setSounds(dashSound, eatSound);

        // *********EVENTS************
        this.events = [this.buildGameStartFlashingEvent()];
        this.setLevel(1);
    }

    end() {
        this.settings.gameOver = true;
    }

    setLevel(setLevel) {
        this.levelData.level = setLevel;

        const levelData = this.levelData;
        const level = levelData.level;

        levelData.spawnRate = INITIAL_SPAWN_RATE + (level) * (SPAWN_RATE_GROWTH);
        this.setCivType(level);
        levelData.spawnsSinceLastEdible = 0;
        levelData.edibleSpawnRarity = BASE_EDIBLE_SPAWN_RARITY + level;
        levelData.celestialSpeed = level;

        const characters = this.characters;
        characters.celestials = [];

        const lith = characters.lith;
        lith.emptySubLiths();
        lith.setSprites(level);
        lith.speed = BASE_LITH_SPEED + (level - 1) * LITH_SPEED_GROWTH;

        this.screen.environment.setBgSpeed(BASE_SCROLL_SPEED + level * SCROLL_SPEED_GROWTH);

        if (level > 1) {
            if (this.sound.allow) {
                this.sound.tracks[SoundTrack.POWER_UP.value].play();
            }
        }

        if (this.levelData.level >= FLUTTER_SWITCH) {
            this.changeTrack(SoundTrack.FLUTTER);
        } else {
            this.changeTrack(SoundTrack.SPACE_CRUISE);
        }

    }

    incrementLevel(levelPlus = 1) {
        this.setLevel(this.levelData.level + levelPlus);
    }

    setCivType(level) {
        const typeText = TYPE_INDICATOR + romanize(level);
        this.menus.dashBoard.typeDisplay.text = typeText;
        if (level != 1) {
            this.events[0].register(this.buildCurrentLevelTypeSplash(typeText));
        }
    }

    //menu builders
    buildMainBackground() {
        const mainBackGround =
            new VerticallyScrollingImage(
                this.screen.canvas,
                this.screen.ctx,
                'bg1',
                MAIN_MENU_SCROLL_SPEED,
            );

        return mainBackGround;
    }

    buildTitleImage() {

        const titleImage =
            new CenteredImage(
                this.screen.canvas,
                this.screen.ctx,
                'titleImage',
                this.screen.canvas.width / 2,
                this.screen.canvas.height / 2 - SPLASH_VERTICAL_OFFSET * 2.5,
                716,
                495,
                MENU_TITLE_IMAGE_SCALE,
            );

        return titleImage;
    }

    buildStartGameButton(sound) {
        const canvas = this.screen.canvas;
        const ctx = this.screen.ctx;

        const startGameButton =
            new Button(
                START_BUTTON_TEXT,
                canvas,
                ctx,
                canvas.width / 2 - STANDARD_BUTTON_WIDTH / 2,
                canvas.height + START_BUTTON_POSITION,
                STANDARD_BUTTON_WIDTH,
                STANDARD_BUTTON_HEIGHT,
            );

        const self = this;

        startGameButton.setAction(function () {
            self.settings.continueMainMenu = false;
            if (self.sound.allow) {
                self.sound.tracks[SoundTrack.START_BUTTON.value].play();
            }

        });

        startGameButton.setHover(BUTTON_HOVER_TEXT_COLOR, BUTTON_HOVER_BG_COLOR, sound);

        return startGameButton;
    }

    buildTutorialButton(sound) {
        const canvas = this.screen.canvas;
        const ctx = this.screen.ctx;

        const tutorialButton =
            new Button(
                TUTORIAL_BUTTON_TEXT,
                canvas,
                ctx,
                canvas.width / 2 - STANDARD_BUTTON_WIDTH / 2,
                canvas.height + START_BUTTON_POSITION + STANDARD_BUTTON_HEIGHT + STANDARD_BUTTON_MARGIN * 2,
                STANDARD_BUTTON_WIDTH,
                STANDARD_BUTTON_HEIGHT,
            );

        const self = this;

        tutorialButton.setAction(function () {
            self.menus.main.showTutorial = true;
        });

        tutorialButton.setHover(BUTTON_HOVER_TEXT_COLOR, BUTTON_HOVER_BG_COLOR, sound);

        return tutorialButton;
    }

    buildTutorialMenuSplash() {
        const tutorialMenu = new Menu(
            this.screen.canvas,
            this.screen.ctx,
            "black",
            this.screen.canvas.width / 4.5,
            this.screen.canvas.height / 4,
            this.screen.canvas.width / 3,
            this.screen.canvas.height / 3
        );


        const tutorialSplash = new LeftAlignedCenterSplash(
            TUTORIAL_BUTTON_TEXT,
            this.screen.canvas,
            this.screen.ctx,
            "#FFFFFF",
            "#000000",
            PRIMARY_FONT,
            50,
            LINE_SPACING,
            SECONDARY_FONT,
            26,
            "start",
        )

        tutorialSplash.setHint(
            new Hint(
                [
                    "Welcome to Hungry li'l Lith!",
                    "-This is a game about eating planets...",
                    "-Objects your size or smaller hurt. :(",
                    "-Larger objects let you multiply! :D",
                    "-WASD + H for keyboard.",
                    "-Click + hold or Touch + hold."
                ]
            )
        );

        tutorialMenu.register(tutorialSplash);

        return tutorialMenu;
    }

    buildCreditsButton(sound) {
        const canvas = this.screen.canvas;
        const ctx = this.screen.ctx;

        const creditsButton =
            new Button(
                CREDITS_BUTTON_TEXT,
                canvas,
                ctx,
                canvas.width / 2 - STANDARD_BUTTON_WIDTH / 2,
                canvas.height + START_BUTTON_POSITION + STANDARD_BUTTON_HEIGHT * 2 + STANDARD_BUTTON_MARGIN * 4,
                STANDARD_BUTTON_WIDTH,
                STANDARD_BUTTON_HEIGHT,
            );

        const self = this;

        creditsButton.setAction(function () {
            self.menus.main.showCredits = true;
        });

        creditsButton.setHover(BUTTON_HOVER_TEXT_COLOR, BUTTON_HOVER_BG_COLOR, sound);

        return creditsButton;
    }

    buildCreditsMenuSplash() {
        const creditsMenu = new Menu(
            this.screen.canvas,
            this.screen.ctx,
            "black",
            this.screen.canvas.width / 4.5,
            this.screen.canvas.height / 4,
            this.screen.canvas.width / 3,
            this.screen.canvas.height / 3
        );

        const creditsSplash = new LeftAlignedCenterSplash(
            CREDITS_BUTTON_TEXT,
            this.screen.canvas,
            this.screen.ctx,
            "#FFFFFF",
            "#000000",
            PRIMARY_FONT,
            50,
            LINE_SPACING,
            SECONDARY_FONT,
            26,
            "start",
        )

        creditsSplash.setHint(
            new Hint(
                [
                    "Jerome Pullen -- 'Flutter' (HappyLith theme!)",
                    "Local Musician -- sound fx / initial theme",
                    "Genesis 10 -- Thanks for paying me to make this!",
                    "Corbin March -- Blue Sensei!!!",
                    "",
                    "A game by Marcus Elliott."
                ]
            )
        );

        creditsMenu.register(creditsSplash);

        return creditsMenu;
    }

    buildPauseSplash() {
        const pauseSplash = new Splash(
            GAME_PAUSE_TEXT,
            this.screen.canvas,
            this.screen.ctx,
            "#FFFFFF",
            "#000000",
            PRIMARY_FONT,
            50,
            LINE_SPACING,
            SECONDARY_FONT,
            26);
        return pauseSplash;
    }

    buildWinSplash(text = GAME_WIN_TEXT) {
        const winSplash = new WinSplash(
            text,
            this.screen.canvas,
            this.screen.ctx,
            "#FFFFFF",
            "#000000",
            PRIMARY_FONT,
            50,
            LINE_SPACING,
            SECONDARY_FONT,
            26
        )
        return winSplash;
    }

    buildSubmitButton(sound) {
        const canvas = this.screen.canvas;
        const ctx = this.screen.ctx;

        const submitButton =
            new Button(
                "Submit",
                canvas,
                ctx,
                canvas.width / 2 - STANDARD_BUTTON_WIDTH / 2,
                canvas.height - 160,
                STANDARD_BUTTON_WIDTH,
                STANDARD_BUTTON_HEIGHT,
            );

        const self = this;

        submitButton.setAction(function () {
            submitScoreToAPI(self.settings.score);
        });

        submitButton.setHover(BUTTON_HOVER_TEXT_COLOR, BUTTON_HOVER_BG_COLOR, sound);

        return submitButton;
    }

    buildDashBoardMenu() {
        const canvas = this.screen.canvas;
        const ctx = this.screen.ctx;


        const dashBoard = new DashBoardMenu(
            canvas,
            ctx,
            "#000000",
            canvas.height - DASH_MENU_HEIGHT,
            DASH_MENU_HEIGHT);

        return dashBoard;
    }

    buildRestartButton(dashBoardY, sound) {
        const canvas = this.screen.canvas;
        const ctx = this.screen.ctx;

        const restartButton =
            new Button(
                "Restart",
                canvas,
                ctx,
                canvas.width - DASH_MENU_ITEM_MARGIN_X - DASH_BOARD_BUTTON_WIDTH,
                dashBoardY + DASH_MENU_ITEM_MARGIN_Y,
                DASH_BOARD_BUTTON_WIDTH + 20,
                DASH_MENU_HEIGHT - (DASH_MENU_ITEM_MARGIN_Y * 2),
            );

        const self = this;

        restartButton.setAction(function () {
            self.tools.listener.keys.resetGame = true;
        });

        restartButton.setHover(BUTTON_HOVER_TEXT_COLOR, BUTTON_HOVER_BG_COLOR, sound);

        return restartButton;
    }

    buildPauseButton(dashBoardY, sound) {
        const canvas = this.screen.canvas;
        const ctx = this.screen.ctx;
        const pauseButton =
            new Button(
                "Pause",
                canvas,
                ctx,
                0 + DASH_MENU_ITEM_MARGIN_X,
                dashBoardY + DASH_MENU_ITEM_MARGIN_Y,
                DASH_BOARD_BUTTON_WIDTH,
                DASH_MENU_HEIGHT - (DASH_MENU_ITEM_MARGIN_Y * 2),
            );

        const self = this;

        pauseButton.setAction(function () {
            self.tools.listener.keys.pause = !self.tools.listener.keys.pause;
        });

        pauseButton.setHover(BUTTON_HOVER_TEXT_COLOR, BUTTON_HOVER_BG_COLOR, sound);

        return pauseButton;
    }

    buildScoreDisplay(dashBoardY) {
        const canvas = this.screen.canvas;
        const ctx = this.screen.ctx;

        const scoreDisplay = new TextObject(
            SCORE_INDICATOR + "0",
            canvas,
            ctx,
            DASH_MENU_ITEM_MARGIN_X * 3 + DASH_BOARD_BUTTON_WIDTH,
            dashBoardY + DASH_MENU_ITEM_MARGIN_Y + DASH_MENU_HEIGHT / 2,
            "#FFFFFF",
            "#000000",
            SECONDARY_FONT,
            20,
            null,
            null,
            null,
            "left",
        );

        return scoreDisplay;
    }

    buildDashIndicator(dashBoardY) {
        const canvas = this.screen.canvas;
        const ctx = this.screen.ctx;

        const dashIndicator = new TextProgressBar(
            DASH_INDICATOR,
            canvas,
            ctx,
            canvas.width / 2,
            dashBoardY + DASH_MENU_ITEM_MARGIN_Y + DASH_MENU_HEIGHT / 2,
            LITH_FULL_DASH_BAR_COLOR,
            LITH_EMPTY_DASH_BAR_COLOR,
        );
        return dashIndicator;
    }

    buildTypeDisplay(dashBoardY) {
        const canvas = this.screen.canvas;
        const ctx = this.screen.ctx;

        const typeDisplay = new TextObject(
            TYPE_INDICATOR + romanize(1),
            canvas,
            ctx,
            canvas.width - DASH_MENU_ITEM_MARGIN_X * 3 - DASH_BOARD_BUTTON_WIDTH,
            dashBoardY + DASH_MENU_ITEM_MARGIN_Y + DASH_MENU_HEIGHT / 2,
            "#FFFFFF",
            "#000000",
            SECONDARY_FONT,
            20,
            null,
            null,
            null,
            "right",
        );

        return typeDisplay;
    }

    buildGameStartFlashingEvent() {

        const gameStartSplash = new Splash(
            GAME_START_TEXT,
            this.screen.canvas,
            this.screen.ctx,
            GAME_START_TEXT_COLOR,
            "#000000",
            PRIMARY_FONT,
            50,
            LINE_SPACING,
            SECONDARY_FONT,
            26
        );


        const hint = this.getRandomRoundStartHint();

        gameStartSplash.setHint(hint);

        const gameStartFlashingEvent =
            new FlashingScreenEvent(gameStartSplash,
                GAME_START_FLASH_INTERVAL,
                GAME_START_FLASH_DURATION);

        return gameStartFlashingEvent;
    }

    buildCurrentLevelTypeSplash(typeText) {
        const currentLevelSplash = new Splash(
            typeText,
            this.screen.canvas,
            this.screen.ctx,
            "#FFFFFF",
            "#000000",
            PRIMARY_FONT,
            50,
            LINE_SPACING,
            SECONDARY_FONT,
            26);

        const hint = this.getRandomRoundStartHint();

        currentLevelSplash.setHint(hint);

        return currentLevelSplash;
    }

    buildMusicToggleButton(sound) {
        const canvas = this.screen.canvas;
        const ctx = this.screen.ctx;
        const musicToggleButton =
            new Button(
                "Unmute",
                canvas,
                ctx,
                canvas.width - STANDARD_BUTTON_WIDTH - STANDARD_BUTTON_MARGIN,
                0 + STANDARD_BUTTON_HEIGHT + STANDARD_BUTTON_MARGIN,
                STANDARD_BUTTON_WIDTH,
                STANDARD_BUTTON_HEIGHT,
            );

        const self = this;

        musicToggleButton.setAction(function () {
            if (self.sound.allow) {
                self.sound.allow = false;
                self.pauseTrack();
                this.text = "Unmute";
            } else {
                self.sound.allow = true;
                self.resetTrack();
                self.playTrack();
                this.text = "Mute";
            }
        });

        musicToggleButton.setHover(BUTTON_HOVER_TEXT_COLOR, BUTTON_HOVER_BG_COLOR, sound);

        return musicToggleButton;
    }

    // music loader, just gets the sound files compiled.
    loadMusic() {
        const soundDiv = document.querySelector("#gameSound");

        const allSound = soundDiv.querySelectorAll("audio");

        const tracks = [];

        allSound.forEach(sound => {
            sound.setAttribute("preload", "auto");
            sound.setAttribute("controls", "none");
            tracks.push(new Audio(sound.src));
        });

        return tracks;
    }

    changeTrack(track) {
        const sound = this.sound;
        track = sound.tracks[track.value];
        if (track !== sound.currentBackgroundMusic) {
            this.resetTrack();
            this.pauseTrack();
            sound.currentBackgroundMusic = track
            this.playTrack();
        }
    }

    pauseTrack() {
        const sound = this.sound;
        if (sound.currentBackgroundMusic != null) {
            sound.currentBackgroundMusic.pause();
        }
    }

    playTrack() {
        const sound = this.sound;
        if (sound.currentBackgroundMusic != null && sound.allow) {
            sound.currentBackgroundMusic.loop = true;
            sound.currentBackgroundMusic.play();
        }
    }

    resetTrack() {
        const sound = this.sound;
        if (sound.currentBackgroundMusic != null) {
            sound.currentBackgroundMusic.currentTime = 0;
        }
    }

    // game control functions
    calcGameScreen() {
        const canvas = this.screen.canvas;

        this.screen.clientGameDimensions.x = canvas.width / canvas.clientWidth;
        this.screen.clientGameDimensions.y = canvas.height / canvas.clientHeight;
    }

    //internal helpers
    getRandomRoundStartHint() {
        return getRandomArrayElement(gameStartHints);
    }
}

// helpers

function romanize(num) {
    if (COMPLEX_ROMANIZE) {
        return romanizeComplex(num);
    } else {
        return romanizeSimple(num);
    }
}

// https://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript
function romanizeComplex(num) {
    if (isNaN(num))
        return NaN;
    let digits = String(+num).split(""),
        key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
            "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
            "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
        roman = "",
        i = 3;
    while (i--) {
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    }
    return Array(+digits.join("") + 1).join("M") + roman;
}

// key version:
function romanizeSimple(num) {
    const numerals = {
        1: 'I',
        2: 'II',
        3: 'III',
        4: 'IV',
        5: 'V',
        6: 'VI',
        7: 'VII',
        8: 'VIII',
        9: 'IX',
        10: 'X',
    }
    return numerals.num;
}
