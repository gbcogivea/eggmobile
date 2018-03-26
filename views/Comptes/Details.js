/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import ListItem from '../../components/listItem2';
import Jumbotron from '../../components/jumbotron/jumbotronCompte';
import { Router } from '../../main';
import { selectCompte } from '../../actions/comptes';
import { connect } from 'react-redux';
import MenuButtonCompte from '../../components/MenuButtonComptes';

class DetailCompteScreen extends React.Component {
    componentWillMount() {
        const { dispatch, route } = this.props;
        dispatch(selectCompte(route.params.compte));
    }

    _goToScreen = (name, params) => {
        this.props.navigator.push(Router.getRoute(name, params));
    };

    render() {
        const { selectedCompte, route } = this.props;
        const compte = route.params.compte;

        return (
            <View style={styles.container}>
                <Toolbar
                    leftElement="arrow-back"
                    rightElement="mode-edit"
                    onRightElementPress={() => this.props.navigator.push(Router.getRoute('createCompte', {selectedCompte}))}
                    onLeftElementPress={() => {
                        this.props.navigator.pop();
                    }}
                    centerElement={'Compte'}
                    />
                <Jumbotron primaryText={selectedCompte.clt_nom}
                           secoundaryText={selectedCompte.etatclt_nom}
                           thirdText={`${selectedCompte.clt_adr1} \n ${selectedCompte.clt_cp} ${selectedCompte.clt_ville}`}/>
                <ListItem
                    title={'Communications'}
                    description="Appeler, envoyer un mail ou sms"
                    onPress={() => this._goToScreen('communication', {compte:selectedCompte})}
                    />
                <ListItem
                    title={'Contacts'}
                    description="Liste des contacts pour ce compte"
                    onPress={() => this._goToScreen('contactsDuCompte', {compte:compte})}
                    />
                <ListItem
                    title={'Suivi'}
                    description="Suivi du compte"
                    onPress={() => this._goToScreen('suivi')}
                    />
                <ListItem
                    title={'Commentaires'}
                    description="Commentaires du compte"
                    onPress={() => this._goToScreen('commentsDuCompte')}
                    />
                <ListItem
                    title={'Informations Complémentaires'}
                    description="Compléments d'information du compte"
                    onPress={() => this._goToScreen('infoComplementaires')}
                    />
                <MenuButtonCompte/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    primaryText: {
        fontSize: 20,
        color: 'white'
    },
    secondaryText: {
        fontSize: 10,
        color: 'white'
    }
});

const mapStateToProps = (state) => {
    const { comptes } = state;
    return {
        selectedCompte: comptes.selectedCompte
    }
};

export default connect(mapStateToProps)(DetailCompteScreen);
