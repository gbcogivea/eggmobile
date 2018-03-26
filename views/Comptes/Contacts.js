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

class ContactsScreen extends React.Component {
  state = {
    dataSource: null,
    data: [],
    selectedRow: null,
    search: ''
  };

  componentWillMount() {
    this._refreshData(this.state.data);
    this._fetch();
  }

  _refreshData = (data) => {
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    if (data !== undefined) {
      this.setState({
        dataSource: ds.cloneWithRows(data),
        data: data
      });
    }
  };

  _navigateToProfile = (contact) => {
    this.props.navigator.push(Router.getRoute('profile', {profil: contact}));
  };

  _fetch = async () => {
    const {dispatch, selectedCompte} = this.props;
    await dispatch(fetchContactsDuCompte(selectedCompte));
    if (this.props.data !== undefined && this.props.data.length > 0) {
      this._refreshData(this.props.data);
    }
  };

  _updateIndex = async (rowID, rowData) => {
    let dataClone = this.state.data;
    let selectedRow = rowID;
    if (this.state.selectedRow === null) {
      rowData.isSelect = true;
    } else {
      if (this.state.selectedRow === rowID) {
        rowData.isSelect = false;
        selectedRow = null;
      } else {
        rowData.isSelect = true;
        dataClone[this.state.selectedRow].isSelect = false;
      }
    }
    dataClone[rowID] = rowData;
    this._refreshData(dataClone);
    this.setState({
      selectedRow: selectedRow
    });
  };

  _renderSubRow = (data) => {
    let s = {};
    if (!data.isSelect) {
      s = {display: 'none'};
    }
    return (
      <View style={s}>
        <SubMenuContact phone={'+33628492664'} email={'jul.79000@gmail.com'}
                        toProfile={() => this._navigateToProfile(data)}/>
      </View>);
  };

  _renderRow = (data, sectionID, rowID) => {
    return (
      <TouchableOpacity onPress={() => this._updateIndex(rowID, data)}>
        <Divider/>
        <View>
          <Text style={styles.primary} numberOfLines={1}>
            {data.cct_nom + ' ' + data.cct_pre}
          </Text>
        </View>
        <View>
          <Text style={styles.secondary} numberOfLines={1}>
            {data.fonction_nom}
          </Text>
        </View>
        {this._renderSubRow(data)}
        <Divider/>
      </TouchableOpacity>
    );
  };

  render() {
    const {selectedCompte} = this.props;
    return (
      <View>
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => {
            this.props.navigator.pop();
          }}
          centerElement={'Contacts'}
        />
        <Jumbotron primaryText={selectedCompte.clt_nom}
                   secoundaryText={selectedCompte.etatclt_nom}
                   thirdText={`${selectedCompte.clt_adr1} \n ${selectedCompte.clt_cp} ${selectedCompte.clt_ville}`}/>
        <ListView
          dataSource={this.state.dataSource}
          style={{height: '90%'}}
          renderRow={this._renderRow}
          enableEmptySections={true}
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
  const {comptes} = state;
  return {
    selectedCompte: comptes.selectedCompte,
    data: comptes.contacts
  }
};

export default connect(mapStateToProps)(ContactsScreen);