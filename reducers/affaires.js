/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

'use strict';
import * as types from '../constantes';

const initialState = {
  affaires: [],
  selectedAffaire: {},
  chiffrage:[],
  documents:[],
  products:[],
  invoices:[],
  participants:[],
  events:[],
  compteAffaire:{},
  contact:{}
};

const affaires = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_AFFAIRE_SUCCESS:
      return Object.assign({}, state, {
        affaires: action.data
      });
    case types.DELETE_AFFAIRE_SUCCESS:
      return Object.assign({}, state, {
        affaires: action.data
      });
    case types.FETCH_AFFAIRES_SUCCESS:
      return Object.assign({}, state, {
        affaires: action.data
      });
    case types.SEARCH_AFFAIRES_SUCCESS:
      return Object.assign({}, state, {
        affaires: action.data
      });
    case types.SELECT_AFFAIRE_SUCCESS:
      return Object.assign({}, state, {
        selectedAffaire: action.data
      });
    case types.SEARCH_AFFAIRES_ESTIMATE_SUCCESS:
      return Object.assign({}, state, {
        estimates: action.data
      });
    case types.SEARCH_AFFAIRES_DOCUMENTS_SUCCESS:
      return Object.assign({}, state, {
        documents: action.data
      });
    case types.SEARCH_AFFAIRES_PRODUCTS_SUCCESS:
      return Object.assign({}, state, {
        products: action.data
      });
    case types.SEARCH_AFFAIRES_INVOICES_SUCCESS:
      return Object.assign({}, state, {
        invoices: action.data
      });
    case types.SEARCH_AFFAIRES_PARTICIPANT_SUCCESS:
      return Object.assign({}, state, {
        participants: action.data
      });
    case types.SEARCH_AFFAIRES_EVENTS_SUCCESS:
      return Object.assign({}, state, {
        events: action.data
      });
    case types.SEARCH_ACCOUNT_EVENTS_SUCCESS:
      return Object.assign({}, state, {
        compteAffaire: action.data
      });
    case types.SEARCH_CONTACT_EVENTS_SUCCESS:
      return Object.assign({}, state, {
        contact: action.data
      });
    default:
      return state;
  }
};

export default affaires;