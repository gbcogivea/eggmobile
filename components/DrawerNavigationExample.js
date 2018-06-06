import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import {
  StackNavigation,
  DrawerNavigation,
  DrawerNavigationItem,
} from '@expo/ex-navigation';
import { Ionicons } from '@expo/vector-icons';
import { Router } from '../main';
import { connect } from "react-redux";
import * as Constantes from "../constantes";

class DrawerNavigationExample extends Component {
  _renderHeader = () => {
    return (
      <View style={{height: 180, width: 300}}>
        <Image
          source={require('../assets/sparkles.jpg')}
          style={styles.header}
        />
      </View>
    );
  };

  _renderTitle = (text, isSelected) => {
    return (
      <Text
        style={[
          styles.buttonTitleText,
          isSelected ? styles.selectedText : null,
        ]}>
        {text}
      </Text>
    );
  };

  _renderIcon = (name: string, isSelected) => {
    let extraStyle = {marginTop: 2};
    if (name === 'md-alert') {
      extraStyle = {...extraStyle, marginLeft: -3};
    }
    return (
      <Ionicons
        style={[
          styles.icon,
          isSelected ? styles.selectedText : null,
          extraStyle,
        ]}
        name={name}
        size={24}
      />
    );
  };

  render() {
    const {access} = this.props;
    return (
      <DrawerNavigation
        navigatorUID="MainDrawer"
        drawerPosition="left"
        drawerWidth={300}
        initialItem="home">
        <DrawerNavigationItem
          id="home"
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this._renderTitle('Accueil', isSelected)}
          renderIcon={isSelected => this._renderIcon('md-home', isSelected)}>
          <StackNavigation id="home" initialRoute={Router.getRoute('home')}/>
        </DrawerNavigationItem>
        {access.agenda === "Y" &&
        <DrawerNavigationItem
          id="agenda"
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this._renderTitle('Agenda', isSelected)}
          renderIcon={isSelected => this._renderIcon('md-calendar', isSelected)}>
          <StackNavigation id="agenda" initialRoute={Router.getRoute('agenda')}/>
        </DrawerNavigationItem>}
        {access.contact > 0 &&
        <DrawerNavigationItem
          id="contact"
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this._renderTitle('Contacts', isSelected)}
          renderIcon={isSelected => this._renderIcon('md-contact', isSelected)}>
          <StackNavigation id="contact" initialRoute={Router.getRoute('contact')}/>
        </DrawerNavigationItem>}
        <DrawerNavigationItem
          id="compte"
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this._renderTitle('Comptes', isSelected)}
          renderIcon={isSelected => this._renderIcon('md-filing', isSelected)}>
          <StackNavigation id="compte" initialRoute={Router.getRoute('compte')}/>
        </DrawerNavigationItem>
        {access.affaire > 0 &&
        <DrawerNavigationItem
          id="affaire"
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this._renderTitle('Affaires', isSelected)}
          renderIcon={isSelected => this._renderIcon('md-folder', isSelected)}>
          <StackNavigation id="affaire" initialRoute={Router.getRoute('affaire')}/>
        </DrawerNavigationItem>}
        {access.geolocalisation === "Y" &&
        <DrawerNavigationItem
          id="geo"
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this._renderTitle('Geo', isSelected)}
          renderIcon={isSelected => this._renderIcon('md-map', isSelected)}>
          <StackNavigation id="geo" initialRoute={Router.getRoute('geo')}/>
        </DrawerNavigationItem>}
        {access.gedrep > 0 &&
        <DrawerNavigationItem
          id="document"
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this._renderTitle('Documents', isSelected)}
          renderIcon={isSelected => this._renderIcon('md-document', isSelected)}>
          <StackNavigation id="document" initialRoute={Router.getRoute('document')}/>
        </DrawerNavigationItem>}
        <DrawerNavigationItem
          id="logout"
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this._renderTitle('Déconnexion', isSelected)}
          renderIcon={isSelected => this._renderIcon('md-log-out', isSelected)}>
          <StackNavigation id="logout" initialRoute={Router.getRoute('logout')}/>
        </DrawerNavigationItem>
      </DrawerNavigation>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    height: 180,
    width: null,
    resizeMode: 'cover',
  },
  buttonTitleText: {
    color: '#222',
    fontWeight: 'bold',
    marginLeft: 18,
  },
  icon: {
    width: 24,
    height: 24,
  },
  selectedText: {
    color: '#0084FF',
  },
  selectedItemStyle: {
    backgroundColor: '#E8E8E8',
  },
});

const mapStateToProps = (state) => {
  const {renderReducer} = state;
  return {
    access: renderReducer.access
  }
};

export default connect(mapStateToProps)(DrawerNavigationExample);
