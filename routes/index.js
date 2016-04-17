/*jshint node: true */
// poniżej użylismy krótszej (niż na wykładzie) formy
// module.exports ==> exports

var calculateScore = require('./score.js');

exports.index = function (req, res) {
    req.session.puzzle = req.session.puzzle || req.app.get('puzzle');
    res.render('index', {
        title: 'Mastermind'
    });
};

exports.play = function (req, res) {
    var newGame = function () {
        var i, data = [],
            puzzle = req.session.puzzle;
        for (i = 0; i < puzzle.size; i += 1) {
            data.push(Math.floor(Math.random() * puzzle.dim));
        }
        req.session.puzzle.data = data;
        if(req.session.puzzle.size <= 0) {
            return {
                "retMsg": "Błąd - podaj rozmiar większy od zera."
            };
        }
        else {
            return {
                "retMsg": "OK",
                "size": puzzle.size,
                "dim":  puzzle.dim,
                "max": puzzle.max
            };
       }
    };
    // poniższa linijka jest zbędna (przy założeniu, że
    // play zawsze używany będzie po index) – w końcowym
    // rozwiązaniu można ją usunąć.
    req.session.puzzle = req.session.puzzle || req.app.get('puzzle');
    /*
     * req.params[2] === wartość size
     * req.params[4] === wartość dim
     * req.params[6] === wartość max
     */
    if (req.params[2]) {
        req.session.puzzle.size = req.params[2];
    }
    if (req.params[4]) {
        req.session.puzzle.dim = req.params[4];
    }
    if (req.params[6]) {
        req.session.puzzle.max = req.params[6];
    }


    res.json(newGame());
};

exports.mark = function (req, res) {
    var markAnswer = function () {
    var move = req.params[0].split('/');
    move = move.slice(0, move.length - 1);
    var puzzle = req.session.puzzle.data;
    console.log(move);
    //console.log(puzzle);    

    var retMsg;
    
    var score = calculateScore(puzzle, move);
    var blackPoints = score[0];
    var whitePoints = score[1];
    if(blackPoints.length == puzzle.length){
      retMsg = "Wygrałeś!";
    }
    else {
      retMsg = "Próbuj dalej!";
    }

      return {
         "retVal": score,
         "retMsg": retMsg
      };
    };

    res.json(markAnswer());
};
