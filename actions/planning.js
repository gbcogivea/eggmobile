/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import * as types from '../constantes';
import { makeRestRequest, showError, agregateEventsAndTasks, customDispatcher } from '../utils/utils';

export const loadEvents = (day) => {
    return async (dispatch) => {
        dispatch({
            type: types.START
        });

        try {

            const events = await makeRestRequest('GET', '/event');
            const tasks = await makeRestRequest('GET', '/task');

            const results = await agregateEventsAndTasks(events.data, tasks.data, day);

            dispatch({
                type: types.FETCH_EVENTS_SUCCESS,
                data: results
            });
        } catch (error) {
            showError(error.message);
            return false;
        }
        return true;
    };
};

export const addEvent = (event) => {
  return (dispatch) => {
    return customDispatcher(dispatch, 'POST', `/event`, types.ADD_TASK_SUCCESS, event);
  };
};

export const updateEvent = (event, even_id) => {
  return (dispatch) => {
    return customDispatcher(dispatch, 'PUT', `/event/${even_id}`, types.ADD_TASK_SUCCESS, event);
  };
};

export const addTask = (event) => {
  return (dispatch) => {
    return customDispatcher(dispatch, 'POST', `/event`, types.ADD_TASK_SUCCESS, event);
  };
};

export const updateTask = (event, even_id) => {
  return (dispatch) => {
    return customDispatcher(dispatch, 'PUT', `/event/${even_id}`, types.ADD_TASK_SUCCESS, event);
  };
};
