/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import * as types from '../constantes';
import { customDispatcher, setRestAddress } from "../utils/utils";
import {DEFAULT_HOST_API} from "../config";

export const showItem = (index) => {
    return {
        type: types.SHOW_INDEX,
        data: index
    }
};

export const signout = (dispatch) => {
  try {
    dispatch({
      type: types.LOGOUT,
      data: {},
      step: types.SUCCESS
    });

  } catch (error) {
    console.log('logout', error.message);
    return false;
  }
  setRestAddress(DEFAULT_HOST_API);
  return true;
};

export const fetchStates = () => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', `/accountstate/list`, types.FETCH_STATES_COMPTES);
    };
};

export const fetchStatus = () => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', `/accountstatus`, types.FETCH_STATUS_COMPTES);
    };
};

export const fetchCountries = () => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', `/country/list`, types.FETCH_COUNTRIES);
    };
};

export const fetchNotesTypes = () => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', `/notetype/list`, types.FETCH_NOTES_TYPES);
    };
};

export const fetchChannel = () => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', `/channel/list`, types.FETCH_CHANNEL);
    };
};

export const fetchEventStatus = () => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', `/eventstatus/list`, types.FETCH_EVENT_STATUS);
    };
};

export const fetchEventType = () => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', `/eventtype/list`, types.FETCH_EVENT_TYPE);
    };
};

export const fetchIntervalTime = () => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', `/intervaltime/list`, types.FETCH_INTERVAL_TIME);
    };
};

export const fetchLegalStatus = () => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', `/legalstatus/list`, types.FETCH_LEGAL_STATUS);
    };
};

export const fetchMethodPayments = () => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', `/methodpayment/list`, types.FETCH_METHOD_PAYMENTS);
    };
};

export const fetchOffices = () => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', `/office/list`, types.FETCH_OFFICES);
    };
};

export const fetchSources = () => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', `/source/list`, types.FETCH_SOURCES);
    };
};

export const fetchTaskPriority = () => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', `/taskpriority/list`, types.FETCH_TASK_PRIORITY);
    };
};

export const fetchTaskStatus = () => {
    return (dispatch) => {
        return customDispatcher(dispatch, 'GET', `/taskstatus/list`, types.FETCH_TASK_STATUS);
    };
};

