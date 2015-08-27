$(document).ready(function(){


  // Photo tagging

  $('img').hover(function(){createTaggingBox();}, function(){destroyTaggingBox();});
  $('img').on('click', function(e){dropDownMenu(e);});

  var dropDownMenu = function(e){
    e.stopPropagation();
    // menu created
    var list = "<ul id='dropdownmenu'><li></li><li class='hidden'>Ma</li><li class='hidden'>Pa</li> <li class='hidden'>kid</li></ul>";
    $('#tag-box').parent().prepend(list);
    $('#dropdownmenu').css({
       left:  e.pageX,
       top:   e.pageY + 75});
    //slidedowna
    slideDownAll($('#dropdownmenu')[0]);
  };

  //remove image tag menu
  $(document).click(function(){$('#dropdownmenu')[0].remove();});

  var tagPicture = function(){
    $('#tag-box').addClass("tagged-picture").attr('id', '').css({
      left: e.pageX - 75,
      top: e.pageY - 75
    });

  };

  var createTaggingBox = function() {
    //create div
    //set dimensions
    //give border
    //follow mouse

    var $div = $("<div>", {id: "tag-box", class: "tag-box"})[0];
    $('#tag-box').first().remove();
    $('img').parent().prepend($div);
    $(document).on('mousemove', function(e){
      $('#tag-box').css({
         left:  e.pageX - 75,
         top:   e.pageY - 75
    });
  });
};
  var destroyTaggingBox = function() {
    $('#tag-box').first().remove();
  };


  //listener for text input field

  $('#first_input').keyup(function(){inputLimitDisplay(this, 32)});
  $('#second_input').keyup(function(){inputLimitDisplay(this, 140)});
  $('#password').keyup(function(){inputLimitDisplay(this, 16)});
  $('#password_confirmation')
            .keyup(function(){inputLimitDisplay(this, 16)})
            .keyup(function(){passwordMatching(this)});

  $('input[type=submit]').click(function(){validations()});

  $('.drop-down').mouseleave(
    function() {slideUpAll(this);}
    );

  $('#drop-down-first').mouseenter(function()
          { slideDownAll( $('.drop-down')[0]) } );

  $('li').hover(function(){ $(this).addClass("hover");},
                 function(){ $(this).removeClass("hover");}
                 );

  $('li').click(function(){swapSelection(this)});

  var swapSelection = function(element){
    $('ul').children().first().text($(element).text());
    // $('.drop-down').off("hover");
    slideUpAll($('.drop-down')[0]);
  }

  var slideDownAll = function(parent) {
    console.log(parent);
    for (var i = 1; i < parent.children.length; i++) {
      $(parent.children[i]).slideDown(500);
      $(parent.children[i]).removeClass('hidden');
    }
  };

  var slideUpAll = function(parent) {
    for (var i = 1; i < parent.children.length; i++) {
      $(parent.children[i]).slideUp(500);
      // $(parent.children[i]).addClass('hidden');
    }
  };


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
    input_divs = $('form').children();
    for(var i = 0; i < input_divs.length; i++){
      var child_node = $(input_divs[i].children[0]);
      var c_id = child_node.attr("id"); // string of js obj
      var child = checkvalidations[c_id];

      if(child && child.if_statement()) {
        event.preventDefault();
        child_node.addClass('errors');
        child_node.parent().append(child.message);
      }
    }; //for loop
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