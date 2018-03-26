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

var radio_props = [
  {label: 'param1', value: 0},
  {label: 'param2', value: 1}
];

const PickerItem = Picker.Item;

@withNavigation
export default class Example extends React.Component {
  state = {
    nom:'',
    societe:0,
    societeLabel:'TODO',
    compte: {},
    contact: {},
    debut: '',
    cloture: '',
    caTheorique:0,
    step:0,
    stepLabel:'TODO',
    commentaires:''
  };

  onValueChange = (value) => {
    this.setState({
      selected1: value
    });
  };

  _validate = () => {
    const message = this.props.route.params.selectedAffaire ? 'Erreur lors de la mise à jour d\'une affaire' : 'Erreur lors de l\'ajout d\'une affaire';
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
