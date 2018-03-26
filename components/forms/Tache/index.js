/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import { View, StyleSheet, ScrollView, Text, Picker, TouchableOpacity } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import { Form, Item, Input, Label, Textarea } from 'native-base';
import DatePicker from 'react-native-datepicker';
import { connect } from "react-redux";
import { fetchTaskPriority, fetchTaskStatus } from "../../../actions/render";
import Autocomplete from 'react-native-autocomplete-input';
import { findAccountForForm } from "../../../actions/comptes";
import { findContactForForm } from "../../../actions/contacts";
import { Select, Option } from "react-native-chooser";
import Button from '../../../components/Button';

class TaskForm extends React.Component {

  state = {
    nom: '',
    status: 0,
    statusName: '',
    priorite: 0,
    prioriteName: '',
    dateEcheance: new Date(),
    heureEcheance: new Date(),
    compte: '',
    contact: '',
    rappel: 0,
    rappelLabel:'',
    commentaires: '',
    comptes: this.props.comptes,
    query: '',
    contacts: this.props.contacts,
    queryContact: ''
  };

  async componentWillMount() {
    const {dispatch} = this.props;
    await dispatch(fetchTaskStatus());
    await dispatch(fetchTaskPriority());
    await this.setState({statusName: this.props.taskStatus[0].text, prioriteName: this.props.taskPriority[0].text})
  }

  onValueChange = (field, value) => {
    let actualState = this.state;
    actualState[field] = value;
    this.state = actualState;
  };

  _validate = async () => {
    const {dispatch} = this.props;
    const task = {
      "even_id": 1,
      "even_nom": "string",
      "nmr": "string",
      "agt_id": 1,
      "priorite": 1,
      "priorite_nom": "string",
      "statut_id": this.state.status,
      "statut_nom": this.state.statusName,
      "type_coul_fond": "string",
      "type_coul_car": "string",
      "clt_id": 1,
      "clt_nom": "string",
      "clt_pre": "string",
      "clt_nmr": "string",
      "clt_cp": "string",
      "clt_ville": "string",
      "cct_id": 1,
      "cct_nom": "string",
      "cct_pre": "string",
      "cct_cp": "string",
      "cct_ville": "string",
      "debut": "2017-10-10",
      "debut_h": "14:00",
      "comm": "string",
      "comm_htm": "string"
    };
    //await dispatch(addTask(task));
    //this.props.navigator.pop();
    this.props.navigator.showLocalAlert('Erreur lors de l\'ajout d\'une tâche', {
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
          centerElement={'Créer une Tâche'}
        />
        <ScrollView>
          <Item style={styles.item} floatingLabel last>
            <Label>Nom :</Label>
            <Input onChangeText={(text) => this.setState({nom: text})}/>
          </Item>
          <Text style={styles.secondaryText}>Rechercher</Text>
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
                        renderItem={(contact) => {
                          return (
                            <TouchableOpacity onPress={() => this.setState({
                              queryContact: contact.cct_nom,
                              contacts: [],
                              contact: contact
                            })}>
                              <Text style={{fontSize: 22}}>
                                {contact.cct_nom}
                              </Text>
                            </TouchableOpacity>
                          )
                        }}/>

          <Select
            defaultText={this.state.statusName} optionListStyle = {styles.options}
            style={styles.select}
            onSelect={(itemValue, itemLabel) => this.setState({status: itemValue, statusName: itemLabel})}>
            {this.props.taskStatus.map((state, index) => {
              return <Option key={index} value={state.id}>{state.text}</Option>
            })}
          </Select>
          <Select
            defaultText={this.state.prioriteName} optionListStyle = {styles.options}
            style={styles.select}
            onSelect={(itemValue, itemLabel) => this.setState({priorite: itemValue, prioriteName: itemLabel})}>
            {this.props.taskPriority.map((state, index) => {
              return <Option key={index} value={state.id}>{state.text}</Option>
            })}
          </Select>
          <DatePicker
            style={{width: '95%', margin: 15}}
            date={this.state.dateEcheance}
            mode="date"
            placeholder="select date"
            format="DD/MM/YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => {
              this.setState({dateEcheance: date})
            }}/>
          <DatePicker
            style={{width: '95%', margin: 15}}
            date={this.state.heureEcheance}
            mode="time"
            placeholder="select date"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => {
              this.setState({heureEcheance: date})
            }}/>
          <Select
            defaultText={this.state.rappelLabel} optionListStyle = {styles.options}
            style={styles.select}
            onSelect={(itemValue, itemLabel) => this.setState({rappel: itemValue, rappelLabel: itemLabel})}>
            <Option value={0}>Notification</Option>
            <Option value={1}>Mail</Option>
          </Select>
          <Item style={styles.item} floatingLabel last>
            <Label>Commentaires :</Label>
            <Textarea onChangeText={(text) => this.setState({commentaires: text})}/>
          </Item>
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
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    marginTop: 15,
  },
  search: {
    margin: 20,
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
  secondaryText: {
    fontSize: 16,
    marginLeft: '5%',
    color: '#1B435D',
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15,

  },
});

const mapStateToProps = (state) => {
  const {renderReducer, comptes, contacts} = state;
  return {
    taskStatus: renderReducer.taskStatus,
    taskPriority: renderReducer.taskPriority,
    comptes: comptes.comptesForm,
    contacts: contacts.contactsForm
  }
};

export default connect(mapStateToProps)(TaskForm);
