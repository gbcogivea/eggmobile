/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { sendSms, call, checkValue, sendEmail, openMap } from '../../utils/utils';
import { Toolbar, Divider } from 'react-native-material-ui';
import { connect } from 'react-redux';
import { findContact } from '../../actions/contacts';
import { Router } from "../../main";
import Jumbotron from '../../components/jumbotron/jumbotronContact';

class Profile extends React.Component {

  componentWillMount() {
    const {dispatch, profil} = this.props;
    dispatch(findContact(profil.cct_id));
  }

  _handleMail = () => {
    sendEmail(this.props.selectedCompte.email);
  };

  _handleCall = (phone) => {
    call(phone);
  };

  _handleMessage = (phone) => {
    sendSms(phone);
  };

  render() {
    const iconSize = 24;
    const {selectedProfile} = this.props;
    const profile = selectedProfile;
    return (
      <View>
        <Toolbar
          leftElement="arrow-back"
          rightElement="mode-edit"
          onRightElementPress={() => this.props.navigator.push(Router.getRoute('createContact', {profile}))}
          onLeftElementPress={() => {
            this.props.navigator.pop();
          }}
          centerElement={'Profil'}
        />
        <Jumbotron primaryText={profile.cct_nom + ' ' + profile.cct_pre}
                   secoundaryText={profile.fonction_nom}/>
        {checkValue(profile.cct_tel) && <Text style={styles.primaryText}>Téléphones</Text>}
        {checkValue(profile.cct_tel) && <View style={styles.row}>
          <Text style={styles.address}>{profile.cct_tel}</Text>
          <MaterialIcons style={styles.item} onPress={() => this._handleCall(profile.cct_tel)} name="call"
                         size={iconSize} color="#239D60"/>
          <MaterialIcons style={styles.item} onPress={() => this._handleMessage(profile.cct_tel)} name="chat"
                         size={iconSize} color="#239D60"/>
          <FontAwesome style={styles.item} onPress={() => this._handleCall(profile.cct_tel)}
                       name="video-camera"
                       size={iconSize} color="#239D60"/>
        </View>}
        {checkValue(profile.cct_tel) && <Divider/>}
        {checkValue(profile.cct_tel2) && <View style={styles.row}>
          <Text style={styles.address}>{profile.cct_tel2}</Text>
          <MaterialIcons style={styles.item} onPress={() => this._handleCall(profile.cct_tel2)} name="call"
                         size={iconSize} color="#239D60"/>
          <MaterialIcons style={styles.item} onPress={() => this._handleMessage(profile.cct_tel2)} name="chat"
                         size={iconSize} color="#239D60"/>
          <FontAwesome style={styles.item} onPress={() => this._handleCall(profile.cct_tel2)}
                       name="video-camera"
                       size={iconSize} color="#239D60"/>
        </View>}
        {checkValue(profile.cct_tel2) && <Divider/>}
        {checkValue(profile.cct_port) && <View style={styles.row}>
          <Text style={styles.address}>{profile.cct_port}</Text>
          <MaterialIcons style={styles.item} onPress={() => this._handleCall(profile.cct_port)} name="call"
                         size={iconSize} color="#239D60"/>
          <MaterialIcons style={styles.item} onPress={() => this._handleMessage(profile.cct_port)} name="chat"
                         size={iconSize} color="#239D60"/>
          <FontAwesome style={styles.item} onPress={() => this._handleCall(profile.cct_port)}
                       name="video-camera"
                       size={iconSize} color="#239D60"/>
        </View>}
        {checkValue(profile.cct_port) && <Divider/>}
        {checkValue(profile.cct_mail) && <Text style={styles.primaryText}>Email</Text>}
        {checkValue(profile.cct_mail) && <View style={styles.row}>
          <Text style={styles.address}>{profile.cct_mail}</Text>
          <Ionicons style={styles.item} onPress={() => this._handleMail(profile.cct_mail)}
                    name="ios-mail-outline"
                    size={32} color="#239D60"/>
        </View>}
        {checkValue(profile.cct_mail) && <Divider/>}
        {checkValue(profile.cct_adr1) && checkValue(profile.cct_ville) &&
        <Text style={styles.primaryText}>Adresse</Text>}
        {checkValue(profile.cct_adr1) && checkValue(profile.cct_ville) &&
        <View style={styles.row}>
          <View style={styles.secoundaryView}>
            <Text
              style={styles.address}>{profile.cct_adr1}</Text>
            <Text
              style={styles.address}>{profile.cct_cp + ' ' + profile.cct_ville}</Text>
          </View>
          <FontAwesome style={styles.item} onPress={() => openMap(profile.cct_adr1, profile.cct_cp, profile.cct_ville)} name="map-o"
                       size={iconSize} color="#239D60"/>
        </View>}
        {checkValue(profile.cct_adr1) && checkValue(profile.cct_ville) && <Divider/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '2%',
    marginTop: 10,
    marginBottom: 10,
  },
  item: {
    marginLeft: 20,
    marginRight: 20,
  },
  primaryText: {
    fontSize: 12,
    color: 'grey',
    paddingLeft: '2%',
    paddingTop: 15,
  },
  secondaryText: {
    flex: 0.5,
    fontSize: 10,
    color: 'grey',
    margin: 10
  },
  secoundaryView: {
    flex: 0.5,
    margin: 10
  },
  email: {
    fontSize: 10,
    color: 'grey',
    marginBottom: 20
  },
  address: {
    color: '#1B435D',
    fontSize: 16,
    paddingLeft: '2%',
  },
  address2: {
    color: '#78BBE6',
    fontSize: 12,
    paddingTop: '1%',
    paddingLeft: '2%'
  }
});

const mapStateToProps = (state) => {
  const {contacts} = state;
  return {
    selectedProfile: contacts.selectedContact
  }
};

export default connect(mapStateToProps)(Profile);
