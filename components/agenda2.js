import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import request from "axios/index";
import { getRestAddress } from "../utils/utils";
import Modal from 'react-native-animated-modal';
import Jumbotron from './jumbotron/jumbotronEvent'

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.']
};

LocaleConfig.defaultLocale = 'fr';

export default class AgendaScreen extends Component {
  state = {
    items: {},
    openModal: false,
    event: {}
  };

  render() {
    return (
      <View style={{flex:1}}>
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={() => this._timeToString(new Date().getTime())}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
        />
        <Modal style={{backgroundColor:'#FFF'}} isVisible={this.state.openModal}>
          <View style={{position:'absolute', top:-10, width:'100%'}}>
            <TouchableOpacity onPress={() => this.setState({openModal: false})}>
              <Jumbotron event={this.state.event}/>
              <Text>Comptes : {this.state.event.clt_nom}</Text>
              <Text>Téléphone : {this.state.event.clt_nmr}</Text>
              <Text>Adresse : {this.state.event.clt_cp} {this.state.event.clt_ville}</Text>
              <Text>Contact : {this.state.event.cct_pre} {this.state.event.cct_nom}</Text>
              <Text>Téléphone : {this.state.event.clt_nmr}</Text>
              <Text>Adresse : {this.state.event.cct_cp} {this.state.event.cct_ville}</Text>
              <Text style={{marginTop:20, fontSize:20, color:'gray', textAlign:'center', width:'100%'}}>Close X</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }

  loadItems(day) {
    setTimeout(() => {
      const host = getRestAddress();
      const options = {
        method: 'GET',
        url: host + `/event`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
      const options2 = {
        method: 'GET',
        url: host + `/task`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
      request(options)
        .then((res) => {
          const events = res.data.data;
          events.map((event) => {
            if (event.debut !== '0000-00-00') {
              const days = event.debut.split('-');
              const day = days[2];
              const month = days[1];
              const year = days[0];
              let heure = event.debut_h;
              if (heure === '24:00') {
                heure = '00:00';
              }
              const strDate = this.timeToString(new Date(month + '/' + day + '/' + year + ' ' + heure).getTime());
              if (!this.state.items[strDate]) {
                this.state.items[strDate] = [];
                this.state.items[strDate].push({
                  meeting:event,
                  name: event.even_nom,
                  debut: event.debut_h,
                  fin: ' - ' + event.fin_h,
                  type: 'event',
                  client: event.clt_nom,
                  contact: event.cct_pre + ' ' + event.cct_nom
                });
              } else {
                this.state.items[strDate].push({
                  meeting:event,
                  name: event.even_nom,
                  debut: event.debut_h,
                  fin: ' - ' + event.fin_h,
                  type: 'event',
                  client: event.clt_nom,
                  contact: event.cct_pre + ' ' + event.cct_nom
                });
              }
            }
          });
        }).done();
      request(options2)
        .then((res) => {
          const tasks = res.data.data;
          tasks.map((task) => {
            if (task.debut !== '0000-00-00') {
              const days = task.debut.split('-');
              const day = days[2];
              const month = days[1];
              const year = days[0];
              let heure = task.debut_h;
              if (heure === '24:00') {
                heure = '00:00';
              }
              const strDate = this.timeToString(new Date(month + '/' + day + '/' + year + ' ' + heure).getTime());
              if (!this.state.items[strDate]) {
                this.state.items[strDate] = [];
                this.state.items[strDate].push({
                  meeting:task,
                  name: task.even_nom,
                  debut: task.debut_h,
                  fin: '',
                  type: 'task',
                  client: task.clt_nom,
                  contact: task.cct_pre + ' ' + task.cct_nom
                });
              } else {
                this.state.items[strDate].push({
                  meeting:task,
                  name: task.even_nom,
                  debut: task.debut_h,
                  fin: '',
                  type: 'task',
                  client: task.clt_nom,
                  contact: task.cct_pre + ' ' + task.cct_nom
                });
              }
            }
          });
        }).done();
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems
      });
    }, 1000);
  }

  renderItem(item) {
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.setState({openModal: true, event:item.meeting})}>
        <View style={styles.itemLeft}>
          <Text>{item.debut + item.fin}</Text>
          <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
          <Text style={{fontSize: 12, color: '#888'}}>{item.compte}</Text>
          <Text style={{fontSize: 12, color: '#888'}}>{item.contact}</Text>
        </View>
        <View style={styles.itemRight}>
          <View style={[styles.pastille, {backgroundColor: item.type === 'event' ? 'blue' : 'red'}]}>
            <Text style={styles.textPastille}>{item.type === 'event' ? 'E' : 'T'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text></Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'space-between'
  },
  itemLeft: {
    flex: 1
  },
  pastille: {
    borderRadius: 100,
    width: 30,
    height: 30,
    position: 'absolute',
    right: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemRight: {
    flex: 1,
    alignItems: 'flex-start'
  },
  textPastille: {
    fontSize: 14,
    color: '#FFF'
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});
