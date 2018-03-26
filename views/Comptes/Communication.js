/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Toolbar, Divider} from 'react-native-material-ui';
import Jumbotron from '../../components/jumbotron/jumbotronCompte';
import {MaterialIcons, FontAwesome, Ionicons} from '@expo/vector-icons';
import {connect} from 'react-redux';
import MenuButtonCompte from '../../components/MenuButtonComptes';
import {sendSms, call, checkValue, openVisio, sendEmail} from '../../utils/utils';

class CommunicationScreen extends React.Component {
    _handleMail = () => {
        sendEmail(this.props.selectedCompte.email);
    };

    _handleCall = (phone) => {
        call(phone);
    };

    _handleMessage = (phone) => {
        sendSms(phone);
    };

    render() {
        const selectedCompte = this.props.route.params.compte;
        const iconSize = 24;
        return (
            <View style={styles.container}>
                <View>
                    <Toolbar
                        leftElement="arrow-back"
                        onLeftElementPress={() => {
                            this.props.navigator.pop();
                        }}
                        centerElement={'Compte'}
                    />
                    <Jumbotron primaryText={selectedCompte.clt_nom}
                               secoundaryText={selectedCompte.etatclt_nom}
                               thirdText={`${selectedCompte.clt_adr1} \n ${selectedCompte.clt_cp} ${selectedCompte.clt_ville}`}/>
                    <Text style={styles.primaryText}>Téléphones</Text>
                    {checkValue(selectedCompte.clt_tel) && <View style={styles.row}>
                        <Text style={styles.address}>{selectedCompte.clt_tel}</Text>
                        <MaterialIcons style={styles.item} onPress={() => this._handleCall(selectedCompte.clt_tel)}
                                       name="call"
                                       size={iconSize} color="blue"/>
                        <MaterialIcons style={styles.item} onPress={() => this._handleMessage(selectedCompte.clt_tel)}
                                       name="chat"
                                       size={iconSize} color="green"/>
                        <FontAwesome style={styles.item} onPress={() => this._handleCall(selectedCompte.clt_tel)}
                                     name="video-camera"
                                     size={iconSize} color="turquoise"/>
                    </View>}
                    <Divider/>
                    {checkValue(selectedCompte.clt_tel2) && <View style={styles.row}>
                        <Text style={styles.address}>{selectedCompte.clt_tel2}</Text>
                        <MaterialIcons style={styles.item} onPress={() => this._handleCall(selectedCompte.clt_tel2)}
                                       name="call"
                                       size={iconSize} color="blue"/>
                        <MaterialIcons style={styles.item} onPress={() => this._handleMessage(selectedCompte.clt_tel2)}
                                       name="chat"
                                       size={iconSize} color="green"/>
                        <FontAwesome style={styles.item} onPress={() => this._handleCall(selectedCompte.clt_tel2)}
                                     name="video-camera"
                                     size={iconSize} color="turquoise"/>
                    </View>}
                    <Divider/>
                    {checkValue(selectedCompte.clt_port) &&
                    <View style={styles.row}>
                        <Text style={styles.address}>{selectedCompte.clt_port}</Text>
                        <MaterialIcons style={styles.item} onPress={() => this._handleCall(selectedCompte.clt_port)}
                                       name="call"
                                       size={iconSize} color="blue"/>
                        <MaterialIcons style={styles.item} onPress={() => this._handleMessage(selectedCompte.clt_port)}
                                       name="chat"
                                       size={iconSize} color="green"/>
                        <FontAwesome style={styles.item}
                                     onPress={() => this._handleCall(selectedCompte.clt_telclt_port2)}
                                     name="video-camera"
                                     size={iconSize} color="turquoise"/>
                    </View>}
                    <Divider/>
                    {checkValue(selectedCompte.clt_fax) &&
                    <View style={styles.row}>
                        <Text style={styles.address}>{selectedCompte.clt_fax}</Text>
                        <MaterialIcons style={styles.item} onPress={() => this._handleCall(selectedCompte.clt_fax)}
                                       name="call"
                                       size={iconSize} color="blue"/>
                        <MaterialIcons style={styles.item} onPress={() => this._handleMessage(selectedCompte.clt_fax)}
                                       name="chat"
                                       size={iconSize} color="green"/>
                        <FontAwesome style={styles.item} onPress={() => this._handleCall(selectedCompte.clt_fax)}
                                     name="video-camera"
                                     size={iconSize} color="turquoise"/>
                    </View>}
                    <Divider/>
                    <Text style={styles.primaryText}>Email</Text>
                    {checkValue(selectedCompte.clt_mail) && <View style={styles.row}>
                        <Text style={styles.address}>{selectedCompte.clt_mail}</Text>
                        <Ionicons style={styles.item} onPress={() => this._handleMail(selectedCompte.clt_mail)}
                                  name="ios-mail-outline"
                                  size={32} color="grey"/>
                    </View>}
                    <Divider/>
                    <Text style={styles.primaryText}>Adresse</Text>
                    {checkValue(selectedCompte.clt_ville) && <View style={styles.row}>
                        <View style={styles.secoundaryView}>
                            <Text
                                style={styles.address}>{selectedCompte.clt_adr1}</Text>
                            <Text
                                style={styles.address2}>{selectedCompte.clt_cp + ' ' + selectedCompte.clt_ville}</Text>
                        </View>
                        <FontAwesome style={styles.item} onPress={() => this._handleCall(phone)} name="map-o"
                                     size={iconSize} color="grey"/>
                    </View>}
                </View>
                    <MenuButtonCompte/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: '2%',
        marginTop: 10,
        marginBottom: 10,
    },
    item: {
        marginLeft: 20,
        marginRight: 20,
    },
    primaryText: {
        fontSize: 12,
        color: 'grey',
        paddingLeft: '2%',
        paddingTop: 15,
    },
    secondaryText: {
        flex: 0.5,
        fontSize: 10,
        color: 'grey',
        margin: 10
    },
    secoundaryView: {
        flex: 0.5,
        margin: 10
    },
    email: {
        fontSize: 10,
        color: 'grey',
        marginBottom: 20
    },
    address: {
        color: '#1B435D',
        fontSize: 16,
        paddingLeft: '2%',
    },
    address2: {
        color: '#78BBE6',
        fontSize: 12,
        paddingTop: '1%',
        paddingLeft: '2%'
    }
});

const mapStateToProps = (state) => {
    const {comptes} = state;
    return {
        selectedCompte: comptes.selectedCompte
    }
};

export default connect(mapStateToProps)(CommunicationScreen);