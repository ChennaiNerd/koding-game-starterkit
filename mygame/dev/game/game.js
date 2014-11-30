var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameCanvas', { preload: preload, create: create, update: update });

var characterAnimator;
var isoGroup;
var mainChar;

function preload() {
    game.load.image('tile', 'pylearn/dev/game/assets/tile.png');
    game.load.atlasJSONHash('knight', 'pylearn/dev/game/assets/knight.png', 'pylearn/dev/game/assets/knight.json');

    game.time.advancedTiming = true;
}

function create() {
    // Create a group for our tiles.
    isoGroup = game.add.group();
    mainChar = game.add.isoSprite(0,0,0,'knight',0);
    mainChar.anchor.set(0.5, 0.5);

    mainChar.animations.add('walkN', Phaser.Animation.generateFrameNames('', 0, 11), 30, true);
    mainChar.animations.add('walkW', Phaser.Animation.generateFrameNames('', 12, 23), 30, true);
    mainChar.animations.add('walkE', Phaser.Animation.generateFrameNames('', 24, 35), 30, true);
    mainChar.animations.add('walkS', Phaser.Animation.generateFrameNames('', 36, 47), 30, true);


    // Let's make a load of tiles on a grid.
    spawnTiles();

    mainChar.animations.play('walkN');
    characterAnimator = new CharacterAnimator(game, mainChar);
}

function update() {
    characterAnimator.update();
}

function spawnTiles() {
    var tile;
    for (var xx = 0; xx < 256; xx += 64) {
        for (var yy = 0; yy < 256; yy += 64) {
            // Create a tile using the new game.add.isoSprite factory method at the specified position.
            // The last parameter is the group you want to add it to (just like game.add.sprite)
            tile = game.add.isoSprite(xx, yy, 0, 'tile', 0, isoGroup);
            tile.anchor.set(0.5, 0);
        }
    }
}