module LC2Intro {

	export class Goldrunner extends Phaser.Sprite {
		cursors:any;
		constructor(game: Phaser.Game, x: number, y: number) {

			super(game, x, y, 'grsingle', 0);
			this.game.physics.arcade.enableBody(this);
			// this.anchor.setTo(0.5, 0);
			this.animations.add('walk', [0], 10, true);

			game.add.existing(this);
			this.cursors = game.input.keyboard.createCursorKeys();

		}
		create() {
			// this.add(over, this);
		}
		over() {
			alert('Debug');
		}
		update() {

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

		}



	}

}