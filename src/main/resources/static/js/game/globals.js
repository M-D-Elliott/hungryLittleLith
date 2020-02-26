// gameplay constants
const REQUIRED_SUB_LITH_MULTIPLIER = 2;
const SCORE_MULTIPLIER = 10;

// game event constants
const GAME_WIN_TEXT = "YOU WIN!";
const GAME_PAUSE_TEXT = 'Paused';
const GAME_OVER_TEXT = 'GAME OVER';
const BASE_SCROLL_SPEED = 2;

// score related constants
const SCORE_LOSS_MULTIPLIER = 1.2;

// sound constants;
const ALLOW_SOUND = false;
const FLUTTER_SWITCH = 3;

//splash constants
const GAME_START_TEXT = "GAME START"
const GAME_START_TEXT_COLOR = "#93F484"
const GAME_START_FLASH_INTERVAL = 30;
const GAME_START_FLASH_DURATION = 240;

// player input constants
const DOUBLE_CLICK_INTERVAL = 12;

// image constants
const IMG_SCALE = 1 / 6;
const TO_RADIANS = Math.PI/180;
const GAME_SPRITE_WIDTH = 256;
const GAME_SPRITE_HEIGHT = 256;
const HALF_IMAGE_WIDTH = GAME_SPRITE_WIDTH / 2;

// Main menu constants
const MENU_TITLE_IMAGE_SCALE = 1;
const START_BUTTON_TEXT = "'Drive' Mode"
const START_BUTTON_POSITION = -180;
const TUTORIAL_BUTTON_TEXT = "How to play";
const CREDITS_BUTTON_TEXT = "Credits";
const STANDARD_BUTTON_WIDTH = 180;
const STANDARD_BUTTON_HEIGHT = 40;
const MAIN_MENU_SCROLL_SPEED = 15;
const STANDARD_BUTTON_MARGIN = 10;

// clock/interval constants
const MAX_TICK = 1000;
const MAX_SPAWN_RATE = MAX_TICK / 10;
const MIN_SPAWN_RATE = 1;
const MAX_DEATH_COUNTER = 28;
const INITIAL_SPAWN_RATE = MIN_SPAWN_RATE + 20;
const SPAWN_RATE_GROWTH = 12;

// text constants
const PRIMARY_FONT = 'SpaceFont'
const SECONDARY_FONT = 'Chargen';
const PRIMARY_FONT_SIZE = "40px";
const SECONDARY_FONT_SIZE = "20px";

// dash board boundaries
const DASH_MENU_HEIGHT = 50;
const DASH_MENU_ITEM_MARGIN_Y = STANDARD_BUTTON_MARGIN;
const DASH_MENU_ITEM_MARGIN_X = 60;
const DASH_BOARD_BUTTON_WIDTH = 75;

// button values
const BUTTON_HOVER_TEXT_COLOR = "#000000";
const BUTTON_HOVER_BG_COLOR = "gold";

//dash board items
const TYPE_INDICATOR = "Type:  ";
const SCORE_INDICATOR = "Score:  ";
const DASH_INDICATOR = "DASH";

// lith constants
const LITH_SCALE = 1/3;
const LITH_RADIUS = 10;
const BASE_LITH_SCALE_MULTI = 1;
const LITH_TOUCH_X_OFFSET = 40;
const BASE_LITH_SPEED = 2;
const LITH_SPEED_GROWTH = 1;
const BASE_LITH_ANIMATION_RATE = 4;
const HAPPY_LITH_ANIMATION_RATE = 1;

// lith dash constants
const BASE_LITH_DASH_MIN = 0;
const BASE_LITH_DASH_MAX = 10;
const BASE_LITH_DASH_MULTI = 50;
const BASE_LITH_DASH_RECOVERY = 5;
const LITH_EMPTY_DASH_BAR_COLOR = '#000000';
const LITH_FULL_DASH_BAR_COLOR = "gold";

// lith mouse settings
const DOUBLE_CLICK_TO_DASH = false;

// sub-lith constants
const SUB_LITH_ALPHA_MASK = 1;
const ANTI_CLOCKWISE = false;
const BASE_SUB_LITH_ANGULAR_DELTA = 4;
const BASE_SUB_LITH_UPDATE_RATE = 2;
const BASE_SUB_LITH_RADIAL_DISTANCE = 50;
const SUB_LITH_SCALE_DIVISOR = 4;

//celestial constants
// const CELESTIAL_DELAY = 1.2;
const CELESTIAL_DELAY = 1.2;
const BASE_EDIBLE_SPAWN_RARITY = 4;

// splash constants
const SPLASH_DIM_AMOUNT = 52;
const DARKEN_AMOUNT = 0.04;
const SPLASH_VERTICAL_OFFSET = 40;
const LINE_SPACING = 40;

// fun constants
const SHOW_HURT_BOX = false;
const COMPLEX_ROMANIZE = true;
const SCROLL_SPEED_GROWTH = 2;

const GAME_CANVAS_ID = '#gameCanvas';

//screen constants
const RESOLUTION = {
    WIDTH: 1280,
    HEIGHT: 720,
}

// change this if you add any celestials. Defines max celestial image ID.
const TOTAL_CELESTIALS = 6;