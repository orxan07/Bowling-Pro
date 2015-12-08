'use strict'

var assert = require('assert');
var PlayerManager = require('./player-manager');

function Game(playerNames) {

    this.playerManager;
    //initialization
    (function (playerNames) {
        this.playerManager = new PlayerManager();
        this.playerManager.createNewPlayers(playerNames);
    }).call(this, arguments)
}

Game.prototype.roll = function (pins) {

    assert.ok(pins - Math.round(pins) === 0, 'Input value must be an integer number')
    assert.ok(typeof pins === 'number', 'Type of input value must be a non negative number');
    assert.ok(pins >= 0, 'The pins could not be a negative!');
    assert.ok(pins <= 10, 'The pins could not be greater than 10!');

    this.playerManager.play(pins);

};

Game.prototype.print = function () {
    var result = this.playerManager.getTotalResultsTable();
    return result;
};

Game.prototype.printByPlayerName = function (name) {
    var result = this.playerManager.getPlayerResultsTable(name);
    return result;
}

Game.prototype.getScoreByPlayerName = function (name) {
    var result = this.playerManager.getScoreByPlayerName(name);
    return result;
};

module.exports = Game;
