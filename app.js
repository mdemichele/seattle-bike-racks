const express         = require("express");
const { parse }       = require('csv-parse');
const fs              = require("fs");
const bodyParser      = require('body-parser');
const axios           = require('axios');
const cors            = require('cors');
const mongoose        = require('mongoose');

require("dotenv").config();

const app = express();

const port = process.env.PORT || 8000;

// Connect to database 
//mongoose.connect('mongodb://localhost:27017/bikes', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

//db.once("open", () => {
  //console.log("Successfully connected to MongoDB using Mongoose!");
//});

// Models 
const User = require('./models/user-model');

app.use(bodyParser.json());
app.use(cors());

// Position Stack access key 
const accessKey = process.env.ACCESS_KEY;

// Processes and delivers the bike rack lat/long's to the requesting client 
app.get('/bike-racks', (req, res) => {
  // Inform the server console that the request has been received
  console.log("GET Request at /bike-racks has been received.");
  console.log("Processing...");
  
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
        console.log("Done Processing");
      })
});


// Receives a specific address and delivers back the lat/long 
app.post('/forward-geocode', async (req, res) => {
  // Save address as a local variable 
  let address = req.body.address;
  
  // Request Geocode data from positionStack API 
  const response = await axios.get(`hhttps://us1.locationiq.com/v1/search.php?key=${accessKey}&q=${address}&format=json`);
  
  const geoData = {
    lat: response.data[0].lat,
    lon: response.data[0].lon
  };
  
  await res.status(200).json(geoData);
  
});


// Receives a lat and long and delivers a url of a map 
app.post('/microservice', async (req, res) => {
  let lat = req.body.lat;
  let long = req.body.long;
  
  let url = `localhost:3000/microservice/map/${lat}&${long}`;

  res.status(200).json({ url: url });
});


// Receives information for add new bike rack form 
app.post("/add-new-bike-rack", (req, res) => {
  let address = req.body.address;
  let latitude = req.body.latitude;
  let longitude = req.body.longitude;
  
  let bikeString = `${address}, ${latitude}, ${longitude}\n`;
  
  fs.appendFileSync('new-bike-racks.csv', bikeString, function (err) {
    if (err) return console.log(err);
  });
  
  res.status(200).json({message: "Added bike rack"});
});


// Calls carlos' microservice 
app.get('/get-graph', async (req, res) => {
  // Declare a variable to skip the column label line
  let skipFirstLine = false;
  
  // All the neighborhoods in Seattle 
  let bikeNeighborhoods = {
    broadview: 0,
    northgate: 0,
    lakeCity: 0,
    greenwood: 0,
    wedgwood: 0,
    ballard: 0,
    phinneyRidge: 0,
    roosevelt: 0,
    universityDistrict: 0,
    ravenna: 0,
    viewRidge: 0,
    fremont: 0,
    wallingford: 0,
    magnolia: 0,
    interbay: 0,
    queenAnne: 0,
    lowerQueenAnne: 0,
    eastlake: 0,
    montlake: 0,
    madisonPark: 0,
    southLakeUnion: 0,
    capitolHill: 0,
    madrona: 0,
    belltown: 0,
    downtown: 0,
    firstHill: 0,
    centralDistrict: 0,
    leschi: 0,
    pioneerSquare: 0,
    Chinatown: 0,
    sodo: 0,
    beaconHill: 0,
    mountBaker: 0,
    westSeattle: 0,
    delridge: 0,
    columbiaCity: 0,
    sewardPark: 0,
    southPark: 0,
    GeorgeTown: 0,
    rainierValley: 0
  }
  let neighborhoodKeys = Object.keys(bikeNeighborhoods);
  
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
          // Choose a random neighborhood and increment its bike count 
          let currentIndex = parseInt(Math.random() * neighborhoodKeys.length);
          bikeNeighborhoods[neighborhoodKeys[currentIndex]] += 1;  
        }
      })
      .on('end', async function() {
        
        // Populate Keys 
        const keys = Object.keys(bikeNeighborhoods);

        // Populate Values 
        const vals = []
        for (let i = 0; i < keys.length; i++) {
          vals.push(bikeNeighborhoods[keys[i]]);
        }

        // Create template 
        const template = {
          config: {
            type: 'bar',
            data: {
              labels: keys,
              datasets: [
                {
                  data: vals
                },
              ],
            },
            options: {
              legend: { display: false },
              title: { display: true, text: 'Bike Racks By Neighborhood' },
            }
          },
          width: 320,
          height: 240
        }
        
        const path = 'http://localhost:5000/generateGraph';
        
        const response = await axios({
          method: 'post',
          url: path, 
          data: template,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        const val = await response.data;
        
        res.status(200).json({url: val.graph_url });
      });
});


// Register method 
app.use('/register', async (req, res) => {
  console.log(req.body);
  
  const username = req.body.username;
  const password = req.body.password;
  
  // Add user to the database if they don't already exist 
  const query = await User.findOne({ username: username }).exec(); 
  
  if (query == null) {
    console.log("query was null ")
    
    const user = new User({ 
      username: username, 
    });
    
    salt = await user.makeSalt();
    encryptedPassword = await user.encryptPassword(password, salt);
    
    user.hashed_password = encryptedPassword;
    
    user.save();
    
    console.log("Saved");
    console.log(user.id);
    
    res.send({
      token: user.id,
    });
  }
  
  // If user does already exist, return an error message 
  else {
    res.send({
      token: null,
      message: "Error. User already exists"
    });
  }
  
});


// Login Method 
app.post('/login', async (req, res) => {
  console.log(req.body);
  
  const username = req.body.username;
  const password = req.body.password;
  
  // Retrieve user from database if it exists 
  const user = await User.findOne({ username: username }).exec();
  
  if (user) {
    console.log("Found User");
    // Check password 
    const correctPassword = true;
    
    // If password is correct, return token 
    if (correctPassword) {
      console.log("Correct Password");
      console.log(user.id);
      res.send({
        token: user.id,
      });
    } 
    // If password is incorrect, return error message 
    else {
      res.send({
        token: null,
        message: "Error. Incorrect Username or Password",
      })
    }
  } 
  // If user doesn't exist, return and error 
  else {
    res.send({
      token: null,
      message: "Error. Incorrect Username or Password",
    })
  }
  
});


// Get user information
app.post('/user', async (req, res) => {
  console.log("Get user information");
  const userId = req.body.userId;
  const user = await User.findById(userId).exec();
  
  res.send(user);
  
});


// Add bike rack 
app.post('/add-favorite', async (req, res) => {
  const userId = req.body.userId;
  const address = req.body.address;
  
  // Add address to user instance
  const user = await User.findById(userId).exec();
  user.bikes.push(address);
  user.save()
  
  res.send(user);
  
});


// Delete bike rack 
app.post('/delete-favorite', async (req, res) => {
  const userId = req.body.userId;
  const address = req.body.bikeRack;
  
  // Get user from database 
  const user = await User.findById(userId).exec();
  
  // filter function 
  function removeAddress(bike) {
    return bike != address;
  }
  
  const filteredBikes = user.bikes.filter(removeAddress);
  user.bikes = filteredBikes;
  user.save()
  
  res.send(user);
  
});

app.listen(port, () => {
  console.log(`Server listening. Get after it!`);
});