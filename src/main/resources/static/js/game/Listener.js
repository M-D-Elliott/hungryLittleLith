class Listener {
    constructor(canvas, clientGameDimensions, doubleClickInterval) {
        this.keys = {
            up: false,
            down: false,
            left: false,
            right: false,
            pause: false,
            startGame: false,
            resetGame: false,
            dash: false,
        };
        this.clicks = {
            x: 0,
            y: 0,
            recentClick: false,
            isClicking: false,
            isDoubleClick: false,
            doubleClickTicks: 0,
            doubleClickInterval: doubleClickInterval,
        };
        this.canvas = canvas;
        this.clientGameDimensions = clientGameDimensions;
    }

    update() {
        this.lockAutoRepeatForCertainKeys();
        this.tickDoubleClickInterval();
    }

    // control fixers
    lockAutoRepeatForCertainKeys() {
        // reset 1 frame keys
        this.clicks.recentClick = false;
        this.keys.resetGame = false;
        this.keys.dash = false;
        this.clicks.isDoubleClick = false;
        this.keys.pause = false;
    }

    tickDoubleClickInterval() {
        if (this.clicks.doubleClickTicks > 0) {
            this.clicks.doubleClickTicks--;
        }
    }

    handleMouseClick(e) {
        this.clicks.isClicking = true;
        const result = this.getMousePos(e, this.clientGameDimensions);
        this.clicks.x = result.x;
        this.clicks.y = result.y;
        this.clicks.recentClick = true;
    }

    handleMouseMove(e) {
        const result = this.getMousePos(e, this.clientGameDimensions);
        this.clicks.x = result.x;
        this.clicks.y = result.y;
    }

    handleMouseOrTouchRelease(e) {
        this.clicks.isClicking = false;
        this.lockout = false;
    }

    handleDoubleClickOrTouch() {
        if (DOUBLE_CLICK_TO_DASH) {
            if (this.clicks.doubleClickTicks > 0) {
                this.clicks.isDoubleClick = true;
                this.clicks.doubleClickTicks = 0;
            } else {
                this.clicks.doubleClickTicks = this.clicks.doubleClickInterval;
            }
        } else {
            this.clicks.isDoubleClick = true;
        }

    }

    handleTouchStart(e) {
        this.clicks.isClicking = true;
        const result = this.getTouchPos(e, this.clientGameDimensions);
        this.clicks.x = result.x;
        this.clicks.y = result.y;
        this.clicks.recentClick = true;
    }

    handleTouchMove(e) {
        if (this.clicks.isClicking) {
            const result = this.getTouchPos(e, this.clientGameDimensions);
            this.clicks.x = result.x;
            this.clicks.y = result.y;
        }
    }

    setEvents() {
        const self = this;
        this.canvas.addEventListener("mousedown", function (e) {
            self.handleMouseClick(e);
            self.handleDoubleClickOrTouch();
        });

        this.canvas.addEventListener("mousemove", function (e) {
            self.handleMouseMove(e);
        });

        // this is window so that movement can be continued
        // when holding click and dragging outside of the canvas
        // but ended outside as well. Gets rid of common game issue.
        window.addEventListener("mouseup", function (e) {
            self.handleMouseOrTouchRelease(e);
        });

        this.canvas.addEventListener("touchstart", function (e) {
            self.handleTouchStart(e);
            self.handleDoubleClickOrTouch();
        }, { passive: true });
        this.canvas.addEventListener("touchmove", function (e) {
            self.handleTouchMove(e);
        }, { passive: true });
        window.addEventListener("touchend", function (e) {
            self.handleMouseOrTouchRelease(e);
        });

        window.addEventListener('keydown', function (e) {
            const key = e.keyCode;
            // console.log(key);
            switch (key) {
                case 38:
                case 87:
                    self.keys.up = true;
                    break;
                case 40:
                case 83:
                    self.keys.down = true;
                    break;
                case 37:
                case 65:
                    self.keys.left = true;
                    break;
                case 39:
                case 68:
                    self.keys.right = true;
                    break;
                case 72:
                    self.keys.dash = true;
                    break;
                case 80:
                case 32:
                    self.keys.pause = true;
                    break;
                case 75:
                    self.keys.startGame = true;
                    break;
                case 82:
                    self.keys.resetGame = true;
                    break;
                default:
                    break;
            }
        });

        window.addEventListener('keyup', function (e) {
            const key = e.keyCode;
            switch (key) {
                case 38:
                case 87:
                    self.keys.up = false;
                    break;
                case 40:
                case 83:
                    self.keys.down = false;
                    break;
                case 37:
                case 65:
                    self.keys.left = false;
                    break;
                case 39:
                case 68:
                    self.keys.right = false;
                    break;
                case 72:
                    self.keys.dash = false;
                    break;
                case 75:
                    self.keys.startGame = false;
                    break;
                case 80:
                case 32:
                    self.keys.pause = false;
                    break;
                case 82:
                    self.keys.resetGame = false;
                    break;
                default:
                    break;
            }
        });
    }

    // helpers
    getMousePos(e, adj) {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: Math.floor((e.clientX - rect.left) * adj.x),
            y: Math.floor((e.clientY - rect.top) * adj.y)
        };
    }
    getTouchPos(e, adj) {
        // var rect = this.canvas.getBoundingClientRect();
        return {
            x: Math.floor((e.changedTouches[0].clientX) * adj.x) + LITH_TOUCH_X_OFFSET,
            y: Math.floor((e.changedTouches[0].clientY) * adj.y)
        };
        return ret;
    }
};