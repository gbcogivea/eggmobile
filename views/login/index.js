/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import { Form, Item, Input, Label } from 'native-base';
import { connect } from 'react-redux';
import { login } from '../../actions/contacts';
import Button from "../../components/Button";
import DrawerNavigationExample from '../../components/DrawerNavigationExample'

class LoginScreen extends React.Component {

  state = {
    login: '',
    pass: '',
    token: ''
  };

  _login = () => {
    const {dispatch} = this.props;
    //TODO vérifier des trucs
    dispatch(login(this.state));
  };

  render() {
    return (
      <View style={styles.container}>
        {typeof this.props.connectedUser.ggle_login === 'undefined' &&
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.textIntro}>Bonjour,</Text>
            <Text style={styles.textIntro}>veuillez vous identifier</Text>
          </View>
          <Form style={styles.form}>
            <Item floatingLabel>
              <Label style={{color:'#FFF'}}>Login</Label>
              <Input style={{color:'#FFF'}} value={this.state.login} onChangeText={(text) => this.setState({login: text})}/>
            </Item>
            <Item floatingLabel>
              <Label style={{color:'#FFF'}}>Mot de Passe</Label>
              <Input style={{color:'#FFF'}} value={this.state.pass} onChangeText={(text) => this.setState({pass: text})}/>
            </Item>
            <Item floatingLabel>
              <Label style={{color:'#FFF'}}>Token</Label>
              <Input style={{color:'#FFF'}} value={this.state.token} onChangeText={(text) => this.setState({token: text})}/>
            </Item>
          </Form>
          <Button title="Login" onPress={() => this._login()}/>
        </View>
        }
        {
          typeof this.props.connectedUser.ggle_login !== 'undefined' &&
          <View style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <DrawerNavigationExample/>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2196F3',
  },
  textIntro: {
    fontSize: 28,
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 34,
  },
  textContainer: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#FFF',
  },
  form: {
    marginTop: 40,
  },
});

const mapStateToProps = (state) => {
  const {renderReducer} = state;
  return {
    connectedUser: renderReducer.connectedUser,
    isLoading: renderReducer.loading
  }
};

export default connect(mapStateToProps)(LoginScreen);