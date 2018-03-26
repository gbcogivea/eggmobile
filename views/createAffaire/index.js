/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import { View, StyleSheet, Modal, Text, TouchableHighlight, Button, Image, ScrollView } from 'react-native';
import { Toolbar, COLOR } from 'react-native-material-ui';
import { connect } from 'react-redux';
import { Router } from '../../main';
import Example from '../../components/forms/example';

class AffairesScreen extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            date: new Date(),
            endDate: new Date(),
            kind: 0,
            modalVisible: false,
            step: {},
            selected1: "key1"
        };
    }

    onValueChange = (value) => {
        this.setState({
            selected1: value
        });
    };

    render() {
        return (
            <View>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => {
                        this.props.navigator.pop();
                    }}
                    centerElement={'Affaire'}
                    />
                <Example/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
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
    }
});

const mapStateToProps = (state) => {
    const { affaires } = state;
    return {
        selectedAffaire: affaires.selectedAffaire
    }
};

export default connect(mapStateToProps)(AffairesScreen);