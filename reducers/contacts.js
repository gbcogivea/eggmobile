/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

'use strict';
import * as types from '../constantes';
import contactsPlug from '../plugs/contacts.json';

const initialState = {
  contacts: [],
  selectedContact: {},
  contactsForm: []
};

const contacts = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CONTACTS_SUCCESS:
      return Object.assign({}, state, {
        contacts: action.data
      });
    case types.DELETE_CONTACTS_SUCCESS:
      return Object.assign({}, state, {
        contacts: action.data
      });
    case types.FETCH_CONTACTS_SUCCESS:
      return Object.assign({}, state, {
        contacts: action.data
      });
    case types.SEARCH_CONTACTS_SUCCESS:
      return Object.assign({}, state, {
        contacts: action.data
      });
    case types.SEARCH_CONTACTS_FOR_FORM_SUCCESS:
      return Object.assign({}, state, {
        contactsForm: action.data
      });
    case types.SELECT_CONTACT_SUCCESS:
      return Object.assign({}, state, {
        selectedContact: action.data
      });
    default:
      return state;
  }
};

export default contacts;