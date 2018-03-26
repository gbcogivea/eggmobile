/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import { View, WebView, Image } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import { getRestAddress } from "../../utils/utils";
import request from "axios/index";

export default class WebViewDocs extends React.Component {
  state = {
    host:{}
  };

  componentWillMount() {

    const{document, agt_id} = this.props.route.params;
    const host = getRestAddress();
    const fileAddress = host + '/user/' + agt_id + "/gedexp?file=" + document.fichier + "&root=" + document.arbo;
    const options = {
      method: 'GET',
      url: fileAddress,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    request(options)
      .then((res) => {
        console.log(res)
      }).done();
  }

  render() {
    const{document, agt_id} = this.props.route.params;
    const host = getRestAddress();
    const fileAddress = host + '/user/' + agt_id + "/gedexp?file=" + document.fichier + "&root=" + document.arbo;
    console.log(fileAddress);
    return (
      <View>
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => {
            this.props.navigator.pop();
          }}
          centerElement={document.fichier}
        />
        <WebView style={{height:1000}} source={{uri: "http://www.pdf995.com/samples/pdf.pdf"}}/>
      </View>
    );
  }
}
