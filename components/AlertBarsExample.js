import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text } from 'react-native';

export default class TranslucentBarExample extends Component {
  static route = {
    navigationBar: {
      title: 'Alert Bars',
    },
  };

  _showAlert = () => {
    this.props.navigator.showLocalAlert('SUCCESS', {
      text: { color: '#fff' },
      container: { backgroundColor: '#4BB543' },
    });
  };

  _showAnotherAlert = () => {
    this.props.navigator.showLocalAlert('ERROR', {
      text: { color: '#fff' },
      container: { backgroundColor: '#F44336' },
    });
  };

  _goBack = () => {
    this.props.navigator.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={this._showAlert}>
            <Text style={styles.buttonText}>SHOW SUCCESS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this._showAnotherAlert}>
            <Text style={styles.buttonText}>SHOW ERROR</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#fff',
  },

  cover: {
    height: 160,
    resizeMode: 'cover',
    backgroundColor: '#131F2B',
  },

  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
  },

  button: {
    height: 40,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#E91E63',
    borderRadius: 24,
    margin: 6,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 12,
  },
});
