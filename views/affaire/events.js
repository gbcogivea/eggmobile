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
import { Router } from "../../main";
import Jumbotron from '../../components/jumbotron/jumbotronCompte';
import { Divider } from 'react-native-material-ui';
import SubMenuContact from "../../components/subMenuContact";
import { events } from "../../actions/affaires";

class ContactsScreen extends React.Component {

  componentWillMount() {
    const {dispatch, data} = this.props;
    dispatch(events(data));
  }

  _renderEvents = () => {
    return this.props.events.map((event, index) => {
      return <Text key={index}>{event.even_nom}</Text>
    });
  };

  render() {
    return (
      <View>
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => {
            this.props.navigator.pop();
          }}
          centerElement={'Evenements'}
        />
        {this._renderEvents()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {affaires} = state;
  return {
    events: affaires.events
  }
};

export default connect(mapStateToProps)(ContactsScreen);