/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Toolbar, COLOR } from 'react-native-material-ui';
import { Container, Content, Form, Item, Input, Label, Picker, Textarea } from 'native-base';
import Moment from 'moment';
import Demo from '../../calendar';
import DatePicker from 'react-native-datepicker';
import { Select, Option } from "react-native-chooser";
import Autocomplete from 'react-native-autocomplete-input';
import { connect } from "react-redux";
import { fetchEventStatus, fetchEventType, fetchSources } from "../../../actions/render";
import { findAccountForForm } from "../../../actions/comptes";
import { findContactForForm } from "../../../actions/contacts";
import Button from '../../../components/Button';

var radio_props = [
  {label: 'param1', value: 0},
  {label: 'param2', value: 1}
];

const PickerItem = Picker.Item;

class Event extends React.Component {
  state = {
    nom: '',
    debut: '',
    fin: '',
    type: 0,
    typeLabel: 'Type',
    rappel: 0,
    rappelLabel: 'Rappel',
    compte: {},
    contact: {},
    lieu: '',
    commentaires: '',
    status: 0,
    statusLabel:'Status',
    step: 0,
    stepLabel: 'TODO',
    canal:0,
    canalLabel: 'TODO',
    source: 0,
    sourceLabel:'Source'
  };

  async componentWillMount() {
    const {dispatch} = this.props;
    await dispatch(fetchEventStatus());
    await dispatch(fetchEventType());
    await dispatch(fetchSources());
  }

  onValueChange = (value) => {
    this.setState({
      selected1: value
    });
  };

  _validate = () => {
    this.props.navigator.showLocalAlert('Erreur lors de l\'ajout d\'un événement', {
      text: { color: '#fff' },
      container: { backgroundColor: '#F44336' },
    });
  };

  _findComptes = async (query) => {
    if (query === '') {
      return [];
    }

    const {dispatch} = this.props;
    await dispatch(findAccountForForm(query, 0, 10));
    const {comptes} = this.props;
    return comptes;
  };

  _findContacts = async (query) => {
    if (query === '') {
      return [];
    }

    const {dispatch} = this.props;
    await dispatch(findContactForForm(query, 0, 10));
    const {contacts} = this.props;
    return contacts;
  };

  componentWillReceiveProps(nextProps) {
    this.setState({comptes: nextProps.comptes, contacts: nextProps.contacts})
  }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => {
            this.props.navigator.pop();
          }}
          centerElement={'Créer un Evenement'}
        />
        <ScrollView>
          <Item style={styles.item} floatingLabel last>
            <Label>Nom</Label>
            <Input onChangeText={(text) => this.setState({nom: text})}/>
          </Item>
          <DatePicker
            style={{width: '95%', margin: 15}}
            date={this.state.debut}
            mode="datetime"
            placeholder="Début"
            format="DD/MM/YYYY HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => {
              this.setState({debut: date})
            }}/>
          <DatePicker
            style={{width: '95%', margin: 15}}
            date={this.state.fin}
            mode="datetime"
            placeholder="Fin"
            format="DD/MM/YYYY HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => {
              this.setState({fin: date})
            }}/>
          <Select
            defaultText={this.state.typeLabel} optionListStyle = {styles.options}
            style={styles.select}
            onSelect={(itemValue, itemLabel) => this.setState({type: itemValue, typeLabel: itemLabel})}>
            {this.props.eventTypes.map((state, index) => {
              return <Option key={index} value={state.id}>{state.text}</Option>
            })}
          </Select>
          <Select
            defaultText={this.state.rappelLabel} optionListStyle = {styles.options}
            style={styles.select}
            onSelect={(itemValue, itemLabel) => this.setState({rappel: itemValue, rappelLabel: itemLabel})}>
            <Option value={0}>Notifications</Option>
            <Option value={1}>Echéance</Option>
          </Select>

          <Autocomplete style={styles.search}
                        autoCapitalize="none"
                        autoCorrect={false}
                        data={this.state.comptes}
                        defaultValue={this.state.query}
                        onChangeText={(text) => {
                          if (text === '') {
                            this.setState({query: text, comptes: []});
                          } else {
                            this.setState({query: text});
                            this._findComptes(text)
                          }
                        }}
                        placeholder="Rechercher un compte"
                        renderItem={(compte) => {
                          return (
                            <TouchableOpacity style={{zIndex: 1000}} onPress={() => this.setState({
                              query: compte.clt_nom,
                              comptes: [],
                              compte: compte
                            })}>
                              <Text style={{fontSize: 22}}>
                                {compte.clt_nom}
                              </Text>
                            </TouchableOpacity>
                          )
                        }}/>
          <Text/>
          <Text/>

          <Autocomplete style={styles.search}
                        autoCapitalize="none"
                        autoCorrect={false}
                        data={this.state.contacts}
                        defaultValue={this.state.queryContact}
                        onChangeText={(text) => {
                          if (text === '') {
                            this.setState({queryContact: text, contacts: []});
                          } else {
                            this.setState({queryContact: text});
                            this._findContacts(text)
                          }
                        }}
                        placeholder="Rechercher un contact"
                        renderItem={(compte) => {
                          return (
                            <TouchableOpacity style={{zIndex: 1000}} onPress={() => this.setState({
                              queryContact: compte.clt_nom,
                              contacts: [],
                              contact: compte
                            })}>
                              <Text style={{fontSize: 22}}>
                                {compte.cct_nom}
                              </Text>
                            </TouchableOpacity>
                          )
                        }}/>

          <Item style={styles.item} floatingLabel last>
            <Label>Lieu :</Label>
            <Input onChangeText={(text) => this.setState({nom: text})}/>
          </Item>
          <Item style={styles.item} floatingLabel last>
            <Label>Commentaires :</Label>
            <Textarea onChangeText={(text) => this.setState({nom: text})}/>
          </Item>
          <Select
            defaultText={this.state.statusLabel} optionListStyle = {styles.options}
            style={styles.select}
            onSelect={(itemValue, itemLabel) => this.setState({status: itemValue, statusLabel: itemLabel})}>
            {this.props.eventStatus.map((state, index) => {
              return <Option key={index} value={state.id}>{state.text}</Option>
            })}
          </Select>
          <Select
            defaultText={this.state.stepLabel} optionListStyle = {styles.options}
            style={styles.select}
            onSelect={(itemValue, itemLabel) => this.setState({step: itemValue, stepLabel: itemLabel})}>

          </Select>
          <Select
            defaultText={this.state.canalLabel} optionListStyle = {styles.options}
            style={styles.select}
            onSelect={(itemValue, itemLabel) => this.setState({canal: itemValue, canalLabel: itemLabel})}>

          </Select>
          <Select
            defaultText={this.state.sourceLabel} optionListStyle = {styles.options}
            style={styles.select}
            onSelect={(itemValue, itemLabel) => this.setState({source: itemValue, sourceLabel: itemLabel})}>
            {this.props.sources.map((state, index) => {
              return <Option key={index} value={state.id}>{state.text}</Option>
            })}
          </Select>
          <Button onPress={() => this._validate()} accent title="Valider"
                  backgroundColor={'#2196F3'} color={'#FFF'}/>
        </ScrollView>
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
  options: {
    width:'100%',
    height:'100%'
  },
  select: {
    width:'95%',
    margin:10,
    borderColor:'grey'
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    marginTop: 15,
  }
});


const mapStateToProps = (state) => {
  const {renderReducer, comptes, contacts} = state;
  return {
    eventTypes: renderReducer.eventTypes,
    eventStatus: renderReducer.eventStatus,
    comptes: comptes.comptesForm,
    contacts: contacts.contactsForm,
    sources: renderReducer.sources
  }
};

export default connect(mapStateToProps)(Event);
