import React, { Component } from 'react';
import {
  SafeAreaView,
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { thisExpression } from '@babel/types';

import Pusher from "pusher-js/react-native";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      lobby: ''
    }

    this.pusher = null;
    this.channel = null;

    this.login = this.login.bind(this);
  }

  login() {
    let username = this.state.username;
    let lobby = this.state.lobby;

    if (username) {
      Pusher.logToConsole = true;

      this.pusher = new Pusher("e105a9334b89b9a29301", {
        authEndpoint: "http://localhost:3000/pusher/auth",
        encrypted: true,
        cluster: "us3",
        auth: {
          params: { username: username }
        }
      });

      this.channel = this.pusher.subscribe(`presence-${lobby}`);

      this.channel.bind("pusher:subscription_error", status => {
        Alert.alert(
          "Error",
          "Subscription error occurred. Please restart the app"
        );
      });

      this.channel.bind("pusher:subscription_succeeded", data => {
        console.log("subscription ok: ", data);

        this.props.navigation.navigate("Game", {
          pusher: this.pusher,
          username: username,
          channel: this.channel
        });
      });
    }
  }

  render() {
    return (
      <>
        <SafeAreaView>
          <View style={styles.body}>
            <Text style={styles.screenHeader}>CULT LEADER</Text> 
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Username</Text>
              <TextInput style={styles.sectionDescription} onChangeText={text => this.setState({ username: text })} />
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Lobby</Text>
              <TextInput style={styles.sectionDescription} onChangeText={text => this.setState({ lobby: text })} />
            </View>
            <View style={styles.sectionContainer}>
              <Button style={styles.sectionDescription} title="Join Game" onPress={this.login} />
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  screenHeader: {
    textAlign: "center",
    fontSize: 36
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
    backgroundColor: Colors.light
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default Login;
