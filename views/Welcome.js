/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import AlertBar from '../components/AlertBarsExample'

export default class Welcome extends React.Component {
  render() {

    return (
      <View style={styles.container}>
        <Header title='Accueil'
                navigation={this.props.navigation}/>
        <View style={styles.textContent}>
          <Text style={styles.text}>Bienvenue</Text>
          <Text style={styles.text2}>Sur l'application Cogivea</Text>
          <AlertBar navigator={this.props.navigator}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  container: {
    flex: 1
  },
  textContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize:36
  },
  text2: {
    fontSize:12,
    color:'grey'
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  }
});