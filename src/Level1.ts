module LC2Intro {

	export class Level1 extends Phaser.State {
		static aStaticCounter: number = 0;
		level: number = 1;
		aPublicNumber: number = 0;
		cursors: any;
		background: Phaser.TileSprite;
		music: Phaser.Sound;
		player: LC2Intro.Player;
		ship: LC2Intro.Player;
		btnLevel1: Phaser.Sprite;
		btnLogo: Phaser.Sprite;
		button: Phaser.Button;

		bulletTime: number = 0;
		firingTimer: number = 0;
		alien: any;
		aliens: any;
		bullet: any;
		bullets: any;
		enemyBullet: any;
		enemyBullets: any;
		lives: any;
		explosions: any;
		livingEnemies: any = [];
		fireButton: any;
		lblScore: any;
		//btnLevel1 
		create() {
			try {
				this.game.protracker.createAudio();//TODO !!!!!!!!!!!
				this.game.physics.startSystem(Phaser.Physics.ARCADE);
				this.music = this.add.audio('titleMusic');
				this.music.play();
				//this.background = this.add.sprite(0, 0, 'level1');
				this.background = this.game.add.tileSprite(0, 0, 1024, 768, 'level1');
				// this.player = new Player(this.game, 130, 384);
				this.ship = new Goldrunner(this.game, this.game.world.centerY, this.game.world.centerX);

				Util.createPosText(this.game, "Level:" + this.level, "Arial", "bold", "#00ff00", 0, 0, 20, 10);
				// Util.createPosText(this.game, "Score:" + this.game.score, "Arial", "bold", "#00ff00", 0, 20, 20, 10);
				this.lblScore = Util.createPosText(this.game, "Score:" + this.game.score, "Arial", "bold", "#00ff00", 0, 40, 20, 10);
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

				//  An explosion pool
				this.explosions = this.game.add.group();
				this.explosions.createMultiple(30, 'kaboom');
				this.explosions.forEach(this.setupInvader, this);

				//  And some controls to play the game with
				this.cursors = this.game.input.keyboard.createCursorKeys();
				this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

			} catch (e) {
				console.error(e);
			}
		}
		createAliens() {

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

			//  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
			var tween = this.game.add.tween(this.aliens).to({ x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

			//  When the tween loops it calls descend
			tween.onLoop.add(this.descend, this);
		}
		descend() {

			this.aliens.y += 10;

		}
		setupInvader(invader: any) {
			invader.anchor.x = 0.5;
			invader.anchor.y = 0.5;
			invader.animations.add('kaboom');
		}

		createBulletGroup() {
			this.bullets = this.game.add.group();
			this.bullets.enableBody = true;
			this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
			this.bullets.createMultiple(30, 'bullet');
			this.bullets.setAll('anchor.x', 0.5);
			this.bullets.setAll('anchor.y', 1);
			this.bullets.setAll('outOfBoundsKill', true);
			this.bullets.setAll('checkWorldBounds', true);
		}
		createEnemyBulletGroup() {
			this.enemyBullets = this.game.add.group();
			this.enemyBullets.enableBody = true;
			this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
			this.enemyBullets.createMultiple(30, 'enemyBullet');
			this.enemyBullets.setAll('anchor.x', 0.5);
			this.enemyBullets.setAll('anchor.y', 1);
			this.enemyBullets.setAll('outOfBoundsKill', true);
			this.enemyBullets.setAll('checkWorldBounds', true);
		}

		update() {
			if (this.cursors.up.isDown) {
				this.background.tilePosition.y += 10;
			}
			else if (this.cursors.down.isDown) {
				this.background.tilePosition.y -= 10;
			}
			if (this.ship.alive) {
				//  Reset the player, then check for movement keys
				this.ship.body.velocity.setTo(0, 0);

				if (this.cursors.left.isDown) {
					this.ship.body.velocity.x = -200;
				}
				else if (this.cursors.right.isDown) {
					this.ship.body.velocity.x = 200;
				}

				//  Firing?
				if (this.fireButton.isDown) {
					this.fireBullet();
				}

				if (this.game.time.now > this.firingTimer) {
					this.enemyFires();
				}

				//  Run collision
				this.game.physics.arcade.overlap(this.bullets, this.aliens, this.collisionHandler, null, this);
				this.game.physics.arcade.overlap(this.enemyBullets, this.player, this.enemyHitsPlayer, null, this);
			}
			this.lblScore.text = "Score:" + this.game.score;
		}

		collisionHandler(bullet: any, alien: any) {

			//  When a bullet hits an alien we kill them both
			bullet.kill();
			alien.kill();

			//  Increase the score
			this.game.score += 20;
			// scoreText.text = scoreString + score;

			//  And create an explosion :)
			var explosion = this.explosions.getFirstExists(false);
			explosion.reset(this.alien.body.x, this.alien.body.y);
			explosion.play('kaboom', 30, false, true);

			if (this.aliens.countLiving() == 0) {
				this.game.score += 1000;
				// scoreText.text = scoreString + score;

				this.enemyBullets.callAll('kill', this);
				// stateText.text = " You Won, \n Click to restart";
				// stateText.visible = true;

				//the "click to restart" handler
				this.game.input.onTap.addOnce(this.restart, this);
			}

		}

		enemyHitsPlayer(player: any, bullet: any) {

			bullet.kill();

			var live = this.lives.getFirstAlive();

			if (live) {
				live.kill();
			}

			//  And create an explosion :)
			var explosion = this.explosions.getFirstExists(false);
			explosion.reset(player.body.x, player.body.y);
			explosion.play('kaboom', 30, false, true);

			// When the player dies
			if (this.lives.countLiving() < 1) {
				player.kill();
				this.enemyBullets.callAll('kill');

				// stateText.text=" GAME OVER \n Click to restart";
				// stateText.visible = true;

				//the "click to restart" handler
				this.game.input.onTap.addOnce(this.restart, this);
			}

		}

		enemyFires() {
			try {
				//  Grab the first bullet we can from the pool
				this.enemyBullet = this.enemyBullets.getFirstExists(false);
				this.livingEnemies.length = 0;
				try {
					this.aliens.forEachAlive(function (alien: any) {
						// put every living enemy in an array
						this.livingEnemies.push(this.alien);
					});
				} catch (e) {
					console.error(e);
				}
				if (this.enemyBullet && this.livingEnemies.length > 0) {

					var random = this.game.rnd.integerInRange(0, this.livingEnemies.length - 1);

					// randomly select one of them
					var shooter = this.livingEnemies[random];
					// And fire the bullet from this enemy
					this.enemyBullet.reset(shooter.body.x, shooter.body.y);

					this.game.physics.arcade.moveToObject(this.enemyBullet, this.ship, 120);
					this.firingTimer = this.game.time.now + 2000;
					this.music = this.add.audio('shot2');
					this.music.play();
				}

			} catch (e) {
				console.error(e);
			}
		}

		fireBullet() {
			this.music = this.add.audio('shot1');
			this.music.play();
			//  To avoid them being allowed to fire too fast we set a time limit
			if (this.game.time.now > this.bulletTime) {
				//  Grab the first bullet we can from the pool
				var bullet = this.bullets.getFirstExists(false);

				if (bullet) {
					//  And fire it
					bullet.reset(this.ship.x, this.ship.y + 8);
					bullet.body.velocity.y = -400;
					this.bulletTime = this.game.time.now + 200;
				}
			}

		}

		resetBullet(bullet: any) {
			//  Called if the bullet goes out of the screen
			bullet.kill();

		}

		restart() {
			// 	//  A new level starts			
			// 	//resets the life count
			// 	this.lives.callAll('revive');
			// 	//  And brings the aliens back from the dead :)
			// 	this.aliens.removeAll();
			// 	this.createAliens();

			// 	//revives the player
			// 	this.player.revive();
			// 	//hides the text
			// 	// stateText.visible = false;
			this.fadeOut();

		}

		//events

		actionOnClick() {
			this.btnLogo = this.game.add.sprite(190 + 69 * 1, -90, 'logo', 1);
			Util.setTileSpriteVisible(this.background);
			this.fadeOut();
			// this.background.visible =! this.background.visible;

		}

		fadeOut() {

			//this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
			var tween = this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
			tween.onComplete.add(this.startGame, this);

		}
		//new!!!
		startGame() {

			this.music.stop();
			this.game.state.start('Level2', true, false);

		}

	}

} 