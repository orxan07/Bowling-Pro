'use strict'
var assert = require('assert');

function Player(name) {

    this.name = name;
    this.rolls = [];
    this.framesInfo = [];
    this.frameNumber = 1;
    //player has two move per frame but at last frame bonus move is possible.
    this.move = 0;
    this.hasBonusMove = false;
    this.currentPins;
    this.firstPins = 0;
    this.secondPins = 0;
    this.thirdPins = 0;
    this.score = 0;
    this.resultTable='';
}

module.exports = Player;