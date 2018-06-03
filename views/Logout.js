/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {signout} from '../actions/render';

class Logout extends React.Component {
    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(signout);
    }

    render() {

        return (
            <View>
            </View>
        );
    }
}

export default connect()(Logout);