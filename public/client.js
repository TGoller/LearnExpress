const { eventNames } = require("process");

$(function(){
    $.get('/blocks',appendToList);

    $('form').on('submit', function(event){
        event.preventDefault();
        var form = $(this);
        var blockData = form.serialize();

        $.ajax({
            type:'POST', url: '/blocks', data: blockData
        }).done(function(blockName){
            appendToList([blockName]);
            form.trigger('reset');
        });
    });

    function appendToList(blocks)  {
        var list = [];
        var content,block;
        for(var i in blocks){
            content = '<a href="/blocks/'+block+'">'+block+'</a>';
            list.push($('<li>', { html:content}));
        }
        $('.block-list').append(list);
    }

});