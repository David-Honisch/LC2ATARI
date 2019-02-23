import { timingSafeEqual } from "crypto";

module LC2Intro {

	export class UtilText extends Phaser.RetroFont 
	{
		game:Phaser.Game;
		lfont:Phaser.RetroFont;		
		x: number = 0;
		y: number = 0;
		// constructor(game: Phaser.Game, x: number, y: number){
		// 	this.game = game;
		// 	this.x = x;
		// 	this.y = y;
		// }
		// constructor(game: Phaser.Game, x: number, y: number) {

		// 	super(game,'knighthawks', 31, 25,	Phaser.RetroFont.TEXT_SET2, 10, 1, 0);
		// 	this.game.physics.arcade.enableBody(this);			
		// 	// this.anchor.setTo(0.5, 0);
		// 	// this.animations.add('walk', [0], 10, true);
		// 	// game.add.existing(this);

		// }
		public createRasterFont() {
			var rasterFont = ["LETZTECHANCE.ORG", "PROUD TO PRESENT"];
			// createImprint();
			this.game.load.image("knighthawks", "assets/img/knighthawks.png");
			// var lfont = this.game.add.retroFont('knighthawks', 31, 25,
			// 	Phaser.RetroFont.TEXT_SET2, 10, 1, 0);
			this.lfont.text = rasterFont[0];
			var w = this.lfont.text.length * 32;
			var center = this.game.world.centerX > (w / 2) ? this.game.world.centerX - (w / 2) : 0;
			var fsprite1 = this.game.add.sprite(center, 10 * 32, this);
		}

		create(){
			// this.add(over, this);
		}
		over(){
			alert('Debug');
		}
		update() {

			// this.body.velocity.x = 0;
			// this.body.velocity.y = 0;

			// if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {

			// 	this.body.velocity.x = -150;
			// 	this.animations.play('walk');

			// 	if (this.scale.x == 1) {
			// 		this.scale.x = -1;
			// 	}
			// }
			// else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {

			// 	this.body.velocity.x = 150;
			// 	this.animations.play('walk');

			// 	if (this.scale.x == -1) {
			// 		this.scale.x = 1;
			// 	}
			// }			
			// else {
			// 	this.animations.frame = 0;
			// }
			// if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {

			// 	this.body.velocity.y = 150;
			// 	this.animations.play('walk');

			// 	if (this.scale.y == +1) {
			// 		this.scale.y = 1;
			// 	}
			// }
			// else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {

			// 	this.body.velocity.y = -150;
			// 	this.animations.play('walk');

			// 	if (this.scale.y == -1) {
			// 		this.scale.y = 1;
			// 	}
			// }
			// else {
			// 	this.animations.frame = 0;
			// }
			// this.rotation = this.game.physics.arcade.moveToPointer(this, 60, this.game.input.activePointer, 500);


		}

		

	}

}