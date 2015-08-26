$(document).ready(function(){

  //listener for text input field
  $('#first_input').keyup(function(){charCount(this)});

  var charCount = function(e){
    console.log(e);
    var charNum = e.value.length;
      console.log("e is " + (typeof e));
    if (charNum <=0){
      //if count previously exists, remove
      $(e.siblings().first()).hide();
    } else {
      // charNum
    }
  };

  var
});