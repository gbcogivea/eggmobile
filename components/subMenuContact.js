/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {sendSms, call, openMap, openVisio, sendEmail} from '../utils/utils';

export default class SubMenuContact extends Component {
    _handleMail = () => {
        const email = this.props.email;
        if (email === '') {
            alert('Ce contact n\'a pas de numéro de mail');
        } else {
            sendEmail(email);
        }
    };

    _handleCall = () => {
        const phone = this.props.phone;
        if (phone === '') {
            alert('Ce contact n\'a pas de numéro de téléphone');
        } else {
            call(phone);
        }
    };

    _handleMessage = () => {
        const phone = this.props.phone;
        if (phone === '') {
            alert('Ce contact n\'a pas de numéro de téléphone');
        } else {
            sendSms(phone);
        }
    };

    render() {
        const iconSize = 36;
        return (
            <View style={styles.content}>
                <View style={styles.item}>
                    <MaterialIcons onPress={this._handleMail} style={styles.cell} name="mail" size={iconSize}
                                   color="#1B435D"/>
                    <Text style={styles.title}>{'Mail'}</Text>
                </View>
                <View style={styles.item}>
                <MaterialIcons onPress={this._handleCall} style={styles.cell} name="call" size={iconSize}
                               color="#1B435D"/>
                    <Text style={styles.title}>{'Téléphone'}</Text>
                </View>
                <View style={styles.item}>
                <MaterialIcons onPress={this._handleMessage} style={styles.cell} name="chat" size={iconSize}
                               color="#1B435D"/>
                    <Text style={styles.title}>{'SMS'}</Text>
                </View>
                <View style={styles.item}>
                <MaterialIcons onPress={this.props.toProfile} style={styles.cell} name="person" size={iconSize}
                               color="#1B435D"/>
                <Text style={styles.title}>Infos</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        justifyContent:'space-between',
        marginBottom: '5%',
        marginLeft:'5%',
        marginRight:'5%',
    },
    item:{
        flexDirection:'column',

    },
    cell: {
        textAlign: 'center',
    },
    title: {
        fontSize: 12,
        textAlign: 'center',
        color: '#1B435D',
        marginTop:5,
    }
});
