$(document).ready(function(){
    var socket = io.connect("http://172.16.60.223:4000");
    var ready = false;

    $("#submit").submit(function(e) {
        e.preventDefault();
        $("#nick").fadeOut();
        $("#chat").fadeIn();
        var name = $("#nickname").val();
        //var idade = $("#idade").val();
        var time = new Date();
        $("#name").html(name);
        // $("#idade").html(idade);
        //$("#time").html('Primeiro login: ' + time.getHours() + ':' + time.getMinutes());
        console.log("nome:"+name + "  data: " + time);
        ready = true;
        socket.emit("join", name);
    });

    $("#textarea").keypress(function(e){
        if(e.which == 13) {
             var text = $("#textarea").val();
             $("#textarea").val('');
             var time = new Date();
             $(".chat").append('<li class="self"><div class="msg"><span>'
                          + $("#nickname").val() + ':</span>    <p>' + text + '</p><time>' + 
                          time.getHours() + ':' + time.getMinutes() + '</time></div></li>');
             socket.emit("send", text);
        }
    });



    socket.on("update", function(msg) {
        if (ready) {
            $('.chat').append('<li class="info">' + msg + '</li>')
        }
    });

    socket.on("chat", function(client,msg) {
        if (ready) {
            var time = new Date();
            $(".chat").append('<li class="other"><div class="msg"><span>' + 
                         client + ':</span><p>' + msg + '</p><time>' + time.getHours() + ':' + 
                         time.getMinutes() + '</time></div></li>');
        }
    });

    



});



