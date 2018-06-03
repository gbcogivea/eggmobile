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
import { addContact, fetchContacts, findContactForForm, updateContact } from "../../../actions/contacts";
import { Select, Option } from "react-native-chooser";
import Button from '../../../components/Button';
import { addTask, updateEvent, updateTask } from "../../../actions/planning";
import { tache as validator } from '../../../utils/validators';

class TaskForm extends React.Component {

  state = {
    nom: this.props.route.params.task ? this.props.route.params.task.even_nom : '',
    status: this.props.route.params.task ? this.props.route.params.task.status_id : 0,
    statusName: this.props.route.params.task ? this.props.route.params.task.status_nom : '',
    priorite: this.props.route.params.task ? this.props.route.params.task.priorite : 0,
    prioriteName: this.props.route.params.task ? this.props.route.params.task.priorite_nom : '',
    dateEcheance: this.props.route.params.task ? this.props.route.params.task.debut : new Date(),
    heureEcheance: this.props.route.params.task ? this.props.route.params.task.debut_h : new Date(),
    compte: this.props.route.params.task ? {
      clt_id: this.props.route.params.task.clt_id,
      clt_nom: this.props.route.params.task.clt_nom,
      clt_pre: this.props.route.params.task.clt_pre,
      clt_cp: this.props.route.params.task.clt_cp,
      clt_ville: this.props.route.params.task.clt_ville
    } : {},
    contact: this.props.route.params.task ? {
      cct_id: this.props.route.params.task.cct_id,
      cct_nom: this.props.route.params.task.cct_nom,
      cct_pre: this.props.route.params.task.cct_pre,
      cct_cp: this.props.route.params.task.cct_cp,
      cct_ville: this.props.route.params.task.cct_ville
    } : {},
    rappel: 0,
    rappelLabel: '',
    commentaires: this.props.route.params.task ? this.props.route.params.task.comm : '',
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
    const {dispatch, connectedUser} = this.props;
    const contact = this.state.contact;
    const compte = this.state.compte;

    const task = {
      "even_id": this.props.route.params.task ? this.props.route.params.task.even_id : null,
      "even_nom": this.state.nom,
      //"nmr": "string",
      "agt_id": connectedUser.agt_id,
      "priorite": this.state.priorite,
      "priorite_nom": this.state.prioriteName,
      //"statut_id": this.state.status,
      //"statut_nom": this.state.statusName,
      //"type_coul_fond": "string",
      //"type_coul_car": "string",
      "clt_id": compte.clt_id,
      "clt_nom": compte.clt_nom,
      "clt_pre": compte.clt_pre,
      "clt_nmr": compte.clt_nmr,
      "clt_cp": comtpe.clt_cp,
      "clt_ville": compte.clt_ville,
      "cct_id": contact.cct_id,
      "cct_nom": contact.cct_nom,
      "cct_pre": contact.cct_pre,
      "cct_cp": contact.cct_cp,
      "cct_ville": contact.cct_ville,
      "debut": this.state.dateEcheance,
      "debut_h": this.state.heureEcheance,
      "comm": this.props.route.params.task.comm,
      "comm_htm": this.props.route.params.task.comm
    };
    try {
      validator(task);
      if (this.props.route.params.task) {
        await dispatch(updateTask(task, this.props.route.params.task.even_id));
        const message = 'Mise à jour réussie';
        this.props.navigator.showLocalAlert(message, {
          text: {color: '#fff'},
          container: {backgroundColor: '#4BB543'},
        });
      } else {
        await dispatch(addTask(task));
        const message = 'Tâche Créée';
        this.props.navigator.showLocalAlert(message, {
          text: {color: '#fff'},
          container: {backgroundColor: '#4BB543'},
        });
      }
      //TODO refresh data
      this.props.navigator.pop();
    } catch (err) {
      this.props.navigator.showLocalAlert(err.message, {
        text: {color: '#fff'},
        container: {backgroundColor: '#F44336'},
      });
    };
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
