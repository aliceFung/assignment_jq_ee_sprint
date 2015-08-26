$(document).ready(function(){

  //listener for text input field

  $('#first_input').keyup(function(){inputLimitDisplay(this, 32)});
  $('#second_input').keyup(function(){inputLimitDisplay(this, 140)});
  $('#password').keyup(function(){inputLimitDisplay(this, 16)});
  $('#password_confirmation')
            .keyup(function(){inputLimitDisplay(this, 16)})
            .keyup(function(){passwordMatching(this)});

  $('input[type=submit]').click(function(){validations()});

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

  var validations = function(){
    //preventDefault()
    input_divs = $('form').children();
    for(var i= 0; i < input_divs.length; i++){
      var child_node = $(input_divs[i].children[0])
      console.log("c_n: " + child_node);
      var c_id = child_node.attr("id"); // string of js obj
      console.log("c_id: " + c_id);
      var child = checkvalidations[c_id];
      console.log(child + " " + !!child);
      if(!!child) {
        console.log("in if statement" + !!child);
        if(child.if_statement()){
        event.preventDefault();
        child.addClass('errors');
        child.parent().append(child.message);
      }
      }
    } //for loop
  };

  var checkvalidations = {
    "first_input": {
      field: "#first_input",
      message: "Input must be between 4-32 characters",
      if_statement: function(){
        return ($(this.field).val().length < 4 || $(this.field).val().length > 32);}
    }
  };

});