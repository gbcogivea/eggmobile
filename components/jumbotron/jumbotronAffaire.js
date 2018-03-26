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
    const {affaire} = this.props;
    return (
      <Card style={{container: {backgroundColor: '#2196f3', marginLeft: 0, marginRight: 0}}}>
        <Text style={styles.primaryText}>{affaire.aff_nom}</Text>
        <Text style={styles.secondaryText}>{affaire.aff_id}</Text>
        <Text style={styles.thirdText}>CA théorique : {affaire.ca_t}</Text>
        <Text style={styles.secondaryText}>Etape : {affaire.etape_nom}</Text>
        <Text style={styles.thirdText}>Client : {affaire.clt_nom}</Text>
        <Text style={styles.secondaryText}>Contact : {affaire.cct_pre + ' ' + affaire.cct_nom}</Text>
        <Text style={styles.thirdText}>Début : {affaire.aff_debut}</Text>
        <Text style={styles.secondaryText}>Cloturée : {affaire.aff_fin}</Text>
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