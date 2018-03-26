/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

'use strict';
import * as types from '../constantes';

const initialState = {
    documents: [],
    selectedDocument: {},
    currentFolder: '',
    subfolders:[]
};

const documents = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_DOCUMENTS_SUCCESS:
            return Object.assign({}, state, {
                documents: action.data
            });
        case types.ADD_DOCUMENT_SUCCESS:
            return Object.assign({}, state, {
                documents: action.data
            });
        case types.DELETE_DOCUMENT_SUCCESS:
            return Object.assign({}, state, {
                documents: action.data
            });
        case types.SEARCH_DOCUMENTS_SUCCESS:
            return Object.assign({}, state, {
                documents: action.data
            });
        case types.SELECT_DOCUMENT_SUCCESS:
            return Object.assign({}, state, {
                selectedDocument: action.data
            });
        case types.SELECT_FOLDER_SUCCESS:
            return Object.assign({}, state, {
                currentFolder: action.data.currentFolder,
                subfolders: action.data.subfolders,
                documents: action.data.documents
            });
        default:
            return state;
    }
};

export default documents;