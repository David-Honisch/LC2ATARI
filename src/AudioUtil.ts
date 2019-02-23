module LC2Intro {

	export class AudioUtil extends Phaser.State {
		module: any;
		game: Phaser.Game;
		x: number;
		y: number;

		mods: any = [];
		//current: Phaser.Sound = <Phaser.Sound>(<any>-1);
		current: any;

		vumeter: any = [];
		channels: any = [];

		currentModule: any;

		constructor(game: Phaser.Game, x: number, y: number) {
			super();
			this.game = game;
			this.x = x;
			this.y = y;
		}

		public load_next_module(key: number, data: number) {
			this.current = this.mods.length - 1 ? this.current = 0 : this.current++;
			this.module.stop();
			this.module.clearsong();
			this.module.buffer = this.game.cache.getBinary(this.mods[this.current]);
			this.module.parse();
			// BUG if width==0
			for (var i = 0; i < this.vumeter.length; i++) {
				this.vumeter[i].width = 1;
			}
		}

		public modLoaded(key: number, data: number) {
			this.mods.push(key);
			var buffer = new Uint8Array(data);
			return buffer;
		}
		public createAudio() {
			try {
				this.module = new Protracker();
				this.module.onReady = function () {
					this.module.play();
				};
				// this.module.buffer = this.load.getBinary("mainMusic");
				// this.module.buffer = this.game.cache.getBinary(this.mods[this.current]);
				this.module.parse();
				this.load_next_module();
				// this.game.input.onDown.add(this.load_next_module, this);
				// for (var  i = 0, y = 0; i < 4; i++ , y += 50) {
				// 	this.vumeter[i] = this.game.add.sprite(0, y, "vu");
				// 	this.vumeter[i].crop(new Phaser.Rectangle(0, 0, 300, 30));
				// }
			} catch (e) {
				console.error(e);
			}
		}

	}
}
