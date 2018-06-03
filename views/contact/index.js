/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ListView, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Contacts from '../../components/listContacts';
import { fetchContactsPage, fetchContacts, searchContact } from '../../actions/contacts';
import { Router } from "../../main";
import { findAccount } from "../../actions/comptes";
import SubMenuContact from "../../components/subMenuContact";
import { Divider } from 'react-native-material-ui';
import MenuButtonComptes from "../../components/MenuButtonComptes";

class ContactsScreen extends React.Component {
  state = {
    dataSource: null,
    start: this.props.data.length,
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

  _searchContact = async (value) => {
    const {dispatch} = this.props;
    await dispatch(searchContact(value, 0, 100));
    await this.setState({data: this.props.data, search: value, start: 0});
    this._refreshData(this.state.data);
  };

  _fetch = async () => {
    const {dispatch} = this.props;
    await dispatch(fetchContacts(this.state.start, 15));
    this._increment();
    if (this.props.data !== undefined && this.props.data.length > 0) {
      if (this.state.data.length === 0) {
        let data = this.state.data.concat(this.props.data);
        this._refreshData(data);
      } else {
        if (this.state.data[this.state.data.length - 1][this.props.idField] !== this.props.data[9][this.props.idField]) {
          let data = this.state.data.concat(this.props.data);
          this._refreshData(data);
        }
      }
    }
  };

  __onSearchClosed = async () => {
    await this.setState({start: 0, search: '', data: []});
    this._refreshData(this.state.data);
    await this._fetch();
  };


  _increment = () => {
    this.setState(prevState => ({start: prevState.start + this.props.listLength}));
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
    let mail = data.cct_mail;
    let phone = '';
    if (data.cct_port !== '') {
      phone = data.cct_port;
    } else if (data.cct_tel !== '') {
      phone = data.cct_tel;
    } else if (data.cct_tel2 !== '') {
      phone = data.cct_tel2;
    }
    return (
      <View style={s}>
        <SubMenuContact phone={phone.split('.').join('').trim()}
                        email={mail}
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
    return (
      <View>
        <Header search={true}
                title='Contacts'
                navigation={this.props.navigation}
                onChangeText={(value) => this._searchContact(value)}
                onSearchClosed={() => this.__onSearchClosed()}/>
        <ListView
          dataSource={this.state.dataSource}
          style={{height: '90%'}}
          renderRow={this._renderRow}
          onEndReached={() => this._fetch()}
          enableEmptySections={true}
        />
        <MenuButtonComptes/>
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
  const {contacts} = state;
  return {
    data: contacts.contacts
  }
};

export default connect(mapStateToProps)(ContactsScreen);
