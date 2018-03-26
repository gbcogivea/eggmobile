/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import Jumbotron from '../../components/jumbotron/jumbotronCompte';
import { connect } from 'react-redux';

class DetailCompteScreen extends React.Component {

    render() {
        const { selectedCompte } = this.props;
        return (
            <View style={styles.container}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => {
                        this.props.navigator.pop();
                    }}
                    centerElement={'Info Complémentaires'}
                />
                <Jumbotron primaryText={selectedCompte.clt_nom}
                           secoundaryText={selectedCompte.etatclt_nom}
                           thirdText={`${selectedCompte.clt_adr1} \n ${selectedCompte.clt_cp} ${selectedCompte.clt_ville}`}/>
                <Text style={styles.title}>Infos Complémentaires</Text>
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
    },
    title:{
        color:'#1B435D',
        fontSize:16,
        paddingLeft: '3%',
        paddingTop:20,
        paddingBottom:20,
        fontWeight:'bold',
    },

});

const mapStateToProps = (state) => {
    const { comptes } = state;
    return {
        selectedCompte: comptes.selectedCompte
    }
};

export default connect(mapStateToProps)(DetailCompteScreen);