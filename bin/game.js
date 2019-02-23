var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LC2Intro;
(function (LC2Intro) {
    var AudioUtil = (function (_super) {
        __extends(AudioUtil, _super);
        function AudioUtil(game, x, y) {
            var _this = _super.call(this) || this;
            _this.mods = [];
            _this.vumeter = [];
            _this.channels = [];
            _this.game = game;
            _this.x = x;
            _this.y = y;
            return _this;
        }
        AudioUtil.prototype.load_next_module = function (key, data) {
            this.current = this.mods.length - 1 ? this.current = 0 : this.current++;
            this.module.stop();
            this.module.clearsong();
            this.module.buffer = this.game.cache.getBinary(this.mods[this.current]);
            this.module.parse();
            for (var i = 0; i < this.vumeter.length; i++) {
                this.vumeter[i].width = 1;
            }
        };
        AudioUtil.prototype.modLoaded = function (key, data) {
            this.mods.push(key);
            var buffer = new Uint8Array(data);
            return buffer;
        };
        AudioUtil.prototype.createAudio = function () {
            try {
                this.module = new Protracker();
                this.module.onReady = function () {
                    this.module.play();
                };
                this.module.parse();
                this.load_next_module();
            }
            catch (e) {
                console.error(e);
            }
        };
        return AudioUtil;
    }(Phaser.State));
    LC2Intro.AudioUtil = AudioUtil;
})(LC2Intro || (LC2Intro = {}));
var LC2Intro;
(function (LC2Intro) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.init = function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            if (this.game.device.desktop) {
                this.scale.pageAlignHorizontally = true;
            }
            else {
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.scale.setMinMax(480, 260, 1024, 768);
                this.scale.forceLandscape = true;
                this.scale.pageAlignHorizontally = true;
            }
        };
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'assets/loader.png');
        };
        Boot.prototype.create = function () {
            this.game.state.start('Preloader');
        };
        return Boot;
    }(Phaser.State));
    LC2Intro.Boot = Boot;
})(LC2Intro || (LC2Intro = {}));
var LC2Intro;
(function (LC2Intro) {
    var ButtonUtil = (function (_super) {
        __extends(ButtonUtil, _super);
        function ButtonUtil(game, x, y) {
            var _this = _super.call(this, game, x, y, 'grsingle', 0) || this;
            _this.game.physics.arcade.enableBody(_this);
            _this.anchor.setTo(0.5, 0);
            _this.animations.add('walk', [0], 10, true);
            game.add.existing(_this);
            return _this;
        }
        ButtonUtil.prototype.create = function () {
        };
        ButtonUtil.prototype.over = function () {
            alert('Debug');
        };
        ButtonUtil.prototype.update = function () {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -150;
                this.animations.play('walk');
                if (this.scale.x == 1) {
                    this.scale.x = -1;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = 150;
                this.animations.play('walk');
                if (this.scale.x == -1) {
                    this.scale.x = 1;
                }
            }
            else {
                this.animations.frame = 0;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                this.body.velocity.y = 150;
                this.animations.play('walk');
                if (this.scale.y == +1) {
                    this.scale.y = 1;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.body.velocity.y = -150;
                this.animations.play('walk');
                if (this.scale.y == -1) {
                    this.scale.y = 1;
                }
            }
            else {
                this.animations.frame = 0;
            }
            this.rotation = this.game.physics.arcade.moveToPointer(this, 60, this.game.input.activePointer, 500);
        };
        return ButtonUtil;
    }(Phaser.Sprite));
    LC2Intro.ButtonUtil = ButtonUtil;
})(LC2Intro || (LC2Intro = {}));
var LC2Intro;
(function (LC2Intro) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this, 1024, 768, Phaser.AUTO, 'content', null) || this;
            _this.title = "LC2ATARI Emulator";
            _this.author = "David Honisch";
            _this.version = 0.11;
            _this.score = 0;
            _this.level = 0;
            _this.SCROLL_TEXT = "you are redirected to Atari EstyJS Emulator - have a nice day. take a coffee." +
                "this intro is written with phaser by phaser.io. funny isnt it. lets send some " +
                "greetings: greetings goes out to:" +
                "bey0nd3r, violotor, phyogozator, fir3bird, meshroom, flow" +
                "and all cool guys out there..." +
                "have a nice day. bye bye " +
                "damn, what are you waiting for bye " +
                "..              ";
            _this.protracker = new LC2Intro.AudioUtil(_this, 0, 0);
            _this.state.add('Boot', LC2Intro.Boot, false);
            _this.state.add('Preloader', LC2Intro.Preloader, false);
            _this.state.add('MainMenu', LC2Intro.MainMenu, false);
            _this.state.add('Intro', LC2Intro.Intro, false);
            _this.state.start('Boot');
            return _this;
        }
        return Game;
    }(Phaser.Game));
    LC2Intro.Game = Game;
})(LC2Intro || (LC2Intro = {}));
var LC2Intro;
(function (LC2Intro) {
    var Goldrunner = (function (_super) {
        __extends(Goldrunner, _super);
        function Goldrunner(game, x, y) {
            var _this = _super.call(this, game, x, y, 'grsingle', 0) || this;
            _this.game.physics.arcade.enableBody(_this);
            _this.animations.add('walk', [0], 10, true);
            game.add.existing(_this);
            _this.cursors = game.input.keyboard.createCursorKeys();
            return _this;
        }
        Goldrunner.prototype.create = function () {
        };
        Goldrunner.prototype.over = function () {
            alert('Debug');
        };
        Goldrunner.prototype.update = function () {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.body.velocity.setTo(0, 0);
            if (this.cursors.left.isDown) {
                this.body.velocity.x = -200;
            }
            else if (this.cursors.right.isDown) {
                this.body.velocity.x = 200;
            }
            else if (this.cursors.up.isDown) {
                this.body.velocity.y = -200;
            }
            else if (this.cursors.down.isDown) {
                this.body.velocity.y = 200;
            }
        };
        return Goldrunner;
    }(Phaser.Sprite));
    LC2Intro.Goldrunner = Goldrunner;
})(LC2Intro || (LC2Intro = {}));
var LC2Intro;
(function (LC2Intro) {
    var Intro = (function (_super) {
        __extends(Intro, _super);
        function Intro() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.aPublicNumber = 0;
            _this.rasterFont = ["LETZTECHANCE.ORG", "PROUD TO PRESENT"];
            return _this;
        }
        Intro.prototype.create = function () {
            this.music = this.add.audio('titleMusic');
            this.music.play();
            this.background = this.game.add.tileSprite(0, 0, 1024, 768, 'intro');
            this.ship = new LC2Intro.Goldrunner(this.game, 0, this.game.world.centerX);
            this.btnLogo = this.game.add.sprite(this.game.world.centerX - 300, 0, 'logo', 1);
            this.add.tween(this.btnLogo).to({ y: 120 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);
            LC2Intro.Util.createPosText(this.game, this.rasterFont[0] + " INTRO", "Arial", "bold", "#00ff00", 0, 0, 20, 10);
            LC2Intro.Util.createRetroFont(this.rfont, this.game, "knighthawks", this.rasterFont[0], 120, -160, 1.5, 1.5);
            LC2Intro.Util.createRetroFont(this.rfont, this.game, "knighthawks", this.rasterFont[1], 40, -100, 1.3, 1.3);
            this.sinSprite = LC2Intro.Util.createRasterSinusFont(this.game, this.game.SCROLL_TEXT, this.game.height - 40, this.game.width);
            this.button = this.game.add.button(this.game.world.centerX - 230, 400, 'button', this.actionOnClick, this, 2, 1, 0);
            this.cursors = this.game.input.keyboard.createCursorKeys();
        };
        Intro.prototype.update = function () {
            if (this.background.tilePosition !== undefined && this.background.tilePosition !== null) {
                this.background.tilePosition.y += 2;
            }
            if (this.sinSprite !== undefined) {
                this.sinSprite.x -= 1;
                if (this.sinSprite.x <= -60000) {
                    this.sinSprite.x += 60000;
                }
            }
            if (this.cursors.up.isDown) {
                this.background.tilePosition.y += 10;
            }
            else if (this.cursors.down.isDown) {
                this.background.tilePosition.y -= 10;
            }
        };
        Intro.prototype.actionOnClick = function () {
            LC2Intro.Util.setTileSpriteVisible(this.background);
            this.fadeOut();
        };
        Intro.prototype.fadeOut = function () {
            var tween = this.add.tween(this.btnLogo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        Intro.prototype.startGame = function () {
            this.music.stop();
            document.location = "atari.html";
        };
        Intro.aStaticCounter = 0;
        return Intro;
    }(Phaser.State));
    LC2Intro.Intro = Intro;
})(LC2Intro || (LC2Intro = {}));
var LC2Intro;
(function (LC2Intro) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.level = 1;
            _this.aPublicNumber = 0;
            _this.bulletTime = 0;
            _this.firingTimer = 0;
            _this.livingEnemies = [];
            return _this;
        }
        Level1.prototype.create = function () {
            try {
                this.game.protracker.createAudio();
                this.game.physics.startSystem(Phaser.Physics.ARCADE);
                this.music = this.add.audio('titleMusic');
                this.music.play();
                this.background = this.game.add.tileSprite(0, 0, 1024, 768, 'level1');
                this.ship = new LC2Intro.Goldrunner(this.game, this.game.world.centerY, this.game.world.centerX);
                LC2Intro.Util.createPosText(this.game, "Level:" + this.level, "Arial", "bold", "#00ff00", 0, 0, 20, 10);
                this.lblScore = LC2Intro.Util.createPosText(this.game, "Score:" + this.game.score, "Arial", "bold", "#00ff00", 0, 40, 20, 10);
                this.button = this.game.add.button(this.game.world.centerX - 95, 600, 'button', this.actionOnClick, this, 2, 1, 0);
                this.cursors = this.game.input.keyboard.createCursorKeys();
                this.createBulletGroup();
                this.createEnemyBulletGroup();
                this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);
                this.aliens = this.game.add.group();
                this.aliens.enableBody = true;
                this.aliens.physicsBodyType = Phaser.Physics.ARCADE;
                this.createAliens();
                this.lives = this.game.add.group();
                for (var i = 0; i < 3; i++) {
                    var ship = this.lives.create(this.game.world.width - 100 + (30 * i), 60, 'ship');
                    ship.anchor.setTo(0.5, 0.5);
                    ship.angle = 90;
                    ship.alpha = 0.4;
                }
                this.explosions = this.game.add.group();
                this.explosions.createMultiple(30, 'kaboom');
                this.explosions.forEach(this.setupInvader, this);
                this.cursors = this.game.input.keyboard.createCursorKeys();
                this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            }
            catch (e) {
                console.error(e);
            }
        };
        Level1.prototype.createAliens = function () {
            for (var y = 0; y < 4; y++) {
                for (var x = 0; x < 10; x++) {
                    this.alien = this.aliens.create(x * 48, y * 50, 'invader');
                    this.alien.anchor.setTo(0.5, 0.5);
                    this.alien.animations.add('fly', [0, 1, 2, 3], 20, true);
                    this.alien.play('fly');
                    this.alien.body.moves = false;
                }
            }
            this.aliens.x = 100;
            this.aliens.y = 50;
            var tween = this.game.add.tween(this.aliens).to({ x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
            tween.onLoop.add(this.descend, this);
        };
        Level1.prototype.descend = function () {
            this.aliens.y += 10;
        };
        Level1.prototype.setupInvader = function (invader) {
            invader.anchor.x = 0.5;
            invader.anchor.y = 0.5;
            invader.animations.add('kaboom');
        };
        Level1.prototype.createBulletGroup = function () {
            this.bullets = this.game.add.group();
            this.bullets.enableBody = true;
            this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
            this.bullets.createMultiple(30, 'bullet');
            this.bullets.setAll('anchor.x', 0.5);
            this.bullets.setAll('anchor.y', 1);
            this.bullets.setAll('outOfBoundsKill', true);
            this.bullets.setAll('checkWorldBounds', true);
        };
        Level1.prototype.createEnemyBulletGroup = function () {
            this.enemyBullets = this.game.add.group();
            this.enemyBullets.enableBody = true;
            this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
            this.enemyBullets.createMultiple(30, 'enemyBullet');
            this.enemyBullets.setAll('anchor.x', 0.5);
            this.enemyBullets.setAll('anchor.y', 1);
            this.enemyBullets.setAll('outOfBoundsKill', true);
            this.enemyBullets.setAll('checkWorldBounds', true);
        };
        Level1.prototype.update = function () {
            if (this.cursors.up.isDown) {
                this.background.tilePosition.y += 10;
            }
            else if (this.cursors.down.isDown) {
                this.background.tilePosition.y -= 10;
            }
            if (this.ship.alive) {
                this.ship.body.velocity.setTo(0, 0);
                if (this.cursors.left.isDown) {
                    this.ship.body.velocity.x = -200;
                }
                else if (this.cursors.right.isDown) {
                    this.ship.body.velocity.x = 200;
                }
                if (this.fireButton.isDown) {
                    this.fireBullet();
                }
                if (this.game.time.now > this.firingTimer) {
                    this.enemyFires();
                }
                this.game.physics.arcade.overlap(this.bullets, this.aliens, this.collisionHandler, null, this);
                this.game.physics.arcade.overlap(this.enemyBullets, this.player, this.enemyHitsPlayer, null, this);
            }
            this.lblScore.text = "Score:" + this.game.score;
        };
        Level1.prototype.collisionHandler = function (bullet, alien) {
            bullet.kill();
            alien.kill();
            this.game.score += 20;
            var explosion = this.explosions.getFirstExists(false);
            explosion.reset(this.alien.body.x, this.alien.body.y);
            explosion.play('kaboom', 30, false, true);
            if (this.aliens.countLiving() == 0) {
                this.game.score += 1000;
                this.enemyBullets.callAll('kill', this);
                this.game.input.onTap.addOnce(this.restart, this);
            }
        };
        Level1.prototype.enemyHitsPlayer = function (player, bullet) {
            bullet.kill();
            var live = this.lives.getFirstAlive();
            if (live) {
                live.kill();
            }
            var explosion = this.explosions.getFirstExists(false);
            explosion.reset(player.body.x, player.body.y);
            explosion.play('kaboom', 30, false, true);
            if (this.lives.countLiving() < 1) {
                player.kill();
                this.enemyBullets.callAll('kill');
                this.game.input.onTap.addOnce(this.restart, this);
            }
        };
        Level1.prototype.enemyFires = function () {
            try {
                this.enemyBullet = this.enemyBullets.getFirstExists(false);
                this.livingEnemies.length = 0;
                try {
                    this.aliens.forEachAlive(function (alien) {
                        this.livingEnemies.push(this.alien);
                    });
                }
                catch (e) {
                    console.error(e);
                }
                if (this.enemyBullet && this.livingEnemies.length > 0) {
                    var random = this.game.rnd.integerInRange(0, this.livingEnemies.length - 1);
                    var shooter = this.livingEnemies[random];
                    this.enemyBullet.reset(shooter.body.x, shooter.body.y);
                    this.game.physics.arcade.moveToObject(this.enemyBullet, this.ship, 120);
                    this.firingTimer = this.game.time.now + 2000;
                    this.music = this.add.audio('shot2');
                    this.music.play();
                }
            }
            catch (e) {
                console.error(e);
            }
        };
        Level1.prototype.fireBullet = function () {
            this.music = this.add.audio('shot1');
            this.music.play();
            if (this.game.time.now > this.bulletTime) {
                var bullet = this.bullets.getFirstExists(false);
                if (bullet) {
                    bullet.reset(this.ship.x, this.ship.y + 8);
                    bullet.body.velocity.y = -400;
                    this.bulletTime = this.game.time.now + 200;
                }
            }
        };
        Level1.prototype.resetBullet = function (bullet) {
            bullet.kill();
        };
        Level1.prototype.restart = function () {
            this.fadeOut();
        };
        Level1.prototype.actionOnClick = function () {
            this.btnLogo = this.game.add.sprite(190 + 69 * 1, -90, 'logo', 1);
            LC2Intro.Util.setTileSpriteVisible(this.background);
            this.fadeOut();
        };
        Level1.prototype.fadeOut = function () {
            var tween = this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        Level1.prototype.startGame = function () {
            this.music.stop();
            this.game.state.start('Level2', true, false);
        };
        Level1.aStaticCounter = 0;
        return Level1;
    }(Phaser.State));
    LC2Intro.Level1 = Level1;
})(LC2Intro || (LC2Intro = {}));
var LC2Intro;
(function (LC2Intro) {
    var Level2 = (function (_super) {
        __extends(Level2, _super);
        function Level2() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.aPublicNumber = 0;
            _this.level = 2;
            _this.rasterFont = ["LETZTECHANCE.ORG", "PROUD TO PRESENT"];
            _this.SCROLL_TEXT = "you are redirected to " + LC2Intro.Util.getQuery("q") + " - have a nice day. take a coffee." +
                "this intro is written with phaser by phaser.io. funny isnt it. lets send some " +
                "greetings: greetings goes out to:" +
                "..              ";
            return _this;
        }
        Level2.prototype.create = function () {
            this.music = this.add.audio('titleMusic');
            this.music.play();
            this.background = this.game.add.tileSprite(0, 0, 1024, 768, 'level2');
            this.ship = new LC2Intro.Goldrunner(this.game, this.game.world.centerY, this.game.world.centerX);
            this.btnLogo = this.game.add.sprite(this.game.world.centerX - 300, 0, 'logo', 1);
            this.add.tween(this.btnLogo).to({ y: 120 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);
            LC2Intro.Util.createRetroFont(this.rfont, this.game, "knighthawks", this.rasterFont[0], 120, -160, 1.5, 1.5);
            LC2Intro.Util.createRetroFont(this.rfont, this.game, "knighthawks", this.rasterFont[1], 40, -100, 1.3, 1.3);
            LC2Intro.Util.createPosText(this.game, "Level:" + this.level, "Arial", "bold", "#00ff00", 0, 0, 20, 10);
            LC2Intro.Util.createPosText(this.game, "Score:" + this.game.score, "Arial", "bold", "#00ff00", 0, 20, 20, 10);
            this.sinSprite = LC2Intro.Util.createRasterSinusFont(this.game, this.SCROLL_TEXT, this.game.height - 40, this.game.width);
            this.button = this.game.add.button(this.game.world.centerX - 95, 650, 'button', this.actionOnClick, this, 2, 1, 0);
        };
        Level2.prototype.update = function () {
            if (this.background.tilePosition !== undefined && this.background.tilePosition !== null) {
                this.background.tilePosition.x -= 2;
            }
            if (this.sinSprite !== undefined) {
                this.sinSprite.x -= 1;
                if (this.sinSprite.x <= -60000) {
                    this.sinSprite.x += 60000;
                }
            }
        };
        Level2.prototype.actionOnClick = function () {
            LC2Intro.Util.setTileSpriteVisible(this.background);
            this.fadeOut();
        };
        Level2.prototype.fadeOut = function () {
            var tween = this.add.tween(this.btnLogo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        Level2.prototype.startGame = function () {
            this.music.stop();
            this.game.state.start('Level3', true, false);
        };
        Level2.aStaticCounter = 0;
        return Level2;
    }(Phaser.State));
    LC2Intro.Level2 = Level2;
})(LC2Intro || (LC2Intro = {}));
var LC2Intro;
(function (LC2Intro) {
    var Level3 = (function (_super) {
        __extends(Level3, _super);
        function Level3() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.level = 3;
            _this.aPublicNumber = 0;
            return _this;
        }
        Level3.prototype.create = function () {
            try {
                this.game.protracker.createAudio();
                this.music = this.add.audio('titleMusic');
                this.music.play();
                this.background = this.game.add.tileSprite(0, 0, 1024, 768, 'level3');
                this.ship = new LC2Intro.Goldrunner(this.game, this.game.world.centerY, this.game.world.centerX);
                LC2Intro.Util.createPosText(this.game, "Level:" + this.level, "Arial", "bold", "#00ff00", 0, 0, 20, 10);
                LC2Intro.Util.createPosText(this.game, "Score:" + this.game.score, "Arial", "bold", "#00ff00", 0, 20, 20, 10);
                this.button = this.game.add.button(this.game.world.centerX - 95, 600, 'button', this.actionOnClick, this, 2, 1, 0);
                this.cursors = this.game.input.keyboard.createCursorKeys();
            }
            catch (e) {
                console.error(e);
            }
        };
        Level3.prototype.update = function () {
            if (this.cursors.up.isDown) {
                this.background.tilePosition.y += 10;
            }
            else if (this.cursors.down.isDown) {
                this.background.tilePosition.y -= 10;
            }
        };
        Level3.prototype.actionOnClick = function () {
            this.btnLogo = this.game.add.sprite(190 + 69 * 1, -90, 'logo', 1);
            LC2Intro.Util.setTileSpriteVisible(this.background);
            this.fadeOut();
        };
        Level3.prototype.fadeOut = function () {
            var tween = this.add.tween(this.btnLogo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        Level3.prototype.startGame = function () {
            this.music.stop();
            this.game.state.start('Level4', true, false);
        };
        Level3.aStaticCounter = 0;
        return Level3;
    }(Phaser.State));
    LC2Intro.Level3 = Level3;
})(LC2Intro || (LC2Intro = {}));
var LC2Intro;
(function (LC2Intro) {
    var Level4 = (function (_super) {
        __extends(Level4, _super);
        function Level4() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.level = 4;
            _this.aPublicNumber = 0;
            return _this;
        }
        Level4.prototype.create = function () {
            this.music = this.add.audio('titleMusic');
            this.music.play();
            this.background = this.add.sprite(0, 0, 'level4');
            this.player = new LC2Intro.Player(this.game, 130, 384);
            LC2Intro.Util.createPosText(this.game, "Level:" + this.level, "Arial", "bold", "#00ff00", 0, 0, 20, 10);
            LC2Intro.Util.createPosText(this.game, "Score:" + this.game.score, "Arial", "bold", "#00ff00", 0, 20, 20, 10);
            var i = 1;
            this.btnLogo = this.game.add.sprite(190 + 69 * i, -90, 'logo', i);
            this.button = this.game.add.button(this.game.world.centerX - 95, 400, 'button', this.fadeOut, this, 2, 1, 0);
        };
        Level4.prototype.fadeOut = function () {
            this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.btnLogo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        Level4.prototype.startGame = function () {
            this.music.stop();
            this.game.state.start('Boot', true, false);
        };
        Level4.aStaticCounter = 0;
        return Level4;
    }(Phaser.State));
    LC2Intro.Level4 = Level4;
})(LC2Intro || (LC2Intro = {}));
var LC2Intro;
(function (LC2Intro) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.rasterFont = ["LETZTECHANCE.ORG", "PROUD TO PRESENT"];
            return _this;
        }
        MainMenu.prototype.create = function () {
            this.music = this.add.audio('titleMusic');
            this.music.play();
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0;
            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);
            LC2Intro.Util.createRetroFont(this.rfont, this.game, "knighthawks", this.rasterFont[0], 120, -160, 1.5, 1.5);
            LC2Intro.Util.createRetroFont(this.rfont, this.game, "knighthawks", this.rasterFont[1], 40, -100, 1.3, 1.3);
            LC2Intro.Util.createPosText(this.game, this.game.title, "Impact", "bold", "#ffff00", 200, 650, 90, 10);
            LC2Intro.Util.createPosText(this.game, this.game.version, "Impact", "bold", "#00ff00", 800, 680, 30, 10);
            LC2Intro.Util.createPosText(this.game, "Written by " + this.game.author, "Arial", "bold", "#ffffff", 0, 0, 20, 10);
            LC2Intro.Util.createPosText(this.game, "GFX and DESIGN by", "Impact", "bold", "#ffffff", 0, 400, 30, 10);
            LC2Intro.Util.createPosText(this.game, this.game.author, "Impact", "bold", "#00ff00", 0, 440, 70, 10);
            this.sinSprite = LC2Intro.Util.createRasterSinusFont(this.game, this.game.SCROLL_TEXT, this.game.height - 40, this.game.width);
            this.input.onDown.addOnce(this.fadeOut, this);
        };
        MainMenu.prototype.update = function () {
            if (this.sinSprite !== undefined) {
                this.sinSprite.x -= 1;
                if (this.sinSprite.x <= -60000) {
                    this.sinSprite.x += 60000;
                }
            }
        };
        MainMenu.prototype.fadeOut = function () {
            this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        MainMenu.prototype.startGame = function () {
            this.music.stop();
            this.game.state.start('Intro', true, false);
        };
        return MainMenu;
    }(Phaser.State));
    LC2Intro.MainMenu = MainMenu;
})(LC2Intro || (LC2Intro = {}));
var LC2Intro;
(function (LC2Intro) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            var _this = _super.call(this, game, x, y, 'simon', 0) || this;
            _this.game.physics.arcade.enableBody(_this);
            _this.anchor.setTo(0.5, 0);
            _this.animations.add('walk', [0, 1, 2, 3, 4], 10, true);
            game.add.existing(_this);
            return _this;
        }
        Player.prototype.update = function () {
            this.body.velocity.x = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -150;
                this.animations.play('walk');
                if (this.scale.x == 1) {
                    this.scale.x = -1;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = 150;
                this.animations.play('walk');
                if (this.scale.x == -1) {
                    this.scale.x = 1;
                }
            }
            else {
                this.animations.frame = 0;
            }
        };
        return Player;
    }(Phaser.Sprite));
    LC2Intro.Player = Player;
})(LC2Intro || (LC2Intro = {}));
var LC2Intro;
(function (LC2Intro) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ready = false;
            return _this;
        }
        Preloader.prototype.preload = function () {
            this.preloadBar = this.add.sprite(300, 400, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            this.load.script('protracker', 'assets/_plugins/ProTracker.js');
            this.load.image("vu", "assets/img/vu.png");
            this.load.image("knighthawks", "assets/img/knighthawks.png");
            this.load.image('titlepage', 'assets/titlepage.jpg');
            this.load.audio('titleMusic', 'assets/title.mp3', true);
            this.load.audio('shot1', 'assets/audio/shot1.wav', true);
            this.load.audio('shot2', 'assets/audio/shot2.wav', true);
            this.load.binary('grmod', 'assets/audio/GOLDRUNR.MOD', this.game.protracker.modLoaded, this);
            this.load.image('logo', 'assets/logo.png');
            this.load.spritesheet('gr', 'assets/gr.png', 58, 96, 5);
            this.load.image('grsingle', 'assets/img/grsingle.png');
            this.load.image('raster', 'assets/img/sunset-raster.png');
            this.load.image('button', 'assets/img/btn.png');
            this.load.image('intro', 'assets/Intro.png');
            this.load.image('bullet', 'assets/img/invaders/bullet.png');
            this.load.image('enemyBullet', 'assets/img/invaders/enemy-bullet.png');
            this.load.image('enemyBullet', 'assets/img/invaders/enemy-bullet.png');
            this.game.load.spritesheet('kaboom', 'assets/img/invaders/explode.png', 128, 128);
            this.game.load.spritesheet('invader', 'assets/img/invaders/invader32x32x4.png', 32, 32);
        };
        Preloader.prototype.create = function () {
            this.game.state.start('MainMenu');
        };
        return Preloader;
    }(Phaser.State));
    LC2Intro.Preloader = Preloader;
})(LC2Intro || (LC2Intro = {}));
var LC2Intro;
(function (LC2Intro) {
    var Text = (function (_super) {
        __extends(Text, _super);
        function Text(game, x, y) {
            var _this = _super.call(this, game, x, y, 'simon', 0) || this;
            _this.game.physics.arcade.enableBody(_this);
            _this.anchor.setTo(0.5, 0);
            _this.animations.add('walk', [0, 1, 2, 3, 4], 10, true);
            game.add.existing(_this);
            return _this;
        }
        Text.prototype.update = function () {
            this.body.velocity.x = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -150;
                this.animations.play('walk');
                if (this.scale.x == 1) {
                    this.scale.x = -1;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = 150;
                this.animations.play('walk');
                if (this.scale.x == -1) {
                    this.scale.x = 1;
                }
            }
            else {
                this.animations.frame = 0;
            }
        };
        return Text;
    }(Phaser.Sprite));
    LC2Intro.Text = Text;
})(LC2Intro || (LC2Intro = {}));
var LC2Intro;
(function (LC2Intro) {
    var Util = (function (_super) {
        __extends(Util, _super);
        function Util(game, x, y) {
            var _this = _super.call(this, game, x, y, 'button') || this;
            _this.anchor.setTo(0.5);
            _this.scale.setTo(0.8);
            _this.game.add.existing(_this);
            _this.onInputOver.add(function () {
                _this.goFullScreen();
            });
            return _this;
        }
        Util.prototype.create = function () {
            var helloButton = this.game.add.text(100, 100, 'Hello Phaser!', { fill: '#fff' });
        };
        Util.prototype.goFullScreen = function () {
            if (this.game.scale.isFullScreen) {
                this.game.scale.stopFullScreen();
            }
            else {
                this.game.scale.startFullScreen(false);
            }
        };
        Util.setBackGroundVisible = function (background) {
            background.visible = !background.visible;
        };
        Util.setTileSpriteVisible = function (background) {
            background.visible = !background.visible;
        };
        Util.setBackGroundV2isible = function (background) {
            background.visible = !background.visible;
        };
        Util.getQuery = function (pattern) {
            return Util.getUrlVars()[" + pattern + "];
        };
        Util.getUrlVars = function () {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        };
        Util.createImage = function (game) {
            var bmd = game.make.bitmapData();
            bmd.load('knighthawks').cls();
            bmd.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5, 1, 1);
            game.stage.smoothed = false;
            var area = new Phaser.Rectangle(0, bmd.height, bmd.width, 1);
            var dropTime = game.time.now + 250;
        };
        Util.createText = function (game, appTitle, color, height, width) {
            var x = width / 2 + 60;
            var y = height;
            var fontSize = 20;
            var fontWidth = 10;
            var fSize = ((appTitle.length * fontWidth) / 2);
            x = x - fSize;
            var text2 = game.add.text(x, y, appTitle);
            text2.align = 'center';
            text2.font = 'Arial';
            text2.fontWeight = 'bold';
            text2.fontSize = fontSize;
            text2.fill = color;
        };
        Util.createPosText = function (game, appTitle, fontName, fontWeight, color, x, y, fontSize, fontWidth) {
            var text2 = game.add.text(x, y, appTitle);
            text2.align = 'center';
            text2.font = fontName;
            text2.fontWeight = fontWeight;
            text2.fontSize = fontSize;
            text2.fill = color;
            return text2;
        };
        Util.addSprite = function (game, width) {
            game.physics.startSystem(Phaser.Physics.ARCADE);
            var img2 = game.add.sprite(width, 20, 'raster');
            game.physics.enable(img2, Phaser.Physics.ARCADE);
            img2.body.velocity.x = 100;
            img2.body.velocity.y = 200;
            img2.body.collideWorldBounds = true;
            img2.body.bounce.set(1);
            img2.anchor.setTo(0.5, 0.0);
            img2.inputEnabled = true;
            img2.input.enableDrag();
        };
        Util.addLeftSprite = function (game) {
            game.physics.startSystem(Phaser.Physics.ARCADE);
            var img3 = game.add.sprite(20, 20, 'woman');
            game.physics.enable(img3, Phaser.Physics.ARCADE);
            img3.anchor.setTo(0.5, 0.0);
            img3.inputEnabled = true;
            img3.x = game.world.centerX;
            img3.y = game.world.centerY - 100;
        };
        Util.createRetroFont = function (rfont, game, font, text, x, y, scalex, scaley) {
            try {
                rfont = game.add.retroFont(font, 31, 25, Phaser.RetroFont.TEXT_SET2, 10, 1, 0);
                rfont.setText(text);
                var w = rfont.text.length * 32;
                var center = game.world.centerX > (w / 2) ? game.world.centerX - (w / 2) : 0;
                center = center - x;
                var fsprite1 = game.add.sprite(center, y + (10 * 32), rfont);
                fsprite1.tint = 200 * 0xFFFFFF;
                fsprite1.scale.setTo(scalex, scaley);
            }
            catch (e) {
                console.error(e);
            }
        };
        Util.createRasterFont = function (game, sfont, x, y) {
            var rasterFont = ["LETZTECHANCE.ORG", "PROUD TO PRESENT"];
            game.load.image("knighthawks", "assets/img/knighthawks.png");
            var lfont = game.add.retroFont('knighthawks', 31, 25, Phaser.RetroFont.TEXT_SET2, 10, 1, 0);
            lfont.text = rasterFont[0];
            var w = lfont.text.length * 32;
            var center = game.world.centerX > (w / 2) ? game.world.centerX - (w / 2) : 0;
            var fsprite1 = game.add.sprite(center, 10 * 32, lfont);
        };
        Util.createRasterSinusFont = function (game, SCROLL_TEXT, height, width) {
            game.load.image("knighthawks", "assets/img/knighthawks.png");
            var sfont = game.add.retroFont('knighthawks', 31, 25, Phaser.RetroFont.TEXT_SET2, 10, 1, 0);
            sfont.text = SCROLL_TEXT;
            var w = sfont.text.length * 32;
            var center = game.world.centerX > (w / 2) ? game.world.centerX - (w / 2) : 0;
            var sinSprite = game.add.sprite(width, height, sfont);
            sinSprite.anchor.setTo(0.5, 0.5);
            sinSprite.scale.setTo(2, 2);
            sinSprite.x = (SCROLL_TEXT.length * 35);
            return sinSprite;
        };
        return Util;
    }(Phaser.Button));
    LC2Intro.Util = Util;
})(LC2Intro || (LC2Intro = {}));
System.register("UtilText", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var LC2Intro;
    return {
        setters: [],
        execute: function () {
            (function (LC2Intro) {
                var UtilText = (function (_super) {
                    __extends(UtilText, _super);
                    function UtilText() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.x = 0;
                        _this.y = 0;
                        return _this;
                    }
                    UtilText.prototype.createRasterFont = function () {
                        var rasterFont = ["LETZTECHANCE.ORG", "PROUD TO PRESENT"];
                        this.game.load.image("knighthawks", "assets/img/knighthawks.png");
                        this.lfont.text = rasterFont[0];
                        var w = this.lfont.text.length * 32;
                        var center = this.game.world.centerX > (w / 2) ? this.game.world.centerX - (w / 2) : 0;
                        var fsprite1 = this.game.add.sprite(center, 10 * 32, this);
                    };
                    UtilText.prototype.create = function () {
                    };
                    UtilText.prototype.over = function () {
                        alert('Debug');
                    };
                    UtilText.prototype.update = function () {
                    };
                    return UtilText;
                }(Phaser.RetroFont));
                LC2Intro.UtilText = UtilText;
            })(LC2Intro || (LC2Intro = {}));
        }
    };
});
//# sourceMappingURL=game.js.map