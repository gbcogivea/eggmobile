/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { Divider, Icon, IconToggle, RippleFeedback } from 'react-native-material-ui';
import { connect } from 'react-redux';
import { showItem } from '../actions/render';

const styles = StyleSheet.create({
    primary: {
        color:'#1B435D',
        fontSize:16,
        paddingTop: '5%',
        paddingLeft: '3%',
    },
    secondary: {
        color:'#78BBE6',
        fontSize:12,
        paddingTop:'1%',
        paddingBottom: '5%',
        paddingLeft: '3%'
    },
});

class Item extends Component {
    constructor(props) {
        super(props);

        this._onListItemPressed = this._onListItemPressed.bind(this);
        this.state = {
            hiddingThirdElement: true
        };
    }

    _close = () => {
        this.setState({hiddingThirdElement: true});
    };

    _open = () => {
        this.setState({hiddingThirdElement: false});
    };

    _onListItemPressed = () => {
        this.setState({hiddingThirdElement: !this.state.hiddingThirdElement});
        /*const { showIndex, index, dispatch } = this.props;
        console.log(showIndex, index);
        if(showIndex === null) {
            dispatch(showItem(index));
            this._open();
        } else if(showIndex === index) {
            dispatch(showItem(null));
            this._close();
        }*/
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={this._onListItemPressed}>
                <View>
                    <Divider/>
                    <View>
                        <Text style={styles.primary} numberOfLines={1}>
                            {this.props.centerElement.primaryText}
                        </Text>
                    </View>
                    <View>
                        <Text  style={styles.secondary} numberOfLines={1}>
                            {this.props.centerElement.secondaryText}
                        </Text>
                    </View>
                    {this.props.centerElement.thirdText && <View>
                        <Text  style={styles.secondary} numberOfLines={1}>
                            {this.props.centerElement.thirdText}
                        </Text>
                    </View>}
                    {this.props.externalComponent && !this.state.hiddingThirdElement &&
                    <View>
                        {this.props.externalComponent}
                    </View>
                    }
                    <Divider/>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const mapStateToProps = (state) => {
    const { renderReducer } = state;
    return {
        showIndex:renderReducer.showIndex
    }
};

export default connect(mapStateToProps)(Item);
