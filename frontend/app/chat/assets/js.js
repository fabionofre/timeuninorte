$(document).ready(function(){
    let socket = io.connect("http://172.16.60.223:3000");
    let ready = false;

    $("#submit").submit(function(e) {
        e.preventDefault();
        $("#nick").fadeOut();
        $("#chat").fadeIn();
        let name = $("#nickname").val();
        let time = new Date();
        $("#name").html(name);
        //$("#time").html('Primeiro login: ' + time.getHours() + ':' + time.getMinutes());
        console.log("Nome: " + name + "  data: " + time);
        ready = true;
        socket.emit("join", name);
    });

    $("#textarea").keypress(function(e){
        if(e.which == 13) {
             let text = $("#textarea").val();
             $("#textarea").val('');
             let time = new Date();
             $(".chat").append('<li class="self"><div class="msg"><span style="font-size:12px">'
                          + $("#nickname").val() + ':</span>    <p style="font-size:16px">' + text + '</p><time>' + 
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
            let time = new Date();
            $(".chat").append('<li class="other"><div class="msg"><span style="font-size:12px">' + 
                         client + ':</span><p style="font-size:16px">' + msg + '</p><time>' + time.getHours() + ':' + 
                         time.getMinutes() + '</time></div></li>');
        }
    });
});



