/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Toolbar, ActionButton } from 'react-native-material-ui';
import ListItem from '../../components/listItem2';
import Jumbotron from '../../components/jumbotron/jumbotronAffaire';
import { Router } from '../../main';
import { findAffaire } from '../../actions/affaires';
import { connect } from 'react-redux';
import MenuButtonComptes from '../../components/MenuButtonComptes';

class DetailCompteScreen extends React.Component {

  componentDidMount() {
    const {dispatch, route} = this.props;
    dispatch(findAffaire(route.params.affaire));
  }

  _goToScreen = (name, data) => {
    this.props.navigator.push(Router.getRoute(name, {data}));
  };

  render() {
    const {selectedAffaire, access} = this.props;
    return (
      <View style={styles.container}>

        {access.affaire > 1 &&
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => {
            this.props.navigator.pop();
          }}
          centerElement={'Affaire'}
          rightElement="mode-edit"
          onRightElementPress={() => this.props.navigator.push(Router.getRoute('createAffaire', {selectedAffaire}))}
        />}
        {access.affaire < 2 &&
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => {
            this.props.navigator.pop();
          }}
          centerElement={'Affaire'}
        />}
        <Jumbotron affaire={selectedAffaire}/>
        {/*ca_t * 3 mb_t * 3*/}
        <ListItem
          title={'Chiffrage'}
          description="Chiffrage de l'affaire"
          onPress={() => this._goToScreen('chiffrage', selectedAffaire)}
        />
        <ListItem
          title={'Intervenants'}
          description="Liste des contacts pour cette affaire"
          onPress={() => this._goToScreen('contactsAffaire', selectedAffaire.aff_id)}
        />
        {/*récupérer à partir des évenement avec la clause aff_id*/}
        <ListItem
          title={'Evenements'}
          description="Evénements de l'affaire"
          onPress={() => this._goToScreen('eventsAffaire', selectedAffaire.aff_id)}
        />
        <ListItem
          title={'Doc Commerciaux'}
          description="Documents de l'affaire"
          onPress={() => this._goToScreen('documentsAffaire', selectedAffaire.aff_id)}
        />
        <ListItem
          title={'Communications'}
          description="compte et contact de l'affaire"
          onPress={() => this._goToScreen('compteEtContact', selectedAffaire)}
        />
        <ListItem
          title={'Compte et contact'}
          description="compte et contact de l'affaire"
          onPress={() => this._goToScreen('compteEtContact', selectedAffaire)}
        />
        <MenuButtonComptes access={this.props.access}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  primaryText: {
    fontSize: 20,
    color: 'white'
  },
  secondaryText: {
    fontSize: 10,
    color: 'white'
  }
});

const mapStateToProps = (state) => {
  const {affaires, renderReducer} = state;
  return {
    selectedAffaire: affaires.selectedAffaire,
    access: renderReducer.access
  }
};

export default connect(mapStateToProps)(DetailCompteScreen);
