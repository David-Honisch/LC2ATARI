module LC2Intro {

	export class ButtonUtil extends Phaser.Sprite {

		constructor(game: Phaser.Game, x: number, y: number) {

			super(game, x, y, 'grsingle', 0);
			this.game.physics.arcade.enableBody(this);			
			this.anchor.setTo(0.5, 0);
			this.animations.add('walk', [0], 10, true);

			game.add.existing(this);

		}
		create(){
			// this.add(over, this);
		}
		over(){
			alert('Debug');
		}
		update() {

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


		}

		

	}

}