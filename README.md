# Seattle Bike Racks 
This web application presents a map of all the bike racks in Seattle. The application allows users to find out information about each bike rack, such as location and width. The app also allows users to search for a specific address and locate all of the bike racks within a mile radius of the given location. The app even allows users to add new bike racks to the map to provide more accurate information to future users. The project was built for CS 361 - Software Engineering at Oregon State University.

# Running the Application
There is a little bit of setup required in order to run the application on your local machine. First, clone the repo onto your local machine. 

To get all of the necessary packages, run `npm ci` in the root directory of the application. This will do a clean install of all the node module packages required to run the application.

Next, you'll need to add a few environment variables. To do so, add a `.env` file in the root directory of the application. This `.env` file will house all of the environment specific variables of the project. It uses a npm library called dotenv, whose documentation can be found [here](https://www.npmjs.com/package/dotenv). 

You'll also need to generate an access key from [LocationIQ](https://us1.locationiq.com/). Login and create an access key through their dashboard. *More instructions coming on this*

# Architecture
I decided to build this app with a React app front-end and a Node.js/Express.js backend. The purpose of breaking the app into a separate front-end and back-end is so that I could support a Microservices Architecture. I allowed for a Microservices architecture by providing individual backend endpoints for each specific service needed on the front-end. 

# Services Provided By Back-end: 
1. Provides the lat/long data from the Seattle bike rack dataset.
2. Provides the search service that allows users to search for all the bike racks within a mile of a specific address.  
3. Provides support for users adding in new bike rack information to the dataset.

# Lessons Learned 
- Learned how to construct modern web applications using a Microservices architecture.
- Learned about the software development process, using an Agile development process.
- Learned about rending vector data from GeoJSON files.

# Technologies Used 
- React 
- Node.js
- Express.js
- OpenLayers 

