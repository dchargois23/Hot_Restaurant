// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
var  =[
  {
    customerID: "i",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  },
  {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  },
  {
    routeName: "obiwankenobi",
    name: "Obi Wan Kenobi",
    role: "Jedi Master",
    age: 55,
    forcePoints: 1350
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/make", function (req, res) {
  res.sendFile(path.join(__dirname, "make.html"));
});

app.get("/view", function (req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

// Displays all characters
app.get("/api/waitlist", function (req, res) {
  return res.json(characters);
});

// Displays a single character, or returns false
app.get("/api/waitlist/:character", function (req, res) {
  var chosen = req.params.character;

  console.log(chosen);

  for (var i = 0; i < tables.length; i++) {
    if (chosen === tables[i].routeName) {
      return res.json(tables[i]);
    }
  }

  return res.json("Tables are not availible");
});

// Create New Characters - takes in JSON input
app.post("/api/characters", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newCharacter = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newCharacter);

  characters.push(newCharacter);

  res.json(newCharacter);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});



// In this code below we create the Front-end JavaScript which "POSTS" our form data to our express server.
    // In essence, when the user hits submit, jQuery grabs all of the fields then sends a post request to our api
    // Our api recognizes the route (/api/tables)... and then runs the associated code (found in api-routes.js).
    // In this case the associated code "saves" the data to the table-data.js file or waitinglist-data.js file

    $(".submit").on("click", function(event) {
      event.preventDefault();
  
      // Here we grab the form elements
      var newReservation = {
      customerName: $("#reserve-name").val().trim(),
      phoneNumber: $("#reserve-phone").val().trim(),
      customerEmail: $("#reserve-email").val().trim(),
      customerID: $("#reserve-unique-id").val().trim()
      };
  
      console.log(newReservation);
  
      // This line is the magic. It"s very similae object we want to send, then we have a "callback".
      // The callback is the response of the server. In our case, we set up code in api-routes that "returns" true or
      false
      // depending on if a tables is available or nor to the standard ajax function we used.
      // Essentially we give it a URL, we give it tht.
  
      $.post("/api/tables", newReservation,
      function(data) {
  
      // If a table is available... tell user they are booked.
      if (data) {
      alert("Yay! You are officially booked!");
      }
  
      // If a table is available... tell user they on the waiting list.
      else {
      alert("Sorry you are on the wait list");
      }
  
      // Clear the form when submitting
      $("#reserve-name").val("");
      $("#reserve-phone").val("");
      $("#reserve-email").val("");
      $("#reserve-unique-id").val("");
  
      });