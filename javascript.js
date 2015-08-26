$(document).ready(function(){

  //listener for text input field

  $('#first_input').keyup(function(){inputLimitDisplay(this, 32)});
  $('#second_input').keyup(function(){inputLimitDisplay(this, 140)});
  $('#password').keyup(function(){inputLimitDisplay(this, 16)});
  $('#password_confirmation')
            .keyup(function(){inputLimitDisplay(this, 16)})
            .keyup(function(){passwordMatching(this)});

  $('input[type=submit]').click(function(){validations(this)});

  var inputLimitDisplay = function(e, maxChar){
    e = $(e);
    var charNum = e.val().length;
    var charRemain = maxChar - charNum;
    var spanID = e.attr("id") + "limit";
    if (charNum <=0){
      //if count previously exists, remove
      $("#" + spanID).remove();
    } else {
      // charNum
      if($("#" + spanID).length === 0) {
        //it doesn't exist
        e.parent().append("<span id='" + spanID + "'>" + charRemain + " characters remaining</span>");
      }
      else {
        $("#" + spanID).text(charRemain + " characters remaining");
      }
    }
  };

  var passwordMatching = function(e){
    password = $('#password').val();
    confirm_input = $(e).val();
    if (password !== confirm_input && confirm_input.length >=1){
      if($('#password_not_match').length === 0){
        $(e).parent().append("<span id='password_not_match'>Passwords Don't Match</span>");
      }
    } else {
      $('#password_not_match').remove();
    }
  };

  var validations = function(e){
    //preventDefault()
    console.log('in validations');
    if($('#first_input').val().length < 4 ||
        $('#first_input').val().length > 32) {
      console.log("in if");
      event.preventDefault();
      $('#first_input').addClass('errors');
      $('#first_input').parent().append('<span class="errors">Input must be between 4-32 characters</span>');
    };
  };

  var validationRules = {
    field = "first_input";
    message = "Input must be between 4-32 characters";
    rule = function()
  }
});

First psuedocode, then write in JavaScript, a function to find the first nonrepeated character in a string. Return
null if all the characters repeat.

Think about time complexity. What would happen if you passed your function a whole paragraph of text?

firstNonRepeatedChar("total");
//=> "o"

firstNonRepeatedChar("teeter");
//=> "r"

firstNonRepeatedChar("deed");
//=> null

//For each character
//If not in ineligible
//If in parsed false

var repeatedChar = function(text) {
  var eligible = [];
  var ineligible = [];
  for (var i = 0; i < text.length, i++) {
    if (!inelible.include(text[i])) {
      if (eligible.include(text[i])) {
        ineligible.push(eligible.splice(eligible.indexOf(text[i])));
      }
      else {
        eligible.push(text[i]);
      };
    };
  };
  if (eligible.length === 0) {
    return null;
  }
  else {
    return elibible[0];
  }
}