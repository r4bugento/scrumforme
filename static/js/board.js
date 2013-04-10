$("document").ready(function($){
    
    // var nav = $('.nav-status');
    
    // $(window).scroll(function () {
    //     if ($(this).scrollTop() > 136) {
    //         nav.addClass("fixed-nav");
    //     } else {
    //         nav.removeClass("fixed-nav");
    //     }
    // });

    // livesearch
    $('input[name="livesearch"]').search('.task', function(on) {
        on.reset(function(ui) {
          $('#nothingfound').hide();
          $('.table td').show();
          $('.table ul').show().css("width","100%");
        });

        on.empty(function() {
          $('#nothingfound').show();
          $('.table td').hide();
          $('.table ul').hide().css("width","100%");
        });

        on.results(function(results) {
          $('#nothingfound').hide();
          $('.table td').hide();
          $('.table ul').hide();
          // results.show();
          $(results).closest("td").show();
          $(results).closest("ul").show().css("width","240px");
          // $(".proper-content").append(results);
        });
    });

    $( ".column_task" ).sortable({
            connectWith: ".column_task",
            // placeholder: 'placeholder',
            helper: 'clone',
            delay:25,
            revert:true,
            dropOnEmpty: true,
            forcePlaceHolderSize: true,
            // items: 'li',
            // opacity : 0.6,
            forceHelperSize: true,
            start: function( event, ui ) {
                // var placeholder = $(ui.item).clone().css({opacity:"0.6"});
                // ui.placeholder.html(placeholder);

                var task_id = $(ui.item).closest('.table').attr('data-storyid');
                $('body').data('storyid', task_id);
            },
            stop: function( event, ui ) {
                var old_task_id = $('body').data('storyid');
                    new_task_id = $(ui.item).closest('.table').attr('data-storyid');

                if(new_task_id !== old_task_id) {
                    return false
                }
            },            
            receive: function(event, ui) {
                updateStatus($(ui.item))
            }
    });
});


// update status
function updateStatus(item){
    var task_id = $(item).closest('.task_container').attr('data-taskid'),
        task_status = $(item).closest('.column_task').attr('data-status');
    
    ajax(url.changeAjaxItens+'?task_id='+task_id+'&task_status='+task_status, [''], 'target_ajax');
    statusItem();
}

// check status
function statusItem() {
    var message = $("#target_ajax").text();
    console.log(message)

  if (message.length > 0) {
    if(message === 'True') {
        console.log("status updated!")
   
    } else if(message === 'False') {
        console.log("status updated ERROR!")
    }
    // Clean the return of ajax call
    $("#target_ajax").empty();
    // return message

  } else {
    console.log("waiting for reply...")
    setTimeout(function() {
        statusItem()
    }, 300);
  }
}