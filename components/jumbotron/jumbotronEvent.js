/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { Card } from 'react-native-material-ui';

export default class JumbotronCompte extends Component {

  render() {
    const {event} = this.props;
    return (
      <Card style={{container: {backgroundColor: '#2196f3', marginLeft: 0, marginRight: 0}}}>
        <Text style={styles.primaryText}>{event.even_nom}</Text>
        <Text style={styles.secondaryText}>Début : {event.debut} {event.debut_h}</Text>
        <Text style={styles.secondaryText}>Fin : {event.fin} {event.fin_h}</Text>
        <Text style={styles.secondaryText}>Type : {event.type_nom}</Text>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginLeft: 10
  },
  primaryText: {
    color: '#FFF',
    fontSize: 20,
    paddingTop: '5%',
    paddingLeft: '3%',
    fontWeight: 'bold',
  },
  secondaryText: {
    color: '#FFF',
    fontSize: 14,
    paddingBottom: '3%',
    paddingLeft: '3%'
  },
  thirdText: {
    color: '#FFF',
    fontSize: 14,
    paddingLeft: '3%',
  },
});