$(function () {
    var socket = io.connect("localhost");
    socket.on("connect", function () {
        console.log("connect");
        socket.on("receiveMsg", function (data) {
            console.log("receive data");
            var prevLog = $("#log").html();
            $("#log").html(data + "<br>" + prevLog);
        });
    });
    $("#sendBtn").click(function (e) {
        var text = $("#msgTxt").val();
        socket.emit("sendMsg", text);
        $("#msgTxt").val("");
    });
});
