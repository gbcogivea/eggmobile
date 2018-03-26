import Exponent, { Asset, AppLoading } from 'expo';
import React, { Component } from 'react';
import LoginView from './views/login';
import { connect, Provider } from 'react-redux';
import { View, Text } from 'react-native';

class Container extends Component {
    state = {
        isLoading: this.props.loading
    };

    render() {
        /*if (this.state.isLoading) {
            return (<View><Text>Loading...</Text></View>);
        }*/
        return <LoginView/>
    }
}

const mapStateToProps = (state) => {
    const { renderReducer } = state;
    return {
        loading: renderReducer.loading
    }
};

export default connect(mapStateToProps)(Container);
