import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Navigator,
  Dimensions,
  TouchableHighlight
} from 'react-native';

import Spinner from './Spinner.js'

import MapView from 'react-native-maps';
import NewEventModal from './NewEventModal.js';
import OurDrawer from './OurDrawer.js';
import EventModal from './EventModal.js';
import _navigate from './navigateConfig.js';
import NewEventFab from './NewEventFab.js';
import Config from './Env.js';

export default class Map extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: true,
      markers: null,
      friends: null,
      modalVisible: false,
      selectedMarker: null,
      eventModal: false
    };
  }

  setNewEventPinCoords () {
    fetch(`${Config.API_URL}/api/users/update/loc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.props.user.email,
        location: [Number(this.props.mongoLocation[0]), Number(this.props.mongoLocation[1])]
      })
    })
    .then(data => {
      this.setState({x: {
        latitude: this.props.mongoLocation[1],
        longitude: this.props.mongoLocation[0]
      } });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  fetchEvents () {
    fetch(`${Config.API_URL}/api/events/bundle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: this.props.user._id,
        location: this.props.mongoLocation
      })
    })
    .then(data => {
      return data.json()
    })
    .then(data => {
      this.setState({markers: data, loading: false})
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getFriends(){
    fetch(`${Config.API_URL}/api/friends/getFriends`,{
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({userId: this.props.user._id, search: ''})
    })
    .then(response => {
      return response.json();
    })
    .then( friends => {
      this.setState({
        friends: friends
      });
    })
    .catch( error => {
      console.log(error);
    });
  }
  componentWillMount () {
    this.setNewEventPinCoords();
    this.getFriends();
    this.fetchEvents();
  }
  openModal () {
    this.setState({modalVisible: true});
  }

  openEvent(eventId) {
    this.setState({eventModal: true, selectedMarker: eventId});
  }
  closeEvent () {
    this.setState({eventModal:false});
  }

  getModal() {
    if (this.state.eventModal) {
      return <EventModal close={this.closeEvent.bind(this)} user={this.props.user} visibility={this.state.eventModal} event={this.state.selectedMarker}/>
    } else {
      return (<View></View>)
    }
  }
  render () {
    if(this.state.loading){
      return (
        <OurDrawer user={this.props.user} topBarFilterVisible={true} topBarName={'Map'} _navigate={ _navigate.bind(this)}>
          <View style={styles.spinner}>
            <Spinner />
          </View>
        </OurDrawer>
      )
    }
    else {
      return (
        <OurDrawer user={this.props.user} topBarFilterVisible={false} topBarName={'Map'} _navigate={ _navigate.bind(this)}>
          <View>
            <MapView
              showsUserLocation={true}
              style={styles.map}
              initialRegion={{
                latitude: this.props.mongoLocation[1],
                longitude: this.props.mongoLocation[0],
                latitudeDelta: .04,
                longitudeDelta: .02
            }}>
            <MapView.Marker draggable
              coordinate={this.state.x}
              pinColor='yellow'
              title='Create New Event'
              onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
            />
            {this.state.markers.map(marker => {
              var tempLoc = {
                latitude: marker.location[1],
                longitude: marker.location[0]
              }
              return (
                <MapView.Marker
                  key={marker._id}
                  coordinate={tempLoc}
                  pinColor='red'
                >
                  <MapView.Callout width={60}>
                    <TouchableHighlight
                      underlayColor="transparent"
                      onPress={ (e) => {this.openEvent(marker._id)}}
                    >
                      <Text>{marker.name}</Text>
                    </TouchableHighlight>
                  </MapView.Callout>
                </MapView.Marker>
              )
            })}
            {this.state.friends.map(friend => {
              var tempLoc = {
                latitude: friend.location ? friend.location[1] + Math.random()*0.01 : 0,
                longitude: friend.location ? friend.location[0] + Math.random()*0.01 : 0
              }
              return (
                <MapView.Marker
                  key={friend._id}
                  coordinate={tempLoc}
                  pinColor='green'
                >
                  <MapView.Callout width={60}>
                    <Text>{friend.firstName + ' ' + friend.lastName}</Text>
                  </MapView.Callout>
                </MapView.Marker>
              )
            })}
            </MapView>
            <NewEventFab onPress={this.openModal.bind(this)}/>
            <NewEventModal resetPin={this.setNewEventPinCoords.bind(this)} fetchNewEvents={this.fetchEvents.bind(this)} user={this.props.user} eventCoords={this.state.x} modalVisibility={this.state.modalVisible}/>
          </View>
          {this.getModal()}
        </OurDrawer>
      )
    }
  }
}

const styles = StyleSheet.create({
  map: {
    height: Dimensions.get('window').height - 60,
  },
  spinner: {
    padding: 30,
    marginTop: 200,
    alignItems: 'center'
  }
});
