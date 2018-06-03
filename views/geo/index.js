/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';
import Header from '../../components/Header';
import { ActionButton } from 'react-native-material-ui';
import { connect } from 'react-redux';
import { findAccountArroundMe } from "../../actions/comptes";
const Marker = MapView.Marker;

class GeoScreen extends React.Component {
  state = {
    location: {coords: {latitude: 46.3167, longitude: -0.4667}},
    errorMessage: null,
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({location});
    this._fetchData();
  };

  _fetchData = async () => {
    const {dispatch} = this.props;
    await dispatch(findAccountArroundMe(46.323716,
      -0.464777,
      50,
      'circle'));
  };

  render() {
    if (this.state.errorMessage) {
      alert(this.state.errorMessage)
    }
    return (
      <View style={styles.container}>
        <Header title='Géolocalisation'
                navigation={this.props.navigation}/>
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.9,
            longitudeDelta: 0.9,
          }}
        >
          {this.props.data.map((marker, index) => {
              const coordinate = {latitude: parseFloat(marker.lat), longitude: parseFloat(marker.lng)};
              return (
                <Marker key={index}
                        coordinate={coordinate}
                        title={marker.name}
                        description={marker.geolocalisation}
                />)
            }
          )}
        </MapView>
        <ActionButton
          actions={[{icon: 'phone', label: 'critére 1'}, {icon: 'home', label: 'Critére 2'}]}
          icon="search"
          transition="speedDial"
        />
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
});

const mapStateToProps = (state) => {
  const {comptes} = state;
  return {
    data: comptes.geoloc
  }
};

export default connect(mapStateToProps)(GeoScreen);
