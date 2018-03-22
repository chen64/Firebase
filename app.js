var config = {
    apiKey: "AIzaSyAtk_9fGaHBZLsujdFui3MsJa10gugN3R0",
    authDomain: "mytrainbase.firebaseapp.com",
    databaseURL: "https://mytrainbase.firebaseio.com",
    projectId: "mytrainbase",
    storageBucket: "",
    messagingSenderId: "697554348208"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

$("#submit-T").on("click", function(event){
    event.preventDefault();

    var trainName = $("#nameInput").val();
    var desti = $("#destination").val();
    var trainT = moment($("#trainTime").val(), "HH:mm").subtract(10, "years").format("X");
    var freeMin = $("#freqMin").val();
    console.log(trainT);
    var newEmp = {
        name: trainName,
        place: desti,
        time: trainT,
        freq: freeMin,
    };

    database.ref().push(newEmp);
    
    $("#nameInput").val("");
    $("#destination").val("");
    $("#trainTime").val("");
    $("#freqMin").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey){

    var trainN = childSnapshot.val().name;
    var placeN = childSnapshot.val().place;
    var timeT = childSnapshot.val().time;
    var freqT = childSnapshot.val().freq;

    var timeDif = moment().diff(moment.unix(timeT), "minutes");
    var remain = moment().diff(moment.unix(timeT), "minutes") % freqT;
    var mins = freqT - remain;
    var nextT = moment().add(mins, "m").format("hh:mm A");

    $("#tableT > tbody").append("<tr><td>" + trainN + "</td><td>" 
                                + placeN + "</td><td>" + freqT + 
                                "</td><td>" + nextT + "</td><td>" + mins + "</td>")
});