# seattle-bike-racks
A Map of all the Bike Racks in Seattle

# Architecture
I'm deciding to build this app with a React app front-end and a node.js/express.js backend. The purpose of breaking the app into separate front-ends and back-ends is so that I can support a microservices architecture. I will follow the microservices architecture by providing individual backend endpoints for each specific service needed on the front-end. 

Services Needed: 
1. Need to provide the lat/long data from the Seattle bike rack dataset 
2. Need to provide the search service that allows users to search for all the bike racks within a mile of a specific address. 
3. Request lat/long data for map of Seattle 
4. Request lat/long data for map of Seattle neighborhoods and districts 
