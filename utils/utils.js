/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import * as types from '../constantes';
import { Linking } from 'react-native';
import RestClient from 'react-native-rest-client';
import request from 'axios';
import { Toast } from 'native-base';
import {DEFAULT_HOST_API} from "../config";
import moment from 'moment';
import Geocoder from 'react-native-geocoding';

let host = DEFAULT_HOST_API;

const googleMapApiKey = 'AIzaSyCPhB93EW5_Q9iAjBWMYi0X0hhvIqTGyN4';
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

Geocoder.init(googleMapApiKey);

export const checkValue = (value) => {
    if (value) {
        if (typeof value !== 'undefined') {
            if (value !== '') {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
};

export const customDispatcher = async(dispatch, method, endpoint, type, data) => {
    dispatch({
        type: types.START
    });
    try {
        const result = await makeRestRequest(method, endpoint, data);

        dispatch({
            type: type,
            data: result.data
        });
    } catch (error) {
        console.log('error : ', error);
        showError(error.message);
        return false;
    }
    return true;
};

export const setRestAddress = (newHost) => {
    host = newHost;
};

export const getRestAddress = () => {
    return host;
};

export const makeRestRequest = async (method, endpoint, data) => {

    let options = {
        method: method,
        url: host + endpoint
    };

    if (data) {
        options.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        options.data = data;
    }

    try {
        return request(options)
            .then(response => {
                return response.data;
            })
            .catch(err => {
                console.log('ERROR : ', err.message, options);
                showError(err.message);
            });
    } catch (error) {
        showError(error.message);
    }
};

export const Base64 = {
    btoa: (input = '')  => {
        let str = input;
        let output = '';

        for (let block = 0, charCode, i = 0, map = chars;
             str.charAt(i | 0) || (map = '=', i % 1);
             output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

            charCode = str.charCodeAt(i += 3 / 4);

            if (charCode > 0xFF) {
                throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
            }

            block = block << 8 | charCode;
        }

        return output;
    },

    atob: (input = '') => {
        let str = input.replace(/=+$/, '');
        let output = '';

        if (str.length % 4 == 1) {
            throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
        }
        for (let bc = 0, bs = 0, buffer, i = 0;
             buffer = str.charAt(i++);

             ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
             bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
        ) {
            buffer = chars.indexOf(buffer);
        }

        return output;
    }
};

export const showError = (message) => {
    Toast.show({text: message, position: 'bottom', buttonText: 'Ok'});
};

export const bouchon = (jsonFile, type, message) => {
    return async (dispatch) => {
        dispatch({
            type: type,
            data: jsonFile,
            message: message
        });
    }
};

export const alertMessage = (navigator, message) => {
    navigator.showLocalAlert(message, {
        text: {color: '#fff'},
        container: {backgroundColor: '#F44336'},
    });
};

export const sendSms = (phone) => {
    Linking.openURL('sms:' + phone);
};

export const call = (phone) => {
    Linking.openURL('tel:' + phone);
};

export const openMap = (address, cp, city) => {
  Geocoder.from(`${address}, ${city} ${cp}`)
    .then(json => {
      const location = json.results[0].geometry.location;
      const lat = location.lat;
      const long = location.lng;
      Linking.openURL(`http://maps.apple.com/?ll=${lat},${long}`);
    })
    .catch(error => console.warn(error));
};

export const openVisio = (phone) => {
    Linking.openURL('sms:' + phone);
};

export const sendEmail = (email) => {
    Linking.openURL('mailto:' + email);
};

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
};

const format = (date) => {
    let tab = date.split('/');
    return tab[2] + '-' + tab[1] + '-' + tab[0];
};

export const agregateEventsAndTasks = async (events, tasks, day) => {
    let test = {};
    events.map((event, index) => {
        event.debut = format(event.debut);
        if(test[event.debut]) {
            test[event.debut].push({name:event.even_nom, height:50});
        } else {
            test[event.debut] = [];
            test[event.debut].push({name:event.even_nom, height:50});
        }
    });
    return new Promise((resolve) => {
        let result = {};
        for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = timeToString(time);
            if (!result[strTime]) {
                result[strTime] = [];
                const numItems = Math.floor(Math.random() * 5);
                for (let j = 0; j < numItems; j++) {
                    result[strTime].push({
                        name: 'Event for ' + strTime,
                        height: Math.max(50, Math.floor(Math.random() * 150))
                    });
                }
            }
        }
        const newItems = {};
        Object.keys(result).forEach(key => {newItems[key] = result[key];});
        resolve(test);
    });
};

export const formatDate = (date) => {
    const monthNames = [
        "Janvier", "Février", "Mars",
        "Avril", "Mai", "Juin", "Juillet",
        "Août", "Septembre", "Octobre",
        "Novembre", "Décembre"
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
};

export const updateIndex = async (rowID, rowData, element) => {
    let dataClone = element.state.data;
    if (element.state.categoryIndex === null) {
        rowData.isSelect = true;
        dataClone[rowID] = rowData;
        element.setState({
            data: dataClone,
            categoryIndex: rowID
        });
    } else {
        if (element.state.categoryIndex === rowID) {
            rowData.isSelect = false;
            dataClone[rowID] = rowData;
            element.setState({
                data: dataClone,
                categoryIndex: null
            });
        } else {
            rowData.isSelect = true;
            dataClone[rowID] = rowData;
            dataClone[element.state.categoryIndex].isSelect = false;
            element.setState({
                data: dataClone,
                categoryIndex: rowID
            });
        }
    }
};

export const formatFloat = (value) => {
  let number = parseFloat(value).toFixed(2).toString().replace('.', ',');
  let numbers = number.split(',');
  const firstPart = numbers[0].replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
  return firstPart + ',' + numbers[1];
};
