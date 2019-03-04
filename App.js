/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, Button, StyleSheet, Text, View } from 'react-native';
import io from 'socket.io-client';

export default class App extends Component {

  socket = null
  state = {
    status: 0,
  }

  componentDidMount() {
    this.socket = io('http://45.117.168.218:8080');
    this.socket.on('connect', () => {
      // this.socket.emit('info', {});
      this.socket.on('info', data => {

      })
      this.socket.on('message', status => {
        console.log('message', status)
        this.setState({ status })
      })
      // this.socket.on('off', status => {
      //   console.log('off', status)
      //   this.setState({ status })
      // })
    })
  }

  _onclick = isOn => {
    // if (isOn) {
    //   this.socket.emit('message', 1);
    // } else {
    //   this.socket.emit('message', 0);
    // }
    this.socket.emit('message', isOn);
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.status}</Text>
        <View>
          <Button
            title='ON'
            onPress={() => this._onclick(1)}
          />
          <Button
            title='OFF'
            onPress={() => this._onclick(0)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
