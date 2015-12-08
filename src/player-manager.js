'use strict'
var Player = require('./player');
var Frame = require('./frame');
var frameType = require('./roll-status')
var assert = require('assert');
function PlayerManager() {

    this.players = [];
    this.currentPlayer;
    this.frame = new Frame();

}

PlayerManager.prototype.updatePlayerStatus = function (pins) {

    var player = this.currentPlayer;

    player.move++;

    player.rolls.push(pins);

    player.currentPins = pins;

    switch (player.move) {
        case 1:
        {
            player.firstPins = pins;
            player.secondPins = 0;
            break;
        }
        case 2:
        {
            player.secondPins = pins;
            break;
        }
        case 3:
        {
            player.thirdPins = pins;
            break;
        }
    }
};

PlayerManager.prototype.play = function (pins) {

    var player = this.currentPlayer;

    this.updatePlayerStatus(pins);

    this.frame.setPlayer(player).update(this.updatePlayer)

    if (this.isPlayerTermOver())
        this.changePlayerToNext();

};

PlayerManager.prototype.updatePlayer = function (player, rollType) {

    var frameInfo = {
        type: rollType,
        firstPins: player.firstPins,
        secondPins: player.secondPins,
        thirdPins: player.thirdPins
    };
    player.framesInfo.push(frameInfo);
    player.frameNumber++;

    if (player.hasBonusMove)
        player.move = 3;
    else
        player.move = 2;

};

PlayerManager.prototype.getCurrentPlayer = function () {
    return this.currentPlayer;
};

PlayerManager.prototype.getAllPlayers = function () {
    return this.players;
};

PlayerManager.prototype.isPlayerTermOver = function () {
    var player = this.currentPlayer,
        maxMoves = 2;

    if (player.hasBonusMove)
        maxMoves = 3;

    return (this.currentPlayer.move == maxMoves)
}

PlayerManager.prototype.changePlayerToNext = function () {

    var player = this.currentPlayer,
        totalNumberOffPlayers = this.players.length,
        numberOfPlayer = this.players.indexOf(player),
        numberOfNextPlayer = numberOfPlayer + 1;

    player.move = 0;

    if (numberOfNextPlayer === totalNumberOffPlayers)
        numberOfNextPlayer = 0;

    this.currentPlayer = this.players[numberOfNextPlayer]
};

PlayerManager.prototype.getPlayerResultsTable = function (name) {
    var player = this.getPlayerByName(name),
        table = '';

    for (var i in player.framesInfo) {
        var frame = player.framesInfo[i];
        if (i == 9 && player.hasBonusMove)
            table += '(' + frame.firstPins + '/'
                + frame.secondPins + '/'
                + frame.thirdPins + '#'
                + frame.totalScore + ')'
        else if (frame.type === frameType.STRIKE)
            table += '(' + frame.firstPins + '#' + frame.totalScore + ')';
        else if (frame.type === frameType.SPARE)
            table += '(' + frame.firstPins + '/' + frame.secondPins + '#' + frame.totalScore + ')';
        else
            table += '(' + frame.firstPins + '/' + frame.secondPins + '#' + frame.totalScore + ')'
    }

    table = '[' + player.name + '][' + table + '][' + player.score + ']';
    player.resultTable = table;

    return table;
}

PlayerManager.prototype.getTotalResultsTable = function () {
    var table = '';
    this.calculatePlayersScore();
    for (var i in this.players) {
        var player = this.players[i];
        table += this.getPlayerResultsTable(player.name) +'\n';
    }
    return table;
};

PlayerManager.prototype.getScoreByPlayerName = function (name) {
    var player = this.getPlayerByName(name);
    this.calculatePlayerScore(player)
    this.calculatePlayerScore(player);
    return player.score;
}

PlayerManager.prototype.getPlayerByName = function (name) {
    var players = this.players,
        result;
    assert.ok(players.length > 0,'There are no players are created!');

    for (var i in players) {
        if (players[i].name === name)
            result= players[i];
    }

    assert.ok(result!==null,'The player with name '+name+'does not exist!');

    return result;
}

PlayerManager.prototype.createNewPlayers = function (names) {

    for (var i in names) {
        var player = new Player(names[i]);
        this.players.push(player)
    }
    this.currentPlayer = this.players[0];
}

PlayerManager.prototype.calculatePlayersScore = function () {

    for (var i in this.players) {
        var player = this.players[i];
        this.calculatePlayerScore(player)
    }
}

PlayerManager.prototype.calculatePlayerScore = function (player) {

    var bonus = 0;
    var bonusRate = 0;
    player.score = 0;

    for (var i in player.framesInfo) {
        var frame = player.framesInfo[i];
        if (frame.type === frameType.STRIKE) {
            this.addBonusScore(player, frame, bonus, bonusRate);

            player.score += frame.firstPins;
            frame.totalScore = player.score;
            bonus = 2;

            if (bonusRate < 2)
                bonusRate++;
        }
        else if (frame.type === frameType.SPARE) {
            this.addBonusScore(player, frame, bonus, bonusRate);

            player.score += frame.firstPins + frame.secondPins;
            frame.totalScore = player.score;
            bonus = 1;
            bonusRate = 0;
        }
        else {
            this.addBonusScore(player, frame, bonus, bonusRate);

            player.score += frame.firstPins + frame.secondPins + frame.thirdPins;
            frame.totalScore = player.score;
            bonus = 0;
            bonusRate = 0;
        }
    }
}

PlayerManager.prototype.addBonusScore = function (player, frame, bonus, bonusRate) {
    bonusRate = bonusRate || 1;

    if (bonus === 2)
        player.score += frame.firstPins * bonusRate + frame.secondPins
    else if (bonus == 1)
        player.score += frame.firstPins * bonusRate;
}


module.exports = PlayerManager;