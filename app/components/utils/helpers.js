// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");
// Geocoder API
var authKey = "05b63abf5c764fa6b6d37eb2f4e3f647";
// Helper functions for making API Calls
var helper = {
  // This function serves our purpose of running the query to geolocate.
  runQuery: function(searchTerm) {
    console.log(searchTerm);
    // Figure out the geolocation
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  authKey + "&q=" + searchTerm;
    return axios.get(queryURL).then(function(data) {
      //console.log("lol")
    
      const NYTresponse = [data.data.response.docs[0].headline.main, 
      data.data.response.docs[1].headline.main,
      data.data.response.docs[2].headline.main,
      data.data.response.docs[3].headline.main,
      data.data.response.docs[4].headline.main];

      for (var i = 0; i<NYTresponse.length; i++){
      console.log(NYTresponse);
      return (NYTresponse);
      // If get get a result, return that result's formatted address property
      if (data.data.response.docs) {
        return data.data.response.docs[0].headline.main;
      }
      // If we don't get any results, return an empty string
      return "";
      }
    });
  },
  // This function hits our own server to retrieve the record of query results
  getHistory: function() {
     return axios.get("/api");
  },
// This function posts new searches to our database.
   postHistory: function(data) {
     console.log(data);
   return axios.post("/api", { data: data });
   
  }
};
// We export the API helper
module.exports = helper;