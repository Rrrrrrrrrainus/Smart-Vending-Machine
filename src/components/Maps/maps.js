import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios'

import { Map, Marker, InfoWindow,GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '98%',
  height: '100%'
};


export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showingInfoWindow: false,
          activeMarker: {},
          selectedPlace: {},
          markers: [],
          selectMarker:{},
          vm: {}
        }
        this.getvm = {
          email:"jinxund@smu.edu"
        }
        this.vm = []
        // binding this to event-handler functions
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
        
      }
      
      getHandler(){
        axios.post("https://vending-insights-smu.firebaseapp.com/vm/getallvm",this.getvm)
         .then(response => {
                // console.log(response)
                var vms = response.data
                this.vm = vms
                var keys = Object.keys(vms)
                for(var i = 0; i < keys.length; i++) { 
                    var key = (keys[i]) ; 
                    var vm_info = vms[key]
                    var marker = this.state.markers
                    marker.push(
                      <Marker
                        onClick = { this.onMarkerClick }
                        title = { 'Changing Colors Garage' }
                        position = {{ lat: vm_info.latitude, lng: vm_info.longitude}}
                        name = { 'Changing Colors Garage' }
                        id = {key}
                      />)
                  this.setState(marker)
                }
            }).catch(error => {console.log(error)})
      }

      onMarkerClick = (props, marker, e) => {
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true,
          selectMarker: this.vm[marker.id]
        });
      }
      onMapClick = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          });
        }
      }
      componentWillMount(){
        this.getHandler()
      }
  render() {

    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        onClick = { this.onMapClick }
        options={{streetViewControl: true}}
        initialCenter={{
         lat: 32.845158,
         lng: -96.768737
        }}
      >
        {this.state.markers}
        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
          <div>
      ID: {this.state.selectMarker.vm_id} <br />
      Latitude: {this.state.selectMarker.latitude} longitude: {this.state.selectMarker.longitude} <br/>
      Net Sales: {this.state.selectMarker.sales} Status: Online <br/>
      <a href = "/vendingmachine"><button >More Information</button></a>
              
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  //apiKey: 'YOUR_GOOGLE_API_KEY_GOES_HERE'
})(MapContainer);