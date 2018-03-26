import { customDispatcher } from "../utils/utils";
import * as types from "../constantes";

/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */
export const fetchDocuments = (agt_id) => {
  return (dispatch) => {
    return customDispatcher(dispatch, 'GET', `/user/${agt_id}/ged`, types.FETCH_DOCUMENTS_SUCCESS);
  };
};
