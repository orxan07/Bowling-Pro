'use strict'

var chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
var assert = chai.assert;
var frameType = require('../src/roll-status');
var PlayerManager = require('../src/player-manager');


var Player = require('../src/player');
var Frame = require('../src/frame');

describe('Bowling frame object test', function () {

    describe('#setPlayer', function () {

        var player = new Player("Mamed");
        var frame = new Frame();

        before(function () {
            frame.setPlayer(player)
        });

        it('should set the player', function () {
            var result = frame.player
            var expected = new Player("Mamed");
            assert.shallowDeepEqual(result, expected);
        })
    });

    describe('#updateFrameType if invoke this method ', function () {

        var player = new Player("Mamed");
        var frame = new Frame();

        before(function () {
            player.firstPins = 10;
            player.move = 1;
            frame.setPlayer(player).updateFrameType();
        });

        it('should update type of frame to STRIKE', function () {
            var result = frame.type;
            var expected = frameType.STRIKE;
            assert.equal(result, expected);
        })
    });

    describe('#isSpare if invoke this method', function () {

        var frame = new Frame();

        check(5, 5, true);
        check(0, 10, true);
        check(1, 9, true);
        check(4, 1, false);

        function check(firstPins, secondPins, expected) {
            it('should return ' + expected
                + ' when player first pins is ' + firstPins
                + ' and second is equal to' + secondPins,
                function () {
                    var result = frame.isSpare(firstPins, secondPins)

                    assert.equal(result, expected);
                });
        }
    });

    describe('#isStrike if invoke this method', function () {

        var frame = new Frame();

        check(0, false);
        check(5, false);
        check(10, true);

        function check(firstPins, expected) {
            it('should return ' + expected
                + ' when player pins is equal to ' + firstPins,
                function () {
                    var result = frame.isStrike(firstPins)

                    assert.equal(result, expected);
                });
        }
    });

    describe('#isFirstMove if invoke this method', function () {

        var frame = new Frame();

        check(1, true);
        check(2, false);

        function check(move, expected) {
            it('should return ' + expected
                + ' when player move is equal to ' + move,
                function () {
                    var result = frame.isFirstMove(move)

                    assert.equal(result, expected);
                });
        }
    });
    describe('#isSecondtMove if invoke this method', function () {

        var frame = new Frame();

        check(3, false);
        check(2, true);

        function check(move, expected) {
            it('should return ' + expected
                + ' when player move is equal to ' + move,
                function () {
                    var result = frame.isSecondMove(move)

                    assert.equal(result, expected);
                });
        }
    });

    describe('#isThirdtMove if invoke this method', function () {

        var frame = new Frame();

        check(3, true);
        check(2, false);

        function check(move, expected) {
            it('should return ' + expected
                + ' when player move is equal to ' + move,
                function () {
                    var result = frame.isThirdMove(move)

                    assert.equal(result, expected);
                });
        }
    });

    describe('#isBonusRoll if invoke this method', function () {

        var frame = new Frame();

        check(1,2, false);
        check(10,5, true);
        check(5,5, true);
        check(5,10, true);

        function check(firsPins,secondPins, expected) {
            it('should return ' + expected
                +' when first pins is equal to  '+firsPins
                + ' and second is '+secondPins,
                function () {
                    var player = new Player("Mamed");
                    player.firstPins = firsPins;
                    player.secondPins = secondPins;

                    frame.setPlayer(player);

                    var result = frame.isBonusRoll();

                    assert.equal(result, expected);
                });
        }
    });

    describe('#isLastFrame if invoke this method', function () {

        var frame = new Frame();

        check(10, true);
        check(9, false);

        function check(frameNumber, expected) {
            it('should return ' + expected
                + ' when player frame number is equal to ' + frameNumber,
                function () {

                    frame.frameNumber =frameNumber;
                    var result = frame.isLastFrame();

                    assert.equal(result, expected);
                });
        }
    });

    describe('#update if invoke this method', function () {

        var frame = new Frame();
        var playerManager = new PlayerManager();
        var player = new Player();
        playerManager.createNewPlayers(new Player("Mamed"));
        playerManager.play(5);
        frame.setPlayer(playerManager.currentPlayer).update(playerManager.updatePlayer);


        it('should update the player',
            function () {
                var result = playerManager.getCurrentPlayer();
                var player = new Player("Mamed");
                player.firstPins = 5;
                player.currentPins = 5;
                player.move++;
                var expected = player;
                assert.shallowDeepEqual(result, expected);
            });
    })



});



