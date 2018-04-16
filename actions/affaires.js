/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import * as types from '../constantes';
import { makeRestRequest, showError, customDispatcher } from '../utils/utils';
import affaires from '../plugs/affaires.json';

const affaireEndpoint = '/api/affaire.php';

/**
 * @name addAffaire
 * @param affaire
 * @returns {*}
 */
export const addAffaire = (affaire) => {
  return (dispatch) => {
    return customDispatcher(dispatch, 'POST', '/opportunity', types.ADD_AFFAIRE_SUCCESS, affaire);
  };
};

export const updateAffaire = (affaire, aff_id) => {
  return (dispatch) => {
    return customDispatcher(dispatch, 'PUT', `/opportunity/${aff_id}`, types.ADD_AFFAIRE_SUCCESS, affaire);
  };
};

/**
 * @name deleteAffaire
 * @param affaire
 * @returns {*}
 */
/*export const deleteAffaire = (affaire) => {
    //return utils.query(affaireEndpoint, { affaire:affaire }, types.DELETE_AFFAIRE_SUCCESS, 'DELETE');
    return utils.bouchon(affaires.affaires, types.DELETE_AFFAIRE_SUCCESS, 'affaire supprimée');
};*/


/**
 * @name fetchAffaires
 * @returns {*}
 */
export const fetchAffaires = () => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', '/opportunity', types.FETCH_AFFAIRES_SUCCESS);
    };
};

export const fetchAffairesPage = (start, end) => {
  return (dispatch) => {
    return customDispatcher(dispatch, 'GET', `/opportunity?start=${start}&length=${end}`, types.FETCH_AFFAIRES_SUCCESS);
  };
};



export const findAffaireSearch = (searchValue, start, length) => {
  return (dispatch) => {
    return customDispatcher(dispatch, 'GET', `/opportunity?start=${start}&length=${length}&search=[{"field":"clt_nom","var":"${searchValue}","sens":"co", "table":"join"}]`, types.SEARCH_AFFAIRES_SUCCESS);
  };
};
/**
 * @name searchAffaire
 * @param param
 * @returns {*}
 */
/*export const searchAffaire = (param) => {
    //return utils.query(affaireEndpoint, { param:param }, types.SEARCH_AFFAIRES_SUCCESS, 'GET');
    return utils.bouchon(affaires.affaires, types.SEARCH_AFFAIRES_SUCCESS);
};*/

/**
 * @name findAffaire
 * @param param
 * @returns {*}
 */
export const findAffaire = (id) => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', '/opportunity/' + id, types.SELECT_AFFAIRE_SUCCESS);
    };
};

export const intervenants = (id) => {
  return (dispatch) => {
    return customDispatcher(dispatch, 'GET', `/opportunity/${id}/participant`, types.SEARCH_AFFAIRES_PARTICIPANT_SUCCESS);
  };
};

export const estimate = (id) => {
  return (dispatch) => {
    return customDispatcher(dispatch, 'GET', `/opportunity/${id}/estimate`, types.SEARCH_AFFAIRES_ESTIMATE_SUCCESS);
  };
};

export const documents = (id) => {
  return (dispatch) => {
    return customDispatcher(dispatch, 'GET', `/opportunity/${id}/ged`, types.SEARCH_AFFAIRES_DOCUMENTS_SUCCESS);
  };
};

export const products = (id) => {
  return (dispatch) => {
    return customDispatcher(dispatch, 'GET', `/opportunity/${id}/order`, types.SEARCH_AFFAIRES_PRODUCTS_SUCCESS);
  };
};

export const invoice = (id) => {
  return (dispatch) => {
    return customDispatcher(dispatch, 'GET', `/opportunity/${id}/invoice`, types.SEARCH_AFFAIRES_INVOICES_SUCCESS);
  };
};

export const events = (id) => {
  return (dispatch) => {
    return customDispatcher(dispatch, 'GET', `/event?search=[{"field":"aff_id","var":"${id}","sens":"co"}]`, types.SEARCH_AFFAIRES_EVENTS_SUCCESS);
  };
};

export const compteAffaire = (id) => {
  return (dispatch) => {
    return customDispatcher(dispatch, 'GET', `/account/${id}`, types.SEARCH_ACCOUNT_EVENTS_SUCCESS);
  };
};

export const contactAffaire = (id) => {
  return (dispatch) => {
    return customDispatcher(dispatch, 'GET', `/contact/${id}`, types.SEARCH_CONTACT_EVENTS_SUCCESS);
  };
};

