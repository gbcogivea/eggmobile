/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import {View, StyleSheet, Modal, Text, TouchableHighlight, Button, Image, ScrollView} from 'react-native';
import {Toolbar, COLOR} from 'react-native-material-ui';
import {Container, Content, Form, Item, Input, Label, Picker} from 'native-base';
import Moment from 'moment';
import Demo from '../../calendar';

var radio_props = [
    {label: 'param1', value: 0},
    {label: 'param2', value: 1}
];

const PickerItem = Picker.Item;

export default class Example extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected1: 'key0'
        }
    }

    onValueChange = (value: string) => {
        this.setState({
            selected1: value
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Item style={styles.item} floatingLabel last>
                    <Label>Username</Label>
                    <Input/>
                </Item>
                <Item style={styles.item} floatingLabel last>
                    <Label>Password</Label>
                    <Input/>
                </Item>
                <Picker
                    iosHeader="Select one"
                    mode="dropdown"
                    selectedValue={this.state.selected1}
                    onValueChange={this.onValueChange}
                >
                    <PickerItem label="Wallet" value="key0"/>
                    <PickerItem label="ATM Card" value="key1"/>
                    <PickerItem label="Debit Card" value="key2"/>
                    <PickerItem label="Credit Card" value="key3"/>
                    <PickerItem label="Net Banking" value="key4"/>
                </Picker>
                <Demo/>
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
    },
    item: {
        marginTop: 15,
    }
});
