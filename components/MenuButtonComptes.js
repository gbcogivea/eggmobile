/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import {ActionButton} from 'react-native-material-ui';
import {Router} from '../main';
import {withNavigation} from '@expo/ex-navigation';

@withNavigation
class MenuButtonComptes extends React.Component {

    _navigate = (key) => {
        if (key === 'business') {
            this.props.navigator.push(Router.getRoute('createAffaire'));
        }
        if (key === 'event') {
            this.props.navigator.push(Router.getRoute('createEvenement'));
        }
        if (key === 'bookmark') {
            this.props.navigator.push(Router.getRoute('createTache'));
        }
        if (key === 'phone') {
            this.props.navigator.push(Router.getRoute('createContact'));
        }
        if (key === 'person') {
            this.props.navigator.push(Router.getRoute('createCompte'));
        }
    };

    render() {
        return (
            <ActionButton
                actions={[{icon: 'person', label: 'Compte'},
                    {icon: 'phone', label: 'Contacts'},
                    {icon: 'bookmark', label: 'Tache'},
                    {icon: 'event', label: 'Evenement'},
                    {icon: 'business', label: 'Affaire'}]}
                icon="add"
                onPress={this._navigate}
                transition="speedDial"
            />
        );
    }
}

export default MenuButtonComptes;