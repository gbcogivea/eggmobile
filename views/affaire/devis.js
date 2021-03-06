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
import { estimate, events } from "../../actions/affaires";

class ContactsScreen extends React.Component {

  componentWillMount() {
    const {dispatch, data} = this.props;
    dispatch(estimate(data));
  }

  _renderEvents = () => {
    if (this.props.estimates !== undefined) {
      return this.props.estimates.map((event, index) => {
        return <Text key={index}>{event.id}</Text>
      });
    }
  };

  render() {
    return (
      <View>
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => {
            this.props.navigator.pop();
          }}
          centerElement={'Devis'}
        />
        {this._renderEvents()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {affaires} = state;
  return {
    estimates: affaires.estimates
  }
};

export default connect(mapStateToProps)(ContactsScreen);