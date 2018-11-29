import React, { Component } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps";
import API from "../../utils/API";

class Map extends Component {
  state = {
    Center: { lat: 35.22, lng: -80.84 },
    Trucks: [],
    UserLocation: {},
    Zoom: 10,
    Attempts: 0
  };
  constructor(props) {
    super(props);
    this.map = React.createRef();
  }
  componentDidMount() {
    this.getUserLocation()
  }
  getUserLocation = () => {
    if (navigator.geolocation && !(this.state.UserLocation === {})) {
      navigator.geolocation.getCurrentPosition(position => {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        this.setState({ UserLocation: pos, Center: pos })
      })
    }
  }

  handleMarkerClick = (data) => {
    this.setState({
      truckName: data.name,
      truckPhone: data.phone,
      truckUrl: data.url
    })
    console.log(data)
  };

  render() {
    const GoogleMapExample = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          ref={map => {
            this.map = map;
          }}
          // onTilesLoaded={props.onTilesLoaded}
          // onHeadingChanged={props.onTilesLoaded}
          defaultCenter={this.state.Center}
          defaultZoom={props.Zoom}
          zoom={this.state.Zoom}
          onIdle={props.onIdle}
          onDragEnd={props.onDragEnd}
        >
          {this.state.Trucks.map(truck => (
            <Marker
              key={truck.id}
              position={{ lat: truck.lat, lng: truck.long }}
              onClick={() => this.handleMarkerClick(truck)}
            />
          ))}
          <Marker
            position={this.state.UserLocation}
            icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png" />

        </GoogleMap>

      )));
      
    return (
      <div>
        <GoogleMapExample
          Trucks={this.state.Trucks}
          onIdle={() => {
            let ne = this.map.getBounds().getNorthEast();
            let sw = this.map.getBounds().getSouthWest();
            let lowLat = sw.lat().toString();
            let highLat = ne.lat().toString();
            let lowLong = sw.lng().toString();
            let highLong = ne.lng().toString();
            let center = this.map.getCenter();
            let zoom = this.map.getZoom();
            console.log(lowLat, highLat, lowLong, highLong)
            API.getTrucksForMap(lowLat, highLat, lowLong, highLong)
              .then(((res) => {
                console.log("onIdle: res.data", res.data)
                console.log("this.state.Trucks", this.state.Trucks)
                if (!(JSON.stringify(this.state.Trucks) === JSON.stringify(res.data))) {
                  console.log("IF statment ==== TRUE")
                  this.setState({
                    Trucks: res.data,
                    Center: center,
                    Zoom: zoom
                  })
                }
              })
              )
          }}
          defaultCenter={{ lat: 35.22, lng: -80.84 }}
          onTilesLoaded={() => {
            let ne = this.map.getBounds().getNorthEast();
            let sw = this.map.getBounds().getSouthWest();
            let lowLat = sw.lat().toString();
            let highLat = ne.lat().toString();
            let lowLong = sw.lng().toString();
            let center = this.map.getCenter();
            let highLong = ne.lng().toString();
            console.log(lowLat, highLat, lowLong, highLong)
            API.getTrucksForMap(lowLat, highLat, lowLong, highLong)
              .then(((res) => {
                console.log("onTilesLoaded: ", res.data)
                if (!this.state.Trucks) {
                  this.setState({
                    Trucks: res.data,
                    Center: center,
                  })
                }
              })
              )
          }}
          onDragEnd={() => {
            let ne = this.map.getBounds().getNorthEast();
            let sw = this.map.getBounds().getSouthWest();
            let center = this.map.getCenter();
            let lowLat = sw.lat().toString();
            let highLat = ne.lat().toString();
            let lowLong = sw.lng().toString();
            let highLong = ne.lng().toString();
            console.log(lowLat, highLat, lowLong, highLong)
            API.getTrucksForMap(lowLat, highLat, lowLong, highLong)
              .then(((res) => {
                console.log("onDragEnd: ", res.data)
                this.setState({
                  Trucks: res.data,
                  Center: center,
                })

              })
              )
          }}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA6pItobxq0v_r7pWG5w_R36jtaVw8h520"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Map;