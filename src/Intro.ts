module LC2Intro {

	export class Intro extends Phaser.State {

		static aStaticCounter: number = 0;
		aPublicNumber: number = 0;
		cursors:any;
		background: Phaser.TileSprite;
		music: Phaser.Sound;
		player: LC2Intro.Player;
		ship: LC2Intro.Goldrunner;
		btnLevel1: Phaser.Sprite;
		btnLogo: Phaser.Sprite;
		sinSprite: Phaser.Sprite;
		button: Phaser.Button;
		rfont: Phaser.RetroFont;
		rasterFont = ["LETZTECHANCE.ORG", "PROUD TO PRESENT"];

		//btnLevel1 
		create() {
			
			this.music = this.add.audio('titleMusic');
			this.music.play();
			// this.background = this.add.sprite(0, 0, 'intro');
			this.background = this.game.add.tileSprite(0, 0, 1024, 768, 'intro');
			// this.player = new Player(this.game, 130, 384);
			this.ship = new Goldrunner(this.game, 0, this.game.world.centerX);

			this.btnLogo = this.game.add.sprite(this.game.world.centerX - 300, 0, 'logo', 1);
			//this.add.tween(this.btnLogo).to({ y: 50 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);
			this.add.tween(this.btnLogo).to({ y: 120 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);
			// this.game.add.tween(this.btnLogo).to({ y: 240 }, 2400, Phaser.Easing.Bounce.Out, true, 100 + 100 * i, false);			
			//
			Util.createPosText(this.game, this.rasterFont[0]+" INTRO", "Arial", "bold", "#00ff00", 0, 0, 20, 10);

			Util.createRetroFont(this.rfont, this.game, "knighthawks", this.rasterFont[0], 120, -160, 1.5, 1.5);
			Util.createRetroFont(this.rfont, this.game, "knighthawks", this.rasterFont[1], 40, -100, 1.3, 1.3);
			//Util.createPosText(this.game, "INTRO", "Arial", "bold", "#00ff00", 0, 0, 20, 10);

			this.sinSprite = Util.createRasterSinusFont(this.game, this.game.SCROLL_TEXT, this.game.height-40, this.game.width);
			// this.sinSprite.animations.add('run');
			// this.sinSprite.animations.play('run', 10, true);

			this.button = this.game.add.button(this.game.world.centerX - 230, 400, 'button', this.actionOnClick, this, 2, 1, 0);
			this.cursors = this.game.input.keyboard.createCursorKeys();
		}

		update() {
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


		}

		actionOnClick() {
			Util.setTileSpriteVisible(this.background);
			// this.background.visible =! this.background.visible;
			// this.background = this.add.sprite(0, 0, 'intro');
			this.fadeOut();

		}

		fadeOut() {

			// this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
			var tween = this.add.tween(this.btnLogo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);

			tween.onComplete.add(this.startGame, this);

		}
		//new!!!
		startGame() {
			this.music.stop();
			//this.game.state.start('Level1', true, false);
			document.location = "atari.html";


		}

	}

} 