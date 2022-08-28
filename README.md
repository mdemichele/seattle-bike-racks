# Seattle Bike Racks 
This web application presents a map of all the bike racks in Seattle. The application allows users to find out information about each bike rack, such as location and width. The app also allows users to search for a specific address and locate all of the bike racks within a mile radius of the given location. The app even allows users to add new bike racks to the map to provide more accurate information to future users. The project was built for CS 361 - Software Engineering at Oregon State University.

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

