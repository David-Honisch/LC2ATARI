module LC2Intro {

	export class MainMenu extends Phaser.State {

		background: Phaser.Sprite;
		logo: Phaser.Sprite;
		music: Phaser.Sound;
		rfont: Phaser.RetroFont;
		sinSprite: Phaser.Sprite;
		rasterFont = ["LETZTECHANCE.ORG", "PROUD TO PRESENT"];		

		create() {
			
			this.music = this.add.audio('titleMusic');
			this.music.play();

			this.background = this.add.sprite(0, 0, 'titlepage');
			this.background.alpha = 0;

			this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
			this.logo.anchor.setTo(0.5, 0.5);

			this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
			this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);
			Util.createRetroFont(this.rfont, this.game,"knighthawks",this.rasterFont[0],120,-160, 1.5,1.5);
			Util.createRetroFont(this.rfont, this.game,"knighthawks",this.rasterFont[1],40,-100, 1.3,1.3);

			Util.createPosText(this.game, this.game.title,"Impact","bold", "#ffff00",200,650,90,10);
			Util.createPosText(this.game, this.game.version,"Impact","bold", "#00ff00",800,680,30,10);
			Util.createPosText(this.game, "Written by "+this.game.author, "Arial","bold","#ffffff",0,0,20,10);
			Util.createPosText(this.game, "GFX and DESIGN by","Impact","bold", "#ffffff",0,400,30,10);
			Util.createPosText(this.game, this.game.author,"Impact","bold", "#00ff00",0,440,70,10);

			this.sinSprite = Util.createRasterSinusFont(this.game,this.game.SCROLL_TEXT, this.game.height-40, this.game.width);

			this.input.onDown.addOnce(this.fadeOut, this);

		}
		update() {			
			if (this.sinSprite !== undefined) {
				this.sinSprite.x -= 1;
				if (this.sinSprite.x <= -60000) {
					this.sinSprite.x += 60000;
				}
			}

		}
		


		fadeOut() {

			this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
			var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);

			tween.onComplete.add(this.startGame, this);

		}

		startGame() {

			this.music.stop();
			this.game.state.start('Intro', true, false);

		}

	}

}