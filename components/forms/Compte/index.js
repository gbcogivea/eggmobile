/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import { View, StyleSheet, Text, ScrollView, Picker } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import { Form, Item, Input, Label, Textarea } from 'native-base';
import { connect } from "react-redux";
import { addAccount, fetchComptesPage } from "../../../actions/comptes";
import { Router } from "../../../main";
import { withNavigation } from '@expo/ex-navigation';
import Button from '../../../components/Button';
import { Select, Option } from "react-native-chooser";
import { fetchCountries, fetchLegalStatus, fetchStates, fetchStatus } from "../../../actions/render";

@withNavigation
class CompteForm extends React.Component {
  state = {
    nom: this.props.route.params.selectedCompte ? this.props.route.params.selectedCompte.clt_nom : '',
    etat: this.props.route.params.selectedCompte ? this.props.route.params.selectedCompte.etatclt_id : 0,
    etatNom: this.props.route.params.selectedCompte ? this.props.route.params.selectedCompte.etatclt_nom : 'Etat',
    status: this.props.route.params.selectedCompte ? this.props.route.params.selectedCompte.statutclt_id : 0,
    statusNom: this.props.route.params.selectedCompte ? this.props.route.params.selectedCompte.statut_nom : 'Status',
    flag: 0,
    civilite: 0,
    civiliteLabel:'Civilité',
    legalStatusLabel: 'Forme',
    legalStatus:0,
    prenom: '',
    telephone: this.props.route.params.selectedCompte ? this.props.route.params.selectedCompte.clt_tel :'',
    mobile: this.props.route.params.selectedCompte ? this.props.route.params.selectedCompte.clt_port :'',
    email: this.props.route.params.selectedCompte ? this.props.route.params.selectedCompte.clt_mail :'',
    adresse: this.props.route.params.selectedCompte ? this.props.route.params.selectedCompte.clt_adr1 :'',
    cp: this.props.route.params.selectedCompte ? this.props.route.params.selectedCompte.clt_cp :'',
    ville: this.props.route.params.selectedCompte ? this.props.route.params.selectedCompte.clt_ville :'',
    pays: this.props.route.params.selectedCompte ? parseInt(this.props.route.params.selectedCompte.pays_id) : 0,
    paysNom: this.props.route.params.selectedCompte ? this.props.route.params.selectedCompte.pays_nom :'',
    siteWeb: this.props.route.params.selectedCompte ? this.props.route.params.selectedCompte.clt_site :'',
    //cedex: '???',
    telephone2: this.props.route.params.selectedCompte ? this.props.route.params.selectedCompte.clt_tel2 :'',
    fax: this.props.route.params.selectedCompte ? this.props.route.params.selectedCompte.clt_fax :'',
    //TODO manque adresse
    capital: 0,
    siret: '',
    commentaires: '',
    //note: '???',
    //typeNote: 0
  };

  async componentWillMount() {
    const {dispatch} = this.props;
    await dispatch(fetchStatus());
    await dispatch(fetchStates());
    await dispatch(fetchCountries());
    await dispatch(fetchLegalStatus());
  }

  onValueChange = (field, value) => {
    let actualState = this.state;
    actualState[field] = value;
    this.state = actualState;
  };

  _validate = async () => {
    const account = {
      "clt_nmr": this.state.prenom,
      "clt_nom": this.state.nom,
      "etatclt_id": parseInt(this.state.etat),
      "statutclt_id": parseInt(this.state.status),
      "statut_nom": this.state.statusNom,
      //"clt_raison_id": 0,
      "civilite_id": parseInt(this.state.civilite),
      "clt_comm": this.state.commentaires,
      "clt_tel": this.state.telephone,
      "clt_tel2": this.state.telephone2,
      "clt_port": this.state.mobile,
      "clt_fax": this.state.fax,
      "clt_mail": this.state.email,
      "clt_site": this.state.siteWeb,
      //"clt_activite": "string",
      //"clt_intracomm": "string",
      //"clt_ca": 0,
      //"clt_effectif": 0,
      "clt_siret": this.state.siret,
      "clt_capital": parseInt(this.state.capital),
      //"clt_ape": "string",
      //"clt_ean13": "string",
      //"clt_nais": "string",
      "clt_adr1": this.state.adresse,
      "clt_cp": this.state.cp,
      "clt_ville": this.state.ville,
      "pays_id": parseInt(this.state.pays),
      "pays_nom": this.state.paysNom,
      //"etat_id": 0,
      //"etat_nom": "string",
      //"clt_geolocalisation": "string",
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
      //"clt_agt_ori": 0
    };
    const {dispatch} = this.props;
    //await dispatch(addAccount(account));
    await dispatch(fetchComptesPage(0, 10));
    //TODO mettre un message pour dire qu'il est créé
    const message = this.props.route.params.selectedCompte ? 'Erreur lors de la modification du Compte' : 'Erreur lors de l\'ajout d\'un Compte';
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
          centerElement={this.props.route.params.selectedCompte ? 'Modifier un compte' : 'Créer un Compte'}/>
        <ScrollView>
          <Text style={styles.secondaryText}>Informations Personnelles :</Text>
          {this.state.flag === 1 && <Item style={styles.item} floatingLabel last>
            <Label>Nom : </Label>
            <Input onChangeText={(text) => this.setState({nom: text})} placeholder={this.state.nom}/>
          </Item>}
          {this.state.flag === 1 && <Item style={styles.item} floatingLabel last>
            <Label>Prénom : </Label>
            <Input onChangeText={(text) => this.setState({prenom: text})}/>
          </Item>}
          {this.state.flag === 0 && <Item style={styles.item} floatingLabel last>
            <Label>Raison Sociale : </Label>
            <Input onChangeText={(text) => this.setState({nom: text})} placeholder={this.state.nom}/>
          </Item>}
          <Select
            defaultText={this.state.etatNom} optionListStyle = {styles.options}
            style={styles.select}
            onSelect={(itemValue, itemLabel) => this.setState({etat: itemValue, etatNom:itemLabel})}>
            {this.props.states.map((state, index) => {
              return <Option key={index} value={state.id}>{state.text}</Option>
            })}
          </Select>
          <Select
            defaultText={this.state.statusNom} optionListStyle = {styles.options}
            style={styles.select}
            onSelect={(itemValue, itemLabel) => this.setState({
              status: parseInt(itemValue.split('!')[0]),
              flag:parseInt(itemValue.split('!')[1]),
              statusNom:itemLabel})}>
            {this.props.status.map((state, index) => {
              return <Option key={index} value={state.id + '!' + state.type}>{state.nom}</Option>
            })}
          </Select>
          {this.state.flag === 1 && <Select
            defaultText={this.state.civiliteLabel} optionListStyle = {styles.options}
            style={styles.select}
            onSelect={(itemValue, itemLabel) => this.setState({civilite: itemValue, civiliteLabel:itemLabel})}>
            <Option value={0}>Monsieur</Option>
            <Option value={1}>Madame</Option>
          </Select>}
          {this.state.flag === 0 && <Select
            defaultText={this.state.legalStatusLabel} optionListStyle = {styles.options}
            style={styles.select}
            onSelect={(itemValue, itemLabel) => this.setState({legalStatus: itemValue, legalStatusLabel:itemLabel})}>
            {this.props.legalStatus.map((state, index) => {
              return <Option key={index} value={state.id}>{state.text}</Option>
            })}
          </Select>}
          <Item style={styles.item} floatingLabel last>
            <Label>Téléphone : </Label>
            <Input onChangeText={(text) => this.setState({telephone: text})} placeholder={this.state.telephone}/>
          </Item>
          <Item style={styles.item} floatingLabel last>
            <Label>Mobile : </Label>
            <Input onChangeText={(text) => this.setState({mobile: text})} placeholder={this.state.mobile}/>
          </Item>
          <Item style={styles.item} floatingLabel last>
            <Label>Email : </Label>
            <Input onChangeText={(text) => this.setState({email: text})} placeholder={this.state.mobile}/>
          </Item>
          <Item style={styles.item} floatingLabel last>
            <Label>Adresse : </Label>
            <Input onChangeText={(text) => this.setState({adresse: text})} placeholder={this.state.adresse}/>
          </Item>
          <Item style={styles.item} floatingLabel last>
            <Label>CP : </Label>
            <Input onChangeText={(text) => this.setState({cp: text})} placeholder={this.state.cp}/>
          </Item>
          <Item style={styles.item} floatingLabel last>
            <Label>Ville : </Label>
            <Input onChangeText={(text) => this.setState({ville: text})} placeholder={this.state.ville}/>
          </Item>
          <Select
            defaultText={this.state.paysNom} optionListStyle = {styles.options}
            style={styles.select}
            onSelect={(itemValue, itemLabel) => this.setState({pays: itemValue, paysNom:itemLabel})}>
            {this.props.countries.map((state, index) => {
              return <Option key={index} value={state.id}>{state.text}</Option>
            })}
          </Select>
          <Text style={styles.secondaryText}>Informations Complémentaires :</Text>
          <Item style={styles.item} floatingLabel last>
            <Label>Site Web : </Label>
            <Input onChangeText={(text) => this.setState({siteWeb: text})} placeholder={this.state.siteWeb}/>
          </Item>
          <Item style={styles.item} floatingLabel last>
            <Label>Cedex : </Label>
            <Input onChangeText={(text) => this.setState({cedex: text})} />
          </Item>
          <Item style={styles.item} floatingLabel last>
            <Label>Tel2 : </Label>
            <Input onChangeText={(text) => this.setState({telephone2: text})} placeholder={this.state.adresse}/>
          </Item>
          <Item style={styles.item} floatingLabel last>
            <Label>Fax : </Label>
            <Input onChangeText={(text) => this.setState({fax: text})} placeholder={this.state.fax}/>
          </Item>
          <Item style={styles.item} floatingLabel last>
            <Label>Capital : </Label>
            <Input onChangeText={(text) => this.setState({capital: text})} />
          </Item>
          <Item style={styles.item} floatingLabel last>
            <Label>Siret : </Label>
            <Input onChangeText={(text) => this.setState({siret: text})} />
          </Item>
          <Item style={styles.item} floatingLabel last>
            <Label>Commentaire : </Label>
            <Textarea onChangeText={(text) => this.setState({commentaires: text})} />
          </Item>
          <Text style={styles.secondaryText}>Notes :</Text>
          <Item style={styles.item} floatingLabel last>
            <Label>Commentaires Note : </Label>
            <Textarea onChangeText={(text) => this.setState({note: text})}/>
            <Button accent text="Ajouter Note"/>
          </Item>
          <Button onPress={() => this._validate()} accent title={this.props.route.params.selectedCompte ? 'Mettre à jour' : 'Valider'}
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
  secondaryText: {
    fontSize: 16,
    marginLeft: '5%',
    color: '#1B435D',
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15,
  },
  item: {
    marginTop: 15,
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
});

const mapStateToProps = (state) => {
  const {renderReducer} = state;
  return {
    states: renderReducer.states,
    status: renderReducer.status,
    legalStatus: renderReducer.legalStatus,
    countries: renderReducer.countries,
    noteTypes: renderReducer.noteTypes
  }
};

export default connect(mapStateToProps)(CompteForm);
