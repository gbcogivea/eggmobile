/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

'use strict';
import * as types from '../constantes';
import { Toast } from 'native-base';

const initialState = {
  loading: false,
  access: {},
  //0 pas acces, 1 lecture, 2 insertion, 3 suppression, 4 admin
  message: '',
  error: '',
  connectedUser: {},
  showIndex: null,
  states: [],
  status: [],
  countries: [],
  noteTypes: [],
  channels: [],
  eventStatus: [],
  eventTypes: [],
  intervalTime: [],
  legalStatus: [],
  methodPayments: [],
  offices: [],
  sources: [],
  taskPriority: [],
  taskStatus: []
};

const renderReducer = (state = initialState, action) => {
  if (/SUCCESS$/.test(action.type) && action.type !== types.LOGIN_SUCCESS) {
    action.type = 'SUCCESS';
  }
  switch (action.type) {
    case types.FETCH_STATES_COMPTES:
      return Object.assign({}, state, {
        states: action.data
      });
    case types.FETCH_STATUS_COMPTES:
      return Object.assign({}, state, {
        status: action.data
      });
    case types.FETCH_COUNTRIES:
      return Object.assign({}, state, {
        countries: action.data
      });
    case types.FETCH_NOTES_TYPES:
      return Object.assign({}, state, {
        noteTypes: action.data
      });
    case types.FETCH_CHANNEL:
      return Object.assign({}, state, {
        channels: action.data
      });
    case types.FETCH_EVENT_STATUS:
      return Object.assign({}, state, {
        eventStatus: action.data
      });
    case types.FETCH_EVENT_TYPE:
      return Object.assign({}, state, {
        eventTypes: action.data
      });
    case types.FETCH_INTERVAL_TIME:
      return Object.assign({}, state, {
        intervalTime: action.data
      });
    case types.FETCH_LEGAL_STATUS:
      return Object.assign({}, state, {
        legalStatus: action.data
      });
    case types.FETCH_METHOD_PAYMENTS:
      return Object.assign({}, state, {
        methodPayments: action.data
      });
    case types.FETCH_OFFICES:
      return Object.assign({}, state, {
        offices: action.data
      });
    case types.FETCH_SOURCES:
      return Object.assign({}, state, {
        sources: action.data
      });
    case types.FETCH_TASK_PRIORITY:
      return Object.assign({}, state, {
        taskPriority: action.data
      });
    case types.FETCH_TASK_STATUS:
      return Object.assign({}, state, {
        taskStatus: action.data
      });
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        connectedUser: action.data,
        access: action.access,
        loading: false
      });
    case types.START:
      return Object.assign({}, state, {
        loading: true
      });
    case 'SUCCESS':
      return Object.assign({}, state, {
        loading: false
      });
    case /ADD$/.test(action.type):
      return Object.assign({}, state, {
        message: action.message
      });
    case /UPDATE$/.test(action.type):
      return Object.assign({}, state, {
        message: action.message
      });
    case /DELETE$/.test(action.type):
      return Object.assign({}, state, {
        message: action.message
      });
    case types.SHOW_INDEX:
      return Object.assign({}, state, {
        showIndex: action.data
      });
    case types.ERROR:
      return Object.assign({}, state, {
        error: action.data
      });
    case types.LOGOUT:
      return Object.assign({}, state, {
        connectedUser: action.data
      });
    default:
      return state;
  }
};

export default renderReducer;