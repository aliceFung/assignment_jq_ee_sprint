$(document).ready(function(){

  //listener for text input field

  $('#first_input').keyup(function(){inputLimitDisplay(this, 32)});
  $('#second_input').keyup(function(){inputLimitDisplay(this, 140)});
  $('#password').keyup(function(){inputLimitDisplay(this, 16)});
  $('#password_confirmation')
            .keyup(function(){inputLimitDisplay(this, 16)})
            .keyup(function(){passwordMatching(this)});

  $('li').hover(function(){ $(this).addClass("hover");},
                 function(){ $(this).removeClass("hover");}
                 );

  $('input[type=submit]').click(function(){validations()});

  $('.drop-down').hover(
    function() {slideDownAll(this);},
    function() {slideUpAll(this);}
    );

  var slideDownAll = function(parent) {

    for (var i = 1; i < parent.children.length; i++) {
      $(parent.children[i]).slideDown(1000);
    }
  }

  var slideUpAll = function(parent) {
    for (var i = 1; i < parent.children.length; i++) {
      $(parent.children[i]).slideUp(1000);
    }
  }


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
    for(var i = 0; i < input_divs.length; i++){
      var child_node = $(input_divs[i].children[0]);
      var c_id = child_node.attr("id"); // string of js obj
      console.log(c_id);
      var child = checkvalidations[c_id];
      console.log(child);
      // console.log(child + " " + child.if_statement());
      console.log(child);
      console.log(child.if_statement);
      if(child && child.if_statement()) {
        event.preventDefault();
        child_node.addClass('errors');
        child_node.parent().append(child.message);
      }
    } //for loop
  };

  var checkvalidations = {
    "first_input": {
      field: "#first_input",
      message: "Input must be between 4-32 characters",
      if_statement: function(){ return ($(this.field).val().length < 4 || $(this.field).val().length > 32);}
    },
    "second_input": {
      field: "#second_input",
      message: "Input must be between 4-140 characters",
      if_statement: function(){ return ($(this.field).val().length < 4 || $(this.field).val().length > 140);}
    },
    "password": {
      field: "#password",
      message: "Input must be between 6-16 characters",
      if_statement: function(){ return ($(this.field).val().length < 6 || $(this.field).val().length > 16);}
    },
    "password_confirmation": {
      field: "#password_confirmation",
      message: "Passwords do not match",
      if_statement: function(){ return !($(this.field).val() === $("#password").val());}
    }
  };

});