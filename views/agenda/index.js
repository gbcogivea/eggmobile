/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import { View, StyleSheet, Text, Button, Image } from 'react-native';
import { Toolbar, COLOR, ActionButton, Icon } from 'react-native-material-ui';
import { connect } from 'react-redux';
import Agenda from '../../components/agenda2';
import Header from '../../components/Header';
import { Router } from '../../main';
import { loadEvents } from '../../actions/planning';
import {
  fetchCountries, fetchStates, fetchStatus, fetchNotesTypes, fetchChannel, fetchEventStatus, fetchEventType,
  fetchIntervalTime, fetchLegalStatus, fetchMethodPayments, fetchOffices, fetchSources, fetchTaskPriority,
  fetchTaskStatus
} from "../../actions/render";
import { customDispatcher } from "../../utils/utils";
import * as types from "../../constantes";

class AgendaView extends React.Component {

  state = {
    active: 'today',
    actions: []
  };

  async componentWillMount() {
    const {dispatch, access} = this.props;
    if(access.even > 2) {
      this.state.actions.push({icon: 'event', label: 'Evenement'});
    }
    if(access.tache > 2) {
      this.state.actions.push({icon: 'bookmark', label: 'Tache'});
    }
    await dispatch(fetchStates());
    await dispatch(fetchStatus());
    await dispatch(fetchCountries());
    await dispatch(fetchNotesTypes());
    await dispatch(fetchChannel());
    await dispatch(fetchEventStatus());
    await dispatch(fetchEventType());
    await dispatch(fetchOffices());
    await dispatch(fetchSources());
    await dispatch(fetchTaskPriority());
  }

  _loadEvents = async (day) => {
    const {dispatch} = this.props;
    await dispatch(loadEvents(day));
  };

  _navigate = (key) => {
    if (key === 'bookmark') {
      this.props.navigator.push(Router.getRoute('createTache'));
    }
    if (key === 'event') {
      this.props.navigator.push(Router.getRoute('createEvenement'));
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title='Agenda'
                navigation={this.props.navigation}/>
        {/*N'afficher que les évenements du jour*/}
        <Agenda events={this.props.events} loadEvents={this._loadEvents}/>
        {this.state.actions.length > 0 &&
        <ActionButton
          actions={this.state.actions}
          onPress={this._navigate}
          transition="speedDial"
        />}
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
  }
});

const mapStateToProps = (state) => {
  const {planning, renderReducer} = state;
  return {
    events: planning.events,
    access: renderReducer.access
  }
};

export default connect(mapStateToProps)(AgendaView);
