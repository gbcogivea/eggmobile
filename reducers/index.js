/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

'use strict';
import { combineReducers } from 'redux';
import affaires from './affaires';
import comptes from './comptes';
import contacts from './contacts';
import documents from './documents';
import planning from './planning';
import renderReducer from './renderReducer';

const rootReducer = combineReducers({
    affaires,
    comptes,
    contacts,
    documents,
    planning,
    renderReducer
});

export default rootReducer;