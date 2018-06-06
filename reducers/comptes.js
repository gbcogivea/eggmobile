/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

'use strict';
import * as types from '../constantes';

const initialState = {
  comptes: [],
  selectedCompte: {address: {}, phones: []},
  contacts: [],
  notes: [],
  suivi: [],
  comptesForm: [],
  geoloc:[]
};

const comptes = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_COMPTES_SUCCESS:
      return Object.assign({}, state, {
        comptes: action.data
      });
    case types.DELETE_COMPTES_SUCCESS:
      return Object.assign({}, state, {
        comptes: action.data
      });
    case types.FETCH_COMPTES_SUCCESS:
      return Object.assign({}, state, {
        comptes: action.data
      });
    case types.SEARCH_COMPTES_SUCCESS:
      return Object.assign({}, state, {
        comptes: action.data
      });
    case types.SEARCH_COMPTES_FOR_FORM_SUCCESS:
      return Object.assign({}, state, {
        comptesForm: action.data
      });
    case types.SELECT_COMPTE_SUCCESS:
      return Object.assign({}, state, {
        selectedCompte: action.data
      });
    case types.FETCH_COMPTES_CONTACT_SUCCESS:
      return Object.assign({}, state, {
        contacts: action.data
      });
    case types.FETCH_COMPTES_COMMENTS_SUCCESS:
      return Object.assign({}, state, {
        notes: action.data
      });
    case types.ADD_COMMENT_SUCCESS:
      console.log(action.data)
      return Object.assign({}, state, {
        notes: [action.data, ...state.notes]
      });
    case types.FETCH_SUIVI_COMPTE_SUCCESS:
      return Object.assign({}, state, {
        suivi: action.data
      });
    case types.FIND_ACCOUNTS_ARROUND:
      return Object.assign({}, state, {
        geoloc: action.data
      });
    default:
      return state;
  }
};

export default comptes;
