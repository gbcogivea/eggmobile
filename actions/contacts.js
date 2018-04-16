/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

'use strict';
import * as types from '../constantes';
import { makeRestRequest, setRestAddress, customDispatcher } from '../utils/utils';
import { Base64, showError } from '../utils/utils';

export const login = (user) => {
    //TODO change
    user.login = 'pierre';
    user.pass = 'pierre';
    user.token = 'pierrepierre79';
    return async (dispatch) => {
        dispatch({
            type: types.START
        });

        try {
            const data = {
                dkek: Base64.btoa(user.token)
            };

            const settingresult = await makeRestRequest('POST', '/auth/token', data);
            setRestAddress(settingresult.url + settingresult.api);

            const login = {
                'user': user.login,
                'pass': user.pass,
                'token': settingresult.jwt
            };

            const connectedUser = await makeRestRequest('POST', '/user/login', login);

            dispatch({
                type: types.LOGIN_SUCCESS,
                data: connectedUser.profile,
                access: connectedUser.auth
            });
        } catch (error) {
            showError(error.message);
            return false;
        }
        return true;
    };
};

/**
 * @name fetchAffaires
 * @returns {*}
 */
export const fetchContacts = () => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', '/contact', types.FETCH_CONTACTS_SUCCESS);
    };
};

export const fetchContactsPage = (start, end) => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', '/contact', types.FETCH_COMPTES_SUCCESS);
    };
};

/**
 * @name findContact
 * @returns {*}
 */
export const searchContact = (searchValue, start, length) => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', `/contact?start=${start}&length=${length}&search=[{"field":"cct_nom;cct_pre","var":"${searchValue}","sens":"co"}]`, types.SEARCH_CONTACTS_SUCCESS);
    };
};

/**
 * @name findContact
 * @returns {*}
 */
export const findContact = (id) => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', `/contact/${id}`, types.SELECT_CONTACT_SUCCESS);
    };
};

export const findContactForForm = (searchValue, start, length) => {
  return (dispatch) => {
    return customDispatcher(dispatch, 'GET', `/contact?start=${start}&length=${length}&search=[{"field":"cct_nom","var":"${searchValue}","sens":"co"}]`, types.SEARCH_CONTACTS_FOR_FORM_SUCCESS);
  };
};

export const addContact = (contact) => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'POST', `/contact`, types.ADD_CONTACTS_SUCCESS, contact);
    };
};

export const updateContact = (contact, cct_id) => {
  return (dispatch) => {
    return customDispatcher(dispatch, 'PUT', `/contact/${cct_id}`, types.ADD_CONTACTS_SUCCESS, contact);
  };
};
