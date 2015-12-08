'use strict'
var frameType = require('./roll-status');
var assert = require('assert');

function Frame() {
    this.player;
    this.frameNumber = 1;
    this.type = frameType.SIMPLE
}


Frame.prototype.updateFrameType = function () {

    var player = this.player,
        firstPins = player.firstPins,
        secondPins = player.secondPins,
        move = player.move;

    if (this.isFirstMove(move) && this.isStrike(firstPins))
        this.type = frameType.STRIKE;
    else if (this.isSecondMove(move) && this.isSpare(firstPins, secondPins))
        this.type = frameType.SPARE;
    else
        this.type = frameType.SIMPLE;

}

Frame.prototype.update = function (updatePlayer) {

    var player = this.player,
        move = player.move;

    this.frameNumber = player.frameNumber;

    assert.ok(this.frameNumber < 11, 'The game is over');

    updatePlayer = updatePlayer.bind(this, player);

    this.updateFrameType();

    if (this.isLastFrame())
        this.finalUpdate(updatePlayer);
    else if (this.type == frameType.STRIKE)
        updatePlayer(frameType.STRIKE);
    else if (this.type == frameType.SPARE)
        updatePlayer(frameType.SPARE);
    else if (this.isSecondMove(move))
        updatePlayer(frameType.SIMPLE);
};

Frame.prototype.finalUpdate = function (updatePlayer) {
    var player = this.player,
        move = player.move;

    if (this.isThirdMove(move))
        updatePlayer(frameType.SIMPLE);
    else if (this.isBonusRoll())
        this.player.hasBonusMove = true;
    else if (this.isSecondMove(move))
        updatePlayer(frameType.SIMPLE)

}

Frame.prototype.setPlayer = function (player) {
    this.player = player;
    return this;
}

Frame.prototype.isSpare = function (firstPins, secondPins) {
    return (firstPins + secondPins === 10)
};

Frame.prototype.isStrike = function (firstPins) {
    return (firstPins === 10)
};

Frame.prototype.isFirstMove = function (move) {
    return (move === 1)
};

Frame.prototype.isSecondMove = function (move) {
    return (move === 2)
};

Frame.prototype.isThirdMove = function (move) {
    return (move === 3)
};

Frame.prototype.isBonusRoll = function () {
    var player = this.player;

    if (this.isStrike(player.firstPins))
        return true;

    return this.isStrike(player.secondPins) || this.isSpare(player.firstPins, player.secondPins);
};

Frame.prototype.isLastFrame = function () {
    return (this.frameNumber === 10);
}


module.exports = Frame;