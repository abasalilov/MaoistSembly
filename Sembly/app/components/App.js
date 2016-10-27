import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import TopBar from './TopBar.js';
import NavMenu from './NavMenu.js';
import LoginPage from './LoginPage.js';
import MainTest from './MainTest.js';

export default class App extends Component {

  renderScene(route, navigator){
    if(route.name === 'LoginPage'){
      return <LoginPage navigator={navigator}/>   
    }

    if(route.name === 'MainTest') {
      return <MainTest navigator={navigator}/>
    }
  }

  configureScene(route, routeStack){
   return Navigator.SceneConfigs.FloatFromBottom;
  }

  render () {
    return (
      <Navigator
        configureScene={ this.configureScene }
        style={styles.container}
        initialRoute={{name: 'LoginPage'}}
        renderScene={this.renderScene}/>
    )
  }
}


const styles = StyleSheet.create({
  container: {
  }
});

