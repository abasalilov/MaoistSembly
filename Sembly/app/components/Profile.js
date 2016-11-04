import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView
} from 'react-native';

import Drawer from 'react-native-drawer';

import Spinner from './Spinner.js'

import TopBar from './TopBar.js';
import OurDrawer from './OurDrawer.js';
import Menu from './Menu.js';
import UserCard from './UserCard.js';

import _navigate from './navigateConfig.js';
import Config from './Env.js';

var styles = StyleSheet.create({
  description: {
    marginBottom: 10,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    paddingLeft: 10
  },
  container: {
    padding: 30,
    marginTop: 10,
    alignItems: 'center',
  },
  innerNav: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    backgroundColor: '#F44336',
    flexDirection: 'row',
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  selected: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#3F51B5',
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F44336',
  },
  searchInput: {
    height: 36,
    flex: 4,
    fontSize: 18,
    color: 'black'
  },
  image: {
    borderRadius: 100,
    height:200,
    width:200,
    marginRight:10,
    marginBottom: 20
  },
  spinner: {
    padding: 30,
    marginTop: 200,
    alignItems: 'center'
  }
});

export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      first: null,
      last: null,
      email: this.props.user.email,
      password: null,
      confirm: null,
      photo: null
    };
  }

  update() {
    var context = this;
    this.setState({errorText: null})
    if (this.state.password !== this.state.confirm){
      this.setState({errorText: 'Passwords do not match'});
    } else {
      fetch(`${Config.API_URL}/api/users/update`,{
        method: 'PUT',
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
          firstName: this.state.first,
          lastName: this.state.last,
          oldEmail: this.props.user.email,
          email: this.state.email,
          password: this.state.password,
          photoUrl: this.state.photo
        })
      })
      .then(response => {
        return response.json();
      })
      .then( user => {
        var context = this;
        this.props.setUser(user);
        this.setState({errorText: 'User Updated!'});
        setTimeout(() => {
          context.props.navigator.push({
              name: 'Profile'
          });
        }, 1000);
      })
      .catch( response => {
        this.setState({errorText: 'Email is already taken'});
      });
    }
  }

  render(){
    return (
      <OurDrawer user={this.props.user} topBarName={'Profile'} _navigate={_navigate.bind(this)}>
        <View style={styles.container}>
          <Image style={styles.image} source={{uri: this.props.user.photoUrl}}/>
          <Text style={styles.errorText}>{this.state.errorText}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder={this.props.user.firstName}
              onChangeText={(text) => this.setState({first:text})}
              autoCorrect={false}
              // onChange={this.onSearchTextChange.bind(this)}
              />
            <TextInput
              style={styles.searchInput}
              placeholder={this.props.user.lastName}
              onChangeText={(text) => this.setState({last:text})}
              autoCorrect={false}
              // onChange={this.onSearchTextChange.bind(this)}
              />
            <TextInput
              style={styles.searchInput}
              placeholder={this.props.user.email}
              onChangeText={(text) => this.setState({email:text})}
              autoCorrect={false}
              autoCapitalize='none'
              // onChange={this.onSearchTextChange.bind(this)}
              />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder='New Password'
              secureTextEntry={true}
              onChangeText={(text) => this.setState({password:text})}
              autoCapitalize='none'
              autoCorrect={false}
              // onChange={this.onSearchTextChange.bind(this)}
              />
            <TextInput
              style={styles.searchInput}
              placeholder='Confirm Password'
              secureTextEntry={true}
              onChangeText={(text) => this.setState({confirm:text})}
              autoCapitalize='none'
              autoCorrect={false}
              // onChange={this.onSearchTextChange.bind(this)}
              />
            <TextInput
              style={styles.searchInput}
              placeholder='New Photo'
              onChangeText={(text) => this.setState({photo:text})}
              autoCapitalize='none'
              autoCorrect={false}
              // onChange={this.onSearchTextChange.bind(this)}
              />
          </View>
          <TouchableOpacity onPress={(e)=>{this.update()}} style={styles.button}>
            <Text style={styles.buttonText}>Update Info</Text>
          </TouchableOpacity>
        </View>
      </OurDrawer>
    )
  }
};
