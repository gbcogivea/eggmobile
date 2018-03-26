/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import { View, Text } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import { connect } from 'react-redux';
import { compteAffaire, contactAffaire } from "../../actions/affaires";

class CommunicationAffaire extends React.Component {

  async componentWillMount() {
    const {dispatch, data} = this.props;
    await dispatch(compteAffaire(data.aff_id));
    await dispatch(contactAffaire(data.aff_id));
  }

  _renderCompte = () => {
    const {compte} = this.props;
    return (
      <View>
        <Text>Compte : {compte.clt_nom}</Text>
        <Text>Adresse : {compte.clt_adr1}</Text>
        <Text>{compte.clt_cp + ' ' + compte.clt_ville}</Text>
        <Text>Email : {compte.clt_mail}</Text>
        <Text>Tel : {compte.clt_tel}</Text>
        <Text>Tel2 : {compte.clt_tel2}</Text>
        <Text>Fax : {compte.clt_fax}</Text>
        <Text>Mobile : {compte.clt_port}</Text>
      </View>
    )
  };

  _renderContact = () => {
    const {contact} = this.props;
    return (
      <View>
        <Text>Contact : {contact.cct_pre + ' ' + contact.cct_nom}</Text>
        <Text>Fonction : {contact.fonction_nom}</Text>
        <Text>Email : {contact.cct_mail}</Text>
        <Text>Tel : {contact.cct_tel}</Text>
        <Text>Tel2 : {contact.cct_tel2}</Text>
        <Text>Mobile : {contact.cct_port}</Text>
      </View>
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
          centerElement={'Compte et contact'}
        />
        {this._renderCompte()}
        <Text/>
        {this._renderContact()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {affaires} = state;
  return {
    compte: affaires.compteAffaire,
    contact: affaires.contact
  }
};

export default connect(mapStateToProps)(CommunicationAffaire);