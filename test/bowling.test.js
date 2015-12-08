'use strict'
var chai = require('chai');
var assert = chai.assert;
var Bowling = require('../src/bowling-pro');

describe('Bowling game test', function () {

    describe('if the game is finished', function () {

        describe('get total score before invoking score()', function () {

            check([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);

            check([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5]);

            check([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10, 5, 5, 5]);

            function check(input) {

                it('should throw an exception!' + 'Checked input is "' + input + '"', function () {
                    assert.throw(function () {
                        var game = play.call(new Bowling(), input);
                        game.print();
                    })
                })
            }
        });

    });

    describe('if input is not a number type', function () {

        check("a");

        check("4");

        check("foo");

        function check(input) {
            it('should throw an exception!' + 'Checked input is "' + input + '"', function () {
                assert.throw(function () {
                    var game = new Bowling();
                    game.roll(input);
                })
            })
        }
    });

    describe('if input is negative number', function () {

        check(-1);

        check(-100);

        function check(input) {
            it('should throw an exception!' + 'Checked input is "' + input + '"', function () {
                assert.throw(function () {
                    var game = new Bowling();
                    game.roll(input);
                })
            })
        }
    });

    describe('if pins are greater than 10', function () {


        check([0, 1, 2, 1, 2, 3, 4, 3, 4, 2, 5, 1, 6, 2, 1, 11, 2, 3, 3, 1]);

        check([11, 3, 2, 4, 1, 2, 5, 4, 0, 9, 1, 7, 3, 2, 7, 2, 5, 4, 1, 1])

        function check(input) {
            it('should throw an exception!' + 'Checked input is "' + input + '"', function () {
                assert.throw(function () {
                    play.call(new Bowling(), input);
                })

            })
        }
    });

    describe('if input is not an integer', function () {

        check(3.1);

        check(4.9);

        check(0.1);

        check(-0.3);

        check(-0.6);

        check(-1.1);

        function check(input) {
            it('should throw an exception!' + 'Checked input is "' + input + '"', function () {
                assert.throw(function () {
                    var game = new Bowling();
                    game.roll(input);
                })
            })
        }
    });

    describe('if total score per frame less than 10', function () {

        before(function () {

            check([1, 3, 2, 4, 1, 2, 5, 4, 0, 9, 1, 7, 3, 2, 7, 2, 5, 4, 1, 1], 64);

            check([1, 3, 2, 4, 1, 2, 5, 4, 0, 0, 1, 7, 3, 2, 7, 2, 5, 4, 0, 1], 54);
        })

        function check(input, expected) {
            it('Input value:"' + input + '". Expected value:' + expected, function () {
                var game = play.call(new Bowling('Mamed'), input);
                assert.equal(game.getScoreByPlayerName('Mamed'), expected);
            })
        }
    });

    describe('if total score per frame greater than 10', function () {

        check([1, 1, 2, 4, 1, 2, 5, 4, 0, 9, 1, 7, 7, 4, 7, 2, 5, 4, 1, 1]);

        check([5, 6, 2, 4, 1, 2, 5, 4, 0, 0, 1, 7, 3, 2, 7, 2, 5, 4, 0, 1]);

        function check(input) {
            it('should throw an exception!' + 'Checked input is "' + input + '"', function () {
                assert.throw(function () {
                    var game = play.call(new Bowling(), input);
                    game.score();
                })
            })
        }
    });

    describe('if all rolls are zeros', function () {

        check([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 0);

        function check(input, expected) {
            it('Input value:"' + input + '". Expected value:' + expected, function () {

                var game = new Bowling('Mamed');
                play(game,input);
                assert.equal(game.getScoreByPlayerName('Mamed'), expected);
            })
        }
    });

    describe('if all rolls are strikes', function () {

        before(function () {
            check([10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], 300);
        })

        function check(input, expected) {
            it('Input value:"' + input + '". Expected value:' + expected, function () {

                var game = play.call(new Bowling(), input);
                assert.equal(game.score(), expected);
            })
        }
    });

    describe('if all rolls are spares', function () {
        before(function () {

                check([5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], 150);

                check([5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10], 155);
            }
        )
        function check(input, expected) {
            it('Input value:"' + input + '". Expected value:' + expected, function () {

                var game = play.call(new Bowling(), input);
                assert.equal(game.score(), expected);
            })
        }
    });

    describe('if the rolls have strikes, spares and simple rolls', function () {


        before(function () {


                check([10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 60);

                check([5, 5, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 13);

                check([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 4], 9);

                //check([10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 60);

                // check([10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 90);

                //check([5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 230);


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

            }
        )
            function check(input, expected) {
                it('Input value:"' + input + '". Expected value:' + expected, function () {

                    var game = play.call(new Bowling(), input);
                    assert.equal(expected, game.score());
                })
            }
    });

    describe('#roll if two players in bowling', function () {

        var game = new Bowling('Azer','Samir');

        before(function () {
            game.roll(5);
            game.roll(5);
            game.roll(5);
            game.roll(5);
        });

        it(' score of both players must be 10', function () {
            var result1 = game.getScoreByPlayerName('Azer');
            var result2 = game.getScoreByPlayerName('Samir');
            assert.equal(result1,10);
            assert.equal(result2,10)
        })
    });

    function play(input) {
        for (var i = 0; i < input.length; i++)
            this.roll(input[i]);
        return this;
    }

});