const express = require("express");
const { parse } = require('csv-parse');
const fs = require("fs");

const app = express();

// Processes and delivers the bike rack lat/long's to the requesting client 
app.get('/bike-racks', (req, res) => {
  // Inform the server console that the request has been received
  console.log("GET Request at /bike-racks has been received.");
  process.stdout.write("Processing...");
  
  // Declare a variable to skip the column label line
  let skipFirstLine = false;
  
  // Declare an array which will be sent back to the client 
  let bikeRacks = [];
  
  // Read through each line of the csv and insert the serialized data into bikeRacks 
  fs.createReadStream('city-of-seattle-bicycle-racks.csv')
      .pipe(parse({delimiter: ','}))
      .on('data', function(row) {
        // This ensures that the first line (the column labels) is skipped
        if (skipFirstLine == false) {
          skipFirstLine = true;
        } 
        
        // Process every remaining line 
        else {
          // Create current bike object with necessary info 
          let currentBike = {
            lat: row[22],
            long: row[23],
            address: row[8]
          };
        
        // Add to bikeRacks array 
        bikeRacks.push(currentBike);
          
        }
      })
      .on('end', function() {
        // Send finished bikeRacks array back to client 
        res.status(200).json(bikeRacks);
        
        // Write back to console
        process.stdout.write("Done Processing");
      })
});

app.listen(8000, () => {
  console.log("Server listening. Get after it!");
});