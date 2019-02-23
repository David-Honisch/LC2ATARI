module LC2Intro {

	export class Game extends Phaser.Game {
		title:string = "LC2ATARI Emulator";
		author:string = "David Honisch";
		version:number = 0.11;
		score:number = 0;
		level:number = 0;
		SCROLL_TEXT:string =
		"you are redirected to Atari EstyJS Emulator - have a nice day. take a coffee." +
		"this intro is written with phaser by phaser.io. funny isnt it. lets send some " +
		"greetings: greetings goes out to:" +
		"bey0nd3r, violotor, phyogozator, fir3bird, meshroom, flow" +
		"and all cool guys out there..." +
		"have a nice day. bye bye " +
		"damn, what are you waiting for bye " +
		"..              ";

		protracker:any = new AudioUtil(this,0,0);

		constructor() {

			super(1024, 768, Phaser.AUTO, 'content', null);

			this.state.add('Boot', Boot, false);
			this.state.add('Preloader', Preloader, false);
			this.state.add('MainMenu', MainMenu, false);
			this.state.add('Intro', Intro, false);
			this.state.start('Boot');
		}

	}

}