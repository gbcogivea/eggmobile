/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import { View, StyleSheet, ScrollView, ListView, TouchableOpacity, Text } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import { connect } from 'react-redux';
import { chiffrage } from "../../actions/affaires";
import { formatFloat } from "../../utils/utils";
import { NavigationStyles } from '@expo/ex-navigation';

class ContactsScreen extends React.Component {
  static route = {
    styles: {
      ...NavigationStyles.SlideHorizontal
    }
  };


  render() {
    const affaire = this.props.data;
    return (
      <View>
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => {
            this.props.navigator.pop();
          }}
          centerElement={'Chiffrage'}
        />
        <View style={styles.row}>
          <Text style={[styles.cell, styles.title]}>Ventes : </Text>
          <Text style={[styles.cell, styles.centerText]}>CA</Text>
          <Text style={[styles.cell, styles.centerText]}>MB</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Théorique : </Text>
          <Text style={[styles.cell, styles.centerText]}>{formatFloat(affaire.ca_t)}€</Text>
          <Text style={[styles.cell, styles.centerText]}>{formatFloat(affaire.mb_t)}€</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Réalisé : </Text>
          <Text style={[styles.cell, styles.centerText]}>{formatFloat(affaire.ca_r)}€</Text>
          <Text style={[styles.cell, styles.centerText]}>{formatFloat(affaire.mb_r)}€</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Ecart : </Text>
          <Text
            style={[styles.cell, styles.centerText]}>{formatFloat(parseFloat(affaire.ca_r) - parseFloat(affaire.ca_t))}€</Text>
          <Text
            style={[styles.cell, styles.centerText]}>{formatFloat(parseFloat(affaire.mb_r) - parseFloat(affaire.mb_t))}€</Text>
        </View>
        <Text/>
        <Text/>
        <Text/>
        <View style={styles.row}>
          <Text style={[styles.cell, styles.title]}>Achats : </Text>
          <Text style={[styles.cell, styles.centerText]}>Temps</Text>
          <Text style={[styles.cell, styles.centerText]}>Coût</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Théorique : </Text>
          <Text style={[styles.cell, styles.centerText]}>{formatFloat(affaire.tps_t)}€</Text>
          <Text style={[styles.cell, styles.centerText]}>{formatFloat(affaire.cout_t)}€</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Réalisé : </Text>
          <Text style={[styles.cell, styles.centerText]}>{formatFloat(affaire.tps_r)}€</Text>
          <Text style={[styles.cell, styles.centerText]}>{formatFloat(affaire.cout_r)}€</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Ecart : </Text>
          <Text
            style={[styles.cell, styles.centerText]}>{formatFloat(parseFloat(affaire.tps_r) - parseFloat(affaire.tps_t))}€</Text>
          <Text
            style={[styles.cell, styles.centerText]}>{formatFloat(parseFloat(affaire.cout_r) - parseFloat(affaire.cout_t))}€</Text>
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
    flex: 1,
  },
  title: {
    textDecorationLine: 'underline'
  },
  row: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20
  },
  cell: {
    width: '33%'
  },
  centerText: {
    textAlign: 'center'
  },
  primary: {
    color: '#1B435D',
    fontSize: 16,
    paddingTop: '5%',
    paddingLeft: '3%',
  },
  secondary: {
    color: '#78BBE6',
    fontSize: 12,
    paddingTop: '1%',
    paddingBottom: '5%',
    paddingLeft: '3%'
  },
});

const mapStateToProps = (state) => {
  const {affaires} = state;
  return {
    chiffrage: affaires.chiffrage
  }
};

export default connect(mapStateToProps)(ContactsScreen);