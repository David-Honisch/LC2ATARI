module LC2Intro {

	export class Preloader extends Phaser.State {

		preloadBar: Phaser.Sprite;
		background: Phaser.Sprite;
		ready: boolean = false;
		//audioUtil: AudioUtil = new AudioUtil();

		preload() {

			//	These are the assets we loaded in Boot.js
			this.preloadBar = this.add.sprite(300, 400, 'preloadBar');

			//	This sets the preloadBar sprite as a loader sprite.
			//	What that does is automatically crop the sprite from 0 to full-width
			//	as the files below are loaded in.
			this.load.setPreloadSprite(this.preloadBar);

			//	Here we load the rest of the assets our game needs.
			//	As this is just a Project Template I've not provided these assets, swap them for your own.
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
			// this.load.spritesheet('simon', 'assets/simon.png', 58, 96, 5);
			this.load.image('intro', 'assets/Intro.png');
			// this.load.image('level1', 'assets/level1.png');
			// this.load.image('level2', 'assets/level2.png');
			// this.load.image('level3', 'assets/level3.png');
			// this.load.image('level4', 'assets/level4.png');
			//
			this.load.image('bullet', 'assets/img/invaders/bullet.png');
			this.load.image('enemyBullet', 'assets/img/invaders/enemy-bullet.png');
			this.load.image('enemyBullet', 'assets/img/invaders/enemy-bullet.png');
			this.game.load.spritesheet('kaboom', 'assets/img/invaders/explode.png', 128, 128);
			this.game.load.spritesheet('invader', 'assets/img/invaders/invader32x32x4.png', 32, 32); 
			//	+ lots of other required assets here

		}

		create() {
			this.game.state.start('MainMenu');
		}
	}
}