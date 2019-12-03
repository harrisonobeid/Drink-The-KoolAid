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

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      members: [],
      starting: true
    }

    this.pusher = null;
    this.channel = null;
    this.username = null;
    this.roles = ['Cultist', 'Skeptic', 'Cultist', 'Skeptic', 'Skeptic', 'Skeptic'];
    this.initializing = this.initializing.bind(this);
  }

  componentDidMount() {
    this.pusher = this.props.navigation.state.params.pusher;
    this.channel = this.props.navigation.state.params.channel;

    let members = [];

    for (var member in this.channel.members.members) {
      members.push({name: member});
    }

    if (members.length === 6) {
      this.setState({username: this.props.navigation.state.params.username, members: members});
      this.initializing();
    } else {
      this.setState({username: this.props.navigation.state.params.username, members: members});
    }
  }

  initializing() {
    let members = this.state.members;

    for (var i = 0; i < members.length; i++) {
      members[i].role = this.roles.pop();
    }

    this.setState({members: members});
  }

  render() {
    return (
      <>
        <SafeAreaView>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Welcome to Cult Leader, {this.state.username}!</Text>
            </View>
            <View style={styles.sectionContainer}>
              {this.state.members && this.state.members.length !== 6 && <Text style={styles.sectionDescription}>Awaiting {6 - this.state.members.length} Players...</Text>}
              {this.state.members && this.state.members.length === 6 && this.state.starting === true && <Text style={styles.sectionDescription}>Initializing Session</Text> }
              <Text style={styles.sectionDescription}>Current Players</Text>
              {this.state.members && this.state.members.map(member => <Button title={member.name} />)}
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

export default Game;
