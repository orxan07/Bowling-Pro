'use strict'

var chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
var assert = chai.assert;


var PlayerManager = require('../src/player-manager');
var Player = require('../src/player');

describe('Bowling player manager test', function () {


    describe('#createNewPlayers, #getCurrentPlayer and #getAllPlayers if invoke this method', function () {


        describe('if input is one name', function () {

            var playerManager = new PlayerManager();

            before(function () {
                playerManager.createNewPlayers(['Mamed']);
            });

            it('should create the one player', function () {
                var expected = new Player('Mamed');

                var result = playerManager.getCurrentPlayer();

                assert.shallowDeepEqual(result, expected);
            })
        });
        describe('if input is more than one name', function () {

            var playerManager = new PlayerManager();

            before(function () {
                playerManager.createNewPlayers(['Mamed', 'Coni']);
            });

            it('should create the one player', function () {
                var expected = [new Player('Mamed'), new Player('Coni')];


                var result = playerManager.getAllPlayers();

                assert.shallowDeepEqual(result, expected);
            })
        });

    });

    describe('#updatePlayerStatus if invoke this method', function () {

        var playerManager = new PlayerManager();
        playerManager.createNewPlayers(['Mamed']);

        before(function () {
            playerManager.updatePlayerStatus(5);
        });
        it('should change the player status', function () {
            var expected = new Player('Mamed');
            expected.rolls[0] = 5;
            expected.firstPins = 5;
            expected.currentPins = 5;
            expected.move = 1;

            var result = playerManager.getCurrentPlayer();
            assert.shallowDeepEqual(result, expected);
        })
    });

    describe('#updatePlayer if invoke this method', function () {

        var playerManager = new PlayerManager();
        playerManager.createNewPlayers(['Mamed']);
        var player = playerManager.currentPlayer;

        before(function () {
            player.firstPins = 10;
            playerManager.updatePlayer(playerManager.currentPlayer, "STRIKE");
        });
        it('should update frame info  of a current player', function () {
            var expected = new Player('Mamed');
            expected.framesInfo[0] = {
                type: 'STRIKE',
                firstPins: 10,
            };
            expected.frameNumber = 2;
            expected.move = 2;
            expected.firstPins = 10;

            var result = playerManager.getCurrentPlayer();
            assert.shallowDeepEqual(result, expected);
        })
    });

    describe('#changePlayerToNext if invoke this method', function () {

        var playerManager = new PlayerManager();

        before(function () {
            playerManager.createNewPlayers(['Mamed', 'Coni']);
            playerManager.changePlayerToNext();

        });

        it('should change current player to next one', function () {
            var expected = new Player('Coni');

            var result = playerManager.getCurrentPlayer();

            assert.shallowDeepEqual(result, expected);
        })
    });

    describe('#isPlayerTermOver if invoke this method', function () {
        var playerManager = new PlayerManager();

        it("should return true if player move is 2 and he has not bonus roll", function () {
            playerManager.createNewPlayers(["Mamed"]);

            playerManager.currentPlayer.move = 2;
            var expected = true;
            var result = playerManager.isPlayerTermOver();
            assert.equal(result, expected)
        })

        it("should return true if player move is 3 and he have a bonus roll", function () {
            playerManager.createNewPlayers(["Mamed"]);
            var player = playerManager.currentPlayer;
            player.move = 3;
            player.hasBonusMove = true;

            var expected = true;
            var result = playerManager.isPlayerTermOver();
            assert.equal(result, expected)
        })
    })

    describe('#play if invoke this method', function () {
        var playerManager = new PlayerManager();

        before(function () {
            playerManager.createNewPlayers(["Mamed"]);
            playerManager.play(5);
        });
        it('should change the player object',
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

    describe('#calculatePlayersScore if invoke this method', function () {

        check([10, 10, 10], 60);

        check([5, 5, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 13);

        check([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 4], 9);

        check([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 5, 4], 28);

        check([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 4], 24);

        check([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5], 15);

        check([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5], 15);

        check([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5], 30);

        check([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 5, 5, 5], 35);

        check([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10], 60);

        check([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 10, 10, 10], 50);

        check([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 10], 35);

        check([8, 2, 5, 4, 9, 0, 10, 10, 5, 5, 5, 3, 6, 3, 9, 1, 9, 1, 10], 149);


        function check(input, expected) {

            it('Input pins:"' + input + '". Expected value:' + expected, function () {
                var playerManager = new PlayerManager();

                playerManager.createNewPlayers(["Mamed"]);

                for (var i = 0; i < input.length; i++)
                    playerManager.play(input[i]);

                playerManager.calculatePlayersScore();
                var result = playerManager.currentPlayer.score;
                assert.equal(result, expected);
            })
        }

    });
    describe('#getScoreByPlayerName if invoke this method', function () {

        check([10, 10, 10], 60);

        check([5, 5, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 13);

        check([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 4], 9);


        function check(input, expected) {

            it('Input pins:"' + input + '". Expected value:' + expected, function () {
                var playerManager = new PlayerManager();

                playerManager.createNewPlayers(["Mamed"]);

                for (var i = 0; i < input.length; i++)
                    playerManager.play(input[i]);

                var result = playerManager.getScoreByPlayerName('Mamed')

                assert.equal(result, expected);
            })
        }

    })

    describe('#getPlayerByName if invoke this method', function () {
        var playerManager = new PlayerManager();
        playerManager.createNewPlayers(["Mamed", 'Anar', 'Orxan']);

        check('Anar')
        function check(name) {
            it('should find player with name ' + name, function () {
                var player = playerManager.getPlayerByName(name);

                var expected = player.name;

                assert.equal(name, expected);
            })
        }
    })

    describe('#getPlayerResultsTable if invoke this method', function () {
        var playerManager = new PlayerManager();

        playerManager.createNewPlayers(["Mamed"]);
        playerManager.play(10);
        playerManager.play(10);
        playerManager.calculatePlayersScore();

        it('should return result table', function () {
            var result = playerManager.getPlayerResultsTable('Mamed')
            var expected = '[Mamed][(10#10)(10#30)][30]'
            assert.equal(result, expected)
        })
    })

    describe('#getTotalResultsTable if invoke this method', function () {
        var playerManager = new PlayerManager();

        playerManager.createNewPlayers(["Mamed", "Orxan"]);
        playerManager.play(10);
        playerManager.play(10);
        playerManager.play(10);
        playerManager.play(10);
        playerManager.calculatePlayersScore();

        it('should return total result table for all players', function () {
            var result = playerManager.getTotalResultsTable();
            var expected = '[Mamed][(10#10)(10#30)][30]' + '\n' + '[Orxan][(10#10)(10#30)][30]\n';
            assert.equal(result, expected)
        })
    })

});



