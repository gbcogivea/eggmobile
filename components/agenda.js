/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */
import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import Modal from 'react-native-animated-modal';
import { showError, getRestAddress } from "../utils/utils";
import request from 'axios';


LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.']
};

LocaleConfig.defaultLocale = 'fr';

const task = {key: 'task', color: 'red', selectedColor: 'red'};
const event = {key: 'event', color: 'blue', selectedColor: 'blue'};

export default class AgendaScreen extends Component {
  state = {
    items: {},
    dots: {}
  };

  componentWillReceiveProps(nextProps) {
    this.setState({items: nextProps.events});
  }

  render() {
    //TODO change start date on loading datas
    return (
      <Agenda
        loadItemsForMonth={this.loadItemsForMonth}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        items={this.state.items}
        scrollEnabled={true}
      />
    );
  }

  _timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  showDay = (day) => {
    alert(JSON.stringify(day));
  };

  _getDateBetweenTwoDates = (startDate, endDate) => {
    const startDays = startDate.split('/');
    const endDays = endDate.split('/');

    const s = startDays[1] + '/' + startDays[2] + '/' + startDays[0];
    const e = endDays[1] + '/' + endDays[2] + '/' + endDays[0];

    let current = new Date(s);
    let end = new Date(e);
    end.setDate(end.getDate() + 1);

    while (current <= end) {
      const days = current.toLocaleDateString("en-EN");
      const strTime = this._timeToString(days);
      if (!this.state.items[strTime]) {
        this.state.items[strTime] = [];
      }
      current.setDate(current.getDate() + 1);
    }
  };

  _fromCogiveaDateToCalendar = (date) => {
    const days = date.split('/');
    const result = days[1] + '/' + days[0] + '/' + days[2];
    return result;
  };

  loadItemsForMonth = (h) => {
    setTimeout(async () => {
      const host = await getRestAddress();
      const anneePrecedente = h.month === 1 ? h.year - 1 : h.year;
      const anneeSuivante = h.month === 12 ? h.year + 1 : h.year;
      const moisPrecedent = h.month === 1 ? 12 : h.month - 1;
      const moisSuivant = h.month === 12 ? '01' : h.month + 1;
      const oneMonthBefore = anneePrecedente.toString() + '-' + (moisPrecedent.toString().length < 2 ? '0' + moisPrecedent : moisPrecedent) + '-01';
      const oneMonthAfter = anneeSuivante.toString() + '-' + (moisSuivant.toString().length < 2 ? '0' + moisSuivant : moisSuivant) + '-28';
      this._getDateBetweenTwoDates(oneMonthBefore.toString().replace(new RegExp('-', 'g'), '/'), oneMonthAfter.toString().replace(new RegExp('-', 'g'), '/'));
      const options = {
        method: 'GET',
        url: host + `/event?search=[{"field":"debut","var":"${oneMonthBefore}","sens":"ge"},{"field":"debut","var":"${oneMonthAfter}","sens":"le"}]`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      const options2 = {
        method: 'GET',
        url: host + `/task?search=[{"field":"debut","var":"${oneMonthBefore}","sens":"ge"},{"field":"debut","var":"${oneMonthAfter}","sens":"le"}]`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      request(options)
        .then((res) => {
          const activity = res.data.data;
          for (let i = 0; i < activity.length; i++) {
            const date = this._fromCogiveaDateToCalendar(activity[i].debut);
            if (date !== '00/00/0000') {
              const strTime = this._timeToString(date);
              if (!this.state.items[strTime]) {
                this.state.items[strTime] = [];
              }
              if (!this.state.dots[strTime]) {
                this.state.dots[strTime] = {dots: []};
                let dots = this.state.dots[strTime].dots;
                let flag = false;
                for (let i = 0; i < dots.length; i++) {
                  if (dots[i].key === 'event') {
                    flag = true;
                  }
                }
                if (!flag) {
                  this.state.dots[strTime].dots.push(event);
                }
              }
              this.state.items[strTime].push({
                name: activity[i].even_nom,
                color: 'blue',
                //TODO depends of time of event
                height: Math.max(50, Math.floor(Math.random() * 150))
              });
            }
          }
        }).done();

      request(options2)
        .then((res) => {
          const activity = res.data.data;
          for (let i = 0; i < activity.length; i++) {
            const date = this._fromCogiveaDateToCalendar(activity[i].debut);
            if (date !== '00/00/0000') {
              const strTime = this._timeToString(date);
              if (!this.state.items[strTime]) {
                this.state.items[strTime] = [];
              }
              if (!this.state.dots[strTime]) {
                this.state.dots[strTime] = {dots: []};
                let dots = this.state.dots[strTime].dots;
                let flag = false;
                for (let i = 0; i < dots.length; i++) {
                  if (dots[i].key === 'task') {
                    flag = true;
                  }
                }
                if (!flag) {
                  this.state.dots[strTime].dots.push(task);
                }
              }
              this.state.items[strTime].push({
                name: activity[i].even_nom,
                color: 'red',
                height: 50
              });
            }
          }
        }).done();
    }, 1000);
  };

  renderItem(item) {
    return (
      <TouchableOpacity onPress={() => this.showDay(item)}
                        style={[styles.item, {height: item.height, backgroundColor: item.color}]}><Text
        style={{color: 'white'}}>{item.name}</Text></TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text></Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }
}

const
  styles = StyleSheet.create({
    item: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17
    },
    emptyDate: {
      height: 15,
      flex: 1,
      paddingTop: 30
    }
  });