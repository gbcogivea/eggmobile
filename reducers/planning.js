/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

'use strict';
import * as types from '../constantes';

const initialState = {
    events: {}
};

const planning = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_EVENT_SUCCESS:
            return Object.assign({}, state, {
                events: action.data
            });
        case types.DELETE_EVENT_SUCCESS:
            return Object.assign({}, state, {
                events: action.data
            });
        case types.FETCH_EVENTS_SUCCESS:
            return Object.assign({}, state, {
                events: action.data
            });
        default:
            return state;
    }
};

export default planning;