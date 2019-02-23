//  10 x 8
// var game = new Phaser.Game(320, 256, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
var game = new Phaser.Game(320*2, 256*2, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });
var font;
var letters = [];
var pos = [];

var data;
var scale = 2;
var page = -1;

var bfont;
var alpha;
var mask = new Phaser.Rectangle();
/*
var filter;
var sprite;
*/
var data;
var rasters;
var pos = [];

var button;
var background;


var bmd;
var text;
//music
//var music;
var mods = [];
var current = 0;

var vumeter = [];
var channels = [];

var module;




///*
var scroller = [ 
                "----------",
                "- LETZTE -", 
                "- CHANCE -",
                "-  .ORG  -",				
                "----------", 
                "- 2.1.0  -", 
                "- PROUD  -", 
                "-   TO   -", 
                "- PRESENT-", 
                "----------", 

                " ATARI    ",
                " RETRO    ",
                " INTRO    ", 
                " v.1.0    ", 
                " USING    ", 
                "TEXTWRITER", 
                "EFFECT IN ", 
                "PHASER ...", 

                "GREETINGS ",
                "  GOES    ",
                "  OUT TO  ", 
				"HURRICANE ", 
				" VIOLATOR ", 
                "PHYGOZATOR", 
                " FIREBIRD ",                 
                " WARLORD  ", 
                ];
//*/
function preload() {
	//game.load.audio('boden', 'bodenstaendig_2000_in_rock_4bit.ogg');
	game.load.script('protracker', '_plugins/ProTracker.js');
	game.load.binary('shampoo', 'audio/shampoo.mod', modLoaded, this);	
    game.load.image('knightHawks', 'img/knighthawks.png');
    // game.load.image('knightHawks', 'assets/fonts/retroFonts/knighthawks_font.png');
    // game.load.image('knightHawks', 'assets/fonts/retroFonts/KNIGHT3.png');
    game.load.image('raster', 'img/sunset-raster.png');
    // game.load.image('raster', 'assets/demoscene/multi-color-raster.png');
	game.load.image('raster', 'img/raster-blue.png');
	//game.load.image('back', 'phaser-examples-master/examples/assets/pics/swirl1.jpg');
	//game.load.image('background','phaser-examples-master/examples/assets/misc/starfield.jpg');
	game.load.spritesheet('button', 'img/button_sprite_sheet.png', 193, 71);
}
function create() {
/*	
//  Generate our motion data
    data = game.make.tween({ y: 0 }).to( { y: 320 }, 256*2, Phaser.Easing.Sinusoidal.In).yoyo(true).generateData(60);
    //  A group of rasters
    rasters = game.add.group();

    //  The total number + spacing between each one
    var total = 8;
    var offset = 4;

    for (var i = 0; i < total; i++)
    {
        var raster = rasters.create(0, 0, 'raster');
        raster.width = 2*320;
        raster.alpha = (i + 1) * (1 / total);
        pos.push(i * offset);
    } 
*/
	
	//eof bars 
	//music = game.add.audio('boden');
    //music.onDecoded.add(start, this);
	module = new Protracker();

    //module.play() has to be called from a callback
    module.onReady = function() {
        module.play();
    };

    module.buffer = game.cache.getBinary(mods[current]);
    module.parse();

    //game.input.onDown.add(load_next_module, this);

	//	Our background
	//game.add.image(0, 0, 'back');
//	game.stage.backgroundColor = '#182d3b';
//    background = game.add.tileSprite(0, 0, 2*320, 2*256, 'background');
	button = game.add.button(game.world.centerX - 95, 500, 'button', actionOnClick, this, 2, 1, 0);

    button.onInputOver.add(over, this);
    button.onInputOut.add(out, this);
    button.onInputUp.add(up, this);
	//	This is the BitmapData we're going to be drawing to
	//bmd = game.add.bitmapData(game.width, game.height);

	//	Black and opaque
	//bmd.fill(0, 0, 0, 1);

	//bmd.addToWorld();
/*	
	text = game.make.text(0, 0, "phaser", { font: "bold 32px Arial", fill: "#ff0044" });
    text.anchor.set(0.5);	
    game.add.tween(text.scale).to( { x: 0.5, y: 0.5 }, 2000, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);
*/	
	//bmd.draw(text, 100, 100, null, null, 'destination-out');
	var style = { font: "25px Arial", fill: "#ff0044", align: "center" };
    var text = game.add.text(500, 480, "d0n3 by HuRRican3", style);
    text.anchor.set(0.5);
    text.alpha = 0.1;

    game.add.tween(text).to( { alpha: 1 }, 2000, "Linear", true);

	

    // makeRasterFont();

    // font = game.add.retroFont('knightHawks', 31, 25, Phaser.RetroFont.TEXT_SET6 + "*", 10, 1, 1);
    font = game.add.retroFont('knightHawks', 31, 25, Phaser.RetroFont.TEXT_SET2, 10, 1, 0);

    //  There can only be 80 letters on-screen at once (10x8) so generate them all now

    //  Scale 1:1
    var x = 0;
    var y = 0;
    // var scale = 1;
    // var tx = 32;
    // var ty = 32;
    // var hx = 16;
    // var hy = 16;

    //  Scale 2:1
    scale = 2;
    var tx = 64;
    var ty = 64;
    var hx = 32;
    var hy = 32;

    game.stage.smoothed = false;

    //  In reverse so they overlap in the correct order
    for (var i = 0; i < 80; i++)
    {
        //  For some reason using a BMD here doesn't allow us to share the texture - need to investigate why

        var letter = game.add.sprite(game.world.centerX, game.world.centerY, 'knightHawks');

/*
// the various blend modes supported by pixi
PIXI.blendModes = {
    NORMAL:0,
    ADD:1,
    MULTIPLY:2,
    SCREEN:3,
    OVERLAY:4,
    DARKEN:5,
    LIGHTEN:6,
    COLOR_DODGE:7,
    COLOR_BURN:8,
    HARD_LIGHT:9,
    SOFT_LIGHT:10,
    DIFFERENCE:11,
    EXCLUSION:12,
    HUE:13,
    SATURATION:14,
    COLOR:15,
    LUMINOSITY:16
};
 */

        // letter.blendMode = PIXI.blendModes.OVERLAY;
        letter.scale.set(0);
        letter.anchor.set(0.5);
        letter.animations.loadFrameData(font.frameData, 48);
        this.world.sendToBack(letter);

        letters.push(letter);
        pos.push( { x: x + hx, y: y + hy } ); // add 16 because of the anchor

        x += tx;

        if (x === game.width)
        {
            x = 0;
            y += ty;
        }
    }

    var raster = game.add.sprite(0, 0, 'raster');
    raster.width = game.width;
    raster.height = game.height;
    raster.blendMode = PIXI.blendModes.COLOR;

    // this.world.sendToBack(raster);

    bringIn();
	
	// Stretch to fill
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    // Keep original size
    // game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;

    // Maintain aspect ratio
    // game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.input.onDown.add(gofull, this);

}

function setLetters() {

    page++;

    if (page === 3)
    {
        page = 0;
    }

    var i = 0;

    for (var y = 0; y < 8; y++)
    {
        for (var x = 0; x < 10; x++)
        {
            letters[i].frame = font.grabData[scroller[(page * 8) + y].charCodeAt(x)];
            i++;
        }
    }

}

function bringIn() {

    setLetters();

    var delay = 0;
    var speed = 300;

    for (var i = 0; i < 80; i++)
    {
        if (page % 2 === 1)
        {
            game.add.tween(letters[i].position).to( { x: pos[i].x, y: pos[i].y }, speed, Phaser.Easing.Back.Out, true, delay);
            game.add.tween(letters[i].scale).to( { x: scale, y: scale }, speed, Phaser.Easing.Back.Out, true, delay);
        }
        else
        {
            game.add.tween(letters[i].position).to( { x: pos[i].x, y: pos[i].y }, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
            game.add.tween(letters[i].scale).to( { x: scale, y: scale }, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
        }

        delay += 100;
    }

    game.time.events.add(delay + 2000, takeAway, this);

}

function takeAway() {

    var delay = 0;
    var speed = 200;

    for (var i = 79; i >= 0; i--)
    {
        game.add.tween(letters[i].position).to( { x: game.world.centerX, y: game.world.centerY }, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
        game.add.tween(letters[i].scale).to( { x: 0, y: 0 }, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
        delay += 50;
    }

    game.time.events.add(delay + 200, bringIn, this);

}


function gofull() {

    if (game.scale.isFullScreen)
    {
        game.scale.stopFullScreen();
    }
    else
    {
        game.scale.startFullScreen(false);
    }

}

function start() {

    //music.fadeIn(4000);

}

function update() {
	//bmd.fill(0, 0, 0, 0.05);
	//bmd.draw(text, 100, 300, null, null, 'destination-out');
	//	Un-comment to see the rotation in action
	// text.rotation += 0.05;

    
	//filter.update(game.input.activePointer);
	/*
	rasters.resetCursor();	
    for (var i = 0; i < rasters.total; i++)
    {
        pos[i]++;
        if (pos[i] === data.length)
        {
            pos[i] = 0;
        }
        rasters.cursor.y = 420 + data[pos[i]].y;
        rasters.next();
    } 
	*/
    // raster.cls();
    // raster.alphaMask('raster', alpha, mask);
    // bfont.draw(raster);
	game.context.clearRect(0, 0, game.width, game.height);

}

function makeRasterFont() {

    bfont = game.make.bitmapData();
    alpha = game.make.bitmapData();
    raster = game.make.bitmapData();

    //  Load the font
    bfont.load('knightHawks');

    //  Extract all the pink pixels into the alpha bmd
    bfont.extract(alpha, 237, 0, 140, 255, true);

    raster.resize(bfont.width, bfont.height);

    //  Display the 4 stages of the process
    // game.add.image(0, 0, 'knightHawks');
    // game.add.image(360, 0, alpha);
    // game.add.image(0, 200, raster);
    // game.add.image(360, 200, bfont);

    //  Tween the rasters
    mask.setTo(0, 0, bfont.width, game.cache.getImage('raster').height);

    game.add.tween(mask).to( { y: -(mask.height - bfont.height) }, 4000, Phaser.Easing.Sinusoidal.InOut, true, 0, 100, true);

}
//audio
function modLoaded(key, data) {

    mods.push(key);
    var buffer = new Uint8Array(data);
    return buffer;

}
//events
function up() {
    console.log('button up', arguments);
}

function over() {
    console.log('button over');
}

function out() {
    console.log('button out');
}

function actionOnClick () {

    background.visible =! background.visible;

}