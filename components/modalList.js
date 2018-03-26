/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

class ModalList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: props.value,
            modalVisible: props.modalVisible
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({modalVisible:nextProps.modalVisible});
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                >
                <View style={styles.container}>
                    <View style={styles.content}>
                        <RadioForm
                            radio_props={this.props.values}
                            initial={0}
                            onPress={(value) => {
                                    this.props.onSelected(value);
                                    this.props.closeModal();
                                }}
                            />
                    </View>
                </View>
            </Modal>
        );
    }
}

ModalList.defaultProps = {
    values:[
        {label: 'param1', value: 0},
        {label: 'param2', value: 1}
    ],
    value:0,
    modalVisible:false,
    //onSelected: (value) => {console.log(value)}
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: 300,
        height: 300
    }
});

export default ModalList;