class Lith extends Mortal {
    constructor(x, y, scale, screen) {
        // -> Mortal -> Collideable
        super(x, y, (HALF_IMAGE_WIDTH * scale), screen.ctx, scale)

        // movement stats
        this.velY = 0;
        this.direction = 1;
        this.velX = 0;
        this.speed = BASE_LITH_SPEED;

        this.dashMax = BASE_LITH_DASH_MAX;
        this.dashCurrent = BASE_LITH_DASH_MAX;
        this.dashRecoveryRate = BASE_LITH_DASH_RECOVERY;
        this.dashMulti = BASE_LITH_DASH_MULTI;

        this.xMinBound = 0 + this.imgWidth / 2;
        this.xMaxBound = screen.canvas.width - (this.imgWidth / 2);
        this.yMinBound = 0 + this.imgHeight / 2;
        this.yMaxBound = screen.canvas.height - (this.imgWidth / 2) - DASH_MENU_HEIGHT;

        // game stats:
        // this.subLiths = [];
        this.subLiths = [];

        // image stats
        this.animationRate = BASE_LITH_ANIMATION_RATE;
        this.spriteIndex = 0;
        this.spriteDirection = 1;
        this.setSprites(1);

        // subLith stats:
        this.subLithUpdateRate = BASE_SUB_LITH_UPDATE_RATE;

        this.dashSound = this.eatSound = null;
        this.mute = true;

        this.gotHit = false;
    }

    update(clicks, keys, ticks, allowSound) {
        this.mute = !this.allowSound;
        this.handleMovement(clicks, keys, ticks, allowSound);
        this.nextSprite(ticks);
        this.updateRenderSubLiths(ticks);
    }

    render() {
        this.ctx.save();

        if(this.gotHit){
            // this.ctx.fillTyle = "red";
            // this.ctx.fillRect(this.x, this.y, this.imgWidth, this.imgHeight, 0.5);

            // this.ctx.globalCompositeOperation = "destiantion-in"; 
        }
        super.render();
        let renderX = this.x - this.halfWidth;
        let renderY = this.y - this.halfHeight;

        this.ctx.drawImage(this.sprites[this.spriteIndex], renderX, renderY, this.imgHeight, this.imgWidth);

        this.ctx.restore();
    }

    updateRenderSubLiths(ticks) {
        this.ctx.save();
        this.ctx.globalAlpha = SUB_LITH_ALPHA_MASK;
        this.subLiths.forEach(subLith => {
            if (ticks % this.subLithUpdateRate == 0) {
                subLith.update(this.x, this.y, BASE_SUB_LITH_RADIAL_DISTANCE, BASE_SUB_LITH_ANGULAR_DELTA);
            }
            subLith.render();
        });
        this.ctx.restore();
    }

    collide(c, level, allowSound) {
        if (!c.dying) {
            if (super.collide(c)) {
                c.dying = true;
                if (level < c.size) {
                    if (allowSound) {
                        this.eatSound.cloneNode().play();
                    }
                    this.addSubLith();
                    return c.size * level;
                } else {
                    this.getHurt();
                    return -(level * SCORE_LOSS_MULTIPLIER * c.size);
                }
            }
        }

        return 0;
    }

    // removes a sublith to signify and count damage.
    getHurt() {
        if (this.subLiths.length == 0) {
            // lith's death causes a crash
            this.dying = true;
        }
        const subLith = this.removeLastSubLith();
        this.gotHit = true;
    }

    addSubLith(add = 1) {
        for (let i = 0; i < add; i++) {
            const newSubLith = new SubLith(this.x, this.y, this.sprites[0], this.ctx, this.scale / SUB_LITH_SCALE_DIVISOR);
            this.subLiths.push(newSubLith);
        }

        this.initSubLiths();
    }

    removeLastSubLith() {
        const subLith = this.subLiths.pop();

        this.initSubLiths();

        return subLith;
    }

    emptySubLiths() {
        this.subLiths = [];
    }

    initSubLiths() {
        const count = this.subLiths.length;
        const radialDistribution = 360 / count;
        let currentAngle = 0;

        this.subLiths.forEach(subLith => {
            subLith.setNewPosition(this.x, this.y, BASE_SUB_LITH_RADIAL_DISTANCE, currentAngle);
            currentAngle += radialDistribution;
            currentAngle %= 360;
        });
    }

    // progresses lith's sprite based on clock ticks.
    nextSprite(ticks) {
        if (ticks % this.animationRate == 0) {
            this.spriteIndex = (this.spriteIndex + 1) % this.sprites.length;
        }
    }

    // various movement helpers.
    handleMovement(clicks, keys, ticks, allowSound) {
        if (clicks.isClicking) {
            this.handleClickMovement(clicks);
        } else {
            this.handleKeyMovement(keys);
        }

        this.handleDash(clicks, keys, ticks, allowSound);

        this.x += this.velX;
        this.y += this.velY;

        this.x = this.outOfBoundsX();
        this.y = this.outOfBoundsY();
    }

    handleClickMovement(clicks) {
        const diffX = this.x - clicks.x;
        const diffY = this.y - clicks.y;

        // console.log(diffX, diffY);

        if (diffX == 0 && diffY == 0) {
            this.velY = 0;
            this.velX = 0;
        } else {
            if (diffY > 0) {
                this.velY = (diffY < this.speed) ? -diffY : -this.speed;
            } else {
                this.velY = (-diffY < this.speed) ? diffY : this.speed;
            }
            if (diffX > 0) {
                this.velX = (diffX < this.speed) ? -diffX : -this.speed;
            } else {
                this.velX = (-diffX < this.speed) ? diffX : this.speed;
            }
        }
    }

    handleKeyMovement(keys) {
        if (keys.up) {
            this.velY = -this.speed;
        } else if (keys.down) {
            this.velY = this.speed;
        } else {
            this.velY = 0;
        }
        if (keys.left) {
            this.velX = -this.speed;
        } else if (keys.right) {
            this.velX = this.speed;
        } else {
            this.velX = 0;
        }
    }

    handleDash(clicks, keys, ticks, allowSound) {
        if (this.dashCurrent == this.dashMax) {
            if (clicks.isDoubleClick) {
                if (allowSound) {
                    this.dashSound.play();
                }
                const dashDistance = this.dashMulti * this.speed;

                if (super.getDistance(this.x, this.y, clicks.x, clicks.y) < dashDistance) {

                    this.velX = clicks.x - this.x;
                    this.VelY = clicks.y - this.y;

                } else {

                    const pointBetween = super.getPointBetween(this.x, this.y, clicks.x, clicks.y, dashDistance);

                    this.velX = pointBetween.x;
                    this.velY = pointBetween.y;
                }

                this.dashCurrent = BASE_LITH_DASH_MIN;
            } else if (keys.dash) {
                if (allowSound) {
                    this.dashSound.play();
                }
                this.velX *= this.dashMulti;
                this.velY *= this.dashMulti;
                this.dashCurrent = BASE_LITH_DASH_MIN;
            }
        } else {
            if (ticks % this.dashRecoveryRate == 0)
                this.dashCurrent++;
        }
    }


    outOfBoundsX() {
        return (this.x < this.xMinBound) ? this.xMinBound : (this.x > this.xMaxBound) ? this.xMaxBound : this.x;
    }

    outOfBoundsY() {
        return (this.y < this.yMinBound) ? this.yMinBound : (this.y > this.yMaxBound) ? this.yMaxBound : this.y;
    }

    setDash(dash) {

    }

    setSounds(dashSound, eatSound) {
        this.dashSound = dashSound;
        this.eatSound = eatSound;
    }

    setSprites(level) {
        let spriteIdentifier = ""
        switch (level) {
            case 1:
            default:
                break;
            case 2:
                spriteIdentifier = "ast";
                break;
            case 3:
                spriteIdentifier = "moon";
                break;
            case 4:
                spriteIdentifier = "planet";
                break;
            case 5:
                spriteIdentifier = "star";
                break;
            case 6:
                spriteIdentifier = "gal";
                break;
        }
        // console.log(spriteIdentifier);
        this.sprites = [
            document.querySelector(`#gameCanvas > #${spriteIdentifier}lith1`),
            document.querySelector(`#gameCanvas > #${spriteIdentifier}lith2`),
            document.querySelector(`#gameCanvas > #${spriteIdentifier}lith3`),
            document.querySelector(`#gameCanvas > #${spriteIdentifier}lith4`),
            document.querySelector(`#gameCanvas > #${spriteIdentifier}lith5`),
            document.querySelector(`#gameCanvas > #${spriteIdentifier}lith6`),
            document.querySelector(`#gameCanvas > #${spriteIdentifier}lith7`),
            document.querySelector(`#gameCanvas > #${spriteIdentifier}lith8`),
        ];
    }
}
