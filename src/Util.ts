module LC2Intro {

	export class Util extends Phaser.Button //extends Phaser.State
	{
		game: Phaser.Game;

		constructor(game: Phaser.Game, x: number, y: number) {

			super(game, x, y, 'button');
			this.anchor.setTo(0.5);
			this.scale.setTo(0.8);
			this.game.add.existing(this);
			this.onInputOver.add(() => {
				this.goFullScreen();
			});

		}

		create() {
			const helloButton = this.game.add.text(100, 100, 'Hello Phaser!', { fill: '#fff' });
			// helloButton.setInteractive();
		}

		// overS(e) {
		// 	if (e.key === 'butStar2') {
		// 		alert('yes');
		// 	} else {
		// 		alert('wtf');
		// 	}

		// }

		goFullScreen() {
			if (this.game.scale.isFullScreen) {
				this.game.scale.stopFullScreen();
			} else {
				this.game.scale.startFullScreen(false);
			}

		}
		public static setBackGroundVisible(background: Phaser.Sprite) {
			background.visible = !background.visible;
		}
		public static setTileSpriteVisible(background: Phaser.TileSprite) {
			background.visible = !background.visible;
		}

		public static setBackGroundV2isible(background: Phaser.Sprite) {
			background.visible = !background.visible;
		}

		public static getQuery(pattern: string) {
			return Util.getUrlVars()[" + pattern + "];
		}
		public static getUrlVars() {
			var vars = [],
				hash;
			var hashes = window.location.href.slice(
				window.location.href.indexOf('?') + 1).split('&');
			for (var i = 0; i < hashes.length; i++) {
				hash = hashes[i].split('=');
				// alert(hash);
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
			}
			return vars;
		}

		public static createImage(game: Phaser.Game) {
			var bmd = game.make.bitmapData();
			// bmd = game.make.bitmapData(1920,1080);
			bmd.load('knighthawks').cls();
			bmd.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5, 1, 1);
			game.stage.smoothed = false;
			var area = new Phaser.Rectangle(0, bmd.height, bmd.width, 1);
			var dropTime = game.time.now + 250;
		}


		public static createText(game: Phaser.Game, appTitle: string, color: string, height: number, width: number) {
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
		}

		public static createPosText(game: Phaser.Game, appTitle: string, fontName: string, fontWeight: string, color: string, x: number, y: number, fontSize: number, fontWidth: number) {
			var text2 = game.add.text(x, y, appTitle);
			text2.align = 'center';
			text2.font = fontName;
			text2.fontWeight = fontWeight;
			text2.fontSize = fontSize;
			text2.fill = color;
			return text2;
		}

		public static addSprite(game: Phaser.Game, width: number) {
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
		}
		public static addLeftSprite(game: Phaser.Game) {
			game.physics.startSystem(Phaser.Physics.ARCADE);
			var img3 = game.add.sprite(20, 20, 'woman');
			game.physics.enable(img3, Phaser.Physics.ARCADE);
			// this.img3.body.velocity.y = 100;
			// this.img3.body.collideWorldBounds = true;
			// img3.body.bounce.set(1);
			img3.anchor.setTo(0.5, 0.0);
			img3.inputEnabled = true;
			// img3.input.enableDrag();
			//img3.events.onInputDown.add(Leftlistener, this);
			img3.x = game.world.centerX;
			img3.y = game.world.centerY - 100;

		}
		public static createRetroFont(rfont: Phaser.RetroFont, game: Phaser.Game, font: string, text: string, x: number, y: number, scalex: number, scaley: number) {
			try {
				rfont = game.add.retroFont(font, 31, 25, Phaser.RetroFont.TEXT_SET2, 10, 1, 0);
				rfont.setText(text);
				var w = rfont.text.length * 32;
				var center = game.world.centerX > (w / 2) ? game.world.centerX - (w / 2) : 0;
				center = center - x;
				var fsprite1 = game.add.sprite(center, y + (10 * 32), rfont);
				fsprite1.tint = 200 * 0xFFFFFF;
				//fsprite1.scale.setTo(1.3,1.3);
				fsprite1.scale.setTo(scalex, scaley);

			} catch (e) {
				console.error(e);
			}
		}


		public static createRasterFont(game: Phaser.Game, sfont: Phaser.RetroFont, x: number, y: number) {
			var rasterFont = ["LETZTECHANCE.ORG", "PROUD TO PRESENT"];
			// createImprint();
			game.load.image("knighthawks", "assets/img/knighthawks.png");
			var lfont = game.add.retroFont('knighthawks', 31, 25,
				Phaser.RetroFont.TEXT_SET2, 10, 1, 0);
			lfont.text = rasterFont[0];
			var w = lfont.text.length * 32;
			var center = game.world.centerX > (w / 2) ? game.world.centerX - (w / 2) : 0;
			var fsprite1 = game.add.sprite(center, 10 * 32, lfont);

			// var sfont = game.add.retroFont('knighthawks', 31, 25,
			// 	Phaser.RetroFont.TEXT_SET2, 10, 1, 0);
			// sfont.text = rasterFont[1]; // ?
			// w = sfont.text.length * 32;
			// center = game.world.centerX > (w / 2) ? game.world.centerX - (w / 2) : 0;
			// var fsprite2 = game.add.sprite(center, 11 * 32, sfont);
		}

		public static createRasterSinusFont(game: Phaser.Game, SCROLL_TEXT:string, height: number, width: number) {			
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
			// sinSprite.animations.add('run');
			// sinSprite.animations.play('run', 10, true);
			// for (var i = 0; i < SCROLL_TEXT.length; i++) {

		}

	}
}
