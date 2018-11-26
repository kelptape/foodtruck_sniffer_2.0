import axios from "axios";

export default {
  // Gets all trucks
  getTrucks: function() {
    return axios.get("/api/trucks");
  },
  // Gets the Truck with the given id
  getTruck: function(id) {
    return axios.get("/api/trucks/" + id);
  },
  getTrucksForMap: function(lLat,hLat,lLong,hLong) {
    console.log(lLat,hLat,lLong,hLong)
    return axios.get(`/api/trucks/map?lowLat=${lLat}&highLat=${hLat}&lowLong=${lLong}&highLong=${hLong}`);
  },
  // Deletes the Truck with the given id
  deleteTruck: function(id) {
    return axios.delete("/api/trucks/" + id);
  },
  // Saves a Truck to the database
  saveTruck: function(truckData) {
    return axios.post("/api/trucks", truckData);
  }
};
