/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

'use strict';
import * as types from '../constantes';
import comptes from '../plugs/comptes.json';
import { customDispatcher } from '../utils/utils';

const connectedUser = {connectedUser: {email: 'jul.79000@gmail.com'}};

export const login = () => {
    return {
        type: types.LOGIN,
        data: connectedUser
    };
};

export const fetchComptes = () => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', '/account', types.FETCH_COMPTES_SUCCESS);
    };
};


export const fetchComptesPage = (start, end) => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', `/account?start=${start}&length=${end}`, types.FETCH_COMPTES_SUCCESS);
    };
};

export const selectCompte = (compte) => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', `/account/${compte.clt_id}`, types.SELECT_COMPTE_SUCCESS);
    };
};

export const fetchContactsDuCompte = (compte) => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', `/account/${compte.clt_id}/contact`, types.FETCH_COMPTES_CONTACT_SUCCESS);
    };
};

export const fetchCommentsOfCompte = (compte) => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', `/account/${compte.clt_id}/note`, types.FETCH_COMPTES_COMMENTS_SUCCESS);
    };
};

export const addComment = ( compte_id, comment) => {
  return (dispatch) => {
    return customDispatcher(dispatch, 'POST', `/account/${compte_id}/note`, types.ADD_COMMENT_SUCCESS, comment);
  };
};

export const fetchSuivi = (compte) => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', `/account/${compte.clt_id}/care`, types.FETCH_SUIVI_COMPTE_SUCCESS);
    };
};

export const addAccount = (account) => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'POST', `/account`, types.ADD_COMPTES_SUCCESS, account);
    };
};

export const updateAccount = (account, clt_id) => {
  return (dispatch) => {
    return customDispatcher(dispatch, 'PUT', `/account/${clt_id}`, types.ADD_COMPTES_SUCCESS, account);
  };
};

export const findAccount = (searchValue, start, length) => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', `/account?start=${start}&length=${length}&search=[{"field":"clt_nom","var":"${searchValue}","sens":"co"}]`, types.SEARCH_COMPTES_SUCCESS);
    };
};

export const findAccountForForm = (searchValue, start, length) => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', `/account?start=${start}&length=${length}&search=[{"field":"clt_nom","var":"${searchValue}","sens":"co"}]`, types.SEARCH_COMPTES_FOR_FORM_SUCCESS);
    };
};

export const findAccountArroundMe = (lat, long, radius, type) => {
  return (dispatch) => {
      const endpoint = `/geoloc/account?type=${type}&radius=${radius}&lat=${lat}&lng=${long}`;
    return customDispatcher(dispatch, 'GET', endpoint, types.FIND_ACCOUNTS_ARROUND);
  };
};
