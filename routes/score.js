/*jshint node: true */
"use strict";

var calculateScore = function (code, move) {
   
   var codeArray = code.slice().map(Number);
   var moveArray = move.slice().map(Number);
   var blackArray = [];
   var whiteArray = [];
   
   //console.log("Code: " + codeArray);
   //console.log("Move: " + moveArray);
   // Table for marking indices, that were already checked during
   // white points calculation.
   var checkedIndices = [];
   var score;

   for(let i=0; i < moveArray.length; ++i){

     var index = codeArray.indexOf(moveArray[i]);
     // Check for black points
     if(moveArray[i] === codeArray[i]){
        blackArray.push(i);
     }
     // Check for white points
     else if(index > -1 && checkedIndices.indexOf(index) < 0){
       whiteArray.push(i);
       checkedIndices.push(index);
     }
   }
   
   score = [blackArray, whiteArray];
   return score;
}

module.exports = calculateScore;

/*
console.log("1,2,3,4 - 1,3,2,4");
console.log(calculateScore([1,2,3,4], [1,3,2,4]));
console.log(calculateScore([1,2,3,4], [6,5,1,3]));

console.log(calculateScore([1,2,3,4], [4,3,2,1]));
console.log(calculateScore([1,2,3,4], [1,2,3,4]));

console.log(calculateScore([2,1,2,3,7], [5,3,2,1,1]));
console.log(calculateScore([2,1,2,3,7], [5,3,2,1,5]));
*/
