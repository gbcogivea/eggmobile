/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import { View, Text, ScrollView, Picker, TouchableOpacity, StyleSheet } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import { Form, Item, Input, Label, Textarea } from 'native-base';
import { connect } from "react-redux";
import { fetchContacts, addContact } from "../../../actions/contacts";
import { findAccountForForm } from "../../../actions/comptes";
import Autocomplete from 'react-native-autocomplete-input';
import { Select, Option } from "react-native-chooser";
//TODO enlever la barre sur android et fermer la selection sur la perte du focus
import Button from '../../../components/Button';
import { fetchSources } from "../../../actions/render";

class ContactForm extends React.Component {
  state = {
    civilite: 0,
    civiliteLabel: 'Civilité',
    nom: '',
    prenom: '',
    telephone: '',
    mobile: '',
    email: '',
    affiliation: {},
    telephone2: '',
    fax: '',
    source: 0,
    sourceLabel: 'Source',
    sourcesNom: '',
    commentaires: '',
    comptes: this.props.comptes,
    query: ''
  };

  async componentWillMount() {
    const {dispatch} = this.props;
    await dispatch(fetchSources());
  }

  onCiviliteValueChange = (value) => {
    this.setState({
      civilite: value
    });
  };

  onSourceValueChange = (value) => {
    this.setState({
      source: value
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

  componentWillReceiveProps(nextProps) {
    this.setState({comptes: nextProps.comptes})
  }

  _validate = async () => {
    const contact = {
      //"cct_id": 1,
      "cct_nom": this.state.nom,
      "civilite_id": this.state.civilite,
      "civilite_nom": this.state.prenom,
      //"fonction_id": 0,
      //"fonction_nom": "string",
      "cct_tel": this.state.telephone,
      "cct_tel2": this.state.telephone2,
      "cct_port": this.state.mobile,
      "cct_fax": this.state.fax,
      "cct_mail": this.state.email,
      //"cct_site": "string",
      //"cct_activite": "string",
      "cct_comm": this.state.commentaires,
      "cct_source_id": this.state.sources,
      //"cct_nais": "string",
      //"cct_geolocalisation": "string",
      //"cct_adr1": "string",
      //"cct_cp": "string",
      //"cct_ville": "string",
      //"pays_id": 0,
      //"pays_nom": "string",
      //"etat_id": 0,
      //"etat_nom": "string",
      //"photo": "string"
    };
    const {dispatch} = this.props;
    //await dispatch(addContact(contact));
    await dispatch(fetchContacts());
    const message = this.props.route.params.profile ? 'Erreur lors de la modification d\'un contact' : 'Erreur lors de l\'ajout d\'un contact';
    this.props.navigator.showLocalAlert(message, {
      text: { color: '#fff' },
      container: { backgroundColor: '#F44336' },
    });
  };

  render() {

    return (
      <View style={styles.container}>
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => {
            this.props.navigator.pop();
          }}
          centerElement={this.props.route.params.profile ? 'Modifier un Contact' : 'Créer un Contact'}/>
        <ScrollView>
          {/*TODO mettre le premier champ en focus
                  Vérifier que des champs se cachent ou pas et mettre par défault civilité*/}
          <Text style={styles.secondaryText}>Informations Personnelles :</Text>
          <Select
            defaultText={this.state.civiliteLabel} optionListStyle={styles.options}
            style={styles.select}
            onSelect={(itemValue, itemLabel) => this.setState({civilite: itemValue, civiliteLabel: itemLabel})}>
            <Option value={0}>Monsieur</Option>
            <Option value={1}>Madame</Option>
          </Select>
          <Item style={styles.item} floatingLabel last>
            <Label>Nom</Label>
            <Input onChangeText={(text) => this.setState({nom: text})}/>
          </Item>
          <Item style={styles.item} floatingLabel last>
            <Label>Prenom</Label>
            <Input onChangeText={(text) => this.setState({prenom: text})}/>
          </Item>
          <Text style={styles.secondaryText}>Affilié au compte</Text>
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
                        renderItem={(comptes) => {
                          return (
                            <TouchableOpacity onPress={() => this.setState({
                              query: comptes.clt_nom,
                              comptes: [],
                              affiliation: comptes
                            })}>
                              <Text style={{fontSize: 22}}>
                                {comptes.clt_nom}
                              </Text>
                            </TouchableOpacity>
                          )
                        }}/>
          <Item style={styles.item} floatingLabel last>
            <Label>Téléphone</Label>
            <Input onChangeText={(text) => this.setState({telephone: text})}/>
          </Item>
          <Item style={styles.item} floatingLabel last>
            <Label>Mobile</Label>
            <Input onChangeText={(text) => this.setState({mobile: text})}/>
          </Item>
          <Item style={styles.item} floatingLabel last>
            <Label>Email</Label>
            <Input onChangeText={(text) => this.setState({email: text})}/>
          </Item>

          <Text style={styles.secondaryText}>Informations Complémentaires :</Text>
          <Item style={styles.item} floatingLabel last>
            <Label>Téléphone 2</Label>
            <Input onChangeText={(text) => this.setState({telephone2: text})}/>
          </Item>
          <Item style={styles.item} floatingLabel last>
            <Label>Fax</Label>
            <Input onChangeText={(text) => this.setState({fax: text})}/>
          </Item>
          <Select
            defaultText={this.state.sourceLabel} optionListStyle={styles.options}
            style={styles.select}
            onSelect={(itemValue, itemLabel) => this.setState({source: itemValue, sourceLabel: itemLabel})}>
            {this.props.sources.map((state, index) => {
              return <Option key={index} value={state.id}>{state.text}</Option>
            })}
          </Select>
          <Item style={styles.item} floatingLabel last>
            <Label>Commentaires</Label>
            <Textarea onChangeText={(text) => this.setState({commentaires: text})}/>
          </Item>
          <Button onPress={() => this._validate()} accent title={this.props.route.params.profile ? 'Mettre à jour' : 'Valider'}
                  backgroundColor={'#2196F3'} color={'#FFF'}/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  secondaryText: {
    fontSize: 16,
    marginLeft: '5%',
    color: '#1B435D',
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15,

  },
  search: {
    margin: 20,
  },
  item: {
    marginTop: 15,
  },
  options: {
    width: '100%',
    height: '100%'
  },
  select: {
    width: '95%',
    margin: 10,
    borderColor: 'grey'
  },
});

const mapStateToProps = (state) => {
  const {renderReducer, comptes} = state;
  return {
    sources: renderReducer.sources,
    comptes: comptes.comptesForm
  }
};

export default connect(mapStateToProps)(ContactForm);
