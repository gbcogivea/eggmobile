/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import { View, StyleSheet, Text, Button, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fetchDocuments } from "../../actions/documents";
import Header from '../../components/Header';
import {Divider} from 'react-native-material-ui';
import { Router } from "../../main";

class Documents extends React.Component {
  state = {racineFolder: true};

  async componentWillMount() {
    const {dispatch, connectedUser} = this.props;
    await dispatch(fetchDocuments(connectedUser.agt_id));
  }

  _renderDocuments = () => {
    return this.props.documents.map((document, index) => {
      return (
        <TouchableOpacity key={index} onPress={() => this.props.navigator.push(Router.getRoute('detailDoc', {document, agt_id: this.props.connectedUser.agt_id}))}>
          <Text style={styles.item}>{document.fichier}</Text>
          <Divider/>
        </TouchableOpacity>
      )
    });
  };

  render() {
    return (
      <View>
        <Header
                title='Documents'
                navigation={this.props.navigation}/>
        {this._renderDocuments()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    color:'#1B435D',
    paddingLeft: '3%',
    margin:20,
    fontSize:16
  }
});

const mapStateToProps = (state) => {
  const {documents, renderReducer} = state;
  return {
    documents: documents.documents,
    connectedUser: renderReducer.connectedUser
  }
};

export default connect(mapStateToProps)(Documents);
