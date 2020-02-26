// ******************************
// *          System            *
// ******************************

let extricatedGameData = null;

// game container, effectively.
// convention based and it helps protect
// my gamedata, though I do give it an
// extricated reference.
window.onload = function () {
    const gameData = new GameData(document.querySelector(GAME_CANVAS_ID));
    gameData.init();

    extricatedGameData = gameData;

    setGameState(gameData, GameState.MAIN_MENU);

    if (validateGameData(gameData)) {
        systemLoop(gameData);
    } else {
        console.error("Game data invalid. The game will not start.");
    }

    // my new invention! Probably already exists...
    // I call it a viewloop. First a view is registered
    // by placing it into a known callback variable, such as
    // gameData.state.callback. This view is repeated by the system loop.
    // a view may switch to another view by reloading this known
    // callback with a new view callback! This will allow me
    // to eliminate some variables and boolean checks too, 
    // but I haven't yet.
    function systemLoop() {

        // call the current view:
        gameData.state.callback();

        // global reset for all views, 
        // currently returns to main.
        if (gameData.tools.listener.keys.resetGame) {
            gameData.reset();
            setGameState(gameData, GameState.MAIN_MENU);
        }

        // resets the listener for lockout features.
        gameData.tools.listener.update();

        // keeps the overall loop going. 
        window.requestAnimationFrame(systemLoop);
    }

}

// switches the callback to allow view
// switching. Using the enum was nice
// as I believe it allows me to make
// use of that jump table thingy.
// efficiency is king in my book!
// also this added a nice port-hole
// for audio track switches!
function setGameState(data, state) {
    data.state.current = state;

    let callback = null;

    switch (data.state.current) {
        // main menu is default currently.
        // just a drop through here.
        default:
        case GameState.MAIN_MENU:
            callback = function () { mainMenu(data); };
            data.changeTrack(SoundTrack.MENU_MUSIC);
            break;
        case GameState.PLAY:
            callback = function () { play(data); };
            data.playTrack();
            break;
        case GameState.PAUSED:
            data.splashes.pause.isFirstFrame = true;
            callback = function () { pause(data); };
            data.pauseTrack();
            break;
        case GameState.WIN:
            data.splashes.win.isFirstFrame = true;
            callback = function () { win(data); };
            break;
        case GameState.GAME_OVER:
            data.splashes.gameOver.isFirstFrame = true;
            callback = function () { gameOver(data); };
            data.pauseTrack();
            break;
    }

    data.state.callback = callback;
}

// ******************************
// *            VIEWS           *
// ******************************

// main menu view for starting various game modes.
function mainMenu(gameData) {

    const main = gameData.menus.main;
    const continueMainMenu = gameData.settings.continueMainMenu;
    const sound = gameData.sound;

    const listener = gameData.tools.listener;

    const state = gameData.state;

    main.background.update();
    main.background.render();

    main.titleImage.update();
    main.titleImage.render();

    main.start.update(listener.clicks, sound.allow);
    main.start.render();

    sound.toggleButton.update(listener.clicks, sound.allow);
    sound.toggleButton.render();

    if (listener.clicks.isClicking && listener.clicks.recentClick) {
        main.showTutorial = main.showCredits = false;
    }

    main.tutorialButton.update(listener.clicks, sound.allow);
    main.tutorialButton.render();

    main.creditsButton.update(listener.clicks, sound.allow);
    main.creditsButton.render();

    if (main.showTutorial) {
        main.tutorialSplash.update();
        main.tutorialSplash.render();
    }

    if (main.showCredits) {
        main.creditsSplash.update();
        main.creditsSplash.render();
    }

    if (!continueMainMenu) {
        gameData.reset();
        setGameState(gameData, GameState.PLAY);
        return;
    }
}

// 'drive' mode view.
function play(gameData) {
    const listener = gameData.tools.listener;
    const menus = gameData.menus;
    const clock = gameData.tools.clock;
    const characters = gameData.characters;
    const screen = gameData.screen;
    const settings = gameData.settings;
    const levelData = gameData.levelData;
    const splashes = gameData.splashes;
    const keys = listener.keys;
    const events = gameData.events;

    clock.tick();

    updateAndDrawGame(screen, characters, clock.ticks, listener, settings, menus.dashBoard, levelData, events, gameData.sound.allow);

    spawn(screen, characters.celestials, clock.ticks, levelData);

    updateAndDrawDashBoard(menus.dashBoard, listener.clicks, gameData.sound.allow);

    // switches to pause view.

    if (settings.gameOver) {
        setGameState(gameData, GameState.GAME_OVER);
        return;
    } else if (keys.pause) {
        settings.paused = true;
        setGameState(gameData, GameState.PAUSED);
        return;
    } else if (characters.lith.subLiths.length >= levelData.level * REQUIRED_SUB_LITH_MULTIPLIER) {
        // if the current level * the required subliths to progress is achieved
        // the player transforms and progresses.
        gameData.incrementLevel();
        if (levelData.level >= TOTAL_CELESTIALS || gameData.settings.win) {
            setGameState(gameData, GameState.WIN);
            return;
        }
    }
}

// pause view does not re-render
// below game view, simply darkens the screen
// and let's the graphics most recently rendered
// shine through by not wiping the whole screen first.
function pause(gameData) {

    const pauseSplash = gameData.splashes.pause;
    const settings = gameData.settings;
    const keys = gameData.tools.listener.keys;
    const screen = gameData.screen;
    const menus = gameData.menus;
    const listener = gameData.tools.listener;

    if (pauseSplash.isFirstFrame) {
        settings.darkenTicks = SPLASH_DIM_AMOUNT;
        const randomHint = getRandomArrayElement(allHints);
        pauseSplash.init(randomHint);
    }
    if (settings.darkenTicks > 0) {
        settings.darkenTicks--;
        darkenScreen(screen.canvas, screen.ctx, settings);
    }
    pauseSplash.render();

    pauseSplash.isFirstFrame = false;

    updateAndDrawDashBoard(menus.dashBoard, listener.clicks, gameData.sound.allow);

    if (keys.pause) {
        settings.paused = true;
        setGameState(gameData, GameState.PLAY);
        return;
    }
}

// win view, functions almost exactly like pause.
// when/if I refactor this I will of course boil these
// down. also includes rendering of the submit button.
function win(gameData) {

    const winSplash = gameData.splashes.win;
    const settings = gameData.settings;
    const screen = gameData.screen;
    const submitButton = gameData.splashes.submit;
    const clicks = gameData.tools.listener.clicks;
    const menus = gameData.menus;

    if (winSplash.isFirstFrame) {
        settings.darkenTicks = SPLASH_DIM_AMOUNT;
        winSplash.init(settings.score);
    }
    if (settings.darkenTicks > 0) {
        settings.darkenTicks--;
        darkenScreen(screen.canvas, screen.ctx, settings);
    }
    winSplash.render();

    winSplash.isFirstFrame = false;

    submitButton.render(clicks.x, clicks.y);
    submitButton.update(clicks, gameData.sound.allow);

    updateAndDrawDashBoard(menus.dashBoard, clicks, gameData.sound.allow);
}

// game over view, functions entirely like pause and win.
function gameOver(gameData) {

    const gameOverSplash = gameData.splashes.gameOver;
    const settings = gameData.settings;
    const screen = gameData.screen;
    const submitButton = gameData.splashes.submit;
    const clicks = gameData.tools.listener.clicks;
    const menus = gameData.menus;

    if (gameOverSplash.isFirstFrame) {
        settings.darkenTicks = SPLASH_DIM_AMOUNT;
        gameOverSplash.init(settings.score);
    }
    if (settings.darkenTicks > 0) {
        settings.darkenTicks--;
        darkenScreen(screen.canvas, screen.ctx, settings);
    }
    gameOverSplash.render();

    gameOverSplash.isFirstFrame = false;

    submitButton.render(clicks.x, clicks.y);
    submitButton.update(clicks, gameData.sound.allow);

    updateAndDrawDashBoard(menus.dashBoard, clicks, gameData.sound.allow);
}


// ******************************
// *         SUB VIEWS          *
// ******************************
function updateAndDrawGame(screen, characters, ticks, listener, settings, dashBoard, levelData, events, allowSound) {

    screen.ctx.fillRect(0, 0, screen.canvas.width, screen.canvas.height);

    screen.environment.update();
    screen.environment.render();

    const celestials = characters.celestials;
    const lith = characters.lith;

    for (var i = celestials.length - 1; i >= 0; i--) {
        c = celestials[i];

        const scoreGain = lith.collide(c, levelData.level, allowSound);
        if (scoreGain != 0) {
            settings.score += scoreGain * levelData.level * SCORE_MULTIPLIER;
            settings.score = (settings.score < 0) ? 0 : settings.score;
            dashBoard.scoreDisplay.text = SCORE_INDICATOR + settings.score;
        }

        c.update(ticks);
        c.render();
        if (c.outOfBounds() || c.dead()) {
            celestials.splice(i, 1);
        }
    }

    const clicks = listener.clicks;
    const keys = listener.keys;

    if (lith.dead()) {
        settings.gameOver = true;
    } else {
        lith.update(clicks, keys, ticks, allowSound);
        lith.render();
    }

    events.forEach(event => {
        event.update();
        event.render(ticks);
    });

    dashBoard.dashIndicator.setCurrentAndMax(lith.dashCurrent, lith.dashMax);
}

function updateAndDrawDashBoard(dashBoard, clicks, allowSound) {

    const background = dashBoard.background;
    const pause = dashBoard.pause;
    const restart = dashBoard.restart;
    const scoreDisplay = dashBoard.scoreDisplay;
    const dashIndicator = dashBoard.dashIndicator;
    const typeDisplay = dashBoard.typeDisplay;

    background.render();
    background.update();

    pause.render(clicks.x, clicks.y);
    pause.update(clicks, allowSound);

    restart.render(clicks.x, clicks.y);
    restart.update(clicks, allowSound);

    scoreDisplay.update();
    scoreDisplay.render();

    dashIndicator.update();
    dashIndicator.render();

    typeDisplay.update();
    typeDisplay.render();
}

// ******************************
// *      VIEW HELPERS          *
// ******************************

function spawn(screen, celestials, ticks, levelData) {
    if (ticks % (MAX_SPAWN_RATE - levelData.spawnRate) == 0) {
        const level = levelData.level;
        let c = null;
        switch (levelData.spawnType) {
            case SpawnType.RANDOM:
                c = spawnRandomCelestial(screen, 1, level);
                break;
            default:
            case SpawnType.LEVEL:
                spawnSmallChance = getRandomInt(0, levelData.edibleSpawnRarity - levelData.spawnsSinceLastEdible);
                if (spawnSmallChance == 0) {
                    c = spawnCelestial(screen, level + 1, levelData.celestialSpeed, 2 / level)
                    levelData.spawnsSinceLastEdible = 0;
                } else {
                    c = spawnCelestial(screen, level, levelData.celestialSpeed, 1 / (2 * level))
                    levelData.spawnsSinceLastEdible++;
                }
                break;
        }
        celestials.push(c);
    }
}

function spawnRandomCelestial(screen, speed, scale) {
    const randomId = getRandomInt(1, TOTAL_CELESTIALS + 1);
    return spawnCelestial(screen, randomId, speed, scale);
}

function spawnCelestial(screen, imageId, speed, scale) {
    const canvas = screen.canvas;

    const yPos = getRandomInt(0, canvas.height);
    const xPos = canvas.width * CELESTIAL_DELAY;
    return new Celestial('c' + imageId, xPos, yPos, speed, (IMG_SCALE * imageId * scale), imageId, screen);
}



// ******************************
// *            TOOLS           *
// ******************************

function validateGameData(gameData) {
    // checks to make sure changes 
    // made by users or devs don't 
    // exceed bounds for spawn rate.
    if (gameData.settings.spawnRate > MAX_SPAWN_RATE - 1) {
        console.error("Spawn rate cannot exceed " + MAX_SPAWN_RATE + ".");
        return false;
    } else if (gameData.settings.spawnRate < MIN_SPAWN_RATE) {
        console.error("Spawn rate cannot be less than 1.");
        return false;
    }

    return true;
}

function suddenWin() {
    extricatedGameData.settings.win = true;
}

function darkenScreen(canvas, ctx) {
    ctx.fillStyle = `rgba(0, 0, 0, ${DARKEN_AMOUNT})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomArrayElement(array) {
    const index = getRandomInt(0, array.length);
    const object = array[index];
    return object;
}