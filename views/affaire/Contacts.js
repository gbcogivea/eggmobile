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
import { intervenants } from "../../actions/affaires";

class contactAffaire extends React.Component {
  state = {
    comptes: [],
    contacts: [],
    agents: []
  };

  async componentWillMount() {
    const {dispatch, data} = this.props;
    await dispatch(intervenants(data));
    await this._buildLists(this.props.participants);
  }

  async componentWillReceiveProps() {
    await this._buildLists();
  }

  _renderData = () => {
    const data = this.props.participants;
    return Object.keys(data).map((row) => {
      const item = data[row];
      return <Text key={item.id}>{item.nom} {item.type_nom}</Text>
    });
  };

  _buildLists = async (data) => {
    if (data !== undefined) {
      Object.keys(data).map(async (row) => {
        const item = data[row];
        if (item.type_nom === 'Contact') {
          await this.state.contacts.push(item);
        } else if (item.type_nom === 'compte') {
          await this.state.comptes.push(item);
        } else {
          await this.state.agents.push(item);
        }
      });
    }
  };

  _renderComptes = () => {
    return (
      <View>
        <Text>Comptes : </Text>
        {this.state.comptes.map((compte, index) => {
          return <Text key={index}>{compte.nom}</Text>
        })}</View>
    )
  };

  _renderContacts = () => {
    return (
      <View>
        <Text>Contacts : </Text>
        {this.state.comptes.map((contact, index) => {
          return <Text key={index}>{contact.nom}</Text>
        })}
      </View>
    )
  };

  _renderAgents = () => {
    return (
      <View>
        <Text>Agents : </Text>
        {this.state.comptes.map((agent, index) => {
          return <Text key={index}>{agent.nom}</Text>
        })}</View>
    )
  };

  render() {
    return (
      <View>
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => {
            this.props.navigator.pop();
          }}
          centerElement={'Intervenants'}
        />
        {this._renderData()}
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
    participants: affaires.participants
  }
};

export default connect(mapStateToProps)(contactAffaire);