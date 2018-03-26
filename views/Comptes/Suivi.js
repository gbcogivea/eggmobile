/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Toolbar, Divider } from 'react-native-material-ui';
import { connect } from 'react-redux';
import { fetchSuivi } from '../../actions/comptes';
import Jumbotron from '../../components/jumbotron/jumbotronCompte';
import { formatDate } from '../../utils/utils';

class SuiviScreen extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            comment: this.props.comment
        };
    }

    componentWillMount() {
        const { dispatch, selectedCompte } = this.props;
        dispatch(fetchSuivi(selectedCompte));
    }

    render() {
        const { selectedCompte } = this.props;
        return (
            <View style={styles.container}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => {
                        this.props.navigator.pop();
                    }}
                    centerElement={'Suivi'}
                    />
                <Jumbotron primaryText={selectedCompte.clt_nom}
                           secoundaryText={selectedCompte.etatclt_nom}
                           thirdText={`${selectedCompte.clt_adr1} \n ${selectedCompte.clt_cp} ${selectedCompte.clt_ville}`}/>
                <ScrollView>
                    {this.props.suivi.map((s, index) => {
                        return (<View key={index}>
                            <Divider/>
                            <Text style={styles.primaryText}>{formatDate(new Date(s.tpl.title))}</Text>
                            <Text style={styles.secondaryText}>{s.tpl.content}</Text>
                        </View>)
                    })}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    primaryText: {
        color:'#1B435D',
        fontSize:16,
        paddingTop: '5%',
        paddingLeft: '3%',
    },
    secondaryText: {
        color:'#78BBE6',
        fontSize:12,
        paddingTop:'1%',
        paddingBottom: '5%',
        paddingLeft: '3%'
    },
    container: {
        flex: 1,
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = (state) => {
    const { comptes } = state;
    return {
        selectedCompte: comptes.selectedCompte,
        suivi: comptes.suivi
    }
};

export default connect(mapStateToProps)(SuiviScreen);