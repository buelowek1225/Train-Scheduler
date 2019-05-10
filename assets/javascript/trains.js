// Set up Firebase
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB0gBrdf_ZO_4jNol3j2eas01PXLk_q4Y0",
    authDomain: "train-schedule-d6cde.firebaseapp.com",
    databaseURL: "https://train-schedule-d6cde.firebaseio.com",
    projectId: "train-schedule-d6cde",
    storageBucket: "train-schedule-d6cde.appspot.com",
    messagingSenderId: "344434544445",
    appId: "1:344434544445:web:0ece80821673df4d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
//Assign var for database
var database = firebase.database();

// set up variables
var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = "";

// on click update what is stored in firebase
$("#click-button").on("click", function(event) {
    // prevent the page from refreshing
    event.preventDefault();

    // set variables = to the id of the div class and give me the value and delete the white space
    trainName = $("#trainNameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstTrain = $("#firstTrainInput").val().trim();
    frequency = $("#frequencyInput").val().trim();

    // moment.js code:

    // First Time To Avoid Time Zone Confusion we will push our start time back 1 year to verify it comes before current time.
    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");

    // logging Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");

    // Time apart (remainder)
    var timeRemainder = diffTime % frequency;

    // Minute Until Train
    var minutesTillTrain = frequency - timeRemainder;

    // Next Train
    var nextTrain = moment().add(minutesTillTrain, "minutes");


    // change/update what is saved in firebase property=varibale
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        minutesTillTrain: minutesTillTrain,
        nextTrain: moment(nextTrain).format("HH:mm")
    });
});
// changes to the database will be printed to the console
database.ref().on("child_added", function(snapshot){


    var trainName = snapshot.val().trainName;
    var destination = snapshot.val().destination;
    // var firstTrain = snapshot.val().firstTrain;
    var frequency = snapshot.val().frequency;
    var minutesTillTrain = snapshot.val().minutesTillTrain;
    var nextTrain = snapshot.val().nextTrain;


    var markup = "<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + minutesTillTrain + "</td></tr>";
    $("table tbody").append(markup);


})


// --------------------------------------------------------------

//Initialize Moment.js
//Use momement.js to update 'Next Arrival' 'Minutes Away'

// Prints the current day and time in this particular format.
// console.log(moment().format("DD/MM/YY hh:mm A"));