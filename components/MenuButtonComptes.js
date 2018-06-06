/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import { ActionButton } from 'react-native-material-ui';
import {View} from 'react-native';
import { Router } from '../main';
import { withNavigation } from '@expo/ex-navigation';

@withNavigation
class MenuButtonComptes extends React.Component {
  state = {
    actions: []
  };

  componentWillMount() {
    const {access} = this.props;
    if (access.affaire > 2) {
      this.state.actions.push({icon: 'business', label: 'Affaire'});
    }
    if (access.even > 2) {
      this.state.actions.push({icon: 'event', label: 'Evenement'});
    }
    if (access.tache > 2) {
      this.state.actions.push({icon: 'bookmark', label: 'Tache'});
    }
    if (access.contact > 2) {
      this.state.actions.push({icon: 'phone', label: 'Contacts'});
    }
    if (access.compte > 2) {
      this.state.actions.push({icon: 'person', label: 'Compte'});
    }
  }

  _navigate = (key) => {
    if (key === 'business') {
      this.props.navigator.push(Router.getRoute('createAffaire'));
    }
    if (key === 'event') {
      this.props.navigator.push(Router.getRoute('createEvenement'));
    }
    if (key === 'bookmark') {
      this.props.navigator.push(Router.getRoute('createTache'));
    }
    if (key === 'phone') {
      this.props.navigator.push(Router.getRoute('createContact'));
    }
    if (key === 'person') {
      this.props.navigator.push(Router.getRoute('createCompte'));
    }
  };

  render() {
    return (
      <View>
        {this.state.actions.length > 0 &&
        <ActionButton
          actions={this.state.actions}
          onPress={this._navigate}
          transition="speedDial"
          icon="add"
        />}
      </View>
    );
  }
}

export default MenuButtonComptes;
