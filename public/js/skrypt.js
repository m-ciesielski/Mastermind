/*jshint jquery: true, devel: true */
$(function () {
    alert('Zacznij grę!');
});

var gameSize;
var gameDim;
var gameMax;

var clearGameArea = function clearGameArea() {
  
  var gameStage = $( "#game_stage" );
  var gameInput = $( "#game_input" ); 
  gameStage.empty();
  gameInput.empty();
};



var newGame = function newGame() {
  clearGameArea();
  var gameStage = $( "#game_stage" );
    
  var size =  $( "#size" ).val();
  var dim =  $( "#dim" ).val();
  var max =  $( "#max" ).val();
        
  var url = "play/size/"+size+"/dim/"+dim+"/max/"+max+"/";
  console.log(url);

  $.ajax({
    url: url,
    context: document.body,
    headers: {
            'Accept': 'application/json',
        },
    success : function(result) {
            console.log(result);
        },
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
        }
  })
  .done(function(resp) {
       gameSize = resp.size;
       gameDim = resp.dim;
       gameMax = resp.max;        
       var gameInput = $( "#game_input" );
       gameInput.append("<label>Twoje kolory: </label>");
       gameInput.append("<div>")
       for (i=0; i<gameSize; i++) {
         gameInput.append("<input type=\"text\" id=\"color"+i+"\"  />");
       }
       gameInput.append("</div>");
       gameInput.append("<div>")
       gameInput.append("<input type=\"button\" id=\"moveButton\" value=\"Wykonaj ruch\"/>");
       gameInput.append("</div>");

       var moveButton = $("#moveButton");
          moveButton.click(function() {
              userMove(); 
       });
    });
  
  return false;
};

var userMove = function userMove () {
  var gameStage = $( "#game_stage" );
  var message = $( "#message" );
    
    var url = "mark/";
    for (i=0; i<gameSize; i++) {
        var color = $("#color" + i).val();
        url += color + "/";
    }
    
    $.ajax({
        url: url,
        context: document.body,
        headers: {
            'Accept': 'application/json',
        },
         success : function(result) {
            console.log(result);
        },
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
        }

    })
    .done(function(resp) {
        if(resp.retMsg === "Wygrałeś!"){
           alert("Wygrana!");
        }        


        var answer = resp.retVal;
        var blackPoints = answer[0];
        var whitePoints = answer[1];
        gameStage.append("<p>");
        
        // czarne
        for (i=0; i<gameSize; i++) {
           if(blackPoints.indexOf(i) > -1)
             gameStage.append(" Czarny: ");
           else if(whitePoints.indexOf(i) > -1)
             gameStage.append(" Biały: ");

           var color = $("#color" + i).val();
           gameStage.append(" " + color + " ");
        }

        gameStage.append("</p>");
    });
};
