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
import { fetchContactsDuCompte } from '../../actions/comptes';
import Contacts from '../../components/listContacts';
import {Router} from "../../main";
import Jumbotron from '../../components/jumbotron/jumbotronCompte';
import { Divider } from 'react-native-material-ui';
import SubMenuContact from "../../components/subMenuContact";
import { chiffrage, documents } from "../../actions/affaires";
import ListItem from '../../components/listItem2';

class ContactsScreen extends React.Component {

  _goToScreen = (name, data) => {
    this.props.navigator.push(Router.getRoute(name, {data}));
  };

  render() {
    const {selectedAffaire} = this.props;
    return (
      <View>
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => {
            this.props.navigator.pop();
          }}
          centerElement={'Documents'}
        />
        {/*<Text>Nombre de Commande : {this.props.documents.length}</Text>*/}
        <ListItem
          title={'Devis'}
          description="Liste des devis de l'affaire"
          onPress={() => this._goToScreen('estimatesAffaire', selectedAffaire.aff_id)}
        />
        <ListItem
          title={'Factures'}
          description="Liste des factures de l'affaire"
          onPress={() => this._goToScreen('invoicesAffaire', selectedAffaire.aff_id)}
        />
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
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    color:'#1B435D',
    fontSize:16,
    paddingTop: '5%',
    paddingLeft: '3%',
  },
  secondary: {
    color:'#78BBE6',
    fontSize:12,
    paddingTop:'1%',
    paddingBottom: '5%',
    paddingLeft: '3%'
  },
});

const mapStateToProps = (state) => {
  const {affaires} = state;
  return {
    selectedAffaire: affaires.selectedAffaire
  }
};

export default connect(mapStateToProps)(ContactsScreen);