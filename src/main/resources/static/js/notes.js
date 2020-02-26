// xCoord, yCoord, portWidth, portHeight;
ctx.fillRect(20, 20, 20, 20);

ctx.fillStyle = "#00FF00";
ctx.fillRect(100, 20, 20, 20);

ctx.fillStyle = "#0000FF";
ctx.fillRect(200, 20, 20, 20);

ctx.strokeRect(300, 20, 20, 20);
ctx.strokeStyle = "#FF0000";
ctx.strokeRect(400, 20, 20, 20);

// updates the listener to lockout certain keys from autorepeat.
// check in listener.lockOutCertainKeys function.
// listener.update();

// if (!settings.continueMainMenu) {
//     // continues the loop if the game is not over
//     window.requestAnimationFrame(gameLoop);

// }
// }

// window.onload = function () {
//     const gameData = new GameData(document.querySelector(GAME_CANVAS_ID));
//     gameData.init();

//     extricatedGameData = gameData;

//     if (validateGameData(gameData)) {
//         mainMenuLoop();
//     }

//     // menu loop
//     function mainMenuLoop() {

//         const main = gameData.menus.main;
//         const gameOver = gameData.settings.gameOver;
//         const continueMainMenu = gameData.settings.continueMainMenu;

//         const listener = gameData.tools.listener;

//         main.background.update();
//         main.background.render();

//         main.titleImage.update();
//         main.titleImage.render();

//         main.button.update(listener.clicks);
//         main.button.render();

//         listener.update();

//         if (continueMainMenu) {
//             window.requestAnimationFrame(mainMenuLoop);
//         } else {
//             gameData.reset();
//             gameLoop();
//         }
//     }

//     // game loop
//     function gameLoop() {
//         const listener = gameData.tools.listener;
//         const menus = gameData.menus;
//         const clock = gameData.tools.clock;
//         const characters = gameData.characters;
//         const screen = gameData.screen;
//         const settings = gameData.settings;
//         const levelData = gameData.levelData;
//         const splashes = gameData.splashes;
//         const progressBars = gameData.progressBars;
//         const buttons = gameData.buttons;

//         if (gameData.settings.win) {
//             win(screen, settings, listener.clicks, splashes.winSplash, buttons.submit);
//         } else if (gameData.settings.paused) {
//             pause(screen, splashes.pause, settings);
//         } else if (gameData.settings.gameOver) {
//             gameOver(screen, settings, listener.clicks, splashes.gameOver, buttons.submit);
//         } else {

//             // resets the isFirstFrame so that the initial menu pause event will occur again.
//             splashes.pause.isFirstFrame = true;

//             // if the current level * the required subliths to progress is achieved
//             // the player transforms and progresses.
//             if (characters.lith.subLiths.length == levelData.level * REQUIRED_SUB_LITH_MULTIPLIER) {
//                 gameData.incrementLevel();
//                 if (levelData.level >= TOTAL_CELESTIALS) {
//                     settings.win = true;
//                 }
//             }

//             clock.tick();

//             updateAndDrawGame(screen, characters, clock.ticks, listener, settings, progressBars, levelData);

//             spawn(screen, characters.celestials, clock.ticks, levelData);

//         }

//         updateAndDrawDashBoard(menus.dashBoard, buttons, progressBars, listener.clicks);

//         const keys = listener.keys;

//         // checks gameStart before the end of the loop.
//         if (keys.resetGame) {
//             gameData.reset();
//         } else if (keys.pause) {
//             settings.paused = !settings.paused;
//         }

//         // updates the listener to lockout certain keys from autorepeat.
//         // check in listener.lockOutCertainKeys function.
//         listener.update();

//         if (!settings.continueMainMenu) {
//             // continues the loop if the game is not over
//             window.requestAnimationFrame(gameLoop);

//         }
//     }
// };

// function win(screen, settings, clicks, winSplash, submitButton) {
//     if (winSplash.isFirstFrame) {
//         settings.darkenTicks = SPLASH_DIM_AMOUNT;
//         winSplash.init(settings.score);
//     }
//     if (settings.darkenTicks > 0) {
//         settings.darkenTicks--;
//         darkenScreen(screen.canvas, screen.ctx, settings);
//     }
//     winSplash.render();

//     submitButton.update(clicks.x, clicks.y);
//     submitButton.render(clicks);
// }

// function pause(screen, pauseSplash, settings) {
//     if (pauseSplash.isFirstFrame) {
//         settings.darkenTicks = SPLASH_DIM_AMOUNT;
//         const randomHint = getRandomArrayElement(allHints);
//         pauseSplash.init(randomHint);
//     }
//     if (settings.darkenTicks > 0) {
//         settings.darkenTicks--;
//         darkenScreen(screen.canvas, screen.ctx, settings);
//     }
//     pauseSplash.render();
// }

// function gameOver(screen, settings, clicks, gameOverSplash, submitButton) {
//     if (gameOverSplash.isFirstFrame) {
//         settings.darkenTicks = SPLASH_DIM_AMOUNT;
//         gameOverSplash.init(settings.score);
//     }
//     if (settings.darkenTicks > 0) {
//         settings.darkenTicks--;
//         darkenScreen(screen.canvas, screen.ctx, settings);
//     }
//     gameOverSplash.render();

//     submitButton.render(clicks.x, clicks.y);
//     submitButton.update(clicks);
// }

