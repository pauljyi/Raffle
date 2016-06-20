$(document).ready(function() {
  popover();  //initialize popover error messages
  var pool = []

  //// name submit ////
  $('#nameSubmit').click(function() {
    event.preventDefault();
    var name = $('#nameInput').val();
    if (name != '') {
      if ($.inArray(name, pool) == -1) {
        $('.area').prepend('<div class="inline"><li>' + name + '</li></div>');
        pool.push(name);
        clearAndFocus();
      } else {
        // name taken //
        clearAndFocus();
        $('#nameInput').data('bs.popover').options.content = 'Name is already taken';

        popToggle();
      };
    } else {
      // no name //
      clearAndFocus();
      $('#nameInput').data('bs.popover').options.content = "Name can't be blank";
      popToggle();
    };
  })

  //// reset ////
  $('#reset').click(function() {
    $('li').remove();
    clearAndFocus()
    pool = []
    $('#draw').prop('disabled', false);
  })

  //// draw winner ////
  $('#draw').click(function() {
    var rando;
    var win;
    rando = Math.floor(Math.random()*pool.length);
    win = pool[rando];
    winner = $("li:contains(" + win + ")");
    winner.append('<span class="inline highlight"> WINNER</span>');
    pool.splice(rando, 1);
    if (pool.length == 0) {
      $('#draw').prop('disabled', true);
    }
  })

  //// functions for DRY  ////
  function clearAndFocus() {
    $('#nameInput').val('');
    $('#nameInput').focus();
  }

  function popover() {
    $('#nameInput').popover({
      placement: "top",
      trigger: "manual"
    });
  }

  function popToggle() {
    $('#nameInput').popover("toggle");
    setTimeout(function(){ $('#nameInput').popover("toggle"); }, 2000);
  }
})
