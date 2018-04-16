/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Form, Item, Input, Label, Picker, Textarea } from 'native-base';
import { Toolbar } from 'react-native-material-ui';
import { withNavigation } from '@expo/ex-navigation';
import Demo from '../../calendar';
import DatePicker from 'react-native-datepicker';
import Button from '../../../components/Button';
import { Select, Option } from "react-native-chooser";
import { connect } from "react-redux";
import { addContact, fetchContacts, updateContact } from "../../../actions/contacts";
import { addAffaire, fetchAffaires, updateAffaire } from "../../../actions/affaires";

var radio_props = [
  {label: 'param1', value: 0},
  {label: 'param2', value: 1}
];

const PickerItem = Picker.Item;

@withNavigation
class Example extends React.Component {
  state = {
    nom: this.props.route.params.selectedAffaire ? this.props.route.params.selectedAffaire.aff_nom : '',
    societe:this.props.route.params.selectedAffaire ? this.props.route.params.selectedAffaire.clt_nom : 0,
    societeLabel:'TODO',
    compte: this.props.route.params.selectedAffaire ? {
      clt_id: this.props.route.params.selectedAffaire.clt_id,
      clt_nom:this.props.route.params.selectedAffaire.clt_nom,
      clt_pre:this.props.route.params.selectedAffaire.clt_pre
    } : {},
    contact: this.props.route.params.selectedAffaire ? {
      cct_id: this.props.route.params.selectedAffaire.cct_id,
      cct_nom:this.props.route.params.selectedAffaire.cct_nom,
      cct_pre:this.props.route.params.selectedAffaire.cct_pre
    } : {},
    debut: this.props.route.params.selectedAffaire ? this.props.route.params.selectedAffaire.aff_debut : '',
    cloture: this.props.route.params.selectedAffaire ? this.props.route.params.selectedAffaire.aff_fin : '',
    caTheorique:this.props.route.params.selectedAffaire ? this.props.route.params.selectedAffaire.ca_t : 0,
    step:this.props.route.params.selectedAffaire ? this.props.route.params.selectedAffaire.etape_id : 0,
    stepLabel:this.props.route.params.selectedAffaire ? this.props.route.params.selectedAffaire.etape_nom : 'TODO',
    commentaires:this.props.route.params.selectedAffaire ? this.props.route.params.selectedAffaire.aff_comm : ''
  };

  onValueChange = (value) => {
    this.setState({
      selected1: value
    });
  };

  _validate = async () => {
    const {dispatch, connectedUser} = this.props;
    const contact = this.state.contact;
    const compte = this.state.compte;

    const opportunity = {
      //"clt_nmr": "string",
      "clt_nom": compte ? compte.clt_nom : "",
      //"etatclt_id": 2,
      //"statutclt_id": 2,
      //"statut_nom": "string",
      //"clt_raison_id": 0,
      //"civilite_id": 0,
      //"clt_comm": "string",
      //"clt_tel": "string",
      //"clt_tel2": "string",
      //"clt_port": "string",
      //"clt_fax": "string",
      //"clt_mail": "string",
      //"clt_site": "string",
      //"clt_activite": "string",
      //"clt_intracomm": "string",
      //"clt_ca": 0,
      //"clt_effectif": 0,
      //"clt_siret": "string",
      //"clt_capital": 0,
      //"clt_ape": "string",
      //"clt_ean13": "string",
      //"clt_nais": "string",
      //"clt_adr1": "string",
      //"clt_cp": "string",
      //"clt_ville": "string",
      //"pays_id": 0,
      //"pays_nom": "string",
      //"etat_id": 0,
      //"etat_nom": "string",
      //"clt_geolocalisation": "string",
      //"lat": 0,
      //"lng": 0,
      //"clt_adr_fact": "N",
      //"fact_nom": "string",
      //"fact_adr1": "string",
      //"fact_cp": "string",
      //"fact_ville": "string",
      //"fact_pays_id": 0,
      //"fact_pays_nom": "string",
      //"fact_etat_id": 0,
      //"fact_etat_nom": "string",
      //"clt_adr_liv": "N",
      //"liv_nom": "string",
      //"liv_adr1": "string",
      //"liv_cp": "string",
      //"liv_ville": "string",
      //"liv_pays_id": 0,
      //"liv_pays_nom": "string",
      //"liv_etat_id": 0,
      //"liv_etat_nom": "string",
      //"comptacl_id": "string",
      //"comptafr_id": "string",
      //"clt_rem_pourcent": 0,
      //"clt_rem_somme": 0,
      //"clt_exotva": "N",
      //"clt_lang": "FR",
      //"condrglt_id": 0,
      //"mode_rglt_id": 0,
      //"cgv_id": 0,
      "clt_agt_ori": connectedUser.agt_id
    };

    if (this.props.route.params.selectedAffaire) {
      await dispatch(updateAffaire(opportunity, this.props.route.params.selectedAffaire.aff_id));
      const message = 'Mise à jour réussie';
      this.props.navigator.showLocalAlert(message, {
        text: {color: '#fff'},
        container: {backgroundColor: '#4BB543'},
      });
    } else {
      await dispatch(addAffaire(opportunity));
      const message = 'Affaire Créée';
      this.props.navigator.showLocalAlert(message, {
        text: {color: '#fff'},
        container: {backgroundColor: '#4BB543'},
      });
    }
    await dispatch(fetchAffaires());
    this.props.navigator.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => {
            this.props.navigator.pop();
          }}
          centerElement={this.props.route.params.selectedAffaire ? 'Modifier une Affaire' : 'Créer une Affaire'}
        />
        <ScrollView>
          <Item style={styles.item} floatingLabel last>
            <Label>Nom</Label>
            <Input/>
          </Item>
          <Select
            defaultText={this.state.societeLabel} optionListStyle = {styles.options}
            style={styles.select}
            onSelect={(itemValue, itemLabel) => this.setState({societe: itemValue, societeLabel: itemLabel})}>

          </Select>
          <Item style={styles.item} floatingLabel last>
            <Label>Compte</Label>
            <Input/>
          </Item>
          <Item style={styles.item} floatingLabel last>
            <Label>Contact</Label>
            <Input/>
          </Item>
          <DatePicker
            style={{width: '95%', margin: 15}}
            date={this.state.debut}
            mode="date"
            placeholder="Début"
            format="DD/MM/YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => {
              this.setState({debut: date})
            }}/>
          <DatePicker
            style={{width: '95%', margin: 15}}
            date={this.state.cloture}
            mode="datetime"
            placeholder="Cloturée"
            format="DD/MM/YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => {
              this.setState({cloture: date})
            }}/>
          <Item style={styles.item} floatingLabel last>
            <Label>CA théorique</Label>
            <Input/>
          </Item>
          <Select
            defaultText={this.state.stepLabel} optionListStyle = {styles.options}
            style={styles.select}
            onSelect={(itemValue, itemLabel) => this.setState({step: itemValue, stepLabel: itemLabel})}>

          </Select>
          <Item style={styles.item} floatingLabel last>
            <Label>Commentaires</Label>
            <Textarea/>
          </Item>
          <Button onPress={() => this._validate()} accent title={this.props.route.params.selectedAffaire ? 'Mettre à jour' : 'Valider'}
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
  const {renderReducer} = state;
  return {
    states: renderReducer.states,
    status: renderReducer.status,
    legalStatus: renderReducer.legalStatus,
    countries: renderReducer.countries,
    noteTypes: renderReducer.noteTypes,
    connectedUser: renderReducer.connectedUser
  }
};

export default connect(mapStateToProps)(Example);
